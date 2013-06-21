<?php
/**
 * For containing info about a non-field form section, which contains other form sections/fields.
 */
require_once('base/EE_Form_Section_Base.form.php');
class EE_Form_Section_Proper extends EE_Form_Section_Base{
	/**
	 * Subsections
	 * @var EE_Form_Section_Base[]
	 */
	protected $_subsections;
	
	public function __construct(){
		
	}
	
	public function construct_finalize($parent_form_section, $name){
		$this->_parent_form_section = $parent_form_section;
		$this->_name = $name;
		$this->_set_default_html_name_if_empty();
		$this->_set_default_html_id_if_empty();
		$this->_set_default_html_name_if_empty();
		
		
	}
	
	
	
	/**
	 * returns HTML for displaying this form section. recursively calls display() on all subsections
	 * @return string
	 */
	public function display(){
		$content = "<div id='{$this->html_id()}' class='{$this->html_class()}' style='{$this->html_style()}'>";
		foreach($this->_subsections as $subsection){
			$content.=$subsection->display();
		}
		$content.="</div>";
		return $content;
	}
	/**
	 * 
	 * @param type $req_data
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
	protected function _validate($req_data) {
		foreach($this->_subsections as $subsection){
			$subsection->_validate($req_data);
		}
	}
}
