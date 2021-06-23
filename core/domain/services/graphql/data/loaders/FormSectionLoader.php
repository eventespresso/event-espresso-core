<?php

namespace EventEspresso\core\domain\services\graphql\data\loaders;

use EE_Error;
use EEM_Base;
use EEM_Form_Section;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class FormSectionLoader
 */
class FormSectionLoader extends AbstractLoader
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
        return EEM_Form_Section::instance();
    }

    /**
     * @param array $keys
     * @return array
     */
    protected function getWhereParams(array $keys): array
    {
        return [
            'FSC_UUID' => ['IN', $keys],
        ];
    }
}
