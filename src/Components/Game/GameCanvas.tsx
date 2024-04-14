import React, { Component } from "react";
import * as PIXI from "pixi.js"
import { BackgroundConfig } from "./Lib/Background";
import { FieldArea, FieldAreaConfig } from "./Lib/FieldArea";
import { YardArea, YardAreaConfig } from "./Lib/YardArea";
import { MainHeroFactory, MainHeroFactoryConfig } from "./Lib/MainHeroFactory";
import { AnimatedElement, AnimatedElementConfig } from "./Lib/AnimatedElement";
import { MainHero } from "./Lib/MainHero";

export interface GameCanvasConfig {
    width: number;
    height: number;
    background: BackgroundConfig;
    componenets: GameComponentsConfig;
}

export interface GameComponentsConfig {
    fieldArea: FieldAreaConfig,
    yardArea: YardAreaConfig,
    mainHero: MainHeroFactoryConfig
}


export class GameCanvas<T extends GameCanvasConfig> extends Component {

    private _parentRef = React.createRef<HTMLDivElement>();
    private _pixiDisplay!: PIXI.Application;
    private _config!: GameCanvasConfig;
    private _gameElements: AnimatedElement<AnimatedElementConfig>[] = [];
    private _gameHero!: MainHero;

    constructor(config: T) {

        super(config);

        this._config = config;
        this._pixiDisplay = new PIXI.Application({
            width: config.width,
            height: config.height,
            backgroundColor: config.background.color
        });

    }

    public componentDidMount(): void {

        const config = this._config;
        this._loadView();
        this._loadInitialGameComponents(config.componenets);
        this._loadAnimatedElements();

    }

    private _loadInitialGameComponents(gameComponents: GameComponentsConfig): void {

        const fieldArea = new FieldArea(gameComponents.fieldArea);
        const yardArea = new YardArea(gameComponents.yardArea);
        const components = [fieldArea, yardArea];

        for (let component of components) {
            this._pixiDisplay.stage.addChild(component as PIXI.DisplayObject);
        }

    }

    private _loadAnimatedElements() {

        const config = this._config.componenets;

        new MainHeroFactory().build(config.mainHero).then((mainHero) => {
            this._pixiDisplay.stage.addChild(mainHero as PIXI.DisplayObject);
            this._gameElements.push(mainHero);
            this._gameHero = mainHero;
            this._pixiDisplay.ticker.add((time) => {
                mainHero.move(config.mainHero.speed);
            })
        })

    }

    private _loadView() {

        this._parentRef.current?.appendChild(this._pixiDisplay.view as HTMLCanvasElement);

    }

    public _clickHandler(event: React.MouseEvent<HTMLElement>) {

        const rect = this._parentRef.current?.children[0].getBoundingClientRect();

        if (rect && rect.left < event.clientX && rect.right > event.clientX && rect.bottom > event.clientY && rect.top < event.clientY) {

            this._gameHero.setTarget([event.clientX, event.clientY], rect);

        }

    }

    public render(): React.ReactNode {

        return <div ref={this._parentRef} onMouseDown={(e) => { this._clickHandler(e) }}></div>

    }
} 