const todoItem = function (text) {
    this.text = text;
    this.id = Date.now();
    this.status = "";
    this.updated = false;
}
todoItem.prototype.setStatus = function (taskStatus) {
    this.status = taskStatus;
    this.updated = true;
}

export default todoItem;