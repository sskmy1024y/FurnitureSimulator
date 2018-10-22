import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

var OrbitControls = require('three-orbit-controls')(THREE)

class GreenCube extends Component {
  render() {
    return <mesh>
            <boxGeometry width={200} height={200} depth={200} />
            <meshBasicMaterial color={0x00ee00} />
           </mesh>
  }
}

const width = window.innerWidth;
const height = window.innerHeight;

export default class Example extends Component {


  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }


  render() {
    var aspectratio = width / height;

    var cameraprops = {fov : 75, aspect : aspectratio,
                      near : 0.1, far : 1000,
                      position : new THREE.Vector3(300,400,600),
                      lookAt : new THREE.Vector3(0,0,0) };

    return (<React3 mainCamera="maincamera" width={width} height={height} clearColor={0xf5f9ff}>
              <scene>
                <perspectiveCamera ref="camera" name="maincamera" {...cameraprops} />
                <GreenCube />
              </scene>
          </React3>);
  }
}