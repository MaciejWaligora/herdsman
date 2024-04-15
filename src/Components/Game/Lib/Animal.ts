import { AnimatedElement, AnimatedElementConfig } from "./AnimatedElement";
import { MainHero } from "./MainHero";

export interface AnimalConfig extends AnimatedElementConfig{
    gameHero?: MainHero
}

export class Animal extends AnimatedElement<AnimalConfig>{

}