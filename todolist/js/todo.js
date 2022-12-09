//양창덕님

const todoInputElem = document.querySelector('.todo-input'); // selectors는 document 전체에서 일치하는 엘리먼트를 갖고 오고 이후 이 엘리먼트를 이용하여 자손 엘리먼트를 다시 가져올 수 있다
const todoListElem = document.querySelector('.todo-list');
const completeAllBtnElem = document.querySelector('.complete-all-btn');
const leftItemsElem = document.querySelector('.left-items');
const showAllBtnElem = document.querySelector('.show-all-btn');
const showActiveBtnElem = document.querySelector('.show-active-btn');
const showCompletedBtnElem = document.querySelector('.show-completed-btn');
const clearCompletedBtnElem = document.querySelector('.clear-completed-btn');

let id = 0; // Id 를 1씩 증가시켜 다른 아이디를 가지게한다
const setId = (newId) => {
  id = newId;
};

let isAllCompleted = false; // 전체 todos 체크 여부
const setIsAllCompleted = (bool) => {
  isAllCompleted = bool;
};

let currentShowType = 'all'; // all  | active | complete
const setCurrentShowType = (newShowType) => (currentShowType = newShowType);

let todos = []; // 새로 저장될 todos 배열
const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => { //추가할 배열을 이전 todos배열에 추가하여 newTodos에 저장한다
  return todos;
};
const getCompletedTodos = () => {
  return todos.filter((todo) => todo.isCompleted === true);
};
const getActiveTodos = () => {
  return todos.filter((todo) => todo.isCompleted === false);
};

const setLeftItems = () => {
  const leftTodos = getActiveTodos();
  leftItemsElem.innerHTML = `${leftTodos.length} items left`;
};

const completeAll = () => {
  completeAllBtnElem.classList.add('checked');
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: true,
  }));
  setTodos(newTodos);
};

const incompleteAll = () => {
  completeAllBtnElem.classList.remove('checked');
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: false,
  }));
  setTodos(newTodos);
};

// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
  if (getAllTodos().length === getCompletedTodos().length) {
    setIsAllCompleted(true);
    completeAllBtnElem.classList.add('checked');
  } else {
    setIsAllCompleted(false);
    completeAllBtnElem.classList.remove('checked');
  }
};

const onClickCompleteAll = () => {
  if (!getAllTodos().length) return; // todos배열의 길이가 0이면 return;

  if (isAllCompleted)
    incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리
  else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리
  setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
  paintTodos(); // 새로운 todos를 렌더링
  setLeftItems();
};

// 서길원님

const appendTodos = (text) => {
  const newId = id + 1; // 기존에 i++ 로 작성했던 부분을 setId()를 통해 id값을 갱신하였다.
  setId(newId);
  const newTodos = getAllTodos().concat({
    id: newId,
    isCompleted: false,
    content: text,
  });
  // const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text }]
  setTodos(newTodos);
  setLeftItems();
  checkIsAllCompleted();
  paintTodos();
};

const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId);
  setTodos(newTodos);
  setLeftItems();
  paintTodos();
};

const completeTodo = (todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  setTodos(newTodos);
  paintTodos();
  setLeftItems();
  checkIsAllCompleted();
};

const updateTodo = (text, todoId) => {
  const currentTodos = getAllTodos();
  const newTodos = currentTodos.map((todo) =>
    todo.id === todoId ? { ...todo, content: text } : todo
  );
  setTodos(newTodos);
  paintTodos();
};

const onDbclickTodo = (e, todoId) => {
  const todoElem = e.target;
  const inputText = e.target.innerText;
  const todoItemElem = todoElem.parentNode;
  const inputElem = document.createElement('input');
  inputElem.value = inputText;
  inputElem.classList.add('edit-input');
  inputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateTodo(e.target.value, todoId);
      document.body.removeEventListener('click', onClickBody);
    }
  });

  const onClickBody = (e) => {
    if (e.target !== inputElem) {
      todoItemElem.removeChild(inputElem);
      document.body.removeEventListener('click', onClickBody);
    }
  };

  document.body.addEventListener('click', onClickBody);
  todoItemElem.appendChild(inputElem);
};

const clearCompletedTodos = () => {
  const newTodos = getActiveTodos();
  setTodos(newTodos);
  paintTodos();
};

