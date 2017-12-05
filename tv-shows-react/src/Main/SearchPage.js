import React from 'react';
import { dataService } from '../Service/DataService';
import Show from './Show';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: this.props.match.params.searchTerm,
            filteredShows: null,
            allShows: null
        }
        this.initBind();
    }

    initBind() {
        this.loadShows = this.loadShows.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    loadShows() {
        dataService.getShows((shows) => {
            this.setState({
                allShows: shows
            })
        })
    }

    componentDidMount() {
        this.searchHandler(this.state.searchTerm);
    }

    componentWillReceiveProps(nextProps) {
        const searchTerm = nextProps.match.params.searchTerm;
        this.setState({
            searchTerm
        })
        this.searchHandler(searchTerm);
    }

    searchHandler(searchTerm) {
        const currentList = this.state.allShows;

        if (searchTerm === "") {
            console.log("Here, ", searchTerm);
            this.setState({ filteredShows: currentList });
            return;
        }

        dataService.searchForShows(searchTerm, (result) => {
            console.log(result);
            this.setState({
                filteredShows: result
            })
        })
    }

    render() {
        if (!this.state.filteredShows) {
            return <h1>Loading... ${this.props.match.params.searchTerm}</h1>
        }
        const shows = this.state.filteredShows;
        return (
            <div className="container">
                <h1 className="text-center">Result for: {this.state.searchTerm}</h1>
                <div className="row">
                    {shows.map(result => {
                        const { id, name, image } = result.show;
                        let poster = 'http://via.placeholder.com/350x550?text=No+poster+image';
                        if (image) {
                            poster = image.original;
                        }
                        return <Show id={id} key={id} name={name} image={poster} />
                    })}
                </div>
            </div>
        );
    }
}