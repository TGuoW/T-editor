interface ISelectionProps {
  body: HTMLElement;
}

export class Selection {
  private range: Range | null = null;

  constructor (private props: ISelectionProps) {
    document.addEventListener('selectionchange', this._handleSelectionChange);
  }

  private _handleSelectionChange = () => {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    const { anchorNode, focusNode } = selection;

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

    this.range = selection.getRangeAt(0);
  }

  setSelection = (range?: Range) => {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    selection.removeAllRanges();

    if (range) {
      this.range = range;
    }

    if (this.range) {
      selection.addRange(this.range);
    }
  }
}
