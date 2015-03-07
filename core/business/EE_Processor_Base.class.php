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



	/**
	 * debug
	 *
	 * @param string $class
	 * @param string $func
	 * @param string $line
	 * @param \EE_Transaction $transaction
	 * @param array $info
	 * @param bool $display_request
	 */
	function log( $class = '', $func = '', $line = '', EE_Transaction $transaction, $info = array(), $display_request = false ) {
		if ( WP_DEBUG ) {
			$debug_data = get_option( 'EE_DEBUG_SPCO_' . EE_Session::instance()->id(), array() );
			$default_data = array(
				$class   => $func . '() : ' . $line,
				'REQ'    => $display_request ? $_REQUEST : '',
			);
			if ( $transaction instanceof EE_Transaction ) {
				$default_data[ 'TXN_status' ] = $transaction->status_ID();
				$default_data[ 'TXN_reg_steps' ] = $transaction->reg_steps();
				$TXN_ID = 'TXN_ID: ' . $transaction->ID();
			} else {
				$TXN_ID = 'TXN_ID: 0 ' . time();
			}
			// don't serialize objects
			$info = $this->_strip_objects( $info );
			if ( ! isset( $debug_data[ $TXN_ID ] ) ) {
				$debug_data[ $TXN_ID ] = array();
			}
			$debug_data[ $TXN_ID ][ microtime() ] = array_merge(
				$default_data,
				$info
			);
			update_option( 'EE_DEBUG_SPCO_' . EE_Session::instance()->id(), $debug_data );
		}

	}



	/**
	 * _strip_objects
	 *
	 * @param array $info
	 * @return array
	 */
	function _strip_objects( $info = array() ) {
		foreach ( $info as $key => $value ) {
			if ( is_array( $value ) ) {
				$info[ $key ] = $this->_strip_objects( $value );
			} else if ( is_object( $value ) ) {
				$object_class = get_class( $value );
				$info[ $object_class ] = array();
				$info[ $object_class ][ 'ID' ] = method_exists( $value, 'ID' ) ? $value->ID() : 0;
				if ( method_exists( $value, 'status' ) ) {
					$info[ $object_class ][ 'status' ] = $value->status();
				} else if ( method_exists( $value, 'status_ID' ) ) {
					$info[ $object_class ][ 'status' ] = $value->status_ID();
				}
				unset( $info[ $key ] );
			}
		}
		return (array)$info;
	}



}
// End of file EE_Processor_Base.class.php
// Location: /EE_Processor_Base.class.php