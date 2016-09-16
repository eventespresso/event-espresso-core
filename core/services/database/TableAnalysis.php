<?php
namespace EventEspresso\core\services\database;

/**
 *
 * Class TableAnalysis
 *
 * For analyzing database tables; should not perform any manipulation, or have
 * any EE business logic
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
class TableAnalysis extends \EE_Base {
	/**
	 * Returns the table name which will definetely have the wpdb prefix on the front,
	 * except if it currently has the wpdb->base_prefix on the front, in which case
	 * it will have the wpdb->base_prefix on it
	 * @global \EventEspresso\core\services\database\type $wpdb
	 * @param string $tableName
	 * @return string $tableName, having ensured it has the wpdb prefix on the front
	 */
	public function ensureTableNameHasPrefix( $tableName ) 
	{
		global $wpdb;
		return strpos( $tableName, $wpdb->base_prefix ) === 0 ? $tableName : $wpdb->prefix . $tableName;
	}
	
	public function tableIsEmpty( $tableName ) 
	{
		global $wpdb;
		$tableName = $this->ensureTableNameHasPrefix( $tableName );
		if ( $this->table_exists( $tableName ) ) {
			$count = $wpdb->get_var( "SELECT COUNT(*) FROM $tableName" );
			return absint( $count ) === 0 ? true : false;
		}
		return false;
	}
	
	public function tableExists( $tableName ) 
	{
		global $wpdb, $EZSQL_ERROR;
		$table_name = $this->ensureTableNameHasPrefix( $table_name );
		//ignore if this causes an sql error
		$old_error = $wpdb->last_error;
		$old_suppress_errors = $wpdb->suppress_errors();
		$old_show_errors_value = $wpdb->show_errors( FALSE );
		$ezsql_error_cache = $EZSQL_ERROR;
		$wpdb->get_results( "SELECT * from $table_name LIMIT 1");
		$wpdb->show_errors( $old_show_errors_value );
		$wpdb->suppress_errors( $old_suppress_errors );
		$new_error = $wpdb->last_error;
		$wpdb->last_error = $old_error;
		$EZSQL_ERROR = $ezsql_error_cache;
		//if there was a table doesn't exist error
		if( ! empty( $new_error ) ) {
			if(
				in_array(
					\EEH_Activation::last_wpdb_error_code(),
					array(
						1051, //bad table
						1109, //unknown table
						117, //no such table
					)
				)
				||
				preg_match( '~^Table .* doesn\'t exist~', $new_error ) //in case not using mysql and error codes aren't reliable, just check for this error string
			) {
				return false;
			} else {
				//log this because that's weird. Just use the normal PHP error log
				error_log(
					sprintf(
						__( 'Event Espresso error detected when checking if table existed: %1$s (it wasn\'t just that the table didn\'t exist either)', 'event_espresso' ),
					$new_error
					)
				);
			}
		}
		return true;
	}
}
