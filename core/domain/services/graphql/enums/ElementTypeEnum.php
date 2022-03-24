<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;
use EventEspresso\core\services\form\meta\InputTypes;
use EventEspresso\core\services\loaders\LoaderFactory;

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
     */
    protected function getValues(): array
    {
        /** @var InputTypes $input_types */
        $input_types = LoaderFactory::getShared('EventEspresso\core\services\form\meta\InputTypes');
        return $input_types->getInputTypesValues();
    }
}
