# Furniture Simulator

## FSF File
It's Room and Furniture maps file. Actually, just JSON file. Sample file is `dist/test.fsf`.

Furniture list is `dist/models/models.json`. It's all Furniture include.

```JSON
{
    "name": "test", // Room Name
    "world": {
        "paneSize": 1,
        "mapData": [
            // Associative array.
            // mapData is Floar tiles.
        ],
        "wallData": [
            // Associative array.
            // wallData is Wall map.
        ],
        "textures": [
            // textures list.
            // array number is wall number.
            {
                "texture_name": "テスト",   // texture name
                "texture_path": "./models/rooms/textures/flooring.jpg"  // texture path
            }
        ],
        "wallHeight": 12 //wall height.
    },


     "furnitures": [
         // include furnitures
        {
            "id": 100,  // furniture id.
            "position":{    // default x0, y0, z0
                "x": 0,
                "y": 0,
                "z": 0
            },
            "rotation":{    // default x0, y0, z0
                "x": 0,
                "y": 1.5,
                "z": 0
            },
            "scale":{   // default x1, y1, z1
                "x": 6,
                "y": 5,
                "z": 8
            }
        }
    ]
}
```

```json
[{
    "id": 100,  // furniture id.
    "name": "pillow1",  // object name
    "tags":[
        "pillow"    // 今は特に意味はない
    ],
    "file_type": "dae", // extention. dea or 3ds or obj and mtl files.
    "main_src": "./models/furnitures/pillow/Pillow DAE.dae",    // dea or 3ds or obj file path
    "texture_src": null,    // texture or mtl file path
},{
    "id": 200,
    "name": "chair1",
    "tags": [
        "chair"
    ],
    "file_type": "mtl-obj",
    "main_src": "./models/furnitures/office_chair/office_chair.obj",
    "texture_src": "./models/furnitures/office_chair/office_chair.mtl"
},{
    //....
}]