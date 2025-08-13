import '../../scripts/reveal.js/dist/reveal.js';
import RevealHighlight from '../../scripts/reveal.js/plugin/highlight/highlight.esm.js'

export default function decorate(block) {
  

const [...slides] = block.children;

const mainDiv = document.createElement('div');
[...block.children].forEach((row) => {
    const section = document.createElement('section');
    row.className = row.lastElementChild.textContent
    row.removeChild(row.lastElementChild);
    section.append(row);
    mainDiv.append(section);
  });

  let slide = `
   <div class="reveal">
      <div class="slides">
        ${mainDiv.innerHTML}
      </div>
    </div>
  `

  block.textContent = '';
  block.innerHTML = slide;

  new Reveal({
    minScale: 1,
    maxScale: 1,
    plugins: [RevealHighlight],
  }).initialize();

}