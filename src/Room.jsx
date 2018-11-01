import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import { runInThisContext } from 'vm';

var OrbitControls = require('three-orbit-controls')(THREE)
var ColladaLoader = require('three-collada-loader');
var TDSLoader = require('three-3dsloader');
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

export default class Room {
    constructor(data) {
        this.size = 1;

        this.mapData = data.mapData;
        this.wallData = data.wallData;
        this.wallHeight = data.wallHeight;
        this.materials = [];

        this.planeGeometry = new THREE.PlaneGeometry(this.size, this.size, this.size);
        this.wallGeometry = new THREE.BoxGeometry(1, 1, 10);

        data.textures.forEach(texture_data => {
            let texture = THREE.ImageUtils.loadTexture(texture_data['texture_path']);
            let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            this.materials.push(material);
        });
    }

    set(scene) {
        //Plane
        for (var xCounter = 0; xCounter < this.mapData.length; xCounter++) {
            for (var zCounter = 0; zCounter < this.mapData[0].length; zCounter++) {
                if (!this.materials[this.mapData[xCounter][zCounter]]) continue;
                const material = this.materials[this.mapData[xCounter][zCounter]];
                let plane = new THREE.Mesh(this.planeGeometry, material);
                plane.position.x = xCounter * this.size;
                plane.position.z = zCounter * this.size;
                plane.rotation.x = Math.PI / 360 * 180;
                scene.add(plane);
            }
        }

        //Wall
        for (var xCounter = 0; xCounter < this.wallData.length; xCounter++) {
            for (var zCounter = 0; zCounter < this.wallData[0].length; zCounter++) {
                if (this.wallData[xCounter][zCounter] > 0) {
                    if (!this.wallData[this.wallData[xCounter][zCounter]]) continue;
                    const material = this.materials[this.wallData[xCounter][zCounter]];
                    let wall = new THREE.Mesh(this.wallGeometry, material);
                    wall.position.x = xCounter * this.size;
                    wall.position.z = (this.wallData[0].length -zCounter)-1 * this.size;
                    wall.position.y = this.wallHeight/2;
                    wall.rotation.x = Math.PI / 360 * 180;
                    scene.add(wall);
                }
            }
        }
    }

    getCenter(){
        return {
            x: this.wallData.length /2,
            y: this.wallHeight /2,
            z: this.wallData[0].length /2
        };
    }
}