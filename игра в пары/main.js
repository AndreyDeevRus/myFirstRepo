(() => {
// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

let arr = [];
let count;

function createNumbersArray(count) {
  let n = 1;
  let m = 1;
  for (let i = 0; i < count; i++ ) {
  arr.push(n);
  n++;
  arr.push(m);
  m++;
  };
  return arr;
}
createNumbersArray(count);
// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
// arr.sort(() => Math.random() - 0.5);
var x = arr.length, j, temp;
while(--x > 0){
    j = Math.floor(Math.random()*(x+1));
    temp = arr[j];
    arr[j] = arr[x];
    arr[x] = temp;
}
}
shuffle(arr);
// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
let array = [];
let id = 1;
function startGame(count) {

 for(count in arr) {
  let cards = {
  id: id++,
  cardName: arr[count],
};
  array.push(cards);
 }
}
startGame(count);
let prevElement = null;
let currentElement = null;

function createCard() {
  for (let i = 0; array.length > i;  i++) {
    let spanCards = document.createElement('span');
    spanCards.setAttribute('id', array[i].id);
    spanCards.textContent = array[i].cardName;
    spanCards.classList.add('spanCards');
    divCards.append(spanCards);
     
      spanCards.addEventListener('click', function(e) {
      e.preventDefault();
      spanCards.classList.add('card' + `${spanCards.textContent}`);
      if (prevElement === currentElement) {
        spanCards.dataset.openOne = 'card' + `${spanCards.textContent}`;
        premierCard = spanCards.dataset.openOne;
        spanCards.setAttribute('name', 'openCardOne');
        spanCards.style.pointerEvents = 'none';
        prevElement = true;
      } else if (prevElement !== null){
        spanCards.dataset.openTwo = 'card' + `${spanCards.textContent}`;
        spanCards.setAttribute('name', 'openCardTwo');
          if (premierCard === spanCards.dataset.openTwo) {
            let cardOne = document.getElementsByName('openCardOne');
            let cardTwo = document.getElementsByName('openCardTwo');
            cardOne[0].classList.add("white");
            cardTwo[0].classList.add('white');
            cardOne[0].style.pointerEvents = "";
            delete cardOne[0].dataset.openOne;
            delete cardTwo[0].dataset.openTwo;
            cardOne[0].removeAttribute('name');
            cardTwo[0].removeAttribute('name');
            prevElement = null;
            currentElement = null;
            // console.log('hello');
          } else if (premierCard !== spanCards.dataset.openTwo) {
            divCards.style.pointerEvents = 'none';
            setTimeout(time, 1000);
          };
        };
      });
  };
};
function time() {
    let cardOne = document.getElementsByName('openCardOne');
    let cardTwo = document.getElementsByName('openCardTwo');
    cardOne[0].style.pointerEvents = "";
    cardOne[0].classList.remove('card' + `${cardOne[0].textContent}`);
    cardTwo[0].classList.remove('card' + `${cardTwo[0].textContent}`);
    delete cardOne[0].dataset.openOne;
    delete cardTwo[0].dataset.openTwo;
    cardOne[0].removeAttribute('name');
    cardTwo[0].removeAttribute('name');
    prevElement = null;
    currentElement = null;
    divCards.removeAttribute('style');

};

let div = document.createElement('div');
let h1 = document. createElement('h1');
let h2 = document.createElement('h2');
let divCards = document.createElement('div');
let btnCount = document.createElement('button');
let btnStart = document.createElement('button');
let input = document.createElement('input');
h1.textContent = 'Игра в пары';
h2.textContent = '(откройте парные карты в течении 1 мин)';
btnCount.textContent = 'Число пар';
btnStart.textContent = 'Старт';
input.placeholder = 'Введите число пар, не больше 8';
document.body.append(h1);
document.body.append(h2);
document.body.append(div);
div.append(divCards);
div.append(btnCount);
div.append(input);
div.append(btnStart);
h1.classList.add('h');
h2.classList.add('h2');
divCards.classList.add('divCards');
input.classList.add('input-hidden');
div.classList.add('div');
createCard();
btnCount.classList.add('btn');
btnStart.classList.add('btn');
/////  вроде получилось:-)   ))//////

btnCount.addEventListener('click', function(e) {
    e.preventDefault();
    input.classList.toggle('input');
   
  btnStart.addEventListener('click', function(e) {
      e.preventDefault();
      // divCards.style.columnCount = input.value;
        if (input.value < 9 && input.value > 1) {
          count = input.value;
          document.querySelectorAll('.victory').forEach(c => c.remove('victory'));
          document.querySelectorAll('.spanCards').forEach(c => c.remove('spanCards'));
          arr = [];
          array = [];
          id = 1;
          //console.log(count);
          createNumbersArray(count);
          shuffle(arr);
            for(count in arr) {
              let cards = {
                id: id++,
                cardName: arr[count],
              };
              array.push(cards);
            };
          createCard();
          watchGame();
          btnStart.style.pointerEvents = 'none';
        };
  }); 
});

function watchGame() {
   let x = 60;
   let watch = document.createElement('div');
   let timer = document.createElement('span');
   watch.classList.add('watch');
   timer.classList.add('timer');
   timer.textContent ="01:00" ;
   watch.append(timer);
   div.prepend(watch);
  
    function countdown() {
        let minuta = setTimeout(countdown, 1000);
        x--;
        timer.textContent = `00:${x}`;
        if (x < 10 && x > 0) {
            timer.textContent = `00:0${x}`;
            }
        if(x <= 0) {
            timer.textContent = `00:00`;
            document.querySelectorAll('.spanCards').forEach(c => c.remove('spanCards'));
            let looser = document.createElement('button');
            looser.textContent = 'Вы проиграли, нажмите старт';
            looser.classList.add('btnlooser');
            divCards.append(looser);
            document.querySelector('.timer');
            watch.remove('timer');
            clearTimeout(minuta);
            btnStart.style.pointerEvents = '';
            btnStart.addEventListener('click', function(e) {
                e.preventDefault;
                watch.remove('timer');
                looser.remove('btnlooser');
                startGame();
            });
            clearTimeout(minuta);
        };
        if (document.querySelectorAll('.spanCards').length === document.querySelectorAll('.white').length && document.querySelectorAll('.spanCards').length !== 0) {
            document.querySelectorAll('.spanCards').forEach(c => c.remove('spanCards'));
            let newGame = document.createElement('button');
            newGame.textContent = "Вы выиграли, нажмите старт";
            newGame.classList.add('victory');
            divCards.append(newGame);
            document.querySelector('.timer');
            watch.remove('timer');
            clearTimeout(minuta);
            btnStart.style.pointerEvents = '';
            btnStart.addEventListener('click', function(e) {
                document.querySelectorAll('.victory').forEach(c => c.remove('victory'));
                newGame.remove('victory');
                startGame();
            });
            clearTimeout(minuta);
        };
    };
    countdown();
};
////////////////////////////////////////////////////////

})();

