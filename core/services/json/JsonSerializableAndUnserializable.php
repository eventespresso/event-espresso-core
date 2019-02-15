<?php

namespace EventEspresso\core\services\json;

/**
 * Interface JsonSerializableAndUnserializable
 *
 * For objects that can converted to and from a JSON representation.
 * We don't use PHP's JsonSerializable because it only converts TO Json, and it's not consistently available.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
interface JsonSerializableAndUnserializable
{
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
// End of file JsonSerializableAndUnserializable.php
// Location: EventEspresso\core\services\json/JsonSerializableAndUnserializable.php
