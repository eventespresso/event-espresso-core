<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Answer class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( 'EE_Base_Class.class.php' );
class EE_Question extends EE_Base_Class{
	
	
	/**
	 * question's id
	 * @access protected
	 * @var int
	 */
	protected $_QST_ID=FALSE;
	
	
	/** 
	 * how the question is displayed.eg, "What is your name?"
	 * @access protected
	 * @var string
	 */
	protected $_QST_display_text=NULL;
	
	
	/**
	 * If it's a system name, the column of the attendee column to which this question corresponds
	 * @access protected
	 * @var string
	 */
	protected $_QST_system_name=NULL;
	
	
	/**
	 * Whether the question's textfield, radio button list, etc.  
	 * valid values are: TEXT, TEXTAREA, SINGLE, DROPDOWN, MULTIPLE, DATE
	 * @access protected
	 * @var string 
	 */
	protected $_QST_type=NULL;
	
	
	/**
	 * Indictes whether the question must be answered if presented in a form
	 * @access protected
	 * @var boolean
	 */
	protected $_QST_required=NULL;
	
	
	/**
	 *Text to show when the field isn't entered in a form when it's required
	 * @access protected
	 * @var string
	 */
	protected $_QST_required_text=NULL;
	
	
	/**
	 * Number to indicate where this question ought to appear in the order of questions
	 * @access protected
	 * @var int
	 */
	protected $_QST_order=NULL;
	
	
	/**
	 * Indicates whether this question is for administrators only
	 * @access protected
	 * @var boolena
	 */
	protected $_QST_admin_only=NULL;
	
	/**
	 * 
	 * ID of the WP USEr who created this question
	 * @access protected
	 * @var int
	 */
	protected $_QST_wp_user=NULL;
	
	/**
	 * Boolean to indicate whether this question
	 * has been deleted or not
	 * @access private
	 * @var boolean 
	 */
	protected $_QST_deleted=NULL;
	
	/**
	 * realted answers, lazy-loaded
	 * @var EE_Answer[] 
	 */
	protected $_Answers;
	
	/**
	 * related question groups, lazy-loaded
	 * @var EE_Question_Group[] 
	 */
	protected $_Question_Group;
	
	/**
	 * constructor for questions
	 * @param string $QST_display_text text for displaying the question (eg, "what is your name?")
	 * @param string $QST_system_name if this is a system question, it's internal name
	 * @param string $QST_type one of 'text','textarea',etc.
	 * @param boolean $QST_required indicates whether this question must be answered
	 * @param string $QST_required_text text that's displayed if teh question isn't answered
	 * @param int $QST_order indicates the order in which this question should be displayed relative to others
	 * @param boolean $QST_admin_only indicates whether this question should only been seen by wp admins
	 * @param int $QST_wp_user wordpress user id of the question creator
	 * @param boolean $QST_deleted indicates whether this question has been 'deleted'
	 * @access public
	 */
	public function __construct( 
			$QST_display_text=NULL, 
			$QST_system_name=NULL, 
			$QST_type=NULL, 
			$QST_required=NULL,
			$QST_required_text=NULL,
			$QST_order=NULL,
			$QST_admin_only=NULL,
			$QST_wp_user=NULL,
			$QST_deleted=NULL){
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
	}
	
	/**
	*		Set	Question display text
	* 
	* 		@access		public		
	*		@param		int		$QST_display_text
	*/	
	public function set_display_text( $QST_display_text = FALSE ) {
		if ( ! $this->_check_for( $QST_display_text, 'Display text' )) { return FALSE; }
		$this->_QST_display_text = wp_strip_all_tags( $QST_display_text );
		return TRUE;
	}
	
	
	
	/**
	*		Set	system name
	* 
	* 		@access		public		
	*		@param		int		$QST_system_name
	*/	
	public function set_system_name( $QST_system_name = FALSE ) {
		if ( ! $this->_check_for( $QST_system_name, 'system name' )) { return FALSE; }
		$this->_QST_system_name = wp_strip_all_tags( $QST_system_name );
		return TRUE;
	}
	
