<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class TicketsConnectionOrderbyEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class TicketsConnectionOrderbyEnum extends EnumBase
{
    /**
     * TicketsConnectionOrderbyEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'TicketsConnectionOrderbyEnum');
        $this->setDescription(esc_html__('Field to order the connection by', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     */
    protected function getValues(): array
    {
        return [
            'NAME'     => [
                'value'       => 'TKT_name',
                'description' => esc_html__('Order by name', 'event_espresso'),
            ],
            'START_DATE'     => [
                'value'       => 'TKT_start_date',
                'description' => esc_html__('Order by start date', 'event_espresso'),
            ],
        ];
    }
}
