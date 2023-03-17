import React from "react";
import "./Body.css";
import Header from "./Header";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top_tracks: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("spotify_token");

    this.props.spotify.setAccessToken(token);

    this.props.spotify
      .getPlaylistTracks("37i9dQZEVXbMDoHDwVN2tF", { limit: 100 })
      .then((response) => {
        this.setState(
          {
            top_tracks: response.items.map((item) => item.track),
          },
          () => {
            console.log("top_tracks are fetched", this.state.top_tracks);
          }
        );
      });
  }

  playPlaylist = () => {
    this.props.spotify
      .play({
        context_uri: "spotify:playlist:37i9dQZEVXcJZyENOWUFo7",
      })
      .then((res) => {
        this.props.spotify.getMyCurrentPlayingTrack().then((r) => {
          this.setState({
            item: r.item,
            playing: true,
          });
        });
      });
  };

  playSong = (id) => {
    this.props.spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        this.props.spotify.getMyCurrentPlayingTrack().then((r) => {
          this.setState({
            item: r.item,
            playing: true,
          });
        });
      });
  };

  render() {
    const { top_tracks } = this.state;
    console.log("top_tracks", top_tracks);

    return (
      <div className="body">
        <Header spotify={this.props.spotify} />
        <div className="body__results">
          {top_tracks.map((track) => (
            <div className="body__results__container">
              <SongRow
                key={track.id}
                track={track}
                playSong={this.playSong}
                dispatch={this.props.dispatch}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Body;
