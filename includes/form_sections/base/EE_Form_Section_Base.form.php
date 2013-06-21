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
	 * Sets the html_id to its default value, if none was specified in the constructor. 
	 * Calculation involves using the name and the parent's html id
	 * return void
	 */
	protected function _set_default_html_id_if_empty(){
		if( ! $this->_html_id ){
			if( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper){
				$this->_html_id = $this->_parent_section->html_id() . "-" . $this->_name;
			}else{
				$this->_html_id = $this->_name;
			}
		}
	}
	
	/**
	 * Sets the html_name to its dfeautl value, if none was specified in teh constructor.
	 * Calcuation involves using hte name and the parent's html_name
	 */
	protected function _set_default_html_name_if_empty(){
		if( ! $this->_html_name){
			if( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper){
				$this->_html_id = $this->_parent_section->html_id() . "[{$this->_name}]";
			}else{
				$this->_html_id = $this->_name;
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
	 * Usually $_POST or $_GET data submitted. Extracts the request data which is
	 * relevant to this form section and stores it, after having validated and sanitized it.
	 * The form section will take care
	 * of deciding which data pertains to it, and what data does not.
	 * @param array $_req_data
	 */
	public function handle_request($req_data){
		$this->_validate($req_data);
		$this->_sanitize($req_data);
	}
	
	
	/**
	 * Performs validation on this form section (and subsections)
	 * @param array $req_data
	 */
	abstract protected function _validate($req_data);
	
	/**
	 * Sanitizes input for this form section
	 */
	abstract protected function _sanitize($req_data);
	
	/**
	 * Returns the HTML, JS, and CSS necessary to display this form section on a page.
	 * @return string
	 */
	abstract protected function display();
	
	/**
	 * Stores whether or not this form section (and possibly subsections) is valid.
	 * @var boolean
	 */
	protected $_is_valid;
	
	/**
	 * Returns whether or not the form section (and subsections) passed validation or not
	 * @param type $req_data
	 */
	public function is_valid(){
		return $this->_is_valid;
	}
	
	public function html_id(){
		return $this->_html_id;
	}
	function html_class(){
		return $this->_html_class;
	}
	function html_style(){
		return $this->_html_style;
	}
}