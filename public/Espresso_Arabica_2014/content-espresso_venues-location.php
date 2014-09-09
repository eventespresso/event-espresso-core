<?php //echo '<h1>' . __FILE__ . '</h1>'; 
global $post; 
if ( espresso_venue_has_address( $post->ID )) :
?>
<div class="venue-location">
	
	<h3 class="venue-address-h3 ee-venue-h3">
		<span class="dashicons dashicons-location-alt"></span><?php _e( 'Location', 'event_espresso' ); ?>
	</h3>
	<span class="small-text"><strong><?php _e( 'Address:', 'event_espresso' ); ?></strong></span><?php espresso_venue_address( 'inline', $post->ID ); ?>
	<div class="clear"></div>

	<div class="venue-gmap"><?php espresso_venue_gmap( $post->ID ); ?></div>
	<div class="clear"></div>
	
</div>
<!-- .event-content -->
<?php endif; ?>
