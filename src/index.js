import './style.css';
import Tasks from './tasks.js';

const toDoList = new Tasks();

const populate = () => {
  const items = document.querySelector('.items');
  items.replaceChildren();
  for (let i = 0; i < toDoList.arrayTasks.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'task';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'checkbox';
    div.appendChild(box);
    const task = document.createElement('p');
    const taskText = document.createTextNode(toDoList.arrayTasks[i].description);
    task.appendChild(taskText);
    div.appendChild(task);
    const ellipsis = document.createElement('i');
    ellipsis.className = 'fa fa-ellipsis-v';
    ellipsis.id = toDoList.arrayTasks[i].index;
    div.appendChild(ellipsis);
    items.appendChild(div);
  }
  const allEllipsisIcons = Array.from(document.querySelectorAll('.fa-ellipsis-v'));
  allEllipsisIcons.forEach((ellipsisIcon) => {
    ellipsisIcon.addEventListener('click', () => {
      let indexIcon = parseInt(ellipsisIcon.id);
      toDoList.removeTask(indexIcon);
      populate();
    })
  })
};

document.addEventListener('DOMContentLoaded', () => {
  populate();
});

document.querySelector('.addTaskText').addEventListener('change', (e) => {
  toDoList.addTask(e.target.value);
  e.target.value = '';
  populate();
});
