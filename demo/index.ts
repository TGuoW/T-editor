import { Editor, Toolbar } from '../src';

(window as any).editor = new Editor({
  container: document.getElementById('editor')!,
  editable: true,
  createToolbar: (editor) => {
    console.log(editor);
    return [
      Toolbar.bold(),
      Toolbar.color([
        ['#ffffff', 'red'],
        ['#000000', 'blue']
      ]),
      Toolbar.heading(['H1', 'H2', 'H3']),
    ]
  }
})