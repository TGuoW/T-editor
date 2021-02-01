import svgs from './icon';

export function createToolBarButton (type, command) {
  const div = document.createElement('div');
  div.className = type + ' btn';
  div.addEventListener('click', command);
  div.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
  div.innerHTML = svgs[type];
  return div;
}

export function createToolBarDropList (type, innerHTML, command) {
  const div = document.createElement('div');
  div.className = ' btn';
  const dropList = document.createElement('div');
  dropList.className = 'drop-list';
  dropList.innerHTML = innerHTML;

  div.addEventListener('click', (e) => {
    command(e);
  });
  div.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
  div.addEventListener('mouseleave', (e) => {
    dropList.remove();
  });
  div.addEventListener('mouseover', (e) => {
    const rect = div.getBoundingClientRect();
    dropList.style.top = rect.y + rect.height + 'px';
    dropList.style.left = rect.x + 'px';
    div.appendChild(dropList);
  });

  div.innerHTML = svgs[type];
  return div;
}


export function renderColorTable(map: string[][]) {
  return map.reduce((html, arr) => {
    const h = arr.reduce((childHtml, value) => {
      return `${childHtml}<div class="drop-item" data-color="${value}" style="background:${value}"></div>`
    }, '');
    return `${html}<div class="drop-row">${h}</div>`;
  }, '');
}

export function renderHeadingList(headings: string[]) {
  return headings.reduce((html, heading) => {
    return `${html}<div class="drop-item" data-heading="${heading}">${heading}</div>`
  }, '');
}
