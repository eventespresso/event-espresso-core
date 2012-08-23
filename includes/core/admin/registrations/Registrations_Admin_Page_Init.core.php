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
 * Registrations_Admin_Page_Init class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/registrations/Registrations_Admin_Page_Init.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Registrations_Admin_Page_Init extends EE_Admin_Page_Init implements Admin_Page_Init_Interface {





	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $page_slug, $page_name, $dir_name, $page_request ) { 
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		define( 'REG_PG_SLUG', 'registrations' );	
		define( 'REG_PG_NAME', ucwords( str_replace( '_', '', REG_PG_SLUG )));	
		define( 'REG_ADMIN', EE_CORE_ADMIN . REG_PG_SLUG . DS );	
		define( 'REG_ADMIN_URL', admin_url( 'admin.php?page=' . REG_PG_SLUG ));	
		define( 'REG_ASSETS_PATH', REG_ADMIN . 'assets' . DS );		
		define( 'REG_ASSETS_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . REG_PG_SLUG . DS . 'assets' . DS ));	
		define( 'REG_TEMPLATE_PATH', REG_ADMIN . 'templates' . DS );	
		define( 'REG_TEMPLATE_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . REG_PG_SLUG . DS . 'templates' . DS ));

		$this->_init( $page_slug, $page_name, $dir_name, $page_request );

	}




	
	/**
	*		sets vars in parent for creating menu settings page
	* 		return the name of the filter that should be used for inserting into the EE admin menu
	* 		filters can be found in /includes/admin_screens/admin_menu.php
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_admin_menu_filter_name() {
		return 'filter_hook_espresso_submenus_main_section';  
	}




	
	/**
	*		sets vars in parent for creating menu settings page
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_admin_menu_order() {
		return 20;  
	}




	
	/**
	*		sets vars in parent for creating menu settings page
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_page_access_capability() {
		return 'espresso_manager_events';
	}





	/**
	*		load page specific css
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_css() {
		if ( $this->is_biz_reports_tab ) {
			wp_deregister_style('jqplot');
			wp_enqueue_style('jquery-jqplot-css', JQPLOT_URL . 'jquery.jqplot.min.css');			
		} else {
			wp_enqueue_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
		}		
		wp_register_style('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.css' );		
		wp_enqueue_style('espresso_reg');
	}





	/**
	*		load page specific js
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_js() {

		if ( $this->is_biz_reports_tab ) {		
		    wp_deregister_script( 'jquery' );
		    wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
		    wp_enqueue_script( 'jquery' );
			wp_deregister_script('jqplot');
			wp_deregister_script('jquery-ui-core');
			wp_deregister_script('jquery-ui-tabs');
			wp_deregister_script('jquery-ui-datepicker');
			global $is_IE;
		    if( $is_IE ) {
		        wp_enqueue_script( 'excanvas' , JQPLOT_URL . 'excanvas.min.js', '', '', FALSE);
		    }
			wp_enqueue_script('jqplot', JQPLOT_URL . 'jquery.jqplot.min.js', array('jquery'), '', FALSE);
			wp_enqueue_script('jqplot-barRenderer', JQPLOT_URL . 'plugins/jqplot.barRenderer.min.js', array('jqplot'), '', FALSE);
			wp_enqueue_script('jqplot-canvasTextRenderer', JQPLOT_URL . 'plugins/jqplot.canvasTextRenderer.min.js', array('jqplot'), '', FALSE);
			wp_enqueue_script('jqplot-canvasAxisTickRenderer', JQPLOT_URL . 'plugins/jqplot.canvasAxisTickRenderer.min.js', array('jqplot'), '', FALSE);
			wp_enqueue_script('jqplot-categoryAxisRenderer', JQPLOT_URL . 'plugins/jqplot.categoryAxisRenderer.min.js', array('jqplot'), '', FALSE);
			wp_enqueue_script('jqplot-dateAxisRenderer', JQPLOT_URL . 'plugins/jqplot.dateAxisRenderer.min.js', array('jqplot'), '', FALSE);
			wp_enqueue_script('jqplot-highlighter', JQPLOT_URL . 'plugins/jqplot.highlighter.min.js', array('jqplot'), '', FALSE);
			wp_enqueue_script('jqplot-pointLabels', JQPLOT_URL . 'plugins/jqplot.pointLabels.min.js', array('jqplot'), '', FALSE);	
		} else {
			// other reg admin pages
			wp_enqueue_script('jquery-ui-position');
			wp_enqueue_script('jquery-ui-widget');
			wp_enqueue_script('jquery-ui-dialog');
			wp_enqueue_script('jquery-ui-draggable');
			wp_enqueue_script('jquery-ui-datepicker');
			wp_register_script('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.js', array('jquery'), '1.0', TRUE);
			wp_enqueue_script('espresso_reg');			
		}

	}


}


	
// end of file:	includes/core/admin/registrations/Registrations_Admin_Page_Init.core.php