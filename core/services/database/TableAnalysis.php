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
     * The maximum number of characters that can be indexed on a column using utf8mb4 collation,
     * see https://events.codebasehq.com/redirect?https://make.wordpress.org/core/2015/04/02/the-utf8mb4-upgrade/
     */
    const INDEX_COLUMN_SIZE = 191;
	/**
	 * Returns the table name which will definitely have the wpdb prefix on the front,
	 * except if it currently has the wpdb->base_prefix on the front, in which case
	 * it will have the wpdb->base_prefix on it
	 *
	 * @global \wpdb $wpdb
	 * @param string $table_name
	 * @return string $tableName, having ensured it has the wpdb prefix on the front
	 */
	public function ensureTableNameHasPrefix( $table_name )
	{
		global $wpdb;
		return strpos( $table_name, $wpdb->base_prefix ) === 0 ? $table_name : $wpdb->prefix . $table_name;
	}



	/**
	 * Indicates whether or not the table has any entries. $table_name can
	 * optionally start with $wpdb->prefix or not
	 * @global \wpdb $wpdb
	 * @param string $table_name
	 * @return bool
	 */
	public function tableIsEmpty( $table_name )
	{
		global $wpdb;
		$table_name = $this->ensureTableNameHasPrefix( $table_name );
		if ( $this->tableExists( $table_name ) ) {
			$count = $wpdb->get_var( "SELECT COUNT(*) FROM $table_name" );
			return absint( $count ) === 0 ? true : false;
		}
		return false;
	}



	/**
	 * Indicates whether or not the table exists. $table_name can optionally
	 * have the $wpdb->prefix on the beginning, or not.
	 * @global \wpdb $wpdb
	 * @global array EZSQL_Error
	 * @param $table_name
	 * @return bool
	 */
	public function tableExists( $table_name )
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



    /**
     * @param $table_name
     * @param $index_name
     * @return array of columns used on that index, Each entry is an object with the following properties {
     *  @type string Table
     *  @type string Non_unique "0" or "1"
     *  @type string Key_name
     *  @type string Seq_in_index
     *  @type string Column_name
     *  @type string Collation
     *  @type string Cardinality
     *  @type string Sub_part on a column, usually this is just the number of characters from this column to use in indexing
     *  @type string|null Packed
     *  @type string Null
     *  @type string Index_type
     *  @type string Comment
     *  @type string Index_comment
     * }
     */
	public function showIndexes($table_name, $index_name){
	    global $wpdb;
        $table_name = $this->ensureTableNameHasPrefix($table_name);
        $index_exists_query = "SHOW INDEX FROM {$table_name} WHERE Key_name = '{$index_name}'";
        return $wpdb->get_results($index_exists_query);
    }
}
