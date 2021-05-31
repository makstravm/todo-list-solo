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
  removeTask: (taskId: string, todoListId: string) => void
  changeTodList: (value: FilterType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  checkPropsStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  filter: FilterType
  id: string
  removeTodoList: (todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {
  const [newTitle, setNewTitle] = useState('') // локальный стейт для заполнения инпуту
  const [error, setError] = useState(false) //  лоакльный стейт для контроля ошибки в инпуте
  const todoListTask = props.tasks.map(t => {
    const removeTaskHandler = () => props.removeTask(t.id, props.id) // удаления таски
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.checkPropsStatus(t.id, e.currentTarget.checked, props.id); //  отслеживание чекбокса статуса 
    return (
      <li key={t.id} className={s.item}>
        {/* key - используем всегда в Реакт при Map */}
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
  const filterTodoListAll = () => props.changeTodList('all', props.id);
  const filterTodoListActive = () => props.changeTodList('active', props.id);
  const filterTodoListCompleted = () => props.changeTodList('completed', props.id);
  const classFilterAll = (props.filter === 'all') && s.active
  const classFilterActive = (props.filter === 'active') && s.active
  const classFilterComleted = (props.filter === 'completed') && s.active
  const addTaskHandler = () => {
    if (newTitle.trim() !== '') { //метод удаляет лишнии пробелы
      props.addTask(newTitle.trim(), props.id)
      setNewTitle('')
    } else {
      setError(true)
    }
  }
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)// отслеживание данных в инпуте
  const onPressKeyAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }
  const removeTodoList = () => { props.removeTodoList(props.id) }
  return (
    <div>
      <h3>{props.title}</h3>
      <button
        onClick={removeTodoList}
        className={s.delete}>delete</button>
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

