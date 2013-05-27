jQuery(document).ready( function( $ ) { 

	var geocoder;
	var eegmap;

	for ( var event_id in ee_gmap_vars ) {
		if ( ee_gmap_vars.hasOwnProperty( event_id )) {
			
			var func_name = 'ee_gmap_' + event_id;
			var gvars = ee_gmap_vars[ event_id ];

			window.func_name = {

				initialize : function( eegmap, geocoder ) {
					
					geocoder = new google.maps.Geocoder();
					
					var myOptions = {
						zoom: parseInt( gvars.ee_map_zoom ),
						navigationControl: gvars.ee_map_nav_display,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					
					if ( gvars.ee_map_nav_size == 'small' ) { 
						myOptions.navigationControlOptions = { style: google.maps.NavigationControlStyle.SMALL };
					}
					
					if ( gvars.ee_map_type_control != 'default' ) { 
						myOptions.mapTypeControl = true;
					}
						
					if ( gvars.ee_map_type_control == 'dropdown' ) {
						myOptions.mapTypeControlOptions = { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU };
					} else {
						myOptions.mapTypeControlOptions = { style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR };
					}

					//console.log( myOptions );
					
					var map_canvas = 'map_canvas_' + gvars.event_id;
					eegmap = new google.maps.Map( document.getElementById( map_canvas ), myOptions );
					
					window.func_name.showAddress( eegmap, geocoder ); 
				},

				showAddress : function( eegmap, geocoder ) {
					geocoder.geocode({ 'address': gvars.location }, function( results, status) {
						//console.log( JSON.stringify( results, null, 4 ));
						if ( status == google.maps.GeocoderStatus.OK ) {
							eegmap.setCenter( results[0].geometry.location );
							var marker = new google.maps.Marker({
								map: eegmap,
								position: results[0].geometry.location
							});
						} else {
							console.log( 'Google Map geocode was not successful for the following reason: ' + status );
						}
					});
				}
				
			};

			window.func_name.initialize( eegmap, geocoder ); 

		}
	}
	
});