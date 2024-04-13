import {GameCanvasConfig} from "../Components/Game/GameCanvas"

export interface GameConfig {
    canvasConfig: GameCanvasConfig
}

export const config: GameConfig = {
    canvasConfig: {
        width: 200,
        height: 100
    }
}