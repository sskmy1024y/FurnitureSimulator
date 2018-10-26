import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import FSFLoader from './FSFLoader.jsx';
import Furniture from './Furniture.jsx';

var OrbitControls = require('three-orbit-controls')(THREE);
import DeviceOrientationControls from 'three-device-orientation';

// onsenUI import
import ons from 'onsenui';
import { Navigator, Page, Button, Toolbar, BackButton, Card } from 'react-onsenui';

var keys = 0;


var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) {
    var sp = true;
} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    var sp = true;
}

var objects = {};

function LoadObjects() {

    fetch("./Furnitures.json").then((responce) => {
        return responce.json();
    }).then((json) => {
        json.forEach(data => {
            let obj = new Furniture(data);
            objects[data.modelid] = obj;
        });
        console.log(objects);
        
    });

}
LoadObjects();



class MainPage extends Component {
    pushPage() {
        this.props.navigator.pushPage({ component: ThreeJSPage, props: { key: ++keys } });
    }

    actionSheet() {
        ons.openActionSheet({
            title: 'From object',
            cancelable: true,
            buttons: [
                'カメラ',
                'ライブラリ',
                {
                    label: 'キャンセル',
                    icon: 'md-close',
                    modifier: 'destructive'
                }
            ]
        }).then(function (index) { console.log('index: ', index) });
    }

    render() {
        return (
            <Page id="mainPage" renderToolbar={() =>
                <Toolbar>
                    <div className="center"></div>
                </Toolbar>
            }>
                <img src="./img/Furniture Simulator-logo.png" alt="ロゴ"></img>
                <p style={{ textAlign: 'center' }}>
                    <Button onClick={this.pushPage.bind(this)}>テスト</Button>
                </p>
                <p style={{ textAlign: 'center' }}>
                    <Button onClick={this.actionSheet.bind(this)}>新規作成</Button>
                </p>
            </Page>
        );
    }
}

class SecondPage extends Component {
    pushPage() {
        this.props.navigator.pushPage({ component: SecondPage });
    }

    popPage() {
        this.props.navigator.popPage();
    }

    render() {
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left"><BackButton>Back</BackButton></div>
                    <div className="center">Another page</div>
                </Toolbar>
            }>
                <p style={{ textAlign: 'center' }}>
                    <Button onClick={this.pushPage.bind(this)}>Push page</Button>
                    <Button onClick={this.popPage.bind(this)}>Pop page</Button>
                </p>
            </Page>
        );
    }
}

const pi = Math.PI;
const rad = pi / 180;
const width = window.innerWidth;
const height = window.innerHeight;

const Test = (props) => {
    return (<div>{props.message}</div>)
}

class ThreeJSPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.objects = [];

        this.cameraPosition = new THREE.Vector3(0, 5, 5);
        this.lightPosition = new THREE.Vector3(0, 0, 30);

        this.movable = {
            plane: new THREE.Plane(),
            raycaster: new THREE.Raycaster(),
            mouse: new THREE.Vector2(),
            offset: new THREE.Vector3(),
            intersection: new THREE.Vector3(),
            mouseoverObj: null,
            draggedObj: null
        }

        this._onAnimate = () => {
            if (sp) this.controls.update();
        };

    }

    componentWillMount() {
        const url = "./Furnitures.json";
        fetch(url).then((responce) => {
            return responce.json();
        }).then((furnitures) => {

        });
    }

    componentDidMount() {

        var controls;
        if (sp) {
            controls = new DeviceOrientationControls(this.refs.camera);
            this.controls = controls;
        } else {
            controls = new OrbitControls(this.refs.camera);
            controls.enableDamping = true;
            controls.dampingFactor = 0.5;
            this.controls = controls;
        }

        //load fsf files.
        const url = './test.fsf';
        var fl;
        fetch(url).then((responce) => {
            return responce.json();
        }).then((fsfile) => {
            fsfile.scene = this.refs.scene;
            fsfile.objects = objects;
            fl = new FSFLoader(fsfile);

            /* controls */
            fl.setRoom();
            fl.putFurnituresAll(this.objects);

        });


    }

    componentWillUnmount() {
        this.controls.dispose();
        delete this.controls;
    }


    _onDocumentMouseDown(event) {
        event.preventDefault();

        this.raycaster.setFromCamera(this.movable.mouse, this.refs.camera);
        const intersects = this.raycaster.intersectObjects(this.objects);

        if (intersects.length > 0) {
            controls.enabled = false;

            draggedObj = intersects[0].object;

            if (raycaster.ray.intersectPlane(plane, intersection)) {
                offset.copy(intersection).sub(draggedObj.position);
            }
        }
    }

    _onDocumentMouseMove(event) {
        event.preventDefault();

        this.movable.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.movable.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.movable.mouse, this.refs.camera);

        if (this.movable.draggedObj) {
            if (this.movable.raycaster.ray.intersectPlane(this.movable.plane, this.movable.intersection)) {
                this.movable.draggedObj.position.copy(this.movable.intersection.sub(offset));
            }
        } else {
            const intersects = this.movable.raycaster.intersectObjects(this.objects);

            if (intersects.length > 0) {
                if (this.movable.mouseoveredObj != intersects[0].object) {
                    this.movable.mouseoveredObj = intersects[0].object;
                    this.refs.camera.getWorldDirection(this.movable.plane.normal);
                }
            } else {
                this.movable.mouseoveredObj = null;
            }
        }
    }

    _onDocumentMouseUp(event) {
        event.preventDefault();
        this.movable.controls.enabled = true;

        if (this.movable.mouseoveredObj) {
            this.movable.draggedObj = null;
        }
    }

    pushPage() {
        this.props.navigator.pushPage({ component: ThirdPage, props: { key: ++keys } });
    }

    popPage() {
        this.props.navigator.popPage();
    }

    render() {
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left"><BackButton>Back</BackButton></div>
                    <div className="center">3D Test</div>
                </Toolbar>
            }>
                <React3
                    mainCamera="camera"
                    width={width}
                    height={height}
                    clearColor={0x000000}
                    pixelRatio={window.devicePixelRatio}
                    onAnimate={this._onAnimate.bind(this)}
                >
                    <scene ref="scene">
                        <directionalLight
                            position={this.lightPosition}
                            color={0xFFFFFF}
                        />
                        <ambientLight color={0x333333} />
                        <perspectiveCamera
                            name="camera"
                            ref="camera"
                            fov={45}
                            aspect={width / height}
                            near={1}
                            far={2000}
                            position={this.cameraPosition}
                        />
                        <gridHelper size={200} step={50} />
                        <axisHelper size={1000} />

                    </scene>
                </React3>

            </Page>
        );
    }
}

export default class extends Component {
    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;

        return React.createElement(route.component, props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{ component: MainPage, props: { key: ++keys } }}
                renderPage={this.renderPage}
            />
        );
    }
}