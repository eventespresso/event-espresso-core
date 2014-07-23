<?php

/**
 * Field for DB columns which don't correspond to model fields. Eg, on the Event model, which
 * should use the wp_posts and wp_esp_events_detail tables, there will be many fields on the wp_posts
 * table that don't correspond to any event model fields (eg, post_password). We may want to provide
 * special default values for them, or some other column-specific functionality. So we can add them as fields,
 * but db-only ones
 */
abstract class EE_DB_Only_Field_Base extends EE_Model_Field_Base{
	/**
	 * All these children classes are for the db-only (meaning, we should select them
	 * on get_all queries, update, delete, and will still want to set their default value
	 * on inserts, but the model object won't have reference to these fields)
	 * @return boolean
	 */
	function is_db_only_field() {
		return true;
	}
}