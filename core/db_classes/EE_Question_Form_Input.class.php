<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_Question_Form_Input class
 *    a conglomerate type object that combines an EE_Question object with an EE_Answer object
 *    as well as some of it's own class properties to facilitate use within the EEH_Form_Fields.helper class
 *    access to the EE_Question and EE_Answer objects properties are done indirectly via a super getter and setter
 *
 * @package        Event Espresso
 * @subpackage     includes/classes/EE_Question_Form_Input.class.php
 * @author         Brent Christensen
 */
class EE_Question_Form_Input
{

    /**
     *    EE_Question object
     *
     * @access private
     * @var object
     */
    private $_QST = null;

    /**
     *    EE_Answer object
     *
     * @access private
     * @var object
     */
    private $_ANS = null;

    /**
     *    $_QST_meta
     * @access private
     * @var array
     */
    private $_QST_meta = [];

    /**
     *    $QST_input_name
     * @access private
     * @var string
     */
    private $QST_input_name = '';

    /**
     *    $QST_input_id
     * @access private
     * @var string
     */
    private $QST_input_id = '';

    /**
     *    $QST_input_class
     * @access private
     * @var string
     */
    private $QST_input_class = '';

    /**
     * @var bool $QST_disabled
     */
    private $QST_disabled = false;

    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var array
     */
    protected $form_data;


    /**
     * constructor for questions
     *
     * @param EE_Question $QST EE_Question object
     * @param EE_Answer   $ANS EE_Answer object
     * @param array       $q_meta
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Question $QST = null, EE_Answer $ANS = null, $q_meta = [])
    {
        $this->request   = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $this->form_data = $this->request->requestParams();
        if (empty($QST) || empty($ANS)) {
            EE_Error::add_error(
                __('An error occurred. A valid EE_Question or EE_Answer object was not received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return null;
        }
        $this->_QST = $QST;
        $this->_ANS = $ANS;
        $this->set_question_form_input_meta($q_meta);
        $this->set_question_form_input_init();
    }


    /**
     * sets meta data for the question form input
     *
     * @access public
     * @param array $q_meta
     * @return void
     */
    public function set_question_form_input_meta($q_meta = [])
    {
        $default_q_meta  = [
            'att_nmbr'       => 1,
            'ticket_id'      => '',
            'date'           => '',
            'time'           => '',
            'input_name'     => '',
            'input_id'       => '',
            'input_class'    => '',
            'input_prefix'   => 'qstn',
            'append_qstn_id' => true,
            'htmlentities'   => true,
            'allow_null'     => false,
        ];
        $this->_QST_meta = array_merge($default_q_meta, $q_meta);
    }


    /**
     * set_question_form_input_init
     *
     * @access public
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_question_form_input_init()
    {
        $qstn_id = $this->_QST->system_ID() ? $this->_QST->system_ID() : $this->_QST->ID();
        $this->_set_input_name($qstn_id);
        $this->_set_input_id($qstn_id);
        $this->_set_input_class();
        $this->set_question_form_input_answer($qstn_id);
    }


    /**
     * set_input_name
     *
     * @access private
     * @param $qstn_id
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _set_input_name($qstn_id)
    {
        if (! empty($qstn_id)) {
            $ANS_ID  = $this->get('ANS_ID');
            $qstn_id = ! empty($ANS_ID) ? '[' . $qstn_id . '][' . $ANS_ID . ']' : '[' . $qstn_id . ']';
        }
        $this->QST_input_name = $this->_QST_meta['append_qstn_id'] && ! empty($qstn_id)
            ? $this->_QST_meta['input_prefix'] . $this->_QST_meta['input_name'] . $qstn_id
            : $this->_QST_meta['input_prefix'] . $this->_QST_meta['input_name'];
    }


    /**
     * get property values for question form input
     *
     * @access public
     * @param string $property
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get($property = null)
    {
        if (! empty($property)) {
            if (EEM_Question::instance()->has_field($property)) {
                return $this->_QST->get($property);
            } elseif (EEM_Answer::instance()->has_field($property)) {
                return $this->_ANS->get($property);
            } elseif ($this->_question_form_input_property_exists(__CLASS__, $property)) {
                return $this->{$property};
            }
        }
        return null;
    }


    /**
     *    _question_form_input_property_exists
     *
     * @access private
     * @param string $classname
     * @param string $property
     * @return boolean
     * @throws ReflectionException
     */
    private function _question_form_input_property_exists($classname, $property)
    {
        // first try regular property exists method which works as expected in PHP 5.3+
        $prop = EEH_Class_Tools::has_property($classname, $property);
        if (! $prop) {
            // use reflection for < PHP 5.3 as a double check when property is not found, possible due to access restriction
            $reflector = new ReflectionClass($classname);
            $prop      = $reflector->hasProperty($property);
        }
        return $prop;
    }


