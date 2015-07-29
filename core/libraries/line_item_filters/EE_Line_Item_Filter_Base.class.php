<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Line_Item_Filter_Base
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8.0
 *
 */
abstract class EE_Line_Item_Filter_Base implements EEI_Line_Item_Filter {



	/**
	 * process
	 *
	 * @return EEI_Line_Item
	 */
	abstract public function process();


}
// End of file EE_Line_Item_Filter_Base.class.php
// Location: /core/libraries/line_item_filters/EE_Line_Item_Filter_Base.class.php