<?php

/**
 *
 * Question Model
 *
 * @package            Event Espresso
 * @subpackage        includes/models/
 * @author                Michael Nelson
 */
class EEM_Question extends EEM_Soft_Delete_Base
{
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

    // constant used to indicate that the question type is an email input
    const QST_type_email = 'EMAIL';

    // constant used to indicate that the question type is an email input
    const QST_type_email_confirm = 'EMAIL_CONFIRM';

    // constant used to indicate that the question type is a US-formatted phone number
    const QST_type_us_phone = 'US_PHONE';

    // constant used to indicate that the question type is an integer (whole number)
    const QST_type_int = 'INTEGER';

    // constant used to indicate that the question type is a decimal (float)
    const QST_type_decimal = 'DECIMAL';

    // constant used to indicate that the question type is a valid URL
    const QST_type_url = 'URL';

    // constant used to indicate that the question type is a YEAR
    const QST_type_year = 'YEAR';

    // constant used to indicate that the question type is a multi-select
    const QST_type_multi_select = 'MULTI_SELECT';

    /**
     * Question types that are interchangeable, even after answers have been provided for them.
     * Top-level keys are category slugs, next level is an array of question types. If question types
     * aren't in this array, it is assumed they AREN'T interchangeable with any other question types.
     *
     * @access protected
     * @var array $_question_type_categories {
     * @type string $text
     * @type string $single -answer-enum
     * @type string $multi -answer-enum
     *                    }
     */
    protected $_question_type_categories = array();

    /**
     * lists all the question types which should be allowed. Ideally, this will be extensible.
     *
     * @access protected
     * @var array $_allowed_question_types
     */
    protected $_allowed_question_types = array();

    /**
     * brief descriptions for all the question types
     *
     * @access protected
     * @var EEM_Question $_instance
     */
    protected $_question_descriptions;


    /**
     * Question types that should have an admin-defined max input length
     * @var array
     */
    protected $question_types_with_max_lengh;


    // private instance of the Attendee object
    protected static $_instance = null;