    /**
     * set_input_id
     *
     * @access private
     * @param $qstn_id
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _set_input_id($qstn_id)
    {
        $input_id           = isset($this->_QST_meta['input_id']) && ! empty($this->_QST_meta['input_id'])
            ? $this->_QST_meta['input_id']
            : sanitize_key(strip_tags($this->_QST->get('QST_display_text')));
        $this->QST_input_id = $this->_QST_meta['append_qstn_id'] && ! empty($qstn_id)
            ? $input_id . '-' . $qstn_id
            : $input_id;
    }


    /**
     * set_input_class
     *
     * @access private
     * @return void
     */
    private function _set_input_class()
    {
        $this->QST_input_class = isset($this->_QST_meta['input_class']) ? $this->_QST_meta['input_class'] : '';
    }


    /**
     * set_question_form_input_answer
     *
     * @access public
     * @param mixed    int | string    $qstn_id
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_question_form_input_answer($qstn_id)
    {
        // check for answer in $this->form_data in case we are reprocessing a form after an error
        if (isset($this->_QST_meta['EVT_ID'])
            && isset($this->_QST_meta['att_nmbr'])
            && isset($this->_QST_meta['date'])
            && isset($this->_QST_meta['time'])
            && isset($this->_QST_meta['price_id'])
        ) {
            $EVT_ID = $this->_QST_meta['EVT_ID'];
            $att_nmbr = $this->_QST_meta['att_nmbr'];
            $date = $this->_QST_meta['date'];
            $time = $this->_QST_meta['time'];
            $price_id = $this->_QST_meta['price_id'];
            if (isset($this->form_data['qstn'][ $EVT_ID ][ $att_nmbr ][ $date ][ $time ][ $price_id ][ $qstn_id ])) {
                $answer = $this->form_data['qstn'][ $EVT_ID ][ $att_nmbr ][ $date ][ $time ][ $price_id ][ $qstn_id ];
                $this->_ANS->set('ANS_value', $answer);
            }
        }
    }


    /**
     *        generate_question_form_inputs_for_object
     *
     * @access    protected
     * @param bool|object $object $object
     * @param array       $input_types
     * @return        array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_question_form_inputs_for_object($object = false, $input_types = [])
    {
        if (! is_object($object)) {
            return [];
        }
        $inputs = [];
        $fields = $object->get_model()->field_settings(false);
        foreach ($fields as $field_ID => $field) {
            if ($field instanceof EE_Model_Field_Base) {
                if (isset($input_types[ $field_ID ])) {
                    // get saved value for field
                    $value = $object->get($field_ID);
                    // if no saved value, then use default
                    $value = $value !== null ? $value : $field->get_default_value();
                    // determine question type
                    $type = isset($input_types[ $field_ID ]) ? $input_types[ $field_ID ]['type'] : 'TEXT';
                    // input name
                    $input_name = isset($input_types[ $field_ID ]) && isset($input_types[ $field_ID ]['input_name'])
                        ? $input_types[ $field_ID ]['input_name'] . '[' . $field_ID . ']'
                        : $field_ID;
                    // css class for input
                    $class = isset($input_types[ $field_ID ]['class']) && ! empty($input_types[ $field_ID ]['class'])
                        ? ' ' . $input_types[ $field_ID ]['class']
                        : '';
                    // whether to apply htmlentities to answer
                    $htmlentities = isset($input_types[ $field_ID ]['htmlentities'])
                        ? $input_types[ $field_ID ]['htmlentities']
                        : true;
                    // whether to apply htmlentities to answer
                    $label_b4 = isset($input_types[ $field_ID ]['label_b4'])
                        ? $input_types[ $field_ID ]['label_b4']
                        : false;
                    // whether to apply htmlentities to answer
                    $use_desc_4_label = isset($input_types[ $field_ID ]['use_desc_4_label'])
                        ? $input_types[ $field_ID ]['use_desc_4_label']
                        : false;
                    // whether input is disabled
                    $disabled = isset($input_types[ $field_ID ]['disabled']) && $input_types[ $field_ID ]['disabled'];

                    // create EE_Question_Form_Input object
                    $QFI = new EE_Question_Form_Input(
                        EE_Question::new_instance(
                            [
                                'QST_ID'           => 0,
                                'QST_display_text' => $field->get_nicename(),
                                'QST_type'         => $type,
                            ]
                        ),
                        EE_Answer::new_instance(
                            [
                                'ANS_ID'    => 0,
                                'QST_ID'    => 0,
                                'REG_ID'    => 0,
                                'ANS_value' => $value,
                            ]
                        ),
                        [
                            'input_id'         => $field_ID . '-' . $object->ID(),
                            'input_name'       => $input_name,
                            'input_class'      => $field_ID . $class,
                            'input_prefix'     => '',
                            'append_qstn_id'   => false,
                            'htmlentities'     => $htmlentities,
                            'label_b4'         => $label_b4,
                            'use_desc_4_label' => $use_desc_4_label,
                        ]
                    );
                    // does question type have options ?
                    if (in_array($type, ['DROPDOWN', 'RADIO_BTN', 'CHECKBOX'])
                        && isset($input_types[ $field_ID ])
                        && isset($input_types[ $field_ID ]['options'])
                    ) {
                        foreach ($input_types[ $field_ID ]['options'] as $option) {
                            $option    = stripslashes_deep($option);
                            $option_id = ! empty($option['id']) ? $option['id'] : 0;
                            $QSO       = EE_Question_Option::new_instance(
                                [
                                    'QSO_value'   => (string) $option_id,
                                    'QSO_desc'    => $option['text'],
                                    'QSO_deleted' => false,
                                ]
                            );
                            // all QST (and ANS) properties can be accessed indirectly thru QFI
                            $QFI->add_temp_option($QSO);
                        }
                    }
                    // we don't want ppl manually changing primary keys cuz that would just lead to total craziness man
                    if ($disabled || $field_ID == $object->get_model()->primary_key_name()) {
                        $QFI->set('QST_disabled', true);
                    }
                    $inputs[ $field_ID ] = $QFI;
                }
            }
        }
        return $inputs;
    }


    /**
     *    add_temp_option
     *
     * @access public
     * @param EE_Question_Option $QSO EE_Question_Option
     * @return void
     */
    public function add_temp_option(EE_Question_Option $QSO)
    {
        $this->_QST->add_temp_option($QSO);
    }


