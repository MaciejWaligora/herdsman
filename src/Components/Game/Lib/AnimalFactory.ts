import * as PIXI from "pixi.js"
import { Animal } from "./Animal";
import { MainHero } from "./MainHero";
import { Bounds } from "./AnimatedElement";

export interface AnimalFactoryConfig{
    speed: number;
    textureURL: string;
    initialX?: number;
    initialY?: number;
    scale?: number;
    gameHero?: MainHero;
    bounds?: Bounds
}

export class AnimalFactory{

    static async build(config:  AnimalFactoryConfig){
        
        const texture = await PIXI.Assets.load(config.textureURL);
        const animalConfig = {...config, gameHero: config.gameHero, texture: texture}
        if(config.gameHero){
            const animal = new Animal(animalConfig);

            if (config.scale)
            {
                animal.scale.set(config.scale);
            }
            
            return animal;
        }
    }
}