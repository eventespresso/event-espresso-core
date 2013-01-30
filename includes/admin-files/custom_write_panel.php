<?php
//The following custom write panel is from http://wefunction.com/2009/10/revisited-creating-custom-write-panels-in-wordpress/

$key = "event_meta";
$meta_boxes = array(
//Image
"image" => array("name" => "image","title" => "Image","description" => "Using the \"<em>Add an Image</em>\" button, upload an image and paste the URL here. Images will be resized. This is the Event's main image and can automatically be sized."),
//Event Venue
"venue" => array("name" => "event_venue","title" => "Event Venue","description" => "Add the name of the venue."),
//Venue URL
"venue_url" => array("name" => "venue_url","title" => "Venue URL","description" => "Add a URL for the venue website.")
);

function espresso_create_meta_box() {
	global $key;
	
	if( function_exists( 'add_meta_box' ) ) {
	add_meta_box( 'new-meta-boxes', 'Additional Event Details', 'espresso_display_meta_box', 'espresso_event', 'normal', 'high' );
	}
}
function espresso_event_display_meta_box($post_id=0) {
	global $post, $meta_boxes, $key;
	?>
	
	<div class="form-wrap">
	
	<?php
	wp_nonce_field( plugin_basename( __FILE__ ), $key . '_wpnonce', false, true );
	
	foreach($meta_boxes as $meta_box) {
	$data = get_post_meta($post_id, $key, true);
	?>
	
	<div class="form-field form-required">
	<label for="<?php echo $meta_box[ 'name' ]; ?>"><?php echo $meta_box[ 'title' ]; ?></label>
	<input type="text" name="<?php echo $meta_box[ 'name' ]; ?>" value="<?php echo htmlspecialchars( $data[ $meta_box[ 'name' ] ] ); ?>" />
	<p><?php echo $meta_box[ 'description' ]; ?></p>
	</div>
	
	<?php } ?>
	
	</div>
	<?php
}


function espresso_display_meta_box() {
	global $post, $meta_boxes, $key;
	?>
	
	<div class="form-wrap">
	
	<?php
	wp_nonce_field( plugin_basename( __FILE__ ), $key . '_wpnonce', false, true );
	
	foreach($meta_boxes as $meta_box) {
	$data = get_post_meta($post->ID, $key, true);
	?>
	
	<div class="form-field form-required">
	<label for="<?php echo $meta_box[ 'name' ]; ?>"><?php echo $meta_box[ 'title' ]; ?></label>
	<input type="text" name="<?php echo $meta_box[ 'name' ]; ?>" value="<?php echo htmlspecialchars( $data[ $meta_box[ 'name' ] ] ); ?>" />
	<p><?php echo $meta_box[ 'description' ]; ?></p>
	</div>
	
	<?php } ?>
	
	</div>
	<?php
}

function espresso_save_meta_box( $post_id) {
	global $post, $meta_boxes, $key;
	
	foreach( $meta_boxes as $meta_box ) {
	$data[ $meta_box[ 'name' ] ] = $_POST[ $meta_box[ 'name' ] ];
	}
	
	$post_id= $post_id == 0 ? $post->ID : $post_id;
	if ( !wp_verify_nonce( $_POST[ $key . '_wpnonce' ], plugin_basename(__FILE__) ) )
	return $post_id;
	
	if ( !current_user_can( 'edit_post', $post_id ))
	return $post_id;
	
	update_post_meta($post_id, $key, $data );
}

add_action( 'admin_menu', 'espresso_create_meta_box' );
add_action( 'save_post', 'espresso_save_meta_box' );