import React, { ChangeEvent, useState } from 'react';
import s from './App.module.css';

export type TaskType = {

}
type TodoListPropsType = {
  addNewTitle : (title: string) => void
}

export function AddItemForm(props: TodoListPropsType) {
  const [newTitle, setNewTitle] = useState('') // локальный стейт для заполнения инпуту
  const [error, setError] = useState(false) //  лоакльный стейт для контроля ошибки в инпуте

  const addTaskHandler = () => {
    if (newTitle.trim() !== '') { //метод удаляет лишнии пробелы
      props.addNewTitle(newTitle.trim())
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
  return (
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
  )
}

