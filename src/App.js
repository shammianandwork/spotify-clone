import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./Player";
import { getTokenFromResponse } from "./spotify";
import "./App.css";
import Login from "./Login";

const s = new SpotifyWebApi();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("spotify_token") || null, // retrieve token from local storage
    };
    this.handleToken = this.handleToken.bind(this);
  }

  handleToken() {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);
      this.setState({ token: _token });

      // store token in local storage
      localStorage.setItem("spotify_token", _token);

      s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
        this.props.dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      s.getMyTopArtists().then((response) =>
        this.props.dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      this.props.dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getMe().then((user) => {
        this.props.dispatch({
          type: "SET_USER",
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
        this.props.dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }

  componentDidMount() {
    // check if token exists in local storage
    if (!this.state.token) {
      this.handleToken();
    } else {
      s.setAccessToken(this.state.token);

      this.props.dispatch({
        type: "SET_TOKEN",
        token: this.state.token,
      });

      s.getMe().then((user) => {
        this.props.dispatch({
          type: "SET_USER",
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
        this.props.dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }

  render() {
    return (
      <div className="app">
        {!this.state.token && <Login />}
        {this.state.token && <Player spotify={s} />}
      </div>
    );
  }
}

const AppWithDispatch = () => {
  const [{ token }, dispatch] = useStateValue();

  return <App token={token} dispatch={dispatch} />;
};

export default AppWithDispatch;
