import React from "react";
import "./SidebarOption.css";

class SidebarOption extends React.Component {
  render() {
    const { option = "test", Icon } = this.props;
    return (
      <div className="sidebarOption">
        {Icon && <Icon className="sidebarOption__icon" />}
        {Icon ? <h4>{option}</h4> : <p>{option}</p>}
      </div>
    );
  }
}

export default SidebarOption;
