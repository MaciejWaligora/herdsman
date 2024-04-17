import Display from "./Lib/8_bit_display/display"

export interface UIConfig {
    counterProps: CounterProps;
}

export interface CounterProps {
    width: number;
    theme: "apollo" | "classic" | "electronic";
    value?: number;
}

export function UserInterface(props: UIConfig) {

    // Display is a ready componenet I created available here: https://github.com/MaciejWaligora/8-bit_display_React , sorry for js
    return <div className="UserPanel">
        <Display width={props.counterProps.width} theme={props.counterProps.theme} value={props.counterProps.value || 0} ></Display>
    </div>
}