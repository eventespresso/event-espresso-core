<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use DomainException;
use EE_Datetime;
use EE_Error;
use EEM_Datetime;
use EEM_Price;
use EEM_Price_Type;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class NewEventDefaultEntities
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class NewEventDefaultEntities extends EventEditorData
{

    /**
     * @var DefaultTickets $default_tickets
     */
    protected $default_tickets;


    /**
     * NewEventDefaultEntities constructor.
     *
     * @param EEM_Datetime   $datetime_model
     * @param EEM_Price      $price_model
     * @param EEM_Price_Type $price_type_model
     * @param EEM_Ticket     $ticket_model
     * @param DefaultTickets $default_tickets
     */
    public function __construct(
        EEM_Datetime $datetime_model,
        EEM_Price $price_model,
        EEM_Price_Type $price_type_model,
        EEM_Ticket $ticket_model,
        DefaultTickets $default_tickets
    ) {
        $this->default_tickets = $default_tickets;
        parent::__construct($datetime_model, $price_model, $price_type_model, $ticket_model);
    }


    /**
     * @param int $eventId
     * @return EE_Datetime[]
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    public function getData($eventId)
    {
        $default_dates = $this->datetime_model->create_new_blank_datetime();
        if (is_array($default_dates) && isset($default_dates[0]) && $default_dates[0] instanceof EE_Datetime) {
            // clone date, strip out ID, then save to get a new ID
            $default_date = clone $default_dates[0];
            $default_date->set('DTT_ID', null);
            $default_date->save();
            $default_date->_add_relation_to($eventId, 'Event');
            $this->default_tickets->create($default_date);
        }
        return $default_dates;
    }
}
