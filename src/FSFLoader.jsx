import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import Furniture from './Furniture.jsx';
import Room from './Room.jsx';

export default class FSFLoader {
    constructor(props){
        this.scene = props.scene;
        this.room = null;
        this.objects = {
            furnitures: []
        };

        if (props.world){
            this.room = new Room(props.world);
        }

        if (props.furnitures.length > 0){
            props.furnitures.forEach(data => {
                if (data.id && props.objects[data.id]) this.objects.furnitures.push(props.objects[data.id]); 
            });
            console.log(this.objects);
            
        }
    }

    getFurniture(){
        return this.furnitures;
    }

    addFurniture(){

    }

    getRoom(){
        return this.room;
    }
    setRoom(){
        this.room.set(this.scene);
    }

    putFurnituresAll(list){
        this.objects.furnitures.forEach(furniture => {
            furniture.putScene(this.scene, list);
        });
    }
    
    
}

