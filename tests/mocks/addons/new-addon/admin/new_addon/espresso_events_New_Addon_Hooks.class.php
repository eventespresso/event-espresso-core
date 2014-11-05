<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit('NO direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author			Seth Shoultes
 * @copyright		(c)2009-2012 Event Espresso All Rights Reserved.
 * @license			http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link				http://www.eventespresso.com
 * @version			4.0
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Registration_Form_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 *
 * @package			espresso_events_New_Addon_Hooks
 * @subpackage		wp-content/plugins/espresso-new-addon/admin/new_addon/espresso_events_New_Addon_Hooks.class.php
 * @author				Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_New_Addon_Hooks extends EE_Admin_Hooks {

	protected function _set_hooks_properties() {
        $this->_name = 'new_addon';
    }

	public function _redirect_action_early_update_category( $redirection_query_args ) { }

	public function _redirect_action_early_insert_category( $redirection_query_args ) { }

}
// End of file espresso_events_New_Addon_Hooks.class.php
// Location: /wp-content/plugins/espresso-new-addon/admin/new_addon/espresso_events_New_Addon_Hooks.class.php