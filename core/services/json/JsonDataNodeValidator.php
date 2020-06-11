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
     * @param boolean $is_set   result of isset() type check to test if property has already been set
     * @param string  $key      value for the key being checked for
     * @param string  $type     the type of key and/or the data being checked
     * @return bool             returns true if property is safe to write, false if overwrite will occur
     * @throws DomainException  throws exception if WP_DEBUG is true
     */
    public function propertyOverwriteError($is_set, $key, $type = 'key')
    {
        if ($is_set) {
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
            return false;
        }
        return true;
    }


    /**
     * @param string $property  name for the key being checked for
     * @param string $type      the type of key and/or the data being checked
     * @return bool             returns true if property is set, false if property is missing
     * @throws DomainException  throws exception if WP_DEBUG is true
     */
    public function validateCriticalProperty($property, $type)
    {
        if (empty($property)) {
            if (WP_DEBUG) {
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
