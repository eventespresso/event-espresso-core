<?php

namespace EventEspresso\core\services\options;

use stdClass;

/**
 * Class JsonWpOptionManager
 *
 * Takes care of loading and saving objects that implement JsonWpOptioinserializableInterface to the WP Options table.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.80.p
 *
 */
class JsonWpOptionManager
{
    /**
     * Updates the object with what's in the DB (specifically, the wp_options table). If nothing is in the DB, leaves
     * the object alone and returns false.
     * @since 4.9.80.p
     * @param JsonWpOptionSerializableInterface $obj
     * @return bool
     */
    public function populateFromDb(JsonWpOptionSerializableInterface $obj)
    {
        $option = get_option($obj->getWpOptionName());
        if ($option) {
            $json = json_decode($option);
            if (is_array($json) || $json instanceof stdClass) {
                return $obj->fromJsonSerializedData($json);
            }
        }
        return false;
    }

    /**
     * Saves the object's data to the wp_options table for later use.
     * @since 4.9.80.p
     * @param JsonWpOptionSerializableInterface $obj
     * @return bool
     */
    public function saveToDb(JsonWpOptionSerializableInterface $obj)
    {
        return update_option(
            $obj->getWpOptionName(),
            wp_json_encode($obj->toJsonSerializableData()),
            false
        );
    }
}
// End of file JsonWpOptionManager.php
// Location: EventEspresso\core\services\options/JsonWpOptionManager.php
