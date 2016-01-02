<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

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
 * Prices_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package			Event_Categories_Admin_List_Table
 * @subpackage		includes/core/admin/pricing_manager/Prices_List_Table.core.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Prices_List_Table extends EE_Admin_List_Table {

	private $_PRT;

	/**
	 * Array of price types.
	 * @var EE_Price_Type[]
	 */
	protected $_price_types = array();

	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
		require_once(EE_MODELS . 'EEM_Price_Type.model.php');
		$this->_PRT = EEM_Price_Type::instance();
		$this->_price_types = $this->_PRT->get_all_deleted_and_undeleted();
	}




	protected function _setup_data() {
		$trashed = $this->_admin_page->get_view() == 'trashed' ? true : false;
		$this->_data = $this->_admin_page->get_prices_overview_data( $this->_per_page, false, $trashed );
		$this->_all_data_count = $this->_admin_page->get_prices_overview_data( $this->_per_page, true, false );
		$this->_trashed_count = $this->_admin_page->get_prices_overview_data( $this->_per_page, true, true );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
				'singular' => __('price', 'event_espresso'),
				'plural' => __('prices', 'event_espresso'),
				'ajax' => true,
				'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'name' => __('Name', 'event_espresso'),
				'type' => __('Price Type', 'event_espresso'),
				'description' => __('Description', 'event_espresso'),
				'amount' => __('Amount', 'event_espresso')
			);

			$this->_sortable_columns = array(
						// true means its already sorted
						'name' => array( 'name' => false ),
						'type' => array( 'type' => false ),
						'amount' => array( 'amount' => false )
			);

        $this->_hidden_columns = array(
			);

        $this->_ajax_sorting_callback = 'update_prices_order';

	}





	protected function _get_table_filters() {
	}




	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_all_data_count;
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_default_prices', 'pricing_trash_price') ) {
			$this->_views['trashed']['count'] = $this->_trashed_count;
		}
	}





	/**
	 * overriding parent method so that we can make sure the row isn't sortable for certain items
	 * @param  object $item the current item
	 * @return string
	 */
	protected function _get_row_class( $item ) {
		static $row_class = '';
		$row_class = ( $row_class == '' ? 'alternate' : '' );

		$new_row = $row_class;

		if ( $item->type_obj()->base_type() !== 1 && $item->type_obj()->base_type() !== 4 )
			$new_row .= ' rowsortable';

		return ' class="' . $new_row . '"';
	}







	function column_cb($item) {
		if ( $item->type_obj()->base_type() !== 1 )
			return sprintf( '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />', /* $1%s */ $item->ID() );
		return '';
	}





	function column_name($item) {

		//Build row actions
		$actions = array();
		// edit price link
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_edit_default_price', 'pricing_edit_price', $item->ID() ) ) {
			$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_price', 'id'=>$item->ID() ), PRICING_ADMIN_URL );
			$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . esc_attr__( 'Edit Price', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		}

		$name_link = EE_Registry::instance()->CAP->current_user_can( 'ee_edit_default_price', 'edit_price', $item->ID() ) ? '<a href="'.$edit_lnk_url.'" title="' . esc_attr__( 'Edit Price', 'event_espresso' ) . '">' . stripslashes( $item->name() ) . '</a>' : $item->name();

		if ( $item->type_obj()->base_type() !== 1 ) {
			if ($this->_view == 'all') {
				// trash price link
				if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_default_price', 'pricing_trash_price', $item->ID() ) ) {
					$trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'trash_price', 'id'=>$item->ID(), 'noheader' => true ), PRICING_ADMIN_URL );
					$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . esc_attr__( 'Move Price to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
				}
			} else {
				if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_default_price', 'pricing_restore_price', $item->ID() ) ) {
					// restore price link
					$restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'restore_price', 'id'=>$item->ID(), 'noheader' => true ), PRICING_ADMIN_URL );
					$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . esc_attr__( 'Restore Price', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
				}

				// delete price link
				if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_default_price', 'pricing_delete_price', $item->ID() ) ) {
					$delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'delete_price', 'id'=>$item->ID(), 'noheader' => true ), PRICING_ADMIN_URL );
					$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . esc_attr__( 'Delete Price Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
				}
			}
		}

		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->ID(),
										/* $3%s */ $this->row_actions( $actions )
		);
	}





	function column_type($item) {
		return $this->_price_types[$item->type()]->name();
	}





	function column_description($item) {
		return stripslashes( $item->desc() );
	}





	function column_amount($item) {
		if ($this->_price_types[$item->type()]->is_percent()) {
			return '<div class="pad-amnt-rght">' . number_format($item->amount(), 1) . '%</div>';
		} else {
			return '<div class="pad-amnt-rght">' . EEH_Template::format_currency( $item->amount() ) . '</div>';
		}
	}



}
