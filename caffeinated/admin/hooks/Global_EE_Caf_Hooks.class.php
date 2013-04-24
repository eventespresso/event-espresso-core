<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Global_EE_Caf_Hooks
 *
 * This class is just a wrapper for some global hooks that are run on EE_Admin pages.
 *
 *
 * @package		Global_EE_Caf_Hooks
 * @subpackage	caffeinated/admin/hooks/Global_EE_Caf_Hooks.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Global_EE_Caf_Hooks {

	public function __construct() {
		$this->_do_hooks();
	}



	private function _do_hooks() {
		add_filter('filter_hook_espresso_show_sponsors_meta_box', create_function('$show_sponsors', 'return FALSE;' ), 10 );
		add_action('action_hook_espresso_news_meta_box_extra_content', array( $this, 'extra_news_box_content' ), 10 );
	}




	public function extra_news_box_content( $content ) {
		echo '<h4 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h4>';
		@wp_widget_rss_output('http://eventespresso.com/forum/event-espresso-support/feed/', array('show_date' => 0, 'items' => 4));
	}

} //end class Global_EE_Caf_Hooks