<?php

namespace EventEspresso\core\services\options;

/**
 * Interface JsonWpOptionSerializableInterface
 *
 * Classes implementing this interface can be easily serialized to JSON, and initialized from JSON, and know what
 * their option name should be.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
interface JsonWpOptionSerializableInterface
{
    /**
     * Gets the value to use for wp_options.option_name. Note this is not static, so it can use object properties to
     * determine what option name to use.
     * @since $VID:$
     * @return string
     */
    public function getWpOptionName();

    /**
     * Creates a simple PHP array or stdClass from this object's properties, which can be easily serialized using
     * wp_json_serialize().
     * @since $VID:$
     * @return mixed
     */
    public function toJsonSerializableData();

    /**
     * Initializes this object from data
     * @since $VID:$
     * @param mixed $data
     * @return boolean success
     */
    public function fromJsonSerializedData($data);

}
// End of file JsonWpOptionSerializableInterface.php
// Location: EventEspresso\core\services\options/JsonWpOptionSerializableInterface.php
