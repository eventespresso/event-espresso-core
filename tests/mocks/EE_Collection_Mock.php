<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Collection_Mock
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.31
 *
 */
class EE_Collection_Mock extends EE_Collection {

	/**
	 * EE_Collection_Mock constructor.
	 */
	public function __construct() {
		$this->interface = 'EE_Ticket';
	}

}
// End of file EE_Collection_Mock.php
// Location: /tests/mocks/EE_Collection_Mock.php