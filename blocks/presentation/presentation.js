import '../../scripts/reveal.js/dist/reveal.js';
import RevealHighlight from '../../scripts/reveal.js/plugin/highlight/highlight.esm.js'

export default function decorate(block) {
  

const [slide1, slide2, slide3, slide4, slide5] = block.children;


function slideone() {
  const [firstContent] = slide1.children;
  return `
  ${firstContent.innerHTML}
  `
}

function slideTwo() {
  const [firstContent] = slide2.children;
  const imgSrc = firstContent.querySelector('img').src;

  return `
  <section data-background-image=${imgSrc}></section>
  `
}

function slideThree() {
  const [firstContent,secondContent,thirdContent] = slide3.children;
  const [ulItems] = secondContent.children;
  
  const listItems = ulItems.querySelectorAll('ul li');

  const ulElement = document.createElement('ul');
  
  listItems.forEach((item) => {
    const li = item;
    li.classList.add('fragment')
    ulElement.append(li)
});

  return `
  ${firstContent.innerHTML}
  <div class="sl-3-liEl">
  ${ulElement.innerHTML}
  </div>
  `
}

function slideFour() {
  const [firstContent,secondContent,thirdContent] = slide4.children

  return `
  ${firstContent.innerHTML}
  <div class="sl-4-mainEl">
    <div class="sl-4-sub sl-4-sub-one fragment">
      ${secondContent.innerHTML}
    </div>
    <div class="sl-4-sub sl-4-sub-two fragment">
      ${thirdContent.innerHTML}
    </div>
  </div>
  `
}

function slideFive() {
  const [firstContent,secondContent,thirdContent] = slide5.children

  return `
  ${firstContent.innerHTML}
  <section>${secondContent.innerHTML}</section>
  <section>${thirdContent.innerHTML}</section>
  `
}

  let slides = `
   <div class="reveal">
      <div class="slides">
        <section class="sl-1">${slideone()}</section>
        ${slideTwo()}
        <section class="sl-3">${slideThree()}</section>
        <section class="sl-4">${slideFour()}</section>
        <section class="sl-5">${slideFive()}</section>
      </div>
    </div>
  `

  block.textContent = '';
  block.innerHTML = slides;

  new Reveal({
    minScale: 1,
    maxScale: 1,
    plugins: [RevealHighlight],
  }).initialize();

}