	/**
	*		Set	question's type
	* 
	* 		@access		public		
	*		@param		int		$QST_type
	*/	
	public function set_question_type( $QST_type = FALSE ) {
		if ( ! $this->_check_for( $QST_type, 'Question Type' )) { return FALSE; }
		if ( ! in_array($QST_type, $this->_allowed_question_types)) { 
			EE_Error::add_error( sprintf(__("You provided an invalid question type: %s. Valid types are %s"),$QST_type,implode(",",$this->_allowed_question_types)), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE; 
		}
		$this->_QST_type =  $QST_type;
		return TRUE;
	}
	
	/**
	 * Retrieves the list of allowedquestion types from the model.
	 * @return string[]
	 */
	private function _allowed_question_types(){
		$questionModel=$this->_get_model();
		/* @var $questionModel EEM_Question*/
		return $questionModel->allowed_question_types();
	}
	
	/**
	*		Sets whether this question must be answered when presented in a form
	* 
	* 		@access		public		
	*		@param		int		$QST_required
	*/	
	public function set_required( $QST_required = FALSE ) {
		if ( ! $this->_check_for( $QST_required, 'Required' )) { return FALSE; }
		$this->_QST_required = intval( $QST_required );
		return TRUE;
	}
	
	/**
	*		Set	Question display text
	* 
	* 		@access		public		
	*		@param		int		$QST_required_text
	*/	
	public function set_required_text( $QST_required_text = FALSE ) {
		if ( ! $this->_check_for( $QST_required_text, 'Required text' )) { return FALSE; }
		$this->_QST_required_text = wp_strip_all_tags( $QST_required_text );
		return TRUE;
	}
	
	
	
	/**
	*		Sets the order of this question when placed in a sequence of questions
	* 
	* 		@access		public		
	*		@param		int		$QST_order
	*/	
	public function set_order( $QST_order = FALSE ) {
		if ( ! $this->_check_for( $QST_order, 'Order' )) { return FALSE; }
		$this->_QST_order = wp_strip_all_tags( $QST_order );
		return TRUE;
	}
	
	
	
	/**
	*		Sets whether the question is admin-only
	* 
	* 		@access		public		
	*		@param		int		$QST_admin_only
	*/	
	public function set_admin_only( $QST_admin_only = FALSE ) {
		if ( ! $this->_check_for( $QST_admin_only, 'Admin Only' )) { return FALSE; }
		$this->_QST_admin_only = wp_strip_all_tags( $QST_admin_only );
		return TRUE;
	}
	
	
	
	/**
	*		Sets the wordpress user ID on the question
	* 
	* 		@access		public		
	*		@param		int		$QST_wp_user
	*/	
	public function set_wp_user( $QST_wp_user = FALSE ) {
		if ( ! $this->_check_for( $QST_wp_user, 'WP User Id' )) { return FALSE; }
		$this->_QST_wp_user = wp_strip_all_tags( $QST_wp_user );
		return TRUE;
	}
	
	/**
	*		Sets whether teh question has been deleted
	*		(we use this boolean isntead of actually
			deleting it because when users delete this question
	*		they really want to remove the question from future
	*		forms, BUT keep their old answers which depend
	*		on this record actually existing.
	* 
	* 		@access		public		
	*		@param		int		$QST_wp_user
	*/	
	public function set_deleted( $QST_deleted = FALSE ) {
		if ( ! $this->_check_for( $QST_deleted, 'WP User Id' )) { return FALSE; }
		$this->_QST_deleted = wp_strip_all_tags( $QST_deleted );
		return TRUE;
	}
	
	
	/**
	 * returns the text for displaying the question to users
	 * @access public
	 * @return string
	 */
	public function display_text(){
		return $this->get('QST_display_text');
	}
	
	/**
	 * returns the attendee column name for this question
	 * @access public
	 * @return string
	 */
	public function system_name(){
		return $this->get('QST_system_name');
	}
	
	/**
	 * returns either a string of 'text', 'textfield', etc.
	 * @access public
	 * @return boolean
	 */
	public function required(){
		return $this->get('QST_type');
	}
	
	/**
	 * returns the text which should be displayed when a user 
	 * doesn't answer this question in a form
	 * @access public
	 * @return string
	 */
	public function required_text(){
		return $this->get('QST_required_text');
	}
	
	/**
	 * returns an integer showing where this questino should
	 * be placed in a sequence of questions
	 * @access public
	 * @return int
	 */
	public function order(){
		return $this->get('QST_order');
	}
	
	/**
	 * returns whether this question should only appears to admins,
	 * or to everyone
	 * @access public
	 * @return boolean
	 */
	public function admin_only(){
		return $this->get('QST_admin_only');
	}
	
	/**
	 * returns the id the wordpress user who created this question
	 * @access public
	 * @return int
	 */
	public function wp_user(){
		return $this->get('QST_wp_user');
	}
	
	/**
	 * returns whether this question has been marked as 'deleted'
	 * @access public
	 * @return boolean
	 */
	public function deleted(){
		return $this->get('QST_deleted');
	}
	
	/**
	 * Gets an array of related EE_Answer  to this EE_Question
	 * @return EE_Answer[]
	 */
	public function answers(){
		return $this->get_many_related('Answers');
	}
	
	/**
	 * gets an array of EE_Question_Group which relate to thsi question
	 * @return EE_Question_Group[]
	 */
	public function question_groups(){
		return $this->_get_many_related('Question_Groups');
	}
	

}