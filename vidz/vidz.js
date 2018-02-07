// Search bar handler
$(function() {
    var searchField = $('#query');
    var icon = $('#search-btn');

    // Focus event handler
    $(searchField).on('focus', function() {
        $(this).animate({
            width:'100%'
        },400);
        $(icon).animate({
            right:'10px'
        }, 400);
    });

    // Blur event handler
    $(searchField).on('blur', function() {
        if(searchField.val() == '') {
            $(searchField).animate({
                width:'45%' ,
                height:'55%'
            }, 400, function(){});
            $(icon).animate({
                right:'360px'
            },400, function(){});
        }
    });

    $('#search-form').submit(function(e) {
        e.preventDefault();
    });
})

function search() {
    // Clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get form input
    q = $('#query').val();

    // Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            videoType: 'any',
            key: 'AIzaSyBlL4ThognKhTwbrH3CXc6yQzFJ8ffJe5w'},
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                // Log data
                console.log(data);

                $.each(data.items, function(i, item){
                    // Get output
                    var output = getOutput(item);

                    // Display results
                    $('#results').append(output);
                });

                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display buttons
                $('#buttons').append(buttons);
            }
    );
}

// Next page function
function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

    // Clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get form input
    q = $('#query').val();

    // Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            videoType: 'any',
            key: 'AIzaSyBlL4ThognKhTwbrH3CXc6yQzFJ8ffJe5w'},
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                // Log data
                console.log(data);

                $.each(data.items, function(i, item){
                    // Get output
                    var output = getOutput(item);

                    // Display results
                    $('#results').append(output);
                });

                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display buttons
                $('#buttons').append(buttons);
            }
    );
}

// Previous page function
function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');

    // Clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get form input
    q = $('#query').val();

    // Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            videoType: 'any',
            key: 'AIzaSyBlL4ThognKhTwbrH3CXc6yQzFJ8ffJe5w'},
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                // Log data
                console.log(data);

                $.each(data.items, function(i, item){
                    // Get output
                    var output = getOutput(item);

                    // Display results
                    $('#results').append(output);
                });

                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display buttons
                $('#buttons').append(buttons);
            }
    );
}

// Build output
function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build output string
    var output = '<li>' +
    '<div class="list-left">' +
    '<img src="'+thumb+'">' +
    '</div>' +
    '<div class="list-left">' +
    '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
    '<small> By <span class="channelTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
    '<p>'+description+'</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';

    return output;
}

// Build buttons
function getButtons(prevPageToken, nextPageToken){
    if(!prevPageToken){
        var btnoutput = '<div class="button-container">'+
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>'
    } else {
        var btnoutput = '<div class="button-container">'+
        '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
        'onclick="prevPage();">Previous Page</button>' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>'
    }
    return btnoutput;
}