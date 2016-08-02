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
		$full_table_name= \EEH_Activation::ensure_table_name_has_prefix( $tableName );
		$fields = \EEH_Activation::get_fields_on_table($tableName);
		if (!in_array($columnName, $fields)){
			$alter_query="ALTER TABLE $full_table_name ADD $columnName $columnInfo";
			//echo "alter query:$alter_query";
			return $wpdb->query($alter_query);
		}
		return TRUE;
	}

}