//이예찬
//이예찬
//paintTodo 변수 선언 후 arrow function 할당
// todo를 parameter로 설정
const paintTodo = (todo) => {
  // todoItemElem 변수 선언 후 createElement(태그명) 함수로 li태그만들어 할당
  const todoItemElem = document.createElement('li');
  // classList()함수 이용해 todoItemElem에 todo-item 클래스 속성 추가
  // todo-item 클래스 속성을 추가하면 css내 설정들 적용됨
  // 인풋창에 입력하면 아래 추가되는 기능!
  todoItemElem.classList.add('todo-item');

  // setAttribute(속성명, 속성값) 함수는 선택한 요소의 속성값을 정하는 함수
  // todoItemElem에 data-id라는 속성을 추가해 todo.id라는 이름을 붙인다.
  //이후 todoItemElem은 todo.id로 호출 가능
  todoItemElem.setAttribute('data-id', todo.id);

  //checkboxElem 변수 선언
  //div태그 만들어 할당
  const checkboxElem = document.createElement('div');
  //checkboxElem에 checkbox 클래스 추가
  //사용자가 작성한 todolist 옆 체크 박스를 의미
  checkboxElem.classList.add('checkbox');
  //checkboxElem을 이벤트리스너에 추가
  //클릭하면 아래 arrow function실행하고 arrow function은 completeTodo 함수에 todo.id라는 인자 전달 (completeTodo함수는 위에서 이미 선언)
  //체크박스 클릭하면 작성한 todolist를 완료한 리스트에 추가하는 듯
  checkboxElem.addEventListener('click', () => completeTodo(todo.id));

  // todoElem 변수 선언
  // div태그 만들어 할당
  const todoElem = document.createElement('div');
  // todoElem에 todo 클래스 추가
  // todo는 todo-item 목록 안 글을 의미
  todoElem.classList.add('todo');
  // todoElem을 더블클릭하면 이벤트 발생
  //더블클릭하면 event를 인자로 받는 함수 실행하여 onDbclickTodo함수에 event와 todo.id(작성한 목록)를 인자로 전달해 실행(onDbclickTodo함수는 위에서 이미 선언)
  // onDbclickTodo함수는 이미 작성한 todolist를 수정하는 역할인 듯
  todoElem.addEventListener('dblclick', (event) =>
    onDbclickTodo(event, todo.id)
  );
  // todoElem(작성한 글)의 텍스트를 todo.content로 채움
  todoElem.innerText = todo.content;

  // delBtnElem 변수 선언
  // button요소 할당
  const delBtnElem = document.createElement('button');
  // delBtn 클래스 추가
  delBtnElem.classList.add('delBtn');
  // 삭제버튼 클릭하면 deleteTodo함수에 todo.id(작성한 목록)전달
  delBtnElem.addEventListener('click', () => deleteTodo(todo.id));
  // delBtnElem을 X로 채움
  delBtnElem.innerHTML = 'X';

  if (todo.isCompleted) {
    todoItemElem.classList.add('checked');
    checkboxElem.innerText = '✔';
  }

  todoItemElem.appendChild(checkboxElem);
  todoItemElem.appendChild(todoElem);
  todoItemElem.appendChild(delBtnElem);

  todoListElem.appendChild(todoItemElem);
};

const paintTodos = () => {
  todoListElem.innerHTML = null;

  switch (currentShowType) {
    case 'all':
      const allTodos = getAllTodos();
      allTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    case 'active':
      const activeTodos = getActiveTodos();
      activeTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    case 'completed':
      const completedTodos = getCompletedTodos();
      completedTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    default:
      break;
  }
};

const onClickShowTodosType = (e) => {
  const currentBtnElem = e.target;
  const newShowType = currentBtnElem.dataset.type;

  if (currentShowType === newShowType) return;

  const preBtnElem = document.querySelector(`.show-${currentShowType}-btn`);
  preBtnElem.classList.remove('selected');

  currentBtnElem.classList.add('selected');
  setCurrentShowType(newShowType);
  paintTodos();
};

const init = () => {
  todoInputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      appendTodos(e.target.value);
      todoInputElem.value = '';
    }
  });
  completeAllBtnElem.addEventListener('click', onClickCompleteAll);
  showAllBtnElem.addEventListener('click', onClickShowTodosType);
  showActiveBtnElem.addEventListener('click', onClickShowTodosType);
  showCompletedBtnElem.addEventListener('click', onClickShowTodosType);
  clearCompletedBtnElem.addEventListener('click', clearCompletedTodos);
  setLeftItems();
};

init();
