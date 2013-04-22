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
 * Registration_Form_Admin_Page
 *
 * This contains the logic for setting up the Custom Forms related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 questions and question groups related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Questions and Questions groups model is implemented)
 *
 * @package		Registration_Form_Admin_Page
 * @subpackage	includes/core/admin/Registration_Form_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Admin_Page extends EE_Admin_Page {

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
	
	/**
	 *_question_model EEM_Question model instance (for queries)
	 * @var EEM_Question
	 */
	protected $_question_model;
	
	/**
	 * _question_group_model EEM_QUestion_group instance (for queries)
	 * @var EEM_Question_Group 
	 */
	protected $_question_group_model;



	public function __construct( $routing = TRUE ) {
		require_once('EEM_Question.model.php');
		require_once('EEM_Question_Group.model.php');
		$this->_question_model=  EEM_Question::instance();
		$this->_question_group_model=EEM_Question_Group::instance();
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = REGISTRATION_FORM_PG_SLUG;
		$this->page_label = __('Registration Form', 'event_espresso');
	}




	protected function _ajax_hooks() {
		add_action('wp_ajax_espresso_update_question_order', array( $this, 'update_question_order' ));
	}





	protected function _define_page_props() {
		$this->_admin_base_url = EE_FORMS_ADMIN_URL;
		$this->_admin_page_title = __('Registration Form', 'event_espresso');
		$this->_labels = array(
			'buttons' => array(
				'edit_question' => __('Edit Question', 'event_espresso')
			)
		);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
		
			'default' => '_questions_overview_list_table',

			'edit_question' => array(
				'func' => '_edit_question',
				'args' => array('edit')
				),

			'update_question' => array(
				'func' => '_insert_or_update_question',
				'args' => array('new_question' => FALSE ),
				'noheader' => TRUE,
				),

			'espresso_update_question_order' => array(
				'func' => 'update_question_order',
				'noheader' => TRUE
				),	
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(

			'default' => array(
				'nav' => array(
					'label' => __('Questions'),
					'order' => 10
					),
				'list_table' => 'Registration_Form_Questions_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box')
				),

			'edit_question' => array(
				'nav' => array(
					'label' => __('Edit Question', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['question_id']) ? add_query_arg(array('question_id' => $this->_req_data['question_id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box','_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),
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
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {
		wp_register_style( 'espresso_registration', REGISTRATION_FORM_ASSETS_URL . 'espresso_registration_form_admin.css', array(), EVENT_ESPRESSO_VERSION );		
		wp_enqueue_style('espresso_registration');		
	}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}



	public function load_scripts_styles_default() {
		wp_enqueue_script( 'espresso_ajax_table_sorting' );	
	}




	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				)
		);
	}



	/**
	 * Extracts the question field's values from the POST request to update or insert them
	 * @return array where each key is the name of a model's field/db column, and each value is its value.
	 */
	protected function _set_column_values_for(EEM_Custom_Table_Base $model){
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$set_column_values=array();
		foreach($model->fields_settings() as $fieldName=>$settings){
			// basically if QSG_identifier is empty or not set
			if ( $fieldName == 'QSG_identifier' && ( isset( $this->_req_data['QSG_identifier'] ) && empty( $this->_req_data['QSG_identifier'] ) || ! isset( $this->_req_data['QSG_identifier'] ) )) {
				$QSG_name = isset( $this->_req_data['QSG_name'] ) ? $this->_req_data['QSG_name'] : '' ;
				$this->_req_data['QSG_identifier'] = strtolower( str_replace( ' ', '-', $QSG_name )) . '-' . uniqid();
			}
			$set_column_values[$fieldName]=array_key_exists($fieldName,$this->_req_data)?$this->_req_data[$fieldName]:null;
		}
		return $set_column_values;//validation fo this data to be performed by the model before insertion.
	}




	protected function _questions_overview_list_table() {
		$this->display_admin_list_table_page_with_sidebar();
	}





	/**
	 * method for performing updates to question order
	 * @return array results array
	 */	
	public function update_question_order() {

		$success = __( 'Question order was updated successfully.', 'event_espresso' );
		
		// grab our row IDs
		$row_ids = isset( $this->_req_data['row_ids'] ) && ! empty( $this->_req_data['row_ids'] ) ? explode( ',', wp_strip_all_tags( $this->_req_data['row_ids'] )) : FALSE;

		if ( is_array( $row_ids )) {
			global $wpdb;
			for ( $i = 0; $i < count( $row_ids ); $i++ ) {
				//Update the questions when re-ordering
				if ( ! EEM_Question::instance()->update ( array( 'QST_order' => $i+1 ), array( 'QST_ID' => $row_ids[$i] ) )) {
					$success = FALSE;
				} 
			}
		} else {
			$success = FALSE;
		}
		
		$errors = ! $success ? __( 'An error occured. The question order was not updated.', 'event_espresso' ) : FALSE;
		
		echo json_encode( array( 'return_data' => FALSE, 'success' => $success, 'errors' => $errors ));
		die();
		
	}


	
	protected function _edit_question( $action= 'add' ) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$ID=isset( $this->_req_data['QST_ID'] ) && ! empty( $this->_req_data['QST_ID'] ) ? absint( $this->_req_data['QST_ID'] ) : FALSE;
		
		$this->_admin_page_title = ucwords( str_replace( '_', ' ', $this->_req_action ));
		// add PRC_ID to title if editing 
		$this->_admin_page_title = $ID ? $this->_admin_page_title . ' # ' . $ID : $this->_admin_page_title;
		if($ID){
			$question=$this->_question_model->get_one_by_ID($ID);
			$additional_hidden_fields=array('QST_ID'=>array('type'=>'hidden','value'=>$ID));
			$this->_set_add_edit_form_tags('update_question', $additional_hidden_fields);
		}else{
			$question=new EE_Question();
			$this->_set_add_edit_form_tags('insert_question');
		}
		$questionTypes=array();
		$count=0;
		foreach($this->_question_model->allowed_question_types() as $type){
			$questionTypes[$count]=array('id'=>$type,'text'=>$type);
			$count++;
		}
		$this->_template_args['QST_ID']=$ID;
		$this->_template_args['question']=$question;
		$this->_template_args['question_types']=$questionTypes;
		
		$this->_set_publish_post_box_vars( 'id', $ID );
		$this->_template_args['admin_page_content'] = espresso_display_template( REGISTRATION_FORM_TEMPLATE_PATH . 'questions_main_meta_box.template.php', $this->_template_args, TRUE );

		// the details template wrapper
		$this->display_admin_page_with_sidebar();	
	}




	protected function _insert_or_update_question($new_question = TRUE) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$success=0;
		$set_column_values=$this->_set_column_values_for($this->_question_model);
		require_once('EE_Question.class.php');
		if($new_question){
			$results=$this->_question_model->insert($set_column_values);
			if($results){
				$success=1;
				$ID=$results['new-ID'];
			}else{
				$success=0;
				$ID=false;
			}
			$action_desc='created';
		}else{
			$ID=absint($this->_req_data['QST_ID']);
			$pk=$this->_question_model->primary_key_name();
			$wheres=array($pk=>$ID);
			unset($set_column_values[$pk]);
			$success= $this->_question_model->update($set_column_values,$wheres);
			$action_desc='updated';
		}
		//save the related options
		//trash removed options, save old ones
			//get list of all options
		$question=$this->_question_model->get_one_by_ID($ID);
		$options=$question->options();
		if(!empty($options)){
			foreach($options as $option_ID=>$option){
				$option_req_index=$this->_get_option_req_data_index($option_ID);
				if($option_req_index!==FALSE){
					$option->save($this->_req_data['question_options'][$option_req_index]);
				}else{
					//not found, remove it
					$option->delete();
				}
			}
		}
		//save new related options
		foreach($this->_req_data['question_options'] as $index=>$option_req_data){
			if(empty($option_req_data['QSO_ID']) && (!empty($option_req_data['QSO_name']) || !empty($option_req_data['QSO_value']))){//no ID! save it!
				if(empty($option_req_data['QSO_value'])){
					$option_req_data['QSO_value']=$option_req_data['QSO_name'];
				}
				if(empty($option_req_data['QSO_name'])){
					$option_req_data['QSO_name']=$option_req_data['QSO_value'];
				}
				$new_option=new EE_Question_Option($option_req_data['QSO_name'], $option_req_data['QSO_value'], $question->ID());
				$new_option->save();
			}
		}
		$query_args=array('action'=>'edit_question','QST_ID'=>$ID);
		$this->_redirect_after_action($success, $this->_question_model->item_name($success), $action_desc, $query_args);
	}



	
	/**
	 * Upon saving a question, there should be an array of 'question_options'. This array is index numerically, but not by ID 
	 * (this is done because new question optiosn don't have an ID, but we may want to add multiple simultaneously).
	 * So, this function gets the index in that request data array called question_options. Returns FALSE if not found.
	 * @param int $ID of the question option to find
	 * @return int indexin in question_options array if successful, FALSE if unsuccessful
	 */
	protected function _get_option_req_data_index($ID){
		$req_data_for_question_options=$this->_req_data['question_options'];
		foreach($req_data_for_question_options as $num=>$option_data){
			if(array_key_exists('QSO_ID',$option_data) && intval($option_data['QSO_ID'])==$ID){
				return $num;
			}
		}
		return FALSE;
	}




	/***********/
	/* QUERIES */


	
	/**
	 * For internal use in getting all the query parameters (because it's pretty well the same between question, question groups, and
	 * for both when searchign for trahsed and untrahse dones)
	 * @param EEM_TempBase $model either EEM_Question or EEM_Question_Group
	 * @return array($order,$limit,$output,$searchString)
	 */
	protected function get_query_params($model,$per_page=10,$current_page=10,$count=FALSE){
		$offset=($current_page-1)*$per_page;
		$limit=array($offset,$per_page);
		$output=$count?'COUNT':'OBJECT_K';
		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';
		$searchString=empty($this->_req_data['s'])?'':$this->_req_data['s'];
		$return= array($order,$limit,$output,$searchString);
		return $return;
		
	}



	public function get_questions( $per_page=10,$current_page = 1, $count = FALSE ) {		
		list($order,$limit,$output,$searchString)=$this->get_query_params(EEM_Question::instance(),$per_page,$current_page,$count);		
		$orderby = empty($this->_req_data['orderby']) ? 'QST_order' : $this->_req_data['orderby'];		
		if(!empty($searchString)){
			//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
			$questions=EEM_Question::instance()->get_all_where(array('QST_display_text'=>'%'.$searchString.'%'), $orderby, $order, 'LIKE', $limit,$output);
		}else{
			//note: this a subclass of EEM_Soft_Delete_Base, so thsi is actually only getting nontrashed items
			$questions=EEM_Question::instance()->get_all_where(null, $orderby, $order, '=', $limit,$output);
		}
		return $questions;
		
	}



} //ends Registration_Form_Admin_Page class