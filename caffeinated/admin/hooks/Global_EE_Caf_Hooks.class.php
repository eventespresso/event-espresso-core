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
		add_filter('FHEE_show_sponsors_meta_box', '__return_false', 10 );
		add_filter('FHEE_show_ratings_request_meta_box', '__return_false', 10 );
		add_filter('FHEE__EE_Admin_Page_Core__load_global_scripts_styles__loader_containers', array( $this, 'forums_lazy_loading'), 10 );
		add_action('AHEE__EE_Admin_Page__espresso_news_post_box__after_content', array( $this, 'extra_news_box_content' ), 10 );
	}




	public function extra_news_box_content( $content ) {
		echo '<h3 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h3>';
		echo '<div id="ee_forum_posts_content">';
		$url = 'http://eventespresso.com/forum/event-espresso-support/feed/';
		EE_Admin_Page::cached_rss_display( 'ee_forum_posts_content', $url);
		echo '</div>';
	}


	public function forums_lazy_loading( $ids ) {
		$ids[] = 'ee_forum_posts_content';
		return $ids;
	}

} //end class Global_EE_Caf_Hooks