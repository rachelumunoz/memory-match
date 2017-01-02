console.log('home')

var lastTileClicked = [];
var lastTileClickedHTML = [];
var tiles = document.querySelectorAll('.images');

function clickTile(){
  var that = this;
  var tile = this.querySelector('img');
  var imageId = tile.dataset.image;
  var overlay = this.querySelector('div')
 
  overlay.classList.add('hidden')

  //new turn, no elements clicked
  if(lastTileClicked.length === 0){
    lastTileClicked.push(imageId);
    lastTileClickedHTML.push(that)
    console.log(lastTileClicked)
  }
  //if an element has been clicked, aka one item in the array
  else{
    //if match keep showing image
    if (lastTileClicked[0] === imageId) {
      console.log('match')
      lastTileClickedHTML = [];
      lastTileClicked = [];
      return;
    }
    //not match, hide images
    else{
      lastTileClickedHTML.push(that)

      function flipBack(){
        // lastTileClickedHTML[0].querySelector('div').classList.remove('hidden');
        // overlay.classList.remove('hidden')
        // lastTileClicked = [];
        // lastTileClickedHTML = [];
        // overlay = "";
        lastTileClickedHTML.forEach((tile)=>{
          tile.querySelector('div').classList.remove('hidden');
        })

        lastTileClickedHTML = [];
        lastTileClicked = [];


        // console.log(lastTileClickedHTML)
      }

      // flipBack()
      setTimeout(flipBack, 850)

      
    }
    

    
    
  }
}


tiles.forEach((tile)=>{
  tile.addEventListener('click', clickTile)
})

//when clicked, show image
  //if match, keep images shown
  //else, hide images