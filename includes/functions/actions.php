<?php
//Show pricing in a dropdown or text
if ( !function_exists('espresso_price_select_action') ){
	
	function espresso_price_select_action($event_id, $atts = '' ){
		
		$html = '';
		$html .= is_admin() ? '' : '<p class="event_prices">';
		$html .= event_espresso_price_dropdown($event_id, $atts);
		$html .= is_admin() ? '' : '</p>';
		
		echo $html;
		
		return;
	}
	
	add_action( 'action_hook_espresso_price_select', 'espresso_price_select_action', 10, 2);
}

//Loads the $espresso_wp_user global var
add_action('plugins_loaded', 'espresso_get_user_id');


/**
*		@ display admin update & error messages
*		@access public
*		@return void
**/
function display_espresso_admin_notices () {

	global $notices;

	// We play both kinds of music here! Country AND Western! - err... I mean, cycle through both types of notices
	foreach( array('updates', 'errors') as $type ) {

		// if particular notice type is not empty, then "You've got Mail"
		if( ! empty( $notices[$type] )) {

			// is it an update or an error ?
			$msg_class = $type == 'updates' ? 'updated' : 'error';
			echo '<div id="message" class="'. $msg_class .'">';
			// display each notice, however many that may be
			foreach($notices[$type] as $message) {
				echo '<p>'. $message .'</p>';
			}
			// wrap it up
			echo '</div>';
		}
	}
}
add_action( 'action_hook_espresso_admin_notices', 'display_espresso_admin_notices' );
