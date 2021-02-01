import { Selection } from './selection';
import './index.css';

interface IEditorProps {
  container: HTMLElement;
  editable: boolean;
  createToolbar?: (editor: Editor) => HTMLElement[];
}

export class Editor {
  // 编辑器容器
  private container: HTMLElement;

  // 编辑器主体
  private body: HTMLElement | null = null;

  // 是否可编辑
  private editable: boolean;

  public selection: Selection;

  constructor(props: IEditorProps) {
    this.container = props.container;
    this.editable = props.editable;

    if (props.createToolbar) {
      this._initToolBar(props.createToolbar(this));
    }

    this._initBody();
    this.selection = new Selection({
      body: this.body!,
    });
  }

  private _initBody() {
    const div = document.createElement('div');
    div.className = 'editor-body';
    div.contentEditable = this.editable.toString();
    div.innerHTML = '<div />'
    this.body = div;
    this.container.appendChild(div);
  }

  private _initToolBar(btns) {
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    toolbar.append(...btns);

    this.container.appendChild(toolbar);
  }

  execCommand() {
    
  }
}