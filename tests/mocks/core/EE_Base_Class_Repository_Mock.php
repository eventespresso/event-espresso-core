<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Base_Class_Repository_Mock
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.7.10
 *
 */
class EE_Base_Class_Repository_Mock extends EE_Base_Class_Repository {


	/**
	 * EE_Object_Repository_Mock constructor.
	 */
	public function __construct() {
		$this->interface = 'EE_Ticket';
		parent::__construct();
	}


}
// End of file EE_Base_Class_Repository_Mock.php
// Location: /tests/mocks/core//EE_Base_Class_Repository_Mock.php