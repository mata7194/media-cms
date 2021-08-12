import React from 'react';
import SearchResults from "./SearchResults";
import axios from "axios";

/**
 * Class to search for a show
 * and the results are passed as props to SearchResult component
 * **/

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: "", shows: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /** Get shows for a given search query
     * @param query is the searched show
     **/

    async getShows(query) {
        await axios.get("https://api.tvmaze.com/search/shows?q=:" + query).then((response) => {
            this.setState({results: response.data});
            });
    };

    handleChange(e) {
        this.setState({query: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getShows(this.state.query);
    }

    /** Display a search field and the results
     **/

    render() {
        return (
            <div>
                <input type="text" value={this.state.query}
                       onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Search</button>
                <SearchResults results={this.state.results} />
            </div>
        )
    }
};

export default Search;
