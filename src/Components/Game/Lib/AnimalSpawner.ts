import { AnimalFactory, AnimalFactoryConfig } from "./AnimalFactory";
import { Target } from "./AnimatedElement";
import { Area, AreaConfig } from "./Area";
import { MainHero } from "./MainHero";
import * as PIXI from "pixi.js";

export interface AnimalSpawnerConfig{
    animalConfig: AnimalFactoryConfig;
    spawningArea: Area<AreaConfig>;
    mainHero: MainHero;
    pixiApp: PIXI.Application;
}

export class AnimalSpawner<T extends AnimalSpawnerConfig>{

    private _config!:T;

    constructor(config: T){
        this._config = config;
    }

    private _spawnOne(spawnTarget: Target){

        const config = {...this._config.animalConfig, initialX: spawnTarget[0], initialY: spawnTarget[1], gameHero: this._config.mainHero};

        AnimalFactory.build(config).then((animal)=>{
            if (animal){
                this._config.pixiApp.stage.addChild(animal as PIXI.DisplayObject);
                this._config.pixiApp.ticker.add((time) => {
                    animal.move(config.speed);
                })
            }
        })
    
    }

    private _generateRandomSpawnTarget():Target{
        
        const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
        const area = this._config.spawningArea;

        const minX = area.x;
        const maxX = area.x + area.width;
        const randomX = random(minX, maxX);

        const minY = area.y;
        const maxY = area.y + area.height;
        const randomY = random(minY, maxY);

        return [randomX, randomY];
    }

    public spawnAmount(amount: number){
        for(let i = 0; i < amount; i++){
            const target = this._generateRandomSpawnTarget();
            this._spawnOne(target);
        }
    }

}