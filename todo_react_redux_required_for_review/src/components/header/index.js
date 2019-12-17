import React from "react";
import logo from "./todo_logo.png";
import { connect } from "react-redux";
class Header extends React.Component {
    setAllCompelted = () => {

    }
    render() {
        return (
            <div className="header">
                <img className="logo" alt="logo" src={logo} style={{ width: "50px", height: "50px", radius: "2px" }} />
                <div className="nav">
                    <ul>
                        <li className="navText"><div className="deleteAll" onClick={this.props.deleteAllTask}> Delete All</div></li>
                        <li className="navText"><div className="markAllComplete" onClick={this.props.setAllCompleted}> Mark All Complete </div></li>
                        <li className="navText"><div className="markAllInComplete" onClick={this.props.unmarkComplete}> Mark All Incomplete</div></li>
                    </ul>
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setAllCompleted: () => { dispatch({ type: 'MARK_ALL_TASK_COMPLETED' }) },
        deleteAllTask: () => {
            dispatch({ type: 'DELETE_ALL_TASK' })
        },
        unmarkComplete: () => { dispatch({ type: "MARK_ALL_INCOMPLETED" }) }

    }
}
export default connect(null, mapDispatchToProps)(Header);

