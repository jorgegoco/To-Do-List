export default function deleteChecked(toDOList) {
  const checkedArray = toDOList.arrayTasks.filter((task) => task.completed === false);
  for (let i = 0; i < checkedArray.length; i += 1) {
    checkedArray[i].index = i + 1;
  }
  localStorage.setItem('tasksData', JSON.stringify(checkedArray));
}