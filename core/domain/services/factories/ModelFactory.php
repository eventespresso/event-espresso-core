<?php

namespace EventEspresso\core\domain\services\factories;

use EE_Error;
use EE_Registry;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class ModelFactory
 * retrieves a shared instance of a model
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class ModelFactory
{

    /**
     * @param string $model_name
     * @return bool|EEM_Base
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public static function getModel($model_name)
    {
        return EE_Registry::instance()->load_model($model_name);
    }
}
