<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EE_Error;
use EEM_Datetime;
use EEM_Ticket;
use EEM_Price;
use EventEspresso\core\services\graphql\enums\EnumBase;
use ReflectionException;

/**
 * Class ModelNameEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class ModelNameEnum extends EnumBase
{

    /**
     * ModelNameEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'ModelNameEnum');
        $this->setDescription(esc_html__('Entity model name', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function getValues(): array
    {
        return [
            'DATETIME' => [
                'value' => EEM_Datetime::instance()->item_name(),
            ],
            'TICKET'   => [
                'value' => EEM_Ticket::instance()->item_name(),
            ],
            'PRICE'    => [
                'value' => EEM_Price::instance()->item_name(),
            ],
        ];
    }
}
