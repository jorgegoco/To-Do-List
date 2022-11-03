export default class Tasks {
  constructor() {
    this.arrayTasks = JSON.parse(localStorage.getItem('tasksData')) || [];
  }

  addTask = (description, completed = false, index = this.arrayTasks.length + 1) => {
    if (!this.showDescriptions().find(element => element === description)) {
      this.arrayTasks.push({ description, completed, index });
      localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
    }
  }

  removeTask = (description) => {
    for (let i = 0; i < this.arrayTasks.length; i += 1) {
      if (this.arrayTasks[i].description === description) {
        this.arrayTasks.splice(index, 1);
        for (let j = i; j < this.arrayTasks.length; i += 1) {
          this.arrayTasks[j].index = j + 1;
        }
      }
    }
    localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
  }

  showDescriptions = () => {
    let descriptions = [];
    for (let i = 0; i < this.arrayTasks.length; i += 1)
      descriptions.push(this.arrayTasks[i].description);
    return descriptions.reverse();
  }
}

