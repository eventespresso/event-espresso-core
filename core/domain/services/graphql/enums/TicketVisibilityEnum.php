<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EEM_Ticket;
use EventEspresso\core\services\graphql\enums\EnumBase;
use ReflectionClass;

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
     */
    protected function getValues(): array
    {
        $ticket_model = new ReflectionClass(EEM_Ticket::class);

        $constants = $ticket_model->getConstants();

        $enum = [];

        foreach ($constants as $constant => $value) {
            // if the constant name starts with 'TICKET_VISIBILITY_'
            if (0 === strpos($constant, 'TICKET_VISIBILITY_')) {
                // 'TICKET_VISIBILITY_PUBLIC' becomes 'PUBLIC'
                $key = str_replace('TICKET_VISIBILITY_', '', $constant);
                $enum[ $key ] = compact('value');
            }
        }
        return $enum;
    }
}
