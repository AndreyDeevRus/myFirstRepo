let swiper = new Swiper('.swiper-container', {
  navigation: {
    slidesPerView: 1,
    spaceBetween: 75,
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
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



new Accordion('.accordion-container');
// Default options
new Accordion('.container-first');
// User options
new Accordion('.container-second', {
duration: 400,
showMultiple: true,
onOpen: function(currentElement) {
  console.log(currentElement);
}
});


let headerLogo = document.querySelector(".header__logo");
let burger = document.querySelector(".burger");
/*let display = document.querySelector('.display');
let body = document.querySelector('body');
let header = document.querySelector('header');*/
function bur() {
burger.style.visibility = hidden;
}
headerLogo.addEventListener('click', bur);
