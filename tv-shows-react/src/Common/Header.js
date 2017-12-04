import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <a className="navbar-brand bshadow" href="index.html"><span>BIT</span> Shows</a>
                    <button className="navbar-toggler ml-auto mr-sm-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end pull-right" id="navbarSupportedContent">

                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2 bradius ml-auto bshadow" type="text" placeholder="Search" aria-label="Search" id="show-search" />
                            <ul id="live-search" className="list-group mr-sm-2"></ul>
                        </div>

                    </div>
                </nav>
            </div>

        );
    }
}

export default Header;