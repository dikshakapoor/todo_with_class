
// camel case ids and classes , files, variables,

// render only the change - edit, delete 

// find, closest(include current node) 

// find("#abc")
// find(".abc")

// closest(".abc")
// closest("#abc")

// modular pattern follow properly, why to use IIFE

// use m - VC - use instances - JS classes - JS OOP


//new

//nothing to be shared by closure

//difference between class, object, instance - naming convention

// where is view?

import TODO_STATES from "./todoStates";
import { closestNode, childNode } from "./domUtils";
import { renderCard, renderEditedTask } from "./view"

let taskMap = new Map();

let controller = (function () {

  const Task = function (task) {
    this.text = task;
    this.id = Date.now();
  };

  const addNewTask = function (task) {
    let newTask = new Task(task);
    taskMap.set(newTask.id, newTask);
    return newTask;
  }

  const createNewTask = function () {
    let task = getInput().trim();
    if (!task) return;
    let newTask = addNewTask(task);
    let element = document.getElementById("taskListWrapper");
    renderCard(newTask, element);
    clearInputField();
  };

  const editTask = function (editedTaskDiscription, textElement, id) {
    taskMap.get(id).text = editedTaskDiscription;
    renderEditedTask(editedTaskDiscription, textElement);
  }

  const handleKeyPress = function (event, textElement, taskId) {
    if (event.keyCode !== 13 || event.which !== 13) return null;
    let editedTaskDiscription = event.currentTarget.value;
    editTask(editedTaskDiscription, textElement, taskId);
  }

  const getTypeOfEvent = function (event) {
    let eventType = event.target.getAttribute("data-type");
    if (
      eventType === TODO_STATES.COMPLETED ||
      eventType === TODO_STATES.EDITED ||
      eventType === TODO_STATES.REMOVED
    ) {
      const element = event.target;
      const itemId = parseInt(closestNode(element, "card").id);
      const cardElement = document.getElementById(itemId);
      const textElement = childNode(cardElement, "text");
      switch (eventType) {

        case TODO_STATES.COMPLETED: {
          textElement.classList.add("checked");
          break;
        }

        case TODO_STATES.REMOVED: {
          cardElement.remove();
          taskMap.delete(itemId)
          break;
        }

        case TODO_STATES.EDITED: {
          textElement.classList.remove("checked")
          textElement.innerHTML = "";
          let element = document.createElement("input");
          textElement.appendChild(element);
          element.focus();
          let task = taskMap.get(itemId);
          element.value = task.text;
          element.addEventListener("keydown", (event) => { handleKeyPress(event, textElement, task.id) });
          element.onblur = function () {
            let editedTaskDiscription = element.value;
            editTask(editedTaskDiscription, textElement, task.id);
          }
          break;
        }
      }
    }
  }


  const removeAllTask = function () {
    document.getElementById("taskListWrapper").innerHTML = "";
  }

  const getInput = function () {
    return document.querySelector("#todoDiscriptionInputField").value;
  }

  const clearInputField = function () {
    document.getElementById("todoDiscriptionInputField").value = "";
  }
  debugger;
  const addTaskOnEnter = function (event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      createNewTask();
    }
  }

  const markAllComplete = function () {
    taskMap.forEach(function (task) {
      const cardElement = closestNode(document.getElementById(task.id), "card");
      const targetElement = childNode(cardElement, "text");
      targetElement.classList.add("checked");
    });
  }

  const deleteAll = function () {
    taskMap.clear();
    removeAllTask();
  }

  const setEventListeners = function () {

    document
      .getElementById("addTaskButton")
      .addEventListener("click", createNewTask);

    document
      .getElementById("taskListWrapper")
      .addEventListener("click", getTypeOfEvent);

    document
      .getElementById("todoDiscriptionInputField")
      .addEventListener("keydown", addTaskOnEnter);

    document
      .getElementById("markAllComplete")
      .addEventListener("click", markAllComplete);

    document
      .getElementById("deleteAll")
      .addEventListener("click", deleteAll);

  };

  return {
    init: function () {
      setEventListeners();
    }
  };
})()


export default controller;

