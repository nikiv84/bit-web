import React from "react";

const SingleShow = (props) => {
    const show = props.show;
    const imageUrl = show.image.original;
    const name = show.name;
    const summary = show.summary;
    const summarySliced = summary.slice(3, summary.length - 4);
    const seasons = show._embedded.seasons;
    const cast = show._embedded.cast;

    const liSeasons = seasons.map(season => {
        return <li>Season {season.number}: {season.premiereDate} -  {season.endDate}</li>;
    });

    const liCast = cast.map(actor => {
        return <li>{actor.person.name}</li>;
    });

    return (
        <div className="container">
            <h1 className="text-center">{name}</h1>
            <div className="row">
                <div className="col-12 col-md-5">
                    <img src={imageUrl} className="bradius bshadow" alt="Poster" />
                </div>
                <div className="col-12 col-md-7 seasons">
                    <h3>Seasons ({seasons.length})</h3>
                    <ul>{liSeasons}</ul>
                    <h3>Cast</h3>
                    <ul>{liCast}</ul>
                </div>
                <div className="col-12 mt-5">
                    <h3>Show Details</h3>
                    {summarySliced}
                </div>
            </div>
        </div>
    )
}

export default SingleShow;