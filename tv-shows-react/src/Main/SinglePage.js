import React from 'react';
import { dataService } from '../Service/DataService';
import Show from './Show';
import SingleShow from './SingleShow';

class SinglePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: null
        }
        this.initBind();

    }
    initBind() {
        this.loadShow = this.loadShow.bind(this);
    }

    loadShow() {
        const showId = this.props.match.params.id;
        dataService.getSingleShow(showId, (show) => {
            this.setState({
                show
            })
        })
    }

    componentDidMount() {
        this.loadShow();
    }

    render() {
        if (!this.state.show) {
            return <h1>Loading show...</h1>
        }
        const show = this.state.show;

        return (
           <SingleShow key={show.id} show={show} />
        );
    }
}

export default SinglePage;