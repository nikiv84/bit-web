import React from 'react';
import { dataService } from '../Service/DataService';
import Show from './Show';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
        this.initBind();
    }

    initBind() {
        this.loadShows = this.loadShows.bind(this);
    }

    loadShows() {
        dataService.getShows((shows) => {
            this.setState({
                shows
            })
        })
    }

    componentDidMount() {
        this.loadShows();
    }

    render() {
        const shows = this.state.shows;

        return (
            <div className="container">
                <h1 className="text-center">Popular Shows</h1>
                <div className="row">
                    {shows.map(show => {
                        return <Show id={show.id} key={show.id} name={show.name} image={show.image} />
                    })}
                </div>
            </div>
        );
    }
}

export default MainPage;