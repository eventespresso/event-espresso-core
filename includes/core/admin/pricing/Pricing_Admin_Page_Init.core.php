<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
* Event Espresso
*
* Event Registration and Management Plugin for WordPress
*
* @ package			Event Espresso
* @ author				Seth Shoultes
* @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
* @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
* @ link					{@link http://www.eventespresso.com}
* @ since		 		3.2.P
*
* ------------------------------------------------------------------------
*
* Pricing_Admin_Page_Init class
* 
* This is the init for the EE Pricing Admin Pages.  See EE_Admin_Page_Init for method inline docs.
*
* @package			Event Espresso
* @subpackage		includes/core/admin/pricing/Pricing_Admin_Page_Init.core.php
* @author				Brent Christensen 
*
* ------------------------------------------------------------------------
*/
class Pricing_Admin_Page_Init extends EE_Admin_Page_Init  {




	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() { 
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'PRICING_PG_SLUG', 'pricing' );	
		define( 'PRICING_LABEL', __('Pricing', 'event_espresso'));	
		define( 'PRICING_PG_NAME', ucwords( str_replace( '_', '', PRICING_PG_SLUG )));	
		define( 'PRICING_ADMIN', EE_CORE_ADMIN . PRICING_PG_SLUG . DS );	
		define( 'PRICING_ADMIN_URL', admin_url( 'admin.php?page=' . PRICING_PG_SLUG ));	
		define( 'PRICING_ASSETS_PATH', PRICING_ADMIN . 'assets' . DS );		
		define( 'PRICING_ASSETS_URL', EE_CORE_ADMIN_URL . PRICING_PG_SLUG .'/assets/' );	
		define( 'PRICING_TEMPLATE_PATH', PRICING_ADMIN . 'templates' . DS );	
		define( 'PRICING_TEMPLATE_URL', EE_CORE_ADMIN_URL . PRICING_PG_SLUG . DS . 'templates/' );

		parent::__construct();

	}





	protected function _set_init_properties() {
		$this->label = PRICING_LABEL;
		$this->menu_label = PRICING_LABEL;
		$this->menu_slug = PRICING_PG_SLUG;
	}



	/**
	*		sets vars in parent for creating admin menu entry
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_menu_map() {
		$map = array(
			'group' => 'management',
			'menu_order' => 10,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}


}	
// end of file:	includes/core/admin/pricing/Pricing_Admin_Page_Init.core.php