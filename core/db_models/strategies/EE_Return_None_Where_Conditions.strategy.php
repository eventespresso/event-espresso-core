<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_None_Where_Conditions
 * Adds a where condition which makes it so NO rows will eb returned.
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Return_None_Where_Conditions extends EE_Default_Where_Conditions {
	protected function _get_default_where_conditions(){
		if( $this->_model->has_primary_key_field() ) {
			return array( $this->_model->primary_key_name() => array('<', 0 ) );
		}else{
			$fk_field = $this->_model->get_a_field_of_type( 'EE_Foreign_Key_Field_Base' );
			return array( 'AND*impossible' => array( $fk_field->get_name() => array('IS_NULL'), $fk_field->get_name() => 'IS_NOT_NULL' ) );
		}
	}
}

// End of file EE_None_Where_Conditions.strategy.php