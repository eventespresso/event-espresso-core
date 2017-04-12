<?php
namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\libraries\rest_api\RestException;
use EEH_Inflector;

/**
 * Class Base
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class Base
{

    /**
     * @param $required_permission
     * @param $attempted_calculation
     * @throws \EventEspresso\core\libraries\rest_api\RestException
     */
    protected static function verifyCurrentUserCan($required_permission, $attempted_calculation)
    {
        if (! current_user_can($required_permission)) {
            throw new RestException(
                'permission_denied',
                sprintf(
                    __(
                        // @codingStandardsIgnoreStart
                        'Permission denied, you cannot calculate %1$s on %2$s because you do not have the capability "%3$s"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $attempted_calculation,
                    EEH_Inflector::pluralize_and_lower(self::getResourceName()),
                    $required_permission
                )
            );
        }
    }



    /**
     * Gets the name of the resource of the called class
     *
     * @return string
     */
    public static function getResourceName()
    {
        $classname = get_called_class();
        return substr($classname, strrpos($classname, '\\') + 1);
    }
}
