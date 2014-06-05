requirejs.config({	
	// Create path aliases.
	paths: {
		'matrix'            : 'matrix-rain',
        'gmaps'             : 'gmaps'
	}
});


require (['gmaps', 'matrix'],
    function(GMaps, Matrix) {
    	// Check for canvas before doing anything else.
    	if (!!window.HTMLCanvasElement) {
	 		var matrixRain = new Matrix();
	 		matrixRain.setImageURL('pics/rva-coderdojo-lg.png');
	 		matrixRain.setText("WELCOME TO THE RVA CODER DOJO");
	 		matrixRain.setFontSize(10);
	   		matrixRain.start();
   		}
   		else
   		{
   			// Add a fallback image if canvas is not supported. 
   			var fallback = document.createElement('div');
            fallback.id='matrix-canvas-stack';
            var img = document.createElement('img');
            fallback.appendChild(img);
   			img.id='matrix-fallback';
   			img.src = 'pics/rva-coderdojo-nocanvas-lg.png';
   			document.body.appendChild(fallback);
   		}

        new GMaps();
    }
);
