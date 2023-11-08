// 사용자가 인풋창에 입력하고 버튼을 누르면 내용이 추가되어야함
// 버튼 말고 엔터키로도 작동해야함
// 입력하면 입력필드 초기화
// 내용추가와 완료, 삭제 버튼 함께 있어야함
// 완료 버튼을 누르면 완료되었다는 스타일 표시
// 모두, 진행중, 끝남 눌렀을 때 각각 해당 목록이 보여야함
// 언더바 보더 움직이기

const taskBoard = document.querySelector('.task-board');
const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const tabs = document.querySelectorAll('.tab-item');
const underline = document.querySelector('.underline');

let taskList = [];
let filterList = [];
let mode = 'all';

window.addEventListener('DOMContentLoaded', function() {
    const tab = document.querySelector('.tab-item');

    underline.style.left = tab.offsetLeft + 'px';
    underline.style.width = tab.offsetWidth + 'px';
    underline.style.top = (tab.offsetTop + tab.offsetHeight) + 'px';
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        addTask();
    }
})

for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function(event) {
        filter(event);
        paintUnderline(event);
    })
}

function paintUnderline(event) {
    underline.style.left = event.target.offsetLeft + 'px';
    underline.style.width = event.target.offsetWidth + 'px';
    underline.style.top = (event.target.offsetTop + event.target.offsetHeight) + 'px';
}

function filter(event) {
    filterList = [];

    if(event) {
        mode = event.target.id;
    }
    if(mode === 'ongoing') {
        // completed false인 리스트보여주기
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].completed === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if(mode === 'done') {
        // completed true인 리스트보여주기
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].completed === true) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function addTask() {
    const userValue = taskInput.value;
    const taskObj = {
        id: randomIDGenerate(),
        text: userValue,
        completed: false
    }

    taskList.push(taskObj);
    taskInput.value = '';
    render();
}

function render() {
    let list = [];
    let result = '';

    if(mode === 'all') {
        list = taskList;
    } else if(mode === 'ongoing' || mode === 'done') {
        list = filterList;
    }

    for(let i = 0; i < list.length; i++) {
        if(list[i].completed) {
            result += `<div class="task">
            <p class="task-done">${list[i].text}</p>
            <div class="btn-area">
              <button type="button" onclick="toggleComplete('${list[i].id}')" class="task-done-btn">완료</button>
              <button type="button" onclick="deleteTask('${list[i].id}')" class="task-delete-btn">삭제</button>
            </div>
          </div>`;
        } else {
            result += `<div class="task">
            <p>${list[i].text}</p>
            <div class="btn-area">
              <button type="button" onclick="toggleComplete('${list[i].id}')" class="task-done-btn">완료</button>
              <button type="button" onclick="deleteTask('${list[i].id}')" class="task-delete-btn">삭제</button>
            </div>
          </div>`;
        }
    }
    taskBoard.innerHTML = result;
}

function toggleComplete(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList[i].completed = !taskList[i].completed;
        }
    }
    filter();
}

function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1);
        }
    }
    filter();
}

function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
  }