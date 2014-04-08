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
 * EE_Form_Section_HTML
 * HTML to be layed out like a proper subsection
 * 
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Form_Section_HTML extends EE_Form_Section_Base{
	protected $_html = '';
	public function __construct($html,$options_array = array()) {
		$this->_html = $html;
		parent::__construct($options_array);
	}
	public function get_html_and_js() {
		return $this->_html;
	}
}

// End of file EE_Form_Section_HTML.form.php