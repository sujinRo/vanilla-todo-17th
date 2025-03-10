const todoInput = document.querySelector('#inputPlan'),
  todoList = document.querySelector('#todoList'),
  doneList = document.querySelector('#doneList'),
  todoCount = document.querySelector('.todoCount'),
  doneCount = document.querySelector('.doneCount');

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
  button.addEventListener('click', () => {
    handleDeleteBtnClick(todoList);
  });

  text.innerHTML = input;
  text.addEventListener('click', () => {
    handleItemClick(text, button, 'todoList');
  });

  addList.append(text, button);
  addList.className = 'addList';

  if (todoInput.value != '') {
    todoList.appendChild(addList);
    todoInput.value = '';
  } else {
    alert('No item!');
  }
}

function handleItemClick(text, button, parentClassName) {
  let list = document.createElement('li');
  let moveText = document.createElement('text');
  let btn = document.createElement('button');

  moveText = text;
  btn = button;
  list.append(moveText, btn);

  //todoList섹션에서 text를 누르면 doneList섹션으로 넘어감
  if (parentClassName == 'todoList') {
    btn.addEventListener('click', () => {
      handleDeleteBtnClick(doneList);
    });
    moveText.addEventListener('click', () => {
      handleItemClick(moveText, btn, 'doneList');
    });

    doneList.appendChild(list);
  }
  //doneList섹션에서 text를 누르면 todoList섹션으로 넘어감
  else if (parentClassName == 'doneList') {
    btn.addEventListener('click', () => {
      handleDeleteBtnClick(todoList);
    });
    moveText.addEventListener('click', () => {
      handleItemClick(moveText, btn, 'todoList');
    });

    todoList.appendChild(list);
  }
}

//text옆 ❎버튼을 누르면 내용 delete
function handleDeleteBtnClick(listName) {
  const list = event.target.parentElement;
  list.remove();
}
