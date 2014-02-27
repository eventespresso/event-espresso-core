<?php
/**
 * For containing info about a non-field form section, which contains other form sections/fields.
 * Relies heavily on the script form_section_validation.js for client-side validation, mostly
 * the php code just provides form_section_validation.js with teh variables to use.
 * Important: in order for the JS to be loaded properly, you must construct a form section
 * before the hook wp_enqueue_scripts is called (so that the form section can enqueue its needed scripts).
 * However, you may output the form (usually by caling get_html_and_js) anywhere you like.
 */
class EE_Form_Section_Proper extends EE_Form_Section_Base{
	/**
	 * Subsections
	 * @var EE_Form_Section_Base[]
	 */
	protected $_subsections;
	
	
	/**
	 * when constructing a proper form section, calls _construct_finalize on children
	 * so that they know who their parent is, and what name they've been given.
	 */
	public function __construct($options_array = array()){
		$this->_set_default_name_if_empty();
		$this->_set_default_html_id_if_empty();
		foreach($this->_subsections as $name => $subsection){
			$subsection->_construct_finalize($this, $name);
		}
		
		parent::__construct($options_array);
		
		$this->_enqueue_jquery_validate_script();
	}
	
	/**
	 * After the form section is initially created, call this to sanitize the data in the submission
	 * which relates to this form section, validate it, and set it as properties on the form.
	 * @param array $req_data 
	 */
	public function receive_form_submission($req_data){
		foreach($this->_subsections as $subsection){
			$subsection->_sanitize($req_data);
			$subsection->_validate();
		}
	}
	/**
	 * Checks if this form section itself is valid, and then checks its subsections
	 * @return boolean
	 */
	public function is_valid() {
		if( ! parent::is_valid()){
			return false;
		}
		//ok so no errors general to this entire form section. so let's check the subsections
		foreach($this->_subsections as $subsection){
			if( ! $subsection->is_valid()){
				return false;
			}
		}
		return true;
	}
	
	/**
	 * adds a filter so taht jquery validate gets enqueued in EE_System::wp_enqueue_scripts().
	 * This must be done BEFORE wp_enqueue_scripts() gets called, which is on 
	 * the wp_enqueue_scripts hook.
	 * However, registering the form js and localizing it can happen when we 
	 * actually output the form (which is preferred, seeing how teh form's fields
	 * could change until it's actually outputted)
	 * @return void
	 */
	protected function _enqueue_jquery_validate_script(){
		add_filter( 'FHEE_load_jquery_validate', '__return_true' );
	}
	
	/**
	 * gets teh default name of this form section if none is specified
	 * @return string
	 */
	protected function _set_default_name_if_empty(){
		if( ! $this->_name ){
			$classname = get_class($this);
			$default_name = str_replace("EE_", "", $classname);
			$this->_name =  $default_name;
		}
	}
	
	
	
	
	
	/**
	 * Returns the JS for validating the form (and subsections) inside script tags. 
	 * Also returns the HTML for the form, except for the form opening and closing tags 
	 * (as the form section doesn't know where you necessarily want to send the information to), and except for a submit button.
	 */
	public function get_html_and_js(){
		$this->_enqueue_and_localize_form_js();
		return $this->get_html();
	}
	
	/**
	 * returns HTML for displaying this form section. recursively calls display_section() on all subsections
	 * @return string
	 */
	public function get_html(){
		$content = "<div id='{$this->html_id()}' class='{$this->html_class()}' style='{$this->html_style()}'>";
		foreach($this->_subsections as $subsection){
			$content.= $subsection->get_html()."<br>";
		}
		$content.="</div>";
		return $content;
	}
	
	/**
	 * gets the variables used by form_section_validation.js.
	 * This needs to be called AFTER we've called $this->_enqueue_jquery_validate_script,
	 * but before the wordpress hook wp_loaded
	 */
	public function _enqueue_and_localize_form_js(){
		wp_register_script('jquery-validate', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.validate.min.js', array('jquery'), '1.11.1', TRUE);	
		wp_enqueue_script('ee_form_section_validation', EVENT_ESPRESSO_PLUGINFULLURL.'scripts/form_section_validation.js', array('jquery-validate'),
				'1',true);
		$validation_rules = $this->get_jquery_validation_rules();
		$form_section_id = $this->html_id();
		wp_localize_script('ee_form_section_validation','ee_form_section_vars',array(
			'form_section_id'=>'#'.$form_section_id,
			'validation_rules'=>$validation_rules,
			'localized_error_messages'=>$this->_get_localied_error_messages()));
	}
	
	/**
	 * Gets the hard-coded validation error messages to be used in the JS. The convention
	 * is that the key here should be the same as the custom validation rule put in the JS file
	 * @return array keys are custom validation rules, and values are internationalized strings
	 */
	private function _get_localied_error_messages(){
		return array(
			'validUrl'=>  __("This is not a valid absolute URL. Eg, http://mysite.com/monkey.jpg", "event_espresso")
		);
	}
	
	/**
	 * Gets the JS to put inside the jquery validation rules for subsection of this form section. See parent function for more...
	 * @return array
	 */
	function get_jquery_validation_rules(){
		$jquery_validation_rules = array();
		foreach($this->_subsections as $subsection){
			$jquery_validation_rules = array_merge($jquery_validation_rules,  $subsection->get_jquery_validation_rules());
		}
		return $jquery_validation_rules;
	}
	
	/**
	 * Sanitizes all the data and sets the sanitized value of each field
	 * @param array $req_data like $_POST
	 */
	protected function _sanitize($req_data) {
		foreach($this->_subsections as $subsection){
			$subsection->_sanitize($req_data);
		}
	}
	/**
	 * 
	 * @param type $req_data
	 */
	protected function _validate() {
		foreach($this->_subsections as $subsection){
			$subsection->_validate();
		}
	}
}
