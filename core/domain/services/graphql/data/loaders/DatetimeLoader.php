<?php

namespace EventEspresso\core\domain\services\graphql\data\loaders;

use EEM_Datetime;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * Class DatetimeLoader
 */
class DatetimeLoader extends AbstractLoader
{
    /**
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getQuery()
    {
        return EEM_Datetime::instance();
    }

    /**
     * @param array $keys
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getWhereParams(array $keys)
    {
        return [
            'DTT_ID'      => ['IN', $keys],
            'DTT_deleted' => ['IN', [true, false]]
        ];
    }
}
