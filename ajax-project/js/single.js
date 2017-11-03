(function () {
    var showId = localStorage.getItem("myShow");
    var output = $(".row");
    var showName = $("#show-name");



    var request = $.ajax({
        url: 'http://api.tvmaze.com/shows/' + showId,
        method: "GET",
        dataType: "json",
        data: {
            embed: [
                "seasons",
                "cast"
            ]
        }

    });

    request.done(function (jsonMsg) {
        output.text("");
        console.log(jsonMsg)
        var name = jsonMsg.name;
        showName.text(name);
        var image;
        if (jsonMsg.image == null) {
            image = 'http://via.placeholder.com/350x550'
        } else {
            image = jsonMsg.image.original;
        }
        output.append(`
                <div class="col-12 col-md-6 col-lg-4">
                        <img src="` + image + `">
                </div>`);
                var liSeasons;
                for(var i=0;i<jsonMsg._embedded.seasons.length;i++){
                    liSeasons+=`<li>` + jsonMsg._embedded.seasons[i].premiereDate+` - `+ jsonMsg._embedded.seasons[i].endDate+ `</li>`;
                }
        output.append(`
                <div class="col-12 col-md-6">
                        <h3>Seasons (`+jsonMsg._embedded.seasons.length +`)</h3><ul>`+ liSeasons+ `</ul>
                </div>`);
        output.append(`
    <div class="col-12 ">
           <h3>Show Details</h3>
          ` + jsonMsg.summary + `
    </div>`);
    })