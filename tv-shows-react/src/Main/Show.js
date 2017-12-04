import React from "react";
import { Link } from "react-router-dom";
const Show = (props) => {
    const imageUrl = props.image;
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <Link to={`/show/${props.id}`} className="show-item show-link bshadow bradius" data-show-id={props.id}>
                <span className="img-container">
                    <span className="show-img" style={{ "backgroundImage": "url(" + imageUrl + ")" }}></span>
                </span>
                <span className="show-name">{props.name}</span>
            </Link>
        </div>
    )
}

export default Show;