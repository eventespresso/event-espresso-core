<?php
/**
 * Like the standard two-column formsection layout, but this one adds css classes
 * specific to the WP Admin
 */

class EE_Admin_Two_Column_Layout extends EE_Two_Column_Layout{

	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		if(
			$input->get_display_strategy() instanceof EE_Checkbox_Display_Strategy
			|| $input->get_display_strategy() instanceof EE_Hidden_Display_Strategy
			|| $input->get_display_strategy() instanceof EE_Radio_Button_Display_Strategy
			|| $input->get_display_strategy() instanceof EE_Submit_Input_Display_Strategy
		){
			//leave these alone
		} else if ( $input->get_display_strategy() instanceof EE_Text_Area_Display_Strategy ) {
			$input->set_html_class( 'large-text' );
			if( $input instanceof EE_Text_Area_Input ){
				$input->set_rows( 4 );
				$input->set_cols( 60 );
			}
		} else {
			//standard-like textbox
			$input->set_html_class( 'large-text' );
		}
		return parent::layout_input( $input );

	}
}