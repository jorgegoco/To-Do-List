import Tasks from '../src/modules/tasksclass.js';

describe('Test the CRUD functions in the "Tasks" class', () => {
  const newToDoList = new Tasks();

  test('"addTask" function', () => {
    newToDoList.addTask('task1');
    expect(newToDoList.arrayTasks.length).toBe(1);
    newToDoList.addTask('task2');
    expect(newToDoList.arrayTasks.length).toBe(2);
  });

  test('"removeTask" function', () => {
    newToDoList.removeTask(2);
    expect(newToDoList.arrayTasks.length).toBe(1);
    newToDoList.removeTask(1);
    expect(newToDoList.arrayTasks.length).toBe(0);
  });

  test('"updateTask" function', () => {
    newToDoList.addTask('New task');
    newToDoList.updateTask(1, 'Updated task');
    expect(newToDoList.arrayTasks[0].description).toBe('Updated task');
    newToDoList.removeTask(1);
  });

  test('"updateCheckbox" function', () => {
    newToDoList.addTask('New task');
    newToDoList.updateCheckbox(1, true);
    expect(newToDoList.arrayTasks[0].completed).toBe(true);
    newToDoList.updateCheckbox(1, false);
    expect(newToDoList.arrayTasks[0].completed).toBe(false);
    newToDoList.removeTask(1);
  });

  test('"deleteChecked" function', () => {
    newToDoList.addTask('task1');
    newToDoList.addTask('task2');
    newToDoList.addTask('task3');
    newToDoList.updateCheckbox(1, true);
    newToDoList.updateCheckbox(3, true);
    newToDoList.deleteChecked();
    expect(newToDoList.arrayTasks.length).toBe(1);
    expect(newToDoList.arrayTasks[0].description).toBe('task2');
    newToDoList.removeTask(1);
  });

  test('"swapTasks" function', () => {
    newToDoList.addTask('task1');
    newToDoList.addTask('task2');
    newToDoList.addTask('task3');
    newToDoList.swapTasks(0, 2);
    expect(newToDoList.arrayTasks[0].description).toBe('task2');
    expect(newToDoList.arrayTasks[1].description).toBe('task3');
    expect(newToDoList.arrayTasks[2].description).toBe('task1');
  });
});