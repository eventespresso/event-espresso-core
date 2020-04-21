<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EEM_Datetime;
use EEM_Ticket;
use EventEspresso\core\services\graphql\enums\EnumBase;

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
     * @since $VID:$
     */
    protected function getValues()
    {
        return [
            'DATETIME'     => [
                'value'       => EEM_Datetime::instance()->item_name(),
            ],
            'TICKET'     => [
                'value'       => EEM_Ticket::instance()->item_name(),
            ],
        ];
    }
}
