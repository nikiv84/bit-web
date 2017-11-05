(function () {
    setupEventListeners();
    if (window.location.href.indexOf("index.html") > -1) {
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
            $("#live-search").html('');
            $("#show-search").val('');
        }
    });
    $(document).on("click", ".show-link", function () {
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
        $("h1").text(`Search results: ${$results.length}`);

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
                            <a class="show-item show-link bshadow bradius" data-show-id="` + id + `" href="#">
                            <span class="img-container">
                                <span class="show-img" style="background-image: url(` + showPoster + `)"></span>
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
                    <a class="show-item show-link bshadow bradius" data-show-id="` + id + `" href="#">
                        <span class="img-container">
                            <span class="show-img" style="background-image: url(` + showPoster + `)"></span>
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
                <div class="col-12 col-md-5">
                        <img src="` + image + `" class="bradius bshadow" alt="Poster">
                </div>`);
        var liSeasons = '';
        var seasons = jsonStructure._embedded.seasons;
        for (var i = 0; i < seasons.length; i++) {
            if (seasons[i].premiereDate == null || seasons[i].endDate == null) {
                liSeasons += `<li>Season ${i+1}: TBD</li>`;
            } else {
                liSeasons += `<li>Season ${i+1}: ` + seasons[i].premiereDate + ` - ` + seasons[i].endDate + `</li>`;
            }
        }
        var liCast = '';
        for (var i = 0; i < jsonStructure._embedded.cast.length; i++) {
            if (i == 15) {
                break;
            }
            liCast += `<li>` + jsonStructure._embedded.cast[i].person.name + `</li>`;
        }
        output.append(`
                <div class="col-12 col-md-7 seasons">
                        <h3>Seasons (` + jsonStructure._embedded.seasons.length + `)</h3>
                        <ul>` + liSeasons + `</ul>
                        <h3>Cast</h3>
                        <ul>` + liCast + `</ul>
                </div>`);
        output.append(`
    <div class="col-12 mt-5">
           <h3>Show Details</h3>
          ` + jsonStructure.summary + `
    </div>`);
    })
}
$("#show-search").on("keyup paste", function () {
    liveSearch();
})

function liveSearch() {

    var searchTerm = $("#show-search").val();
    var expression = new RegExp(searchTerm, "i");
    var request = $.ajax({
        url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm,
    });

    request.done(function (jsonStructure) {
        $("#live-search").html('');
        $.each(jsonStructure, function (i) {
            var showId = jsonStructure[i].show.id;
            $("#live-search").append(`<li><a href="#" class="show-link" data-show-id=${showId}>${jsonStructure[i].show.name}</a></li>`);
        });
    })

}