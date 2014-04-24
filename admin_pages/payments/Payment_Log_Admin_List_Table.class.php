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
 * Payment_Log_Admin_list_table
 *
 * Class for preparing the list table to show the payment log
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Registration_Form_Questions_Admin_List_Table
 * @subpackage	includes/core/admin/events/Registration_Form_Questions_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Payment_Log_Admin_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_payment_logs($this->_per_page, $this->_current_page);
//		if(isset($this->_req_data['status'] ) && $this->_req_data['status'] == 'trash'){
//			$this->_data = $this->_admin_page->get_trashed_questions( $this->_per_page,$this->_current_page, FALSE );
//		}else{
//			$this->_data = $this->_admin_page->get_questions( $this->_per_page,$this->_current_page, FALSE );
//		}		
		$this->_all_data_count = $this->_admin_page->get_payment_logs( $this->_per_page,$this->_current_page, TRUE );
	}





	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('payment log', 'event_espresso' ),
			'plural' => __('payment logs', 'event_espresso' ),
			'ajax' => TRUE, //for now,
			'screen' => $this->_admin_page->get_current_screen()->id 
			);

		$this->_columns = array(
			'cb' => '<input type="checkbox" />',
			'id' => __('ID', 'event_espresso'),
			'LOG_time' => __('Time', 'event_espresso'),
			'PMD_ID' => __('Payment Method', 'event_espresso'),
			'TXN_ID' => __('Transaction ID', 'event_espresso'),
			);

		$this->_sortable_columns = array(
			'LOG_time' => array( 'LOG_time' => TRUE ),
			);

		$this->_hidden_columns = array(
			);

	}



	//not needed
	protected function _get_table_filters() {
		$filters = array();

		//todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		$payment_methods = EEM_Payment_Method::instance()->get_all();
		$payment_method_names = array(array('id'=>'all','text'=>  __("All", 'event_espresso')),array('id'=>'0','text'=>  __("Unknown Payment Method", 'event_espresso')));
		foreach($payment_methods as $payment_method){
			$payment_method_names[] = array('id'=>$payment_method->ID(),'text'=>$payment_method->admin_name());
		}
		$filters[] = EEH_Form_Fields::select_input('_payment_method', $payment_method_names, isset($this->_req_data['_payment_method']) ? $this->_req_data['_payment_method'] : 'all');

		
		$start_date = isset( $this->_req_data['payment-filter-start-date'] ) ? wp_strip_all_tags( $this->_req_data['payment-filter-start-date'] ) : date( 'm/d/Y', strtotime( '-6 months' ));
		$end_date = isset( $this->_req_data['payment-filter-end-date'] ) ? wp_strip_all_tags( $this->_req_data['payment-filter-end-date'] ) : date( 'm/d/Y' );
		ob_start();
		?>
		<label for="txn-filter-start-date">Display Transactions from </label>
		<input id="payment-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>" name="payment-filter-start-date" size="15"/>	
		<label for="txn-filter-end-date"> until </label>
		<input id="payment-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>" name="payment-filter-end-date" size="15"/>	
		<?php
		$filters[] = ob_get_contents();
		ob_end_clean();
		
		return $filters;
	}


	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->get_payment_logs( $this->_per_page,$this->_current_page, TRUE );
	}
	
	public function column_LOG_time(EE_Log $item){
		return $item->get_datetime('LOG_time');
	}
	public function column_PMD_ID(EE_Log $item){
		if($item->object() instanceof EE_Payment_Method){
			return $item->object()->admin_name();
		}elseif($item->object() instanceof EE_Payment && $item->object()->payment_method()){
			return $item->object()->payment_method()->admin_name();
		}else{
			return __("No longer exists", 'event_espresso');
		}
		
		
	}
	public function column_TXN_ID(EE_Log $item){
		if($item->object() instanceof EE_Payment){
			return $item->object()->TXN_ID();
		}else{
			return __("Unable to find transaction", 'event_espresso');
		}
	}


	public function column_cb(EE_Log $item) {
		
		return sprintf( '<input type="checkbox" class="option_id" name="checkbox[%1$d]" value="%1$d" />', $item->ID() );
	}



	public function column_default($item) {
		//return ( isset( $item->$column_name )) ? $item->$column_name : '';
	}



	public function column_id(EE_Log $item) {	
		$details_query_args = array(
			'action'=>'payment_log_details',
			'ID'=>$item->ID(),
		);
		$url = EE_Admin_Page::add_query_args_and_nonce($details_query_args, EE_PAYMENTS_ADMIN_URL);
		return "<a href='$url'>{$item->ID()}</a>";
	}



//	public function column_display_text(EE_Payment_Log $item) {
//		$system_question = $item->is_system_question();
//		
//		if ( !defined('REG_ADMIN_URL') )
//			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
//
//		$edit_query_args = array(
//				'action' => 'edit_question',
//				'QST_ID' => $item->ID()
//			);
//
//
//		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EE_FORMS_ADMIN_URL );
//		
//		$actions = array(
//			'edit' => '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>'
//			);
//	
//
//		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . $item->display_text() . '</a></strong>';
//		$content .= $this->row_actions($actions);
//		return $content;	
//	}
} //end class Registration_Form_Questions_Admin_List_Table