<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');


/**
 * Serves as a collection for EE_Messages_Template_Pack objects
 * @package    Event Espresso
 * @subpackage collection
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Template_Pack_Collection extends EE_Object_Collection {


	public function __construct() {
		$this->interface = 'EE_Messages_Template_Pack';
	}

	public function get_by_name( $template_pack_name ) {
		$this->rewind();
		while ( $this->valid() ) {
			if ( $this->current()->dbref == $template_pack_name ) {
				return $this->current();
			}
			$this->next();
		}
	}
} //end EE_Messages_Template_Pack_Collection