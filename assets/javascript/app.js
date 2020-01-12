$("#submit").on("click", function (event) {

    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();
    var searchTerm = $("#searchTerm").val();
    var apiKey = "&api-key=HCJrGDdBsxZNT7iS3c766UMkkHguoUYh";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm  +  apiKey ;
    // If the user provides a startYear -- the startYear will be included in the queryURL
    if (startYear) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    };
    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (endYear) {
        queryURL = queryURL + "&end_date=" + endYear + "1231";
    };
    console.log(queryURL);
    
    // this prevents page from doing what it would normally do. In this case, it stops the page from refreshing when pressing submit //
    event.preventDefault();
    $("#articleContainer").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            console.log(response.response.docs[0].lead_paragraph);
            for (var i = 0; i < $("#numbRecords").val(); i++) {
                var a = $("<div>")
                a.addClass("article");
                a.append("<a class='articleHead' href='" + response.response.docs[i].web_url +"' target='_blank'>" + response.response.docs[i].headline.main + "</a>");
                a.append("<p class='articleBody'>" + response.response.docs[i].lead_paragraph + "</p>");

                
                $("#articleContainer").append(a);

            }
        });

});

function clear() {
    $("#articleContainer").empty();
    $("#nytForm").trigger("reset");
}

$("#clear").on("click", function() {
    event.preventDefault();
    clear();
});
