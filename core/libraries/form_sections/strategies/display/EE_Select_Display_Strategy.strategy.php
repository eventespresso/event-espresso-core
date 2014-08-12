<?php
/**
 *
 * Class EE_Select_Display_Strategy
 *
 * displays either simple arrays as selected, or if a 2d array is provided, separates them into optgroups
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EE_Select_Display_Strategy extends EE_Display_Strategy_Base{

	/**
	 *
	 * @throws EE_Error
	 * @return string of html to display the field
	 */
	function display(){
		if( ! $this->_input instanceof EE_Form_Input_With_Options_Base){
			throw new EE_Error( sprintf( __( 'Cannot use Select Display Strategy with an input that doesn\'t have options', 'event_espresso' )));
		}
		EE_Registry::instance()->load_helper('Formatter');
		EE_Registry::instance()->load_helper('Array');

		$html = EEH_Formatter::nl();
		$html .= '<select ';
		$html .= 'id="' . $this->_input->html_id() . '" ';
		$html .= 'name="' . $this->_input->html_name() . '"';
		$class = $this->_input->required() ? 'ee-needs-value ' . $this->_input->html_class() : $this->_input->html_class();
		$html .= ' class="' . $class . '" ';
		$html .= 'style="' . $this->_input->html_style() . '"';
		$html .= '>';

		EEH_Formatter::indent( 1 );
		if ( EEH_Array::is_multi_dimensional_array( $this->_input->options() )) {
			foreach( $this->_input->options() as $opt_group_label => $opt_group ){
				$html .= EEH_Formatter::nl() . '<optgroup label="' . esc_attr( $opt_group_label ) . '">';
				EEH_Formatter::indent( 1 );
				$html .= $this->_display_options( $opt_group );
				$html .= EEH_Formatter::nl( -1 ) . '</optgroup>';
			}
		} else {
			$html.=$this->_display_options( $this->_input->options() );
		}

		$html.= EEH_Formatter::nl(-1) . '</select>';
		return $html;
	}



	/**
	 * Displays a flat list of options as option tags
	 * @param array $options
	 * @return string
	 */
	protected function _display_options($options){

		$html = '';
		foreach( $options as $value => $display_text ){
			$value_in_form = esc_attr( $this->_input->get_normalization_strategy()->unnormalize( $value ));
			$selected_attr = $this->_input->normalized_value() == $value ? ' selected="selected"' : '';
			$html.= EEH_Formatter::nl() . '<option value="' . $value_in_form . '"' . $selected_attr . '>' . $display_text . '</option>';
		}
		return $html;
	}



	/**
	 * Checks if that value is the one selected
	 * @param string|int $value
	 * @return boolean
	 */
	protected function _check_if_option_selected( $value ){
		return $this->_input->normalized_value() == $value ? TRUE : FALSE;
	}



}