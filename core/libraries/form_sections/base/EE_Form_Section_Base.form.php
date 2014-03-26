<?php
/**
 * Class for cross-cutting job of handling forms.
 * In the presentation layer Form Sections handle the display of form inputs on the page.
 * In both the presentation and controller layer, Form Sections handle validation (by js and php)
 * Used from within a controller, Form Sections handle input sanitization.
 * And the EE_Model_Form_Section takes care of taking a model object and producing a generic form section,
 * and takes a filled form section, and can save the model object to the database.
 * Note there are actually two children of EE_Form_SEction_Base: EE_Form_Section_Proper and EE_Form_INput_Base.
 * The former is what you probably expected EE_Form_SEction_Base to be, whereas the latter is the parent class for
 * all fields within a form section. So this means that a Form Input is considered a subsection of form section in its own right.
 */
abstract class EE_Form_Section_Base{
	protected $_html_id;
	protected $_html_class;
	protected $_html_style;
	
	
	/**
	 * html_id and html_name are derived from this by default
	 * @var string
	 */
	protected $_name;
	
	/**
	 * The form section of which this form section is a part
	 * @var EE_Form_Section_Proper
	 */
	protected $_parent_section;
	
	/**
	 * flag indicating that _construct_finalize has been called.
	 * If it hasn't been called and we try to use functions which require it, we call it
	 * with no parameters. But normally, _construct_finalize should be called by the instantiating class
	 * @var boolean
	 */
	private $_construction_finalized;
	
	
	/**
	 * Array of validation errors in this section. Does not contain validation errors in subsections, however.
	 * Those are stored individually on each subsection.
	 * @var EE_Validation_Error[]
	 */
	protected $_validation_errors;
	
	function __construct($options_array = array()){
		
	}
	protected function _construct_finalize( $parent_form_section, $name ){
		$this->_parent_section = $parent_form_section;
		$this->_name = $name;
		$this->_set_default_html_id_if_empty();
	}
	
	
	
	
	/**
	 * Sets the html_id to its default value, if none was specified in the constructor. 
	 * Calculation involves using the name and the parent's html id
	 * return void
	 */
	protected function _set_default_html_id_if_empty(){
		if( ! $this->_html_id ){
			if( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper ){
				$this->_html_id = $this->_parent_section->html_id() . '-' . strtolower( str_replace( '_', '-', $this->_name ));
			}else{
				$this->_html_id = strtolower( str_replace( '_', '-', $this->_name ));
			}
		}
	}
	
	
	
	/**
	 * Errors on this form section. Note: EE_Form_Section_Proper
	 * has another function for getting all errors in this form section and subsections
	 * @return EE_Validation_Error[]
	 */
	public function get_validation_errors(){
		return $this->_validation_errors;
	}
	/**
	 * returns a ul html element with all the validation errors in it.
	 * If we want this to be customizable, we may decide to create a strategy for displaying it.
	 * @return string
	 */
	public function get_validation_error_string(){
		$validation_error_messages = array();
		if($this->get_validation_errors()){
			foreach($this->get_validation_errors() as $validation_error){
				$validation_error_messages[] =$validation_error->getMessage();
			}
		}
		
		return implode(", ",$validation_error_messages);
	}
	
	
	
	/**
	 * Performs validation on this form section (and subsections). Should be called after _sanitize()
	 * @param array $req_data
	 * @return boolean of whether or not the form section is valid
	 */
	abstract protected function _validate();
	
	/**
	 * Checks if this field has any validation errors
	 * @return boolean
	 */
	public function is_valid() {
		if(count($this->_validation_errors)){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * Sanitizes input for this form section
	 * @param $req_data is the full request data like $_POST
	 * @return boolean of whether a normalization error occurred
	 */
	abstract protected function _normalize($req_data);
	
	/**
	 * Returns the HTML, JS, and CSS necessary to display this form section on a page.
	 * @return string
	 */
	abstract protected function get_html();
	
	public function html_id(){
		return $this->_html_id;
	}
	function html_class(){
		return $this->_html_class;
	}
	function html_style(){
		return $this->_html_style;
	}
	/**
	 * Gets the name of the form section. This is not the saem as the HTML name.
	 * @return string
	 */
	function name(){
		return $this->_name;
	}
	/**
	 * Creates a validation error from the arguments provided, and adds it to the form section's list.
	 * If such an EE_Validation_Error object is passed in as the first arg, simply sets this as its form section, and adds
	 * it to the list of validation errors
	 * of errors
	 * @param mixed string $message internationalized string describing the validation error; or it could be a proper EE_Validation_Error object
	 * @param string $error_code a short key which can be used to uniquely identify the error
	 * @param Exception $previous_exception if there was an exception that caused the error, that exception
	 * @return void
	 */
	function add_validation_error($message_or_object, $error_code = null,$previous_exception = null){
		if($message_or_object instanceof EE_Validation_Error){
			$validation_error= $message_or_object;
			$validation_error->set_form_section($this);
		}else{
			$validation_error = new EE_Validation_Error($message_or_object, $error_code, $this, $previous_exception);
		}
		$this->_validation_errors[] = $validation_error;
	}
	
	/**
	 * When generating the JS for the jquery valiation rules like<br>
	 * <code>$( "#myform" ).validate({
		rules: {
		  password: "required",
		  password_again: {
			equalTo: "#password"
		  }
		}
	  });</code>
		gets the sections like
	 * <br><code>password: "required",
	 		password_again: {
			equalTo: "#password"
		  }</code>
	 * except we leave it as a PHP obejct, and leave wp_localize_script to 
	 * turn it into a JSON object which can be used by the js
	 * @return array
	 */
	abstract function get_jquery_validation_rules();
	
	
	/**
	 * using this section's name and its parents, finds the value of the form data that corresponds to it.
	 * For example, if this form section's name is my_form[subform][form_input_1], then it's value should be in $_REQUEST
	 * at $_REQUEST['my_form']['subform']['form_input_1']. This function finds its value in the form.
	 */
	public function find_form_data_for_this_section($req_data){
		if( $this->_parent_section ){
			$array_of_parent = $this->_parent_section->find_form_data_for_this_section($req_data);
		}else{
			$array_of_parent = $req_data;
		}
		return isset($array_of_parent[$this->name()]) ? $array_of_parent[$this->name()] : null;
	}
	/**
	 * Checks if this form section's data is present in the req data specified
	 * @param array $req_data usually $_POST, if null that's what's used
	 * @return boolean
	 */
	public function form_data_present_in($req_data = NULL){
		if($req_data === NULL){
			$req_data = $_POST;
		}
		return $this->find_form_data_for_this_section($req_data) !== NULL;
	}
}