<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Object_Repository_Mock
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.31
 *
 */
class EE_Object_Repository_Mock extends EE_Object_Repository {

	/**
	 * @param object $object
	 * @param mixed $info
	 * @return bool
	 */
	public function add_object( $object, $info = null ) {
		return $this->addObject( $object, $info );
	}



	/**
	 * @param mixed $info
	 * @return null | object
	 */
	public function get_object_by_info( $info ) {
		return $this->getObjectByInfo( $info );
	}



	/**
	 * @param object $object
	 * @return bool
	 */
	public function has_object( $object ) {
		return $this->hasObject( $object );
	}



	/**
	 * @param object $object
	 * @return bool | int
	 */
	public function save_object( $object ) {
		return $this->persistObject( $object );
	}



	/**
	 * @param object $object
	 * @return void
	 */
	public function remove_object( $object ) {
		$this->removeObject( $object );
	}



}
// End of file EE_Object_Repository_Mock.php
// Location: /tests/mocks/EE_Object_Repository_Mock.php