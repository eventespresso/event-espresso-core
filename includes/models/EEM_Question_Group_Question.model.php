<?php

require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
/**
 * model for simple join relationship between Questions and Question Groups.
 * Client code will probably never need to use this, as you can easily query questions by question group
 * (and the inverse) using the HABTM relationship present on either; and there's no additional fields on this
 * model other than keys.
 */
class EEM_Question_Group_Question extends EEM_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Question instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}
	protected function __construct(){
		$this->singular_item = __('Question Group to Question Link','event_espresso');
		$this->plural_item = __('Question Group to Question Links','event_espresso');
		$this->_tables = array(
			'Question_Group_Question'=>new EE_Primary_Table('esp_question_group_question','QGQ_ID')
		);
		$this->_fields = array(
			'Question_Group_Question'=>array(
				'QGQ_ID'=>new EE_Primary_Key_Int_Field('QGQ_ID', __('Question Gruop to Question Link ID','event_espresso'), false, 0),
				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', __('Question Gruop ID','event_espresso'), false, 0, 'Question_Group'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question Id','event_espresso'), false, 0, 'Question')
			)
		);
		$this->_model_relations = array(
			'Question_Group'=>new EE_Belongs_To_Relation(),
			'Question'=>new EE_Belongs_To_Relation()
		);
		parent::__construct();
	}
}