    /**
     * EEM_Question constructor.
     *
     * @param null $timezone
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Question', 'event_espresso');
        $this->plural_item = esc_html__('Questions', 'event_espresso');
        $this->_allowed_question_types = apply_filters(
            'FHEE__EEM_Question__construct__allowed_question_types',
            array(
                EEM_Question::QST_type_text => esc_html__('Text', 'event_espresso'),
                EEM_Question::QST_type_textarea => esc_html__('Textarea', 'event_espresso'),
                EEM_Question::QST_type_checkbox => esc_html__('Checkboxes', 'event_espresso'),
                EEM_Question::QST_type_radio => esc_html__('Radio Buttons', 'event_espresso'),
                EEM_Question::QST_type_dropdown => esc_html__('Dropdown', 'event_espresso'),
                EEM_Question::QST_type_state => esc_html__('State/Province Dropdown', 'event_espresso'),
                EEM_Question::QST_type_country => esc_html__('Country Dropdown', 'event_espresso'),
                EEM_Question::QST_type_date => esc_html__('Date Picker', 'event_espresso'),
                EEM_Question::QST_type_html_textarea => esc_html__('HTML Textarea', 'event_espresso'),
                EEM_Question::QST_type_email => esc_html__('Email', 'event_espresso'),
                EEM_Question::QST_type_email_confirm => esc_html__('Confirm Email', 'event_espresso'),
                EEM_Question::QST_type_us_phone => esc_html__('USA - Format Phone', 'event_espresso'),
                EEM_Question::QST_type_decimal => esc_html__('Number', 'event_espresso'),
                EEM_Question::QST_type_int => esc_html__('Whole Number', 'event_espresso'),
                EEM_Question::QST_type_url => esc_html__('URL', 'event_espresso'),
                EEM_Question::QST_type_year => esc_html__('Year', 'event_espresso'),
                EEM_Question::QST_type_multi_select => esc_html__('Multi Select', 'event_espresso')
            )
        );
        $this->_question_descriptions = apply_filters(
            'FHEE__EEM_Question__construct__question_descriptions',
            array(
                EEM_Question::QST_type_text => esc_html__('A single line text input field', 'event_espresso'),
                EEM_Question::QST_type_textarea => esc_html__('A multi line text input field', 'event_espresso'),
                EEM_Question::QST_type_checkbox => esc_html__('Allows multiple preset options to be selected', 'event_espresso'),
                EEM_Question::QST_type_radio => esc_html__('Allows a single preset option to be selected', 'event_espresso'),
                EEM_Question::QST_type_dropdown => esc_html__('A dropdown that allows a single selection', 'event_espresso'),
                EEM_Question::QST_type_state => esc_html__('A dropdown that lists states/provinces', 'event_espresso'),
                EEM_Question::QST_type_country => esc_html__('A dropdown that lists countries', 'event_espresso'),
                EEM_Question::QST_type_date => esc_html__('A popup calendar that allows date selections', 'event_espresso'),
                EEM_Question::QST_type_html_textarea => esc_html__('A multi line text input field that allows HTML', 'event_espresso'),
                EEM_Question::QST_type_email => esc_html__('A text field that must contain a valid Email address', 'event_espresso'),
                EEM_Question::QST_type_email_confirm => esc_html__('A text field that must contain a valid Email address and be equal to Email field', 'event_espresso'),
                EEM_Question::QST_type_us_phone => esc_html__('A text field that must contain a valid US phone number', 'event_espresso'),
                EEM_Question::QST_type_decimal => esc_html__('A text field that allows number values with decimals', 'event_espresso'),
                EEM_Question::QST_type_int => esc_html__('A text field that only allows whole numbers (no decimals)', 'event_espresso'),
                EEM_Question::QST_type_url => esc_html__('A text field that must contain a valid URL', 'event_espresso'),
                EEM_Question::QST_type_year => esc_html__('A dropdown that lists the last 100 years', 'event_espresso'),
                EEM_Question::QST_type_multi_select => esc_html__('A dropdown that allows multiple selections', 'event_espresso')
            )
        );
        $this->_question_type_categories = (array) apply_filters(
            'FHEE__EEM_Question__construct__question_type_categories',
            array(
                'text' => array(
                    EEM_Question::QST_type_text,
                    EEM_Question::QST_type_textarea,
                    EEM_Question::QST_type_date,
                    EEM_Question::QST_type_html_textarea,
                    EEM_Question::QST_type_email,
                    EEM_Question::QST_type_email_confirm,
                    EEM_Question::QST_type_us_phone,
                    EEM_Question::QST_type_decimal,
                    EEM_Question::QST_type_int,
                    EEM_Question::QST_type_url,
                    EEM_Question::QST_type_year
                ),
                'single-answer-enum' => array(
                    EEM_Question::QST_type_radio,
                    EEM_Question::QST_type_dropdown
                ),
                'multi-answer-enum' => array(
                    EEM_Question::QST_type_checkbox,
                    EEM_Question::QST_type_multi_select
                )
            )
        );
        $this->question_types_with_max_lengh = apply_filters(
            'FHEE__EEM_Question___construct__question_types_with_max_length',
            array(
                EEM_Question::QST_type_text,
                EEM_Question::QST_type_textarea,
                EEM_Question::QST_type_html_textarea
            )
        );

        $this->_tables = array(
            'Question' => new EE_Primary_Table('esp_question', 'QST_ID')
        );
        $this->_fields = array(
            'Question' => array(
                'QST_ID' => new EE_Primary_Key_Int_Field('QST_ID', esc_html__('Question ID', 'event_espresso')),
                'QST_display_text' => new EE_Post_Content_Field('QST_display_text', esc_html__('Question Text', 'event_espresso'), true, ''),
                'QST_admin_label' => new EE_Plain_Text_Field('QST_admin_label', esc_html__('Question Label (admin-only)', 'event_espresso'), true, ''),
                'QST_system' => new EE_Plain_Text_Field('QST_system', esc_html__('Internal string ID for question', 'event_espresso'), false, ''),
                'QST_type' => new EE_Enum_Text_Field('QST_type', esc_html__('Question Type', 'event_espresso'), false, 'TEXT', $this->_allowed_question_types),
                'QST_required' => new EE_Boolean_Field('QST_required', esc_html__('Required Question?', 'event_espresso'), false, false),
                'QST_required_text' => new EE_Simple_HTML_Field('QST_required_text', esc_html__('Text to Display if Not Provided', 'event_espresso'), true, ''),
                'QST_order' => new EE_Integer_Field('QST_order', esc_html__('Question Order', 'event_espresso'), false, 0),
                'QST_admin_only' => new EE_Boolean_Field('QST_admin_only', esc_html__('Admin-Only Question?', 'event_espresso'), false, false),
                'QST_max' => new EE_Infinite_Integer_Field('QST_max', esc_html__('Max Size', 'event_espresso'), false, EE_INF),
                'QST_wp_user' => new EE_WP_User_Field('QST_wp_user', esc_html__('Question Creator ID', 'event_espresso'), false),
                'QST_deleted' => new EE_Trashed_Flag_Field('QST_deleted', esc_html__('Flag Indicating question was deleted', 'event_espresso'), false, false)
            )
        );
        $this->_model_relations = array(
            'Question_Group' => new EE_HABTM_Relation('Question_Group_Question'),
            'Question_Option' => new EE_Has_Many_Relation(),
            'Answer' => new EE_Has_Many_Relation(),
            'WP_User' => new EE_Belongs_To_Relation(),
            // for QST_order column
            'Question_Group_Question' => new EE_Has_Many_Relation()
        );
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Reg_Form('QST_system');
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Reg_Form('QST_system');
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Reg_Form('QST_system');
        parent::__construct($timezone);
    }

    /**
     * Returns the list of allowed question types, which are normally: 'TEXT','TEXTAREA','RADIO_BTN','DROPDOWN','CHECKBOX','DATE'
     * but they can be extended
     * @return string[]
     */
    public function allowed_question_types()
    {
        return $this->_allowed_question_types;
    }

