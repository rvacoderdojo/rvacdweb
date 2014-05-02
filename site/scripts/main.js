requirejs.config({	
	// Create path aliases.
	paths: {
		'matrix' : 'matrix-rain',
	}
});


require (['matrix'],
    function(Matrix) {
    	// Check for canvas before doing anything else.
    	if (!!window.HTMLCanvasElement) {
	 		var matrixRain = new Matrix();
	 		matrixRain.setImageURL('pics/rva-coderdojo-lg.png');
	 		matrixRain.setText("WELCOME TO THE RVA CODER DOJO");
	 		matrixRain.setFontSize(10);
	 		matrixRain.setGotoURL('main.html');
	   		matrixRain.start();
   		}
   		else
   		{
   			// Add a fallback image if canvas is not supported. 
   			var fallback = document.createElement('img');
   			fallback.id='matrix-fallback';
   			fallback.src = 'pics/rva-coderdojo-nocanvas-lg.png';
   			fallback.onclick=function() { window.location='main.html' };
   			document.body.appendChild(fallback);
   		}
    }
);
