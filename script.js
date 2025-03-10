const todoInput = document.querySelector('#inputPlan'),
  todoList = document.querySelector('#todoList'),
  doneList = document.querySelector('#doneList'),
  todoCount = document.querySelector('#todoCount'),
  doneCount = document.querySelector('#doneCount');
//enter을 누르면 input 내용이 to do 섹션으로 넘어감
// function enterkey() {
//   if (window.event.keyCode == 13) {
//     click_addBtn();
//   }
// }

const inputForm = document.querySelector('.inputForm');
inputForm.addEventListener('submit', handleAddBtnClick);

//+버튼 or enter 버튼을 눌렀을 때, todoList섹션에 input내용이 보여짐
function handleAddBtnClick() {
  let input = todoInput.value;
  let addList = document.createElement('li');
  let text = document.createElement('text');
  let button = document.createElement('button');
  button.innerText = '❎';

  button.className = 'deleteBtn';
  button.addEventListener('click', (event) => {
    handleDeleteBtnClick(event, 'todoList');
  });

  text.innerHTML = input;
  text.addEventListener('click', () => {
    handleItemClick(text, button, 'todoList');
  });

  addList.append(text, button);
  addList.className = 'addList';

  if (todoInput.value != '') {
    todoList.appendChild(addList);
    addCount('todoList');
    todoInput.value = '';
  } else {
    alert('No item!');
  }
}

function handleItemClick(text, button, parentClassName) {
  let list = document.createElement('li');
  let moveText = document.createElement('span');
  let btn = document.createElement('button');

  moveText.innerText = text.innerText;
  btn.innerText = button.innerText;
  btn.className = 'deleteBtn';

  list.append(moveText, btn);
  list.className = 'addList';

  if (parentClassName == 'todoList') {
    btn.addEventListener('click', (event) => {
      handleDeleteBtnClick(event, 'doneList');
    });
    moveText.addEventListener('click', () => {
      handleItemClick(moveText, btn, 'doneList');
    });

    text.parentElement.remove();
    minusCount('todoList');

    doneList.appendChild(list);
    addCount('doneList');
  } else if (parentClassName == 'doneList') {
    btn.addEventListener('click', (event) => {
      handleDeleteBtnClick(event, 'todoList');
    });
    moveText.addEventListener('click', () => {
      handleItemClick(moveText, btn, 'todoList');
    });

    text.parentElement.remove();
    minusCount('doneList');

    todoList.appendChild(list);
    addCount('todoList');
  }
}

function addCount(list) {
  if (list == 'todoList') {
    let todoCurrentCount = parseInt(todoCount.innerText) + 1;
    todoCount.innerText = todoCurrentCount;
  } else if (list == 'doneList') {
    let doneCurrentCount = parseInt(doneCount.innerText) + 1;
    doneCount.innerText = doneCurrentCount;
  }
}

function minusCount(list) {
  if (list == 'todoList') {
    let todoCurrentCount = parseInt(todoCount.innerText) - 1;
    todoCount.innerText = todoCurrentCount;
  } else if (list == 'doneList') {
    let doneCurrentCount = parseInt(doneCount.innerText) - 1;
    doneCount.innerText = doneCurrentCount;
  }
}

//text옆 ❎버튼을 누르면 내용 delete
function handleDeleteBtnClick(event, listName) {
  const list = event.target.parentElement;
  list.remove();
  minusCount(listName == 'todoList' ? 'todoList' : 'doneList');
}
