import React, { ChangeEvent, useState } from 'react';
import { FilterType } from './App';
import s from './App.module.css';

export type TaskType = {
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
  checkPropsStatus: (taskId: string, isDone: boolean) => void
  filter: any
}

export function TodoList(props: TodoListPropsType) {
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState(false)
  const todoListTask = props.tasks.map(t => {
    const removeTaskHandler = () => props.removeTask(t.id)
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.checkPropsStatus(t.id, e.currentTarget.checked);
    return (
      <li key={t.id} className={s.item}>
        <label>
          <input
            className={s.checkbox}
            type="checkbox"
            checked={t.isDone}
            onChange={changeStatusHandler} />
          <span className={s.checkboxSpan}><span></span></span>
        </label>
        <span className={s.title + ' ' + (t.isDone && s.isDone)}>{t.title}</span>
        <button className={s.btn + ' ' + s.btnItem} onClick={removeTaskHandler}>x</button>
      </li>
    )
  })
  const filterTodoListAll = () => props.changeTodList('all');
  const filterTodoListActive = () => props.changeTodList('active');
  const filterTodoListCompleted = () => props.changeTodList('completed');
  const classFilterAll = (props.filter === 'all') && s.active
  const classFilterActive = (props.filter === 'active') && s.active
  const classFilterComleted = (props.filter === 'completed') && s.active
  const addTaskHandler = () => {
    if (newTitle.trim() !== '') {
      props.addTask(newTitle.trim())
      setNewTitle('')
    } else {
      setError(true)
    }
  }
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
  const onPressKeyAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTitle}
          onChange={onChangeTask}
          onKeyPress={onPressKeyAddTask}
          className={s.input + ' ' + (error && s.error)}
        />
        <button
          onClick={addTaskHandler}
          className={s.btn}>+</button>
        {error && <div className={s.errorText}>Field is required</div>}
      </div>
      <ul className={s.listTask}>
        {todoListTask}
      </ul>
      <div>
        <button
          className={s.btn + ' ' + classFilterAll}
          onClick={filterTodoListAll}>All</button>
        <button
          className={s.btn + ' ' + classFilterActive}
          onClick={filterTodoListActive}>Active</button>
        <button
          className={s.btn + ' ' + classFilterComleted}
          onClick={filterTodoListCompleted}>Completed</button>
      </div>
    </div>
  )
}

