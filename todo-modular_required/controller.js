
TODO_STATES = {
  COMPLETED: "COMPLETED",
  REMOVED: "REMOVED",
  EDITED: "EDITED"

}
//DONt forget to see comment in the end of this code
find, closest(include current node) // find is used to find node just above the one cicked and closest will have current node and next

find("#abc")
find(".abc")

closest(".abc")
closest("#abc")

camel case ids and classes // done -- just chcek once more

render only the change - edit, delete

  modular pattern follow properly



use m - VC - use instances - JS classes - JS OOP



let controller = (function () {

  //createNewTask--done

  let createNewTask = function () {
    let task = uiController.getInput().trim();
    if (!task) return;
    // add item to datacontroller
    let addItem = dataController.addNewTask(task);
    //add item to UIController
    uiController.renderItems(addItem);
    // clearing input field
    uiController.clearInputField();
  };

  let setEventListeners = function () {
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

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      createNewTask();
    }
  }

  function getTypeOfEvent(event) {
    let fetchEventType = event.target.parentNode.className;
    if (
      fetchEventType === TODO_STATES.COMPLETED ||
      fetchEventType === TODO_STATES.EDITED ||
      fetchEventType === TODO_STATES.REMOVED
    ) {
      itemId = parseInt(
        parseInt(event.target.parentNode.parentNode.previousSibling.id)
      );

      switch (fetchEventType) {
        case TODO_STATES.COMPLETED: {
          let taskList = dataController.setStatusCompeleted(itemId);
          uiController.renderItems(taskList);
          break;
        }
        case TODO_STATES.REMOVED: {
          let taskList = dataController.deleteTask(itemId);
          uiController.renderItems(taskList);
          break;
        }
        case TODO_STATES.EDITED: {
          let taskList = dataController.setStatusEdited(itemId);
          uiController.renderItems(taskList);
          break;
        }
      }
    }
  }

  function getEditedTask(event) {
    let taskObj = event.detail;
    const { discriptiion, id } = taskObj;
    let updatedTaskList = dataController.setEditedTask(discriptiion, id);
    uiController.renderItems(updatedTaskList);
  }

  function markAllComplete() {
    let taskList = dataController.markListCompleted();
    uiController.renderItems(taskList);
  }

  function deleteAll() {
    let taskList = dataController.deleteTodoList();
    uiController.renderItems(taskList);
  }

  return {
    init: function () {
      setEventListeners();
    }
  };
})(dataController, uiController);

controller.init();

// console.log(dataController) how does this work

///and keep the name proper in the code uiController not UIctr passing arguments can be differnt
