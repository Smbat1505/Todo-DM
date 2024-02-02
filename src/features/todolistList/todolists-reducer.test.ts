import {setTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

let startState: Array<TodolistDomainType>
beforeEach(() => {
    startState = [{
        id: v1(),
        title: '',
        addedDate: '',
        order: 0,
        filter: 'all'
    }]
})

test('todolists should be set to the state', () => {
    let action = setTodolistsAC(startState);
    let endState = todolistsReducer([], action)

    expect(endState.length).toBe(1)
})