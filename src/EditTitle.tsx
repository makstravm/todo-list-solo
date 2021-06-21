import React, { useState } from 'react';
import s from './App.module.css';

export type EditTitleType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditTitle = (props: EditTitleType) => {
  const [title, setTitle] = useState<string>(props.title)
  const [error, setError] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)

  const addTaskHandler = () => {
    if (title.trim() !== '') { //метод удаляет лишнии пробелы
      props.changeTitle(title.trim())
      setTitle('')
    } else {
      setError(true)
    }
  }
  const titleInputHandler = () => {
    setEditMode(true)
  }
  const titleInputHandlerClose = () => {
    addTaskHandler()
    setEditMode(false)
  }
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)// отслеживание данных в инпуте
  const onKeyPressAddTask = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      if (title.trim() !== '') {
        props.changeTitle(title.trim())
        setEditMode(false)
      } else {
        setError(true)
      }
    }
  }

  return editMode ?
    <input
      value={title}
      onChange={onChangeTask}
      className={s.input + ' ' + (error && s.error)}
      autoFocus onBlur={titleInputHandlerClose}
      onKeyPress={onKeyPressAddTask}
    /> :
    <span onDoubleClick={titleInputHandler}>{props.title}</span>
}