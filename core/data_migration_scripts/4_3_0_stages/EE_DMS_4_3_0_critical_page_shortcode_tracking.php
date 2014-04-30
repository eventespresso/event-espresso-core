<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 *
 * class EE_DMS_4_3_0_critical_page_shortcode_tracking
 * The purpose of this DMS is to check that critical page shortcodes,
 * like those for the Thank You or Transactions pages, are removed from the "Posts Page"
 * in the post shortcodes array, which tracks what shortcodes are used on what posts.
 * The reason for this is because critical pages should NOT be getting displayed on the site's "Posts Page"
 * nor should those page's shortcodes be getting initialized or run.
 *
 * @package			Event Espresso
 * @subpackage		/core/data_migration_scripts/4_3_0_stages/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_DMS_4_3_0_critical_page_shortcode_tracking extends EE_Data_Migration_Script_Stage {

	/**
	 * Just initializes the status of the migration
	 */
	public function __construct() {
		$this->_pretty_name = __( 'Update Critical Page Shortcode Tracking', 'event_espresso' );
		parent::__construct();
	}



	/**
	 * _count_records_to_migrate
	 * Counts the records to migrate; the public version may cache it
	 *
	 * @access protected
	 * @return int
	 */
	protected function _count_records_to_migrate() {
		return 1;
	}



	/**
	 *	_migration_step
	 *
	 * @access protected
	 * @param int $num_items
	 * @throws EE_Error
	 * @return int number of items ACTUALLY migrated
	 */
	protected function _migration_step( $num_items = 1 ){
		// if this isn't set then something is really wrong
		if ( ! EE_Registry::instance()->CFG->core instanceof EE_Core_Config ) {
			throw new EE_Error( __( 'It appears the Event Espresso Core Configuration object is not setup correctly.', 'event_espresso' ));
		}
		// name of the WP Posts Page
		$posts_page = EE_Config::get_page_for_posts();
		// make sure critical pages get removed
		EE_Registry::instance()->CFG->update_post_shortcodes( $posts_page );
		// and just in case they ever had posts on frontpage at some time, then we should check for "posts" as well
		EE_Registry::instance()->CFG->update_post_shortcodes( 'posts' );
		// check for errors
		$notices = EE_Error::get_notices();
		// no errors returns 1
		return empty( $notices['errors'] ) ? 1 : 0;
	}


}
// End of file EE_DMS_4_3_0_critical_page_shortcode_tracking.php
// Location: /core/data_migration_scripts/4_3_0_stages/EE_DMS_4_3_0_critical_page_shortcode_tracking.php