import React from "react";

export default function Visualizer({ nodes }) {
  if (!nodes || nodes.length === 0) return <p>(empty list)</p>;

  const nodeRadius = 30;
  const spacing = 100;

  return (
    <svg width="100%" height="120">
      {nodes.map((node, idx) => {
        const x = 50 + idx * spacing;
        const y = 60;

        return (
          <g key={idx}>
            <circle cx={x} cy={y} r={nodeRadius} fill="#90cdf4" stroke="#2b6cb0" strokeWidth="2" />
            <text x={x} y={y+5} textAnchor="middle" fontSize="16" fontWeight="bold">
              {node.value}
            </text>
            {node.next !== null && (
              <line
                x1={x + nodeRadius}
                y1={y}
                x2={50 + node.next * spacing - nodeRadius}
                y2={y}
                stroke="black"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#000" />
        </marker>
      </defs>
    </svg>
  );
}
