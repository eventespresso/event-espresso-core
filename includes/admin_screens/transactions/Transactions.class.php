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
 * EE_Admin_Transactions class
 *
 * @package			Event Espresso
 * @subpackage		includes/admin_screens/EE_Admin_Transactions.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Admin_Transactions {

	public function __construct() {

		global $org_options, $ee_admin_page;
		define( 'TXN_ADMIN_URL', admin_url( 'admin.php?page=transactions' ));	

		// add some style
		$this->load_css();
		// and make it dance
		$this->load_js();

		
		if ( isset( $_REQUEST['action'] )) {
		
			check_admin_referer( $_REQUEST['action'] );	
			
			switch ( $_REQUEST['action'] ) {
			
				case 'edit_transaction': 				
					$this->_edit_transaction(); 
					break;

				case 'view_transaction': 				
					$this->_view_transaction_details(); 
					break;

			}			
		} else {
			$this->_transactions_list_table();
		}

	}





	/**
	 * 		generates HTML for main Transactions Admin page
	*		@access private
	*		@return void
	*/
	private function _transactions_list_table() {
		
		global $wpdb;

		// default page args
		$template_args = array();		
		$template_args['notices'] = espresso_get_notices();

		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/Transactions_List_Table.class.php');
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
		
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "transaction"';
		$results = $wpdb->get_results( $SQL );

		$stati = array();
		foreach ( $results as $status ) {
			$stati[ $status->STS_ID ] = $status->STS_code;
		}

		$template_args['start_date'] = isset( $_POST['txn-filter-start-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-1 month' ));
		$template_args['end_date'] = isset( $_POST['txn-filter-end-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-end-date'] ) : date( 'D M j, Y' );
		$template_args['end_date'] = ( strtotime( $template_args['end_date'] ) < strtotime( $template_args['start_date'] )) ? $template_args['start_date'] : $template_args['end_date'];
		
		
		$transactions = $TXN->get_transactions_for_admin_page( $template_args['start_date'], $template_args['end_date'] );  
		$template_args['table_rows'] = $wpdb->num_rows;
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $template_args['table_rows'] );
		$template_args['list_table'] = new EE_Admin_Transactions_List_Table( $transactions, $stati, $entries_per_page_dropdown );

		// link back to here
		$template_args['view_all_url'] = add_query_arg( array( 'per_page' => $template_args['table_rows'] ), TXN_ADMIN_URL );  

		// path to template 
		$template_path = EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/templates/transactions_admin_list_table.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
		
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _view_transaction_details() {
		echo '<h1>Why hello there!</h1>';
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _entries_per_page_dropdown( $max_entries = FALSE ) {
		
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
	*		load css
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_css() {
		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
		wp_enqueue_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
		wp_register_style('espresso_txn', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/admin_screens/transactions/espresso_transactions_admin.css' );		
		wp_enqueue_style('espresso_txn');
	}



	
	
	
	/**
	*		load js
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_js() {
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-ui-datepicker');
		wp_register_script('espresso_txn', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/admin_screens/transactions/espresso_transactions_admin.js', array('jquery'), '1.0', TRUE);
		wp_enqueue_script('espresso_txn');
	}


}
	
function event_espresso_manage_transactions() {
	new EE_Admin_Transactions();
}

// end of file:  includes/admin_screens/EE_Admin_Transactions.class.php