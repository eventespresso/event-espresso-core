<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EE_Error;
use EventEspresso\core\services\graphql\enums\EnumBase;
use EventEspresso\core\services\form\meta\InputTypes;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

/**
 * Class ElementTypeEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class ElementTypeEnum extends EnumBase
{

    /**
     * ElementTypeEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'ElementTypeEnum');
        $this->setDescription(esc_html__('Form element type.', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function getValues(): array
    {
        /** @var InputTypes */
        $element_types = LoaderFactory::getShared('EventEspresso\core\services\form\meta\InputTypes');

        return $element_types->getElementTypesValues();
    }
}
