import * as PIXI from "pixi.js"

export interface AnimatedElementConfig {
    initialX: number;
    initialY: number;
    texture: PIXI.Texture;
}

type target = [number, number];
export class AnimatedElement<T extends AnimatedElementConfig> extends PIXI.Sprite {
    private _config!:T
    private _target!: target; //[x,y]
    constructor(config: T){
        super(config.texture);
        this._config = config;
        this.x = config.initialX;
        this.y = config.initialY;
        this.anchor.set(0.5);
        this._target = [config.initialX, config.initialY];
    }

    public move(target: target){
        this._target = target;
    }
}