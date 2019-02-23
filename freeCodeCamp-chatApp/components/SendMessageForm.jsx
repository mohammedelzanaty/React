import React from "react";

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: "" });
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  render() {
    return (
      <form
        className="send-message-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <input
          placeholder="Type Message and hit ENTER"
          type="text"
          onChange={this.handleChange.bind(this)}
        />
      </form>
    );
  }
}

export default SendMessageForm;
