import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput({ input }) {
    // console.log(input);
    return <input type="text" onChange={input.onChange} value={input.value} />;
  }

  render() {
    return (
      <div>
        <form action="">
          <Field name="title" component={this.renderInput} />
          <Field name="description" component={this.renderInput} />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "StreamCreate",
})(StreamCreate);
