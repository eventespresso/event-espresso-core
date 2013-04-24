<?php


///////////////////////////////////////////////////////////////////////////////////////////////
//concrete children of EEMerimental_Base
//class EEM_Event extends EEMerimental_Base{
//	// private instance of the Attendee object
//	private static $_instance = NULL;
//
//	/**
//	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
//	 *
//	 *		@access public
//	 *		@return EEM_Attendee instance
//	 */	
//	public static function instance(){
//	
//		// check if instance of EEM_Attendee already exists
//		if ( self::$_instance === NULL ) {
//			// instantiate Espresso_model 
//			self::$_instance = new self();
//		}
//		// EEM_Attendee object
//		return self::$_instance;
//	}
//
//	
//	protected function __construct(){
//		$this->_tables = array(
//			'Event' => new EE_Main_Table('posts','ID'),
//			'Event_Meta' => new EE_Secondary_Table('postmeta','meta_id', 'post_id',"Event.post_type = 'page'"));
//		$this->_model_relations = array(
//			'Registration'=>new EE_Has_Many_Relation(),
//			'Question_Group'=>new EE_HABTM_Relation('Event_Question_Group'),
//			'Event_Question_Group'=>new EE_Has_Many_Relation());
//		$this->_fields = array(
//				'Event'=>array(
//					'EVT_ID'=>new EE_Primary_Key_Int_Field('ID', 'Event ID', false, 0),
//					'EVT_desc'=>new EE_HTML_Field('post_content','Event Description',true,''),
//					'db_only_post_type'=>new EE_DB_Only_Text_Field('post_type','All Post types for Events should be \'event\'',false,'event')),
//				'Event_Meta'=>array(
//					'EVT_metakey1'=>new EE_Plain_Text_Field('meta_key','Dunno',true,'foobarplaintext'),
//					'EVT_metaval1'=>new EE_HTML_Field('meta_value', 'DUnnoeither', true, 'foobrarval')
//				)			
//			);
//		parent::__construct();
//	}
//}
//class EEM_Question_Group extends EEMerimental_Base{
//	// private instance of the Attendee object
//	private static $_instance = NULL;
//
//	/**
//	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
//	 *
//	 *		@access public
//	 *		@return EEM_Attendee instance
//	 */	
//	public static function instance(){
//	
//		// check if instance of EEM_Attendee already exists
//		if ( self::$_instance === NULL ) {
//			// instantiate Espresso_model 
//			self::$_instance = new self();
//		}
//		// EEM_Attendee object
//		return self::$_instance;
//	}
//
//	protected function __construct(){
//		$this->_tables = array(
//			'Question_Group'=>new EE_Main_Table('esp_question_group','QSG_ID')
//		);
//		$this->_model_relations = array(
//			//woudl add a BelongsTorelation to events and other relations here
//			'Event'=> new EE_HABTM_Relation('Event_Question_Group'),
//		);
//		$this->_fields = array(
//			'Question_Group'=>array(
//				'QSG_ID'=>new EE_Primary_Key_Int_Field('QSG_ID', 'Question Group ID', false, 0),
//				'QSG_name'=>new EE_HTML_Field('QSG_name', 'Question Gruop Name', false, time()),
//				'QSG_identifier'=>new EE_Plain_Text_Field('QSG_identifier', 'Unique ID for Question Group', false, time())
//			)
//		);
//		parent::__construct();
//	}
//}
////model for the joining between events and question groups
//class EEM_Event_Question_Group extends EEMerimental_Base{
//	// private instance of the Attendee object
//	private static $_instance = NULL;
//
//	/**
//	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
//	 *
//	 *		@access public
//	 *		@return EEM_Attendee instance
//	 */	
//	public static function instance(){
//	
//		// check if instance of EEM_Attendee already exists
//		if ( self::$_instance === NULL ) {
//			// instantiate Espresso_model 
//			self::$_instance = new self();
//		}
//		// EEM_Attendee object
//		return self::$_instance;
//	}
//
//	protected function __construct(){
//		$this->_tables = array(
//			'Event_Question_Group'=>new EE_Main_Table('esp_event_question_group','EQG_ID')
//		);
//		$this->_model_relations = array(
//			//woudl add a BelongsTorelation to events and other relations here
//			'Question_Group'=> new EE_Belongs_To_Relation(),
//			'Event'=>new EE_Belongs_To_Relation()
//		);
//		$this->_fields = array(
//			'Event_Question_Group'=>array(
//				'EQG_ID'=>new EE_Primary_Key_Int_Field('EQG_ID', 'Relation ID between Event and Question Group', false, 0),
//				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
//				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID','Question Group ID',false, 0, 'Question_Group'),
//				'EQG_primary'=>new EE_Integer_Field_Base('EQG_primary','Whether this Question Group only applies to primary attendees',false,0)
//			)
//		);
//		parent::__construct();
//	}
//}
//class EEM_Registration extends EEMerimental_Base{
//	// private instance of the Attendee object
//	private static $_instance = NULL;
//
//	/**
//	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
//	 *
//	 *		@access public
//	 *		@return EEM_Attendee instance
//	 */	
//	public static function instance(){
//	
//		// check if instance of EEM_Attendee already exists
//		if ( self::$_instance === NULL ) {
//			// instantiate Espresso_model 
//			self::$_instance = new self();
//		}
//		// EEM_Attendee object
//		return self::$_instance;
//	}
//
//	protected function __construct(){
//		$this->_tables = array(
//			'Registration'=>new EE_Main_Table('esp_registration','REG_ID')
//		);
//		$this->_model_relations = array(
//			//woudl add a BelongsTorelation to events and other relations here
//			'Transaction'=> new EE_Belongs_To_Relation(),
//			'Event'=>new EE_Belongs_To_Relation()
//		);
//		$this->_fields = array(
//			'Registration'=>array(
//				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', 'Registration ID', false, 0),
//				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
//				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID','Transaction ID',false, 0, 'Transaction'),
//				'STS_ID'=>new EE_Enum_Field('STS_ID','Status Code',false,'RNA',array('RAP','RCN','RNA','RPN'))
//			)
//			
//		);
//		parent::__construct();
//	}
//}
//class EEM_Transaction extends EEMerimental_Base{
//	// private instance of the Attendee object
//	private static $_instance = NULL;
//
//	/**
//	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
//	 *
//	 *		@access public
//	 *		@return EEM_Attendee instance
//	 */	
//	public static function instance(){
//	
//		// check if instance of EEM_Attendee already exists
//		if ( self::$_instance === NULL ) {
//			// instantiate Espresso_model 
//			self::$_instance = new self();
//		}
//		// EEM_Attendee object
//		return self::$_instance;
//	}
//
//	
//	protected function __construct(){
//		$this->_tables = array(
//			'Transaction'=>new EE_Main_Table('esp_transaction','TXN_ID')
//		);
//		$this->_model_relations = array(
//			'Registration'=>new EE_Has_Many_Relation(),
//			//woudl add a BelongsTorelation to events and other relations here
//		);
//		$this->_fields = array(
//			'Transaction'=>array(
//				'TXN_ID'=>new EE_Primary_Key_Int_Field('TXN_ID', 'Transaction ID', false, 0),
//				'STS_ID'=>new EE_Enum_Field('STS_ID','Status Code',false,'RNA',array('TIN','TCM','TPN','TOP'))
//			)
//			
//		);
//		parent::__construct();
//	}
//}
///////////////////////////////////////////////////////////////////////////////////////////////
//model field classes















