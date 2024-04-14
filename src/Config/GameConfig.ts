import {GameCanvasConfig} from "../Components/Game/GameCanvas"

export interface GameConfig {
    canvasConfig: GameCanvasConfig
}

export const config: GameConfig = {
    canvasConfig: {
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
                scale: 0.5,
                textureURL:'red-circle.png',
                initialX: 50,
                initialY: 50,
            }
        }
    }
}