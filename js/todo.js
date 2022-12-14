//양창덕님

const todoInputElem = document.querySelector('.todo-input'); // selectors는 document 전체에서 일치하는 엘리먼트를 갖고 오고 이후 이 엘리먼트를 이용하여 자손 엘리먼트를 다시 가져올 수 있다
const todoListElem = document.querySelector('.todo-list'); // todo 리스트들
const completeAllBtnElem = document.querySelector('.complete-all-btn'); // 전체선택하기 버튼
const leftItemsElem = document.querySelector('.left-items'); // 해야할일 수
const showAllBtnElem = document.querySelector('.show-all-btn'); // 모든 목록 리스트
const showActiveBtnElem = document.querySelector('.show-active-btn'); // 해야할일 리스트
const showCompletedBtnElem = document.querySelector('.show-completed-btn'); //  완료 리스트목록
const clearCompletedBtnElem = document.querySelector('.clear-completed-btn'); // 완료 리스트 지우기

let id = 0; // 새로운 todo에 Id 를 1씩 증가시켜 다른 아이디를 가지게한다
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

const getAllTodos = () => {
  //추가할 배열을 이전 todos배열에 추가하여 newTodos에 저장한다
  return todos;
};
const getCompletedTodos = () => { // 완료한 일 을 isCompleted 와 비교해 같다면 완료 리스트에 추가
  return todos.filter((todo) => todo.isCompleted === true); // filter 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
};
const getActiveTodos = () => { // isCompleted 와 다르다면 할일 리스트에 추가
  return todos.filter((todo) => todo.isCompleted === false);
};

const setLeftItems = () => { //  active 리스트의 개수 읽어 숫자로 표현해준다
  const leftTodos = getActiveTodos();
  leftItemsElem.innerHTML = `${leftTodos.length} items left`;
};

const completeAll = () => { // check box 버튼을 클릭하면 getalltodos에 있는 리스트들을 새로운 배열에 담아 iscomplete 로 추가해준다  
  completeAllBtnElem.classList.add('checked'); // class 에 checked를 추가시켜 준다
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: true,
  }));
  setTodos(newTodos);
};

const incompleteAll = () => { // check box 버튼클릭시 complete 상태를 새로운 배열에 담아 iscomplete false로 바꿔 active배열에 추가한다 
  completeAllBtnElem.classList.remove('checked'); // class 에 checked를 제거해 준다 // remove 함수는 선택한 요소를 제거할 때 사용하거나, 요소 내의 태그들을 삭제할 때 사용합니다
  const newTodos = getAllTodos().map((todo) => ({ // map 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다
    ...todo,
    isCompleted: false,
  }));
  setTodos(newTodos);
};

// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => { 
  if (getAllTodos().length === getCompletedTodos().length) {
    setIsAllCompleted(true);
    completeAllBtnElem.classList.add('checked'); //completeAll btn 클릭시 getALLTodos에 있는 리스트가 getCompletedTodos의 리스트 와 같으면 class아이디에 checked를 붙여 complete에 추가시킨다
  } else {
    setIsAllCompleted(false);
    completeAllBtnElem.classList.remove('checked'); // 위 사항이 같지 false 라면 checked를 지워라 즉 active의 배열로 추가 시킨다
  }
};

const onClickCompleteAll = () => {
  if (!getAllTodos().length) return; // todos배열의 길이가 0이면 return;

  if (isAllCompleted)
    incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리
  else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리
  setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
  paintTodos(); // 새로운 todos를 렌더링
  setLeftItems(); // active 수를 렌더링
};

// 서길원님

const appendTodos = (text) => {
  //todos 배열에 할 일을 추가하는 함수.
  const newId = id + 1; // 기존에 i++ 로 작성했던 부분을 setId()를 통해 id값을 갱신
  setId(newId); //newId 변수는 새롭게 저장되는 할일의 id값이며, ++연산자를 통해 1씩 증가시킴으로써 id값이 중복되지 않도록 해줌.
  const newTodos = getAllTodos().concat({
    //newTodos는 새롭게 저장될 todos 배열로 getAllTodos() 함수를 통해 이전 todos 배열을 가져온 후, 새롭게 추가된 할 일을 concat()을 통해 추가된 배열을 newTodos에 저장함. concat()을 사용하는 이유는 concat()은 기존 todos배열에 아무런 영향을 주지 않고 todos배열을 복사한 값에 추가한 할 일을 반환해주기 때문이다. 이렇게 반환된 newTodos를 setTodos()라는 함수로 기존 todos배열을 변경시켜준다.
    id: newId, //number 타입으로, 할 일의 유니크한 키 값이.
    isCompleted: false, //boolean 타입으로, 할 일의 완료상태를 나타냄.
    content: text, //string 타입으로, 할 일의 내용.
  });
  // const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text }]
  setTodos(newTodos);
  setLeftItems();
  checkIsAllCompleted();
  paintTodos(); // 할 일이 추가될 때마다, paintTodos() 함수를 실행.
};

