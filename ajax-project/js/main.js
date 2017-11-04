(function () {
    setupEventListeners();
    if(window.location.href.indexOf("index.html") > -1) {
        popularShows();
        return;
     }

    showResult();
})();

function setupEventListeners() {
    $(document).on("keypress", function (e) {
        console.log(e);
        if (e.keyCode == 13) {
            searchForShows();
        }
    });
    $(document).on("click", "a", function () {
        var value = $(this).attr("data-show-id")
        localStorage.setItem("myShow", value);
        window.location.href = "single.html";
    });
};

function searchForShows() {
    $showSearch = $("#show-search").val();
    var output = $(".row");
    output.text("");

    var request = $.ajax({
        url: 'http://api.tvmaze.com/search/shows?q=' + $showSearch,
        method: 'GET',
        dataType: 'json'
    });

    request.done(function (jsonStructure) {

        $results = jsonStructure;
        console.log($results);

        $.each($results, function (i) {

            var showPoster;
            if ($results[i].show.image == null) {
                showPoster = 'http://via.placeholder.com/350x550?text=No+poster+image'
            } else {
                showPoster = $results[i].show.image.original;
            }
            var id = $results[i].show.id;
            var showName = $results[i].show.name;

            output.append(`
                        <div class="col-12 col-md-6 col-lg-4">
                            <a class="show-item" data-show-id="` + id + `" href="#">
                                <span class="img-container" style="background-image: url(`+ showPoster + `) ">

                                </span>
                                <span class="show-name">` + showName + `</span>
                            </a>
                        </div>`);
        });
    })
}

function popularShows() {
    var output = $(".row");
    output.text("");

    var request = $.ajax({
        url: 'http://api.tvmaze.com/shows',
        method: 'GET',
        dataType: 'json'
    });

    request.done(function (jsonStructure) {

        $results = jsonStructure;
        console.log($results);

        for (var i = 0; i < 51; i++) {

            var showPoster;
            if ($results[i].image == null) {
                showPoster = 'http://via.placeholder.com/350x550?text=No+poster+image'
            } else {
                showPoster = $results[i].image.original;
            }
            var id = $results[i].id;
            var showName = $results[i].name;

            output.append(`
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="show-item" data-show-id="` + id + `" href="#">
                        <span class="img-container" style="background-image: url(`+ showPoster + `) ">
                            
                        </span>
                        <span class="show-name">` + showName + `</span>
                    </a>
                </div>`);
        }
    })
}

function showResult() {
    var showId = localStorage.getItem("myShow");
    var output = $(".row");
    var showName = $("#show-name");

    var request = $.ajax({
        url: 'http://api.tvmaze.com/shows/' + showId,
        method: "GET",
        dataType: "json",
        data: {
            embed: ["seasons", "cast"]
        }
    });

    request.done(function (jsonStructure) {
        console.log(jsonStructure);
        output.text("");
        var name = jsonStructure.name;
        showName.text(name);
        var image;
        if (jsonStructure.image == null) {
            image = 'http://via.placeholder.com/350x550?text=No+poster+image'
        } else {
            image = jsonStructure.image.original;
        }
        output.append(`
                <div class="col-12 col-md-6">
                        <img src="` + image + `" class="bradius">
                </div>`);
        var liSeasons = '';
        var seasons = jsonStructure._embedded.seasons;
        for (var i = 0; i < seasons.length; i++) {
            if (seasons[i].premiereDate == null) {
                seasons[i].premiereDate = 'unknown';
            }
            if (seasons[i].endDate == null) {
                seasons[i].endDate = 'unknown';
            }
            liSeasons += `<li>` + seasons[i].premiereDate + ` - ` + seasons[i].endDate + `</li>`;
        }
        var liCast = '';
        for (var i = 0; i < jsonStructure._embedded.cast.length; i++) {
            if (i == 15) {
                break;
            }
            liCast += `<li>` + jsonStructure._embedded.cast[i].person.name + `</li>`;
        }
        output.append(`
                <div class="col-12 col-md-6">
                        <h3>Seasons (`+ jsonStructure._embedded.seasons.length + `)</h3>
                        <ul>` + liSeasons + `</ul>
                        <h3>Cast</h3>
                        <ul>` + liCast + `</ul>
                </div>`);
        output.append(`
    <div class="col-12 ">
           <h3>Show Details</h3>
          ` + jsonStructure.summary + `
    </div>`);
    })
}