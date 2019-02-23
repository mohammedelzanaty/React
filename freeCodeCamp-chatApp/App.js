import React from "react";
import ChatKit from "@pusher/chatkit";
import { tokenUrl, instanceLocator } from "./config";

import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };

    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }
  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: "mohammedelzanaty",
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => {
        console.log("Error on connection", err);
      });
  }
  /* fetch an array of the rooms that a user is able to join */
  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`);
      });
  }
  /*  To be notified when new messages are added to a room */
  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        direction: "older",
        limit: 10,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(({ id }) => {
        this.setState({ roomId: id });
        this.getRooms();
      })
      .catch(err => {
        console.log(`Error on subscribtion rooms: ${err}`);
      });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }
  render() {
    return (
      <div className="app">
        <RoomList
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom={this.subscribeToRoom}
          roomId={this.state.roomId}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage.bind(this)} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
