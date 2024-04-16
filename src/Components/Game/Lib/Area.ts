import * as PIXI from "pixi.js"

export interface AreaConfig{
    width: number;
    height: number;
    x: number;
    y: number;
    color: number;
}

export class Area <T extends AreaConfig> extends PIXI.Graphics{
    private _config!: T;

    constructor(config: T){
        super();
        this._config = config;
        
        this.beginFill(config.color);
        this.drawRect(config.x, config.y, config.width, config.height);
        this.endFill();
    }

    public bounds(){
        const config = this._config;

        const bounds = {
            top: config.y,
            bottom: config.y + this.height, 
            left: config.x,
            right: config.x + this.width
        }
        return bounds
    }
}