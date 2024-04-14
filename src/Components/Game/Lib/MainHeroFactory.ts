import { MainHero} from "./MainHero";
import * as PIXI from "pixi.js"

export interface MainHeroFactoryConfig{
    textureURL: string;
    initialX: number,
    initialY: number,
    scale?: number
}

export class MainHeroFactory{
    async build(config: MainHeroFactoryConfig){
        
        const texture = await PIXI.Assets.load(config.textureURL);
        const heroConfig = {...config, texture: texture}
        const mainHero = new MainHero(heroConfig);

        if (config.scale)
        {
            mainHero.scale.set(config.scale);
        }
        
        return mainHero;
    }
}