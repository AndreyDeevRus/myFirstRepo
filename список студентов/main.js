// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
    // Добавьте сюда объекты студентов
document.addEventListener('DOMContentLoaded', () => {

  const validator = new JustValidate('#datastudent');
  validator
  .addField('#secondName', [
    {
      rule: 'required',
      errorMessage: 'Поле пустое',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимум 2 буквы',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Максимум 15 букв',
    },
  ])

  .addField('#firstName', [
    {
      rule: 'required',
      errorMessage: 'Поле пустое',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимум 2 буквы',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Максимум 15 букв',
    },
  ])
    .addField('#dadName', [
    {
      rule: 'required',
      errorMessage: 'Поле пустое',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимум 2 буквы',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Максимум 15 букв',
    },
  ])
    .addField('#birthday', [
      {
        rule: 'function',
        validator: (value) => {
          let year = parseInt(value.split("-")[0]);
          return year > 1900;
        },
        errorMessage: 'Год должен быть больше 1900',
      },
      {
        rule: 'required',
      }
  ])
      .addField('#faculty', [
      {
        rule: 'required',
        errorMessage: 'Поле пустое',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимум 2 буквы',
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Максимум 15 букв',
    },
  ])
    .addField('#startTraning', [
      {
        rule: 'function',
        validator: (value) => {
          let year = parseInt(value.split("-")[0]);
          return year > 1900;
        },
        errorMessage: 'Год должен быть больше 1999',
      },
            {
        rule: 'required'
      }
    ]).onSuccess(e => {
  getStudent();
});


var studentsList = [
  objStudent = {
    firstName: 'Сидор',
    secondName: 'Сидоров',
    dadName: 'Сидорович',
    birthday: '1890-01-01',
    startTraning: '2010',
    stopTraning: '2013',
    faculty: 'fotoshop'
  },
  objStudent = {
    firstName: 'Пётр',
    secondName: 'Петров',
    dadName: 'Петрович',
    birthday: '1910-02-02',
    startTraning: '2010',
    stopTraning: '2013',
    faculty: 'fotoshop'
  },
  objStudent = {
    firstName: 'Олег',
    secondName: 'Олегов',
    dadName: 'Олегович',
    birthday: '1910-03-03',
    startTraning: '2010',
    stopTraning: '2013',
    faculty: 'frontend'
  },
  objStudent = {
    firstName: 'Роман',
    secondName: 'Рогов',
    dadName: 'Васильевич',
    birthday: '1911-04-04',
    startTraning: '2011',
    stopTraning: '2014',
    faculty: 'frontend'
  },
];

let Yan01_1900 = new Date(-613600 * 3600 * 1000);
// let dateStart = new Date("2000-09-01");

function getAge(birthday) {
    var year = parseInt(birthday.substring(0,4));
    var month = parseInt(birthday.substring(6,7));
    var day = parseInt(birthday.substring(9,10));

    var today = new Date();
    var birthDate = new Date(year, month - 1, day);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
      if (birthDate < Yan01_1900) {
        return age = 'Долгожитель!!!'
      }
    return age;
}

function getStop(startTraning) {
  var year = parseInt(startTraning.substring(0,4));
  var stopTraning = year + 3;

  return stopTraning
};

function getKurs(startTraning) {
    var start = parseInt(startTraning.substring(0,4));
    // var month = parseInt(startTraning.substring(6,7));
    // var day = parseInt(startTraning.substring(9,10));
    var today = new Date();
    var year = today.getFullYear();
    var age = year - start;
    // console.log(age);
      if (age > 3) {
        return age = 'Курс окончен'
      }
        return age + 1 +' Курс'

};

  if (localStorage.getItem('studentsList') !== null) {
    studentsList = JSON.parse(localStorage.getItem('studentsList'));
    for (let i = 0; i > JSON.parse(localStorage.getItem('studentsList')).length; i++) {
      studentsList[i].firstName = studentsList.map(a => a.firstName);
      studentsList[i].secondName = studentsList.map(a => a.secondName);
      studentsList[i].dadName = studentsList.map(a => a.dadName);
      studentsList[i].birthday = studentsList.map(a => a.birthday);
      studentsList[i].faculty = studentsList.map(a => a.faculty);
      studentsList[i].startTraning = studentsList.map(a => a.startTraning);
  renderStudentsTable(studentsList);
    }
  };

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(objStudent) {
  let row = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdFaculty = document.createElement('td');
  let tdBirthday = document.createElement('td');
  let tdStart = document.createElement('td');

  row.classList.add('table-list1');
  tdName.classList.add('table-list');
  tdFaculty.classList.add('table-list');
  tdBirthday.classList.add('table-list');
  tdStart.classList.add('table-list');
  let nameStudent = i+1 +'. ' + objStudent.secondName +' ' + objStudent.firstName +' ' + objStudent.dadName;
  tdName.textContent = nameStudent;
  tdFaculty.textContent = objStudent.faculty;
  tdBirthday.textContent = objStudent.birthday + ' (' + getAge(objStudent.birthday) + ' )';
  tdStart.textContent = objStudent.startTraning + ' - ' + getStop(objStudent.startTraning) + ' (' + getKurs(objStudent.startTraning) + ')';

  let tdStatic = document.getElementById('inst');

  row.append(tdName);
  row.append(tdFaculty);
  row.append(tdBirthday);
  row.append(tdStart);
  tdStatic.append(row);
};

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
let i;
function renderStudentsTable(studentsList) {
  for (i = 0; i < studentsList.length; i++) {
    getStudentItem(studentsList[i]);
  }
};
renderStudentsTable(studentsList);
/*Этап 5. К форме добавления студента добавьте слушатель события отправки формы,
в котором будет проверка введенных данных.Если проверка пройдет успешно,
добавляйте объект с данными студентов в массив студентов и запустите функцию
отрисовки таблицы студентов, созданную на этапе 4.*/

/*btn.addEventListener('click', function() {
  let inputAll = Array.from(document.querySelectorAll('#datastudent input'));
    if (inputAll !== '') {
    getStudent();
    fio.value = "";
    fack.value = "";
    god.value = "";
    kurs.value = "";
  }
});*/

let inputSecondName = document.getElementById('secondName');
let inputFirstName = document.getElementById('firstName');
let inputDadName = document.getElementById('dadName');
let inputBirthday = document.getElementById('birthday');
let inputStartTraning = document.getElementById('startTraning');
let inputFaculty = document.getElementById('faculty')

function getStudent() {
  let inputAll = Array.from(document.querySelectorAll('#datastudent input'));
  let objStudent = {};
  let checkFieldsLength = inputAll.every((el) => el.value.length);
    if (checkFieldsLength) {
      for (const input of inputAll) {
      objStudent[input.id] = input.value;
      }
    studentsList.push(objStudent);
    getStudentItem(objStudent);
    keep();
    inputSecondName.value = "";
    inputFirstName.value = "";
    inputDadName.value = "";
    inputBirthday.value = "";
    inputFaculty.value = "";
    inputStartTraning.value = "";
    } /*else {
      return alert('Не все поля заполнены');
  }*/
}

function keep() {
  localStorage.setItem('studentsList', JSON.stringify(studentsList));
};

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
let fio = document.getElementById('fio');
let fack = document.getElementById('fack');
let god = document.getElementById('god');
let kurs = document.getElementById('kurs');

function refreshPage() {
  window.location.reload();
}

fio.addEventListener('click', function() {
  let collator = new Intl.Collator();
  studentsList = studentsList.sort(sortName);
  // console.log(studentsList);
  renderStudentsTable(studentsList);
  function sortName(x, y) {
    return collator.compare(x.secondName, y.secondName);
  }
  deleteTable();
  renderStudentsTable(studentsList);
});

fack.addEventListener('click', function() {
  let collator = new Intl.Collator();
  studentsList = studentsList.sort(sortFaculty);
  // console.log(studentsList);
  renderStudentsTable(studentsList);
  function sortFaculty(x, y) {
    return collator.compare(x.faculty, y.faculty);
  }
  deleteTable();
  renderStudentsTable(studentsList);
});

god.addEventListener('click', function() {
  let collator = new Intl.Collator();
  studentsList = studentsList.sort(sortGod);
  // console.log(studentsList);
  renderStudentsTable(studentsList);
  function sortGod(x, y) {
    return collator.compare(x.birthday, y.birthday);
  }
  deleteTable();
  renderStudentsTable(studentsList);
});

kurs.addEventListener('click', function() {
  let collator = new Intl.Collator();
  studentsList = studentsList.sort(sortStartTraning);
  // console.log(studentsList);
  renderStudentsTable(studentsList);
  function sortStartTraning(x, y) {
    return collator.compare(x.startTraning, y.startTraning);
  }
  deleteTable();
  renderStudentsTable(studentsList);
});
// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
let filtrSecondName = document.getElementById('filtr-secondName');
let filtrFaculty = document.getElementById('filtr-faculty');
let filtrStopTraning = document.getElementById('filtr-stopTraning');
let filtrStartTraning = document.getElementById('filtr-startTraning');

function filter (arr, prop, value) {
  let result = [];
      copy = [...arr];
  for (const student of copy) {
    if (String(student[prop]).toLowerCase().includes(value) == true) result.push(student)
  };
 return result
};

filtrSecondName.addEventListener('input', function() {
    if (filtrSecondName.value === "") {
    refreshPage();
  };
  studentsList = JSON.parse(localStorage.getItem('studentsList'));
  let studentsList1 = filter(studentsList, 'secondName', filtrSecondName.value);
  let studentsList2 = filter(studentsList, 'firstName', filtrSecondName.value);
  let studentsList3 = filter(studentsList, 'dadName', filtrSecondName.value);
  studentsList = studentsList1.concat(studentsList2, studentsList3);
  deleteTable();
  renderStudentsTable(studentsList);
});

filtrFaculty.addEventListener('input', function() {
    if (filtrFaculty.value === "") {
    refreshPage();
  };
  studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = filter(studentsList, 'faculty', filtrFaculty.value);
  deleteTable();
  renderStudentsTable(studentsList);
});

filtrStartTraning.addEventListener('input', function() {
    if (filtrStartTraning.value === "") {
    refreshPage();
  };
  studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = filter(studentsList, 'startTraning', filtrStartTraning.value);
  deleteTable();
  renderStudentsTable(studentsList);
});

filtrStopTraning.addEventListener('input', function() {
    if (filtrStopTraning.value === "") {
    refreshPage();
  };
  studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = filter(studentsList, 'stopTraning', filtrStopTraning.value);
  deleteTable();
  renderStudentsTable(studentsList);
});

function deleteTable() {
let elements = document.querySelectorAll('.table-list1');
  elements.forEach(elem => {
    elem.remove();
  });
};

});
