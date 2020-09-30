<?php

namespace EventEspresso\core\domain\services\graphql\data\loaders;

use EE_Error;
use EEM_Attendee;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * Class AttendeeLoader
 */
class AttendeeLoader extends AbstractLoader
{
    /**
     * @return EEM_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getQuery()
    {
        return EEM_Attendee::instance();
    }

    /**
     * @param array $keys
     *
     * @return array
     */
    protected function getWhereParams(array $keys)
    {
        return [
            'ATT_ID' => ['IN', $keys],
        ];
    }
}
