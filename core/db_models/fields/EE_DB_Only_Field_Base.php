<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Field for DB columns which don't correspond to model fields. Eg, on the Event model, which
 * should use the wp_posts and wp_esp_events_detail tables, there will be many fields on the wp_posts
 * table that don't correspond to any event model fields (eg, post_password). We may want to provide
 * special default values for them, or some other column-specific functionality. So we can add them as fields,
 * but db-only ones
 */
abstract class EE_DB_Only_Field_Base extends EE_Model_Field_Base
{

    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaReadOnly(true);
    }


    /**
     * All these children classes are for the db-only (meaning, we should select them
     * on get_all queries, update, delete, and will still want to set their default value
     * on inserts, but the model object won't have reference to these fields)
     *
     * @return boolean
     */
    function is_db_only_field()
    {
        return true;
    }
}