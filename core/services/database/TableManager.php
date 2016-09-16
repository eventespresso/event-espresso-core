<?php
namespace EventEspresso\core\services\database;

defined('EVENT_ESPRESSO_VERSION')|| exit('No direct script access allowed');
/**
 *
 * Class TableManager
 *
 * For performing mysql database table schema manipulation
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
class TableManager extends \EE_Base {

    /**
     * @param string $tableName
     * @param string $columnName
     * @param string $columnInfo
     * @return bool|false|int
     */
    public function addColumn( $tableName, $columnName, $columnInfo='INT UNSIGNED NOT NULL' )
	{
		if( apply_filters( 'FHEE__EEH_Activation__add_column_if_it_doesnt_exist__short_circuit', FALSE ) ){
			return FALSE;
		}
		global $wpdb;
		$full_table_name = \EE_Registry::instance()->load_service( 'TableAnalysis' )->ensureTableNameHasPrefix( $tableName );
		$columns = $this->getTableColumns($tableName);
		if( !in_array( $columnName, $columns)){
			$alter_query="ALTER TABLE $full_table_name ADD $columnName $columnInfo";
			return $wpdb->query($alter_query);
		}
		return TRUE;
	}
	
	/**
	 * Gets the name of all columns on teh table
	 * @global type $wpdb
	 * @param type $tableName
	 * @return array
	 */
	public function getTableColumns( $tableName ) 
	{
		global $wpdb;
		$tableName = $this->ensureTableNameHasPrefix( $tableName );
		$fieldArray = array();
		if ( ! empty( $tableName )) {
			$columns = $wpdb->get_results("SHOW COLUMNS FROM $tableName ");
			if ($columns !== FALSE) {
				foreach( $columns as $column ){
					$fieldArray[] = $column->Field;
				}
			}
		}
		return $fieldArray;
	}
	
	/**
	 * Drops the specified table from the database
	 * @global \WPDB $wpdb
	 * @param type $tableName
	 * @return int
	 */
	public function dropTable( $tableName )
	{
		global $wpdb;
		if (  \EE_Registry::instance()->load_service( 'TableAnalysis' )->table_exists( $tableName ) ) {
			$tableName = \EE_Registry::instance()->load_service( 'TableAnalysis' )->ensureTableNameHasPrefix( $tableName );
			return $wpdb->query( "DROP TABLE IF EXISTS $tableName" );
		}
		return 0;
	}
	
	/**
	 * Drops the specified index from the specified table
	 * @global \WPDB $wpdb
	 * @param type $tableName
	 * @param type $indexName
	 * @return int
	 */
	public function dropIndex( $tableName, $indexName )
	{
		if( apply_filters( 'FHEE__EEH_Activation__drop_index__short_circuit', FALSE ) ){
			return FALSE;
		}
		global $wpdb;
		$tableName = \EE_Registry::instance()->load_service( 'TableAnalysis' )->ensureTableNameHasPrefix( $tableName );
		$index_exists_query = "SHOW INDEX FROM $tableName WHERE Key_name = '$indexName'";
		if (
			\EE_Registry::instance()->load_service( 'TableAnalysis' )->tableExists(  $tableName )
			&& $wpdb->get_var( $index_exists_query ) === $tableName //using get_var with the $index_exists_query returns the table's name
		) {
			return $wpdb->query( "ALTER TABLE $tableName DROP INDEX $indexName" );
		}
		return 0;
	}
	
	/**
	 * Just creates the requested table
	 * @param string $tableName 
	 * @param string $createSql defining the table's columns and indexes
	 * @param string $engine (no need to specify "ENGINE=", that's implied)
	 * @return void
	 * @throws \EE_Error
	 */
	public function createTable( $tableName, $createSql, $engine = 'MyISAM' )
	{
		// does $sql contain valid column information? ( LPT: https://regex101.com/ is great for working out regex patterns )
		if ( preg_match( '((((.*?))(,\s))+)', $createSql, $valid_column_data ) ) {
			$tableName = \EE_Registry::instance()->load_service( 'TableAnalysis' )->ensureTableNameHasPrefix( $tableName );
			$SQL = "CREATE TABLE $tableName ( $createSql ) ENGINE=$engine DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
			//get $wpdb to echo errors, but buffer them. This way at least WE know an error
			//happened. And then we can choose to tell the end user
			$old_show_errors_policy = $wpdb->show_errors( TRUE );
			$old_error_suppression_policy = $wpdb->suppress_errors( FALSE );
			ob_start();
			dbDelta( $SQL );
			$output = ob_get_contents();
			ob_end_clean();
			$wpdb->show_errors( $old_show_errors_policy );
			$wpdb->suppress_errors( $old_error_suppression_policy );
			if( ! empty( $output ) ){
				throw new \EE_Error( $output	);
			}
		} else {
			throw new \EE_Error(
				sprintf(
					__( 'The following table creation SQL does not contain valid information about the table columns: %1$s %2$s', 'event_espresso' ),
					'<br />',
					$createSql
				)
			);
		}
	}

}
