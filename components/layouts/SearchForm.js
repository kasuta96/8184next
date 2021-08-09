import { SearchIcon } from "@heroicons/react/outline"
import Router from "next/router"
import React from "react"

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    Router.push({
      pathname: "/a",
      query: {
        kw: this.state.value
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex items-center rounded-full bg-gray-100 p-1">
          <input
            className="w-24 md:w-48 items-center ml-2 bg-transparent outline-none"
            type="text"
            name="kw"
            placeholder="Search"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button className="px-2" type="submit">
            <SearchIcon className="h-5 text-gray-600" />
          </button>
        </div>
      </form>
    );
  }
}
export default SearchForm;