
const inputForm = function () {
}

inputForm.prototype.init = function (todoManager) {
    this.todoManager = todoManager;
}

inputForm.prototype.addTaskOnEnter = function (event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
        todoManager.createNewTask();
    }
}

export default inputForm;