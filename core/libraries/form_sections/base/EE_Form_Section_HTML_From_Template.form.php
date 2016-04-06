<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Form_Section_HTML_From_Template
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Form_Section_HTML_From_Template extends EE_Form_Section_HTML{
	public function __construct($template_file,$args = array(), $options_array = array()) {
		$html = EEH_Template::locate_template( $template_file, $args );

//		echo " filepath:$template_file html $html";
		parent::__construct($html, $options_array);
	}
}

// End of file EE_Form_Section_HTML_From_Template.form.php