import React from "react";

class RoomList extends React.Component {
  render() {
    const { rooms, subscribeToRoom, roomId } = this.props;
    const sortedRooms  = rooms.sort((a,b)=> (a.id - b.id));
    return (
      <div className="rooms-list">
        <h3>your rooms :</h3>
        <ul>
          {sortedRooms.map((room, index) => {
            const active = roomId === room.id ? "active" : "";
            return (
              <li key={index} className={"room " + active + ""}>
                <a
                  href=""
                  onClick={e => {
                    e.preventDefault();
                    subscribeToRoom(room.id);
                  }}
                >
                  # {room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
