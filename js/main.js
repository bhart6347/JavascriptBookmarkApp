// creating a listener that listens for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Saves bookmark
function saveBookmark(e){
	//Get form values
	var siteName = document.getElementById('siteName').value;
	console.log(siteName);

	var siteUrl = document.getElementById('siteUrl').value;
	console.log(siteUrl);

	if(!validateForm(siteName, siteUrl)){
		return false;
	}



	//Creating an object that store the data locally

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	console.log(bookmark);

	//Local storage onlys stores strings. It is part of the HTML5 standard. We are going to parse the JSON into a string, save it, then when we get parse it back to JSON when we need it back
	/*localStorage.setItem('test', 'Hello world');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/


	//test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		//Adds to array
		bookmarks.push(bookmark);
		//set to LocalStorage. Using JSON's stringify function to convert our JSON array to store it in local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else{
		//Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push(bookmark);
		//Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}



		//clear form
		document.getElementById('myForm').reset();
	fetchBookmarks();


	// Prevent form from submitting

	 e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
	//Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//Remove from array
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	//re-fetch bookmarks
	fetchBookmarks();
}

//Fetch bookmarks
		function fetchBookmarks(){
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

			//Get output id
			var bookmarksResults = document.getElementById('bookmarksResults');

			//Build output
			bookmarksResults.innerHTML = ' ';

			for(var i = 0; i < bookmarks.length; i++){
				var name = bookmarks[i].name;
				var url = bookmarks[i].url;

				bookmarksResults.innerHTML += '<div class="well">' + '<h3>' + name + 
				'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
				'<a onclick = "deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>' +
				'</h3>' + '</div>';

			}
		}

		function validateForm(siteName, siteUrl){
			if(!siteName || !siteUrl){
				alert('Please fill in the form properly');
				return false;
			}

			var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			var regex = new RegExp(expression);

			if(!siteUrl.match(regex)){
			alert('Please use a valid URL');
			return false;
			}
			return true;
		}