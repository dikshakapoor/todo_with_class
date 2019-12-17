let uiController = (function () {
  let TODO_STATES = {
    COMPLETED: "COMPLETED",
    REMOVED: "REMOVED",
    EDITED: "EDITED",
    MARK_ALL_COMPLETE: "MARK_ALL_COMPLETE",
    DELETE_ALL: "DELETE_ALL",
  };

  function fetchEditedTask(selectedElement, element, id) {
    let editedTaskDiscription = element.value;
    selectedElement.innerHTML = "";
    let editedCardHtml = '<div class = "task" id = %id%><b>%editedText%</b>';
    editedCardHtml = editedCardHtml.replace("%editedText%", editedTaskDiscription);
    selectedElement.insertAdjacentHTML("afterbegin", editedCardHtml)
    document.dispatchEvent(new CustomEvent("editedTaskDetail", {
      detail: {
        discriptiion: editedTaskDiscription,
        id: id
      }
    }))
  }

  function renderCard(task, element) {

    let html =
      '<div data-type = "card" class = "card" id = %id%><div data-type = "text" class = "task" id = %taskid%><b>%text%</b> </div>' +
      '<div class = "icon"><button data-type = "COMPLETED" class = "COMPLETED"><img data-type= "COMPLETED"src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
      '</button><button data-type = "REMOVED" class = "REMOVED"><img data-type="REMOVED" img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button data-type = "EDITED" class = "EDITED">' +
      '<img data-type = "EDITED" src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>';

    html = html.replace("%text%", task.text);
    html = html.replace("%id%", task.id);
    html = html.replace("%taskid", task.id);
    element.insertAdjacentHTML("beforeend", html);
    task.updated = true;  //setting task has been updated
  }

  return {
    getInput: function () {
      return document.querySelector("#inputfield").value;
    },

    clearInputField: function () {
      document.getElementById("inputfield").value = "";
    },

    renderItems: function (taskList, selectedElement) {

      taskList.forEach(function (task) {

        if (task.status === "" && (task.updated === false)) {
          let element = document.getElementById("taskListWrapper");
          renderCard(task, element);
        }
        else if (task.updated === true && task.status) {

          switch (task.status) {

            case TODO_STATES.COMPLETED: {
              selectedElement.classList.add("checked")
              task.updated = false;
              break;
            }

            case TODO_STATES.EDITED: {
              selectedElement.classList.remove("checked")
              selectedElement.innerHTML = "";
              let element = document.createElement("input");
              selectedElement.appendChild(element);
              element.focus();
              element.value = task.text;
              element.addEventListener("keypress", handleKeyPress);
              function handleKeyPress(event) {
                if (event.keyCode !== 13 || event.which !== 13) return null;
                fetchEditedTask(selectedElement, element, task.id);
              }
              element.onblur = function () {
                fetchEditedTask(selectedElement, element, task.id);
              }
              task.updated = false;
              break;
            }

            case TODO_STATES.REMOVED: {
              selectedElement.remove();
              task.updated = false;
              break;
            }

            case TODO_STATES.MARK_ALL_COMPLETE: {
              selectedElement.classList.add("checked");
              task.updated = false;
              break;
            }

            case TODO_STATES.DELETE_ALL: {
              selectedElement.remove();
              task.update = false;
              break;
            }
          }

        }
      });

      return taskList;

    }
  }
})();


