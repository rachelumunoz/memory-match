Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
    return this;
}

Array.prototype.doubleThem = function(){
  var that = this;
  this.map(function(item) {
    var doubledItem = item
    that.push(doubledItem)
  })
 return this;
}