    /**
     * set property values for question form input
     *
     * @access public
     * @param string $property
     * @param mixed  $value
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set($property = null, $value = null)
    {
        if (! empty($property)) {
            if (EEM_Question::instance()->has_field($property)) {
                $this->_QST->set($property, $value);
            } elseif (EEM_Answer::instance()->has_field($property)) {
                $this->_ANS->set($property, $value);
            } elseif ($this->_question_form_input_property_exists(__CLASS__, $property)) {
                $this->{$property} = $value;
            }
        }
    }


    /**
     *    _question_form_input_property_exists
     *
     * @access public
     * @param boolean      $notDeletedOptionsOnly            1
     *                                                       whether to return ALL options, or only the ones which have
     *                                                       not yet been deleted
     * @param string|array $selected_value_to_always_include , when retrieving options to an ANSWERED question,
     *                                                       we want to usually only show non-deleted options AND the
     *                                                       value that was selected for the answer, whether it was
     *                                                       trashed or not.
     * @return EE_Question_Option
     */
    public function options($notDeletedOptionsOnly = true, $selected_value_to_always_include = null)
    {
        $temp_options = $this->_QST->temp_options();
        return ! empty($temp_options)
            ? $temp_options
            : $this->_QST->options(
                $notDeletedOptionsOnly,
                $selected_value_to_always_include
            );
    }


    /**
     *    get_meta
     *
     * @access public
     * @param mixed $key
     * @return mixed
     */
    public function get_meta($key = false)
    {
        return $key && isset($this->_QST_meta[ $key ]) ? $this->_QST_meta[ $key ] : false;
    }
}
