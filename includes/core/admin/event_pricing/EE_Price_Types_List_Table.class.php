<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

if (!class_exists('WP_List_Table')) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class EE_Price_Types_List_Table extends WP_List_Table {

	private $_data;
	private $_view;
	private $_views;
	private $_entries_per_page_dropdown;




	public function __construct( $data = array(), $view = NULL, $views = NULL, $entries_per_page_dropdown = FALSE ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		
		$this->_data = $data;
		$this->_view = $view;
		$this->_views = $views;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;

		//Set parent defaults
		parent::__construct(array(
				'singular' => 'price type', //singular name of the listed records
				'plural' => 'prices types', //plural name of the listed records
				'ajax' => false //does this table support ajax?
		));

		$this->prepare_items();
		
	}





	function prepare_items() {
	
		$per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);

		$current_page = $this->get_pagenum();
		$total_items = count( $this->_data );

		$this->_data = array_slice( $this->_data, (( $current_page-1 ) * $per_page ), $per_page );
		//printr( $this->_data, '$this->_data <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

        $this->items = $this->_data;

		$this->set_pagination_args(
				array(
						'total_items' => $total_items, //WE have to calculate the total number of items
						'per_page' => $per_page, //WE have to determine how many items to show on a page
						'total_pages' => ceil($total_items / $per_page) //WE have to calculate the total number of pages
				)
		);

	}




	function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}




	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', /* $1%s */ $item->ID() );
	}





	function column_name($item) {

		//Build row actions
		$actions = array();
		// edit price link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_event_price_type', 'id'=>$item->ID() ), EVT_PRC_ADMIN_URL ), 'edit_event_price_type_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Event Price Type', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Event Price Type', 'event_espresso' ) . '">' . stripslashes( $item->name() ) . '</a>';

		if ( $this->_view == 'in_use' ) {
			// trash price link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_event_price_type', 'id'=>$item->ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'trash_event_price_type_nonce' );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Event Price Type to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			// restore price link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_event_price_type', 'id'=>$item->ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'restore_event_price_type_nonce' );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Event Price Type', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			// delete price link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_event_price_type', 'id'=>$item->ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'delete_event_price_type_nonce' );
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Event Price Type Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
		}

//		if ($this->_view == 'in_use') {
//			$actions['trash_price'] = sprintf('<a href="?page=%s&action=%s&id=%s">Move to Trash</a>', $_REQUEST['page'], 'trash_price_type', $item->ID());
//		} else {
//			$actions['restore'] = sprintf('<a href="?page=%s&action=%s&id=%s">Restore Price Type</a>', $_REQUEST['page'], 'restore_price_type', $item->ID());
//			$actions['delete'] = sprintf('<a href="?page=%s&action=%s&id=%s">Delete Permanently</a>', $_REQUEST['page'], 'delete_price_type', $item->ID());
//		}

		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->ID(),
										/* $3%s */ $this->row_actions($actions)
		);
	}





	function column_member($item) {
		return '<div class="jst-cntr">' . (($item->is_member()) ? 'Yes' : '') . '</div>';
	}





	function column_discount($item) {
		return '<div class="jst-cntr">' . (($item->is_discount()) ? 'Yes' : '') . '</div>';
	}





	function column_tax($item) {
		return '<div class="jst-cntr">' . (($item->is_tax()) ? 'Yes' : '') . '</div>';
	}





	function column_percent($item) {
		global $org_options;
		return '<div class="jst-cntr">' . (($item->is_percent()) ? '%' : $org_options['currency_symbol']) . '</div>';
	}





	function column_global($item) {
		return ($item->is_global()) ? '<div class="jst-cntr">Yes</div>' : '';
	}




	
	function column_order($item) {
		return '<div class="jst-cntr">' . $item->order() . '</div>';
	}





	function get_columns() {
		$columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'name' => __('Name', 'event_espresso'),
				'member' => '<div class="jst-cntr">' . __('Members', 'event_espresso') . '<br/>' . __('Only?', 'event_espresso') . '</div>',
				'discount' => '<div class="jst-cntr">' . __('Discount', 'event_espresso') . '<br/><span class="smaller-text">(' . __('reduces price', 'event_espresso') . ')</span>' . '</div>',
				'tax' => '<div class="jst-cntr">' . __('Applied', 'event_espresso') . '<br/>' . __('as a Tax', 'event_espresso') . '</div>',
				'percent' => '<div class="jst-cntr">' . __('Applied', 'event_espresso') . '<br/>' . __('as ', 'event_espresso') . '<span class="big-text">' . __('%', 'event_espresso') . '</span>' . __(' or ', 'event_espresso') . '<span class="big-text">' . __('$', 'event_espresso') . '</span></div>',
				'global' => '<div class="jst-cntr">' . __('Add as a Default', 'event_espresso') . '<br/>' . __('Price to New Events?', 'event_espresso') . '</div>',
				'order' => '<div class="jst-cntr">' . __('Order of', 'event_espresso') . '<br/>' . __('Application', 'event_espresso') . '</div>'
		);
		return $columns;
	}





	function get_sortable_columns() {
		$sortable_columns = array(
				'name' => array('name', true), //true means its already sorted
			//	'order' => array('order', false)
		);
		return $sortable_columns;
	}





	function get_bulk_actions() {
		return $this->_views[ $this->_view ]['bulk_action'];	
	}





	function get_views() {
//		$views = array();
//		foreach ($this->_views as $view) {
//			if ($view['count']) {
//				if ($this->_view == $view['slug']) {
//					$class = ' class="current"';
//				} else {
//					$class = '';
//				}
//				$views[$view['slug']] = sprintf('<a href="?page=%1$s&price_type_status=%2$s"%3$s>%4$s (%5$d)</a>',
//								$_REQUEST['page'],
//								$view['slug'],
//								$class,
//								$view['description'],
//								$view['count']);
//			}
//		}
//		return $views;
	}

}