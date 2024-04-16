import {GameCanvasConfig} from "../Components/Game/GameCanvas"

export interface GameConfig {
    canvasConfig: GameCanvasConfig
}

export const config: GameConfig = {
    canvasConfig: {
        animalQty: 5,
        width: 800,
        height: 600,
        background: {
            color: 0x000000
        },
        componenets: {
            fieldArea: {
                x:0,
                y:0,
                width: 800,
                height: 600,
                color: 0x00ff00
            },
            yardArea: {
                x:0,
                y:0,
                width: 50,
                height: 50,
                color: 0xffff00
            },
            mainHero:{
                herdLimit: 1,
                speed: 20,
                scale: 0.5,
                textureURL:'red-circle.png',
                initialX: 50,
                initialY: 50,
            },
            animal:{
                distToFollow: 100,
                speed: 0,
                scale: 0.008,
                textureURL:'white-circle.png',
                initialX: 50,
                initialY: 50,
            }
        }
    }
}