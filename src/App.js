import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  const clear = () => {
    setEvaluated(false);
    setExpression("0");
  };

  const addValue = (value) => {
    if (evaluated) {
      if (/[0-9.]/.test(value)) {
        setExpression(value);
      } else {
        setExpression(expression + value);
      }
      setEvaluated(false);
      return;
    }

    setExpression((prev) => {
      if (prev === "0" && /[0-9]/.test(value)) return value;

      if (value === ".") {
        const parts = prev.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes(".")) return prev;
      }

      if (/[+\-*/]/.test(value)) {
        if (/[+\-*/]$/.test(prev)) {
          if (value === "-") {
            return prev + value; // allow negative
          }
          return prev.replace(/[+\-*/]+$/, value); // replace consecutive ops
        }
      }

      return prev + value;
    });
  };

  const calculate = () => {
    try {
      const result = eval(expression); // acceptable for FCC
      setExpression(result.toString());
      setEvaluated(true);
    } catch {
      setExpression("Error");
    }
  };

  const removeOne = () => {
    setExpression((prev) => {
      if (prev.length <= 1 || prev === "0") return "0";
      return prev.slice(0, -1);
    });
  };

  return (
    <div id="main">
      <main id="calculator">
        <section id="display-screen">
          <div id="display">{expression}</div>
        </section>
        <section id="button-wrapper">
          {/* Top row */}
          <button id="clear" onClick={clear}>
            AC
          </button>
          <button id="remove" onClick={removeOne}>
            <img src="/remove.png" alt="Remove" />
          </button>
          <button id="divide" onClick={() => addValue("/")}>
            /
          </button>
          <button id="multiply" onClick={() => addValue("*")}>
            X
          </button>

          {/* Second row */}
          <button id="seven" onClick={() => addValue("7")}>
            7
          </button>
          <button id="eight" onClick={() => addValue("8")}>
            8
          </button>
          <button id="nine" onClick={() => addValue("9")}>
            9
          </button>
          <button id="subtract" onClick={() => addValue("-")}>
            -
          </button>

          {/* Third row */}
          <button id="four" onClick={() => addValue("4")}>
            4
          </button>
          <button id="five" onClick={() => addValue("5")}>
            5
          </button>
          <button id="six" onClick={() => addValue("6")}>
            6
          </button>
          <button id="add" onClick={() => addValue("+")}>
            +
          </button>

          {/* Fourth row */}
          <button id="one" onClick={() => addValue("1")}>
            1
          </button>
          <button id="two" onClick={() => addValue("2")}>
            2
          </button>
          <button id="three" onClick={() => addValue("3")}>
            3
          </button>
          <button id="equals" onClick={calculate}>
            =
          </button>

          {/* Fifth row */}
          <button id="zero" onClick={() => addValue("0")}>
            0
          </button>
          <button id="decimal" onClick={() => addValue(".")}>
            .
          </button>
        </section>
      </main>
      <footer>
        <h3>Made by Neil Gabriel</h3>
      </footer>
    </div>
  );
}

export default App;
