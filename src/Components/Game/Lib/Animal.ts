import { AnimatedElement, AnimatedElementConfig, Bounds, Target } from "./AnimatedElement";
import { MainHero } from "./MainHero";

export interface AnimalConfig extends AnimatedElementConfig{
    gameHero?: MainHero;
    bounds?: Bounds;
    distToFollow: number;
    speed: number;
}

export class Animal extends AnimatedElement<AnimalConfig>{

    private _isFollowing = false;

    public startFollow(){
        const config = this._config;
        const offset = config.bounds?.left || 0;
        const offsetY = config.bounds?.top  || 0;
        const playerPosition =  [(config.gameHero?.x || 0) + offset, (config.gameHero?.y || 0) + offsetY] as Target;
        this.setTarget(playerPosition, config.bounds as Bounds);
    }

    public checkThePlayer(){
        const config = this._config;
        const offsetX = config.bounds?.left || 0;
        const offsetY = config.bounds?.top  || 0;

        const playerPosition =  [(config.gameHero?.x || 0) + offsetX, (config.gameHero?.y || 0) + offsetY] as Target;
        const distanceToFollow = this._config.distToFollow
        if(((playerPosition[0] < this.x+ offsetX + distanceToFollow && playerPosition[0] > this.x + offsetX ) || (playerPosition[0] > this.x + offsetX - distanceToFollow && playerPosition[0] < this.x + offsetX)) && ((playerPosition[1] < this.y + offsetY + distanceToFollow && playerPosition[1] > this.y + offsetY) || (playerPosition[1] > this.y + offsetY - distanceToFollow && playerPosition[1] < this.y + offsetY))){
            if(!this._config.gameHero?.isfull()){
                this.startFollow();
                this._isFollowing = true;
            }
        }
        else{
            this._isFollowing = false;
        }
        this.move(this._config.speed);
    }

    public isFollowing(){
        return this._isFollowing;
    }
}