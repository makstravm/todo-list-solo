import React, { useState } from 'react';
import { FilterType } from './App';
import './App.css';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeTodList: (value: FilterType) => void
  addTask: (title: string) => void
}

export function TodoList(props: TodoListPropsType) {
  const [newTitle, setNewTitle] = useState('')
  const todoListTask = props.tasks.map(t => {
    const removeTaskHandler = () => props.removeTask(t.id)
    return (
      <li>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={removeTaskHandler}>X</button>
      </li>
    )
  })
  const filterTodoListAll = () => props.changeTodList('all');
  const filterTodoListActive = () => props.changeTodList('active');
  const filterTodoListCompleted = () => props.changeTodList('completed');
  const addTaskHandler = () => {
    props.addTask(newTitle)
    setNewTitle('')
  }
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
  const onPressKeyAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(newTitle)
      setNewTitle('')
    }
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTitle}
          onChange={onChangeTask}
          onKeyPress={onPressKeyAddTask}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {todoListTask}
      </ul>
      <div>
        <button onClick={filterTodoListAll}>All</button>
        <button onClick={filterTodoListActive}>Active</button>
        <button onClick={filterTodoListCompleted}>Completed</button>
      </div>
    </div>
  )
}

