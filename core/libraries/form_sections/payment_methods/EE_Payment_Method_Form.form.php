<?php



/**
 * Specialized form for payment methods, allowing for easy setting and retrieving of meta fields.
 * Uses EEM_Payment_Method as the model
 */
class EE_Payment_Method_Form extends EE_Model_Form_Section
{

    /**
     * All the subsection inputs that correspond ot extra meta rows
     * for this payment method
     *
     * @var EE_Form_Input_Base[]
     */
    protected $_extra_meta_inputs = array();

    /**
     * Because payment method form might DELAY part of construction, we want to remember
     * what options were passed in
     *
     * @var array
     */
    protected $_options_array = array();

    /**
     * The payment method type for this form
     *
     * @var EE_PMT_Base
     */
    protected $_payment_method_type;



    /**
     * @param array      $options_array       {
     * @type string      $extra_meta_inputs   should be EE_Form_Section_Validatable[] which
     *                                        will be _subsections and will be saved as extra meta on the payment
     *                                        method object;
     * @type EE_PMT_Base $payment_method_type the payment method type this form is for
     * @see EE_Model_Form_Section::__construct() for more
     *                                        }
     */
    public function __construct($options_array = array())
    {
        $this->_model = EEM_Payment_Method::instance();
        $this->_options_array = $options_array;
        if (isset($options_array['payment_method_type'])) {
            $this->_payment_method_type = $options_array['payment_method_type'];
        }
        $options_array = $this->_options_array;
        if (isset($options_array['extra_meta_inputs'])) {
            $this->_extra_meta_inputs = array_merge($this->_extra_meta_inputs, $options_array['extra_meta_inputs']);
        }
        if ($this->_extra_meta_inputs) {
            $this->_subsections = array_merge($this->_subsections, $this->_extra_meta_inputs);
        }
        $this->_subsections['PMD_button_url'] = new EE_Admin_File_Uploader_Input(
            array('html_label_text' => __('Button URL', 'event_espresso'))
        );
        $this->_subsections['PMD_scope'] = new EE_Checkbox_Multi_Input(
            EEM_Payment_Method::instance()->scopes(),
            array(
                'html_label_text' => $this->_model->field_settings_for('PMD_scope')->get_nicename()
                                     . EEH_Template::get_help_tab_link('payment_methods_overview'),
            )
        );
        //setup the currency options
        $this->_subsections['Currency'] = new EE_Select_Multi_Model_Input(
            EEM_Currency::instance()->get_all_currencies_usable_by($this->_payment_method_type),
            array(
                'html_label_text' => __('Currencies Supported', 'event_espresso'),
                'required'        => true,
            )
        );
        $this->_subsections['PMD_order'] = new EE_Text_Input(array(
            'html_label_text'        => __('Order', 'event_espresso'),
            'html_help_text'         => __('Lowest numbers will be shown first', 'event_espresso'),
            'normalization_strategy' => new EE_Int_Normalization(),
            'validation_strategies'  => array(
                new EE_Int_Validation_Strategy(),
            ),
            'default'                => 0,
        ));
        $this->_layout_strategy = new EE_Admin_Two_Column_Layout();
        parent::__construct($options_array);
        $debug_mode = isset($this->_subsections['PMD_debug_mode']) ? $this->_subsections['PMD_debug_mode'] : null;
        if ($debug_mode instanceof EE_Form_Input_Base) {
            $debug_mode->set_html_help_text(__('This payment method has a Sandbox Server (also known as Testing Server, Development Server, Quality Assurance Server, etc). While in debug mode and using this sandbox server, real payments will not be processed.',
                'event_espresso'));
        }
    }



    /**
     * Finishes construction given the parent form section and this form section's name
     *
     * @param EE_Form_Section_Proper $parent_form_section
     * @param string                 $name
     * @throws EE_Error
     */
    public function _construct_finalize($parent_form_section, $name)
    {
        if (! $this->_payment_method_type instanceof EE_PMT_Base) {
            throw new EE_Error(sprintf(__('Payment Method forms must have set their payment method type BEFORE calling _construct_finalize',
                'event_espresso')));
        }
        //set the name of this form based on the payment method type
        if (! $this->_name && ! $name) {
            $name = str_replace(" ", "_", ucwords(str_replace("_", " ", ($this->_payment_method_type->system_name()))))
                    . "_Settings_Form";
        }
        parent::_construct_finalize($parent_form_section, $name);
    }



    /**
     * @param $payment_method_type
     * @throws EE_Error
     */
    public function set_payment_method_type($payment_method_type)
    {
        if (! $payment_method_type instanceof EE_PMT_Base) {
            throw new EE_Error(sprintf(__("Payment Method forms MUST set a payment method type by using _set_payment_method_type",
                "event_espresso")));
        }
        $this->_payment_method_type = $payment_method_type;
    }



    /**
     * extends the model form section's save method to also save the extra meta field values
     *
     * @return int ID of the payment method inserted, or true on update
     */
    public function save()
    {
        $parent_save_val = parent::save();
        if ($this->_model_object && $this->_model_object->ID()) {
            foreach ($this->_extra_meta_inputs as $input_name => $input) {
                $this->_model_object->update_extra_meta($input_name, $input->normalized_value());
            }
        }
        return $parent_save_val;
    }



    /**
     * Overrides parent's populate_model_obj to also populate the extra meta fields
     *
     * @param EE_Base_Class $model_obj
     */
    public function populate_model_obj($model_obj)
    {
        $model_obj = $this->_model->ensure_is_obj($model_obj);
        parent::populate_model_obj($model_obj);
        $extra_meta = $model_obj->all_extra_meta_array();
        foreach ($this->_extra_meta_inputs as $input_name => $extra_meta_input) {
            if (isset($extra_meta[$input_name])) {
                $extra_meta_input->set_default($extra_meta[$input_name]);
            }
        }
    }



    /**
     * gets the default name of this form section if none is specified
     *
     * @return string
     */
    protected function _set_default_name_if_empty()
    {
        if (! $this->_name) {
            $default_name = str_replace("EEM_", "", get_class($this->_model)) . "_Model_Form";
            $this->_name = $default_name;
        }
    }



    /**
     * Gets all the extra meta inputs in this form
     *
     * @return EE_Form_Input_Base[]
     */
    public function extra_meta_inputs()
    {
        return $this->_extra_meta_inputs;
    }
}
