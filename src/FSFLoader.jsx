import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import Furniture from './Furniture.jsx';

const OrbitControls = require('three-orbit-controls')(THREE)
const ColladaLoader = require('three-collada-loader');

export default class FSFLoader {
    constructor(props){
        this.scene = props.scene;
        this.furnitures = [];

        if (props.furnitures.length > 0){
            props.furnitures.forEach(data => {
                let furniture = new Furniture(data);
                this.furnitures.push(furniture);
            });
        }
    }

    getFurniture(){
        return this.furnitures;
    }

    addFurniture(){

    }

    putFurnituresAll(){
        this.furnitures.forEach(furniture => {
            furniture.putScene(this.scene); 
        });
    }
    
}

