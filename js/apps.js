$(document).ready(function () {
    var id;
    var artist;
    var topTrack;

    // use artist id key to inquire for most popular song
    getArtistId = function (artist) {
        $(function () {
            // take care of names consisting of more than one word
            var words = artist.split(" ");
            var howMany = words.length;
            //console.log(words);
            var artistString = words[0];

            if (howMany >= 1) {
                for (var i = 1; i < howMany; i++) {
                    artistString += '+' + words[i];
                }
            }

            var apiRequest = "https://api.spotify.com/v1/search?query=" + artistString + "&offset=0&limit=20&type=artist"
            $.getJSON(apiRequest,

            function (data) {
                id = data.artists.items[0].id;
                console.log(id);
                getTopTrack(id);
            })
        })

    }


    // send request for the top track
    getTopTrack = function (id) {
        var url = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=PL';
        console.log(url)
        $.getJSON(url,

        function (data) {
            topTrack = data.tracks[0].name;
            console.log("The top track from " + artist + " is : " + topTrack);
            showResults(topTrack)
        })
    }

    // show results of the top track search
    showResults = function (topTrack) {
        var html = '<p>Top Track of '+artist+ " is : " + topTrack + '</p>';
        $('.search-results').html(html);
        getThumbnail(artist,topTrack)
    }


    // get Thumbnails of the top song from the youtube
    getThumbnail = function (artist, song){

    	  var query = {
      key: "AIzaSyCdfadHd-MS-pAihYaStxo9-g6k9EMeYb0",
      part: "snippet",
      type:'video',
      q: artist+song
    }

    $.getJSON("https://www.googleapis.com/youtube/v3/search", query, function(data) {
      var resultsArray = data.items;
      var arrayLength = resultsArray.length;
      var url='';
      var html='https://www.youtube.com/watch?v=';
    // console.log(resultsArray[0].snippet);

       
      url=html+resultsArray[0].id.videoId;
      $('.search-results').append('<a href='+url+'><img src='+resultsArray[0].snippet.thumbnails.high.url+'></a>')
      console.log(url);
               
                                                })

    }

    $('.artist-name').submit(function (event) {

        artist = $(this).find("input[name='tags']").val();
        //var artist = $('#favorite').val();
        console.log(artist)
        getArtistId(artist);

    })


});