<?php

/**
 * Specialized form for payment methods, allowing for easy setting and retrieving of meta fields.
 * Uses EEM_Payment_Method as the model
 */
class EE_Payment_Method_Form extends EE_Model_Form_Section{
	/**
	 * All the subsection inputs that correspond ot extra meta rows
	 * for this payment method
	 * @var EE_Form_Input_Base
	 */
	protected $_extra_meta_inputs = array();
	/**
	 * Because payment method form might DELAY part of construction, we want to remember
	 * what options were passed in
	 * @var array
	 */
	protected $_options_array = array();
	/**
	 * The paymetn method type for this form
	 * @var EE_PMT_Base
	 */
	protected $_payment_method_type;
	/**
	 * 
	 * @param array $options_array {
	 *	@type string $extra_meta_inputs should be EE_Form_Section_Validatable[] which
	 *		will be _subsections and will be saved as extra meta on the payment method object;
	 *	@type EE_PMT_Base $payment_method_type the paymetn method type this form is for
	 *	@see EE_Model_Form_Section::__construct() for more
	 * }
	 */
	public function __construct($options_array = array()){
		$this->_model = EEM_Payment_Method::instance();
		$this->_options_array = $options_array;
		//determine the paymetn method type corresponding to this payment method form
		$caller = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT,2);
		if( ! isset($options_array['payment_method_type'])){
			$caller_we_hope_is_pm = $caller[1]['object'];
			$this->_payment_method_type = $caller_we_hope_is_pm;
		}elseif(isset($options_array['payment_method_type'])){
			$this->_payment_method_type = $options_array['payment_method_type'];
		}
		if( ! $this->_payment_method_type instanceof EE_PMT_Base){
			throw new EE_Error(sprintf(__("Payment Method forms MUST include option 'payment_method_type' or be called from a payment method type! It was called from %s", "event_espresso"),$caller[1]['class']));
		}
		$options_array = $this->_options_array;
		if(isset($options_array['extra_meta_inputs'])){
			$this->_extra_meta_inputs = array_merge($this->_extra_meta_inputs,$options_array['extra_meta_inputs']);
		}
		if($this->_extra_meta_inputs){
			$this->_subsections = array_merge($this->_subsections,$this->_extra_meta_inputs);
		}
		$this->_subsections['PMD_button_url'] = new EE_Admin_File_Uploader_Input(array(
			'html_label_text'=>  __("Button URL", 'event_espresso')
		));
		$this->_subsections['PMD_scope'] = new EE_Checkbox_Multi_Input(EEM_Payment_Method::instance()->scopes(),array(
			'html_label_text'=>$this->_model->field_settings_for('PMD_scope')->get_nicename()
		));
		//setup the currency options
		$this->_subsections['Currency'] = new EE_Select_Multi_Model_Input(EEM_Currency::instance()->get_all_currencies_usable_by($this->_payment_method_type),
				array(
			'html_label_text'=>  __("Currencies Supported", 'event_espresso'),
			'required'=>TRUE
		));
		//set the name of this form based on the payment method type
		if( ! $this->_name){
			$this->_name = str_replace(" ","_",ucwords(str_replace("_"," ",($this->_payment_method_type->system_name()))))."_Settings_Form";
		}
		parent::__construct($options_array);
	}
	/**
	 * extends the model form section's save method to also save the extra meta field values
	 * @return int ID of the payment method inserted, or true on update
	 */
	public function save(){
		$parent_save_val = parent::save();
		if( $this->_model_object && $this->_model_object->ID()){
			foreach($this->_extra_meta_inputs as $input_name => $input){
				$this->_model_object->update_extra_meta($input_name, $input->normalized_value());
			}
		}
		return $parent_save_val;
	}
	/**
	 * Overrides parentt's populate_model_obj to also populate the extra meta fields
	 * @param EE_Base_Class $model_obj
	 */
	public function populate_model_obj($model_obj) {
		$model_obj = $this->_model->ensure_is_obj($model_obj);
		parent::populate_model_obj($model_obj);
		$extra_metas = $model_obj->all_extra_meta_array();
		foreach($this->_extra_meta_inputs as $input_name => $extra_meta_input){
			if(isset($extra_metas[$input_name])){
				$extra_meta_input->set_default($extra_metas[$input_name]);
			}
		}
		$currency_input = $this->get_input('Currency');
		if($currency_input instanceof EE_Payment_Method_Currencies_Input){
			$currency_input->set_payment_method($model_obj);
		}
	}
	/**
	 * gets teh default name of this form section if none is specified
	 * @return string
	 */
	protected function _set_default_name_if_empty(){
		if( ! $this->_name ){
			$default_name = str_replace("EEM_", "", get_class($this->_model)) . "_Model_Form";
			$this->_name =  $default_name;
		}
	}
}
