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
 * Extend_Messages_Admin_Page
 *
 * This is the Messages Caffeinated admin page.  //for now this is fairly bare, most functionality is contained in the parent class, however, it is likely that at some point in the future this will change so having this extended class will be handy.  We also need this if we're going to have an extended "hooks" file.
 *
 *
 * @package		Extend_Messages_Admin_Page
 * @subpackage	caffeinated/admin/extend/messages/Extend_Messages_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Messages_Admin_Page extends Messages_Admin_Page {

	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'messages';
	}

} //end class Messages_Admin_Page
