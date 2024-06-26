import { Animal, AnimalConfig } from "./Animal";
import { AnimalFactory, AnimalFactoryConfig } from "./AnimalFactory";
import { Bounds, Target } from "./AnimatedElement";
import { Area, AreaConfig } from "./Area";
import { MainHero } from "./MainHero";
import * as PIXI from "pixi.js";

export interface AnimalSpawnerConfig{
    animalConfig: AnimalFactoryConfig;
    spawningArea: Area<AreaConfig>;
    mainHero: MainHero;
    pixiApp: PIXI.Application;
    walkingBounds: Bounds;
    animalsList: Animal[]
}

export class AnimalSpawner<T extends AnimalSpawnerConfig>{

    private _config!:T;

    constructor(config: T){
        this._config = config;
    }

    private _spawnOne(spawnTarget: Target){
        const area = this._config.spawningArea;
        const spawnBounds: Bounds = {
            top: area.y,
            bottom: area.height,
            left: area.x,
            right: area.width
        }
        
        const config = {...this._config.animalConfig, initialX: spawnTarget[0], initialY: spawnTarget[1], gameHero: this._config.mainHero, bounds: this._config.walkingBounds, speed: this._getRandomSpeed()};
        

        AnimalFactory.build(config).then((animal)=>{
            if (animal){
                animal.setTarget(spawnTarget, spawnBounds);
                this._config.animalsList.push(animal);
                this._config.pixiApp.stage.addChild(animal as PIXI.DisplayObject);
                this._config.pixiApp.ticker.add((time) => {
                    if(!animal.isDelivered()){
                        animal.checkThePlayer();
                    }else{
                        animal.unfollow();
                    }
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

    private  _getRandomSpeed(){
        const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
        return random(1, 2);
    }

    private _getRandomDelay(){
        const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
        return random(100, 1000);
    }

    public startRandomSpawn(){
        const delay = this._getRandomDelay();
        const target = this._generateRandomSpawnTarget();

        const spawn = () => {
            this._spawnOne(target);
        }

        setTimeout(spawn, delay);
    }

}