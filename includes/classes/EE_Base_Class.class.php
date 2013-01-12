<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EE_Base_Class
 *
 * @author mnelson4
 */
class EE_Base_Class {
	/**
	*		check that var has been passed to method
	* 
	* 		@access		protected
	*/	
	protected function _check_for( $var = FALSE, $var_name ) {

		if ( ! $var ) {
			$msg = sprintf( __( 'No value for %s was supplied.', 'event_espresso' ), $var_name );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} else {
			return TRUE;
		}
	}
}

?>
