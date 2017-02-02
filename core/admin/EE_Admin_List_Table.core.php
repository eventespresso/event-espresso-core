<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'NO direct script access allowed' );
}
if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}



/**
 * EE_Admin_Page_list
 * Base list table class for EE_Admin_Page list tables.
 * The various child classes would just have to extend this class to add their own columns etc.
 * A good resource for implementing WP_List_Table api is:
 *
 * @link           http://wpengineer.com/2426/wp_list_table-a-step-by-step-guide/
 * @package        EE_Admin_Page_list
 * @subpackage	includes/core/admin/EE_Admin_Page_list.core.php
 * @abstract
 * @author		Darren Ethier
 */
abstract class EE_Admin_List_Table extends WP_List_Table {

	/**
	 * holds the data that will be processed for the table
	 *
	 * @var array $_data
	 */
	protected $_data;


	/**
	 * This holds the value of all the data available for the given view (for all pages).
	 *
	 * @var int $_all_data_count
	 */
	protected $_all_data_count;



	/**
	 * Will contain the count of trashed items for the view label.
	 *
	 * @var int $_trashed_count
	 */
	protected $_trashed_count;



	/**
	 * This is what will be referenced as the slug for the current screen
	 *
	 * @var string $_screen
	 */
	protected $_screen;



	/**
	 * this is the EE_Admin_Page object
	 *
	 * @var EE_Admin_Page $_admin_page
	 */
	protected $_admin_page;


	/**
	 * The current view
	 *
	 * @var string $_view
	 */
	protected $_view;



	/**
	 * array of possible views for this table
	 *
	 * @var array $_views
	 */
	protected $_views;


	/**
	 * An array of key => value pairs containing information about the current table
	 * array(
	 *        'plural' => 'plural label',
	 *        'singular' => 'singular label',
	 *        'ajax' => false, //whether to use ajax or not
	 *        'screen' => null, //string used to reference what screen this is
	 *        (WP_List_table converts to screen object)
	 * )
	 *
	 * @var array $_wp_list_args
	 */
	protected $_wp_list_args;

	/**
	 * an array of column names
	 * array(
	 *    'internal-name' => 'Title'
	 * )
	 *
	 * @var array $_columns
	 */
	protected $_columns;

	/**
	 * An array of sortable columns
	 * array(
	 *    'internal-name' => 'orderby' //or
	 *    'internal-name' => array( 'orderby', true )
	 * )
	 *
	 * @var array $_sortable_columns
	 */
	protected $_sortable_columns;

	/**
	 * callback method used to perform AJAX row reordering
	 *
	 * @var string $_ajax_sorting_callback
	 */
	protected $_ajax_sorting_callback;

	/**
	 * An array of hidden columns (if needed)
	 * array('internal-name', 'internal-name')
	 *
	 * @var array $_hidden_columns
	 */
	protected $_hidden_columns;

	/**
	 * holds the per_page value
	 *
	 * @var int $_per_page
	 */
	protected $_per_page;

	/**
	 * holds what page number is currently being viewed
	 *
	 * @var int $_current_page
	 */
	protected $_current_page;

	/**
	 * the reference string for the nonce_action
	 *
	 * @var string $_nonce_action_ref
	 */
	protected $_nonce_action_ref;

	/**
	 * property to hold incoming request data (as set by the admin_page_core)
	 *
	 * @var array $_req_data
	 */
	protected $_req_data;



	/**
	 * yes / no array for admin form fields
	 *
	 * @var array $_yes_no
	 */
	protected $_yes_no = array();

	/**
	 * Array describing buttons that should appear at the bottom of the page
	 * Keys are strings that represent the button's function (specifically a key in _labels['buttons']),
	 * and the values are another array with the following keys
	 * array(
	 *    'route' => 'page_route',
	 *    'extra_request' => array('evt_id' => 1 ); //extra request vars that need to be included in the button.
	 * )
	 *
	 * @var array $_bottom_buttons
	 */
	protected $_bottom_buttons = array();


	/**
	 * Used to indicate what should be the primary column for the list table.
	 * If not present then falls back to what WP calculates
	 * as the primary column.
	 *
	 * @type string $_primary_column
	 */
	protected $_primary_column = '';



	/**
	 * Used to indicate whether the table has a checkbox column or not.
	 *
	 * @type bool $_has_checkbox_column
	 */
	protected $_has_checkbox_column = false;



