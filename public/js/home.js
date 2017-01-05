var lastImageClickedIDs = [];
var activeTileHTML = [];
var tileKeysSeen = [];

var gameOver = false;

var tiles = document.querySelectorAll('.images');

function clickTile(){
  var tile = this.querySelector('img');
  var imageId = tile.dataset.image;
  var tileKey = tile.dataset.key;
  
  var overlay = this.querySelector('div');
  var that = this;
 
  //show image
  overlay.classList.add('hidden')
  
  //if tile hasn't been already matched or clicked on during the turn
  if (!tileKeysSeen.includes(tileKey)){
    //new turn, no elements clicked
    if(lastImageClickedIDs.length === 0){
      lastImageClickedIDs.push(imageId);
      activeTileHTML.push(that);
      tileKeysSeen.push(tileKey);
    }
    //if an image has been clicked, aka one item in the array
    else {
      //if match keep images showing
      if (lastImageClickedIDs[0] === imageId && !tileKeysSeen.includes(tileKey)) {
        activeTileHTML = [];
        lastImageClickedIDs = [];
        tileKeysSeen.push(tileKey);
      }
      //not match, hide images
      else {
        activeTileHTML.push(that);
        tileKeysSeen.splice(-1,1)
        function flipBack(){
          activeTileHTML.forEach((tile)=>{
            tile.querySelector('div').classList.remove('hidden');
          })
          
          activeTileHTML = [];
          lastImageClickedIDs = [];
        }
        setTimeout(flipBack, 750);
      }
    }
  }
  
  if (tileKeysSeen.length === tiles.length){
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

  $('.images').click(function(){
    if (gameOver){
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    }
  })
});

