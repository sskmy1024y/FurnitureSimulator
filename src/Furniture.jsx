import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

var OrbitControls = require('three-orbit-controls')(THREE)
var ColladaLoader = require('three-collada-loader');

export default class Furniture {
    constructor(data) {
        this.id = data.modelid || undefined;
        this.src_path = data.src_path;
        this.position = data.position || { "x": 0, "y": 0, "z": 0 };
    }


    getSrc_path() {
        return this.src_path;
    }

    getPosition() {
        return this.position;
    }

    putScene(scene) {
        console.log(scene);
        
        // 3DS形式のモデルデータを読み込む
        const loader = new ColladaLoader();
        loader.options.convertUpAxis = true;
        // 3dsファイルのパスを指定
        loader.load(this.src_path, (collada) => {
            // 読み込み後に3D空間に追加
            var model = collada.scene;
            console.log(model);
            
            model.position.x = this.position.x || 0;
            //よくわからないけど、yとzが変
            //model.position.y = this.position.y || 0;
            //model.position.z = this.position.z || 0;
            model.position.y = this.position.z || 0;
            model.position.z = this.position.y || 0;

            scene.add(model);
        });
    }

}

function Test(props, scene) {
    /**
     * posrion
     * rotation
     * width
     * height
     * map
     * side
     */
    // 3DS形式のモデルデータを読み込む
    const loader = new ColladaLoader();
    loader.options.convertUpAxis = true;
    // 3dsファイルのパスを指定
    loader.load('./models/collada/elf/elf.dae', (collada) => {
        // 読み込み後に3D空間に追加
        var model = collada.scene;

        model.position.x = props.position.x || 0;
        model.position.y = props.position.y || 0;
        model.position.z = props.position.z || 0;

        scene.add(model);
    });

};

export function PromisTest(props) {

}

export function GreenCube(props) {
    return (
        <mesh>
            <boxGeometry width={200} height={200} depth={200} />
            <meshBasicMaterial color={0x00ee00} />
        </mesh>
    )
}