	/**
	 * @param \EE_Admin_Page $admin_page we use this for obtaining everything we need in the list table
	 */
	public function __construct( EE_Admin_Page $admin_page ) {
		$this->_admin_page = $admin_page;
		$this->_req_data = $this->_admin_page->get_request_data();
		$this->_view = $this->_admin_page->get_view();
		$this->_views = empty( $this->_views ) ? $this->_admin_page->get_list_table_view_RLs() : $this->_views;
		$this->_current_page = $this->get_pagenum();
		$this->_screen = $this->_admin_page->get_current_page() . '_' . $this->_admin_page->get_current_view();
		$this->_yes_no = array(  __('No', 'event_espresso'), __('Yes', 'event_espresso'));

		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page', 10 );

		$this->_setup_data();
		$this->_add_view_counts();

		$this->_nonce_action_ref = $this->_view;

		$this->_set_properties();

		//set primary column
		add_filter( 'list_table_primary_column', array( $this, 'set_primary_column' ) );

		//set parent defaults
		parent::__construct($this->_wp_list_args);

		$this->prepare_items();
	}


	/**
	 * _setup_data
	 * this method is used to setup the $_data, $_all_data_count, and _per_page properties
	 * @uses $this->_admin_page
	 * @return void
	 */
	abstract protected function _setup_data();




	/**
	 * set the properties that this class needs to be able to execute wp_list_table properly
	 * properties set:
	 * _wp_list_args = what the arguments required for the parent _wp_list_table.
	 * _columns = set the columns in an array.
	 * _sortable_columns = columns that are sortable (array).
	 * _hidden_columns = columns that are hidden (array)
	 * _default_orderby = the default orderby for sorting.
	 *
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_properties();





	/**
	 * _get_table_filters
	 * We use this to assemble and return any filters that are associated with this table that help further refine what get's shown in the table.
	 *
	 * @abstract
	 * @access protected
	 * @return string
	 */
	abstract protected function _get_table_filters();






	/**
	 * this is a method that child class will do to add counts to the views array so when views are displayed the counts of the views is accurate.
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _add_view_counts();







	/**
	 * _get_hidden_fields
	 * returns a html string of hidden fields so if any table filters are used the current view will be respected.
	 * @return string
	 */
	protected function _get_hidden_fields() {
		$action = isset( $this->_req_data['route'] ) ? $this->_req_data['route'] : '';
		$action = empty( $action ) && isset( $this->_req_data['action'] ) ? $this->_req_data['action'] : $action;
		//if action is STILL empty, then we set it to default
		$action = empty( $action ) ? 'default' : $action;
		$field = '<input type="hidden" name="page" value="' . $this->_req_data['page'] . '" />' . "\n";
		$field .= '<input type="hidden" name="route" value="'. $action .'" />' . "\n";/**/
		$field .= '<input type="hidden" name="perpage" value="' . $this->_per_page . '" />' . "\n";

		$bulk_actions = $this->_get_bulk_actions();
		foreach ( $bulk_actions as $bulk_action => $label ) {
			$field .= '<input type="hidden" name="' . $bulk_action . '_nonce" value="' . wp_create_nonce  ( $bulk_action . '_nonce' ) . '" />' . "\n";
		}

		return $field;
	}



	/**
	 * _set_column_info
	 * we're using this to set the column headers property.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_column_info() {
		$columns = $this->get_columns();
		$hidden = $this->get_hidden_columns();
		$_sortable = $this->get_sortable_columns();

		/**
		 * Dynamic hook allowing for adding sortable columns in this list table.
		 * Note that $this->screen->id is in the format
		 * {sanitize_title($top_level_menu_label)}_page_{$espresso_admin_page_slug}.  So for the messages list
		 * table it is: event-espresso_page_espresso_messages.
		 * However, take note that if the top level menu label has been translated (i.e. "Event Espresso"). then the
		 * hook prefix ("event-espresso") will be different.
		 *
		 * @var array
		 */
		$_sortable = apply_filters( "FHEE_manage_{$this->screen->id}_sortable_columns", $_sortable, $this->_screen );

