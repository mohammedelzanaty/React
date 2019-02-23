import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.souldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shoudScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }
  render() {
    const { messages } = this.props;
    return (
      <div className="message-list">
        {messages.map(message => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    );
  }
}

export default MessageList;
