import React, { ChangeEvent, useState } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterType } from './App';
import s from './App.module.css';
import { EditTitle } from './EditTitle';

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
  changeEditTitleTodoList: (title: string, todoListId: string) => void
  changeEditTitleTask: (title: string, taskId: string, todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {
  const todoListTask = props.tasks.map(t => {
    const removeTaskHandler = () => props.removeTask(t.id, props.id) // удаления таски
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.checkPropsStatus(t.id, e.currentTarget.checked, props.id); //  отслеживание чекбокса статуса 
    const changeEditTitleTaskHandler = (title: string) => props.changeEditTitleTask(title, t.id, props.id)
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
        <span className={s.title + ' ' + (t.isDone && s.isDone)}>
          <EditTitle title={t.title} changeTitle={changeEditTitleTaskHandler} />
        </span>
        <button className={s.btn + ' ' + s.btnItem} onClick={removeTaskHandler}>x</button>
      </li>
    )
  })
  const addNewTitle = (title: string) => props.addTask(title, props.id)
  const filterTodoListAll = () => props.changeTodList('all', props.id);
  const filterTodoListActive = () => props.changeTodList('active', props.id);
  const filterTodoListCompleted = () => props.changeTodList('completed', props.id);
  const classFilterAll = (props.filter === 'all') && s.active
  const classFilterActive = (props.filter === 'active') && s.active
  const classFilterComleted = (props.filter === 'completed') && s.active
  const removeTodoList = () => { props.removeTodoList(props.id) }
  const changeEditTitleTodolisHandler = (title: string) => props.changeEditTitleTodoList(title, props.id)
  return (
    <div>
      <h3>
        <EditTitle title={props.title} changeTitle={changeEditTitleTodolisHandler} />
      </h3>
      <button
        onClick={removeTodoList}
        className={s.delete}>delete</button>
      <div>
        <AddItemForm addNewTitle={addNewTitle} />
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
    </div>
  )
}

