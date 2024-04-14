import * as PIXI from "pixi.js"

export interface AnimatedElementConfig {
    initialX: number;
    initialY: number;
    texture: PIXI.Texture;
}

type Target = [number, number];

export class AnimatedElement<T extends AnimatedElementConfig> extends PIXI.Sprite {
    private _config!:T
    private _target!: Target; //[x,y]

    constructor(config: T){
        super(config.texture);
        this._config = config;
        this.x = config.initialX;
        this.y = config.initialY;
        this.anchor.set(0.5);
        this._target = [config.initialX, config.initialY];
    }

    public move(){
        
        const target = this._target;
        const currentX = this.x;
        const currentY = this.y;
        const speed = 2; 

        // Calculate the distance to move on each axis
        const dx = target[0] - currentX;
        const dy = target[1] - currentY;

        // Calculate the angle between the current position and the target position
        const angle = Math.atan2(dy, dx);

        // Calculate the distance to move on each frame
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Update the position of the sprite
        this.x += vx;
        this.y += vy;

        // Check if the sprite has reached or passed the target
        if ((target[0] - currentX) * (target[0] - this.x) <= 0 && (target[1] - currentY) * (target[1] - this.y) <= 0) {
            this.x = target[0];
            this.y = target[1];
        }

    }

    public setTarget(target: Target){
        this._target = target;
    }
}