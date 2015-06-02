<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Object_Repository
 *
 * abstract storage entity for unique objects
 * extends SplObjectStorage so therefore implements the
 * Countable, Iterator, Serializable, and ArrayAccess interfaces
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since                4.6.31
 *
 */
abstract class EE_Object_Repository extends SplObjectStorage {

	/**
	 * @type \EE_Session $_session
	 */
	protected $_session;



	/**
	 * @param \EE_Session $session
	 */
	function __construct( EE_Session $session ) {
		$this->_session = $session;
	}



	/**
	 * @return \EE_Session
	 */
	public function session() {
		return $this->_session;
	}



	/**
	 * @access protected
	 * @param object $object
	 * @param mixed $info
	 * @return bool
	 */
	protected function addObject( $object, $info = null ) {
		$info = ! empty( $info ) ? $info : spl_object_hash( $object );
		$this->attach( $object, $info );
		return $this->contains( $object );
	}



	/**
	 * @access protected
	 * @param mixed
	 * @return null | object
	 */
	protected function getObjectByInfo( $info ) {
		$this->rewind();
		while ( $this->valid() ) {
			if ( $info === $this->getInfo() ) {
				$object = $this->current();
				$this->rewind();
				return $object;
			}
			$this->next();
		}
		return null;
	}



	/**
	 * @access protected
	 * @param object $object
	 * @return bool
	 */
	protected function hasObject( $object ) {
		return $this->contains( $object );
	}



	/**
	 * @access protected
	 * @param object $object
	 * @param string $persistence_callback
	 * @return bool|int
	 * @throws \EE_Error
	 */
	protected function persistObject( $object, $persistence_callback = '' ) {
		if ( $this->contains( $object ) ) {
			$this->rewind();
			while ( $this->valid() ) {
				if ( $object === $this->current() ) {
					$success = false;
					if ( method_exists( $object, $persistence_callback ) ) {
						$success = $object->$persistence_callback();
					} else if ( $object instanceof EE_Base_Class ) {
						$success = $object->save();
					}
					$this->rewind();
					return $success;
				}
				$this->next();
			}
		}
		return false;
	}



	/**
	 * @access protected
	 * @param $object
	 * @return void
	 */
	protected function removeObject( $object ) {
		$this->detach( $object );
	}



}
// End of file EE_Object_Repository.core.php
// Location: /core/EE_Object_Repository.core.php