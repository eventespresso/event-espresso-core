<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EE_Ticket;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class TicketStatusEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class TicketStatusEnum extends EnumBase
{

    /**
     * TicketStatusEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'TicketStatusEnum');
        $this->setDescription(esc_html__('Whether the ticket is On Sale, Pending, or Expired', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    protected function getValues()
    {
        return [
            'SOLD_OUT'     => [
                'value'       => EE_Ticket::sold_out,
            ],
            'EXPIRED'     => [
                'value'       => EE_Ticket::expired,
            ],
            'ARCHIVED'     => [
                'value'       => EE_Ticket::archived,
            ],
            'PENDING'     => [
                'value'       => EE_Ticket::pending,
            ],
            'ONSALE'     => [
                'value'       => EE_Ticket::onsale,
            ],
        ];
    }
}
