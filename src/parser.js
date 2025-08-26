export function parseCode(code) {
  const lines = code.split("\n");
  let list = [];
  let steps = [];

  let vars = {}; // maps variable name -> node index in list

  lines.forEach((lineRaw) => {
    let line = lineRaw.trim();
    if (!line) return;

    let currentList = JSON.parse(JSON.stringify(list)); // deep copy

    // Case 1: Node* var = new Node(value);
    let matchCreate = line.match(/Node\*\s*(\w+)\s*=\s*new\s*Node\((\d+)\)/);
    if (matchCreate) {
      const [, varName, value] = matchCreate;
      list.push({ id: list.length, value: parseInt(value), next: null });
      vars[varName] = list.length - 1;
    }

    // Case 2: var->next = new Node(value);
    let matchNextNew = line.match(/(\w+)->next\s*=\s*new\s*Node\((\d+)\)/);
    if (matchNextNew) {
      const [, varName, value] = matchNextNew;
      list.push({ id: list.length, value: parseInt(value), next: null });
      let nodeIdx = vars[varName];
      list[nodeIdx].next = list.length - 1;
    }

    // Case 3: var->next = otherVar;
    let matchNextVar = line.match(/(\w+)->next\s*=\s*(\w+)/);
    if (matchNextVar && !matchNextVar[2].includes("new")) {
      const [, varName, otherVar] = matchNextVar;
      let nodeIdx = vars[varName];
      list[nodeIdx].next = vars[otherVar];
    }

    // Case 4: var = otherVar;
    let matchAssign = line.match(/(\w+)\s*=\s*(\w+)/);
    if (matchAssign && !line.includes("new Node")) {
      const [, varName, otherVar] = matchAssign;
      vars[varName] = vars[otherVar];
    }

    steps.push({
      code: line,
      list: JSON.parse(JSON.stringify(list)),
    });
  });

  return steps;
}
