export function renderCard(task, element) {

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
}

export function renderEditedTask(editedTaskDiscription, selectedElement) {
    selectedElement.innerHTML = "";
    let editedCardHtml = '<div class = "task"><b>%editedText%</b>';
    editedCardHtml = editedCardHtml.replace("%editedText%", editedTaskDiscription);
    selectedElement.insertAdjacentHTML("afterbegin", editedCardHtml)
}