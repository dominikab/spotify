$(document).ready( function() {
	var id;
	var artist;


// use artist id key to inquire for most popular song
	getArtistId = function (artist) {
		$(function (){
// take care of names consisting of more than one word
var words = artist.split(" ");
var howMany = words.length;	
//console.log(words);
var artistString = 	words[0];

if (howMany>=1){
	for (var i=1; i<howMany;i++){
		artistString+='+'+words[i];
	}}
	var apiRequest = "https://api.spotify.com/v1/search?query=" + artistString+"&offset=0&limit=20&type=artist"
	$.getJSON(apiRequest,
		function (data){ 
			id=data.artists.items[0].id;
			console.log(id);
			getTopTrack(id);
		})
})

	}


// send request for the top track
	getTopTrack = function (id){
		var url ='https://api.spotify.com/v1/artists/'+id+'/top-tracks?country=PL';
		console.log(url)
		$.getJSON(url,
			function (data){ 
				console.log("The top track from "+artist+ " is : "+data.tracks[0].name);
			})
	}



	$('.artist-name').submit(function(event){

		artist= $(this).find("input[name='tags']").val();
	//var artist = $('#favorite').val();
	console.log(artist)
	getArtistId(artist);
	
})


});