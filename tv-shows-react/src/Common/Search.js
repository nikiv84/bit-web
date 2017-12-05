import React from "react";
import { redirectService } from "../Service/RedirectService";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        }
        this.initBind();
    }

    initBind() {
        this.changeHandler = this.changeHandler.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    changeHandler(e) {
        const searchTerm = e.target.value;
        this.setState({ searchTerm });
        console.log(e.target.value);
    }

    handleKeyPress(e) {

        if (e.key === 'Enter') {
            if (this.state.searchTerm === "") {
                console.log("here");
                redirectService.redirectTo('/main');
                return;
            }
            redirectService.redirectTo(`/search/${this.state.searchTerm}`);
        }
    }
    render() {
        return (
            <div className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2 bradius ml-auto bshadow" type="text" placeholder="Search" aria-label="Search" id="show-search" onChange={this.changeHandler} value={this.state.searchTerm} onKeyPress={this.handleKeyPress} />
                <ul id="live-search" className="list-group mr-sm-2"></ul>
            </div>
        )
    }
}