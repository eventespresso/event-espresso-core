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
 * Extend_General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 * This is the extended (caf) general settings class
 *
 * @package		Extend_General_Settings_Admin_Page
 * @subpackage	caffeinated/admin/extend/general_settings/Extend_General_Settings_Admin_Page.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Extend_General_Settings_Admin_Page extends General_Settings_Admin_Page {



	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'GEN_SET_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'general_settings/templates/' );
	}



	protected function _extend_page_config() {

		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'general_settings';

		//filters and action hooks here
		add_action('AHEE__admin_option_settings__template__before', array( $this, 'use_venue_and_staff_manager_settings'), 10 );
		add_action( 'AHEE__admin_option_settings__template__before', array( $this, 'debug_logging_options' ), 9 );
		add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__CFG_admin', array( $this, 'update_debug_logging_options' ), 10, 1 );

	}



	public function use_venue_and_staff_manager_settings( $template_args ) {
		$_args['use_personnel_manager_select'] = EEH_Form_Fields::select_input('use_personnel_manager', $template_args['values'], $template_args['use_personnel_manager'] );
		$template = GEN_SET_CAF_TEMPLATE_PATH . 'use_venue_and_staff_manager_settings.template.php';
		EEH_Template::display_template( $template, $_args );
	}



		/*************		Logging Settings 		*************/



	/**
	 * _request_filesystem_credentials
	 * if attempting to enable full logging, WordPress may require filesystem credentials for FTP or SSH depending on the server
	 *
	 * @access   protected
	 * @param bool $show_errors
	 * @return bool
	 */
	protected function _request_filesystem_credentials( $show_errors = TRUE ) {

		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		$url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'request_filesystem_credentials' ), $this->_admin_base_url );
		$credentials = request_filesystem_credentials( $url );
		if ( $credentials == FALSE ) {
			if ( $show_errors ) {
				EE_Error::get_notices( FALSE );
				EE_Error::reset_notices();
				EE_Error::add_error( __('Connection settings are missing or incorrect. Please verify that the connection settings below are correct.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', '__return_false' );
			}
			return FALSE;
		}
		// now we have some credentials, try to get the wp_filesystem running
		$WP_Filesystem = WP_Filesystem( $credentials );
		if ( ! $WP_Filesystem ) {
			if ( $show_errors ) {
				EE_Error::get_notices( FALSE );
				EE_Error::reset_notices();
				EE_Error::add_error( __('There was an error connecting to the server. Please verify that the connection settings below are correct.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', '__return_false' );
			}
			// our credentials were no good, ask the user for them again
			request_filesystem_credentials( $url );
			return FALSE;
		}
		EE_Registry::instance()->CFG->admin->use_full_logging = TRUE;
		return TRUE;
	}



	/**
	 * debug_logging_options
	 *
	 * @param array $template_args
	 * @return void
	 */
	public function debug_logging_options( $template_args = array() ) {
		if ( EE_Registry::instance()->CFG->admin->use_full_logging === NULL ) {
			$this->_request_filesystem_credentials( FALSE );
			$template_args['use_full_logging'] = TRUE;
			EE_Error::get_notices( FALSE );
			EE_Error::reset_notices();
			EE_Error::add_attention( __('In order to enable Full Logging, the connection settings below are required.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			echo EE_Error::get_notices();
		} else {
			$template_args['use_full_logging'] = EE_Registry::instance()->CFG->admin->use_full_logging;
		}
		$template_args['use_remote_logging'] = isset( EE_Registry::instance()->CFG->admin->use_remote_logging ) ? absint( EE_Registry::instance()->CFG->admin->use_remote_logging ) : FALSE;
		$template_args['remote_logging_url'] = isset( EE_Registry::instance()->CFG->admin->remote_logging_url ) && ! empty( EE_Registry::instance()->CFG->admin->remote_logging_url ) ? stripslashes( EE_Registry::instance()->CFG->admin->remote_logging_url ) : '';
		$template = GEN_SET_CAF_TEMPLATE_PATH . 'debug_log_settings.template.php';
		EEH_Template::display_template( $template, $template_args );
	}



	/**
	 * update_debug_logging_options
	 *
	 * @param array $admin_options
	 * @return array
	 */
	public function update_debug_logging_options( $admin_options = array() ) {
		$use_full_logging = isset( $this->_req_data['use_full_logging'] ) ? (bool)absint( $this->_req_data['use_full_logging'] ) : $admin_options->use_full_logging;
		// trying to enable full logging for the first time?
		if ( $use_full_logging && $use_full_logging !== $admin_options->use_full_logging ) {
			$admin_options->use_full_logging = $this->_request_filesystem_credentials() ? TRUE : NULL;
			if ( $admin_options->use_full_logging === NULL ) {
				add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', '__return_false' );
			}
		} else {
			$admin_options->use_full_logging = $use_full_logging;
		}
		if ( $use_full_logging === FALSE ) {
			EE_Error::get_notices( FALSE );
			EE_Error::reset_notices();
		}

		$admin_options->use_remote_logging = isset( $this->_req_data['use_remote_logging'] ) ? absint( $this->_req_data['use_remote_logging'] ) : $admin_options->use_remote_logging;
		$admin_options->remote_logging_url = isset( $this->_req_data['remote_logging_url'] ) ? esc_url_raw( $this->_req_data['remote_logging_url'] ) : $admin_options->remote_logging_url;
		return $admin_options;
	}


}
