<?php

namespace EventEspresso\core\domain\services\admin\entities;

use EE_Base_Class;
use EE_Datetime;
use EE_Error;
use EE_Ticket;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidEntityException;
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
     * @param EE_Datetime|EE_Base_Class $entity
     * @return EE_Ticket[]
     * @throws EE_Error
     * @throws InvalidEntityException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity)
    {
        if (! $entity instanceof EE_Datetime) {
            throw new InvalidEntityException($entity, 'EE_Datetime');
        }
        $new_tickets = [];
        $default_tickets = $this->ticket_model->get_all_default_tickets();
        if (is_array($default_tickets)) {
            foreach ($default_tickets as $default_ticket) {
                if (! $default_ticket instanceof EE_Ticket) {
                    throw new InvalidEntityException($default_ticket, 'EE_Ticket');
                }
                // clone ticket, strip out ID, then save to get a new ID
                $default_ticket_clone = clone $default_ticket;
                $default_ticket_clone->set('TKT_ID', null);
                $default_ticket_clone->set('TKT_is_default', false);
                $default_ticket_clone->save();
                $default_ticket_clone->_add_relation_to($entity, 'Datetime');
                $this->default_prices->create($default_ticket_clone);
                $new_tickets[ $default_ticket_clone->ID() ] = $default_ticket_clone;
            }
        }
        return $new_tickets;
    }
}
