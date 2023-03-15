<?php

namespace EventEspresso\core\domain\services\graphql\data\loaders;

use EE_Error;
use EEM_Base;
use EEM_Datetime;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class DatetimeLoader
 */
class DatetimeLoader extends AbstractLoader
{
    /**
     * @return EEM_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function getQuery(): EEM_Base
    {
        return EEM_Datetime::instance();
    }

    /**
     * @param array $keys
     * @return array
     */
    protected function getWhereParams(array $keys): array
    {
        return [
            'DTT_ID'      => ['IN', $keys],
            'DTT_deleted' => ['IN', [true, false]]
        ];
    }
}
