import React from "react";
import "./SongRow.css";

class SongRow extends React.Component {
  render() {
    const { track, playSong } = this.props;
    // console.log(track);

    return (
      <div
        className="songRow"
        onClick={() =>
          this.props.dispatch({
            type: "PLAY_SONG",
            item: track,
          })
        }
      >
        <img
          className="songRow__album"
          src={track.album.images[0].url}
          alt=""
        />
        <div className="songRow__info">
          <h1>{track.name}</h1>
          <p>
            {track.artists.map((artist) => artist.name).join(", ")} -{" "}
            {track.album.name}
          </p>
        </div>
      </div>
    );
  }
}

export default SongRow;
