<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * EE_Form_Section_HTML
 * HTML to be laid out like a proper subsection
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



	/**
	 * @param string $html
	 * @param array $options_array
	 */
	public function __construct( $html = '', $options_array = array() ) {
		$this->_html = $html;
		parent::__construct( $options_array );
	}



	/**
	 * Returns the HTML
	 * @return string
	 */
	public function get_html() {
		return $this->_html;
	}

}

// End of file EE_Form_Section_HTML.form.php