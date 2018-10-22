import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';


// onsenUI import
import ons from 'onsenui';
import { Navigator, Page, Button, Toolbar, BackButton, Card } from 'react-onsenui';


class MainPage extends Component {
    pushPage() {
        this.props.navigator.pushPage({ component: ThreeJSPage });
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

class ThreeJSPage extends Component {
    constructor(props, context) {
        super(props, context);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.
        this.cameraPosition = new THREE.Vector3(0, 100, 500);
        this.lightPosition = new THREE.Vector3(0, 100, 30);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

        this.state = {
            dirZ: -1,
            dirRad: rad,
            planePosition: new THREE.Vector3(0, 0, 500),
            planeRotation: new THREE.Euler(0, 0, 0),
        };

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.



            this.setState({
                planePosition: new THREE.Vector3(
                    this.state.planePosition.x,
                    this.state.planePosition.y,
                    this.state.planePosition.z + this.state.dirZ
                ),
                planeRotation: new THREE.Euler(
                    this.state.planeRotation.x + this.state.dirRad,
                    this.state.planeRotation.y,
                    this.state.planeRotation.z + this.state.dirRad
                )

            });
        };
    }

    pushPage() {
        this.props.navigator.pushPage({ component: ThirdPage });
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
                    <scene>
                        <directionalLight position={this.lightPosition} />
                        <ambientLight color={0xaaaaaa} />
                        <perspectiveCamera
                            name="camera"
                            fov={45}
                            aspect={width / height}
                            near={1}
                            far={2000}
                            position={this.cameraPosition}
                        />
                        <gridHelper size={200} step={50} />
                        <axisHelper size={1000} />

                        {this.props.texture ?
                            <mesh
                                position={this.state.planePosition}
                                rotation={this.state.planeRotation}
                            >
                                <planeGeometry
                                    width={this.props.texture.image.width / 2}
                                    height={this.props.texture.image.height / 2}
                                />
                                <meshLambertMaterial
                                    map={this.props.texture}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                            : null}
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
                initialRoute={{ component: MainPage }}
                renderPage={this.renderPage}
            />
        );
    }
}