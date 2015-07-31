<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Line_Item_Filter_Collection
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Line_Item_Filter_Collection extends EE_Object_Collection implements EEI_Object_Collection {

	/**
	 * add
	 *
	 * attaches an object to the Collection
	 * and sets any supplied data associated with the current iterator entry
	 * by calling EE_Line_Item_Filter_Collection::set_info()
	 *
	 * @access public
	 * @param EEI_Line_Item_Filter $object
	 * @param mixed  $info
	 * @return bool
	 */
	public function add( $object, $info = null ) {
		if ( ! $object instanceof EEI_Line_Item_Filter ) {
			return false;
		}
		return $this->addObject( $object, $info );
	}



	/**
	 * set_info
	 *
	 * Sets the info associated with an object in the Collection
	 *
	 * @access public
	 * @param EEI_Line_Item_Filter $object
	 * @param mixed  $info
	 * @return bool
	 */
	public function set_info( $object, $info = null ) {
		return $this->setObjectInfo( $object, $info );
	}



	/**
	 * get_by_info
	 *
	 * finds and returns an object in the Collection based on the info that was set using set_info() or add()
	 *
	 * @access public
	 * @param mixed
	 * @return EEI_Line_Item_Filter
	 */
	public function get_by_info( $info ) {
		return $this->getObjectByInfo( $info );
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
		return $this->hasObject( $object );
	}



	/**
	 * remove
	 *
	 * detaches an object from the Collection
	 *
	 * @access public
	 * @param $object
	 * @return void
	 */
	public function remove( $object ) {
		$this->removeObject( $object );
	}



}
// End of file EE_Line_Item_Filter_Collection.class.php
// Location: /core/libraries/line_item_filters/EE_Line_Item_Filter_Collection.class.php