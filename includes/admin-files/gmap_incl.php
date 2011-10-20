<?php
/**
* Provides a function to render a 
* geolocated Gmap from event address details
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
	
	ob_start();
?>

<div class="event-map-parent">
  
  <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script> 
  <script type="text/javascript">
      
  var geocoder;
  var map<?php echo '_' . $event_id ?>;
  function initialize<?php echo '_' . $event_id ?>() {
    geocoder = new google.maps.Geocoder();
       var latlng = new google.maps.LatLng(-34.397, 150.644);
       var myOptions = {
       zoom: <?php echo $ee_map_zoom; ?>,
       center: latlng,
       <?php if ( true == $ee_map_nav_display  ) {?>
       navigationControl: true,
       <?php   } else { ?>
       navigationControl: false,
       <?php  } ?>
       <?php if ('small' == $ee_map_nav_size): ?>
       navigationControlOptions: {
       style: google.maps.NavigationControlStyle.SMALL
       },
       <?php endif; ?> 
       <?php if ('default' !== $ee_map_type_control){ ?>
       mapTypeControl: true,
       mapTypeControlOptions: {
							<?php if ('dropdown' == $ee_map_type_control): ?>
       style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
							<?php else: ?>
							style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
							<?php endif; ?>
       },
       <?php } ?> 
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       }
     map<?php echo '_' . $event_id ?> = new google.maps.Map(document.getElementById("map_canvas<?php echo '_' . $event_id ?>"), myOptions);
  return false;
		}      
  function showAddress<?php echo '_' . $event_id ?>(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map<?php echo '_' . $event_id ?>.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map<?php echo '_' . $event_id ?>, 
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
				return false;
  }      

   jQuery(document).ready( function() { initialize<?php echo '_' . $event_id ?>(); showAddress<?php echo '_' . $event_id ?>('<?php echo $event_location ?>'); } );

 
  </script>
  <div class="ee-gmaps" id="map_canvas<?php echo '_' . $event_id ?>" style="<?php echo $map_align; ?>width: <?php echo $ee_map_width; ?>px; height: <?php echo $ee_map_height; ?>px;"></div>
</div>
<?php
	$buffer = ob_get_contents();
	ob_end_clean();
	return $buffer;
}
