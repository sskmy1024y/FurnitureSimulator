import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import { runInThisContext } from 'vm';

var OrbitControls = require('three-orbit-controls')(THREE)
var ColladaLoader = require('three-collada-loader');
var TDSLoader = require('three-3dsloader');
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

export default class Furniture {
    constructor(data) {
        this.id = data.id || null;
        this.file_type = data.file_type;
        this.main_src = data.main_src;
        this.texture_src = data.texture_src || null;
        this.position = data.position || { "x": 0, "y": 0, "z": 0 };
        this.rotation = data.rotation || { "x": 0, "y": 0, "z": 0 };
        this.scale = data.scale || { "x": 1, "y": 1, "z": 1 };
    }

    getMainSrc() {
        return this.main_src;
    }

    getPosition() {
        return this.position;
    }

    putScene(scene, list) {
        if (!this.file_type) return -1;

        switch (this.file_type) {
            case "dae":
                this._putSceneDEA(scene);
                break;
            case "mtl-obj":
                this._putSceneOBJ(scene);
                break;
            case "3ds":
                this._putScene3DS(scene);
                break;

        }
    }

    _putSceneDEA(scene) {
        const loader = new ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load(this.main_src, (collada) => {
            let model = collada.scene;
            model.position.x = this.position.x || 0;
            //よくわからないけど、yとzが変
            //model.position.y = this.position.y || 0;
            //model.position.z = this.position.z || 0;
            model.position.y = this.position.z || 0;
            model.position.z = this.position.y || 0;

            console.log(this.scale);
            
            model.scale.x = this.scale.x || 1;
            model.scale.y = this.scale.y || 1;
            model.scale.z = this.scale.z || 1;

            model.updateMatrix();
            scene.add(model);
        })
    }

    _putSceneOBJ(scene) {
        let objloader = new OBJLoader();
        let mtlLoader = new MTLLoader();
        mtlLoader.load(this.texture_src, (materials) => {
            materials.preload();
            objloader.setMaterials(materials);
            objloader.load(this.main_src, (model) => {
                model.position.x = this.position.x || 0;
                model.position.y = this.position.z || 0;
                model.position.z = this.position.y || 0;
                scene.add(model);
            })
        });
    }

    _putScene3DS(scene) {
        var tdsLoader = new TDSLoader();
        tdsLoader.setPath(this.texture_src);
        tdsLoader.load(this.main_src, (model) => {
            model.position.x = this.position.x || 0;
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