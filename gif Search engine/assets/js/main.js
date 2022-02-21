document.querySelector(".btn").addEventListener("click", function() {
	var txt = document.getElementById("stxt").value;
	var num = document.getElementById("num").value;
	if(num == "" || num == " " || num == 0) {
		num = 5;
	}
	searchGifts(txt, num);
});

document.getElementById("stxt").addEventListener("keyup", function(e){
	var txt = document.getElementById("stxt").value;
	var num = document.getElementById("num").value;
	// display when enterd
	if(e.which == 13){
		if(num == "" || num == " " || num == 0) {
			num = 5;
		}
		searchGifts(txt, num);
	}
});

function searchGifts(txt, num) {
	txt = txt.replace(/ /g, "+");

	var url = "http://api.giphy.com/v1/gifs/search?q=" + txt +"&api_key=9cS8F6lxinjeUZExB2lLBLKkSalQeyvj&limit=" + num +"";

	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load', function(e) {
		addDom(e.target.response);
	});
}

function addDom(input) {

	var response = JSON.parse(input);
	var container = document.querySelector(".js-container");
	container.innerHTML = "";
	response.data.forEach(element => {
		var imageURL = element.images.fixed_height.url;
		container.innerHTML += "<div><img src=\"" + imageURL + "\"></div>";
	});
}