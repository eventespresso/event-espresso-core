<?php
/**
 * For containing info about a non-field form section, which contains other form sections/fields.
 */
class EE_Form_Section_Proper extends EE_Form_Section_Base{
	/**
	 * Subsections
	 * @var EE_Form_Section_Base[]
	 */
	protected $_subsections;
	
	protected static $jquery_validate_enqueued = false;
	
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
		if( ! EE_Form_Section_Proper::$jquery_validate_enqueued){
			$this->_enqueue_jquery_validate_script();
		}
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
	 * registers and enqueues the needed jquery
	 * @return void
	 */
	protected function _enqueue_jquery_validate_script(){
		EE_Form_Section_Proper::$jquery_validate_enqueued = true;
		espresso_register_jquery_validate();//function in includes/functions/frontend_init.php
		wp_enqueue_script('jquery-validate');
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
		$html_and_js = 
			"<script>".
			$this->get_validation_js().
			"</script>";
		$html_and_js.=$this->get_html();
		return $html_and_js;
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
	 * Gets javascript (no opening and closing tags though) for the jquery validation
	 * and all other validation js for subsections
	 * @return string
	 */
	public function get_validation_js(){	
		
		$js = "
		jQuery(document).ready(function(){jQuery('#{$this->html_id()}').closest('form').validate({";
		$js.= "rules : {";
		$jquery_validation_rules = array();
		foreach($this->_subsections as $subsection){
			$jquery_validation_rules[] = $subsection->get_jquery_validation_rules();
		}
		$js.=implode(", ",$jquery_validation_rules);
		$js.="}}); });";
		return $js;
	}
	/**
	 * Gets the non-jquery-validation-rules js for validating the form section.
	 * For a proper form section, that just means looping through its subsections
	 * until we arrive at a field
	 * @return string
	 */
	public function get_section_validation_js(){
		$js = '';
		foreach($this->_subsections as $subsection){
			$js.= $subsection->get_section_validation_js();
		}
		return $js;
	}
	
	/**
	 * Gets the JS to put inside the jquery validation rules for subsection of this form section. See parent function for more...
	 * @return string
	 */
	function get_jquery_validation_rules(){
		$jquery_validation_rules = array();
		foreach($this->_subsections as $subsection){
			$jquery_validation_rules[] = $subsection->get_jquery_validation_rules();
		}
		return implode(", ",$jquery_validation_rules);
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
