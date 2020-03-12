<?php

namespace EventEspresso\core\services\options;

use EventEspresso\core\services\json\JsonSerializableAndUnserializable;

/**
 * Interface JsonWpOptionSerializableInterface
 *
 * Classes implementing this interface can be easily serialized to JSON, and initialized from JSON, and know what
 * their option name should be.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.80.p
 *
 */
interface JsonWpOptionSerializableInterface extends JsonSerializableAndUnserializable
{
    /**
     * Gets the value to use for wp_options.option_name. Note this is not static, so it can use object properties to
     * determine what option name to use.
     * @since 4.9.80.p
     * @return string
     */
    public function getWpOptionName();
}
// End of file JsonWpOptionSerializableInterface.php
// Location: EventEspresso\core\services\options/JsonWpOptionSerializableInterface.php
