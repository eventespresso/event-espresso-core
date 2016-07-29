<?php
namespace EventEspresso\core\services\database;
/**
 *
 * Class TableManager
 *
 * For performing mysql databse table schema manipualtion
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class TableManager extends \EE_Base {
	public function addColumn( $tableName, $columnName, $columnInfo='INT UNSIGNED NOT NULL' )
	{
		if( apply_filters( 'FHEE__EEH_Activation__add_column_if_it_doesnt_exist__short_circuit', FALSE ) ){
			return FALSE;
		}
		global $wpdb;
		$full_table_name= EEH_Activation::ensure_table_name_has_prefix( $tableName );
		$fields = self::get_fields_on_table($tableName);
		if (!in_array($columnName, $fields)){
			$alter_query="ALTER TABLE $full_table_name ADD $columnName $columnInfo";
			//echo "alter query:$alter_query";
			return $wpdb->query($alter_query);
		}
		return TRUE;
	}

}
