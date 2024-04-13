import { Component, ReactNode } from "react";

export interface GameCanvasConfig {
    width: number;
    height: number;
}

export function GameCanvas<T extends GameCanvasConfig>({ height, width }: T) {
    return <canvas height={height} width={width}></canvas>
}