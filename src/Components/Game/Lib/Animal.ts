
import { AnimatedElement, AnimatedElementConfig, Bounds, Target } from "./AnimatedElement";
import { MainHero } from "./MainHero";

export interface AnimalConfig extends AnimatedElementConfig{
    gameHero?: MainHero;
    bounds?: Bounds;
}

export class Animal extends AnimatedElement<AnimalConfig>{

    public startFollow(){
        const config = this._config;
        const offset = config.bounds?.left || 0;
        const playerPosition =  [(config.gameHero?.x || 0) + offset, config.gameHero?.y] as Target;
        this.setTarget(playerPosition, config.bounds as Bounds);
    }

    public checkThePlayer(){
        const config = this._config;
        const offset = config.bounds?.left || 0;
        const playerPosition =  [(config.gameHero?.x || 0) + offset, config.gameHero?.y] as Target;
        if(((playerPosition[0] < this.x+offset + 50 && playerPosition[0] > this.x + offset ) || (playerPosition[0] > this.x + offset - 50 && playerPosition[0] < this.x + offset)) && ((playerPosition[1] < this.y + 50 && playerPosition[1] > this.y) || (playerPosition[1] > this.y - 50 && playerPosition[1] < this.y))){
            if(!this._config.gameHero?.isfull()){
                this.startFollow();
            }
        }
    }



}