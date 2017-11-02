
$("#btnapi").on("click", function () {
    var uName = $("#uname").val();
    var output = $("#output");

    var request = $.ajax({
        url: 'https://api.github.com/search/users?q=' + uName,
        method: 'GET',
        dataType: 'json'
    });

    request.done(function (jsonStructure) {
        console.log(jsonStructure);
        $avatar = jsonStructure.items[0].avatar_url;
        $avatarImg = $('<img alt="" >');
        $avatarImg.attr('src', $avatar);
        $avatarImg.attr('width', "150px");
        $login = jsonStructure.items[0].login;
        $loginURL = jsonStructure.items[0].html_url;
        $loginInfo = $("<a>" + $login + "</a>");
        $loginInfo.attr("href", $loginURL);
        output.append($loginInfo);
        output.append($avatarImg);
        console.log($loginURL);
    });
})
