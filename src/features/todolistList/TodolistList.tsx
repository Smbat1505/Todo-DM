import React, {useCallback, useEffect} from "react"
import {ThunkAction} from "redux-thunk"
import {AppRootStateType} from "../../app/store"
import {AnyAction} from "redux"
import {useDispatch, useSelector} from "react-redux"
import {
    changeTodolistFilterAC, changeTodolistTitleTC, createTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer"
import {createTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer"
import {TaskStatuses, TaskType} from "../../api/todolists-api"
import Grid from "@mui/material/Grid"
import {AddItemForm} from "../../components/addItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import {Todolist} from "./todolist/Todolist"

export const TodolistList: React.FC<TodolistListType> = (props) => {

    type ThunkType = ThunkAction<void, AppRootStateType, unknown, AnyAction>

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    const dispatchFetchTodolists = dispatch as (thunk: ThunkType) => void

    useEffect(() => {
        const fetchTodolistsTC1 = fetchTodolistsTC()
        dispatchFetchTodolists(fetchTodolistsTC1)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(todolistId, id)
        dispatchFetchTodolists(thunk)

    }, [])

    const addTask = useCallback(function (todolistId: string, title: string) {
        const thunk = createTaskTC(todolistId, title)
        dispatchFetchTodolists(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // const action = changeTaskStatusAC(id, status, todolistId)
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatchFetchTodolists(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        // const action = changeTaskTitleAC(id, title, todolistId)
        const thunk = updateTaskTC(id, {title}, todolistId)
        dispatchFetchTodolists(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        // const action = removeTodolistAC(id)
        const thunk = removeTodolistTC(id)
        dispatchFetchTodolists(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        // const action = changeTodolistTitleAC(id, title)
        const thunk = changeTodolistTitleTC(id, title)
        dispatchFetchTodolists(thunk)
    }, [])

    const createTodolist = useCallback((title: string) => {
        // const action = createTodolistAC(title)
        const thunk = createTodolistTC(title)
        dispatchFetchTodolists(thunk)
    }, [])

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={createTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export type TasksStateType = { [key: string]: Array<TaskType> }
type TodolistListType = {}
