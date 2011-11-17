<?php
function espresso_admin_footer () {
	echo 'Event Registration and Ticketing Powered by <a href="http://eventespresso.com/" title="Event Registration Powered by Event Espresso" target="_blank">'.EVENT_ESPRESSO_POWERED_BY.'</a>';
}
add_filter('admin_footer_text', 'espresso_admin_footer');