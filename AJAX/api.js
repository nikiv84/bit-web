function setupEventListeners() {
    $("#btnapi").on("click", function () {
        findUsAll();
    })
    $(document).on("keypress", function (e) {
        console.log(e);
        if (e.keyCode == 13 && !e.target.type === "button") {
            findUsAll();
        }
    })
};


// function findMe() {
//     var uName = $("#uname").val();
//     var output = $("#output");

//     var request = $.ajax({
//         url: 'https://api.github.com/search/users?q=' + uName,
//         method: 'GET',
//         dataType: 'json'
//     });

//     request.done(function (jsonStructure) {
//         $avatar = jsonStructure.items[0].avatar_url;

//         $avatarImg = $('<img alt="" >');
//         $avatarImg.attr('src', $avatar);
//         $avatarImg.attr('width', "150px");

//         $login = jsonStructure.items[0].login;

//         $loginURL = jsonStructure.items[0].html_url;

//         $loginInfo = $("<a>" + $login + "</a>");
//         $loginInfo.attr("href", $loginURL);
//         $loginInfo.attr("target", "_self");

//         output.append($loginInfo);
//         output.append($avatarImg);
//     })
// }

function findUsAll() {
    var uName = $("#uname").val();
    var output = $("#output");

    var request = $.ajax({
        url: 'https://api.github.com/search/users?q=' + uName,
        method: 'GET',
        dataType: 'json'
    });

    request.done(function (jsonStructure) {
        output.text("");

        $login = jsonStructure.items;
        console.log($login);

        $.each($login, function(i){
            output.append("<strong>" + $login[i].login + "</strong><br>");
            $avatar = jsonStructure.items[i].avatar_url;
            $avatarImg = $('<img alt="" >');
            $avatarImg.attr('src', $avatar);
            $avatarImg.attr('width', "150px");
            output.append($avatarImg);
            output.append("<br>");

        });

    })
}

setupEventListeners();