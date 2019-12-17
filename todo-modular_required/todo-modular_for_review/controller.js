

// console.log(dataController) how does this work
// find, closest(include current node) // find is used to find node just above the one cicked and closest will have current node and next

// find("#abc")
// find(".abc")

// closest(".abc")
// closest("#abc")

// camel case ids and classes // done -- just chcek once more

// render only the change - edit, delete --done

//   modular pattern follow properly


// use m - VC - use instances - JS classes - JS OOP



let controller = (function () {

  const TaskObject = function (task) {
    this.text = task;
    this.id = Date.now();
    this.status = "";
    this.updated = false;
  };

  let taskMap = new Map();

  const TODO_STATES = {
    COMPLETED: "COMPLETED",
    REMOVED: "REMOVED",
    EDITED: "EDITED",
    MARK_ALL_COMPLETE: "MARK_ALL_COMPLETE",
    DELETE_ALL: "DELETE_ALL",
  };
  const nearestNode = function (id) {
    let element = document.getElementById(id);
    let numberOfChildNodes = element.childNodes.length;
    let counter = 0;

    while (counter < numberOfChildNodes) {
      if (element.childNodes[counter].getAttribute("data-type") === "card") {
        element = element.childNodes[counter];
        break;
      }
      counter++;
    }

    numberOfChildNodes = element.childNodes.length;
    counter = 0;
    let requiredChildNode = "";
    while (counter < numberOfChildNodes) {
      if (element.childNodes[counter].getAttribute("data-type") === "text") {
        requiredChildNode = element.childNodes[counter];
        break;
      }
      counter++;
    }

    return {
      targetNode: element,
      childNode: requiredChildNode
    };
  }
  // const nodeAbove = function (id) {
  //   let element = nearestNode(id);
  //   const parentNode = element.targetNode.parentNode;
  //   return parentNode;
  // }
  const findingTargetNode = function (dataAttribute, targetNode) {
    let numberOfChildNodes = targetNode.childNodes.length;
    let counter = 0;

    while (counter < numberOfChildNodes) {
      if (targetNode.childNodes[counter].getAttribute("data-type") === dataAttribute) {
        targetNode = targetNode.childNodes[counter];
        break;
      }
      counter++;
    }
    return targetNode;
  }

  const closest = function (event) { //finding the node 
    let targetNode = event.target;
    let getTargetNode = "";
    while (targetNode.getAttribute("data-type") !== "card") {
      targetNode = targetNode.parentNode;
      getTargetNode = findingTargetNode("card", targetNode)
    }
    const getChildNode = findingTargetNode("text", targetNode)
    return {
      targetNode: getTargetNode,
      childNode: getChildNode
    };
  }

  // const find = function (event) {
  //   const closestNodes = closest(event);
  //   const parentNode = closestNodes.targetNode.parentNode;
  //   return parentNode;

  // };

  const addNewTask = function (task) {
    let newTask = new TaskObject(task);
    taskMap.set(newTask.id, newTask);
    return taskMap;
  }

  const createNewTask = function () {
    let task = uiController.getInput().trim();
    if (!task) return;
    // add item to datacontroller
    let addItem = addNewTask(task);
    //add item to UIController
    uiController.renderItems(addItem);
    // clearing input field
    uiController.clearInputField();
  };

  const setStatusCompeleted = function (itemId) {
    taskMap.get(itemId).status = TODO_STATES.COMPLETED;
    taskMap.get(itemId).updated = true;
    return taskMap;
  }

  const setStatusEdited = function (itemId) {
    taskMap.get(itemId).status = TODO_STATES.EDITED;
    taskMap.get(itemId).updated = true;
    return taskMap;
  }

  function getTypeOfEvent(event) {
    let fetchEventType = event.target.getAttribute("data-type");
    if (
      fetchEventType === TODO_STATES.COMPLETED ||
      fetchEventType === TODO_STATES.EDITED ||
      fetchEventType === TODO_STATES.REMOVED
    ) {
      const itemId = parseInt(closest(event).targetNode.id);
      switch (fetchEventType) {

        case TODO_STATES.COMPLETED: {
          let taskList = setStatusCompeleted(itemId);
          const requiredElement = closest(event).childNode;
          uiController.renderItems(taskList, requiredElement);
          break;
        }

        case TODO_STATES.REMOVED: {
          taskMap.get(itemId).status = TODO_STATES.REMOVED;
          taskMap.get(itemId).updated = true;
          const requiredElement = closest(event).targetNode;
          uiController.renderItems(taskMap, requiredElement);
          taskMap.delete(itemId);
          break;
        }

        case TODO_STATES.EDITED: {
          let taskList = setStatusEdited(itemId);
          const requiredElement = closest(event).childNode;
          uiController.renderItems(taskList, requiredElement);
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
      task.status = TODO_STATES.MARK_ALL_COMPLETE;
      task.updated = true;
      debugger;
      let requiredElement = nearestNode(task.id).childNode;
      uiController.renderItems(taskMap, requiredElement);
    });
  }

  function getEditedTask(event) {
    let taskObj = event.detail;
    const { discriptiion, id } = taskObj;
    taskMap.get(id).text = discriptiion;
    taskMap.get(id).status = "";
    taskMap.get(id).updated = true;
  }

  function deleteAll() {
    taskMap.forEach(function (task) {
      task.status = TODO_STATES.DELETE_ALL;
      task.updated = true;
      let requiredElement = nearestNode(task.id).targetNode;
      uiController.renderItems(taskMap, requiredElement);
    });
    taskMap.clear();
  }

  const setEventListeners = function () {
    document
      .getElementById("addTaskButton")
      .addEventListener("click", createNewTask);
    document
      .getElementById("taskListWrapper")
      .addEventListener("click", getTypeOfEvent);
    document
      .getElementById("inputfield")
      .addEventListener("keypress", addTaskOnEnter);
    document
      .getElementById("markAllComplete")
      .addEventListener("click", markAllComplete);
    document
      .getElementById("deleteAll")
      .addEventListener("click", deleteAll);
    document.addEventListener("editedTaskDetail", getEditedTask);
  };

  return {
    init: function () {
      setEventListeners();
    }
  };
})(uiController);

controller.init();



