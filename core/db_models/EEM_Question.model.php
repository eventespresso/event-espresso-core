<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Question Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once( EE_CLASSES . 'EE_Question.class.php');

class EEM_Question extends EEM_Soft_Delete_Base {
	
	// constant used to indicate that the question type is DATE
	const QST_type_date = 'DATE';

	// constant used to indicate that the question type is DROPDOWN
	const QST_type_dropdown = 'DROPDOWN';

	// constant used to indicate that the question type is MULTIPLE
	const QST_type_multiple = 'MULTIPLE';

	// constant used to indicate that the question type is SINGLE
	const QST_type_single = 'SINGLE';

	// constant used to indicate that the question type is TEXT
	const QST_type_text = 'TEXT';

	// constant used to indicate that the question type is TEXTAREA
	const QST_type_textarea = 'TEXTAREA';

				

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
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
	/**
	 * lists all the question types which should be allowed. Ideally, this will be extensible.
	 * @access private
	 * @var array of strings 
	 */
	private $_allowed_question_types;
	/**
	 * Returns the list of allowed question types, which are normally: 'TEXT','TEXTAREA','SINGLE','DROPDOWN','MULTIPLE','DATE'
	 * but they can be extended
	 * @return string[]
	 */
	public function allowed_question_types(){
		return $this->_allowed_question_types;
	}
	protected function __construct(){
		$this->singular_item = __('Question','event_espresso');
		$this->plural_item = __('Questions','event_espresso');
		$this->_allowed_question_types=apply_filters( 
			'FHEE__EEM_Question__construct__allowed_question_types',
			array(
				EEM_Question::QST_type_text =>__('Text','event_espresso'),
				EEM_Question::QST_type_textarea =>__('Textarea','event_espresso'),
				EEM_Question::QST_type_single =>__('Single','event_espresso'),
				EEM_Question::QST_type_dropdown =>__('Dropdown','event_espresso'),
				EEM_Question::QST_type_multiple =>__('Multiple Choice','event_espresso'),
				EEM_Question::QST_type_date =>__('Date','event_espresso')
			)
		);

		$this->_tables = array(
			'Question'=>new EE_Primary_Table('esp_question','QST_ID')
		);
		$this->_fields = array(
			'Question'=>array(
				'QST_ID'=>new EE_Primary_Key_Int_Field('QST_ID', __('Question ID','event_espresso')),
				'QST_display_text'=>new EE_Full_HTML_Field('QST_display_text', __('Question Text','event_espresso'), true, ''),
				'QST_admin_label'=>new EE_Plain_Text_Field('QST_admin_label', __('Question Label (admin-only)','event_espresso'), true, ''),
				'QST_system'=>new EE_Plain_Text_Field('QST_system', __('Internal string ID for question','event_espresso'), TRUE, NULL ),
				'QST_type'=>new EE_Enum_Text_Field('QST_type', __('Question Type','event_espresso'),false, 'TEXT',$this->_allowed_question_types),
				'QST_required'=>new EE_Boolean_Field('QST_required', __('Required Question?','event_espresso'), false, false),
				'QST_required_text'=>new EE_Simple_HTML_Field('QST_required_text', __('Text to Display if Not Provided','event_espresso'), true, ''),
				'QST_order'=>new EE_Integer_Field('QST_order', __('Question Order','event_espresso'), false, 0),
				'QST_admin_only'=>new EE_Boolean_Field('QST_admin_only', __('Admin-Only Question?','event_espresso'), false, false),
				'QST_wp_user'=>new EE_Integer_Field('QST_wp_user', __('Wp User ID who created question','event_espresso'), false, 1),
				'QST_deleted'=>new EE_Trashed_Flag_Field('QST_deleted', __('Flag Indicating question was deleted','event_espresso'), false, false)
			)
		);
		$this->_model_relations = array(
			'Question_Group'=>new EE_HABTM_Relation('Question_Group_Question'),
			'Question_Option'=>new EE_Has_Many_Relation(),
			'Answer'=>new EE_Has_Many_Relation(),
			//for QST_order column
			'Question_Group_Question'=>new EE_Has_Many_Relation()
		);
		
		parent::__construct();
	}


	
	/**
	 * Gets an array for converting between QST_system and QST_IDs for system questions. Eg, if you want to know 
	 * which system question QST_ID corresponds to the QST_system 'city', use EEM_Question::instance()->get_Question_ID_from_system_string('city');
	 * @return int of QST_ID for the question that corresponds to that QST_system
	 */
	public function get_Question_ID_from_system_string($QST_system){
		 $conversion_array = array(
			'fname'=> EEM_Attendee::fname_question_id,
			'lname'=> EEM_Attendee::lname_question_id,
			'email'=> EEM_Attendee::email_question_id,
			'address'=> EEM_Attendee::address_question_id,
			'address2'=> EEM_Attendee::address2_question_id,
			'city'=> EEM_Attendee::city_question_id,
			'state'=> EEM_Attendee::state_question_id,
			'country'=> EEM_Attendee::country_question_id,
			'zip'=> EEM_Attendee::zip_question_id,
			'phone'=> EEM_Attendee::phone_question_id
		);

		return isset( $conversion_array[ $QST_system ] ) ? $conversion_array[ $QST_system ] : NULL;

	}
	
	
	/**
	 * searches the db for the question with the latest question order and returns that value.
	 * @access public
	 * @return int
	 */
	public function get_latest_question_order() {
		$columns_to_select = array(
			'max_order' => array("MAX(QST_order)","%d")
			);
		$max = $this->_get_all_wpdb_results(array(), ARRAY_A, $columns_to_select );
		return $max[0]['max_order'];
	}





}
// End of file EEM_Question.model.php
// Location: /includes/models/EEM_Question.model.php
