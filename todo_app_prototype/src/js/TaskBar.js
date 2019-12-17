
const taskBar = function () {
}

taskBar.prototype.init = function (todoManager) {
    this.todoManager = todoManager;
    document
        .getElementById("markAllComplete")
        .addEventListener("click", this.todoManager.markAllComplete.bind(todoManager));

    document
        .getElementById("deleteAll")
        .addEventListener("click", this.todoManager.deleteAll.bind(todoManager));
}

export default taskBar;