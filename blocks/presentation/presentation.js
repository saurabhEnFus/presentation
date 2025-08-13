import '../../scripts/reveal.js/dist/reveal.js';
import RevealHighlight from '../../scripts/reveal.js/plugin/highlight/highlight.esm.js'

export default function decorate(block) {
  

const [...slides] = block.children;

const mainDiv = document.createElement('div');
[...block.children].forEach((row) => {
    const section = document.createElement('section');
    row.className = row.lastElementChild.textContent
    row.removeChild(row.lastElementChild);

    //banner slide
    const picture = row.querySelector('.sl-banner picture');

    if (picture) {
      const imgSrc = picture.querySelector('img').src;
      section.setAttribute('data-background-image', imgSrc);
      row.removeChild(row.firstElementChild)
    }

    // list slide
    const listItems = row.querySelectorAll('.sl-list ul li');
    console.log(listItems);
    

    if (listItems) {
      const ulElement = document.createElement('ul');
  
      listItems.forEach((item) => {
         const li = item;
         li.classList.add('fragment')
         ulElement.append(li)
      });
      row.append(ulElement) 
    }
    

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