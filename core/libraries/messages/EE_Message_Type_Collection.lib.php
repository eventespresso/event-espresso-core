<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Message_Type_Collection
 *
 * Container object for EE_messenger objects
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Message_Type_Collection extends EE_Object_Collection {

	/**
	 * EE_Message_Type_Collection constructor.
	 */
	public function __construct() {
		$this->interface = 'EE_message_type';
	}



	/**
	 * add
	 *
	 * attaches an object to the Collection
	 * and sets any supplied data associated with the current iterator entry
	 * by calling EE_Object_Collection::set_info()
	 *
	 * @access public
	 * @param object $object
	 * @param mixed  $info
	 * @return bool
	 */
	public function add( $object, $info = null ) {
		$info = empty( $info ) && $object instanceof $this->interface ? $object->name : $info;
		return parent::add( $object, $info );
	}



	/**
	 * set_info
	 *
	 * Sets the data associated with an object in the Collection
	 * if no $info is supplied, then the spl_object_hash() is used
	 *
	 * @access public
	 * @param object $object
	 * @param mixed  $info
	 * @return bool
	 */
	public function set_info( $object, $info = null ) {
		$info = empty( $info ) && $object instanceof $this->interface ? $object->name : $info;
		return parent::set_info( $object, $info );
	}



	/**
	 * get_by_info
	 *
	 * finds and returns an object in the Collection based on the info that was set using addObject()
	 * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
	 *
	 * @access public
	 * @param mixed
	 * @return null | object
	 */
	public function get_by_info( $info ) {
		return parent::get_by_info( str_replace( ' ', '_', strtolower( $info ) ) );
	}



	/**
	 * has
	 *
	 * returns TRUE or FALSE depending on whether the supplied object is within the Collection
	 *
	 * @access public
	 * @param object $object
	 * @return bool
	 */
	public function has( $object ) {
		return parent::has( $object );
	}



	/**
	 * has_by_name
	 *
	 * returns TRUE or FALSE depending on whether the supplied message_type classname is within the Collection
	 *
	 * @access public
	 * @param string $message_type_name
	 * @return bool
	 */
	public function has_by_name( $message_type_name ) {
		return $this->get_by_info( $message_type_name ) instanceof $this->interface ? true : false;
	}



	/**
	 * remove
	 *
	 * detaches an object from the Collection
	 *
	 * @access public
	 * @param $object
	 * @return bool
	 */
	public function remove( $object ) {
		return parent::remove( $object );
	}



	/**
	 * set_current
	 *
	 * advances pointer to the provided object
	 *
	 * @access public
	 * @param $object
	 * @return void
	 */
	public function set_current( $object ) {
		parent::set_current( $object );
	}



	/**
	 * set_current_by_info
	 *
	 * advances pointer to the object whose info matches that which was provided
	 *
	 * @access public
	 * @param $info
	 * @return void
	 */
	public function set_current_by_info( $info ) {
		parent::set_current_by_info( $info );
	}



	/**
	 * show_collection_classes
	 *
	 * displays list of collection classes if WP_DEBUG is on
	 *
	 * @access public
	 * @return void
	 */
	public function show_collection_classes() {
		if ( WP_DEBUG ) {
			$this->rewind();
			while ( $this->valid() ) {
				echo '<h5 style="color:#2EA2CC;">' . __CLASS__ . ' class : <span style="color:#E76700">' . $this->getInfo() . '</span></h5>';
				$this->next();
			}
		}
	}



}
// End of file EE_Message_Type_Collection.lib.php
// Location: /core/libraries/messages/EE_Message_Type_Collection.lib.php