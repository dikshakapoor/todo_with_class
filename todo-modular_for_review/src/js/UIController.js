import TODO_STATES from "./TodoStates";

let uiController = (function () {

  function fetchEditedTask(selectedElement, element, id) {
    let editedTaskDiscription = element.value;
    selectedElement.innerHTML = "";
    let editedCardHtml = '<div class = "task" id = %id%><b>%editedText%</b>';
    editedCardHtml = editedCardHtml.replace("%editedText%", editedTaskDiscription);
    selectedElement.insertAdjacentHTML("afterbegin", editedCardHtml)
    document.dispatchEvent(new CustomEvent("editedTaskDiscription", {
      detail: {
        descriptiion: editedTaskDiscription,
        id: id
      }
    }))
  }

  function renderCard(task, element) {

    let html =
      '<div data-type = "card" class = "card" id = %id%><div data-type = "text" class = "task" ><b>%text%</b> </div>' +
      '<div class = "icon"><button data-type = "COMPLETED" class = "COMPLETED"><img data-type= "COMPLETED"src =' +
      '_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
      '</button><button data-type = "REMOVED" class = "REMOVED"><img data-type="REMOVED" img src = "_ionicons_svg_md-trash.svg"' +
      ' width = "20px" height = "20px"></button><button data-type = "EDITED" class = "EDITED">' +
      '<img data-type = "EDITED" src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>';

    html = html.replace("%text%", task.text);
    html = html.replace("%id%", task.id);
    element.insertAdjacentHTML("beforeend", html);
    task.updated = true;
  }

  return {
    removeAllTask: function () {
      document.getElementById("taskListWrapper").innerHTML = "";
    },

    getInput: function () {
      return document.querySelector("#todoDiscriptionInputField").value;
    },

    clearInputField: function () {
      document.getElementById("todoDiscriptionInputField").value = "";
    },

    renderItems: function (taskList, selectedElement) {

      taskList.forEach(function (task) {

        if (task.status === "" && (task.updated === false)) {
          let element = document.getElementById("taskListWrapper");
          return renderCard(task, element);
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
              element.addEventListener("keydown", handleKeyPress);
              function handleKeyPress(event) {
                if (event.keyCode !== 13 || event.which !== 13) return null;
                fetchEditedTask(selectedElement, element, task.id);
              }
              element.onblur = function () {
                fetchEditedTask(selectedElement, element, task.id);
              }
              break;
            }

            case TODO_STATES.REMOVED: {
              selectedElement.remove();
              break;
            }

            case TODO_STATES.MARK_ALL_COMPLETE: {
              selectedElement.classList.add("checked");
              break;
            }
          }
        }
      });
    }
  }
})();

export default uiController;