const deleteTodo = (todoId) => {
  //'delBtn' 클래스 네임을 가지는 삭제 버튼 요소를 click 하면 deleteTodo() 함수가 실행되고 인자로 todo.id를 받음.
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId); //deleteTodo() 함수는 입력받은 todo의 id 값과 Array filter()를 이용해 삭제하고자 하는 할 일을 제외한 새로운 할 일 목록을 가지는 배열을 만들 수 있음.
  setTodos(newTodos); //setTodos()함수를 통해 기존의 todos 배열을 바꿔줌.
  setLeftItems();
  paintTodos(); // paintTodos() 함수를 통해 삭제된 todos배열로 다시 HTML를 다시 렌더링
};

const completeTodo = (todoId) => {
  //할 일 완료 처리// 'click' 이벤트 리스너 등록을 통해 처리
  const newTodos = getAllTodos().map(
    (todo) =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo //완료 처리는 Array map()을 사용하여 완료 처리를 하고자 하는 할 일의 isCompleted 값을 토글(true이면 false로, false면 true로) 처리하여 새로운 todos 배열을 저장
  );
  setTodos(newTodos);
  paintTodos(); //이후 HTML은 paintTodos() 함수를 통해 변경된 todos를 재 렌더링
  setLeftItems();
  checkIsAllCompleted();
};

const updateTodo = (text, todoId) => {
  //수정을 위해 만들어준 input 요소에서 'Enter' 키가 눌리면, 기존의 할 일 내용을 updateTodo() 함수를 통해 수정
  const currentTodos = getAllTodos(); //첫째는 text로 수정될 할 일의 내용이며, 두번째는 todoId로 수정 될 할 일의 id
  const newTodos = currentTodos.map((todo) =>
    todo.id === todoId ? { ...todo, content: text } : todo
  );
  setTodos(newTodos); //setTodos() 함수를 통해 새로운 todos배열을 저장
  paintTodos(); //paintTodos() 함수를 통해, 변경된 todos 배열로 할 일 리스트를 다시 렌더링
};

const onDbclickTodo = (e, todoId) => {
  //onDbclickTodo() 함수는 두 개의 파라미터를 입력받는다. 첫 번째 파라미터는 event객체이며, 두 번째 파라미터는 할 일의 id 입니다. onDbclickTodo() 함수를 통해 새로운 input 요소를 만들어 사용자가 수정
  const todoElem = e.target;
  const inputText = e.target.innerText;
  const todoItemElem = todoElem.parentNode;
  const inputElem = document.createElement('input'); //document.createElement() 함수를 통해 inputElem이라는 input 요소를 만듬
  inputElem.value = inputText; //inputElem의 value 값으로 event 객체의 target.innerText를 넣어준다
  inputElem.classList.add('edit-input'); // inputElem의 클래스 네임으로는 'edit-input'이라고 지정
  inputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateTodo(e.target.value, todoId);
      document.body.removeEventListener('click', onClickBody);
    }
  });

  const onClickBody = (e) => {
    //입력창을 제외하고, 브라우저 클릭 이벤트가 발생 시, 수정 모드를 종료
    if (e.target !== inputElem) {
      //event객체의 target이 수정 모드를 위해 생성한 inputElem이 아니라면,
      todoItemElem.removeChild(inputElem); //inputElem의 부모 요소인 todoElem에서 removeChild()를 사용하여 inputElem을 제거
      document.body.removeEventListener('click', onClickBody);
    }
  };

  document.body.addEventListener('click', onClickBody);
  todoItemElem.appendChild(inputElem);
};