		$sortable = array();
		foreach ( $_sortable as $id => $data ) {
			if ( empty( $data ) ) {
				continue;
			}
			//fix for offset errors with WP_List_Table default get_columninfo()
			if ( is_array($data) ) {
				$_data[0] = key($data);
				$_data[1] = isset($data[1]) ? $data[1] : false;
			} else {
				$_data[0] = $data;
			}

			$data = (array) $data;

			if ( !isset( $data[1] ) ) {
				$_data[1] = false;
			}

			$sortable[$id] = $_data;
		}
		$primary = $this->get_primary_column_name();
		$this->_column_headers = array( $columns, $hidden, $sortable, $primary );
	}


	/**
	 * Added for WP4.1 backward compat (@see https://events.codebasehq.com/projects/event-espresso/tickets/8814)
	 * @return string
	 */
	protected function get_primary_column_name() {
		foreach( class_parents( $this ) as $parent ) {
			if ( $parent === 'WP_List_Table' && method_exists( $parent, 'get_primary_column_name' ) ) {
				return parent::get_primary_column_name();
			}
		}
		return $this->_primary_column;
	}



	/**
	 * Added for WP4.1 backward compat (@see https://events.codebasehq.com/projects/event-espresso/tickets/8814)
	 *
	 * @param EE_Base_Class $item
	 * @param string $column_name
	 * @param string $primary
	 * @return string
	 */
	protected function handle_row_actions( $item, $column_name, $primary ) {
		foreach( class_parents( $this ) as $parent ) {
			if ( $parent === 'WP_List_Table' && method_exists( $parent, 'handle_row_actions' ) ) {
				return parent::handle_row_actions( $item, $column_name, $primary );
			}
		}
		return '';
	}



	/**
	 * _get_bulk_actions
	 * This is a wrapper called by WP_List_Table::get_bulk_actions()
	 *
	 * @access protected
	 * @return array bulk_actions
	 */
	protected function _get_bulk_actions() {
		$actions = array();
		//the _views property should have the bulk_actions, so let's go through and extract them into a properly formatted array for the wp_list_table();
		foreach ( $this->_views as $view => $args) {
			if ( $this->_view === $view  && isset( $args['bulk_action']) && is_array($args['bulk_action']) ) {
				//each bulk action will correspond with a admin page route, so we can check whatever the capability is for that page route and skip adding the bulk action if no access for the current logged in user.
				foreach ( $args['bulk_action'] as $route =>$label ) {
					if ( $this->_admin_page->check_user_access( $route, true ) ) {
						$actions[$route] = $label;
					}
				}
			}
		}
		return $actions;
	}


	/**
	 * _filters
	 * This receives the filters array from children _get_table_filters() and assembles the string including the filter button.
	 *
	 * @access private
	 * @return string html showing filters
	 */
	private function _filters() {
		$classname = get_class($this);
		$filters = apply_filters( "FHEE__{$classname}__filters", (array) $this->_get_table_filters(), $this, $this->_screen );

		if ( empty( $filters )) {
			return;
		}
		foreach ( $filters as $filter ) {
			echo $filter;
		}
		//add filter button at end
		echo '<input type="submit" class="button-secondary" value="' . __('Filter', 'event_espresso') . '" id="post-query-submit" />';
		//add reset filters button at end
		echo '<a class="button button-secondary"  href="' . $this->_admin_page->get_current_page_view_url() . '" style="display:inline-block">' . __('Reset Filters', 'event_espresso') . '</a>';
	}


	/**
	 * Callback for 'list_table_primary_column' WordPress filter
	 *
	 * If child EE_Admin_List_Table classes set the _primary_column property then that will be set as the primary column when class
	 * is instantiated.
	 *
	 * @see WP_List_Table::get_primary_column_name
	 * @param string $column_name
	 * @return string
	 */
	public function set_primary_column( $column_name ) {
		return ! empty( $this->_primary_column ) ? $this->_primary_column : $column_name;
	}



	/**
	 *
	 */
	public function prepare_items() {

		$this->_set_column_info();
		//$this->_column_headers = $this->get_column_info();
		$total_items = $this->_all_data_count;
		$this->process_bulk_action();

		$this->items = $this->_data;
		$this->set_pagination_args(
			array(
				'total_items' => $total_items,
				'per_page' => $this->_per_page,
				'total_pages' => ceil($total_items / $this->_per_page )
			)
		);
	}


	/**
	 * This column is the default for when there is no defined column method for a registered column.
	 * This can be overridden by child classes, but allows for hooking in for custom columns.
	 *
	 * @param EE_Base_Class $item
	 * @param string        $column_name The column being called.
	 * @return string html content for the column
	 */
	public function column_default( $item, $column_name ) {
		/**
		 * Dynamic hook allowing for adding additional column content in this list table.
		 * Note that $this->screen->id is in the format
		 * {sanitize_title($top_level_menu_label)}_page_{$espresso_admin_page_slug}.  So for the messages list
		 * table it is: event-espresso_page_espresso_messages.
		 * However, take note that if the top level menu label has been translated (i.e. "Event Espresso"). then the
		 * hook prefix ("event-espresso") will be different.
		 *
		 */
		do_action( 'AHEE__EE_Admin_List_Table__column_' . $column_name . '__' . $this->screen->id, $item, $this->_screen );
	}



	/**
	 * Get a list of columns. The format is:
	 * 'internal-name' => 'Title'
	 *
	 * @since 3.1.0
	 * @access public
	 * @abstract
	 *
	 * @return array
	 */
	public function get_columns() {
		/**
		 * Dynamic hook allowing for adding additional columns in this list table.
		 * Note that $this->screen->id is in the format
		 * {sanitize_title($top_level_menu_label)}_page_{$espresso_admin_page_slug}.  So for the messages list
		 * table it is: event-espresso_page_espresso_messages.
		 * However, take note that if the top level menu label has been translated (i.e. "Event Espresso"). then the
		 * hook prefix ("event-espresso") will be different.
		 *
		 * @var array
		 */
		$columns = apply_filters( 'FHEE_manage_'.$this->screen->id.'_columns', $this->_columns, $this->_screen );
		return $columns;
	}



	/**
	 * Get an associative array ( id => link ) with the list
	 * of views available on this table.
	 *
	 * @since 3.1.0
	 * @access protected
	 *
	 * @return array
	 */
	public function get_views() {
		return $this->_views;
	}

	public function display_views() {
		$views = $this->get_views();
		$assembled_views = array();

		if ( empty( $views )) {
			return;
		}
		echo "<ul class='subsubsub'>\n";
		foreach ( $views as $view ) {
			$count = isset($view['count'] ) && !empty($view['count']) ? absint( $view['count'] )  : 0;
			if ( isset( $view['slug'], $view['class'], $view['url'], $view['label']) ) {
				$assembled_views[ $view['slug'] ] = "\t<li class='" . $view['class'] . "'>" . '<a href="' . $view['url'] . '">' . $view['label'] . '</a> <span class="count">(' . $count . ')</span>';
			}
		}

		echo ! empty( $assembled_views ) ? implode( " |</li>\n", $assembled_views ) . "</li>\n" : '';
		echo "</ul>";
	}


	/**
	 * Generates content for a single row of the table
	 *
	 * @since 4.1
	 * @access public
	 * @param EE_Base_Class $item The current item
	 */
	public function single_row( $item ) {
		$row_class = $this->_get_row_class( $item );
		echo '<tr class="' . esc_attr( $row_class ) . '">';
		$this->single_row_columns( $item );
		echo '</tr>';
	}


	/**
	 * This simply sets up the row class for the table rows.
	 * Allows for easier overriding of child methods for setting up sorting.
	 *
	 * @param  EE_Base_Class $item the current item
	 * @return string
	 */
	protected function _get_row_class( $item ) {
		static $row_class = '';
		$row_class = ( $row_class === '' ? 'alternate' : '' );

		$new_row_class = $row_class;

		if ( !empty($this->_ajax_sorting_callback) ) {
			$new_row_class .= ' rowsortable';
		}

		return $new_row_class;
	}



	/**
	 * @return array
	 */
	public function get_sortable_columns() {
		return (array) $this->_sortable_columns;
	}



	/**
	 * @return string
	 */
	public function get_ajax_sorting_callback() {
		return $this->_ajax_sorting_callback;
	}



	/**
	 * @return array
	 */
	public function get_hidden_columns() {
		$user_id = get_current_user_id();
		$has_default = get_user_option('default'. $this->screen->id . 'columnshidden', $user_id);
		if ( empty( $has_default ) && !empty($this->_hidden_columns ) ) {
			update_user_option($user_id, 'default'.$this->screen->id . 'columnshidden', TRUE);
			update_user_option($user_id, 'manage' . $this->screen->id . 'columnshidden', $this->_hidden_columns, TRUE );
		}
		$ref = 'manage' . $this->screen->id . 'columnshidden';
		return (array) get_user_option( $ref, $user_id );
	}



	/**
	 * Generates the columns for a single row of the table.
	 * Overridden from wp_list_table so as to allow us to filter the column content for a given
	 * column.
	 *
	 * @since 3.1.0
	 * @param EE_Base_Class $item The current item
	 */
	public function single_row_columns( $item ) {
		list( $columns, $hidden, $sortable, $primary ) = $this->get_column_info();

		global $wp_version;
		$use_hidden_class = version_compare( $wp_version, '4.3-RC', '>=' );

		foreach ( $columns as $column_name => $column_display_name ) {

			/**
			 * With WordPress version 4.3.RC+ WordPress started using the hidden css class to control whether columns are
			 * hidden or not instead of using "display:none;".  This bit of code provides backward compat.
			 */
			$hidden_class = $use_hidden_class && in_array( $column_name, $hidden ) ? ' hidden' : '';
			$style = ! $use_hidden_class && in_array( $column_name, $hidden ) ? ' style="display:none;"' : '';

			$classes = $column_name . ' column-' . $column_name.$hidden_class;
			if ( $primary === $column_name ) {
				$classes .= ' has-row-actions column-primary';
			}

			$data = ' data-colname="' . wp_strip_all_tags( $column_display_name ) . '"';

			$class = "class='$classes'";

			$attributes = "$class$style$data";

			if ( $column_name === 'cb' ) {
				echo '<th scope="row" class="check-column">';
				echo apply_filters( 'FHEE__EE_Admin_List_Table__single_row_columns__column_cb_content', $this->column_cb( $item ), $item, $this );
				echo '</th>';
			}
			elseif ( method_exists( $this, 'column_' . $column_name ) ) {
				echo "<td $attributes>";
				echo apply_filters( 'FHEE__EE_Admin_List_Table__single_row_columns__column_' . $column_name . '__column_content', call_user_func( array( $this, 'column_' . $column_name ), $item ), $item, $this );
				echo $this->handle_row_actions( $item, $column_name, $primary );
				echo "</td>";
			}
			else {
				echo "<td $attributes>";
				echo apply_filters( 'FHEE__EE_Admin_List_Table__single_row_columns__column_default__column_content', $this->column_default( $item, $column_name ), $item, $column_name, $this );
				echo $this->handle_row_actions( $item, $column_name, $primary );
				echo "</td>";
			}
		}
	}



	/**
	 * Extra controls to be displayed between bulk actions and pagination
	 *
	 * @access public
	 * @param string $which
	 * @throws \EE_Error
	 */
	public function extra_tablenav( $which ) {
		if ( $which === 'top' ) {
			$this->_filters();
			echo $this->_get_hidden_fields();
		} else {
			echo '<div class="list-table-bottom-buttons alignleft actions">';
			foreach ( $this->_bottom_buttons as $type => $action ){
				$route = isset( $action['route'] ) ? $action['route'] : '';
				$extra_request = isset( $action['extra_request'] ) ? $action['extra_request'] : '';
				echo $this->_admin_page->get_action_link_or_button(
					$route,
					$type,
					$extra_request,
					'button button-secondary',
					'',
					false
				);
			}
			do_action( 'AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons', $this, $this->_screen );
			echo '</div>';
		}
		//echo $this->_entries_per_page_dropdown;
	}



	/**
	 * Get an associative array ( option_name => option_title ) with the list
	 * of bulk actions available on this table.
	 *
	 * @since 3.1.0
	 * @access protected
	 *
	 * @return array
	 */
	public function get_bulk_actions() {
		return (array) $this->_get_bulk_actions();
	}

	public function process_bulk_action() {
		//this is not used it is handled by the child EE_Admin_Page class (routes).  However, including here for reference in case there is a case where it gets used.
	}



	/**
	 * returns the EE admin page this list table is associated with
	 * @return EE_Admin_Page
	 */
	public function get_admin_page() {
		return $this->_admin_page;
	}



	/**
	 * A "helper" function for all children to provide an html string of
	 * actions to output in their content.  It is preferable for child classes
	 * to use this method for generating their actions content so that it's
	 * filterable by plugins
	 *
	 * @param string        $action_container           what are the html container
	 *                                                  elements for this actions string?
	 * @param string        $action_class               What class is for the container
	 *                                                  element.
	 * @param string        $action_items               The contents for the action items
	 *                                                  container.  This is filtered before
	 *                                                  returned.
	 * @param string        $action_id                  What id (optional) is used for the
	 *                                                  container element.
	 * @param EE_Base_Class $item                       The object for the column displaying
	 *                                                  the actions.
	 * @return string The assembled action elements container.
	 */
	protected function _action_string( $action_items, $item, $action_container = 'ul', $action_class = '', $action_id = '' ) {
		$content = '';
		$action_class = ! empty( $action_class ) ? ' class="' . $action_class . '"' : '';
		$action_id = ! empty( $action_id ) ? ' id="' . $action_id . '"' : '';
		$content .= ! empty( $action_container ) ? '<' . $action_container . $action_class . $action_id . '>' : '';
        try {
            $content .= apply_filters(
                'FHEE__EE_Admin_List_Table___action_string__action_items',
                $action_items,
                $item,
                $this
            );
        } catch (\Exception $e) {
            if (WP_DEBUG) {
                \EE_Error::add_error( $e->getMessage(), __FILE__, __FUNCTION__, __LINE__ );
            }
            $content .= $action_items;
        }
		$content .= ! empty( $action_container ) ? '</' . $action_container . '>' : '';
		return $content;
	}
}
