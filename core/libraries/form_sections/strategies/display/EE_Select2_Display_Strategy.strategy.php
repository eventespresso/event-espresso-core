<?php
/**
 *
 * Class EE_Select_Display_Strategy
 *
 * Extends the EE_Select_Display_Strategy to also enqueue the select2.js and js to 
 * convert this input into a select2
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EE_Select2_Display_Strategy extends EE_Select_Display_Strategy{
	public function enqueue_js() {
		wp_enqueue_script( 'form_section_select2_init', EE_GLOBAL_ASSETS_URL . 'scripts/form_section_select2_init.js', array( 'select2' ), '1.0.0', true );
		
	}
}