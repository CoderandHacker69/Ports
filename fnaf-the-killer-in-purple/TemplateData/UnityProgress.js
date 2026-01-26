function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module)
    return;
  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.logo);
  }
  if (!gameInstance.progress) {    
    gameInstance.progress = document.createElement("div");
    gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
    gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.className = "empty";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.className = "full";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
  }
  gameInstance.progress.full.style.width = (100 * progress) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
  if (progress == 1)
    gameInstance.logo.style.display = gameInstance.progress.style.display = "none";
}

window.Game = (function() {
  var Game = function() {
    this.registerEvents();
  };

  Game.prototype.registerEvents = function() {
    var _this = this;

    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([8, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);

    document.onmousedown = function() {
      window.focus();
    };

    document.addEventListener('DOMContentLoaded', function() {
      _this.resize();
    }, false);

    window.addEventListener('resize', function() {
      setTimeout(function() {
        // Do not resize in fullscreen
        if (!_this.fullscreen()) {
          _this.resize();
        }
      }, 1000);
    }, false);
  };

  Game.prototype.getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){
        return pair[1];
      }
    }
    return(false);
  }

  Game.prototype.resize = function() {
    var template        = document.querySelector('.webgl-content');
    var canvas          = document.getElementById('gameContainer');
    //var bg              = document.getElementById('background');
    //var br              = document.getElementsByTagName('br')[0];

    var ratioTolerant   = this.getQueryVariable('ratio_tolerant');
    var gameSizeRatio   = canvas.getAttribute('width') / canvas.getAttribute('height');
    var maxHeight       = window.innerHeight - 56; // minus the footer
    var maxWidth        = window.innerWidth;
    var windowSizeRatio = maxWidth / maxHeight;
    var newStyle        = {
      width: canvas.getAttribute('width'),
      height: canvas.getAttribute('height')
    };

    if (ratioTolerant == 'true') {
      newStyle = { width: maxWidth, height: maxHeight };
    } else if (ratioTolerant == 'false') {
      if (gameSizeRatio > windowSizeRatio) {
        newStyle = { width: maxWidth, height: maxWidth / gameSizeRatio };
      } else {
        newStyle = { width: maxHeight * gameSizeRatio, height: maxHeight };
      }
    }

    /*if (br) {
      br.style.display = 'none';
    }*/

    this.updateStyle(canvas, newStyle);
    //this.updateStyle(bg, newStyle);
  };

  Game.prototype.updateStyle = function(element, size) {
    element.setAttribute('width', size.width);
    element.setAttribute('height', size.height);
    element.style.width = size.width + 'px';
    element.style.height = size.height + 'px';
  };

  Game.prototype.fullscreen = function() {
    return !window.screenTop && !window.screenY;
  };

  return Game;
})();

var game = new Game();

function updateCanvasDim() {
  game.resize();
}