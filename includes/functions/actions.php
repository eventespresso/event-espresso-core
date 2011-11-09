<?php
//Show pricing in a dropdown or text
if ( !function_exists('espresso_price_select_action') ){
	function espresso_price_select_action($event_id, $atts = array() ){
		$html = '';
		$html .= is_admin() ? '' : '<p class="event_prices">';
		$html .= event_espresso_price_dropdown($event_id, $show_label, $multi_reg, $current_value, $label);
		$html .= is_admin() ? '' : '</p>';
		echo $html;
		return;
	}
	add_action('espresso_price_select', 'espresso_price_select_action', 10, 2);
}