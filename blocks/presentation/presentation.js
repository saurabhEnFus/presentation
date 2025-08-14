import '../../scripts/reveal.js/dist/reveal.js';
import RevealHighlight from '../../scripts/reveal.js/plugin/highlight/highlight.esm.js'

export default function decorate(block) {


  function welcomeSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    return `
    <section class="">
      ${titileEl?.innerHTML}
      ${descFirstEl?.innerHTML}
      ${descSecondEl?.innerHTML}
    </section>
    `
  }

  function bannerSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    const imgSrc = titileEl?.querySelector('img').src
    return `
    <section data-background-image=${imgSrc}>
    </section>
    `
  }

  function listViewSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    const listItems = descFirstEl?.querySelectorAll('ul li');

    const ulElement = document.createElement('ul');
  
    listItems?.forEach((item) => {
      const li = item;
      li.classList.add('fragment')
      ulElement.append(li)
    });

    return `
    <section class="">
      ${titileEl.innerHTML}
      ${ulElement.innerHTML}
    </section>
    `
  }

  function thankyouSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    return `
    <section class="">
      ${titileEl?.innerHTML}
      ${descFirstEl?.innerHTML}
      ${descSecondEl?.innerHTML}
    </section>
    `
  }

  const mainDiv = document.createElement('div');
  [...block.children].forEach((row) => {
    let className = row.firstElementChild.textContent
    let section;

    switch (className) {
      case "slide-welcome":
        section = welcomeSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      case "slide-banner":
        section = bannerSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      case "slide-listview":
        section = listViewSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      case "slide-thankyou":
        section = thankyouSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      default:
        console.log("Unknown row...");
    }
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