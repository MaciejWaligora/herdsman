import { isThisTypeNode } from "typescript";
import { Animal } from "./Animal";
import { AnimatedElement, AnimatedElementConfig } from "./AnimatedElement";
export interface MainHeroConfig extends AnimatedElementConfig{
    herdLimit: number;
}
export class MainHero extends AnimatedElement<MainHeroConfig>{
    private _animals: Animal[] = []

    public addAnimal(animal: Animal){
        this._animals.push(animal);
    }

    public looseAnimal(animal: Animal){
        const index = this._animals.indexOf(animal);
        delete this._animals[index];
    }

    public isfull(): boolean{
        if(this._animals.length < this._config.herdLimit){
            return false;
        }
        return true;
    }
}