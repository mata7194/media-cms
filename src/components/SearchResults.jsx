import React from 'react';
import axios from "axios";

/**
 * Class to display search results i.e. information about a show
 * **/

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cast: [] };
    }

    /** Get cast for a given show
     * @param showId is the id of the show
     **/

    async getCast(showId) {
        await axios.get("https://api.tvmaze.com/shows/" + showId + "/cast").then((response) => {
            this.setState({cast: response.data});
        })
    };

    /** display each show with some information about it
     **/

    render() {
        return (
            <div>
                {this.props.results && this.props.results.length > 0 &&
                this.props.results.map((result, index) => {
                    return (
                        <div key={index}>
                            <h1>{result.show.name}</h1>
                            <img src={result.show.image.medium} alt="moviePicture" width={200} height={250} />
                            <br />
                            <p dangerouslySetInnerHTML={{__html: result.show.summary}}></p>
                            {this.getCast(result.show.id)}
                            <p>Cast: {this.state.cast}</p>
                            <a href={result.show.url}>More information</a>
                        </div>
                );
                })}
            </div>
        )
    }
};

export default SearchResults;
