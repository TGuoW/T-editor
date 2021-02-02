import { Editor, Toolbar } from '../src';

(window as any).editor = new Editor({
  container: document.getElementById('editor')!,
  editable: true,
  createToolbar: (editor) => {
    return [
      Toolbar.bold(editor),
      Toolbar.color(editor, [
        ['#ffffff', 'red'],
        ['#000000', 'blue']
      ]),
      Toolbar.heading(editor, ['H1', 'H2', 'H3']),
    ]
  }
})