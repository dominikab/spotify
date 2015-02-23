$(document).ready( function() {
	var id;
	var artist;
	var topTrack;

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

	getRequest(artistString);

	function getRequest(searchTerm){
    var params = {
    	query : searchTerm
    //	offset : 0;
    //	limit : 20;
    //	type : artist;
    }
    var url = 'https://api.spotify.com/v1/search';
	}
	//var apiRequest = "https://api.spotify.com/v1/search?query=" + artistString+"&offset=0&limit=20&type=artist"
	$.getJSON(url, params,
		function (data){ 
			id=data.artists.items[0].id;
			console.log(id);
	//		getTopTrack(id);
		})
})

}


// send request for the top track
getTopTrack = function (id){
	var urltop ='https://api.spotify.com/v1/artists/'+id+'/top-tracks?country=PL';
	console.log(urltop)
	$.getJSON(urltop,
		function (data){ 
			topTrack=data.tracks[0].name;
			console.log("The top track from "+artist+ " is : "+topTrack);
			showResults(topTrack)
		})
}

// show results of the top track search
showResults = function (topTrack){
	var html = '<p>'+topTrack+'</p>';
	$('.search-results').html(html);
}

$('.artist-name').submit(function(event){

	artist= $(this).find("input[name='tags']").val();
	//var artist = $('#favorite').val();
	console.log(artist)
	getArtistId(artist);
	
})


});