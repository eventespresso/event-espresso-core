<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Admin_Page class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/EE_Admin_Page.core.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class Admin_Page {
	
	// must be set in define_page_vars()
	protected $admin_base_url = NULL; 
	protected $admin_page_title = NULL;
	// array for passing nav tab vars to templates
	protected $nav_tabs = array();
	// array for passing vars to templates
	protected $template_args = array();	
	
	
	// main function required by admin menu for displaying page
	abstract function route_admin_request();
	abstract function define_page_vars();





	public function __construct() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_check_user_access();
		
		//add_action( 'wp', array( $this, 'display_espresso_notices' ));
		add_action( 'admin_notices', array( $this, 'display_no_javascript_warning' ));
		add_action( 'admin_notices', array( $this, 'display_espresso_notices' ));
		add_action( 'admin_footer', array( $this, 'add_admin_page_ajax_loading_img' ), 99 );
		add_action( 'admin_footer', array( $this, 'add_admin_page_overlay' ), 100 );
	}





	/**
	 * 		verifies user access for this admin page
	*		@access 		private
	*		@return 		void
	*/
	private function _check_user_access() {
		if ( ! function_exists( 'is_admin' ) or  ! current_user_can( 'manage_options' )) {
			wp_redirect( home_url('/') . 'wp-admin/' );
		}
	}





	/**
	 * 		displays an error message to ppl who have javascript disabled
	*		@access 		public
	*		@return 		void
	*/
	public function display_no_javascript_warning() {
		echo '
<noscript>
	<div id="no-js-message" class="error">
		<p style="font-size:1.3em;">
			<span style="color:red;">' . __( 'Warning!', 'event_espresso' ) . '</span>
			' . __( 'Javascript is currently turned off for your browser. Javascript must be enabled in order for all of the features on this page to function properly. Please turn your javascript back on.', 'event_espresso' ) . '
		</p>
	</div>
</noscript>';
	}





	/**
	 * 		displays espresso success and/or errror notices
	*		@access 		public
	*		@return 		void
	*/
	public function display_espresso_notices() {
		echo espresso_get_notices();
	}





	/**
	 * 		generates a drop down box for selecting the number of visiable rows in an admin page list table
	*		@access 		protected
	* 		@param		int 			$max_entries 		total number of rows in the table
	*		@return 		string
	*/
	protected function _entries_per_page_dropdown( $max_entries = FALSE ) {
		
		$values = array( 10, 25, 50, 100 );
		$per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;
		
		if ( $max_entries ) {
			$values[] = $max_entries;
			sort( $values );
		}
	
		$entries_per_page_dropdown = '
			<div id="entries-per-page-dv" class="">
				<label class="hide-if-no-js">
					Show
					<select id="entries-per-page-slct" name="entries-per-page-slct">';
		
		foreach ( $values as $value ) {
			if ( $value < $max_entries ) {			
				$selected = $value == $per_page ?  ' selected="' . $per_page . '"' : '';
				$entries_per_page_dropdown .= '
						<option value="'.$value.'"'.$selected.'>'.$value.'&nbsp;&nbsp;</option>';
			}
		}

		$selected = $max_entries == $per_page ?  ' selected="' . $per_page . '"' : '';
		$entries_per_page_dropdown .= '
						<option value="'.$max_entries.'"'.$selected.'>All&nbsp;&nbsp;</option>';
						
		$entries_per_page_dropdown .= '
					</select>
					entries
				</label>
			</div>
';
		return $entries_per_page_dropdown;

	}





	/**
	*		generates  HTML wrapper with Tabbed nav for an admin page
	*		@access public
	*		@return void
	*/		
	public function admin_page_wrapper(  ) {

		// tab urls
		$this->nav_tabs['overview']['url'] = $this->admin_base_url;  
		$this->nav_tabs['overview']['link_text'] = __( 'Overview', 'event_espresso' );
		$this->nav_tabs['overview']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['overview']['order'] = 10;

		$this->nav_tabs['reports']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'reports' ), $this->admin_base_url ), 'reports' );  
		$this->nav_tabs['reports']['link_text'] = __( 'Reports', 'event_espresso' );
		$this->nav_tabs['reports']['css_class'] = '';
		$this->nav_tabs['reports']['order'] = 20;

		$this->nav_tabs['setttings']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'setttings' ), $this->admin_base_url ), 'setttings' );  
		$this->nav_tabs['setttings']['link_text'] = __( 'Settings', 'event_espresso' );
		$this->nav_tabs['setttings']['css_class'] = '';
		$this->nav_tabs['setttings']['order'] = 30;

		if( isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] )) {
			$action = sanitize_key( $_REQUEST['action'] );
			$this->nav_tabs['overview']['css_class'] = '';	
			if ( isset( $this->nav_tabs[ $action ] )) {
				$this->nav_tabs[ $action ]['css_class'] = ' nav-tab-active';
			}			
		}		

		usort( $this->nav_tabs, array($this, '_sort_nav_tabs' ));
		//printr( $this->nav_tabs, '$nav_tabs' );

		$this->template_args['nav_tabs'] = $this->nav_tabs;
		$this->template_args['admin_page_title'] = $this->admin_page_title;
				
		// load settings page wrapper template
		$template_path = EE_CORE_ADMIN . 'admin_wrapper.template.php';
		espresso_display_template( $template_path, $this->template_args );
	}





	/**
	*		sort nav tabs
	*		@access public
	*		@return void
	*/		
	private function _sort_nav_tabs( $a, $b ) {
		if ($a['order'] == $b['order']) {
	        return 0;
	    }
	    return ($a['order'] < $b['order']) ? -1 : 1;
	}





	/**
	*		spinny things pacify the masses
	*		@access public
	*		@return void
	*/		
	public function add_admin_page_ajax_loading_img() {
		echo '
	<div id="espresso-admin-page-ajax-loading" class="hidden">
		<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/ajax-loader-grey.gif" /><span>' . __('loading...', 'event_espresso') . '</span>
	</div>
';
	}




	/**
	*		add admin page overlay for modal boxes
	*		@access public
	*		@return void
	*/		
	public function add_admin_page_overlay() {
		echo '
	<div id="espresso-admin-page-overlay-dv" class=""></div>
';
	}
	
	


}


	
// end of file:  includes/core/admin/Admin_Page.core.php