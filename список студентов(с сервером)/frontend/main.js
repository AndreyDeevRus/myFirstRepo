// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
    // Добавьте сюда объекты студентов
document.addEventListener('DOMContentLoaded', () => {

var studentsList = loadStudentItem();
let i;

renderStudentsTable(studentsList);
  async function loadStudentItem() {
  const response = await fetch('http://localhost:3000/api/students');
  const studentsList = await response.json();
  renderStudentsTable(studentsList);
  keep(studentsList);
};

  const validator = new JustValidate('#datastudent');
  validator
  .addField('#surname', [
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

  .addField('#name', [
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
    .addField('#lastname', [
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
    .addField('#studystart', [
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
  renderStudentsTable(studentsList);
});

let Yan01_1900 = new Date(-613600 * 3600 * 1000);

function getStop(studyStart) {
  var year = studyStart;
  var studyStop = Number(year) + 3;
  return studyStop
};

function getKurs(studyStart) {
    var start = studyStart;
    var today = new Date();
    var year = today.getFullYear();
    var age = year - start;
      if (age > 3) {
        return age = 'Курс окончен'
      }
        return age + 1 +' Курс'
};

for (let i = 0; i > studentsList.length; i++) {
  studentsList[i].name = studentsList.map(a => a.name);
  studentsList[i].surename = studentsList.map(a => a.surname);
  studentsList[i].lastname = studentsList.map(a => a.lastname);
  studentsList[i].birthday = studentsList.map(a => a.birthday);
  studentsList[i].faculty = studentsList.map(a => a.faculty);
  studentsList[i].studystart = studentsList.map(a => a.studystart);
  renderStudentsTable(studentsList);
}

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentsList) {
  let row = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdFaculty = document.createElement('td');
  let tdBirthday = document.createElement('td');
  let tdStart = document.createElement('td');
  let deleteStudent = document.createElement('button');
  row.classList.add('table-list1');
  tdName.classList.add('table-list');
  deleteStudent.classList.add('button-delete');
  tdFaculty.classList.add('table-list');
  tdBirthday.classList.add('table-list');
  tdStart.classList.add('table-list');
  tdName.textContent = i+1 +'. ' + studentsList.surname +' ' + studentsList.name +' ' + studentsList.lastname;
  tdFaculty.textContent = studentsList.faculty;

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

  tdBirthday.textContent = studentsList.birthday + ' (' + getAge(studentsList.birthday) + ' )';
  tdStart.textContent = studentsList.studyStart + ' - ' + getStop(studentsList.studyStart) + ' (' + getKurs(studentsList.studyStart) + ')';
  deleteStudent.textContent = 'Удалить студента';
  deleteStudent.setAttribute('id', studentsList.id);
  let tdStatic = document.getElementById('inst');
  deleteStudent.addEventListener('click', function () {
    id = this.id;
    deletestudent(id);
    refreshPage();
  });
  row.append(tdName);
  tdName.append(deleteStudent);
  row.append(tdFaculty);
  row.append(tdBirthday);
  row.append(tdStart);
  tdStatic.append(row);
};

async function deletestudent(id) {
  const response = await fetch('http://localhost:3000/api/students/' + `${id}`, {
    method: 'DELETE'
    });
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsList) {
  for (i = 0; i < studentsList.length; i++) {
    getStudentItem(studentsList[i]);
  }
};

/*Этап 5. К форме добавления студента добавьте слушатель события отправки формы,
в котором будет проверка введенных данных.Если проверка пройдет успешно,
добавляйте объект с данными студентов в массив студентов и запустите функцию
отрисовки таблицы студентов, созданную на этапе 4.*/

let inputSecondName = document.getElementById('surname');
let inputFirstName = document.getElementById('name');
let inputDadName = document.getElementById('lastname');
let inputBirthday = document.getElementById('birthday');
let inputStartTraning = document.getElementById('studystart');
let inputFaculty = document.getElementById('faculty')

function getStudent() {
  let inputAll = Array.from(document.querySelectorAll('#datastudent input'));
  let objStudent = {};
  var studentsList = [];
  let checkFieldsLength = inputAll.every((el) => el.value.length);
    if (checkFieldsLength) {
      for (const input of inputAll) {
      objStudent[input.id] = input.value;
      }
    studentsList.push(objStudent);
    getStudentItem(objStudent);
    keep2(objStudent);
    keep();
    inputSecondName.value = "";
    inputFirstName.value = "";
    inputDadName.value = "";
    inputBirthday.value = "";
    inputFaculty.value = "";
    inputStartTraning.value = "";
    };
};

async function keep2() {
  fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: inputFirstName.value,
      surname: inputSecondName.value,
      lastname: inputDadName.value,
      birthday: inputBirthday.value,
      studyStart: inputStartTraning.value,
      faculty: inputFaculty.value
    })
  });
};

function keep(studentsList) {
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
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = studentsList.sort(sortName);
  renderStudentsTable(studentsList);
  function sortName(x, y) {
    return collator.compare(x.surname, y.surname);
  }
  deleteTable();
  renderStudentsTable(studentsList);
});

fack.addEventListener('click', function() {
  let collator = new Intl.Collator();
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
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
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
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
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = studentsList.sort(sortStartTraning);
  // console.log(studentsList);
  renderStudentsTable(studentsList);
  function sortStartTraning(x, y) {
    return collator.compare(x.studystart, y.studystart);
  }
  deleteTable();
  renderStudentsTable(studentsList);
});
// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
let filtrSecondName = document.getElementById('filtr-surname');
let filtrFaculty = document.getElementById('filtr-faculty');
let filtrStopTraning = document.getElementById('filtr-studystop');
let filtrStartTraning = document.getElementById('filtr-studystart');

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
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
  for (i = 0; i < studentsList.length; i++) {
    studentsList[i].name1 = studentsList[i].name + studentsList[i].surname + studentsList[i].lastname;
  }
    studentsList = filter(studentsList, 'name1', filtrSecondName.value);
  deleteTable();
  renderStudentsTable(studentsList);
});

filtrFaculty.addEventListener('input', function() {
    if (filtrFaculty.value === "") {
    refreshPage();
  };
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = filter(studentsList, 'faculty', filtrFaculty.value);
  deleteTable();
  renderStudentsTable(studentsList);
});

filtrStartTraning.addEventListener('input', function() {
    if (filtrStartTraning.value === "") {
    refreshPage();
  };
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = filter(studentsList, 'studystart', filtrStartTraning.value);
  deleteTable();
  renderStudentsTable(studentsList);
});

filtrStopTraning.addEventListener('input', function() {
    if (filtrStopTraning.value === "") {
    refreshPage();
  };
  let studentsList = JSON.parse(localStorage.getItem('studentsList'));
  studentsList = filter(studentsList, 'studystop', filtrStopTraning.value);
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
