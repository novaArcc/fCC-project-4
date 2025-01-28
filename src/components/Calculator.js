import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [displayText, setDisplayText] = useState("0");
    const [isEvaluated, setIsEvaluated] = useState(false);
    const [lastResult, setLastResult] = useState(null);

    const handleKeyPress = (e) => {
        const value = e.target.textContent;

        // Reset if "AC" is pressed
        if (value === "AC") {
            setDisplayText("0");
            setIsEvaluated(false);
            setLastResult(null);
            return;
        }

        // Handle "=" button (evaluate the expression)
        if (value === "=") {
            try {
                const result = eval(displayText); // Evaluate the expression
                setDisplayText(result.toString());
                setLastResult(result);
                setIsEvaluated(true);
            } catch {
                setDisplayText("Error");
                setIsEvaluated(true);
            }
            return;
        }

        // Handle operators (+, -, *, /)
        if (/[\+\-\*\/]/.test(value)) {
            setDisplayText((prev) => {
                // If already evaluated, continue from the last result
                if (isEvaluated) {
                    setIsEvaluated(false);
                    return lastResult + value;
                }

                // Handle consecutive operators (ignore all but the last one)
                if (/[\+\-\*\/]/.test(prev.slice(prev.length -  1, prev.length))) {
                    if (value === "-") {
                        return prev + value; // Allow "-" after an operator for negative numbers
                    }else if(/[\+\-\*\/]/.test(prev.slice(prev.length -  2, prev.length -1))) {
                        return prev.slice(0, -2) + value; // Replace the last operator with the new one
                    }
                    return prev.slice(0, -1) + value; // Replace the last operator with the new one
                }

                return prev + value; // Append the operator if no consecutive operator
            });
            return;
        }

        // Handle decimal point
        if (value === ".") {
            setDisplayText((prev) => {
                const lastNumber = prev.split(/[\+\-\*\/]/).pop();
                if (lastNumber.includes(".")) {
                    return prev; // Prevent adding multiple decimals to a number
                }
                return prev === "0" ? "0." : prev + ".";
            });
            return;
        }

        // Handle digits and numbers
        setDisplayText((prev) => (isEvaluated ? value : prev === "0" ? value : prev + value));
        setIsEvaluated(false);
    };

    return (
        <div className="calc-container d-flex justify-content-center align-items-center">
            <div className="calc d-flex flex-column">
                <div id="display" className="display">{displayText}</div>
                {/* row 1 */}
                <div className="roww d-flex justify-content-center align-items-center">
                    <button onClick={handleKeyPress} id="clear" className="number ac">AC</button>
                    <button onClick={handleKeyPress} id="divide" className="number divide">/</button>
                    <button onClick={handleKeyPress} id="multiply" className="number multiply">*</button>
                    <button className="number empty"></button>
                </div>
                {/* row 2 */}
                <div className="roww d-flex justify-content-center align-items-center">
                    <button onClick={handleKeyPress} id="seven" className="number 7">7</button>
                    <button onClick={handleKeyPress} id="eight" className="number 8">8</button>
                    <button onClick={handleKeyPress} id="nine" className="number 9">9</button>
                    <button onClick={handleKeyPress} id="subtract" className="number minus">-</button>
                </div>
                {/* row 3 */}
                <div className="roww d-flex justify-content-center align-items-center">
                    <button onClick={handleKeyPress} id="four" className="number 4">4</button>
                    <button onClick={handleKeyPress} id="five" className="number 5">5</button>
                    <button onClick={handleKeyPress} id="six" className="number 6">6</button>
                    <button onClick={handleKeyPress} id="add" className="number plus">+</button>
                </div>
                {/* row 4 */}
                <div className="roww d-flex justify-content-center align-items-center">
                    <button onClick={handleKeyPress} id="one" className="number 1">1</button>
                    <button onClick={handleKeyPress} id="two" className="number 2">2</button>
                    <button onClick={handleKeyPress} id="three" className="number 3">3</button>
                    <button className="number empty"></button>
                </div>
                {/* row 5 */}
                <div className="roww d-flex justify-content-center align-items-center">
                    <button onClick={handleKeyPress} id="zero" className="number 0">0</button>
                    <button className="number"></button>
                    <button onClick={handleKeyPress} id="decimal" className="number decimal">.</button>
                    <button onClick={handleKeyPress} id="equals" className="number equals">=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

