import './index.css';
import {
  createToolBarButton,
  createToolBarDropList,
  renderColorTable,
  renderHeadingList,
} from './utils';

export const Toolbar = {
  bold () {
    return createToolBarButton('bold', () => {
      document.execCommand('bold');
    })
  },
  color (colorMap: string[][]) {
    return createToolBarDropList('color', renderColorTable(colorMap), (e: MouseEvent) => {
      const color = (e.target as HTMLElement).getAttribute('data-color');
      if (color) {
        document.execCommand('foreColor', false, color);
      }
    });
  },
  heading (headings: string[]) {
    return createToolBarDropList('heading', renderHeadingList(headings), (e) => {
      const heading = (e.target as HTMLElement).getAttribute('data-heading');
      if (heading) {
        document.execCommand('formatBlock', false, heading);
      }
    })
  },
}