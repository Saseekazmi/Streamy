import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError(meta) {
    return meta.touched && meta.error ? (
      <div className="ui error message">
        <div className="header">Action Forbidden</div>
      </div>
    ) : null;
  }

  renderInput = ({ input, label, id, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input type="text" {...input} id={id} />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" id="title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          id="description"
        />
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Title should be specified";
  }
  if (!formValues.description) {
    errors.description = "Description should be specified";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);
