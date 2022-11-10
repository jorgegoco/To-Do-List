import './style.css';
import Tasks from './tasks.js';
import deleteChecked from './checkbox.js';

const toDoList = new Tasks();

function populate() {
  const items = document.querySelector('.items');
  items.replaceChildren();
  for (let i = 0; i < toDoList.arrayTasks.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'task';
    div.id = `task${toDoList.arrayTasks[i].index}`;
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'checkbox';
    box.id = `checkbox${toDoList.arrayTasks[i].index}`;
    box.checked = toDoList.arrayTasks[i].completed;
    div.appendChild(box);
    const task = document.createElement('input');
    task.className = 'taskToDo';
    task.id = `taskToDo${toDoList.arrayTasks[i].index}`;
    task.value = toDoList.arrayTasks[i].description;
    if (box.checked) {
      task.classList.add('taskToDoChecked');
      task.style.color = 'rgb(175,175,175)';
    } else {
      task.classList.remove('taskToDoChecked');
      task.style.color = 'inherit';
    }
    div.appendChild(task);
    const ellipsis = document.createElement('i');
    ellipsis.className = 'fa fa-ellipsis-v';
    ellipsis.id = `ellipsis${toDoList.arrayTasks[i].index}`;
    div.appendChild(ellipsis);
    items.appendChild(div);
  }
  const allTasksToDo = Array.from(document.querySelectorAll('.taskToDo'));
  const allIconsTasksToDo = Array.from(document.querySelectorAll('.fa-ellipsis-v, .fa-trash-o'));
  const allCheckboxesTasksToDo = Array.from(document.querySelectorAll('.checkbox'));
  const allTasks = Array.from(document.querySelectorAll('.task'));

  allTasksToDo.forEach((taskToDo) => {
    if (taskToDo.parentNode.style.backgroundColor !== 'rgb(255, 255, 200)') {
      taskToDo.addEventListener('click', () => {
        taskToDo.parentNode.style.backgroundColor = 'rgb(255, 255, 200)';
        taskToDo.nextElementSibling.className = 'fa fa-trash-o fa-lg';
        taskToDo.addEventListener('input', (ev) => {
          toDoList.updateTask(Number(taskToDo.id.replace(/\D/g, '')), ev.target.value);
        });
      });
    }
  });

  document.addEventListener('click', (e) => {
    allTasksToDo.forEach((taskToDo) => {
      if (taskToDo.parentNode.style.backgroundColor === 'rgb(255, 255, 200)' && e.target !== taskToDo && e.target !== taskToDo.nextElementSibling) {
        taskToDo.parentNode.style.backgroundColor = 'inherit';
        taskToDo.nextElementSibling.className = 'fa fa-ellipsis-v';
      }
    });
  });

  allIconsTasksToDo.forEach((iconTaskToDo) => {
    iconTaskToDo.addEventListener('click', () => {
      if (iconTaskToDo.className === 'fa fa-trash-o fa-lg') {
        iconTaskToDo.parentNode.style.backgroundColor = 'initial';
        iconTaskToDo.className = 'fa fa-ellipsis-v';
        toDoList.removeTask(Number(iconTaskToDo.id.replace(/\D/g, '')));
        populate();
      }
    });
  });

  allCheckboxesTasksToDo.forEach((checkboxTaskToDo) => {
    checkboxTaskToDo.addEventListener('change', () => {
      const checkboxIndex = Number(checkboxTaskToDo.id.replace(/\D/g, ''));
      if (checkboxTaskToDo.checked) {
        toDoList.arrayTasks[checkboxIndex - 1].completed = true;
        checkboxTaskToDo.nextElementSibling.style.color = 'rgb(175,175,175)';
        checkboxTaskToDo.nextElementSibling.classList.add('taskToDoChecked');
      } else {
        toDoList.arrayTasks[checkboxIndex - 1].completed = false;
        checkboxTaskToDo.nextElementSibling.style.color = 'inherit';
        checkboxTaskToDo.nextElementSibling.classList.remove('taskToDoChecked');
      }
      localStorage.setItem('tasksData', JSON.stringify(toDoList.arrayTasks));
    });
  });

  document.querySelector('.footerText').addEventListener('click', () => {
    deleteChecked(toDoList);
    toDoList.arrayTasks = JSON.parse(localStorage.getItem('tasksData'));
    populate();
  });

  let current = null;

  for (let i of allTasks) {

    i.draggable = true;

    i.addEventListener('dragstart', () => current = i);

    i.addEventListener('dragover', evt => evt.preventDefault());

    i.addEventListener('drop', evt => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it = 0; it < allTasks.length; it++) {
          if (current == allTasks[it])
            currentpos = it;
          if (i == allTasks[it])
            droppedpos = it;
        }
        if (currentpos < droppedpos) {
          for (let j = currentpos; j < droppedpos; j += 1) {
            const temp = toDoList.arrayTasks[j];
            toDoList.arrayTasks[j] = toDoList.arrayTasks[j + 1];
            toDoList.arrayTasks[j + 1] = temp;
          }
          for (let j = 0; j < toDoList.arrayTasks.length; j += 1) {
            toDoList.arrayTasks[j].index = j + 1;
          }
          localStorage.setItem('tasksData', JSON.stringify(toDoList.arrayTasks));
          populate();

        } else {
          for (let j = currentpos; j > droppedpos; j -= 1) {
            const temp = toDoList.arrayTasks[j];
            toDoList.arrayTasks[j] = toDoList.arrayTasks[j - 1];
            toDoList.arrayTasks[j - 1] = temp;
          }
          for (let j = 0; j < toDoList.arrayTasks.length; j += 1) {
            toDoList.arrayTasks[j].index = j + 1;
          }
          localStorage.setItem('tasksData', JSON.stringify(toDoList.arrayTasks));
          populate();
        }
      };
    });
  };
}

populate();

document.querySelector('.addTaskText').addEventListener('change', (e) => {
  toDoList.addTask(e.target.value);
  e.target.value = '';
  populate();
});
