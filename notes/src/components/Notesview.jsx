import React, { Component } from "react";
import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
const SortableItem = SortableElement(({ value }) => (
  <Link to={`/notes/${value.id}`}>
    <NoteCard title={value.title} body={value.body} id={value.id} />
  </Link>
));
const SortableList = SortableContainer(({ items }) => {
  return (
    <div className="cardBox">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class Notesview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchMode: "title",
      paginationStart: 0
    };
  }
  changePage = direction => {
    let newPaginationStart;
    if (direction === "forward") {
      if (
        (this.state.paginationStart + 9) / 9 >=
        Math.ceil(this.state.items.length / 9)
      ) {
        return;
      }
      newPaginationStart = this.state.paginationStart + 9;
    } else {
      if (this.state.paginationStart / 9 <= 0) {
        return;
      }
      newPaginationStart = this.state.paginationStart - 9;
    }

    this.setState({
      paginationStart: newPaginationStart
    });
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.changeStateOrder(
      arrayMove(this.state.items, oldIndex, newIndex)
    );
  };
  componentDidMount() {
    this.setState({
      items: this.props.notes
    });
  }
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props !== prevProps) {
      this.setState({
        items: this.props.notes
      });
    }
  }
  changeSort = e => {
    let noteMod = [...this.state.items];
    switch (e.target.value) {
      case "normal":
        this.setState({
          items: this.props.notes
        });
        break;
      case "AZ":
        noteMod.sort(function(a, b) {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        });
        this.setState({
          items: noteMod
        });
        break;
      case "ZA":
        noteMod.sort(function(b, a) {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        });
        this.setState({
          items: noteMod
        });
        break;
      case "timenew":
        noteMod.sort(function(b, a) {
          return a.id.toString().localeCompare(b.id.toString());
        });
        this.setState({
          items: noteMod
        });
        break;
      case "timeold":
        noteMod.sort(function(a, b) {
          return a.id.toString().localeCompare(b.id.toString());
        });
        this.setState({
          items: noteMod
        });
        break;
      default:
        break;
    }
  };
  changeSearch = e => {
    this.setState({ searchMode: e.target.value });
  };
  handleInputChange = event => {
    let filtArray;
    switch (this.state.searchMode) {
      case "title":
        filtArray = this.props.notes.filter(e => {
          if (e.title.includes(event.target.value)) {
            return e;
          } else {
            return false;
          }
        });
        break;
      case "body":
        filtArray = this.props.notes.filter(e => {
          if (e.body.includes(event.target.value)) {
            return e;
          } else {
            return false;
          }
        });
        break;
      case "tags":
        filtArray = this.props.notes.filter(e => {
          let found = false;
          if (!e.tags) {
            return false;
          }
          e.tags.forEach(element => {
            if (element.includes(event.target.value)) {
              found = true;
              return true;
            } else {
              return false;
            }
          });
          if (found) {
            return e;
          } else {
            return false;
          }
        });
        break;
      case "all":
        filtArray = this.props.notes.filter(e => {
          let found = false;
          if (e.tags) {
            e.tags.forEach(element => {
              if (element.includes(event.target.value)) {
                found = true;
                return;
              }
            });
          }

          if (found) {
            return e;
          } else {
            if (
              e.body.includes(event.target.value) ||
              e.title.includes(event.target.value)
            ) {
              return e;
            } else {
              return false;
            }
          }
        });
        break;
      default:
        break;
    }

    this.setState({ items: filtArray });
  };
  render() {
    return (
      <div className="notesViewContainer">
        <div className="titleRow">
          <div className="viewTitle">Your Notes:</div>
          <select onChange={this.changeSort}>
            <option value="normal">Default</option>
            <option value="AZ">Alphabetical</option>
            <option value="ZA">Reverse Alphabetical</option>
            <option value="timenew">Newest First</option>
            <option value="timeold">Oldest First</option>
          </select>
          <div className="searchContainer">
            <input
              className=" lowerSelect notesubmit"
              name="search"
              placeholder="Search"
              onChange={this.handleInputChange}
              type="text"
            />
            <select className="" onChange={this.changeSearch}>
              <option value="title">Title</option>
              <option value="body">Body</option>
              <option value="tags">Tags</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        {this.state.items.length ? (
          <SortableList
            distance={1}
            axis="xy"
            items={this.state.items.slice(
              this.state.paginationStart,
              this.state.paginationStart + 9
            )}
            onSortEnd={this.onSortEnd}
          />
        ) : (
          "No notes to display!"
        )}
        <div className="pageButtons">
          <div
            className="pageChangeButton"
            onClick={() => this.changePage("back")}
          >
            ←
          </div>
          <div className="pageCounter">
            {(this.state.paginationStart + 9) / 9}/
            {this.state.items.length / 9 === 0
              ? 1
              : Math.ceil(this.state.items.length / 9)}{" "}
          </div>
          <div
            className="pageChangeButton"
            onClick={() => this.changePage("forward")}
          >
            →
          </div>
        </div>
      </div>
    );
  }
}

export default Notesview;
