import Tasks from '../src/modules/tasksclass.js';

describe('Test the "add" and "remove" functions in the "Tasks" class', () => {
  const newToDoList = new Tasks();

  test('"addTask" function', () => {
    newToDoList.addTask('task1');
    expect(newToDoList.arrayTasks.length).toBe(1);
    newToDoList.addTask('task2');
    expect(newToDoList.arrayTasks.length).toBe(2);
  });
});