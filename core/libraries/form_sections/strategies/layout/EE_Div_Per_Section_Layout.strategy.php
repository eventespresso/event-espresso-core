<?php

class EE_Div_Per_Section_Layout extends EE_Form_Section_Layout_Base{
	function layout_form() {
		$form = $this->_form_section;
		$html = "<div class='{$form->html_class()}' id='{$form->html_id()}' style='{$form->html_style()}'>";
		foreach($this->_form_section->subsections() as $name=>$subsection){
			if($subsection instanceof EE_Form_Input_Base){
				$html.=$this->layout_input($subsection);
			}elseif($subsection instanceof EE_Form_Section_Proper){
				$html.=$this->layout_proper_subsection($subsection);
			}
		}
		$html.="</div>";
		return $html;
	}
	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input($input) {
		return '<div>'.$input->get_html_for_label().'<br/>'.$input->get_html_for_input().$input->get_html_for_errors().'</div>';
	}
	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $formsection
	 */
	public function layout_proper_subsection($formsection){
		return '<div>'.$formsection->get_html_and_js().'</div>';
	}
}