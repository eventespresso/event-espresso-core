<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\domain\services\factories\FactoryInterface;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * Class CalculatedModelFieldsFactory
 *
 * Loads classes for calculating fields for the REST API
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.68.p
 *
 */
class CalculatedModelFieldsFactory
{
    private $loader;

    /**
     * CalculatedModelFieldsFactory constructor.
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }

    /**
     * Creates the calculator class that corresponds to that particular model
     * @since 4.9.68.p
     * @param string $model_name
     * @return Base
     * @throws UnexpectedEntityException
     */
    public function createFromModel($model_name)
    {
        return $this->createFromClassname('EventEspresso\core\libraries\rest_api\calculations\\' . $model_name);
    }

    /**
     * Creates the calculator class that corresponds to that classname and verifies it's of the correct type
     * @param string $calculator_classname
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
