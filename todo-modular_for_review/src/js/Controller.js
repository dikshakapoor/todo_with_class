
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

//nothing to be shared by closure-- 

//difference between class, object, instance - naming convention

// where is view?

import TODO_STATES from "./todoStates";
// import uiController from "./uIController";
import { closestNode, childNode } from "./domUtils";
import { renderCard, applyEditedTask } from "./view"

let taskMap = new Map();

let initFn = function () {

  const Task = function (task) {
    this.text = task;
    this.id = Date.now();
    this.status = "";
  };

  const addNewTask = function (task) {
    let newTask = new Task(task);
    taskMap.set(newTask.id, newTask);
    return newTask;
  }

  function renderCardInitially(task) {
    let element = document.getElementById("taskListWrapper");
    return renderCard(task, element);
  }

  const createNewTask = function () {
    let task = getInput().trim();
    if (!task) return;
    let newTask = addNewTask(task);
    renderCardInitially(newTask);
    clearInputField();
  };

  const setStatus = function (itemId, taskStatus) {
    taskMap.get(itemId).status = taskStatus;
  }

  function getTypeOfEvent(event) {
    let eventType = event.target.getAttribute("data-type");
    if (
      eventType === TODO_STATES.COMPLETED ||
      eventType === TODO_STATES.EDITED ||
      eventType === TODO_STATES.REMOVED
    ) {
      const element = event.target;
      const itemId = parseInt(closestNode(element, "card").id);
      const cardElement = document.getElementById(itemId);
      switch (eventType) {

        case TODO_STATES.COMPLETED: {
          // setStatus(itemId, TODO_STATES.COMPLETED);
          const selectedElement = childNode(cardElement, "text");
          selectedElement.classList.add("checked");
          // renderItems(targetElement);
          // taskMap.get(itemId).isUpdated = false;
          break;
        }

        case TODO_STATES.REMOVED: {
          // setStatus(itemId, TODO_STATES.REMOVED);
          cardElement.remove();
          // renderItems(cardElement);
          taskMap.delete(itemId)
          break;
        }

        case TODO_STATES.EDITED: {
          // setStatus(itemId, TODO_STATES.EDITED);
          const selectedElement = childNode(cardElement, "text");
          selectedElement.classList.remove("checked")
          selectedElement.innerHTML = "";
          let element = document.createElement("input");
          selectedElement.appendChild(element);
          element.focus();
          let task = taskMap.get(itemId);
          element.value = task.text;
          element.addEventListener("keydown", handleKeyPress);
          function handleKeyPress(event) {
            if (event.keyCode !== 13 || event.which !== 13) return null;
            fetchEditedTask(selectedElement, element, task.id);
          }
          element.onblur = function () {
            fetchEditedTask(selectedElement, element, task.id);
          }
          // renderItems(targetElement);
          // taskMap.get(itemId).isUpdated = false;
          break;
        }
      }
    }
  }

  function fetchEditedTask(selectedElement, element, id) {
    let editedTaskDiscription = element.value;
    applyEditedTask(editedTaskDiscription, selectedElement)
    document.dispatchEvent(new CustomEvent("editedTaskDiscription", {
      detail: {
        descriptiion: editedTaskDiscription,
        id: id
      }
    }))
  }

  function removeAllTask() {
    document.getElementById("taskListWrapper").innerHTML = "";
  }

  function getInput() {
    return document.querySelector("#todoDiscriptionInputField").value;
  }

  function clearInputField() {
    document.getElementById("todoDiscriptionInputField").value = "";
  }


  // function renderItems(selectedElement) {

  //   taskMap.forEach(function (task) {

  //     // if (task.status === "" && (task.isUpdated === false)) {
  //     //   let element = document.getElementById("taskListWrapper");
  //     //   task.isUpdated = true;
  //     //   return renderCard(task, element);
  //     // }

  //     // if (task.isUpdated === true && task.status) {
  //     switch (task.status) {

  //       case TODO_STATES.COMPLETED: {
  //         selectedElement.classList.add("checked")
  //         break;
  //       }

  //       case TODO_STATES.EDITED: {
  //         selectedElement.classList.remove("checked")
  //         selectedElement.innerHTML = "";
  //         let element = document.createElement("input");
  //         selectedElement.appendChild(element);
  //         element.focus();
  //         element.value = task.text;
  //         element.addEventListener("keydown", handleKeyPress);
  //         function handleKeyPress(event) {
  //           if (event.keyCode !== 13 || event.which !== 13) return null;
  //           fetchEditedTask(selectedElement, element, task.id);
  //         }
  //         element.onblur = function () {
  //           fetchEditedTask(selectedElement, element, task.id);
  //         }
  //         break;
  //       }

  //       case TODO_STATES.REMOVED: {
  //         selectedElement.remove();
  //         break;
  //       }

  //       case TODO_STATES.MARK_ALL_COMPLETE: {
  //         selectedElement.classList.add("checked");
  //         break;
  //       }
  //     }
  //   }
  //   );
  // }

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      createNewTask();
    }
  }

  function markAllComplete() {
    taskMap.forEach(function (task) {
      setStatus(task.id, TODO_STATES.MARK_ALL_COMPLETE);
      const cardElement = closestNode(document.getElementById(task.id), "card");
      const targetElement = childNode(cardElement, "text");
      targetElement.classList.add("checked");
    });
  }

  function getEditedTask(event) {
    let taskObj = event.detail;
    const { descriptiion, id } = taskObj;
    taskMap.get(id).text = descriptiion;
    taskMap.get(id).status = "";
    taskMap.get(id).isUpdated = true;
  }

  function deleteAll() {
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

    document.addEventListener("editedTaskDiscription", getEditedTask);

  };

  return {
    init: function () {
      setEventListeners();
    }
  };
};

let controller = initFn();

controller.init();

export default controller;

