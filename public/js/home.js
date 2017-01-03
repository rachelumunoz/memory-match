console.log('home')

var lastTileClicked = [];
var lastTileClickedHTML = [];
var imageKeys = [];

var gameOver = false;

var tiles = document.querySelectorAll('.images');

function clickTile(){
  var tile = this.querySelector('img');
  var imageId = tile.dataset.image;
  var imageKey = tile.dataset.key;
  
  var overlay = this.querySelector('div');
  var that = this;
 
  //show image
  overlay.classList.add('hidden')
  if (!imageKeys.includes(imageKey)){
    //new turn, no elements clicked
    if(lastTileClicked.length === 0){
      lastTileClicked.push(imageId);
      lastTileClickedHTML.push(that);
      imageKeys.push(imageKey);
    }
    //if an image has been clicked, aka one item in the array
    else {
      //if match keep images showing
      if (lastTileClicked[0] === imageId && !imageKeys.includes(imageKey)) {
        lastTileClickedHTML = [];
        lastTileClicked = [];
        imageKeys.push(imageKey);
      }
      //not match, hide images
      else {
        lastTileClickedHTML.push(that);
        imageKeys.splice(-1,1)
        function flipBack(){
          lastTileClickedHTML.forEach((tile)=>{
            tile.querySelector('div').classList.remove('hidden');
          })
          
          lastTileClickedHTML = [];
          lastTileClicked = [];
        }
        setTimeout(flipBack, 750);
      }
    }
  }
  
  if (imageKeys.length === tiles.length){
    gameOver = true;
  }
}



tiles.forEach((tile)=>{
  tile.addEventListener('click', clickTile)
})


/*===================================================*/
$( document ).ready(function() {
  $('html, body').animate({
        scrollTop: $('#board').offset().top
    }, 'slow');

  console.log(gameOver)
  
  $('.images').click(function(){
    if (gameOver){
      $("html, body").animate({ scrollTop: 0 }, "slow");
      console.log('it is true')
      return false;
    }
  })


});

