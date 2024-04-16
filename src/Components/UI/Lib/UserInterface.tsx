import Display from "./8_bit_display/display"

export interface UIConfig {
    counterProps: CounterProps;
}

export interface CounterProps {
    width: number;
    theme: "apollo" | "classic" | "electronic";
    value?: number;
}

export function UserInterface(props: UIConfig) {

    return <div className="UserPanel">
        <Display width={props.counterProps.width} theme={props.counterProps.theme} value={props.counterProps.value || 0} ></Display>
    </div>
}