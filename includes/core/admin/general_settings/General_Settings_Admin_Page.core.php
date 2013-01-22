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
 * General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 settings page.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Questions and Questions groups model is implemented)
 *
 * @package		General_Settings_Admin_Page
 * @subpackage	includes/core/admin/General_Settings_Admin_Page.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class General_Settings_Admin_Page extends EE_Admin_Page {

	/**
	 * _question
	 * holds the specific question object for the question details screen
	 * @var object
	 */
	protected $_question;

	/**
	 * _question_group
	 * holds the specific question group object for the question group details screen
	 * @var object
	 */
	protected $_question_group;



	public function __construct() {
		parent::__construct();
	}



	protected function _init_page_props() {
		$this->page_slug = GEN_SET_PG_SLUG;
		$this->page_label = GEN_SET_LABEL;
	}




	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = GEN_SET_ADMIN_URL;
		$this->_admin_page_title = GEN_SET_LABEL;
		$this->_labels = array(
			'buttons' => array(
				'add_question' => __('Add New Question', 'event_espresso'),
				'edit_question' => __('Edit Question', 'event_espresso'),
				'delete_question' => __('Delete Question', 'event_espresso'),
				'add_question_group' => __('Add New Question Group', 'event_espresso'),
				'edit_question_group' => __('Edit Question Group', 'event_espresso'),
				'delete_question_group' => __('Delete Question Group', 'event_espresso'),
			)
		);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_questions_overview_list_table',
			'question_groups' => '_question_groups_overview_list_table',
			'update_settings' => array(
				'func' => '_insert_or_update_question',
				'args' => array('new_question' => FALSE ),
				'noheader' => TRUE,
				)
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Event Settings'),
					'order' => 10
					),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box')
				),
			'your_organization' => array(
				'nav' => array(
					'label' => __('Your Organization'),
					'order' => 20
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


	protected function _add_screen_options_question_groups() {
		$this->_per_page_screen_option();
	}






	//none of the below group are currently used for Event Categories
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles_add_question() {
		$this->load_scripts_styles_forms();
	}
	public function load_scripts_styles_edit_question() {
		$this->load_scripts_styles_forms();
	}
	public function load_scripts_styles_add_question_group() {
		$this->load_scripts_styles_forms();
	}
	public function load_scripts_styles_edit_question_group() {
		$this->load_scripts_styles_forms();
	}





	public function load_scripts_styles_forms() {
		//styles
		wp_enqueue_style('jquery-ui-style');

		//scripts
		wp_enqueue_script('ee_admin_js');

	}






	protected function _set_list_table_views_default() {
		$this->_views = array();
	}






	protected function _set_list_table_views_question_groups() {
		$this->_views = array();
	}




	private function _set_question_object() {}
	private function _set_question_group_object() {}



	protected function _questions_overview_list_table() {
		$this->display_admin_page_with_sidebar();
	}




	protected function _question_groups_overview_list_table() {
		$this->display_admin_page_with_sidebar();
	}



	
	protected function _question_details( $type = 'add' ) {}
	protected function _delete_questions() {}
	protected function _insert_or_update_question($new_question = TRUE) {}
	protected function _trash_or_restore_questions($trash = TRUE) {}
	protected function _question_group_details( $type = 'add' ) {}
	protected function _delete_question_groups() {}
	protected function _insert_or_update_question_group($new_question_group = TRUE) {}
	protected function _trash_or_restore_question_groups($trash = TRUE) {}


	/***********/
	/* QUERIES */

	public function get_questions( $perpage, $count = FALSE ) {}
	public function get_trashed_questions( $perpage, $count = FALSE ) {}
	public function get_question_groups( $perpage, $count = FALSE ) {}
	public function get_trashed_question_groups( $perpage, $count = FALSE ) {}


} //ends Forms_Admin_Page class