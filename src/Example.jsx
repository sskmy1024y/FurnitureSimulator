import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import FSFLoader from './FSFLoader.jsx';
import Furniture from './Furniture.jsx';

var OrbitControls = require('three-orbit-controls')(THREE);
var ColladaLoader = require('three-collada-loader');
var TDSLoader = require('three-3dsloader');
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

// onsenUI import
import ons from 'onsenui';
import { Navigator, Page, Button, Toolbar, BackButton, Card } from 'react-onsenui';

var keys = 0;



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

const pi = Math.PI;
const rad = pi / 180;
const width = window.innerWidth;
const height = window.innerHeight;


class ThreeJSPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.objects = [];

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.
        this.cameraPosition = new THREE.Vector3(0, 10, 10);
        this.lightPosition = new THREE.Vector3(0, 10, 30);

        //this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

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
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            
            
        };

    }

    componentDidMount() {
        const controls = new OrbitControls(this.refs.camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.5;
        this.controls = controls;

        //Loader Test
        var colladaLoader = new ColladaLoader();
        colladaLoader.options.convertUpAxis = true;
        //colladaLoader.setPath("./models/collada/elf/");
        colladaLoader.load("./models/furnitures/pillow/Pillow DAE.dae", (object) => {
          console.log(object);
          
          let model = object.scene;
          model.position.x = 10;
          model.position.z = 10;
          model.position.y = 0;
          this.refs.scene.add(model);
        });

        var tdsLoader = new TDSLoader();
        //tdsLoader.options.convertUpAxis = true;
        tdsLoader.setPath("./models/furnitures/pillow/Pillow 3DS.3ds");
        tdsLoader.load("./models/furnitures/pillow/Pillow 3DS.3ds", (object) => {
          this.refs.scene.add(object);
        });
        
    }

    componentWillUnmount() {
        this.controls.dispose();
        delete this.controls;
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
                    clearColor={0xf5f9ff}
                    pixelRatio={window.devicePixelRatio}
                    onAnimate={this._onAnimate.bind(this)}
                >
                    <scene ref="scene">
                        <directionalLight
                            position={this.lightPosition}
                            color={0xFFFFFF}
                        />
                        <ambientLight color={0xffffff} />
                        <perspectiveCamera
                            name="camera"
                            ref="camera"
                            fov={45}
                            aspect={width / height}
                            near={0.1}
                            far={10000}
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