import { combineReducers } from "redux";

const tasksReducer = (state = { currentInputValue: "" }, action) => {

    switch (action.type) {
        case "TASKBAR_CURRENT_VALUE":
            return ({
                ...state,
                currentInputValue: action.payload
            })

        case "ADD_TASK":
            let { todoList = [] } = state;
            const todoTask = state.currentInputValue.trim();
            if (todoTask) {
                const newTask = {
                    id: Date.now(),
                    text: todoTask,
                    setEdited: false,
                    setCompleted: false
                }
                return ({
                    ...state,
                    todoList: [...todoList, newTask], currentInputValue: '',
                })
            }
            return state;


        case "DELETE_TASK":
            const taskId = action.payload;
            const updatedTodoList = state.todoList.filter((task) => task.id !== taskId)
            return {
                ...state,
                todoList: updatedTodoList,
            }

        case "SET_EDIT_PROPERTY":
            const { id, setEdit } = action.payload;
            const taskToBeEdited = state.todoList.filter((task) => task.id === id);
            const editedTask = {
                id: id,
                text: taskToBeEdited[0].text,
                setEdited: setEdit,
                setCompleted: false,
            }
            const updatedTodos = state.todoList.map((task) => {
                return task.id === id ? editedTask : task;
            })
            return {
                ...state,
                todoList: updatedTodos
            }

        case "EDIT_TASK":
            const { text, taskObj, setEdited } = action.payload;
            const getEditedTask = {
                id: taskObj.id,
                text: text,
                setEdited: setEdited,
                setCompleted: false
            }
            const updatedTaskList = state.todoList.map((item) => {
                return item.id === taskObj.id ? getEditedTask : item;
            })
            return {
                ...state,
                todoList: updatedTaskList
            }


        case "MARK_ALL_TASK_COMPLETED":
            const updatedList = state.todoList.map((task) => {
                task.setCompleted = true;
                return task;
            })
            return {
                ...state,
                todoList: updatedList
            }
        case "MARK_ALL_INCOMPLETED":
            const taskListUpdated = state.todoList.map((task) => {
                task.setCompleted = false;
                return task;
            })
            return {
                ...state,
                todoList: taskListUpdated
            }
        case "DELETE_ALL_TASK":
            return {
                ...state,
                todoList: []
            }
        case "SET_TASK_COMPLETED":
            const completedTaskId = action.payload;
            const taskCompleted = state.todoList.filter((task) => task.id === completedTaskId);
            const completedTask = {
                id: completedTaskId,
                text: taskCompleted[0].text,
                setCompleted: !taskCompleted[0].completed,
                setEdited: false
            }
            const updatedTasksList = state.todoList.map((task) => {
                return task.id === completedTaskId ? completedTask : task;
            })
            return {
                ...state,
                todoList: updatedTasksList
            }

        default:
            return state;
    }
};

const reducers = combineReducers({
    task: tasksReducer,
});

export default reducers;