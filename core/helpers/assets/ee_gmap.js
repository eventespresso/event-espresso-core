function ee_gmap_callback() {
    let geocoder;
    let ee_gmap;
    const $ = jQuery;

    $('.ee-gmap').each(function () {
        const map_width = $(this).outerWidth();
        const map_height = $(this).outerHeight();
        const ratio = map_height / map_width;

        let new_width = $(this).parent().innerWidth();
        let new_height;

        if (new_width < map_width) {
            new_height = new_width * ratio;
        } else {
            new_width = map_width;
            new_height = map_height;
        }

        $(this).css({'width': new_width, 'height': new_height});
    });

    for (let map_ID in ee_gmap_vars) {
        if (ee_gmap_vars.hasOwnProperty(map_ID)) {

            const gvars = ee_gmap_vars[map_ID];

            window.ee_gmap = {

                initialize: function (ee_gmap, geocoder) {

                    geocoder = new google.maps.Geocoder();

                    const myOptions = {
                        zoom: parseInt(gvars.ee_map_zoom),
                        navigationControl: gvars.ee_map_nav_display,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    if (gvars.ee_map_nav_size === 'small') {
                        myOptions.navigationControlOptions = {style: google.maps.NavigationControlStyle.SMALL};
                    }

                    if (gvars.ee_map_type_control !== 'default') {
                        myOptions.mapTypeControl = true;
                    }

                    if (gvars.ee_map_type_control === 'dropdown') {
                        myOptions.mapTypeControlOptions = {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU};
                    } else {
                        myOptions.mapTypeControlOptions = {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR};
                    }

                    const map_canvas = 'map_canvas_' + gvars.map_ID;
                    ee_gmap = new google.maps.Map(document.getElementById(map_canvas), myOptions);

                    window.ee_gmap.showAddress(ee_gmap, geocoder);
                },

                showAddress: function (ee_gmap, geocoder) {
                    geocoder.geocode({'address': gvars.location}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            ee_gmap.setCenter(results[0].geometry.location);
                            new google.maps.Marker({
                                map: ee_gmap,
                                position: results[0].geometry.location
                            });
                        } else {
                            console.log('Google Map geocode was not successful for the following reason: ' + status);
                        }
                    });
                }
            };

            window.ee_gmap.initialize(ee_gmap, geocoder);
        }
    }
}