    /**
     * Gets all the question types in the same category
     * @param string $question_type one of EEM_Question::allowed_question_types(
     * @return string[] like EEM_Question::allowed_question_types()
     */
    public function question_types_in_same_category($question_type)
    {
        $question_types = array($question_type);
        foreach ($this->_question_type_categories as $category => $question_types_in_category) {
            if (in_array($question_type, $question_types_in_category)) {
                $question_types = $question_types_in_category;
                break;
            }
        }

        return array_intersect_key($this->allowed_question_types(), array_flip($question_types));
    }

    /**
     * Determines if the given question type is in the given question type category
     * @param string $question_type one of EEM_Question::allowed_question_types()
     * @param string $category one of the top-level keys of EEM_Question::question_type_categories()
     * @return boolean
     */
    public function question_type_is_in_category($question_type, $category)
    {
        if (!isset($this->_question_type_categories[ $category ])) {
            return false;
        }
        return in_array($question_type, $this->_question_type_categories[ $category ]);
    }


    /**
     * Returns all the question types in the given category
     * @param string $category
     * @return array|mixed
     */
    public function question_types_in_category($category)
    {
        if (isset($this->_question_type_categories[ $category ])) {
            return $this->_question_type_categories[ $category ];
        }
        return array();
    }


    /**
     * Returns all the question types that should have question options
     * @return array
     */
    public function question_types_with_options()
    {
        return array_merge(
            $this->question_types_in_category('single-answer-enum'),
            $this->question_types_in_category('multi-answer-enum')
        );
    }

    /**
     * Returns the question type categories 2d array
     * @return array see EEM_Question::_question_type_categories
     */
    public function question_type_categories()
    {
        return $this->_question_type_categories;
    }

