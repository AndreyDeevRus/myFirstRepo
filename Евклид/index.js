{
         // слайдер
  // let container = document.querySelector(".swiper-container");
  let swiper = new Swiper('.swiper.hero__swiper', {
    // speed: 2000,
    // allowTouchove: false,
    navigation: {
      // slidesPerView: 1,
      // spaceBetween: 75,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    pagination: {
      clickable: true,
      el: '.swiper-pagination-bullets',
      type: 'bullets',
    },
  });

let stepBtn = document.querySelectorAll('.step-nav__btn');
let section = document.querySelectorAll('.section');

stepBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    stepBtn.forEach(function(btn){ btn.classList.remove('step-nav__btn--active')});
    e.currentTarget.classList.add('step-nav__btn--active');

    section.forEach(function(element){ element.classList.remove('section--active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('section--active');
  });

});
   // бургер
let menu = document.querySelector(".header__logo");
let burger = document.querySelector(".burger");
let deleteMenu = document.querySelector(".burger__x");
let body = document.querySelector('body');
function bur() {
  burger.style.visibility = 'visible';
  burger.style.transform = 'translateX(0%)';
  // burger.style.transition = 'all 1s easy-in-out';
  body.classList.add('stop-scroll');
  // createForm();
}
menu.addEventListener('click', bur);

function deleteBurger() {
  // burger.style.visibility = 'hidden';
  burger.style.transform = 'translateX(-120%)';
  body.classList.remove('stop-scroll');
  // burger.style.transition = 'all 1s easy-in-out';
}
deleteMenu.addEventListener('click', deleteBurger);
burger.addEventListener('click', deleteBurger);
}


   //  лупа
let lupa = document.querySelector('.header__lupa');
let header = document.querySelector('.header');
function createForm() {
  let div = document.createElement('div', 'flex');
  let form = document.createElement('input');
  let span = document.createElement('button');
  let cross = document.createElement('button');

  div.classList.add('search');
  form.classList.add('form-lupa');
  span.classList.add('span-lupa')
  form.placeholder = 'Что будем искать?'
  cross.classList.add('cross');
  lupa.style.visibility = 'hidden';
  cross.addEventListener('click', deleteSearch);
  div.append(form);
  div.append(span);
  div.append(cross);
  header.append(div);

    /*return {
    div,
    form,
    span,
    cross,
  };*/
}
lupa.addEventListener('click', createForm);

let cross = document.querySelector('.cross');
function deleteSearch() {
  let div = document.querySelector('.search');
  let lupa = document.querySelector('.header__lupa');
  div.remove();
  lupa.style.visibility = 'visible';
}
