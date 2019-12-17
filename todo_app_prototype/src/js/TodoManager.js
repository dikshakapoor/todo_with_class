import todoItem from "./TodoItem";
import uiController from "./UIController";
import taskBar from "./TaskBar";
import TODO_STATES from "./TodoStates";
import inputForm from "./inputForm"


const todoTaskBar = new taskBar();
const viewController = new uiController();
const taskInputForm = new inputForm();

function todoManager() {
    this.taskMap = new Map();
}

todoManager.prototype.closestNode = function (element, dataAttribute) {
    while (element.getAttribute("data-type") !== dataAttribute) {
        element = element.parentNode;
    }
    return element;
}

todoManager.prototype.childNode = function (element, dataAttribute) {
    if (element === null) return;
    const getChildNode = element.querySelector(`[data-type = ${dataAttribute}]`);
    return getChildNode;
}

todoManager.prototype.addNewTask = function (task) {
    let newTaskObj = new todoItem(task);
    this.taskMap.set(newTaskObj.id, newTaskObj);
}

todoManager.prototype.createNewTask = function () {
    let task = viewController.getInput().trim();
    if (!task) return;
    // add item to datacontroller
    this.addNewTask(task);
    //add item to UIController
    viewController.renderItems(this.taskMap, null);
    // clearing input field
    viewController.clearInputField();
}

todoManager.prototype.getTypeOfEvent = function (event) {
    let eventType = event.target.getAttribute("data-type");
    if (
        eventType === TODO_STATES.COMPLETED ||
        eventType === TODO_STATES.EDITED ||
        eventType === TODO_STATES.REMOVED
    ) {
        const element = event.target;
        const itemId = Number(this.closestNode(element, "card").id);
        const cardElement = document.getElementById(itemId);
        switch (eventType) {

            case TODO_STATES.COMPLETED: {
                const todoTaskToBeCompleted = this.taskMap.get(itemId);
                todoTaskToBeCompleted.setStatus(TODO_STATES.COMPLETED);
                const targetElement = this.childNode(cardElement, "text");
                viewController.renderItems(this.taskMap, targetElement);
                this.taskMap.get(itemId).updated = false;
                break;
            }

            case TODO_STATES.REMOVED: {
                const todoTaskToBeRemoved = this.taskMap.get(itemId);
                todoTaskToBeRemoved.setStatus(TODO_STATES.REMOVED);
                viewController.renderItems(this.taskMap, cardElement);
                this.taskMap.delete(itemId)
                break;
            }

            case TODO_STATES.EDITED: {
                const todoTaskToBeEdited = this.taskMap.get(itemId);
                todoTaskToBeEdited.setStatus(TODO_STATES.EDITED);
                const targetElement = this.childNode(cardElement, "text");
                viewController.renderItems(this.taskMap, targetElement);
                this.taskMap.get(itemId).updated = false;
                break;
            }
        }
    }
}

todoManager.prototype.setEditedTask = function (event) {
    const { descriptiion, id } = event.detail;
    this.taskMap.get(id).text = descriptiion;
    this.taskMap.get(id).status = "";
    this.taskMap.get(id).updated = true;
}

todoManager.prototype.init = function () {
    document
        .getElementById("taskListWrapper")
        .addEventListener("click", this.getTypeOfEvent.bind(this));
    document
        .getElementById("addTaskButton")
        .addEventListener("click", this.createNewTask.bind(this));
    document
        .getElementById("todoDiscriptionInputField").addEventListener("keydown", () => {taskInputForm.addTaskOnEnter() })
    document.addEventListener("editedTaskDiscription", this.setEditedTask.bind(this));
    taskInputForm.init(this);
    todoTaskBar.init(this);
}

todoManager.prototype.resetUpdatedProperty = function () {
    this.taskMap.forEach((task) => {
        task.updated = false;
    })
}

todoManager.prototype.deleteAll = function () {
    this.taskMap.clear();
    viewController.removeAllTask();
}

todoManager.prototype.markAllComplete = function () {
    this.taskMap.forEach((task) => {
        task.status = TODO_STATES.COMPLETED;
        task.updated = true;
        const cardElement = this.closestNode(document.getElementById(task.id), "card")
        const targetElement = this.childNode(cardElement, "text");
        viewController.renderItems(this.taskMap, targetElement);
    });
    this.resetUpdatedProperty();
}

export default todoManager;

