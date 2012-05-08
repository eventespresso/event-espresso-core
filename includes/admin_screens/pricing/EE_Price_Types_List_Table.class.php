<?php

if (!class_exists('WP_List_Table')) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class EE_Prices_List_Table extends WP_List_Table {

	private $_PRT = NULL; // internal object reference to the EEM_Price_Type::instance
	private $view = NULL;
	private $views = NULL;

	public function __construct() {

		// Specific to this extension of WP_List_Table
		$this->views = array(
				'in_use' => array('slug' => 'in_use',
						'description' => 'In Use',
						'count' => 0,
						'bulk_action' => array(
								'trash_price_type' => 'Move to Trash'
						)
				),
				'trashed' => array('slug' => 'trashed',
						'description' => 'In Trash',
						'count' => 0,
						'bulk_action' => array(
								'restore_price_type' => 'Restore From Trash',
								'delete_price_type' => 'Delete Permanently'
						)
				)
		);

		if (!isset($_REQUEST['price_type_status']) || !array_key_exists($_REQUEST['price_type_status'], $this->views)) {
			$this->view = $this->views['in_use']['slug'];
		} else {
			$this->view = $_REQUEST['price_type_status'];
		}

		// Specific to this extension of WP_List_Table
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$this->_PRT = EEM_Price_Type::instance();

		//Set parent defaults
		parent::__construct(array(
				'singular' => 'price type', //singular name of the listed records
				'plural' => 'prices types', //plural name of the listed records
				'ajax' => false //does this table support ajax?
		));
	}

	function prepare_items() {
		$per_page = 5;
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);
		$data = array();

		// Specific to this extension of WP_List_Table
		$_GET['orderby'] = empty($_GET['orderby']) ? 0 : $_GET['orderby'];
		switch ($_GET['orderby']) {
			case 'name':
				$orderby = 'PRT_name';
				break;
			default:
				$orderby = 'PRT_order';
		}
		$_GET['order'] = empty($_GET['order']) ? 0 : $_GET['order'];
		switch ($_GET['order']) {
			case 'desc':
				$order = 'DESC';
				break;
			default:
				$order = 'ASC';
		}
		$this->_PRT->get_all_price_types($orderby, $order);
		foreach ($types as $type) {
			if ($type->deleted()) {
				$this->views['trashed']['count']++;
				if ($this->view == 'trashed') {
					$data[] = $type;
				}
			} else {
				$this->views['in_use']['count']++;
				if ($this->view == 'in_use') {
					$data[] = $type;
				}
			}
		}


		$current_page = $this->get_pagenum();
		if (!empty($data)) {
			$total_items = count($data);
			$this->items = array_slice($data, (($current_page - 1) * $per_page), $per_page);
		} else {
			$total_items = 0;
			$this->items = array();
		}
		$this->set_pagination_args(array(
				'total_items' => $total_items, //WE have to calculate the total number of items
				'per_page' => $per_page, //WE have to determine how many items to show on a page
				'total_pages' => ceil($total_items / $per_page) //WE have to calculate the total number of pages
		));
	}

	function column_cb($item) {
		return sprintf(
										'<input type="checkbox" name="checkbox[%1$s]" />',
										/* $1%s */ $item->ID()
		);
	}

	function column_name($item) {

		//Build row actions
		$actions = array();
		$actions['edit'] = sprintf('<a href="?page=%s&action=%s&id=%s">Edit</a>', $_REQUEST['page'], 'edit_price_type', $item->ID());

		if ($this->view == 'in_use') {
			$actions['trash_price'] = sprintf('<a href="?page=%s&action=%s&id=%s">Move to Trash</a>', $_REQUEST['page'], 'trash_price_type', $item->ID());
		} else {
			$actions['restore'] = sprintf('<a href="?page=%s&action=%s&id=%s">Restore Price Type</a>', $_REQUEST['page'], 'restore_price_type', $item->ID());
			$actions['delete'] = sprintf('<a href="?page=%s&action=%s&id=%s">Delete Permanently</a>', $_REQUEST['page'], 'delete_price_type', $item->ID());
		}

		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
										/* $1%s */ $item->name(),
										/* $2%s */ $item->ID(),
										/* $3%s */ $this->row_actions($actions)
		);
	}

	function column_member($item) {
		return ($item->is_member()) ? 'Yes' : '';
	}

	function column_discount($item) {
		return ($item->is_discount()) ? 'Yes' : '';
	}

	function column_tax($item) {
		return ($item->is_tax()) ? 'Yes' : '';
	}

	function column_percent($item) {
		global $org_options;
		return ($item->is_percent()) ? '%' : $org_options['currency_symbol'];
	}

	function column_global($item) {
		return ($item->is_global()) ? 'Yes' : '';
	}
	
	function column_order($item) {
		return $item->order();
	}

	function get_columns() {
		$columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'name' => 'Name',
				'member' => 'Members Only?',
				'discount' => 'Discount (reduces price)',
				'tax' => 'Applied as Tax',
				'percent' => 'Applied as % or $',
				'global' => 'Global Type?',
				'order' => 'Order of Application'
		);
		return $columns;
	}

	function get_sortable_columns() {
		$sortable_columns = array(
				'name' => array('name', false), //true means its already sorted
				'order' => array('order', true)
		);
		return $sortable_columns;
	}

	function get_bulk_actions() {
		$index = $this->view;
		return $this->views[$index]['bulk_action'];
	}

	function get_views() {
		$views = array();
		foreach ($this->views as $view) {
			if ($view['count']) {
				if ($this->view == $view['slug']) {
					$class = ' class="current"';
				} else {
					$class = '';
				}
				$views[$view['slug']] = sprintf('<a href="?page=%1$s&price_status=%2$s"%3$s>%4$s (%5$d)</a>',
								$_REQUEST['page'],
								$view['slug'],
								$class,
								$view['description'],
								$view['count']);
			}
		}
		return $views;
	}

}