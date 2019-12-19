
let uiController = (function () {

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

    // renderItems: function (taskList, selectedElement) {

    //   taskList.forEach(function (task) {

    //     if (task.status === "" && (task.isUpdated === false)) {
    //       let element = document.getElementById("taskListWrapper");
    //       task.isUpdated = true;
    //       return renderCard(task, element);
    //     }

    //     else if (task.isUpdated === true && task.status) {
    //       switch (task.status) {

    //         case TODO_STATES.COMPLETED: {
    //           selectedElement.classList.add("checked")
    //           break;
    //         }

    //         case TODO_STATES.EDITED: {
    //           selectedElement.classList.remove("checked")
    //           selectedElement.innerHTML = "";
    //           let element = document.createElement("input");
    //           selectedElement.appendChild(element);
    //           element.focus();
    //           element.value = task.text;
    //           element.addEventListener("keydown", handleKeyPress);
    //           function handleKeyPress(event) {
    //             if (event.keyCode !== 13 || event.which !== 13) return null;
    //             fetchEditedTask(selectedElement, element, task.id);
    //           }
    //           element.onblur = function () {
    //             fetchEditedTask(selectedElement, element, task.id);
    //           }
    //           break;
    //         }

    //         case TODO_STATES.REMOVED: {
    //           selectedElement.remove();
    //           break;
    //         }

    //         case TODO_STATES.MARK_ALL_COMPLETE: {
    //           selectedElement.classList.add("checked");
    //           break;
    //         }
    //       }
    //     }
    //   });
    // }
  }
})();

export default uiController;
