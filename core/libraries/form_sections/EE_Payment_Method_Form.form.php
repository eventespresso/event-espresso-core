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
	 * 
	 * @param array $options_array keys:<ul>
	 * <li>'extra_meta_inputs' should be EE_Form_Section_Validatable[] which
	 * will be _subsections and will be saved as extra meta on the payment method object;</li>
	 * <li>and parent's keys</li>
	 * </ul>
	 */
	public function __construct($options_array = array()){
		//set the name according to the classname
		$this->_model = EEM_Payment_Method::instance();
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
		$options_array['subsection_args']['Currency']['model_objects'] = EEM_Currency::instance()->get_all_active();
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
