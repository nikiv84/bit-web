(function () {
    findUsAll();
    setupEventListeners();
})();

function setupEventListeners() {
    $(document).on("keypress", function (e) {
        console.log(e);
        if (e.keyCode == 13) {
            searchForShows();
        }
    })
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
            if($results[i].show.image == null){
                showPoster= 'http://via.placeholder.com/350x550'
            } else {
                showPoster= $results[i].show.image.original;
            }
            var id = $results[i].id;
            var showName = $results[i].show.name;

            $showImg = $('<img>');
            $showImg.attr('src', showPoster);

            output.append(`
                        <div class="col-12 col-md-6 col-lg-4">
                            <a class="show-item" data-show-id="` + id + `" href="#">
                                <img src="` + showPoster + `">
                                <span>` + showName + `</span>
                            </a>
                        </div>`);

        });
    })

}

function findUsAll() {
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
            if($results[i].image==null){
                showPoster= 'http://via.placeholder.com/350x550'
            } else {
                showPoster= $results[i].image.original;
            }
            var id = $results[i].id;
            var showName = $results[i].name;

            $showImg = $('<img>');
            $showImg.attr('src', showPoster);

            output.append(`
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="show-item" data-show-id="` + id + `" href="#">
                        <img src="` + showPoster + `">
                        <span>` + showName + `</span>
                    </a>
                </div>`);
            
        } 
         

     })

}