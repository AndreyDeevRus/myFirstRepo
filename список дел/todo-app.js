(function() {

    // let id = 0;
    let myBuissnes = [];
    // создаём и возвращаем заголовок приложения
    function createAppTitle(title) {
      let appTitle = document.createElement('h2');
      appTitle.innerHTML = title;
      return appTitle;
    }
    // создаём и возвращаем форму для создания дела
    function createTodoItemForm() {
      let form = document.createElement('form');
      let input = document.createElement('input');
      let buttonWrapper = document.createElement('div');
      let button = document.createElement('button');

      form.classList.add('input-group', 'mb-3');
      input.classList.add('form-control');
      input.placeholder = 'Введите название нового дела';
      buttonWrapper.classList.add('input-group-append');
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Добавить дело';
      // добавил disabled
      button.disabled = true;

      buttonWrapper.append(button);
      form.append(input);
      form.append(buttonWrapper);

      input.addEventListener('input', function(e) {
        e.preventDefault();
          if (input.value.length > 0) {
            button.disabled = false;
          } else if (input.value.length == 0) {
            button.disabled = true;
          }
      });
      return {
        form,
        input,
        button,
      }
    }

    // создаём и возвращаем список элементов
    function createTodoList() {
      let list = document.createElement('ul');
      list.classList.add('list-group');
      return list;
    }
    // создаём дело
    function createTodoItem(name) {

      let item = document.createElement('li')
      // кнопки размещаем в элемент, который красиво покажет их в одной группе
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');
      // устанавливаем стили для элемента списка, атакже для размещения кнопок
      // в его правой части с помощью flex
      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'alain-items-center');

      item.textContent = name;

      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';
      // вешаю id на li
      buttonGroup.setAttribute('id', idGenerator());
      // вешаю done на кнопку
      doneButton.dataset.done = 'false';
      // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабарывать событие нажатия
      return {
        item,
        doneButton,
        deleteButton,
      };
    }
    function idGenerator() {
      id = Math.round(Math.random() * 10000);
      //id = id + 1;
      return id;
    };

    function createTodoApp(container, title, listName) {

      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();
      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);

      // вставляю сохранённые строчки дел
       if (localStorage.getItem(listName) !== null) {
        // достаю из хранилища
        myBuissnes = JSON.parse(localStorage.getItem(listName));
        // создаю сохранённые данные
        ids = myBuissnes.map(a => a.id);
        names = myBuissnes.map(a => a.name);
        dones = myBuissnes.map(a => a.done);
      // console.log(ids);
      // console.log(names);
      // console.log(dones);
        for (let x = 0; x < myBuissnes.length; x++) {

        // кнопки размещаем в элемент, который красиво покажет их в одной группе
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.textContent = names[x];
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        // вешаю сохранённый id на li
        buttonGroup.setAttribute('id', ids[x]);
        // вешаю сохранённый done на кнопку
        doneButton.setAttribute('data-done', dones[x]);

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'alain-items-center');
        // окрашиваю строку согласно done
          if (dones[x] === 'true') {
            item.classList.add('list-group-item-success');
        };

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        document.querySelector('list-group-item');
        todoList.append(item);

        // добавляю обработчик на сохранённую кнопку
        doneButton.addEventListener('click', function(e) {
        item.classList.toggle('list-group-item-success');

        e.target.dataset.done = String(!(e.target.dataset.done === 'true'));

        done = e.target.dataset.done;
        id = e.target.parentNode.id;
        //  меняю значение done в объекте массива
        myBuissnes.forEach(function(v) {
          if (v.id == id) {
            v.done = Boolean(done);
            v.done = e.target.dataset.done;
          };
        })
        keep();
      });
      deleteButton.addEventListener('click', function(e) {

        if (confirm('Вы уверены?')) {
          item.remove();
          // удаляю объект дела из массива
          id = e.target.parentNode.id;
          myBuissnes = myBuissnes.filter(item => item.id != id);
          }
          console.log(myBuissnes);
          // сохраняю
          keep();

      });
      };
      };
     keep();

    // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
      // эта строка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим чтобы страница перезагружалась при отправке формы

      e.preventDefault();
      // игнорируем создание элемента , если пользователь ничего не ввёл в поле

      if (!todoItemForm.input.value) {
        return ;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      // добавляем обработчики на кнопки нового дела
      todoItem.doneButton.addEventListener('click', function(e) {
          todoItem.item.classList.toggle('list-group-item-success');
          e.target.dataset.done = String(!(e.target.dataset.done === 'true'));
        done = e.target.dataset.done;
        id = e.target.parentNode.id;
        //  меняю значение done в объекте массива
        myBuissnes.forEach(function(v) {
          if (v.id == id) {
            v.done = Boolean(done);
            v.done = e.target.dataset.done;
          };
        })
        // сохраняю
         keep();
      });

      todoItem.deleteButton.addEventListener('click', function(e) {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          // удаляю объект дела из массива
          id = e.target.parentNode.id;
          myBuissnes = myBuissnes.filter(item => item.id != id);
          }
          // сохраняю
          keep();

      });

        // создаём и добавляем в список новое дело с названием из поля ввода
        document.querySelector('list-group-item');
        todoList.append(todoItem.item);
      keep();
      // создаю новый объект в массиве
      newTask = {
        id,
        name: todoItemForm.input.value,
        done: 'false',
      };
      myBuissnes.push(newTask);
      keep();

        // обнуляем значение в поле, чтобы не пришлось стирать его вручную
        todoItemForm.input.value = '';
        keep();
    });
    function keep() {
      localStorage.setItem(listName, JSON.stringify(myBuissnes));
      };
  }
  window.createTodoApp = createTodoApp;
})();
