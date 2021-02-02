import './index.css';
import {
  createToolBarButton,
  createToolBarDropList,
  renderColorTable,
  renderHeadingList,
} from './utils';

export const Toolbar = {
  bold (editor) {
    return createToolBarButton('bold', () => {
      editor.execCommand('bold');
    })
  },
  color (editor, colorMap: string[][]) {
    return createToolBarDropList('color', renderColorTable(colorMap), (e: MouseEvent) => {
      const color = (e.target as HTMLElement).getAttribute('data-color');
      if (color) {
        editor.execCommand('foreColor', false, color);
      }
    });
  },
  heading (editor, headings: string[]) {
    return createToolBarDropList('heading', renderHeadingList(headings), (e) => {
      const heading = (e.target as HTMLElement).getAttribute('data-heading');
      if (heading) {
        editor.execCommand('formatBlock', false, heading);
      }
    })
  },
}