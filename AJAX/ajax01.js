
$("#btnip").on("click", function () {
    var ip = $("#ip").val();
    var output = $("#output");

    var request = $.ajax({
        url: 'http://freegeoip.net/xml/' + ip,
        method: 'GET',
        dataType: 'xml'
    });

    request.done(function (xmlStructure) {
        console.log(xmlStructure);
        $countryCode = $(xmlStructure).find("CountryCode").text();
        $country = $(xmlStructure).find("CountryName").text();
        output.text("Country Name: " + $country + ", Country Code: " + $countryCode);
    });
})
