<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Fieldset_Section_Layout
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */
class EE_Fieldset_Section_Layout extends EE_Div_Per_Section_Layout{



	/**
	 * opening div tag for a form
	 * @return string
	 */
	public function layout_form_begin() {
		return EEH_Formatter::nl(1) . '<fieldset id="' . $this->_form_section->html_id() . '" class="' . $this->_form_section->html_class() . '" style="' . $this->_form_section->html_style() . '">';
	}



	/**
	 * closing div tag for a form
	 * @return string
	 */
	public function layout_form_end(){
		return EEH_Formatter::nl(-1) . '</fieldset>';
	}



}
// End of file EE_Fieldset_Section_Layout.strategy.php
// Location: /EE_Fieldset_Section_Layout.strategy.php