import { Bounds } from "./AnimatedElement";
import { Area, AreaConfig } from "./Area";
import { MainHero} from "./MainHero";
import * as PIXI from "pixi.js"

export interface MainHeroFactoryConfig{
    speed: number;
    textureURL: string;
    initialX: number;
    initialY: number;
    scale?: number;
    bounds?: Bounds;
    herdLimit: number;
}

export class MainHeroFactory{

    static async build(config: MainHeroFactoryConfig){
        
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