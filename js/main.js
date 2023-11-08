let taskList = [];
let filterList = [];
let mode = 'all';
const els = {};

const init = function() {
    setElements();
    bindEvents();
}

const setElements = function() {
    els.section = document.querySelector('.todo-section');
    if(!!els.section) {
        els.taskInput = els.section.querySelector('.task-input'),
        els.addBtn = els.section.querySelector('.add-btn'),
        els.taskBoard = els.section.querySelector('.task-board'),
        els.tabs = els.section.querySelectorAll('.tab-item'),
        els.underline = els.section.querySelector('.underline');
    }
}

const bindEvents = function() {
    window.addEventListener('DOMContentLoaded', function() {
        els.underline.style.left = els.tabs[0].offsetLeft + 'px';
        els.underline.style.width = els.tabs[0].offsetWidth + 'px';
        els.underline.style.top = (els.tabs[0].offsetTop + els.tabs[0].offsetHeight) + 'px';
    });
    els.addBtn.addEventListener('click', todoHandler.addTask);
    els.taskInput.addEventListener('keydown', function(event) {
        if(event.code === 'Enter') {
            todoHandler.addTask();
        }
    });
    for(let i = 0; i < els.tabs.length; i++) {
        els.tabs[i].addEventListener('click', function(event) {
            todoHandler.filter(event);
            todoHandler.paintUnderline(event);
        });
    }
}

const todoHandler = {
    paintUnderline: function(event) {
        els.underline.style.left = event.target.offsetLeft + 'px';
        els.underline.style.width = event.target.offsetWidth + 'px';
        els.underline.style.top = (event.target.offsetTop + event.target.offsetHeight) + 'px';
    },
    addTask: function() {
        const userValue = els.taskInput.value;
        const taskObj = {
            id: todoHandler.randomIDGenerate(),
            text: userValue,
            isComplete: false
        }
    
        taskList.push(taskObj);
        els.taskInput.value = '';
        todoHandler.render();
    },
    render: function() {
        let result = '';
        let list = [];
    
        if(mode === 'all') {
            list = taskList;
        } else {
            list = todoHandler.filterList;
        }
    
        for(let i = 0; i < list.length; i++) {
            if(list[i].isComplete) {
                result += `<div class="task">
                <p class="task-done">${list[i].text}</p>
                <div class="btn-area">
                  <button type="button" onclick="todoHandler.toggleComplete('${list[i].id}')" class="task-done-btn">완료</button>
                  <button type="button" onclick="todoHandler.deleteTask('${list[i].id}')" class="task-delete-btn">삭제</button>
                </div>
              </div>`;
            } else {
                result += `<div class="task">
                <p>${list[i].text}</p>
                <div class="btn-area">
                  <button type="button" onclick="todoHandler.toggleComplete('${list[i].id}')" class="task-done-btn">완료</button>
                  <button type="button" onclick="todoHandler.deleteTask('${list[i].id}')" class="task-delete-btn">삭제</button>
                </div>
              </div>`;
            }
        }
        
        els.taskBoard.innerHTML = result;
    },
    filter: function(event) {
        todoHandler.filterList = [];
    
        if(event) {
            mode = event.target.id;
        }
    
        if(mode === 'ongoing') {
            // isComplete false인 리스트
            for(let i = 0; i < taskList.length; i++) {
                if(taskList[i].isComplete === false) {
                    todoHandler.filterList.push(taskList[i]);
                }
            }
        } else if(mode === 'done') {
            // isComplete true인 리스트
            for(let i = 0; i < taskList.length; i++) {
                if(taskList[i].isComplete) {
                    todoHandler.filterList.push(taskList[i]);
                }
            }
        }
        todoHandler.render();
    },
    toggleComplete: function(id) {
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].id === id) {
                taskList[i].isComplete = !taskList[i].isComplete;
            }
        }
        todoHandler.filter();
    },
    deleteTask: function(id) {
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].id === id) {
                taskList.splice(i, 1);
            }
        }
        todoHandler.filter();
    },
    randomIDGenerate: function() {
        return Math.random().toString(36).substr(2, 16);
    }
}

init();