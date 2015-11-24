<?php
//namespace EventEspresso\core\libraries\templates;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Template_Part_PriorityQueue
 *
 * SplPriorityQueue class configured to only accept instances of EE_Template_Part
 * sorts list in ascending order based on priority set when adding template parts
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Template_Part_PriorityQueue extends \SplPriorityQueue {



	/**
	 * add
	 *
	 * attaches aTemplate_Part to the Collection
	 * and sets any supplied data associated with the current iterator entry
	 *
	 * @access public
	 * @param EE_Template_Part $object
	 * @param int $priority
	 * @return bool
	 */
	public function insert( $object, $priority = 100 ) {
		if ( $object instanceof EE_Template_Part ) {
			parent::insert( $object, $priority );
			return true;
		} else {
			return false;
		}
	}



	/**
	 * compare
	 *
	 * sorts EE_Template_Part in ascending order based on set priority
	 *
	 * @access public
	 * @param int $priority1
	 * @param int $priority2
	 * @return bool
	 */
	public function compare( $priority1, $priority2 ) {
		if ( $priority1 === $priority2 ) {
			return 0;
		}
		return $priority1 > $priority2 ? -1 : 1;
	}



}
// End of file EE_Template_Part_PriorityQueue.class.php
// Location: /EE_Template_Part_PriorityQueue.class.php