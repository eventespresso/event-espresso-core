<?php
require_once( EE_MODELS . 'fields/EE_DB_Only_Field_Base.php');
class EE_DB_Only_Float_Field extends EE_DB_Only_Field_Base{
	function get_wpdb_data_type(){
		return '%f';
	}
}
