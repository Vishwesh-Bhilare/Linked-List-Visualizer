import React, { useState } from "react";
import { parseCode } from "./parser";
import Visualizer from "./Visualizer";

export default function App() {
  const [code, setCode] = useState(`Node* head = new Node(1);
head->next = new Node(2);
head->next->next = new Node(3);

Node* newNode = new Node(0);
newNode->next = head;
head = newNode;`);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const runParser = () => {
    const parsed = parseCode(code);
    setSteps(parsed);
    setStepIndex(0);
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  return (
    <div className="container">
      <h1>Linked List Visualizer</h1>
      <div className="editor-visual">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="editor"
        />
        <div className="visualizer">
          {steps.length > 0 ? (
            <>
              <p><b>Executing:</b> {steps[stepIndex].code}</p>
              <Visualizer nodes={steps[stepIndex].list} />
              <div className="controls">
                <button onClick={prevStep} disabled={stepIndex === 0}>
                  Prev
                </button>
                <button
                  onClick={nextStep}
                  disabled={stepIndex === steps.length - 1}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>Click "Visualize" to start</p>
          )}
        </div>
      </div>
      <button className="run" onClick={runParser}>
        Visualize
      </button>
    </div>
  );
}
