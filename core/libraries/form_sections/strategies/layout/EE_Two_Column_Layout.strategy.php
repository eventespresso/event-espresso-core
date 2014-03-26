<?php

class EE_Two_Column_Layout extends EE_Form_Section_Layout_Base{
	function layout_form() {
		$form = $this->_form_section;
		$html = "<table class='{$form->html_class()}' id='{$form->html_id()}' style='{$form->html_style()}'>";
		foreach($this->_form_section->subsections() as $name=>$subsection){
			if($subsection instanceof EE_Form_Input_Base){
				$html.=$this->layout_input($subsection);
			}elseif($subsection instanceof EE_Form_Section_Proper){
				$html.=$this->layout_proper_subsection($subsection);
			}
		}
		$html.="</table>";
		return $html;
	}
	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input($input) {
		return '<tr><th>'.$input->get_html_for_label().'</th><td>'.
				$input->get_html_for_input().
				'<br/>'.
				$input->get_html_for_help().
				$input->get_html_for_errors().'</td></tr>';
	}
	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $formsection
	 */
	public function layout_proper_subsection($formsection){
		return $html.='<tr><td colspan=2>'.$$formsection->get_html_and_js().'</td></tr>';
	}
}