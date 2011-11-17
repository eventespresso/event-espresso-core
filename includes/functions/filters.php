<?php
function espresso_admin_footer () {
	echo 'Event Registration and Ticketing Powered by <a href="http://eventespresso.com/" title="Event Registration Powered by Event Espresso" target="_blank">'.EVENT_ESPRESSO_POWERED_BY.'</a>';
}
add_filter('admin_footer_text', 'espresso_admin_footer');

function espresso_help_popup($name){
	echo  '<a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=' . $name . '" target="_blank"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/question-frame.png" width="16" height="16" alt="" /></a>';
}
add_filter('espresso_help', 'espresso_help_popup');