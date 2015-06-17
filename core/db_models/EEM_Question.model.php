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

	// constant used to indicate that the question type is COUNTRY
	const QST_type_country = 'COUNTRY';

	// constant used to indicate that the question type is DATE
	const QST_type_date = 'DATE';

	// constant used to indicate that the question type is DROPDOWN
	const QST_type_dropdown = 'DROPDOWN';

	// constant used to indicate that the question type is CHECKBOX
	const QST_type_checkbox = 'CHECKBOX';

	// constant used to indicate that the question type is RADIO_BTN
	const QST_type_radio = 'RADIO_BTN';

	// constant used to indicate that the question type is STATE
	const QST_type_state = 'STATE';

	// constant used to indicate that the question type is TEXT
	const QST_type_text = 'TEXT';

	// constant used to indicate that the question type is TEXTAREA
	const QST_type_textarea = 'TEXTAREA';

	// constant used to indicate that the question type is a TEXTAREA that allows simple html
	const QST_type_html_textarea = 'HTML_TEXTAREA';
	/**
	 * Question types that are interchangeable, even after answers have been provided for them.
	 * Top-level keys are category slugs, next level is an array of question types. If question types
	 * aren't in this array, it is assumed they AREN'T interchangeable with any other question types.
	 * @var array
	 */
	protected $_question_type_categories = null;
	/**
	 * lists all the question types which should be allowed. Ideally, this will be extensible.
	 * @access private
	 * @var array of strings
	 */
	protected $_allowed_question_types;

	// private instance of the Attendee object
	protected static $_instance = NULL;

	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Question','event_espresso');
		$this->plural_item = __('Questions','event_espresso');
		$this->_allowed_question_types=apply_filters(
			'FHEE__EEM_Question__construct__allowed_question_types',
			array(
				EEM_Question::QST_type_text =>__('Text','event_espresso'),
				EEM_Question::QST_type_textarea =>__('Textarea','event_espresso'),
				EEM_Question::QST_type_checkbox =>__('Checkboxes','event_espresso'),
				EEM_Question::QST_type_radio =>__('Radio Buttons','event_espresso'),
				EEM_Question::QST_type_dropdown =>__('Dropdown','event_espresso'),
				EEM_Question::QST_type_state =>__('State/Province Dropdown','event_espresso'),
				EEM_Question::QST_type_country =>__('Country Dropdown','event_espresso'),
				EEM_Question::QST_type_date =>__('Date Picker','event_espresso'),
				EEM_Question::QST_type_html_textarea => __( 'HTML Textarea', 'event_espresso' ),
			)
		);
		$this->_question_type_categories = apply_filters(
				'FHEE__EEM_Question__construct__question_type_categories',
				array(
				'text' => array(
						self::QST_type_text,
						self::QST_type_textarea,
						self::QST_type_html_textarea,
					),
				'single-answer-enum' => array(
					self::QST_type_radio,
					self::QST_type_dropdown
				),
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
				'QST_wp_user'=>new EE_WP_User_Field('QST_wp_user', __('Question Creator ID','event_espresso'), false ),
				'QST_deleted'=>new EE_Trashed_Flag_Field('QST_deleted', __('Flag Indicating question was deleted','event_espresso'), false, false)
			)
		);
		$this->_model_relations = array(
			'Question_Group'=>new EE_HABTM_Relation('Question_Group_Question'),
			'Question_Option'=>new EE_Has_Many_Relation(),
			'Answer'=>new EE_Has_Many_Relation(),
			'WP_User' => new EE_Belongs_To_Relation(),
			//for QST_order column
			'Question_Group_Question'=>new EE_Has_Many_Relation()
		);
		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Reg_Form('QST_system');
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Reg_Form('QST_system');
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Reg_Form('QST_system');
		parent::__construct( $timezone );
	}

	/**
	 * Returns the list of allowed question types, which are normally: 'TEXT','TEXTAREA','RADIO_BTN','DROPDOWN','CHECKBOX','DATE'
	 * but they can be extended
	 * @return string[]
	 */
	public function allowed_question_types(){
		return $this->_allowed_question_types;
	}
	/**
	 * Gets all the question types in the same category
	 * @param string $question_type one of EEM_Question::allowed_question_types(
	 * @return string[] like EEM_Question::allowed_question_types()
	 */
	public function question_types_in_same_category( $question_type ) {
		$question_types = array( $question_type );
		foreach( $this->_question_type_categories as $category => $question_types_in_category ) {
			if( in_array( $question_type, $question_types_in_category ) ) {
				$question_types = $question_types_in_category;
				break;
			}
		}

		return array_intersect_key( $this->allowed_question_types(), array_flip( $question_types ) );
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
