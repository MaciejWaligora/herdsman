import * as PIXI from "pixi.js"

export interface AnimatedElementConfig {
    initialX?: number;
    initialY?: number;
    texture: PIXI.Texture;
}
export interface Bounds {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export type Target = [number, number];


export class AnimatedElement<T extends AnimatedElementConfig> extends PIXI.Sprite {

    protected _config!:T;
    private _target!: Target; //[x,y]

    constructor(config: T){

        super(config.texture);

        this._config = config;
        this.x = config.initialX || 0;
        this.y = config.initialY || 0;
        this.anchor.set(0.5);
        this._target = [config.initialX || 0, config.initialY || 0];

    }

    public move(speed: number){
        
        const target = this._target;
        const currentX = this.x;
        const currentY = this.y;

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

    public setTarget(target: Target, bounds: Bounds){

        const width = this.width;
        const height = this.height;

        let x = target[0] - bounds.left;
        let y = target[1] - bounds.top;
        //Adjust the target to make sure the whole Sprite fits the game arena
            if (target[0] < bounds.left + width / 2) {

                x =  width / 2;

            } else if (target[0] > bounds.right - width / 2) {

                x = bounds.right - width / 2 - bounds.left;

            }

            if (target[1] > bounds.bottom - height / 2) {

                y = ( y - height / 2);
                
            } else if (target[1] < bounds.top + height / 2) {

                y = ( y + width / 2);

            }

        this._target = [x, y];
    }         
}