    /**
     * Returns an array of all the QST_system values that can be allowed in the system question group
     * identified by $system_question_group_id
     * @param string $system_question_group_id QSG_system
     * @return array of system question names (QST_system)
     */
    public function allowed_system_questions_in_system_question_group($system_question_group_id)
    {
        $question_system_ids = array();
        switch ($system_question_group_id) {
            case EEM_Question_Group::system_personal:
                $question_system_ids = array(
                    EEM_Attendee::system_question_fname,
                    EEM_Attendee::system_question_lname,
                    EEM_Attendee::system_question_email,
                    EEM_Attendee::system_question_email_confirm,
                    EEM_Attendee::system_question_phone
                );
                break;
            case EEM_Question_Group::system_address:
                $question_system_ids = array(
                    EEM_Attendee::system_question_address,
                    EEM_Attendee::system_question_address2,
                    EEM_Attendee::system_question_city,
                    EEM_Attendee::system_question_state,
                    EEM_Attendee::system_question_country,
                    EEM_Attendee::system_question_zip,
                    EEM_Attendee::system_question_phone
                );
                break;
        }
        return apply_filters('FHEE__EEM_Question__system_questions_allowed_in_system_question_group__return', $question_system_ids, $system_question_group_id);
    }

    /**
     * Returns an array of all the QST_system values that are required in the system question group
     * identified by $system_question_group_id
     * @param string $system_question_group_id QSG_system
     * @return array of system question names (QST_system)
     */
    public function required_system_questions_in_system_question_group($system_question_group_id)
    {
        $question_system_ids = null;
        switch ($system_question_group_id) {
            case EEM_Question_Group::system_personal:
                $question_system_ids = array(
                    EEM_Attendee::system_question_fname,
                    EEM_Attendee::system_question_email,
                );
                break;
            default:
                $question_system_ids = array();
        }
        return apply_filters('FHEE__EEM_Question__system_questions_required_in_system_question_group', $question_system_ids, $system_question_group_id);
    }


    /**
     * Gets an array for converting between QST_system and QST_IDs for system questions. Eg, if you want to know
     * which system question QST_ID corresponds to the QST_system 'city', use EEM_Question::instance()->get_Question_ID_from_system_string('city');
     * @param $QST_system
     * @return int of QST_ID for the question that corresponds to that QST_system
     */
    public function get_Question_ID_from_system_string($QST_system)
    {
        return $this->get_var(array(array('QST_system' => $QST_system)));
    }


    /**
     * searches the db for the question with the latest question order and returns that value.
     * @access public
     * @return int
     */
    public function get_latest_question_order()
    {
        $columns_to_select = array(
            'max_order' => array("MAX(QST_order)", "%d")
        );
        $max = $this->_get_all_wpdb_results(array(), ARRAY_A, $columns_to_select);
        return isset($max[0], $max[0]['max_order']) ? $max[0]['max_order'] : 0;
    }

    /**
     * Returns an array where keys are system question QST_system values,
     * and values are the highest question max the admin can set on the question
     * (aka the "max max"; eg, a site admin can change the zip question to have a max
     * of 5, but no larger than 12)
     * @return array
     */
    public function system_question_maxes()
    {
        return array(
            'fname' => 45,
            'lname' => 45,
            'address' => 255,
            'address2' => 255,
            'city' => 45,
            'zip' => 12,
            'email' => 255,
            'email_confirm' => 255,
            'phone' => 45,
        );
    }

    /**
     * Given a QST_system value, gets the question's largest allowable max input.
     * @see Registration_Form_Admin_Page::system_question_maxes()
     * @param string $system_question_value
     * @return int|float
     */
    public function absolute_max_for_system_question($system_question_value)
    {
        $maxes = $this->system_question_maxes();
        if (isset($maxes[ $system_question_value ])) {
            return $maxes[ $system_question_value ];
        } else {
            return EE_INF;
        }
    }


    /**
     * @return array
     */
    public function question_descriptions()
    {
        return $this->_question_descriptions;
    }


    /**
     * Returns all the question types that should have an admin-defined max input length
     * @return array
     */
    public function questionTypesWithMaxLength()
    {
        return (array) $this->question_types_with_max_lengh;
    }
}
