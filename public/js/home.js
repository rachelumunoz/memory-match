let game = {
  settings: { // settings for the game to be played
    board: document.getElementById('board'),
    tiles: document.querySelectorAll('.images'),
    activeTileHTML:[],
    tile: '',
    imageId: '',
    tileKey: '',
    overlay: '',
    lastTileClicked: { tileKey: "", imageId: ""},
    tileKeysSeen: new Set(),
    gameOver: false,
    that: ''
  },
  
  init: function(){
    s = this.settings;
    this.bindUIActions();
  },

  bindUIActions: function(){
    s.that = this; // preserve this context of game
    s.tiles.forEach( tile => { // add event listener to each tile
      tile.addEventListener('click', this.onClick)
    });
  },

  onClick: function(){
    s.tile = this; 
    s.imageId = s.tile.querySelector('img').dataset.image; 
    s.tileKey = s.tile.querySelector('img').dataset.key; 
    s.overlay = s.tile.querySelector('.overlay'); 
    s.tileHTML = s.tile;

    if (s.activeTileHTML.length < 2){
      s.overlay.classList.add('hidden') // show image
    } 
    
    if (!s.tileKeysSeen.has(s.tileKey)){ // check to see if particular tile has been seen yet
      if (s.that.firstImage()){ // call helper function to check if the start of a new guess
        s.activeTileHTML.push(s.tileHTML);
        s.lastTileClicked = {tileKey: s.tileKey, imageId: s.imageId};
      } else {
        if (s.lastTileClicked.imageId === s.imageId && !s.tileKeysSeen.has(s.tileKey)) { // a match 
          s.tileKeysSeen.add(s.tileKey); // add tile to Set
          s.that.resetContainers();
        }else { // not a match
          s.activeTileHTML.push(s.tileHTML);
          setTimeout(s.that.flipTilesBack, 750); // flip tiles back around
        }
      }
    }

    if (s.tileKeysSeen.size === (s.tiles.length / 2)){ // check if all tiles have been guessed correctly
      s.gameOver = true;
    }
  },

  firstImage: function(){
    return s.lastTileClicked.imageId === "" && s.lastTileClicked.tileKey === ""
  },
  
  resetContainers: function(){
    s.activeTileHTML = [];
    s.lastTileClicked = {tileKey: "", imageId: ""};
  },
  
  flipTilesBack: function(){
    s.activeTileHTML.forEach((tile)=>{
      tile.querySelector('div').classList.remove('hidden');
    })
    s.activeTileHTML = [];
    s.lastTileClicked = {tileKey: "", imageId: ""}; 
  }
}

game.init()

/*-==-=-=-=-=-=-=-=-=---=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
$( document ).ready(()=> {
  $('html, body').animate({
        scrollTop: $('#board').offset().top
    }, 'slow');

  $('.images').click(()=> {
    if (gameOver){
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    }
  })
});