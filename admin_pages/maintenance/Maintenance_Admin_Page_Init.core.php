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
 * Maintenance_Admin_page_INit
 *
 * This is for when we're in maintenance mode. If we're in level 2 of mainteannce
 * mode, this is all users can see (because everything else is broken). If we're jsut
 * in level 1, they can see most of htis and the other admin pages.
 *
 *
 * @package		Payments_Admin_Page_Init
 * @subpackage	includes/core/admin/Payments_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Maintenance_Admin_Page_Init extends EE_Admin_Page_Init {


	public function __construct() {
		//define some page related constants
		define( 'EE_MAINTENANCE_PG_SLUG', 'espresso_maintenance_settings' );
		define( 'EE_MAINTENANCE_ADMIN_URL', admin_url( 'admin.php?page=' . EE_MAINTENANCE_PG_SLUG ));
		define( 'EE_MAINTENANCE_ADMIN', EE_ADMIN_PAGES . 'maintenance' . DS );	
		define( 'EE_MAINTENANCE_TEMPLATE_PATH', EE_MAINTENANCE_ADMIN . 'templates' . DS );	
		define( 'EE_MAINTENANCE_ASSETS_URL', EE_ADMIN_PAGES_URL . 'maintenance/assets/' );
		define( 'EE_SUPPORT_EMAIL', 'support@eventespresso.com');

		//check that if we're in maintenance mode that we tell the admin taht
		add_action('admin_notices',array($this,'check_maintenance_mode'));
		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Maintenance Mode', 'event_espresso');
		$this->menu_label = __('Maintenance', 'event_espresso');
		$this->menu_slug = EE_MAINTENANCE_PG_SLUG;
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'tools',
			'menu_order' => 30,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_tools'
			);
		if( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance ){
				$map['group']='main';
				$map['parent_slug'] = EE_MAINTENANCE_PG_SLUG;
				add_filter('FHEE__EE_Admin_Page_Loader__set_menus__parent_slug',array($this,'make_maintenance_page_parent_slug'));
		}
		return $map;
	}
	
	/**
	 * When we're in maintence mode level 2, we want the maintenance page to be top level
	 * @param string $old_parent_slug
	 * @return string
	 */
	public function make_maintenance_page_parent_slug($old_parent_slug){
		return EE_MAINTENANCE_PG_SLUG;
	}
	
	/**
	 * Checks if we're in maintenance mode, and if so we notify the admin adn tell them how to take the site OUT of maintenance mode
	 */
	public function check_maintenance_mode(){
		if(EE_Maintenance_Mode::instance()->level()){
			$maintenance_page_url = EE_Admin_Page::add_query_args_and_nonce(array(), EE_MAINTENANCE_ADMIN_URL);
			switch(EE_Maintenance_Mode::instance()->level()){
				case EE_Maintenance_Mode::level_1_frontend_only_maintenance:
					echo '<div class="updated">
						<p>'. sprintf(__("Event Espresso is in Frontend-Only MAINTENANCE MODE. This means the front-end (ie, non-wp-admin pages) is disabled for ALL users except site admins. Visit the %s Maintenance Page %s to disable maintenance mode.", "event_espresso"),"<a href='$maintenance_page_url'>","</a>").
					'</div>';
					break;
				case EE_Maintenance_Mode::level_2_complete_maintenance:
						echo '<div class="error">
						<p>'. sprintf(__("Event Espresso is in COMPLETE MAINTENANCE MODE because your database needs to migrated. This means Event Espresso is disabled (both wp-admin pages and frontend event registration) until you run the migrations. Visit the %s Maintenance Page %s.", "event_espresso"),"<a href='$maintenance_page_url'>","</a>").
					'</div>';
					break;
			}
		}
	}

} //end class Payments_Admin_Page_Init