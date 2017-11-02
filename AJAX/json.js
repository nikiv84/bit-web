
$("#btnip").on("click", function () {
    var ip = $("#ip").val();
    var output = $("#output");

    var request = $.ajax({
        url: 'http://freegeoip.net/json/' + ip,
        method: 'GET',
        dataType: 'json'
    });

    request.done(function (jsonStructure) {
        console.log(jsonStructure);
        $countryCode = jsonStructure.country_code;
        $country = jsonStructure.country_name;
        output.text("Country Name: " + $country + ", Country Code: " + $countryCode);
    });
})