///////////////////////////////////////////////////////////////////////////////////////////////
//model relation classes








///////////////////////////////////////////////////////////////////////////////////////////////
//model table classes



/**
 * Small example class for Events.
 */
class EE_Event extends EE_Base_Class{
	protected $_EVT_ID;
	protected $_EVT_desc;
	protected $_EVT_metakey1;
	protected $_EVT_metaval1;
	/**
	 *
	 * @var EE_Registration[]
	 */
	protected $_Registration;
	/**
	 *
	 * @var EE_Event_Question_Group[]
	 */
	protected $_Event_Question_Group;
	/**
	 * @var EE_Question_Group
	 */
	protected $_Question_Group;
	/**
	 * Constructor
	 * @param int $REG_ID registration ID OR an array of all field values, where keys match these arguments' names
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the answer. Could be CSV'd
	 */
	public function __construct( $EVT_desc=NULL, $EVT_metakey1='', $EVT_metaval1 ='') {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($EVT_desc)){
			parent::__construct($EVT_desc);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
		
	}
	
	
	
}

class EE_Question_Group extends EE_Base_Class{
	protected $_Event;
	protected $_QSG_ID;
	protected $_QSG_name;
	protected $_QSG_identifier;
	
/**
	 * Constructor
	 * @param int $REG_ID registration ID OR an array of all field values, where keys match these arguments' names
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the answer. Could be CSV'd
	 */
	public function __construct( $QSG_name=NULL, $QSG_identifier = NULL) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($QSG_name)){
			parent::__construct($QSG_name);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
		
	}
}

class EE_Event_Question_Group extends EE_Base_Class{
	protected $_Question_Group;
	protected $_Event;
	protected $_EQG_ID;
	protected $_EVT_ID;
	protected $_QSG_II;
	protected $_EQG_primary;
	public function __construct( $EVT_ID=NULL, $QSG_ID = NULL, $EQG_primary = NULL) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($EVT_ID)){
			parent::__construct($EVT_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
		
	}
}

class EE_Registration extends EE_Base_Class{
	protected $_Transaction;
	protected $_Event;
	protected $_REG_ID;
	protected $_EVT_ID;
	protected $_TXN_ID;
	protected $_STS_ID;
	public function __construct( $EVT_ID=NULL, $TXN_ID = NULL, $STS_ID = NULL) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($EVT_ID)){
			parent::__construct($EVT_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
		
	}
//		$this->_model_relations = array(
//			//woudl add a BelongsTorelation to events and other relations here
//			'Transaction'=> new EE_Belongs_To_Relation(),
//			'Event'=>new EE_Belongs_To_Relation()
//		);
//		$this->_fields = array(
//			'Registration'=>array(
//				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', 'Registration ID', false, 0),
//				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
//				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID','Transaction ID',false, 0, 'Transaction'),
//				'STS_ID'=>new EE_Enum_Field('STS_ID','Status Code',false,'RNA',array('RAP','RCN','RNA','RPN'))
//			)
//			
//		);
}