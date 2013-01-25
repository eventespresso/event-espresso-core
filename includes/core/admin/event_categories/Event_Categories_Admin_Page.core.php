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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Event_Categories_Admin_Page
 *
 * This contains the logic for setting up the Event Category related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 event category related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Event Categories model is setup)
 *
 * @package		Event_Categories_Admin_Page
 * @subpackage	includes/core/admin/Event_Categories_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Categories_Admin_Page extends EE_Admin_Page {


	/**
	 * _category
	 * This will hold the category object for category_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_category;





	public function __construct() {
		parent::__construct();
	}




	protected function _init_page_props() {
		$this->page_slug = 'event_categories';
		$this->page_label = __('Event Categories', 'event_espresso');
	}




	protected function _ajax_hooks() {
		//todo: all hooks for event_categories ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_CATS_ADMIN_URL;
		$this->_admin_page_title = __('Event Categories', 'event_espresso');
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Category', 'event_espresso'),
				'edit' => __('Edit Category', 'event_espresso'),
				'delete' => __('Delete Category', 'event_espresso')
			)
		);
	}





	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_overview_list_table',
			'edit_category' => array(
				'func' => '_category_details',
				'args' => array('edit')
				),
			'add_category' => array(
				'func' => '_category_details',
				'args' => array('add')
				),
			'delete_categories' => array(
				'func' => '_delete_categories', 
				'noheader' => TRUE 
				),
			'delete_category' => array(
				'func' => '_delete_categories', 
				'noheader' => TRUE
				),
			'insert_category' => array(
				'func' => '_insert_or_update_category',
				'args' => array('new_category' => TRUE),
				'noheader' => TRUE
				),
			'update_category' => array(
				'func' => '_insert_or_update_category',
				'args' => array('new_category' => FALSE),
				'noheader' => TRUE
				),
			'export_categories' => array(
				'func' => '_categories_export',
				'noheader' => TRUE
				),
			'import_categories' => '_import_categories',
			'import' => '_import_categories'
		);
	}




	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'Event_Categories_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
				),
			'add_category' => array(
				'nav' => array(
					'label' => __('Add Category', 'event_espresso'),
					'order' => 5,
					'persistent' => false),
				'metaboxes' => array('_publish_post_box')
				),
			'edit_category' => array(
				'nav' => array(
					'label' => __('Edit Category', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['EVT_CAT_ID']) ? add_query_arg(array('EVT_CAT_ID' => $this->_req_data['EVT_CAT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box')
				),
			'import_categories' => array(
				'nav' => array(
					'label' => __('Import', 'event_espresso'),
					'order' => 30
					),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box')
				)
		);
	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}






	//none of the below group are currently used for Event Categories
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles_add_category() {
		$this->load_scripts_styles_edit_category();
	}





	public function load_scripts_styles_edit_category() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('ee_cats_admin_js', EE_CORE_ADMIN_URL . 'event_categories/assets/ee-cat-admin.css', array(), EVENT_ESPRESSO_VERSION );

		//scripts
		wp_enqueue_script('ee_admin_js');
		wp_enqueue_script( 'ee_cats_admin_js', EE_CORE_ADMIN_URL . 'event_categories/assets/ee-cat-admin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
	}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_categories' => __('Delete Permanently', 'event_espresso'),
					'export_categories' => __('Export Categories', 'event_espresso'),
					)
				)
		);
	}





	protected function _overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_category', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}





	protected function _category_details($view) {

		//load formatter helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Formatter.helper.php';
		//load field generator helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';

		$route = $view == 'edit' ? 'update_category' : 'insert_category';
		$this->_set_add_edit_form_tags($route);

		$this->_set_category_object();
		$id = isset($this->_category->id) ? $this->_category->id : '';

		$this->_set_publish_post_box_vars( 'category_id', $id, 'delete_category' );

		//take care of contents
		$this->_template_args['admin_page_content'] = $view == 'edit' ? $this->_edit_category_content() : $this->_add_category_content();
		$this->display_admin_page_with_sidebar();
	}



	protected function _add_category_content() {
		$values=array(
			array('id'=>true,'text'=> __('Yes','event_espresso')),
			array('id'=>false,'text'=> __('No','event_espresso'))
		);
		ob_start();
		?>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="category_name">
							<?php _e('Category Name', 'event_espresso'); ?>
							<em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em></label></th>
					<td><input id="category_name" type="text" name="category_name" /></td>
				</tr>
				<tr>
					<th><label for="cat_id">
							<?php _e('Unique ID', 'event_espresso'); ?>
							<?php do_action('action_hook_espresso_help', 'unique_id_info'); ?>
						</label></th>
					<td><input id="cat_id"  type="text" name="category_identifier" /></td>
				</tr>
				<tr>
					<th><?php _e('Display Category Description in Event Listing?', 'event_espresso'); ?></th>
					<td><?php echo EE_Form_Fields::select_input('display_desc', $values);?></td>
				</tr>
				<tr>
					<td colspan="2"><h4>
							<?php _e('Category Description', 'event_espresso'); ?>
						</h4></td>
				</tr>
				<tr>
					<td colspan="2"><div class="postbox">
							<?php
								$args = array("textarea_rows" => 5, "textarea_name" => "category_desc", "editor_class" => "my_editor_custom");
								wp_editor('', "category_desc", $args);
							?>
							<table id="cat-descr-add-form" cellspacing="0">
								<tbody>
									<tr>
										<td class="aer-word-count"></td>
										<td class="autosave-info"><span>
											<p></p>
											</span></td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- /.postbox --></td>
				</tr>
			</tbody>
		</table>
				
		<div id="unique_id_info" style="display:none">
			<h2><?php _e('Unique Category Identifier', 'event_espresso'); ?></h2>
			<p><?php _e('This should be a unique identifier for the category. Example: "category1" (without qoutes.)', 'event_espresso'); ?></p>
			<p>The<?php _e(' unique ID can also be used in individual pages using the', 'event_espresso'); ?>  	[EVENT_ESPRESSO_CATEGORY event_category_id="category_identifier"] <?php _e('shortcode', 'event_espresso'); ?>.</p>
		</div>	
		
		<?php 
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}






	protected function _edit_category_content() {
		$values=array(
			array('id'=>true,'text'=> __('Yes','event_espresso')),
			array('id'=>false,'text'=> __('No','event_espresso'))
		);
		ob_start();
		?>
		<h4><?php echo $this->_category->category_name ?></h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="category_name">
							<?php _e('Category Name', 'event_espresso'); ?>
							<em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em></label></th>
					<td><input id="category_name" type="text" name="category_name" value="<?php echo $this->_category->category_name;?>" /></td>
				</tr>
				<tr>
					<th><label for="cat_id">
							<?php _e('Unique ID', 'event_espresso'); ?>
							<?php do_action('action_hook_espresso_help', 'unique_id_info'); ?>
						</label></th>
					<td><input id="cat_id"  type="text" name="category_identifier" value="<?php echo $this->_category->category_identifier;?>" /></td>
				</tr>
				<tr>
					<th><?php _e('Display Category Description in Event Listing?', 'event_espresso'); ?></th>
					<td><?php echo EE_Form_Fields::select_input('display_desc', $values, $this->_category->display_desc);?></td>
				</tr>
				<tr>
					<td colspan="2"><h4>
						<?php _e('Category Description', 'event_espresso'); ?>
					</h4></td>
				</tr>
				<tr>
					<td colspan="2">
						<?php 
							$editor_args['category_desc'] = array(
									'type' => 'wp_editor',
									'value' => EE_Formatter::admin_format_content($this->_category->category_desc),
									'class' => 'my_editor_custom'
								);
							$_wp_editor = $this->_generate_admin_form_fields( $editor_args, 'array' );
						?>
						<?php echo $_wp_editor['category_desc']['field']; ?>
						<table id="cat-descr-add-form" cellspacing="0">
							<tbody>
								<tr>
									<td class="aer-word-count"></td>
									<td class="autosave-info"><span>
										<p></p>
										</span></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>

		<div id="unique_id_info" style="display:none">
			<h2><?php _e('Unique Category Identifier', 'event_espresso'); ?></h2>
			<p><?php _e('This should be a unique identifier for the category. Example: "category1" (without qoutes.)', 'event_espresso'); ?></p>
			<p>The<?php _e(' unique ID can also be used in individual pages using the', 'event_espresso'); ?>  	[EVENT_ESPRESSO_CATEGORY event_category_id="category_identifier"] <?php _e('shortcode', 'event_espresso'); ?>.</p>
		</div>	

		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}






	/**
	 * set the _category property with the category object for the loaded page.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_category_object() {
		global $wpdb;
		//only set if we've got an id
		if ( !isset($this->_req_data['EVT_CAT_ID'] ) ) {
			$this->_category = null;
			return;
		}

		$category_id = absint($this->_req_data['EVT_CAT_ID']);
		$sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE . " c WHERE c.id = %d";
		$this->_category = $wpdb->get_row( $wpdb->prepare( $sql, $category_id), OBJECT );

		$this->_category->category_name = stripslashes( $this->_category->category_name );
		$this->_category->category_identifier = stripslashes( $this->_category->category_identifier );
		$this->_category->category_desc = stripslashes( $this->_category->category_desc );
	}






	protected function _delete_categories() {
		$cat_ids = isset( $this->_req_data['EVT_CAT_ID'] ) ? (array) $this->_req_data['EVT_CAT_ID'] : (array) $this->_req_data['category_id'];

		foreach ( $cat_ids as $cat_id ) {
			$this->_delete_category($cat_id);
		}

		//doesn't matter what page we're coming from... we're going to the same place after delete.
		$query_args = array(
			'action' => 'default'
			);
		$this->_redirect_after_action(0,'','',$query_args);

	}





	protected function _delete_category($cat_id) {
		global $wpdb;
		$cat_id = absint( $cat_id );
		$sql = "DELETE FROM " . EVENTS_CATEGORY_TABLE . " WHERE id='%d'";
		$wpdb->query( $wpdb->prepare( $sql, $cat_id ) );

		$sql = "DELETE FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE cat_id='%d'";
		$wpdb->query( $wpdb->prepare( $sql, $cat_id ) );
	}
	



	protected function _insert_or_update_category($new_category) {

		if ( $new_category ) {
			$cat_id = $this->_insert_category();
			$success = 0; //we already have a success message so lets not send another.
			$query_args = array(
				'action' => 'edit_category', 
				'EVT_CAT_ID' => $cat_id
			);
		} else {
			$cat_id = $this->_update_category();
			$success = 0;
			$query_args = array(
				'action' => 'edit_category',
				'EVT_CAT_ID' => $cat_id
			);
		}

		$this->_redirect_after_action( $success, '','', $query_args );

	}



	private function _insert_category() {
		global $wpdb, $espresso_wp_user;
		$cat_id = '';
		$category_name= esc_html($this->_req_data['category_name']);
		$category_identifier = ($this->_req_data['category_identifier'] == '') ? $category_identifier = sanitize_title_with_dashes($category_name.'-'.time()) : $category_identifier = sanitize_title_with_dashes($this->_req_data['category_identifier']);
		$category_desc= esc_html($this->_req_data['category_desc']); 
		$display_category_desc=$this->_req_data['display_desc'];
	
		$sql=array(
			'category_name'=>$category_name, 
			'category_identifier'=>$category_identifier, 
			'category_desc'=>$category_desc, 
			'display_desc'=>$display_category_desc, 
			'wp_user'=>$espresso_wp_user
		);
		
		$sql_data = array('%s','%s','%s','%s','%d');

		if ( FALSE === $wpdb->insert ( EVENTS_CATEGORY_TABLE, $sql, $sql_data ) ) {
			$msg = __( 'An error occured and the category has not been saved to the database.', 'event_espresso', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		} else {
			$cat_id = $wpdb->insert_id;
			$msg = sprintf ( __('The category %s was successfuly created', 'event_espresso'), $category_name );
			EE_Error::add_success( $msg );
		}
		
		return $cat_id;
	}




	private function _update_category() {
		global $wpdb;
		$category_id= $this->_req_data['category_id'];
		$category_name= esc_html($this->_req_data['category_name']);
		$category_identifier = ($this->_req_data['category_identifier'] == '') ? $category_identifier = sanitize_title_with_dashes($category_name.'-'.time()) : $category_identifier = sanitize_title_with_dashes($this->_req_data['category_identifier']);
		$category_desc= esc_html($this->_req_data['category_desc']); 
		$display_category_desc=$this->_req_data['display_desc'];
			
		$sql=array(
			'category_name'=>$category_name,
			'category_identifier'=>$category_identifier,
			'category_desc'=>$category_desc,
			'display_desc'=>$display_category_desc
		); 
			
		$update_id = array('id'=> $category_id);
			
		$sql_data = array('%s','%s','%s','%s');
		
		if ( $wpdb->update( EVENTS_CATEGORY_TABLE, $sql, $update_id, $sql_data, array( '%d' ) ) ){
			$msg = sprintf( __('The category %s has been updated.', 'event_espresso'), $category_name );
			EE_Error::add_success($msg);
		}else { 
			$msg = sprintf( __('The category %s has not been updated', 'event_espresso'), $category_name );
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		return $category_id;
	}





	protected function _categories_export() {

		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'categories',
			'category_ids' => $this->_req_data['EVT_CAT_ID']
			);

		$this->_req_data = array_merge( $this->_req_data, $new_request_args );

		if ( file_exists( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php') ) {
			require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance();
			$EE_Export->export();
		}

	}





	protected function _import_categories() {

		//first check if we've got an incoming import
		//first check if we've got an incoming import
		if (isset($this->_req_data['import'])) {
			if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php')) {
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
				$EE_Import = EE_Import::instance();
				$EE_Import->import();
			}
		}

		include( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/csv_uploader.php' );
		$import_what = 'Event Categories';
		$import_intro = 'If you have a previously exported list of Categories in a Comma Separated Value (CSV) file format, you can upload the file here: ';
		$page = 'event_categories';
		$content = espresso_csv_uploader($import_what, $import_intro, $page);

		$this->_admin_page_title .= $this->_get_action_link_or_button('add_category', 'add', array(), 'button add-new-h2');
		$this->_template_args['admin_page_content'] = $content;	
		$this->display_admin_page_with_sidebar();

	}


	/***********/
	/* QUERIES */


	public function get_categories( $per_page = 10, $current_page = 1, $count = FALSE ) {
		global $wpdb;

		$offset = ($current_page-1)*$per_page; 
		$limit = apply_filters('filter_hook_espresso_category_list_limit', $count ? '' : ' LIMIT ' . $offset . ',' . $per_page, $offset, $per_page);
		$orderby = apply_filters( 'filter_hook_espresso_category_list_orderby', isset($this->_req_data['orderby']) ? " ORDER BY " . $this->_req_data['orderby'] : " ORDER BY c.category_name", $this->_req_data );
		$order = apply_filters( 'filter_hook_espresso_category_list_order', isset($this->_req_data['order']) ? " " . $this->_req_data['order'] : " DESC", $this->_req_data);

		$sql = $count ? "SELECT COUNT(c.id) FROM " . EVENTS_CATEGORY_TABLE . " c" : "SELECT * FROM " . EVENTS_CATEGORY_TABLE . " c";

		$sql = apply_filters('filter_hook_espresso_category_list_sql', $sql);
		$sql .= !$count ? " GROUP BY c.id " . $orderby . $order . $limit : '';

		$categories = $count ? $wpdb->get_var( $sql ) : $wpdb->get_results( $sql );
		return $categories;
	}


	/* end queries */
	/**************/

} //end Event_Categories_Admin_Page class