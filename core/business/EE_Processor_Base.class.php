<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Processor_Base
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6
 *
 */

class EE_Processor_Base {

	/**
	 * Used to set whether SPCO is being revisited by registrant or not.
	 *
	 * @var bool
	 */
	protected $_revisit = FALSE;



	/**
	 * Allows external class (usually checkout) to set whether SPCO is being revisited by registrant or not.
	 *
	 * @param bool $revisit
	 * @return void
	 */
	public function set_revisit( $revisit = FALSE ) {
		$this->_revisit = filter_var( $revisit, FILTER_VALIDATE_BOOLEAN );
	}



}
// End of file EE_Processor_Base.class.php
// Location: /EE_Processor_Base.class.php