import React from "react";
import { connect } from "react-redux";
import Task from "../task";

class TaskList extends React.Component {

  render() {
    const { todoList = [] } = this.props;

    return (
      <div className="taskList_wrapper">
        {todoList.map(task => {
          return <Task key={task.id} task={task} />
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ todoList: state.task.todoList })
}

export default connect(mapStateToProps)(TaskList);
