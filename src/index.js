import './style.css';
import Tasks from './modules/tasksclass.js';
import idNumber from './modules/utilities.js';

const toDoList = new Tasks();

function populate() {
  const items = document.querySelector('.items');
  items.replaceChildren();
  for (let i = 0; i < toDoList.arrayTasks.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'task';
    div.id = `task${i + 1}`;
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'checkbox';
    box.id = `checkbox${i + 1}`;
    box.checked = toDoList.arrayTasks[i].completed;
    div.appendChild(box);
    const task = document.createElement('input');
    task.className = 'taskToDo';
    task.id = `taskToDo${i + 1}`;
    task.value = toDoList.arrayTasks[i].description;
    if (box.checked) {
      task.classList.add('taskToDoChecked');
    } else {
      task.classList.remove('taskToDoChecked');
    }
    div.appendChild(task);
    const ellipsis = document.createElement('i');
    ellipsis.className = 'fa fa-ellipsis-v';
    ellipsis.id = `ellipsis${i + 1}`;
    div.appendChild(ellipsis);
    items.appendChild(div);
  }

  const allTasks = Array.from(document.querySelectorAll('.task'));
  const allCheckboxesTasksToDo = Array.from(document.querySelectorAll('.checkbox'));
  const allTasksToDo = Array.from(document.querySelectorAll('.taskToDo'));
  const allIconsTasksToDo = Array.from(document.querySelectorAll('.fa-ellipsis-v, .fa-trash-o'));

  allTasksToDo.forEach((taskToDo) => {
    if (!taskToDo.parentNode.classList.contains('highlightedTask')) {
      taskToDo.addEventListener('click', () => {
        taskToDo.parentNode.classList.add('highlightedTask');
        taskToDo.nextElementSibling.className = 'fa fa-trash-o fa-lg';
      });
    }
    taskToDo.addEventListener('input', (e) => toDoList.updateTask(idNumber(taskToDo.id), e.target.value));
  });

  document.addEventListener('click', (e) => {
    allTasksToDo.forEach((taskToDo) => {
      if (taskToDo.parentNode.classList.contains('highlightedTask') && e.target !== taskToDo && e.target !== taskToDo.nextElementSibling) {
        taskToDo.parentNode.classList.remove('highlightedTask');
        taskToDo.nextElementSibling.className = 'fa fa-ellipsis-v';
      }
    });
  });

  allIconsTasksToDo.forEach((iconTaskToDo) => {
    iconTaskToDo.addEventListener('click', () => {
      if (iconTaskToDo.className === 'fa fa-trash-o fa-lg') {
        iconTaskToDo.parentNode.classList.remove('highlightedTask');
        iconTaskToDo.className = 'fa fa-ellipsis-v';
        toDoList.removeTask(idNumber(iconTaskToDo.id));
        populate();
      }
    });
  });

  allCheckboxesTasksToDo.forEach((checkboxTaskToDo) => {
    checkboxTaskToDo.addEventListener('change', () => {
      const checkboxIndex = idNumber(checkboxTaskToDo.id);
      if (checkboxTaskToDo.checked) {
        toDoList.updateCheckbox(checkboxIndex, true);
        checkboxTaskToDo.nextElementSibling.classList.add('taskToDoChecked');
      } else {
        toDoList.updateCheckbox(checkboxIndex, false);
        checkboxTaskToDo.nextElementSibling.classList.remove('taskToDoChecked');
      }
    });
  });

  document.querySelector('.footerText').addEventListener('click', () => {
    toDoList.deleteChecked();
    populate();
  });

  /*
                  DRAG AND DROP FUNCTIONALITY            */

  let current = null;

  allTasks.forEach((anyTask) => {
    anyTask.draggable = true;

    anyTask.addEventListener('dragstart', () => { current = anyTask; });

    anyTask.addEventListener('dragover', (e) => e.preventDefault());

    anyTask.addEventListener('drop', (e) => {
      e.preventDefault();
      if (anyTask !== current) {
        let currentpos = 0; let
          droppedpos = 0;
        for (let it = 0; it < allTasks.length; it += 1) {
          if (current === allTasks[it]) { currentpos = it; }
          if (anyTask === allTasks[it]) { droppedpos = it; }
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
      }
    });
  });

  /*

            END OF DRAG AND DROP FUNCTIONALITY            */
}

populate();

document.querySelector('.addTaskText').addEventListener('change', (e) => {
  toDoList.addTask(e.target.value);
  e.target.value = '';
  populate();
});
