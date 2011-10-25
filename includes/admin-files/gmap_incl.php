<?php
/**
* Provides a function to render a 
* geolocated Gmap from Venue Manager address details
*
* Users can set a hardcoded url obtained from a google map or allow the venue address details 
* to be used to feed to Google's V3 api.
*
* Event location detail need to be passed through to the function as well org_options
* Author: Hugo Ashmore
*/

function ee_gmap_display($location, $event_id){
	// A common options aray for maps, $org_options added to this array in each page to make unique set
	global $ee_gmaps_opts ; 
		if ( isset($ee_gmaps_opts['ee_map_width']) && !empty($ee_gmaps_opts['ee_map_width']) ){
		   $ee_map_width = $ee_gmaps_opts['ee_map_width'];
		} else {
		   $ee_map_width = '200';
		}
		if ( isset($ee_gmaps_opts['ee_map_height']) && !empty($ee_gmaps_opts['ee_map_height'])  ){
		   $ee_map_height = $ee_gmaps_opts['ee_map_height'];
		} else {
		   $ee_map_height = '200';
		}
	 if ( isset($ee_gmaps_opts['ee_map_zoom']) && !empty($ee_gmaps_opts['ee_map_zoom']) ){
		$ee_map_zoom = $ee_gmaps_opts['ee_map_zoom']; 
	 } else{
		$ee_map_zoom = '12';
	 } 
	 if( isset($ee_gmaps_opts['ee_map_nav_display']) && $ee_gmaps_opts['ee_map_nav_display'] == 'Y' ){
		   $ee_map_nav_display = true;
		}else{
		   $ee_map_nav_display = false;
		}
	 if( isset($ee_gmaps_opts['ee_map_nav_size']) && $ee_gmaps_opts['ee_map_nav_size'] == 'Y' ){
		   $ee_map_nav_size = 'small';
		}else {
		   $ee_map_nav_size = 'default';
		}	
	 if( isset($ee_gmaps_opts['ee_map_type_control']) && !empty( $ee_gmaps_opts['ee_map_type_control']) ){
		   $ee_map_type_control = $ee_gmaps_opts['ee_map_type_control'];
		}else{
		   $ee_map_type_control = 'default';
		}
		if( isset($ee_gmaps_opts['ee_static_url']) && !empty($ee_gmaps_opts['ee_static_url']) ) {
		$static_url = $ee_gmaps_opts['ee_static_url'];
		}
	 if(isset($ee_gmaps_opts['ee_map_align']) && !empty( $ee_gmaps_opts['ee_map_align']) ){
		$ee_map_align = $ee_gmaps_opts['ee_map_align'];
		 switch($ee_map_align){
			 case "left":
			 $map_align = 'float: left;';
			 break;
			 case "right":
			 $map_align = 'float: right;';
				case "center":
			 $map_align = 'margin: 0 auto;';
			 break;
			 case "none":
			 $map_align = '';
			 default:
			 $map_align = '';
		 }
	}
	$event_location = $location; // 'London';
	$event_id = $event_id;
	//var_dump($location);
 	//echo $event_id;
	//echo $ee_map_height;
	//var_dump($ee_gmaps_opts);
	
	// Determine whether user has set a hardoded url to use and 
	// if so display a Google static iframe map else run V3 api
 if( isset($static_url) && !empty($static_url) ) {
	
	$html = '<div class="ee-gmap-iframewrap event-map-parent" style="position: relative; ' . $map_align . ' width: ' . $ee_map_width  .'px; height: ' . $ee_map_height . 'px;">';
	$html .= '<iframe src="' . $static_url . '&output=embed" style="width: ' . $ee_map_width  .'px; height: ' . $ee_map_height . 'px;" frameborder="0" scrolling="no">';
	$html .= '</iframe>';
	$html .= '<a href="' . $static_url . '">View Large map</a>';
	$html .= '</div>';
	
	return $html;

 }else {
	
	$html = '';
	$html .= '<div class="event-map-parent">';
  
	$html .= '<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script> ';
	$html .= '<script type="text/javascript">';
      
	$html .= 'var geocoder;';
	$html .= 'var map_' . $event_id. ';';
	$html .= 'function initialize_' . $event_id .'() {';
	$html .= 'geocoder = new google.maps.Geocoder();';
		$html .= 'var latlng = new google.maps.LatLng(-34.397, 150.644);';
		$html .= 'var myOptions = {';
		$html .= 'zoom: '. $ee_map_zoom .',';
		$html .= 'center: latlng,';
		if ( true == $ee_map_nav_display  ) {
			$html .= 'navigationControl: true,';
       	} else {
			$html .= 'navigationControl: false,';
		}
		if ('small' == $ee_map_nav_size){
			$html .= 'navigationControlOptions: {';
       			$html .= 'style: google.maps.NavigationControlStyle.SMALL';
			$html .= '},';
		}
		if ('default' !== $ee_map_type_control){
			$html .= 'mapTypeControl: true,';
			$html .= 'mapTypeControlOptions: {';
				if ('dropdown' == $ee_map_type_control){
					$html .= 'style: google.maps.MapTypeControlStyle.DROPDOWN_MENU';
				}else{
					$html .= 'style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR';
				}
			$html .= '},';
		}
		$html .= 'mapTypeId: google.maps.MapTypeId.ROADMAP,};';
		$html .= 'map_' . $event_id . '= new google.maps.Map(document.getElementById("map_canvas_' . $event_id .'"), myOptions);';
		$html .= 'return false;';
	$html .= '}; ';     
	$html .= 'function showAddress_' . $event_id .'(address) {';
    	$html .= 'geocoder.geocode( { \'address\': address}, function(results, status) {';
      	$html .= 'if (status == google.maps.GeocoderStatus.OK) {';
        	$html .= 'map_' . $event_id .'.setCenter(results[0].geometry.location);';
			$html .= 'var marker = new google.maps.Marker({';
			$html .= ' map: map_' . $event_id .', ';
			$html .= 'position: results[0].geometry.location';
        $html .= '});';
      $html .= '} else {';
        $html .= 'alert("Geocode was not successful for the following reason: " + status);';
      $html .= '}';
    $html .= '});';
				$html .= 'return false;';
  $html .= '}';      

   $html .= 'jQuery(document).ready( function() { initialize_' . $event_id .'(); showAddress_' . $event_id .'(\''.$event_location. '\'); } );';

 
  $html .= '</script>';
  $html .= '<div class="ee-gmaps" id="map_canvas_' . $event_id .'" style="'.$map_align.'width: '.$ee_map_width.'px; height: '.$ee_map_height.'px;"></div>';
$html .= '</div>';

	return $html;
	}
}
