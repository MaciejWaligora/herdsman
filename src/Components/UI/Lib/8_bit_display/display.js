import React from "react";
import Digit from "./digit";

export default function Display({ width = 32, value, theme }) {
  let parseValue = (val) => {
    let arr = val.toString().split("");
    for (let [i, char] of arr.entries()) {
      if (char === ".") {
        arr[i - 1] = arr[i - 1] + ".";
        arr = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)];
        break;
      }
    }
    return arr;
  };

  let parsedValue = parseValue(value);

  return (
    <div className="display_container">
      {parsedValue.map((digit, i) => {
        return <Digit val={digit} width={width} key={i} theme={theme}></Digit>;
      })}
    </div>
  );
}
