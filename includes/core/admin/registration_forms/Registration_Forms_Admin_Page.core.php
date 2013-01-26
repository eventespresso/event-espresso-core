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
 * Registration_Forms_Admin_Page
 *
 * This contains the logic for setting up the Custom Forms related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 questions and question groups related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Questions and Questions groups model is implemented)
 *
 * @package		Registration_Forms_Admin_Page
 * @subpackage	includes/core/admin/Registration_Forms_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Forms_Admin_Page extends EE_Admin_Page {

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
		$this->page_slug = 'registration_forms';
		$this->page_label = __('Registration Forms', 'event_espresso');
	}




	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = EE_FORMS_ADMIN_URL;
		$this->_admin_page_title = __('Registration Forms', 'event_espresso');
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
			'add_question' => '_question_details',
			'edit_question' => array(
				'func' => '_question_details',
				'args' => array('edit')
				),
			'delete_questions' => array(
				'func' => '_delete_questions',
				'noheader' => TRUE
				),
			'delete_question' => array(
				'func' => '_delete_questions',
				'noheader' => TRUE
				),
			'insert_question' => array(
				'func' => '_insert_or_update_question',
				'args' => array('new_question' => TRUE),
				'noheader' => TRUE
				),
			'update_question' => array(
				'func' => '_insert_or_update_question',
				'args' => array('new_question' => FALSE ),
				'noheader' => TRUE,
				),
			'trash_question' => array(
				'func' => '_trash_or_restore_question',
				'args' => array('trash' => TRUE),
				'noheader' => TRUE
				),
			'restore_question' => array(
				'func' => '_trash_or_restore_question',
				'args' => array('trash' => FALSE),
				'noheader' => TRUE
				),
			'add_question_group' => '_question_group_details',
			'edit_question_group' => array(
				'func' => '_question_group_details',
				'args' => array('edit')
				),
			'delete_question_groups' => array(
				'func' => '_delete_question_groups',
				'noheader' => TRUE
				),
			'delete_question_group' => array(
				'func' => '_delete_question_groups',
				'noheader' => TRUE
				),
			'insert_question_group' => array(
				'func' => '_insert_or_update_question_group',
				'args' => array('new_question_group' => TRUE),
				'noheader' => TRUE
				),
			'update_question_group' => array(
				'func' => '_insert_or_update_question_group',
				'args' => array('new_question_group' => FALSE ),
				'noheader' => TRUE,
				),
			'trash_question_group' => array(
				'func' => '_trash_or_restore_question_group',
				'args' => array('trash' => TRUE),
				'noheader' => array('trash' => FALSE)
				),
			'restore_question_group' => array(
				'func' => '_trash_or_restore_question_group',
				'args' => array('trash' => FALSE),
				'noheader' => TRUE
				)
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Questions'),
					'order' => 10
					),
				'list_table' => 'Registration_Forms_Questions_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box')
				),
			'question_groups' => array(
				'nav' => array(
					'label' => __('Question Groups'),
					'order' => 20
					),
				'list_table' => 'Registration_Forms_Question_Groups_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box')
				),
			'add_question' => array(
				'nav' => array(
					'label' => __('Add Question', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box')
				),
			'edit_question' => array(
				'nav' => array(
					'label' => __('Edit Question', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['question_id']) ? add_query_arg(array('question_id' => $this->_req_data['question_id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box','_espresso_news_post_box', '_espresso_links_post_box')
				),
			'add_question_group' => array(
				'nav' => array(
					'label' => __('Add Question Group', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'metaboxes' => array('_publish_post_box','_espresso_news_post_box', '_espresso_links_post_box')
				),
			'edit_question_group' => array(
				'nav' => array(
					'label' => __('Edit Question Group', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['question_group_id']) ? add_query_arg(array('question_group_id' => $this->_req_data['question_group_id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box','_espresso_news_post_box', '_espresso_links_post_box'),
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
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_questions' => __('Trash', 'event_espresso'),
					)
				),
			'trash' => array(
				'slug' => 'trash',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_questions' => __('Delete Permanently', 'event_espresso'),
					'restore_questions' => __('Trash', 'event_espresso'),
					)
				),
		);
	}






	protected function _set_list_table_views_question_groups() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_question_groups' => __('Trash', 'event_espresso'),
					)
				),
			'trash' => array(
				'slug' => 'trash',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_question_groups' => __('Delete Permanently', 'event_espresso'),
					'restore_question_groups' => __('Trash', 'event_espresso'),
					)
				),
		);
	}




	private function _set_question_object() {
		echo "set question object called";
		if ( is_object($this->_question) )
			return; //get out we've already set the object
		
		if ( isset($this->_req_data['QST_ID']) ) {
			$this->_set_edit_question_object();
		} else {
			$this->_set_add_question_object();
		}
	}
	
	private function _set_add_question_object(){
		echo "add question";
		global $wpdb,$org_options,$espresso_premium,$current_user;
		get_currentuserinfo();
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		require_once('EEM_Question.model.php');
		$questionModel=EEM_Question::instance();
		
	}
	private function _set_question_group_object() {}



	protected function _questions_overview_list_table() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_question', 'add_question', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}




	protected function _question_groups_overview_list_table() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_question_group', 'add_question_group', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
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
	
	/**
	 * For internal use in getting all the query parameters (because it's pretty well the same between question, question groups, and
	 * for both when searchign for trahsed and untrahse dones)
	 * @param EEM_TempBase $model either EEM_Question or EEM_Question_Group
	 * @return array($orderby,$order,$limit,$output,$searchString)
	 */
	private function get_query_params($model,$per_page=10,$current_page=10,$count=FALSE){
		$offset=($current_page-1)*$per_page;
		$limit=array($offset,$per_page);
		$output=$count?'COUNT':'OBJECT_K';
		$primaryKeyName=$model->primary_key_name();
		$orderby = empty($this->_req_data['orderby']) ? $primaryKeyName : $this->_req_data['orderby'];
		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';
		$searchString=empty($this->_req_data['s'])?'':$this->_req_data['s'];
		$return= array($orderby,$order,$limit,$output,$searchString);
		return $return;
		
	}
	public function get_questions( $per_page=10,$current_page = 1, $count = FALSE ) {
		
		require_once('EEM_Question.model.php');
		$questionModel=EEM_Question::instance();
		list($orderby,$order,$limit,$output,$searchString)=$this->get_query_params($questionModel,$per_page,$current_page,$count);
		if(!empty($searchString)){
			$questions=$questionModel->get_all_where(array('QST_display_text'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}else{
			$questions=$questionModel->get_all_where(null, $orderby, $order, '=', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}
		return $questions;
		
	}
	public function get_trashed_questions( $per_page,$current_page = 1, $count = FALSE ) {
		require_once('EEM_Question.model.php');
		$questionModel=EEM_Question::instance();
		list($orderby,$order,$limit,$output,$searchString)=$this->get_query_params($questionModel,$per_page,$current_page,$count);
		if(!empty($searchString)){
			$questions=$questionModel->get_all_where_deleted(array('QST_display_text'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}else{
			$questions=$questionModel->get_all_where_deleted(null, $orderby, $order, '=', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}
		return $questions;
	}
	public function get_question_groups( $per_page,$current_page = 1, $count = FALSE ) {
		require_once('EEM_Question_Group.model.php');
		$questionGroupModel=EEM_Question_Group::instance();
		list($orderby,$order,$limit,$output,$searchString)=$this->get_query_params($questionGroupModel,$per_page,$current_page,$count);
		if(!empty($searchString)){
			$questionGroups=$questionGroupModel->get_all_where(array('QSG_name'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}else{
			$questionGroups=$questionGroupModel->get_all_where(null, $orderby, $order, '=', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}
		

		return $questionGroups;
	}
	public function get_trashed_question_groups( $per_page,$current_page = 1, $count = FALSE ) {
		require_once('EEM_Question_Group.model.php');
		$questionGroupModel=EEM_Question_Group::instance();
		list($orderby,$order,$limit,$output,$searchString)=$this->get_query_params($questionGroupModel,$per_page,$current_page,$count);
		if(!empty($searchString)){
			$questionGroups=$questionGroupModel->get_all_where_deleted(array('QSG_name'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}else{
			$questionGroups=$questionGroupModel->get_all_where_deleted(null, $orderby, $order, '=', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}
		

		return $questionGroups;
	}


} //ends Registration_Forms_Admin_Page class