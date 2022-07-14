<?php

namespace EventEspresso\core\domain\services\factories;

use EEM_Base;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class ModelFactory
 * retrieves a shared instance of a model
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class ModelFactory extends LoaderFactory
{
    /**
     * @param string $model_name
     * @return bool|EEM_Base
     */
    public static function getModel(string $model_name)
    {
        return ModelFactory::getShared($model_name);
    }
}
