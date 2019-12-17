let uiController = (function () {

  return {
    getInput: function () {
      return document.querySelector("#inputfield").value;
    },

    clearInputField: function () {
      document.getElementById("inputfield").value = "";
    },

    renderItems: function (taskList) {

      let element = document.getElementById("taskListWrapper");
      element.innerHTML = "";

      taskList.forEach(function (task) {
        let html =
          '<div class = "card"><div class = "task" id = %id%><b>%text%</b>' +
          '</div><div class = "icon"><button class = "COMPLETED"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
          '</button><button class = "REMOVED"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "EDITED">' +
          '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>';

        html = html.replace("%text%", task.text);
        html = html.replace("%id%", task.id);
        element.insertAdjacentHTML("beforeend", html);
        let selectedElement = document.getElementById(task.id);

        switch (task.status) {

          case "edited":
            selectedElement.innerHTML = "";
            let element = document.createElement("input");
            selectedElement.appendChild(element);
            element.focus();
            element.value = task.text;
            element.addEventListener("keypress", handleKeyPress);
            function handleKeyPress(event) {
              if (event.keyCode !== 13 || event.which !== 13) return null;
              fetchEditedTask(element, task.id);
            }
            element.onblur = function () {
              fetchEditedTask(element, task.id);
            }
            break;

          case "completed":
            selectedElement.classList.add("checked");
            break;
        }
      });

      fetchEditedTask = (element, id) => {
        editedTaskDescription = element.value;
        document.dispatchEvent(new CustomEvent("editedTaskDetail", {
          detail: {
            discriptiion: element.value,
            id: id
          }
        }))
      }
      return taskList;
    }
  }
})();


