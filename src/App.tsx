import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './TodoLIst';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
  const [task, setTask] = useState<Array<TaskType>>([
    { id: v1(), title: 'Cabinet', isDone: true },
    { id: v1(), title: 'Golden Ale', isDone: false },
    { id: v1(), title: 'Silver Ale', isDone: false },
    { id: v1(), title: 'Zhiguli', isDone: true },
    { id: v1(), title: 'Mykulinckoe', isDone: true }
  ])

  function removeTask(taskId: string) {
    const newTask = task.filter(t => t.id !== taskId)
    setTask(newTask)
  }
  const [filter, setFilter] = useState('all')

  function changeTodList(value: FilterType) {
    setFilter(value)
  }

  function filterTasks() {
    if (filter === 'active') {
      return task.filter(t => t.isDone === false)
    }
    else if (filter === 'completed') {
      return task.filter(t => t.isDone === true)
    }
    else {
      return task
    }
  }

  function addTask(title: string) {
    const newTask = {
      id: v1(),
      title,
      isDone: false
    }
    const newAddTask = [newTask, ...task]
    setTask(newAddTask)
  }

  function checkStatus(taskId: string, isDone: boolean) {
    let secondVari = task.find(t => t.id === taskId)
    if(secondVari){
      secondVari.isDone =isDone
      setTask([...task])
    }
  }

  return (
    <div className="App">
      <TodoList
        title='Beer varieties'
        tasks={filterTasks()}
        removeTask={removeTask}
        changeTodList={changeTodList}
        addTask={addTask}
        checkPropsStatus={checkStatus}
        filter = {filter}
      />
    </div>
  );
}

export default App;
