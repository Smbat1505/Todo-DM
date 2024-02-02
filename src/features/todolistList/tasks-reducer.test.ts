import {setTaskAC, tasksReducer} from "./tasks-reducer"
import {setTodolistsAC} from "./todolists-reducer"
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api"
import {TasksStateType} from "../todolistList/TodolistList"

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                description: "",
                title: "CSS",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
            {
                description: "",
                title: "HTML",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
        ],
        'todolistId2': [
            {
                description: "",
                title: "Todo",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
            {
                description: "",
                title: "TodoList",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
        ],
    }
})

test("empty array should be added when we set todolists", () => {
    let action = setTodolistsAC([
        {id: "1", title: "title 1", order: 0, addedDate: ""},
        {id: "2", title: "title 2", order: 0, addedDate: ""},
    ])
    let endState = tasksReducer({}, action)
    let keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test("tasks should be added for todolist", () => {
    let action = setTaskAC(startState['todolistId1'], 'todolistId1')
    let endState = tasksReducer(
        {
            'todolistId2': [],
            'todolistId1': [],
        },
        action
    );

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(0)
})
