
import TODO_STATES from "./TodoStates";

const uiController = function () {
}

uiController.prototype.fetchEditedTask = function (selectedElement, element, id) {
  let editedTaskDiscription = element.value;
  selectedElement.innerHTML = "";
  let editedCardHtml = '<div class = "task"><b>%editedText%</b>';
  editedCardHtml = editedCardHtml.replace("%editedText%", editedTaskDiscription);
  selectedElement.insertAdjacentHTML("afterbegin", editedCardHtml)
  document.dispatchEvent(new CustomEvent("editedTaskDiscription", {
    detail: {
      descriptiion: editedTaskDiscription,
      id: id
    }
  }))
}

uiController.prototype.renderCard = function (task, element) {
  let html =
    '<div data-type = "card" class = "card" id = %id%><div data-type = "text" class = "task" ><b>%text%</b> </div>' +
    '<div class = "icon"><button data-type = "COMPLETED" class = "COMPLETED"><img data-type= ' +
    '"COMPLETED"src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
    '</button><button data-type = "REMOVED" class = "REMOVED"><img data-type="REMOVED" img src = "_ionicons_svg_md-trash.svg"' +
    'width = "20px" height = "20px"></button><button data-type = "EDITED" class = "EDITED">' +
    '<img data-type = "EDITED" src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>';

  html = html.replace("%text%", task.text);
  html = html.replace("%id%", task.id);
  element.insertAdjacentHTML("beforeend", html);
  task.updated = true;
}


uiController.prototype.removeAllTask = function () {
  document.getElementById("taskListWrapper").innerHTML = "";
}

uiController.prototype.getInput = function () {
  return document.getElementById("todoDiscriptionInputField").value;
}

uiController.prototype.clearInputField = function () {
  document.getElementById("todoDiscriptionInputField").value = "";
}

uiController.prototype.handleKeyPress = function (event, selectedElement, element, taskId) {
  if (event.keyCode !== 13 || event.which !== 13) return null;
  this.fetchEditedTask(selectedElement, element, taskId);
}

uiController.prototype.renderItems = function (taskList, selectedElement) {

  taskList.forEach((task) => {

    if (task.status === "" && (task.updated === false)) {
      let element = document.getElementById("taskListWrapper");
      return this.renderCard(task, element);
    }
    else if (task.updated === true && task.status) {

      switch (task.status) {

        case TODO_STATES.COMPLETED: {
          selectedElement.classList.add("checked")
          break;
        }

        case TODO_STATES.EDITED: {
          selectedElement.classList.remove("checked")
          selectedElement.innerHTML = "";
          let element = document.createElement("input");
          selectedElement.appendChild(element);
          element.focus();
          element.value = task.text;
          const taskId = task.id;
          element.addEventListener("keydown", () => this.handleKeyPress(event, selectedElement, element, taskId));
          element.onblur = () => {
            this.fetchEditedTask(selectedElement, element, task.id);
          }
          break;
        }

        case TODO_STATES.REMOVED: {
          selectedElement.remove();
          break;
        }
      }
    }
  })
};

export default uiController;


