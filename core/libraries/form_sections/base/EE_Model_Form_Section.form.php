<?php

/*
 * For auto-generating form sections based off a model.
 * 
 */
class EE_Model_Form_Section extends EE_Form_Section_Proper{
	
	/**
	 *
	 * @var EEM_Base
	 */
	protected $_model = NULL;
	
	protected $_bound_model_object = NULL;
	
	//@todo: allow to specify fields
	//@todo: or allow to instead exclude certain fields
	//@todo: convert model fields to form inputs
	//@todo: allow to be bound to a particular instance
	//@todo: have save method
	//@todo: have get_model_object method
	//@todo: allow for overriding default fields
	public function __construct($options_array = array()){
		if( ! $this->_model || ! $this->_model instanceof EEM_Base ){
			throw new EE_Error(sprintf(__("Model Form Sections must first specify the _model property to be a subcalss of EEM_Base", "event_espresso")));
		}
		//don't allow 'fields_to_include' AND 'fields_to_exclude'
		if(isset($options_array['fields_to_include']) && isset($options_array['fields_to_exclude'])){
			throw new EE_Error(sprintf(__("When creating a model form section, you cannot include BOTH fields_to_include AND fields_to_exclude)", "event_espresso")));
		}
		$model_fields = $this->_model->field_settings();
		if(isset($options_array['fields_to_include'])){
			$fields_to_include = $options_array['fields_to_include'];
			$model_fields_to_include = array_intersect_key($model_fields, array_flip($fields_to_include));
		}elseif(isset($options_array['fields_to_exclude'])){
			$fields_to_exclude = array_merge($this->_fields_to_exclude,$options_array['fields_to_exclude']);
			$model_fields_to_include = array_diff_key($model_fields, array_flip($fields_to_exclude));
		}else{
			$model_fields_to_include = $model_fields;
		}
		//calculate what fields to include
		$this->_subsections = array_merge($this->_subsections,$this->_convert_model_fields_to_inputs($model_fields_to_include));
	}
	/**
	 * Changes model fields into form section inputs
	 * @param EE_Model_Field_Base $model_fields keys are the model's name
	 * @return EE_Form_Input_Base
	 */
	protected function _convert_model_fields_to_inputs($model_fields){
		$inputs = array();
		foreach($model_fields as $field_name=>$model_field){
			$input_constructor_args = array(array(
				'required'=> ! $model_field->is_nullable(),
				'html_label_text'=>$model_field->get_nicename(),
				'default'=>$model_field->get_default_value(),
			));
			switch(get_class($model_field)){
				case 'EE_All_Caps_Text_Field':
				case 'EE_Any_Foreign_Model_Name_Field':
					break;
				case 'EE_Boolean_Field':
					$input_class = 'EE_Yes_No_Input';
					break;
				case 'EE_Datetime_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Email_Field':
					$input_class = 'EE_Email_Input';
					break;
				case 'EE_Enum_Integer_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Enum_Text_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Float_Field':
					$input_class = 'EE_Float_Input';
					break;
				case 'EE_Foreign_Key_Int_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Foreign_Key_String_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Full_HTML_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Infinite_Integer':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Integer_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Maybe_Serialized_Text_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Money_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Plain_Text_Field':
					$input_class = 'EE_Text_Input';
					break;
				case 'EE_Primary_Key_Int_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Primary_Key_String_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Serialized_Text_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Simple_HTML_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Slug_Field':
					$input_class = 'EE_Text_Input';
					break;
				case 'EE_Trashed_Flag_Field':
					$input_class = 'EE_Yes_No_Input';
					break;
				case 'EE_WP_Post_Status_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_WP_Post_Type_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				default:
					throw new EE_Error(sprintf(__("Model field of type '%s' does not convert to any known Form Input. Please add a case to EE_Model_Form_section's _convert_model_fields_to_inputs switch statement", "event_espresso"),get_class($model_field)));
			}
			$reflection = new ReflectionClass($input_class); 
			$input = $reflection->newInstanceArgs($input_constructor_args); 
			$inputs[$field_name] = $input;
		}
		return $inputs;
	}
	/**
	 * Mostly the same as populate_defaults , except takes a model object as input, not an array,
	 * and also sets the form's _bound_model_object
	 * @param EE_Base_Class $model_obj
	 * @return void
	 */
	public function populate_model_obj($model_obj){
		$model_obj = $this->_model->ensure_is_obj($model_obj);
		$this->_bound_model_object = $model_obj;
		$this->populate_defaults($model_obj->model_field_array());
	}
}