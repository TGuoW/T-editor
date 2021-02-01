interface IPoint {
  line: number;
  col: number;
}
interface IRange {
  start: IPoint;
  end: IPoint;
}

interface ISelectionProps {
  body: HTMLElement;
}

function nodeToPoint(body: HTMLElement, node: Node, offset: number): IPoint {
  let lineNode = node;

  // body下的每一个child都是一行
  while (lineNode.parentNode && lineNode.parentNode !== body) {
    lineNode = lineNode.parentNode;
  }

  const line = Array.from(body.childNodes).indexOf(lineNode as Element);

  const range = document.createRange();
  range.setStart(lineNode, 0);
  range.setEnd(node, offset);
  const content = range.cloneContents();
  const col = content.textContent!.length;

  return {
    line, 
    col,
  }
}

const TEXT_NODE = 3;

function pointToNode(body, point: IPoint) {
  const { line, col } = point;
  const lineNode: Node = body.childNodes[line];

  const texts: Node[] = [];
  if (lineNode.nodeType === TEXT_NODE) {
    texts.push(lineNode)
  } else {
    const dfs = (node: Node) => {
      const children = node.childNodes;
      children.forEach(child => {
        if (child.nodeType === TEXT_NODE) {
          texts.push(child);
        } else {
          dfs(child);
        }
      });
    }
  
    dfs(lineNode);
  }

  let tmpCol = 0;
  for (const idx in texts) {
    if (tmpCol + texts[idx].textContent!.length >= col) {
      return {
        node: texts[idx],
        offset: col - tmpCol,
      }
    }
  }

  return {
    node: lineNode,
    offset: lineNode.childNodes.length,
  }
}

function isPointEqual(point1: IPoint, point2: IPoint) {
  return (
    point1.line === point2.line &&
    point1.col === point2.col
  )
}

function isRangeEqual(range1: IRange, range2: IRange) {
  return (
    isPointEqual(range1.start, range2.start) &&
    isPointEqual(range1.end, range2.end)
  )
}

// 简易的选区系统
export class Selection {
  private range: IRange | null = null;

  constructor(private props: ISelectionProps) {
    this.setSelecton({
      start: { line: 0, col: 0 },
      end: { line: 0, col: 0 },
    });
    document.addEventListener('selectionchange', this._handleSelectionChange);
  }

  private _handleSelectionChange = () => {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

    if (!anchorNode || !focusNode) {
      return;
    }

    const { body } = this.props;

    if (
      !body.contains(anchorNode) ||
      !body.contains(focusNode)
    ) {
      return;
    }

    const start = nodeToPoint(body, anchorNode, anchorOffset);
    const end = nodeToPoint(body, focusNode, focusOffset);

    this.setSelecton({
      start,
      end,
    })
  }

  setSelecton(range: IRange) {
    if (this.range && isRangeEqual(this.range, range)) {
      return;
    }
    this.range = range;

    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    const { body } = this.props;
    const { node: startNode, offset: startOffset } = pointToNode(body, range.start);
    const { node: endNode, offset: endOffset } = pointToNode(body, range.end);
    const domRange = document.createRange();
    domRange.setStart(startNode, startOffset);
    domRange.setEnd(endNode, endOffset);
    selection.removeAllRanges();
    selection.addRange(domRange);
  }

  destroy() {
    document.removeEventListener('selectionchange', this._handleSelectionChange);
  }
}
