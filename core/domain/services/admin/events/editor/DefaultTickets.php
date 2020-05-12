<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Base_Class;
use EE_Datetime;
use EE_Error;
use EEM_Ticket;
use ReflectionException;

/**
 * Class DefaultTickets
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DefaultTickets implements DefaultEntityGeneratorInterface
{

    /**
     * @var DefaultPrices $default_prices
     */
    protected $default_prices;

    /**
     * @var EEM_Ticket $ticket_model
     */
    protected $ticket_model;


    /**
     * @param DefaultPrices $default_prices
     * @param EEM_Ticket $ticket_model
     */
    public function __construct(DefaultPrices $default_prices, EEM_Ticket $ticket_model)
    {
        $this->default_prices = $default_prices;
        $this->ticket_model = $ticket_model;
    }


    /**
     * @param EE_Base_Class $entity
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity)
    {
        if (! $entity instanceof EE_Datetime) {
            return;
        }
        $default_tickets = $this->ticket_model->get_all_default_tickets();
        foreach ($default_tickets as $default_ticket) {
            // clone ticket, strip out ID, then save to get a new ID
            $default_ticket_clone = clone $default_ticket;
            $default_ticket_clone->set('TKT_ID', null);
            $default_ticket_clone->save();
            $default_ticket_clone->_add_relation_to($entity, 'Datetime');
            $this->default_prices->create($default_ticket_clone);
        }
    }
}
