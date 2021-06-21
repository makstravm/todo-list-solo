import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TaskType, TodoList } from './TodoLIst';
import s from './App.module.css';

export type FilterType = 'all' | 'active' | 'completed' // типизация для фильтрации сострогими значениями
type TodoListType = {
  id: string
  title: string
  filter: FilterType
}
type TasksType = {
  [key: string]: Array<TaskType>
}
function App() {
  const todoListIdOne = v1();
  const todoListIdTwo = v1();
  const todoListIdThree = v1();

  const [todoList, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListIdOne, title: 'Beer varieties', filter: 'all' },
    { id: todoListIdTwo, title: 'Models cars', filter: 'all' },
    { id: todoListIdThree, title: 'Models phone', filter: 'all' }
  ])

  const [tasks, setTasks] = useState<TasksType>({
    [todoListIdOne]: [
      { id: v1(), title: 'Cabinet', isDone: true },
      { id: v1(), title: 'Golden Ale', isDone: false },
      { id: v1(), title: 'Silver Ale', isDone: false },
      { id: v1(), title: 'Zhiguli', isDone: true },
      { id: v1(), title: 'Mykulinckoe', isDone: true }
    ],
    [todoListIdTwo]: [
      { id: v1(), title: 'BMW', isDone: false },
      { id: v1(), title: 'MayBach', isDone: true },
      { id: v1(), title: 'Lada', isDone: false },
      { id: v1(), title: 'Range Rover', isDone: true },
      { id: v1(), title: 'Nissan', isDone: false }
    ],
    [todoListIdThree]: [
      { id: v1(), title: 'Nokia', isDone: true },
      { id: v1(), title: 'Sony', isDone: false },
      { id: v1(), title: 'Samsung', isDone: true },
      { id: v1(), title: 'Xiaomi', isDone: true },
      { id: v1(), title: 'Apple', isDone: false }
    ]
  })

  const addNewTodoList = (title: string) => {
    const newTodoListId = v1()
    const newTodoList: TodoListType = {
      id: newTodoListId,
      title,
      filter: 'all'
    }
    setTodoList([...todoList, newTodoList])
    setTasks({
      ...tasks,
      [newTodoListId]: []
    })

  }

  function removeTodoList(todoListId: string) {
    const deleteTodoList = todoList.filter(td => td.id !== todoListId)
    setTodoList([...deleteTodoList])
    delete tasks[todoListId]
    setTasks({ ...tasks })
  }

  const changeEditTitleTodoList = (title: string, todolistId: string) => {
    setTodoList(todoList.map(tl => tl.id === todolistId ? { ...tl, title } : tl));
  }
  const changeEditTitleTask = (title: string, taskId: string, todolistId: string) => {
    const findTask = tasks[todolistId]
    const newTask = findTask.find(t => t.id === taskId)
    if (newTask) {
      newTask.title = title
      setTasks({ ...tasks })
    }
  }



  function removeTask(taskId: string, todoListId: string) {
    const task = tasks[todoListId]
    const newTask = task.filter(t => t.id !== taskId)
    tasks[todoListId] = newTask
    setTasks({ ...tasks })
  }

  function changeTodList(value: FilterType, todoListId: string) {
    const todoListFilter = todoList
      .find(td => td.id === todoListId)
    if (todoListFilter) {
      todoListFilter.filter = value
      setTodoList([...todoList])
    }
  }

  function addTask(title: string, todoListId: string) {
    const newTask = {
      id: v1(),
      title,
      isDone: false
    }
    const task = tasks[todoListId]
    tasks[todoListId] = [newTask, ...task]
    setTasks({ ...tasks })
  }

  function checkStatus(taskId: string, isDone: boolean, todoListId: string) {
    const task = tasks[todoListId]
    let checkTask = task.find(t => t.id === taskId)
    if (checkTask) {
      checkTask.isDone = isDone
      setTasks({ ...tasks })
    }
  }

  function filterTasks(tf: TodoListType) {
    if (tf.filter === 'active') {
      return tasks[tf.id].filter(t => t.isDone === false)
    }
    else if (tf.filter === 'completed') {
      return tasks[tf.id].filter(t => t.isDone === true)
    }
    else {
      return tasks[tf.id]
    }
  }

  const todoListRender = todoList.map(ts => {
    return <TodoList
      key={ts.id}
      id={ts.id}
      title={ts.title}
      tasks={filterTasks(ts)}
      removeTask={removeTask}
      changeTodList={changeTodList}
      addTask={addTask}
      checkPropsStatus={checkStatus}
      filter={ts.filter}
      removeTodoList={removeTodoList}
      changeEditTitleTask={changeEditTitleTask}
      changeEditTitleTodoList={changeEditTitleTodoList}
    />
  })
  return (
    <div className="App">
      <div className={s.block}> <AddItemForm addNewTitle={addNewTodoList} />
      </div>

      {todoListRender}
    </div>
  );
}

export default App;
