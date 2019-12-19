
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
import uiController from "./uIController";
import { closestNode, childNode } from "./domUtils";

let taskMap = new Map();

let initFn = function () {

  const Task = function (task) {
    this.text = task;
    this.id = Date.now();
    this.status = "";
    this.updated = false;
  };

  const addNewTask = function (task) {
    let newTask = new Task(task);
    taskMap.set(newTask.id, newTask);
  }

  const createNewTask = function () {
    let task = uiController.getInput().trim();
    if (!task) return;
    // add item to datacontroller
    addNewTask(task);
    //add item to UIController
    uiController.renderItems(taskMap);
    // clearing input field
    uiController.clearInputField();
  };

  const setStatus = function (itemId, taskStatus) {
    taskMap.get(itemId).status = taskStatus;
    taskMap.get(itemId).updated = true;

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
          setStatus(itemId, TODO_STATES.COMPLETED);
          const targetElement = childNode(cardElement, "text");
          uiController.renderItems(taskMap, targetElement);
          taskMap.get(itemId).updated = false;
          break;
        }

        case TODO_STATES.REMOVED: {
          setStatus(itemId, TODO_STATES.REMOVED)
          uiController.renderItems(taskMap, cardElement);
          taskMap.delete(itemId)
          break;
        }

        case TODO_STATES.EDITED: {
          setStatus(itemId, TODO_STATES.EDITED);
          const targetElement = childNode(cardElement, "text");
          uiController.renderItems(taskMap, targetElement);
          taskMap.get(itemId).updated = false;
          break;
        }
      }
    }
  }

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
      uiController.renderItems(taskMap, targetElement);
      taskMap.get(task.id).updated = false;
    });
  }

  function getEditedTask(event) {
    let taskObj = event.detail;
    const { descriptiion, id } = taskObj;
    taskMap.get(id).text = descriptiion;
    taskMap.get(id).status = "";
    taskMap.get(id).updated = true;
  }

  function deleteAll() {
    taskMap.clear();
    uiController.removeAllTask();
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

