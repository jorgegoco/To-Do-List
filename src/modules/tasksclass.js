export default class Tasks {
  constructor() {
    this.arrayTasks = JSON.parse(localStorage.getItem('tasksData')) || [];
  }

  addTask = (description, completed = false, index = this.arrayTasks.length + 1) => {
    if (!this.showDescriptions().find((element) => element === description)) {
      this.arrayTasks.push({ description, completed, index });
      localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
    }
  }

  removeTask = (index) => {
    for (let i = 0; i < this.arrayTasks.length; i += 1) {
      if (this.arrayTasks[i].index === index) {
        this.arrayTasks.splice(this.arrayTasks[i].index - 1, 1);
        for (let j = i; j < this.arrayTasks.length; j += 1) {
          this.arrayTasks[j].index = j + 1;
        }
      }
    }
    localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
  }

  updateTask = (index, description) => {
    this.arrayTasks[index - 1].description = description;
    localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
  }

  updateCheckbox = (index, condition) => {
    this.arrayTasks[index - 1].completed = condition;
    localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
  }

  deleteChecked = () => {
    this.arrayTasks = this.arrayTasks.filter((task) => task.completed === false);
    for (let i = 0; i < this.arrayTasks.length; i += 1) {
      this.arrayTasks[i].index = i + 1;
    }
    localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
  }

  swapTasks = (currentpos, droppedpos) => {
    if (currentpos < droppedpos) {
      for (let i = currentpos; i < droppedpos; i += 1) {
        const temp = this.arrayTasks[i];
        this.arrayTasks[i] = this.arrayTasks[i + 1];
        this.arrayTasks[i + 1] = temp;
      }
      for (let i = 0; i < this.arrayTasks.length; i += 1) {
        this.arrayTasks[i].index = i + 1;
      }
    } else {
      for (let i = currentpos; i > droppedpos; i -= 1) {
        const temp = this.arrayTasks[i];
        this.arrayTasks[i] = this.arrayTasks[i - 1];
        this.arrayTasks[i - 1] = temp;
      }
      for (let i = 0; i < this.arrayTasks.length; i += 1) {
        this.arrayTasks[i].index = i + 1;
      }
    }
    localStorage.setItem('tasksData', JSON.stringify(this.arrayTasks));
  }

  showDescriptions = () => {
    const descriptions = [];
    for (let i = 0; i < this.arrayTasks.length; i += 1) {
      descriptions.push(this.arrayTasks[i].description);
    }
    return descriptions.reverse();
  }
}
