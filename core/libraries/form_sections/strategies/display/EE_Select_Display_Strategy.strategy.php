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
		EE_Registry::instance()->load_helper('Array');

		$html = EEH_HTML::nl( 0, 'select' );
		$html .= '<select';
		$html .= ' id="' . $this->_input->html_id() . '"';
		$html .= ' name="' . $this->_input->html_name() . '"';
		$class = $this->_input->required() ? $this->_input->required_css_class() . ' ' . $this->_input->html_class() : $this->_input->html_class();
		$html .= ' class="' . $class . '"';
		// add html5 required

		$html .= $this->_input->required() ? ' required' : '';
		$html .= ' style="' . $this->_input->html_style() . '"';
		$html .= '>';

//		EEH_HTML::indent( 1, 'select' );
		if ( EEH_Array::is_multi_dimensional_array( $this->_input->options() )) {
			EEH_HTML::indent( 1, 'optgroup' );
			foreach( $this->_input->options() as $opt_group_label => $opt_group ){
				$html .= EEH_HTML::nl( 0, 'optgroup' ) . '<optgroup label="' . esc_attr( $opt_group_label ) . '">';
				EEH_HTML::indent( 1, 'option' );
				$html .= $this->_display_options( $opt_group );
				$html .= EEH_HTML::indent( -1, 'option' );
				$html .= EEH_HTML::nl( 0, 'optgroup' ) . '</optgroup>';
			}
			EEH_HTML::indent( -1, 'optgroup' );
		} else {
			$html.=$this->_display_options( $this->_input->options() );
		}

		$html.= EEH_HTML::nl( 0, 'select' ) . '</select>';
//		$html.= EEH_HTML::nl( -1, 'select' ) . '</select>';
		return $html;
	}



	/**
	 * Displays a flat list of options as option tags
	 * @param array $options
	 * @return string
	 */
	protected function _display_options($options){
		$html = '';
		EEH_HTML::indent( 1, 'option' );
		foreach( $options as $value => $display_text ){
			$unnormalized_value = $this->_input->get_normalization_strategy()->unnormalize_one( $value );
			$selected = $this->_check_if_option_selected( $unnormalized_value ) ? ' selected="selected"' : '';
			$html.= EEH_HTML::nl( 0, 'option' ) . '<option value="' . esc_attr( $unnormalized_value ) . '"' . $selected . '>' . $display_text . '</option>';
		}
		EEH_HTML::indent( -1, 'option' );
		return $html;
	}



	/**
	 * Checks if that value is the one selected
	 * @param string|int $value unnormalized value option (string)
	 * @return string
	 */
	protected function _check_if_option_selected( $value ){
		return $this->_input->raw_value() == $value ? TRUE : FALSE;
	}



}