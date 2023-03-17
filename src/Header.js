import React, { Component } from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import withStateValue from "./withStateValue";
import SongRow from "./SongRow";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      offset: 0,
      limit: 5,
      total: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  handleNextPage() {
    const { offset, limit, total } = this.state;
    if (offset + limit < total) {
      this.setState({ offset: offset + limit }, () => {
        this.search();
      });
    }
  }

  handlePrevPage() {
    const { offset, limit } = this.state;
    if (offset - limit >= 0) {
      this.setState({ offset: offset - limit }, () => {
        this.search();
      });
    }
  }

  search() {
    const { spotify } = this.props;
    const { query, offset, limit } = this.state;

    if (query.trim() === "") {
      this.setState({ results: [], total: 0 });
      return;
    }

    spotify
      .search(query, ["artist", "track"], { limit, offset })
      .then((response) => {
        const { items, total } = response.tracks;
        this.setState({ results: items, total });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { user } = this.props.state;
    const { query, results, offset, limit, total } = this.state;

    const totalPages = Math.ceil(total / limit);

    return (
      <>
        <div className="header">
          <div className="header__left">
            <SearchIcon />
            <input
              placeholder="Search for Artists, Songs, or Podcasts"
              type="text"
              value={query}
              onChange={this.handleInputChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
          </div>
          <div className="header__right">
            <Avatar alt={user?.display_name} src={user?.images[0].url} />
            <h4>{user?.display_name}</h4>
          </div>
        </div>
        <div className="header__results">
          {results.map((track) => (
            <SongRow
              key={track.id}
              track={track}
              playSong={this.props.playSong}
              dispatch={this.props.dispatch}
            />
          ))}
        </div>
        {results.length > 0 && (
          <div className="header__pagination">
            <button
              className="pagination-button"
              disabled={offset === 0}
              onClick={this.handlePrevPage}
            >
              Previous
            </button>
            <button
              className="pagination-button"
              disabled={offset + limit >= total}
              onClick={this.handleNextPage}
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  }
}

export default withStateValue(Header);
