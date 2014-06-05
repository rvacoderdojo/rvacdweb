define( [],
    function() {
        function GMaps () {
            console.log('Initializing map');
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?v=3&key=API_KEY&callback=displayGMap';
            document.body.appendChild(script);
            // attach callback to window.
            window.displayGMap = function() {
                var locationLatLong = new google.maps.LatLng(37.542878, -77.442549);
                var mapOptions = {
                    zoom: 16,
                    scrollwheel: false,
                    center: locationLatLong
                };
                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);

                var infowindow = new google.maps.InfoWindow();
                var marker = new google.maps.Marker({
                    position: locationLatLong,
                    map: map,
                    title: "RVA Coder Dojo"
                });

                var popup_info = "<b>RVA Coder Dojo @ The Richmond Public Library</b><br/>101 E Franklin St<br/> Richmond, VA<br/>"
                    + "<a href='https://www.google.com/maps/dir//Richmond+Public+Library+-+Main+Branch,+101+E+Franklin"
                    + "+St,+Richmond,+VA+23219/@37.542851,-77.4424415,17z/data=!4m12!1m3!3m2!1s0x0:0x5aa0952d990bd845!"
                    + "2sRichmond+Public+Library+-+Main+Branch!4m7!1m0!1m5!1m1!1s0x89b1113e960cb575:0x5aa0952d990bd845"
                    + "!2m2!1d-77.442323!2d37.543024'><b>Directions</b></a>";
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(popup_info);
                    infowindow.open(map, this);
                });
                infowindow.setContent(popup_info);
                infowindow.open(map, marker);
            };

        };

        return GMaps;
});

