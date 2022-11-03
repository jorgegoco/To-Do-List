import './style.css';

const tasks = [];

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

tasks.push(new Task('wash the dishes', false, 2), new Task('fix car', false, 3), new Task('buy food', false, 1));
tasks.sort((a, b) => a.index - b.index);

const populate = () => {
  const items = document.querySelector('.items');
  for (let i = 0; i < tasks.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'task';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'checkbox';
    div.appendChild(box);
    const task = document.createElement('p');
    const taskText = document.createTextNode(tasks[i].description);
    task.appendChild(taskText);
    div.appendChild(task);
    const ellipsis = document.createElement('i');
    ellipsis.className = 'fa fa-ellipsis-v';
    div.appendChild(ellipsis);
    items.appendChild(div);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  populate();
});
