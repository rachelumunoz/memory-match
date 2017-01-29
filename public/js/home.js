let game = {
  
  settings: {
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
    this.bindUIActions()
  },

  bindUIActions: function(){
    s.that = this
    s.tiles.forEach((tile)=>{
      tile.addEventListener('click', this.onClick)
    })
  },

  onClick: function(){
    s.tile = this; 
    s.imageId = s.tile.querySelector('img').dataset.image; 
    s.tileKey = s.tile.querySelector('img').dataset.key; 
    s.overlay = s.tile.querySelector('.overlay'); 
    s.tileHTML = s.tile; //possible repetition

    if (s.activeTileHTML.length < 2){
      s.overlay.classList.add('hidden')
    } 
    
    if (!s.tileKeysSeen.has(s.tileKey)){
      if (s.that.firstImage()){
        s.activeTileHTML.push(s.tileHTML);
        s.lastTileClicked = {tileKey: s.tileKey, imageId: s.imageId};
      }else {
        if (s.lastTileClicked.imageId === s.imageId && !s.tileKeysSeen.has(s.tileKey)) { // a match 
          s.tileKeysSeen.add(s.tileKey);
          s.that.resetContainers()
        }else { // not a match
          s.activeTileHTML.push(s.tileHTML);
          setTimeout(s.that.flipTilesBack, 750);
        }
      }
    }

    if (s.tileKeysSeen.size === (s.tiles.length / 2)){
      s.gameOver = true;
    }
  },

  firstImage: function(){
    return s.lastTileClicked.imageId === "" && s.lastTileClicked.tileKey === ""
  },
  resetContainers: function(){
    console.log('rest')
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