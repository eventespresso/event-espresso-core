<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\domain\services\factories\FactoryInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use InvalidArgumentException;
use EventEspresso\core\services\loaders\Loader;

/**
 * Class CalculatedModelFieldsFactory
 *
 * Loads classes for calculating fields for the REST API
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class CalculatedModelFieldsFactory
{
    private $loader;

    /**
     * CalculatedModelFieldsFactory constructor.
     * @param Loader $loader
     */
    public function __construct(Loader $loader)
    {
        $this->loader = $loader;
    }

    /**
     * Creates the calculator class that corresponds to that particular model
     * @since $VID:$F
     * @param $model_name
     * @return Base
     */
    public function createFromModel($model_name)
    {
        return $this->createFromClassname('EventEspresso\core\libraries\rest_api\calculations\\' . $model_name);
    }

    /**
     * Creates the calculator class that corresponds to that classname and verifies it's of the correct type
     * @return Base
     * @throws UnexpectedEntityException
     */
    public function createFromClassname($calculator_classname)
    {
        $calculator = $this->loader->getShared($calculator_classname);
        if (!$calculator instanceof Base) {
            throw new UnexpectedEntityException(
                $calculator_classname,
                'EventEspresso\core\libraries\rest_api\calculations\Base'
            );
        }
        return $calculator;
    }
}
// End of file CalculationsFactory.php
// Location: EventEspresso\core\libraries\rest_api\calculations/CalculationsFactory.php
