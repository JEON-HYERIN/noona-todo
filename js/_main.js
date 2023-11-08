// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// check 버튼을 클릭하는 순간 true false
// true면 끝난걸로 간주하고 밑줄 보여주기
// false면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const taskBoard = document.querySelector('.task-board');
const tabs = document.querySelectorAll('.tab-item');
const underline = document.querySelector('.underline');

let taskList = [];
let mode = 'all';
let filterList = [];

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
  if(event.code === 'Enter') { // event.keyCode === 13 동일
    addTask();
  }
});

for(let i=0; i<tabs.length; i++) {
  tabs[i].addEventListener('click', function(event) {
    filter(event);
  })
}

document.addEventListener("DOMContentLoaded", function() {
  underline.style.left = document.querySelector('.tab-item').offsetLeft + 'px';
  underline.style.width = document.querySelector('.tab-item').offsetWidth + 'px';
  underline.style.top = (document.querySelector('.tab-item').offsetTop + document.querySelector('.tab-item').offsetHeight) + 'px';
})

function addTask() {
 let task = {
  id: randomIDGenerate(),
  taskContent: taskInput.value,
  isComplete: false
 };

 taskList.push(task);
 taskInput.value = '';
 taskInput.focus();
 render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = [];

  if(mode === 'all') {
    // all taskList
    list = taskList;
  } else {
    // else if(mode === 'ongoing' || mode === 'done') 을 결국 else 로 치환할 수 있다.
    // ongoing, done -> filterList
    list = filterList;
  }
  // 2. 리스트를 달리 보여준다.
  let resultHTML = '';

  for(let i=0;i<list.length;i++) {
    if(list[i].isComplete == true) {
      resultHTML+= `
      <div class="task">
      <p class="task-done">${list[i].taskContent}</p>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `
      <div class="task">
        <p>${list[i].taskContent}</p>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    }
  }
  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  for(let i=0; i<taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for(let i=0; i<taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(i, 1);
      filterList = taskList;
      break;
    }
  }
  filter();
}

function filter(event) {
  if(event) {
    mode = event.target.id;
    underline.style.left = `${event.target.offsetLeft}px`;
    underline.style.width = `${event.target.offsetWidth}px`;
    underline.style.top = `${event.target.offsetTop + event.target.offsetHeight}px`;
  }

  filterList = [];

  if(mode === 'ongoing') {
    // 진행중인 아이템을 보여준다.
    // task.isComplete = false
    for(let i=0;i<taskList.length;i++) {
      if(taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if(mode === 'done') {
    // 끝나는 케이스
    // task.isComplete = true
    for(let i=0;i<taskList.length;i++) {
      if(taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return Math.random().toString(36).substr(2, 16);
}