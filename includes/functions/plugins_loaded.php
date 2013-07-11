<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');











/**
 * 		Test if current page pertains to event registrationand load appropriate files
 *
 * 		@access public
 * 		@return void
 */
function espresso_load_reg_page_files() {

	global $org_options, $current_ee_page;
	
	$current_ee_page = isset( $current_ee_page ) ? $current_ee_page : $org_options['event_page_id'];
	
	do_action('AHEE_log', __FILE__, __FUNCTION__, '$current_ee_page = ' . $current_ee_page );

	$reg_pages = array(
		$org_options['event_page_id']	 => 'event_page_id',
		$org_options['return_url']	 => 'return_url',
		$org_options['cancel_return'] => 'cancel_return',
		$org_options['notify_url']	 => 'notify_url'
	);
	
	if ( isset( $reg_pages[ $current_ee_page ] )) {
		switch( $reg_pages[ $current_ee_page ] ){
		
			case 'event_page_id' :

					$load_SPCO = FALSE;
					
					$e_reg_pages = array( 
									'register', 
									'process_reg_step_1', 
									'process_reg_step_2', 
									'process_reg_step_3', 
									'event_queue'
							);
					$load_SPCO = isset( $_REQUEST['e_reg'] ) && ( in_array( $_REQUEST['e_reg'], $e_reg_pages )) ? TRUE : $load_SPCO;
						
					$e_reg_ajax_actions = array( 
									'espresso_process_registration_step_1', 
									'espresso_process_registration_step_2', 
									'espresso_process_registration_step_3'
							);
					$load_SPCO = isset( $_REQUEST['action'] ) && ( in_array( $_REQUEST['action'], $e_reg_ajax_actions )) ? TRUE : $load_SPCO;
							
					if ( $load_SPCO ) {
						require_once(EE_CLASSES . 'EE_Single_Page_Checkout.class.php');
						global $Single_Page_Checkout;
						$Single_Page_Checkout = EE_Single_Page_Checkout::instance();	
						define("ESPRESSO_REG_PAGE_FILES_LOADED", "true");
					}

				break;
			
			case 'return_url' :
				require_once(EE_CLASSES . 'EE_Thank_You_Page.class.php');
				EE_Thank_You_Page::instance();	
				break;
			
			case 'cancel_return' :
				break;
			
			case 'notify_url' :				
				require_once(EE_CLASSES . 'EE_Transaction_Page.class.php');
				EE_Transaction_Page::instance();	
				break;
		}

	}
	

}
add_action('AHEE_load_reg_page_files', 'espresso_load_reg_page_files');





/**
 * 		used by EE and EE addons during plugin activation
 *
 * 		@access public
 * 		@return void
 */
function event_espresso_run_install( $table_name, $sql, $engine = 'ENGINE=MyISAM ' ) {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	global $wpdb;
	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

	$wp_table_name = $wpdb->prefix . $table_name;
	$SQL = "CREATE TABLE $wp_table_name ( $sql ) $engine DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
	dbDelta( $SQL );
	// clear any of these out
	delete_option( $table_name . '_tbl_version' );
	delete_option( $table_name . '_tbl' );

}

