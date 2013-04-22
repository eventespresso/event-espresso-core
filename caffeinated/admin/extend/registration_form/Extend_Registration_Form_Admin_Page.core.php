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
 * Extend_Registration_Form_Admin_Page
 *
 * This is the caffeinated version of the Registration Form admin pages.
 *
 * @package		Extend_Registration_Form_Admin_Page
 * @subpackage	caffeinated/admin/extend/Extend_Registration_Form_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Registration_Form_Admin_Page extends Registration_Form_Admin_Page {

	

	public function __construct() {
		parent::__construct();
		define( 'REGISTRATION_FORM_CAF_ADMIN', EE_CORE_CAF_ADMIN_EXTEND . 'registration_form' . DS );
		define( 'REGISTRATION_FORM_CAF_ASSETS_PATH', REGISTRATION_FORM_CAF_ADMIN . 'assets' . DS );		
		define( 'REGISTRATION_FORM_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registration_form/assets/' );	
		define( 'REGISTRATION_FORM_CAF_TEMPLATE_PATH', REGISTRATION_FORM_CAF_ADMIN . 'templates' . DS );	
		define( 'REGISTRATION_FORM_CAF_TEMPLATE_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registration_form/templates/' );
	}

	
	



	protected function _extend_page_config() {
		$new_page_routes = array(
			'question_groups' => '_question_groups_overview_list_table',
			'add_question' => '_edit_question',
			'insert_question' => array(
				'func' => '_insert_or_update_question',
				'args' => array('new_question' => TRUE),
				'noheader' => TRUE
				),

			'trash_question' => array(
				'func' => '_trash_question',
				'noheader' => TRUE
				),

			'delete_question' => array(
				'func' => '_delete_question',
				'noheader' => TRUE
				),

			'trash_questions' => array(
				'func' => '_trash_or_restore_questions',
				'args' => array('trash' => TRUE),
				'noheader' => TRUE
				),

			'restore_questions' => array(
				'func' => '_trash_or_restore_questions',
				'args' => array('trash' => FALSE),
				'noheader' => TRUE
				),

			'delete_questions'=>array(
				'func'=>'_delete_questions',
				'args'=>array(),
				'noheader'=>TRUE
			),

			'add_question_group' => '_edit_question_group',

			'edit_question_group' => array(
				'func' => '_edit_question_group',
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
				'func' => '_trash_or_restore_question_groups',
				'args' => array('trash' => TRUE),
				'noheader' => array('trash' => FALSE)
				),

			'restore_question_group' => array(
				'func' => '_trash_or_restore_question_groups',
				'args' => array('trash' => FALSE),
				'noheader' => TRUE
				),


			'espresso_update_question_group_order' => array(
				'func' => 'update_question_group_order',
				'noheader' => TRUE
				),

			'view_reg_form_settings'	=> '_reg_form_settings',
			
			'update_reg_form_settings'	=> array(
					'func' => '_update_reg_form_settings',
					'noheader' => TRUE
				),
			);
		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(

			'question_groups' => array(
				'nav' => array(
					'label' => __('Question Groups'),
					'order' => 20
					),
				'list_table' => 'Registration_Form_Question_Groups_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box')
				),

			'view_reg_form_settings'	=> '_reg_form_settings',
			
			'update_reg_form_settings'	=> array(
					'func' => '_update_reg_form_settings',
					'noheader' => TRUE
				),

			'add_question' => array(
				'nav' => array(
					'label' => __('Add Question', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),

			'add_question_group' => array(
				'nav' => array(
					'label' => __('Add Question Group', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'metaboxes' => array('_publish_post_box','_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),

			'edit_question_group' => array(
				'nav' => array(
					'label' => __('Edit Question Group', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['question_group_id']) ? add_query_arg(array('question_group_id' => $this->_req_data['question_group_id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box','_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				),

			'view_reg_form_settings' => array(
				'nav' => array(
					'label' => __('Reg Form Settings', 'event_espresso'),
					'order' => 40
					),
				'labels' => array(
					'publishbox' => __('Update Settings', 'event_espresso')
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'help_tabs' => array(
					'recaptcha_info' => array(
						'title' => __('reCAPTCHA Information', 'event_espresso'),
						'callback' => 'recaptcha_info_help_tab'
						)
					)
				)

			);
		$this->_page_config = array_merge( $this->_page_config, $new_page_config );

		//change the list table we're going to use so it's the NEW list table!
		$this->_page_config['default']['list_table'] = 'Extend_Registration_Form_Questions_Admin_List_Table';


		//additional labels
		$new_labels = array(
			'add_question' => __('Add New Question', 'event_espresso'),
			'delete_question' => __('Delete Question', 'event_espresso'),
			'add_question_group' => __('Add New Question Group', 'event_espresso'),
			'edit_question_group' => __('Edit Question Group', 'event_espresso'),
			'delete_question_group' => __('Delete Question Group', 'event_espresso'),
			);
		$this->_labels['buttons'] = array_merge( $this->_labels['buttons'], $new_labels );

	}




	public function load_scripts_styles_question_groups() {
		wp_enqueue_script( 'espresso_ajax_table_sorting' );	
	}



	public function load_scripts_styles_add_question() {
		$this->load_scripts_styles_forms();
		wp_register_script( 'espresso_registration_form_single', REGISTRATION_FORM_CAF_ASSETS_URL . 'espresso_registration_form_admin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'espresso_registration_form_single' );	
	}
	public function load_scripts_styles_edit_question() {
		$this->load_scripts_styles_forms();
		wp_register_script( 'espresso_registration_form_single', REGISTRATION_FORM_CAF_ASSETS_URL . 'espresso_registration_form_admin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'espresso_registration_form_single' );	
		
	}
	public function load_scripts_styles_add_question_group() {
		$this->load_scripts_styles_forms();
	}
	public function load_scripts_styles_edit_question_group() {
		$this->load_scripts_styles_forms();
	}




	public function recaptcha_info_help_tab() {
		$template = REGISTRATION_FORM_CAF_TEMPLATE_PATH . 'recaptcha_info_help_tab.template.php';
		espresso_display_template($template, array());
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
					'restore_questions' => __('Restore', 'event_espresso'),
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
					'restore_question_groups' => __('Restore', 'event_espresso'),
					)
				),
		);
	}



	protected function _questions_overview_list_table() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_question', 'add_question', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}



	protected function _question_groups_overview_list_table() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_question_group', 'add_question_group', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}



	protected function _trash_question(){
		$success=$this->_question_model->delete_by_ID(intval($this->_req_data['QST_ID']));
		$query_args=array('action'=>'default','status'=>'all');
		$this->_redirect_after_action($success, $this->_question_model->item_name($success), 'trashed', $query_args);
	}



	protected function _trash_or_restore_questions($trash=TRUE){
		$this->_trash_or_restore_items( $this->_question_model, $trash );
	}


	protected function _delete_question(){
		$success=$this->_question_model->delete_permanently_by_ID(intval($this->_req_data['QST_ID']));
		$query_args=array('action'=>'default','status'=>'all');
		$this->_redirect_after_action($success, $this->_question_model->item_name($success), 'deleted', $query_args);
	}



	protected function _delete_questions() {
		$this->_delete_items($this->_question_model);
	}



	private function _delete_items(EEM_TempBase $model){
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {			
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru bulk action checkboxes
			while (list( $ID, $value ) = each($this->_req_data['checkbox'])) {

				if (!$model->delete_permanently_by_ID(absint($ID))) {
					$success = 0;
				}
			}
	
		}
		$this->_redirect_after_action( $success, $model->item_name($success), 'deleted permanently', array( 'action'=>'default', 'status'=>'all' ));
	}




	/******************************    QUESTION GROUPS    ******************************/




	protected function _edit_question_group( $type = 'add' ) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$ID=isset( $this->_req_data['QSG_ID'] ) && ! empty( $this->_req_data['QSG_ID'] ) ? absint( $this->_req_data['QSG_ID'] ) : FALSE;
		$this->_admin_page_title = ucwords( str_replace( '_', ' ', $this->_req_action ));
		// add ID to title if editing 
		$this->_admin_page_title = $ID ? $this->_admin_page_title . ' # ' . $ID : $this->_admin_page_title;
		if($ID){
			$questionGroup=$this->_question_group_model->get_one_by_ID($ID);
			$additional_hidden_fields=array('QSG_ID'=>array('type'=>'hidden','value'=>$ID));
			$this->_set_add_edit_form_tags('update_question_group', $additional_hidden_fields);
		}else{
			$questionGroup=new EE_Question_Group();
			$this->_set_add_edit_form_tags('insert_question_group');
		}
		$this->_template_args['values'] = $this->_yes_no_values;
		$this->_template_args['all_questions']=$this->_question_model->get_all();
		$this->_template_args['QSG_ID']=$ID ? $ID : TRUE;
		$this->_template_args['question_group']=$questionGroup;
		
		$redirect_URL = add_query_arg( array( 'action' => 'question_groups'), $this->_admin_base_url );
		$this->_set_publish_post_box_vars( 'id', $ID, FALSE, $redirect_URL  );
		$this->_template_args['admin_page_content'] = espresso_display_template( REGISTRATION_FORM_CAF_TEMPLATE_PATH . 'question_groups_main_meta_box.template.php', $this->_template_args, TRUE );

		// the details template wrapper
		$this->display_admin_page_with_sidebar();	
	}




	protected function _delete_question_groups() {}



	protected function _insert_or_update_question_group( $new_question_group = TRUE) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$success=0;
		$set_column_values=$this->_set_column_values_for($this->_question_group_model);
		require_once('EE_Question_Group.class.php');
		if($new_question_group){
			$results=$this->_question_group_model->insert($set_column_values);
			if($results){
				$success=1;
				$ID=$results['new-ID'];
			}else{
				$success=0;
				$ID=false;
			}
			$action_desc='created';
		}else{
			$ID=absint($this->_req_data['QSG_ID']);
			$pk=$this->_question_group_model->primary_key_name();
			$wheres=array($pk=>$ID);
			unset($set_column_values[$pk]);
			$success= $this->_question_group_model->update($set_column_values,$wheres);
			$action_desc='updated';
		}
		//save the related questions
		$question_group=$this->_question_group_model->get_one_by_ID($ID);
		$questions=$question_group->questions();
		foreach(array_keys($questions) as $question_ID){
			
			if(array_key_exists('questions',$this->_req_data) && array_key_exists($question_ID,$this->_req_data['questions'])){
				$question_group->add_question($question_ID);
			}else{
				//not found, remove it
				$question_group->remove_question($question_ID);
			}
		}
		//save new related questions
		if(array_key_exists('questions',$this->_req_data)){
			foreach(array_keys($this->_req_data['questions']) as $question_ID){
				$question_group->add_question($question_ID);
			}
		}
		$query_args=array('action'=>'edit_question_group','QSG_ID'=>$ID);
		$this->_redirect_after_action($success, $this->_question_group_model->item_name($success), $action_desc, $query_args);
		
	}



	protected function _trash_or_restore_question_groups($trash = TRUE) {
		return $this->_trash_or_restore_items( $this->_question_group_model, $trash );
	}



	/**
	 * Interally used to delete or restore items, using the request data. Meant to be 
	 * flexible between question or question gruops
	 * @param EEM_TempBase $model
	 * @param boolean $trash wehter to trash or restore
	 */
	private function _trash_or_restore_items( EEM_TempBase $model, $trash = TRUE ) {
		
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		
		$success = 1;
		//Checkboxes
		//echo "trash $trash";
		//var_dump($this->_req_data['checkbox']);die;
		if ( isset( $this->_req_data['checkbox'] )) {
			if ( isset( $this->_req_data['checkbox'] ) && ! empty( $this->_req_data['checkbox'] ) && is_array( $this->_req_data['checkbox'] )) {			
				// if array has more than one element than success message should be plural
				$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
				// cycle thru bulk action checkboxes
				while (list( $ID, $value ) = each($this->_req_data['checkbox'])) {
					if ( ! $model->delete_or_restore_by_ID($trash,absint($ID))) {
						$success = 0;
					}				
				}
		
			} else {
				// grab single id and delete
				$ID = absint($this->_req_data['checkbox']);
				if ( ! $model->delete_or_restore_by_ID($trash,$ID)) {
					$success = 0;
				}			
			}
		
		} else {
			// delete via trash link
			// grab single id and delete
			$ID = absint($this->_req_data[ $model->primary_key_name() ]);
			if ( ! $model->delete_or_restore_by_ID($trash,$ID)) {
				$success = 0;
			}	
				
		}
		

		$action = strtolower( $model->item_name() . 's' );
		$action = 'questions' ? 'default' : $action;
		$action_desc = $trash?'trashed':'restored';
		
		$this->_redirect_after_action( $success, $model->item_name($success), $action_desc, array( 'action' => $action, 'status'=>'all' ) );
	}




	public function get_trashed_questions( $per_page,$current_page = 1, $count = FALSE ) {
		list($order,$limit,$output,$searchString)=$this->get_query_params(EEM_Question::instance(),$per_page,$current_page,$count);
		$orderby = empty($this->_req_data['orderby']) ? 'QST_order' : $this->_req_data['orderby'];		
		if(!empty($searchString)){
			//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
			$questions=EEM_Question::instance()->get_all_where_deleted(array('QST_display_text'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);
		}else{
			//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
			$questions=EEM_Question::instance()->get_all_where_deleted(null, $orderby, $order, '=', $limit,$output);
		}
		return $questions;
	}



	public function get_question_groups( $per_page,$current_page = 1, $count = FALSE ) {
		$questionGroupModel=EEM_Question_Group::instance();
		list($order,$limit,$output,$searchString)=$this->get_query_params($questionGroupModel,$per_page,$current_page,$count);
		$orderby = empty($this->_req_data['orderby']) ? 'QSG_order' : $this->_req_data['orderby'];		
		if(!empty($searchString)){
			$questionGroups=$questionGroupModel->get_all_where(array('QSG_name'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}else{
			$questionGroups=$questionGroupModel->get_all_where(null, $orderby, $order, '=', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}
		

		return $questionGroups;
	}



	public function get_trashed_question_groups( $per_page,$current_page = 1, $count = FALSE ) {
		$questionGroupModel=EEM_Question_Group::instance();
		list($order,$limit,$output,$searchString)=$this->get_query_params($questionGroupModel,$per_page,$current_page,$count);
		$orderby = empty($this->_req_data['orderby']) ? 'QSG_order' : $this->_req_data['orderby'];		
		if(!empty($searchString)){
			$questionGroups=$questionGroupModel->get_all_where_deleted(array('QSG_name'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}else{
			$questionGroups=$questionGroupModel->get_all_where_deleted(null, $orderby, $order, '=', $limit,$output);//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
		}
		

		return $questionGroups;
	}


	/**
	 * method for performing updates to question order
	 * @return array results array
	 */	
	public function update_question_group_order() {

		$success = __( 'Question group order was updated successfully.', 'event_espresso' );
		
		// grab our row IDs
		$row_ids = isset( $this->_req_data['row_ids'] ) && ! empty( $this->_req_data['row_ids'] ) ? explode( ',', wp_strip_all_tags( $this->_req_data['row_ids'] )) : FALSE;

		if ( is_array( $row_ids )) {
			global $wpdb;
			for ( $i = 0; $i < count( $row_ids ); $i++ ) {
				//Update the questions when re-ordering
				if ( ! EEM_Question_Group::instance()->update ( array( 'QSG_order' => $i+1 ), array( 'QSG_ID' => $row_ids[$i] ) )) {
					$success = FALSE;
				} 
			}
		} else {
			$success = FALSE;
		}
		
		$errors = ! $success ? __( 'An error occured. The question group order was not updated.', 'event_espresso' ) : FALSE;
		
		echo json_encode( array( 'return_data' => FALSE, 'success' => $success, 'errors' => $errors ));
		die();
		
	}





	/***************************************		REGISTRATION SETTINGS 		***************************************/





	protected function _reg_form_settings() {
	
		global $org_options;
		$this->_template_args['values'] = $this->_yes_no_values;
		
		$this->_template_args['use_captcha'] = isset( $org_options['use_captcha'] ) ? absint( $org_options['use_captcha'] ) : FALSE;
		$this->_template_args['show_captcha_settings'] = $this->_template_args['use_captcha'] ? 'style="display:table-row;"': ''; 
		
		$this->_template_args['recaptcha_publickey'] = isset( $org_options['recaptcha_publickey'] ) ? stripslashes( $org_options['recaptcha_publickey'] ) : '';
		$this->_template_args['recaptcha_privatekey'] = isset( $org_options['recaptcha_privatekey'] ) ? stripslashes( $org_options['recaptcha_privatekey'] ) : '';
		$this->_template_args['recaptcha_width'] = isset( $org_options['recaptcha_width'] ) ? absint( $org_options['recaptcha_width'] ) : 500;
		
		$this->_template_args['recaptcha_theme_options'] = array(
				array('id'  => 'red','text'=> __('Red', 'event_espresso')),
				array('id'  => 'white','text'=> __('White', 'event_espresso')),
				array('id'  => 'blackglass','text'=> __('Blackglass', 'event_espresso')),
				array('id'  => 'clean','text'=> __('Clean', 'event_espresso'))
			);
		$this->_template_args['recaptcha_theme'] = isset( $org_options['recaptcha_theme'] ) ? $this->_display_nice( $org_options['recaptcha_theme'] ) : 'clean';
	
		$this->_template_args['recaptcha_language_options'] = array(
				array('id'  => 'en','text'=> __('English', 'event_espresso')),
				array('id'  => 'es','text'=> __('Spanish', 'event_espresso')),
				array('id'  => 'nl','text'=> __('Dutch', 'event_espresso')),
				array('id'  => 'fr','text'=> __('French', 'event_espresso')),
				array('id'  => 'de','text'=> __('German', 'event_espresso')),
				array('id'  => 'pt','text'=> __('Portuguese', 'event_espresso')),
				array('id'  => 'ru','text'=> __('Russian', 'event_espresso')),
				array('id'  => 'tr','text'=> __('Turkish', 'event_espresso'))
			);		
		$this->_template_args['recaptcha_language'] = isset( $org_options['recaptcha_language'] ) ? $this->_display_nice( $org_options['recaptcha_language'] ) : 'en';

		$this->_set_add_edit_form_tags( 'update_reg_form_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( REGISTRATION_FORM_CAF_TEMPLATE_PATH . 'reg_form_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
	}

	protected function _update_reg_form_settings() {
		
		$data = array();

		$data['use_captcha'] = isset( $this->_req_data['use_captcha'] ) ? absint( $this->_req_data['use_captcha'] ) : FALSE;
		$data['recaptcha_publickey'] = isset( $this->_req_data['recaptcha_publickey'] ) ? sanitize_text_field( $this->_req_data['recaptcha_publickey'] ) : NULL;
		$data['recaptcha_privatekey'] = isset( $this->_req_data['recaptcha_privatekey'] ) ? sanitize_text_field( $this->_req_data['recaptcha_privatekey'] ) : NULL;
		$data['recaptcha_width'] = isset( $this->_req_data['recaptcha_width'] ) ? absint( $this->_req_data['recaptcha_width'] ) : 500;
		$data['recaptcha_theme'] = isset( $this->_req_data['recaptcha_theme'] ) ? sanitize_text_field( $this->_req_data['recaptcha_theme'] ) : 'clean';
		$data['recaptcha_language'] = isset( $this->_req_data['recaptcha_language'] ) ? sanitize_text_field( $this->_req_data['recaptcha_language'] ) : 'en';
		
		$data = apply_filters('filter_hook_espresso_reg_form_settings_save', $data);	
		
		$what = 'Registration Options';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'view_reg_form_settings' ) );
		
	}

}