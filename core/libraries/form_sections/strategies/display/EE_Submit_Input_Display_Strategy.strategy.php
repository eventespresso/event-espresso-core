<?php



/**
 * Class EE_Submit_Input_Display_Strategy
 * Description
 *
 * @package       Event Espresso
 * @author        Mike Nelson
 */
class EE_Submit_Input_Display_Strategy extends EE_Display_Strategy_Base{

    const HTML_TAG_BUTTON = 'button';
    const HTML_TAG_INPUT = 'input';


	/**
	 *
	 * @return string of html to display the input
	 */
	public function display(){
	    $default_value = $this->_input->get_default();
	    if ($this->_input->get_normalization_strategy() instanceof  EE_Normalization_Strategy_Base) {
	        $default_value = $this->_input->get_normalization_strategy()->unnormalize($default_value);
        }
	    $value_in_form = htmlentities(
            $default_value,
            ENT_QUOTES,
            'UTF-8'
        );
        $tag = apply_filters(
          'FHEE__EE_Submit_Input_Display_Strategy__display__submit_input_html_tag',
          EE_Submit_Input_Display_Strategy::HTML_TAG_INPUT
        );
        // verify result is one of the two valid options
        $tag = $tag === EE_Submit_Input_Display_Strategy::HTML_TAG_BUTTON
               || $tag === EE_Submit_Input_Display_Strategy::HTML_TAG_INPUT
            ? $tag
            : EE_Submit_Input_Display_Strategy::HTML_TAG_INPUT;
		$html = '<' . $tag . ' type="submit" ';
		$html .= 'name="' . $this->_input->html_name() . '" ';
		$html .= 'value="' . $value_in_form . '" ';
		$html .= 'id="' . $this->_input->html_id() . '-submit" ';
		$html .= 'class="' . $this->_input->html_class() . ' ' . $this->_input->button_css_attributes() . '" ';
		$html .= 'style="' . $this->_input->html_style() . '" ';
		$html .= $this->_input->other_html_attributes();
		if($tag === EE_Submit_Input_Display_Strategy::HTML_TAG_BUTTON) {
            $button_text = $this->_input->html_label_text();
            $button_text = ! empty($button_text)
                ? $button_text
                : $value_in_form;
            $html .= '>';
            $html .= $button_text;
            $html .= '</button>';
        } else {
            $html .= '/>';
        }
        return $html;
	}

}
