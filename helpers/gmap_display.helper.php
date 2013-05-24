<?php
/**
*
* @ package Event Espresso
* @ author Seth Shoults
* @ copyright (c) 2008-2011 Event Espresso  All Rights Reserved.
* @ licence http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
* @ link http://www.eventespresso.com
* @ version 3.3
*------------------------------------
* Espresso Gmaps API include function
*
* Provides a function to render a
* geolocated Gmap from Venue Manager address details
*
* Users can set a hardcoded url obtained from a google map or allow the venue address details
* to be used to feed to Google's V3 api.
*
* @ author  Brent Christensen, Hugo Ashmore
*/

function ee_gmap_display( $ee_gmaps_opts ){
	//printr( $ee_gmaps_opts, '$ee_gmaps_opts  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	
	$ee_map_width 				= isset( $ee_gmaps_opts['ee_map_width'] ) && ! empty( $ee_gmaps_opts['ee_map_width'] ) ? $ee_gmaps_opts['ee_map_width'] : '200';	
	$ee_map_height 				= isset( $ee_gmaps_opts['ee_map_height'] ) && ! empty( $ee_gmaps_opts['ee_map_height'] ) ? $ee_gmaps_opts['ee_map_height'] : '200';
	$ee_map_zoom 				= isset( $ee_gmaps_opts['ee_map_zoom'] ) && ! empty( $ee_gmaps_opts['ee_map_zoom'] ) ? $ee_gmaps_opts['ee_map_zoom'] : '12';
	$ee_map_nav_display 		= isset( $ee_gmaps_opts['ee_map_nav_display'] ) && ! empty( $ee_gmaps_opts['ee_map_nav_display'] )? 'true' : 'false';
	$ee_map_nav_size 			=  isset( $ee_gmaps_opts['ee_map_nav_size'] ) && ! empty( $ee_gmaps_opts['ee_map_nav_size'] )? $ee_gmaps_opts['ee_map_nav_size'] : 'default';
	$ee_map_type_control	=  isset( $ee_gmaps_opts['ee_map_type_control'] ) && ! empty( $ee_gmaps_opts['ee_map_type_control'] )? $ee_gmaps_opts['ee_map_type_control'] : 'default';
	$static_url							=  isset( $ee_gmaps_opts['ee_static_url'] ) && ! empty( $ee_gmaps_opts['ee_static_url'] )? $ee_gmaps_opts['ee_static_url'] : FALSE;

	if( isset( $ee_gmaps_opts['ee_map_align'] ) && ! empty( $ee_gmaps_opts['ee_map_align'] )){
		switch( $ee_gmaps_opts['ee_map_align'] ){
			case "left":
				$map_align = ' ee-gmap-align-left left';
				break;
			case "right":
				$map_align = ' ee-gmap-align-right right';
				break;
			case "center":
				$map_align = ' ee-gmap-align-center center';
				break;
			case "none":
			default:
				$map_align = ' ee-gmap-align-none';
		}
	} else {
		$map_align = ' ee-gmap-align-none';
	}

	// check whether event_meta enable indivudual event for maps is true
	if( isset( $ee_gmaps_opts['ee_enable_for_gmap'] ) && $ee_gmaps_opts['ee_enable_for_gmap'] ) {
		// Determine whether user has set a hardoded url to use and
		// if so display a Google static iframe map else run V3 api
		if( $static_url ) {
			
			$html = '<div class="ee-gmap-iframewrap ee-gmap-parent' . $map_align . '">';
			$html .= '<iframe src="' . $static_url . '&output=embed" style="width: ' . $ee_map_width  .'px; height: ' . $ee_map_height . 'px;" frameborder="0" scrolling="no">';
			$html .= '</iframe>';
			$html .= '<a href="' . $static_url . '">View Large map</a>';
			$html .= '</div>';
			return $html;
			
		 } else {

			wp_enqueue_script( 'gmap_api', 'http://maps.google.com/maps/api/js?sensor=false', array('jquery'), NULL, TRUE );
			wp_register_script( 'ee_gmap', plugin_dir_url(__FILE__) . 'assets/ee_gmap.js', array('gmap_api'), '1.0', TRUE );
			global $ee_gmap_vars;
			$ee_gmap_vars[ $ee_gmaps_opts['event_id'] ] = array(
				'event_id' 							=> $ee_gmaps_opts['event_id'],
				'ee_map_zoom' 				=> $ee_map_zoom,
				'ee_map_nav_display' 		=> $ee_map_nav_display,
				'ee_map_nav_size' 			=> $ee_map_nav_size,
				'ee_map_type_control' 	=> $ee_map_type_control,
				'location' 							=> $ee_gmaps_opts['location']
			);
			add_action('wp_footer', 'espresso_enqueue_ee_gmap_js', 1 );
			
			
			$html = '<div class="ee-gmap-parent'.$map_align.';">';
			$html .= '	<div class="ee-gmap" id="map_canvas_' . $ee_gmaps_opts['event_id'] .'" style="width: '.$ee_map_width.'px; height: '.$ee_map_height.'px;"></div>';
			$html .= '</div>';
			return $html;
			
		} // end auto map or static url map check
	} // end check for enable_for_maps
}


function espresso_enqueue_ee_gmap_js() { 
	wp_enqueue_script( 'ee_gmap' );
	global $ee_gmap_vars;
	wp_localize_script( 'ee_gmap', 'ee_gmap_vars', $ee_gmap_vars );
}