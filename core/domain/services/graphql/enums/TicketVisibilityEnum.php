<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EE_Error;
use EEM_Ticket;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class TicketVisibilityEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class TicketVisibilityEnum extends EnumBase
{

    /**
     * TicketVisibilityEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'TicketVisibilityEnum');
        $this->setDescription(esc_html__('Where the ticket can be viewed throughout the UI', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @throws EE_Error
     */
    protected function getValues(): array
    {
        return EEM_Ticket::instance()->getTicketVisibilityOptionsWithoutLabels();
    }
}
