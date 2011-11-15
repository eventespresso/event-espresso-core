<?php
//Show pricing in a dropdown or text
if ( !function_exists('espresso_price_select_action') ){
	function espresso_price_select_action($event_id, $atts ){
		$html = '';
		$html .= is_admin() ? '' : '<p class="event_prices">';
		$html .= event_espresso_price_dropdown($event_id, $atts);
		$html .= is_admin() ? '' : '</p>';
		echo $html;
		return;
	}
	add_action('espresso_price_select', 'espresso_price_select_action', 10, 2);
}

//Loads the $espresso_wp_user global var
add_action('plugins_loaded', 'espresso_get_user_id');
