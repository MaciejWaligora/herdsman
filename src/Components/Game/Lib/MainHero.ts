import { AnimatedElement, AnimatedElementConfig } from "./AnimatedElement";
export interface MainHeroConfig extends AnimatedElementConfig{
    herdLimit: number;
}
export class MainHero extends AnimatedElement<MainHeroConfig>{
    private animals: number = 0;

    public isfull(): boolean{
        if(this.animals >= this._config.herdLimit){
            return true;
        }
        return false;
    }

    public getAnimals(){
        return this.animals;
    }

    public addAnimal(){
        this.animals++;
    }

    public removeAnimal(){
        if(this.animals > 0){
            this.animals--;
        }
    }
}