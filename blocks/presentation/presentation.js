import '../../scripts/reveal.js/dist/reveal.js';
import RevealHighlight from '../../scripts/reveal.js/plugin/highlight/highlight.esm.js'

export default function decorate(block) {


  function welcomeSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    return `
    <section class="${classNameEl.innerText}">
      <h1>${titileEl?.innerText}</h1>
      ${descFirstEl?.innerHTML}
      ${descSecondEl?.innerHTML}
    </section>
    `
  }

  function bannerSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    const imgSrc = titileEl?.querySelector('img').src

    return `
    <section data-background-image=${imgSrc} class="${classNameEl.innerText}">
    <div class="banner-main">
    ${descFirstEl?.innerHTML}
    ${descSecondEl?.innerHTML}
    </div>
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
    <section class="${classNameEl.innerText}">
      <h1>${titileEl.innerText}</h1>
      ${ulElement.innerHTML}
    </section>
    `
  }

  function containerSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children

    if (classNameEl.textContent === "slide-container-coloumn") {
      return `
       <section class="${classNameEl.innerText}">
         <h1>${titileEl.innerText}</h1>
         <div class="slide-container-main">
           <div class="slide-container-left fragment">
              ${descFirstEl.innerHTML}
           </div>
           <div class="slide-container-right fragment">
            ${descSecondEl.innerHTML}
           </div>
         </div>
       </section>
      `
    } else {
    return `
    <section class="${classNameEl.innerText}">
      <h1>${titileEl.innerText}</h1>
      <section>
        <div class="slide-container-top">
          ${descFirstEl.innerHTML}
        </div>
      </section>
      <section>
        <div class="slide-container-bottom">
          ${descSecondEl.innerHTML}
        </div>
      </section>
    </section>
    `
    }
  }

  function tableSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    return `
    <section class="${classNameEl.innerText}">
      <h1>${titileEl?.innerText}</h1>
      <div class="table-top fragment">${descFirstEl.innerHTML}</div>
      <div class="table-bottom fragment">${descSecondEl.innerHTML}</div>
    </section>
    `
  }

  function imageListSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children

    console.log(descFirstEl);
    
    const listItems = descFirstEl?.querySelectorAll('picture');

    const divElement = document.createElement('div');
  
    listItems?.forEach((item) => {
      const section = document.createElement('section')
      section.append(item)
      divElement.append(section)
    });

    return `
    <section class="${classNameEl.innerText}">
      <h1>${titileEl.innerText}</h1>
      ${divElement.innerHTML}
    </section>
    `
  }

  function thankyouSlide(row) {
    const [classNameEl, titileEl, descFirstEl, descSecondEl] = row.children
    return `
    <section class="${classNameEl.innerText}">
      <h1>${titileEl?.innerText}</h1>
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
      case "slide-container-coloumn":
        section = containerSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      case "slide-container-row":
        section = containerSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      case "slide-container-table":
        section = tableSlide(row);
        mainDiv.insertAdjacentHTML('beforeend', section);
        break;
      case "slide-image-list":
        section = imageListSlide(row);
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