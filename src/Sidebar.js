import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { getTokenFromResponse } from "./spotify";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }

  componentDidMount() {
    // Fetch playlists data from the spotify API and store it in the component's state
    const { accessToken } = this.props;
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          playlists: data.items,
        });
      })
      .catch((error) => console.log(error));
  }
  handleLogout = () => {
    localStorage.removeItem("spotify_token");
    window.location.reload();
  };

  render() {
    return (
      <div className="sidebar">
        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        <SidebarOption Icon={HomeIcon} option="Home" />
        <SidebarOption Icon={SearchIcon} option="Search" />
        <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
        <br />
        <strong className="sidebar__title">PLAYLISTS</strong>
        <hr />
        {this.state.playlists?.map((playlist) => (
          <SidebarOption option={playlist.name} key={playlist.id} />
        ))}
        <button
          className="logout-button"
          onClick={this.handleLogout}
          style={{
            backgroundColor: "#1db954",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "99px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    );
  }
}

export default Sidebar;
