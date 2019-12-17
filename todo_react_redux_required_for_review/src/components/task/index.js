
import React from "react";
import { connect } from "react-redux";
import completeButtonImg from "./_ionicons_svg_md-checkmark-circle.svg";
import removeButtonImg from "./_ionicons_svg_md-trash.svg";
import editButtonImg from "./_ionicons_svg_md-create.svg";

class Task extends React.Component {

  handleInputChange = (ev, task) => {
    const editInputValue = ev.target.value;
    const setEdit = true;
    this.props.editTask(editInputValue, task, setEdit);
  }

  setEditMode = (id) => {
    const setEdit = true;
    this.props.setEditMode(id, setEdit);
  }

  saveEditedInput = (id) => {
    const setEdit = false;
    this.props.setEditMode(id, setEdit)
  }

  handeKeyPress = (event, id) => {
    if (event.which === 13)
      this.saveEditedInput(id)
  }

  getIsCompletedDisabled = () => {
    const { setCompleted, setEdited } = this.props.task;
    if (setCompleted === false && setEdited === false) return false;
    else if (setCompleted === false && setEdited === true) return true;

  }

  getIsEditedDisabled = () => {
    const { setCompleted, setEdited } = this.props.task;
    if (setEdited === false && setCompleted === false) return false;
    else if (setEdited === false && setCompleted === true) return true;
  }


  getIsRemoveDisabled = () => {
    const { setCompleted, setEdited } = this.props.task
    return setEdited || setCompleted
  }

  render() {
    const { task } = this.props;
    const { text } = task;

    return (
      <div className="card">
        {!task.setEdited && <div className="task" >
          <b className={task.setCompleted ? "taskCompleted" : ""}>
            {text}</b></div>}
        {task.setEdited && <input autoFocus value={text} className="updatedtask"
          onChange={(event) => { this.handleInputChange(event, task) }}
          onBlur={() => { this.saveEditedInput(task.id) }}
          onKeyPress={(event) => { this.handeKeyPress(event, task.id) }}
        />}

        <div className="icon" >
          <button disabled={this.getIsCompletedDisabled()} className='completd' onClick={() => this.props.setTaskCompleted(task.id)} >
            <img src={completeButtonImg} alt="complete" style={{ width: "20px", heigth: "20px" }} /></button>
          <button disabled={this.getIsRemoveDisabled()} className="removed" onClick={() => this.props.deleteTask(task.id)} >
            <img src={removeButtonImg} alt="delete" style={{ width: "20px", height: "20px" }} /></button>
          <button disabled={this.getIsEditedDisabled()} className="edited" onClick={() => this.setEditMode(task.id)}  >
            <img src={editButtonImg} alt="edit" style={{ width: "20px", heigth: "20px" }} /></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  debugger;
  return {
    taskList: state.task.todoList,
    currentInputValue: state.task.currentInputValue,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: (id) => { dispatch({ type: 'DELETE_TASK', payload: id }) },
    editTask: (text, taskObj, setEdited) => {
      dispatch({ type: 'EDIT_TASK', payload: { text, taskObj, setEdited } })
    },
    setEditMode: (id, setEdit) => {
      dispatch({ type: "SET_EDIT_PROPERTY", payload: { id, setEdit } })
    },
    setTaskCompleted: (Id) => { dispatch({ type: "SET_TASK_COMPLETED", payload: Id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