const clearCompletedTodos = () => {
  //todos 배열을 현재 완료되지 않은 할 일 리스트로 변경해 준 후, paintTodos()함수로 투두리스트를 재 렌더링
  const newTodos = getActiveTodos();
  setTodos(newTodos);
  paintTodos();
};

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

  //완료된 목록이 true라면
  if (todo.isCompleted) {
    //목록에 checked 클래스 추가
    todoItemElem.classList.add('checked');
    //체크박스에 체크표시
    checkboxElem.innerText = '✔';
  }

  //목록에 자식노드 추가
  todoItemElem.appendChild(checkboxElem); //체크박스
  todoItemElem.appendChild(todoElem); //글자부분
  todoItemElem.appendChild(delBtnElem); //삭제버튼

  //전체 목록에 자식노드 추가
  todoListElem.appendChild(todoItemElem); //각각의 목록
};

//paintTodos 함수 정의
const paintTodos = () => {
  todoListElem.innerHTML = null; //전체목록을 빈 값으로 채움

  switch (currentShowType) {
    //currentShowType이 all이라면
    case 'all':
      //allTodos 변수에 getAllTodos함수를 할당
      const allTodos = getAllTodos();
      //allTodos 배열 안 value에 paintTodo함수 실행 (목록비움)
      allTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    //currentShowType이 active라면
    case 'active':
      //activeTodos 변수에 getActiveTodos함수를 할당
      const activeTodos = getActiveTodos();
      //activeTodos 배열 안 value에 paintTodo함수 실행 (목록비움)
      activeTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    //currentShowType이 completed라면
    case 'completed':
      //completedTodos 변수에 getCompletedTodos함수를 할당
      const completedTodos = getCompletedTodos();
      //completedTodos 배열 안 value에 paintTodo함수 실행 (목록비움)
      completedTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    default:
      break;
  }
};

// onClickShowTodosType변수 선언 및 e를 인자로 받는 아래 애로우 함수 할당
// 클릭하면 해당하는 버튼의 타입 목록을 보여줌
const onClickShowTodosType = (e) => {
  // currentBtnEle변수 선언 및 e.target 할당
  const currentBtnElem = e.target;
  // newShowType변수 선언 및 currentBtnElem.dataset.type 할당
  const newShowType = currentBtnElem.dataset.type;

  // currentShowType이 newShowType이라면 리턴 (뭐를?)
  if (currentShowType === newShowType) return;

  // preBtnElem 변수 선언 및 show-${currentShowType}-btn 클래스를 가진 요소 리턴
  // (이 부분은 jquery 사용한 듯)
  const preBtnElem = document.querySelector(`.show-${currentShowType}-btn`);
  // preBtnElem에서 selected 클래스 제거
  preBtnElem.classList.remove('selected');

  // currentBtnElem에 selected 클래스 추가
  currentBtnElem.classList.add('selected');
  // currentBtnElem함수에 newShowType 인자줌 (currentShowType에 newShowType 할당하는 함수)
  setCurrentShowType(newShowType);
  //paintTodos함수 호출 (전체 목록을 빈 값으로 채움)
  paintTodos();
};

// init 변수 선언 및 함수 할당
const init = () => {
  // todoInputElem를 이벤트리스너에 추가
  // 사용자가 입력한 값은 엔터 키를 누르면 todo목록에 value로 추가된다
  todoInputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      appendTodos(e.target.value);
      todoInputElem.value = '';
    }
  });
  // 전체 선택하기 버튼을 클릭하면 onClickCompleteAll 함수 실행
  completeAllBtnElem.addEventListener('click', onClickCompleteAll);
  // 모든 목록보기 버튼을 클릭하면 onClickShowTodosType함수 실행
  showAllBtnElem.addEventListener('click', onClickShowTodosType);
  // 미완료된 목록보기 버튼을 클릭하면 onClickShowTodosType함수 실행
  showActiveBtnElem.addEventListener('click', onClickShowTodosType);
  // 완료된 목록보기 버튼을 클릭하면 onClickShowTodosType함수 실행
  showCompletedBtnElem.addEventListener('click', onClickShowTodosType);
  // 완료된 목록지우기 버튼을 클릭하면 clearCompletedTodos함수 실행
  clearCompletedBtnElem.addEventListener('click', clearCompletedTodos);
  // setLeftItems함수 실행 (해야 할 일 리스트 초기화)
  setLeftItems();
};

// init함수 호출
init();
