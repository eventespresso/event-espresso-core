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
	
	/**
	 *
	 * @var EE_Base_Class
	 */
	protected $_model_object = NULL;
	/**
	 * 
	 * @param array $options_array keys: <ul>
	 * <li>'model' which should be an EEM_Base child;</li>
	 * <li>'model_object' which is a EE_Base_Class (providing this is equivalent to constructing and then calling set_model_object)</li>
	 * <li>and parent's keys too</li></ul>
	 * @throws EE_Error
	 */
	public function __construct($options_array = array()){
		if(isset($options_array['model']) && $options_array['model'] instanceof EEM_Base){
			$this->_model = $options_array['model'];
			$this->_name = str_replace("EEM_","",get_class($options_array['model']));
		}
		if( ! $this->_model || ! $this->_model instanceof EEM_Base ){
			throw new EE_Error(sprintf(__("Model Form Sections must first specify the _model property to be a subcalss of EEM_Base", "event_espresso")));
		}
		
		$model_fields = $this->_model->field_settings();
		//calculate what fields to include
		$this->_subsections = array_merge($this->_subsections,$this->_convert_model_fields_to_inputs($model_fields));
		parent::__construct($options_array);
		if(isset($options_array['model_object']) && $options_array['model_object'] instanceof EE_Base_Class){
			$this->populate_model_obj($options_array['model_object']);
		}
		parent::__construct($options_array);
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
					$input_class = 'EE_Text_Input';
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
				case 'EE_Foreign_Key_String_Field':
					$models_pointed_to = $model_field->get_model_class_names_pointed_to();
					if(true || is_array($models_pointed_to) && count($models_pointed_to) > 1){
						$input_class = 'EE_Text_Input';
					}else{
						//so its just one model
						$model_name = is_array($models_pointed_to) ? reset($models_pointed_to) : $models_pointed_to;
//						d($model_name);
						$model = EE_Registry::instance()->load_model($model_name);
						$model_names = $model->get_all_names(array('limit'=>10));
						$input_constructor_args[1] = $input_constructor_args[0];
						$input_class[0] = $model_names;
						$input_class = 'EE_Select_Input';
					}					
					break;
				case 'EE_Full_HTML_Field':
					$input_class = 'EE_Text_Area_Input';
					break;
				case 'EE_Infinite_Integer':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Integer_Field':
					$input_class = 'EE_Text_Input';
					break;
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Maybe_Serialized_Text_Field':
					$input_class = 'EE_Text_Area_Input';
					break;
				case 'EE_Money_Field':
					throw new EE_Error(sprintf(__("Model field '%s' does not yet have a known conversion to form input", "event_espresso"),get_class($model_field)));
					break;
				case 'EE_Plain_Text_Field':
					$input_class = 'EE_Text_Input';
					break;
				case 'EE_Primary_Key_Int_Field':
					$input_class = 'EE_Hidden_Input';
					$input_constructor_args['normalization_strategy'] = new EE_Int_Normalization();
					break;
				case 'EE_Primary_Key_String_Field':
					$input_class = 'EE_Hidden_Input';
					break;
				case 'EE_Serialized_Text_Field':
					$input_class = 'EE_Text_Area_Input';
					break;
				case 'EE_Simple_HTML_Field':
					$input_class = 'EE_Text_Area_Input';
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
	 * and also sets the form's _model_object
	 * @param EE_Base_Class $model_obj
	 * @return void
	 */
	public function populate_model_obj($model_obj){
		$model_obj = $this->_model->ensure_is_obj($model_obj);
		$this->_model_object = $model_obj;
		$this->populate_defaults($model_obj->model_field_array());
	}
	/**
	 * Gets all the input values that correspond to model fields. Keys are the input/field names,
	 * values are their normalized values
	 * @return array
	 */
	public function inputs_values_corresponding_to_model_fields(){
		return array_intersect_key($this->input_values(),$this->_model->field_settings());
	}
	public function receive_form_submission($req_data = NULL) {
		parent::receive_form_submission($req_data);
		//create or set the model object, if it isn't already
		if( ! $this->_model_object ){
			//check to see if the form indicates a PK, in which case we want to only retrieve it and update it
			$pk_name = $this->_model->primary_key_name();
			$model_obj = $this->_model->get_one_by_ID($this->get_input_value($pk_name));
			if($model_obj){
				$this->_model_object = $model_obj;
			}else{
				$this->_model_object = EE_Registry::instance()->load_class($this->_model->get_this_model_name(), $this->inputs_values_corresponding_to_model_fields() );
			}
		}else{
			//ok so the model object is already set. Just set it with the submitted form data (don't save yet though)
			foreach($this->inputs_values_corresponding_to_model_fields() as $field_name=>$field_value){
				//only set the non-primary key
				if($field_name != $this->_model->primary_key_name()){
					$this->_model_object->set($field_name,$field_value);
				}
			}
		}
	}
	/**
	 * After this form has been initialized and is verified to be valid,
	 * either creates a model object from its data and saves it, or updates
	 * the model object its data represents
	 * @return int, 1 on a successful update, the ID of
	 *					the new entry on insert; 0 on failure	
	 */
	public function save(){
		if( ! $this->_model_object){
			throw new EE_Error(sprintf(__("Cannot save the model form's model object (model is '%s') because there is no model object set. You must either set it, or call receive_form_submission where it is set automatically", "event_espresso"),get_class($this->_model)));
		}
		return $this->_model_object->save();
	}
	/**
	 * Gets the model of this model form
	 * @return EEM_Base
	 */
	public function get_model(){
		return $this->_model;
	}
	/**
	 * Sets the model object. Probably good to use this for permissions considerations,
	 * so that users don't change the hidden primary key input in the form and thus
	 * change an entry they shouldn't have access to
	 * @param mixed $model_object EE_Base_Class or its ID
	 * @return void
	 */
	public function set_model_object($model_object){
		$model_object = $this->_model->ensure_is_obj($model_object);
		$this->_model_object = $model_object;
	}
	/**
	 * Gets the model object for this model form, which was either set
	 * upon construction (using the $options_array arg 'model_object'), by using
	 * set_model_object($model_obj), or implicitly
	 * when receive_form_submission($req_data) was called.
	 * @return EE_Base_Class
	 */
	public function get_model_object(){
		return $this->_model_object;
	}
	
}