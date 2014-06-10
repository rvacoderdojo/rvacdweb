// A module to create matrix rain.
// Original matrix-rain code from: http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
// (refactored and enhanced by RVA Coder Dojo)
define( [],
  function() {
      function MatrixRain (containerId) {

            this.canvasStackDiv = document.createElement('div');
            this.canvasStackDiv.id='matrix-canvas-stack';
            if (containerId != null && document.getElementById(containerId) != null) {                
               this.container = document.getElementById(containerId);
               this.container.appendChild(this.canvasStackDiv);
            }
            else
               document.body.appendChild(this.canvasStackDiv);
            this.renderDelay = 50;
            this.imageURL = null;
            this.gotoURL = null;
            this.matrixText = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑';
            this.fontSize=8;
      };

      MatrixRain.prototype.setGotoURL = function(gotoURL) {
            if (gotoURL != null) {
               this.gotoURL = gotoURL;
            }
      };

      MatrixRain.prototype.setText = function (textIn) {
            if (textIn != null)
               this.matrixText = textIn;
      };

      MatrixRain.prototype.setDelay = function (delayIn) {
            if (delayIn != null && delayIn >= 0)
               this.renderDelay = delayIn;
      };

      MatrixRain.prototype.setImageURL = function (imageURL) {
            if (imageURL != undefined)
               this.imageURL = imageURL;
      };

      MatrixRain.prototype.setFontSize = function (fontSize) {
            if (fontSize != undefined && fontSize > 0)
               this.fontSize = fontSize;
      };

      MatrixRain.prototype.resize = function (width, height) {
            this.matrixCanvas.width=width;
            this.matrixCanvas.height= height;
            if (this.matrixOverlay != undefined) {
               this.matrixOverlay.width=width;
               this.matrixOverlay.height=height;
            }
      };

      MatrixRain.prototype.createCanvas = function (id, width, height) {
            var newCanvas = document.createElement('canvas');
            newCanvas.id = id;
            if (width != null)
               newCanvas.width = width;
            if (height != null)
               newCanvas.height = height;

            // sets the alignment so the layers will overlap.
            newCanvas.style.position="absolute";
            newCanvas.style.backgroundColor="transparent";

            return newCanvas;
      };

      MatrixRain.prototype.start = function() {
            this.matrixCanvas = this.createCanvas('matrix-canvas');
            this.matrixCanvas.style.zIndex=0;
            this.matrixCanvas.style.background="black";
            this.canvasStackDiv.appendChild(this.matrixCanvas);
            if (this.imageURL != null) {
                  img = new Image();
                  img.matrix = this;
                  img.onerror = function() {
                        this.matrix.startRain();
                        window.console && console.log('Could not load image: ' + this.imageURL);
                  };
                  img.onload = function() {
                       this.matrix.addOverlay(img);
                       this.matrix.startRain();
                  };
                  img.src = this.imageURL;
            }
            else {
                  this.startRain();
            }
      };

      MatrixRain.prototype.addOverlay = function(image) {
            this.matrixOverlay = this.createCanvas('matrix-overlay', image.width, image.height);
            this.matrixOverlay.style.zIndex=10;
            this.canvasStackDiv.appendChild(this.matrixOverlay);
            this.resize(image.width, image.height);
            var context = this.matrixOverlay.getContext('2d');
            context.drawImage(image, 0,0);
      };

      MatrixRain.prototype.startRain = function() {
            this.mtxCtx = this.matrixCanvas.getContext('2d');

            this.matrixText = this.matrixText.split("");

            // How many characters across the canvas
            this.columns = this.matrixCanvas.width / this.fontSize;
            this.drops = [];
            // Where to start in the matrix code 
            // This allows for readable text messages to rain down.
            this.textIndex = [];

            for (var x = 0; x < this.columns; x++) {
                  this.drops[x] = this.matrixCanvas.height + 1;
                  this.textIndex[x] = Math.floor(Math.random() * this.matrixText.length);
            }

            // this is a crappy hack to attach to the global namespace for the callback
            window.MatrixRainInstance = this;
            setInterval(this.render, this.renderDelay);
      };

      MatrixRain.prototype.render = function() {

            // Retrieves a handle from the global namespace.
            var _this = window.MatrixRainInstance;
            _this.mtxCtx.fillStyle="rgba(0,0,0,0.05)";
            _this.mtxCtx.fillRect(0, 0, _this.matrixCanvas.width, _this.matrixCanvas.height);

            _this.mtxCtx.fillStyle = "#0F0"; // green text
            _this.mtxCtx.font = _this.fontSize + "px arial";

            // Loop over the drops
            for (var i=0; i < _this.drops.length; i++) {

                  _this.textIndex[i] = (_this.textIndex[i] + 1) % _this.matrixText.length;
                  var text = _this.matrixText[_this.textIndex[i]];
                  // x = i * fontSize, y = value of drops[i]*fontSize
                  _this.mtxCtx.fillText(text, i*_this.fontSize, _this.drops[i]*_this.fontSize);

                  // reset a drop after it hits the bottom
                  if (_this.drops[i] * _this.fontSize > _this.matrixCanvas.height && Math.random() > 0.875) {
                      _this.drops[i] = 0;
                  }

                  // bump Y coordinate
                  _this.drops[i]++;
            }
      };

      return MatrixRain;
  }
);

