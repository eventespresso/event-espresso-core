<?php

namespace EventEspresso\core\services\json;

use DomainException;

/**
 * Class JsonDataNodeValidator
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
class JsonDataNodeValidator
{
    /**
     * @param JsonDataNode $data_node
     * @return bool             returns true if data array is safe to set, false if overwrite will occur
     * @throws DomainException  throws exception if WP_DEBUG is true
     */
    public function dataArrayEmpty(JsonDataNode $data_node)
    {
        $data = $data_node->data();
        if (! empty($data)) {
            $this->overwriteError($data_node->nodeName(), esc_html__('data array', 'event_espresso'));
            return false;
        }
        return true;
    }

    /**
     * @param array  $data      data array to check for property key
     * @param string $key       value for the key being checked for
     * @param string $type      the type of key and/or the data being checked
     * @return bool             returns true if property is safe to write, false if overwrite will occur
     * @throws DomainException  throws exception if WP_DEBUG is true
     */
    public function propertyNotSet(array $data, $key, $type = 'key')
    {
        if (isset($data[ $key ])) {
            $this->overwriteError($key, $type);
            return false;
        }
        return true;
    }


    /**
     * @param string $key       value for the key being checked for
     * @param string $type      the type of key and/or the data being checked
     * @throws DomainException  throws exception if WP_DEBUG is true
     */
    public function overwriteError($key, $type)
    {
        if (WP_DEBUG) {
            throw new DomainException(
                sprintf(
                    /*
                     * translators:
                     * 'The "i18n" JsonDataNode key is already set and would be overwritten by the current action.'
                     */
                    esc_html__(
                        'The "%1$s" JsonDataNode %2$s is already set and would be overwritten by the current action.',
                        'event_espresso'
                    ),
                    $key,
                    $type
                )
            );
        }
    }


    /**
     * @param string $property  name for the key being checked for
     * @param string $type      the type of key and/or the data being checked
     * @param bool   $throw     if true [default] and WP_DEBUG is also true, then will throw exceptions
     * @return bool             returns true if property is set, false if property is missing
     * @throws DomainException  throws exception if WP_DEBUG is true
     */
    public function validateCriticalProperty($property, $type, $throw = true)
    {
        if (empty($property)) {
            if (WP_DEBUG && $throw) {
                throw new DomainException(
                    sprintf(
                        /*
                         * translators:
                         * 'The JsonDataNodeHandler domain route is a required property but has not been set.'
                         */
                        esc_html__(
                            'The JsonDataNodeHandler %1$s is a required property but has not been set.',
                            'event_espresso'
                        ),
                        $type
                    )
                );
            }
            return false;
        }
        return true;
    }
}
