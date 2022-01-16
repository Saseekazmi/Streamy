import React from "react";
import ReactDom from "react-dom";

const Modal = (props) => {
  return ReactDom.createPortal(
    <div onClick={props.onDismiss} className="ui modals dimmer visible active ">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">
          <p>{props.description}</p>
        </div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
