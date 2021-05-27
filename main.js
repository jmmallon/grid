let URL = window.location.href.substring(0, location.href.lastIndexOf("/")+1) + "images/";

function makeImgByNumber(image) {
     var img = document.createElement("IMG");
     img.src = URL + image + ".jpg";
     return img;
}

function makeImgByUrl(urlArgument) {
     var img = document.createElement("IMG");
     img.src = urlArgument;
     return img;
}


// Randomize the elements of the provided array

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Dim the elements in the grid and rotate through them, brightening them one at a time

async function flashGrid(array, loops, sound, finish) {
//Prepare to play the sound effect

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', sound);
    audioElement.play();

// Randomize the order of the array elements

    newArray = shuffleArray(array);
    var arrayLength = newArray.length;
    var keep;
    for (var i = 0; i < arrayLength; i++) {
	var item = newArray[i];
	if (item.firstChild.currentSrc.indexOf(finish) > -1) {
            keep = item;
            break;
        }
    }

// Dim the elements

    newArray.forEach(dim);

// Wait 200 ms to start flashing

    await new Promise(r => setTimeout(r, 200));

// Rotate through the grid twice in the random order provided

    var lastItem;
    for (var j = 0; j < loops; j++) {
        for (var i = 0; i < arrayLength; i++) {

// Dim the element previously brightened

	    var item = newArray[i];

            if (lastItem) {
                dim(lastItem);
	    }

// Brighten the chosen element and set the previous element holder to this element

            bright(item);
            lastItem = item;

// Wait 200 ms between flashings

            await new Promise(r => setTimeout(r, 200));
        } 
    } 

    dim(lastItem);
    bright(keep);

    await new Promise(r => setTimeout(r, 700));

// Return the last element

    return keep;
}

// Hide the big image and reset the grid elements to full brightness

function resetGrid() {
	var big = document.getElementById("big");
	big.replaceChild(makeImgByUrl(""), big.firstChild);
    	big.style.zIndex = -99;

	var emptyGrid = document.getElementsByClassName("item");
	var emptyGridArray = Array.from(emptyGrid);
	emptyGridArray.forEach(bright);
} 

async function sleep(howLong) {
	await new Promise(r => setTimeout(r, howLong));
}

function bright(item) {
    item.firstChild.style.filter = "brightness(100%)";
}

function dim(item) {
    item.firstChild.style.filter = "brightness(30%)";
}
