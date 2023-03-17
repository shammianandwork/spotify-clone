import React, { Component } from "react";
import withStateValue from "./withStateValue";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";

class Footer extends Component {
  componentDidMount() {
    const { track, spotify, dispatch } = this.props;
    if (track) {
      spotify
        .play({
          uris: [`spotify:track:${track.id}`],
        })
        .then(() => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            });
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          });
        });
    }
  }

  handlePlayPause = () => {
    const { playing, spotify, dispatch } = this.props;
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  skipNext = () => {
    const { spotify, dispatch } = this.props;
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  skipPrevious = () => {
    const { spotify, dispatch } = this.props;
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  render() {
    const { item, playing } = this.props.state;

    return (
      <div className="footer">
        <div className="footer__left">
          <img
            className="footer__albumLogo"
            src={item?.album.images[0].url}
            alt={item?.name}
          />
          {item ? (
            <div className="footer__songInfo">
              <h4>{item.name}</h4>
              <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
          ) : (
            <div className="footer__songInfo">
              <h4>No song is playing</h4>
              <p>...</p>
            </div>
          )}
        </div>

        <div className="footer__center">
          <ShuffleIcon className="footer__green" />
          <SkipPreviousIcon onClick={this.skipNext} className="footer__icon" />
          {playing && (
            <PauseCircleOutlineIcon
              onClick={this.handlePlayPause}
              fontSize="large"
              className="footer__icon"
            />
          )}
          <SkipNextIcon onClick={this.skipPrevious} className="footer__icon" />

          <RepeatIcon className="footer__green" />
        </div>
        <div className="footer__right">
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDownIcon />
            </Grid>
            <Grid item xs>
              <Slider aria-labelledby="continuous-slider" />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStateValue(Footer);
