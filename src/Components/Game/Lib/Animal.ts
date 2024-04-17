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
    private _isDelivered = false;

    public startFollow(){
        const config = this._config;
        const currentX = this.x;
        const currentY = this.y;
        const offset = config.bounds?.left || 0;
        const offsetY = config.bounds?.top  || 0;
        const playerPosition =  [(config.gameHero?.x || 0) + offset, (config.gameHero?.y || 0) + offsetY] as Target;
        this.setTarget(playerPosition, config.bounds as Bounds);
        this.move(this._config.speed);
    }

    public checkThePlayer(){
        const config = this._config;
        const currentX = this.x;
        const currentY = this.y;

        const playerPosition =  [config.gameHero?.x, config.gameHero?.y] as Target;
        const distanceToFollow = this._config.distToFollow

        if(((playerPosition[0] <= this.x + distanceToFollow && playerPosition[0] >= this.x ) || (playerPosition[0] >= this.x - distanceToFollow && playerPosition[0] <= this.x)) && ((playerPosition[1] <= this.y + distanceToFollow && playerPosition[1] >= this.y) || (playerPosition[1] >= this.y - distanceToFollow && playerPosition[1] <= this.y))){
            if(!this._config.gameHero?.isfull()){
                this.startFollow();
               if(!this._isFollowing){
                config.gameHero?.addAnimal();
               }
                this._isFollowing = true;
            }else if(this._config.gameHero?.isfull() && this._isFollowing){
                this.startFollow();
            }else{
                this._isFollowing = false;
            }
        }else{
            
            this.unfollow();
        }
    }

    public isFollowing(){
        return this._isFollowing;
    }

    public deliver(){
        this._isDelivered = true;
    }

    public isDelivered(){
        return this._isDelivered;
    }

    public unfollow(){
        if(this._isFollowing){
            this._config.gameHero?.removeAnimal();
            this._isFollowing = false;
        }
    }
}