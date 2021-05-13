import React from 'react';
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
}

export function TodoList(props: TodoListPropsType) {
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
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
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

