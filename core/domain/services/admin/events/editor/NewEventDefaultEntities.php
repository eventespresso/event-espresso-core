<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use DomainException;
use EE_Datetime;
use EE_Error;
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
            $default_tickets = $this->ticket_model->get_all_default_tickets();
            $default_prices = $this->price_model->get_all_default_prices();
            foreach ($default_tickets as $default_ticket) {
                // clone ticket, strip out ID, then save to get a new ID
                $default_ticket_clone = clone $default_ticket;
                $default_ticket_clone->set('TKT_ID', null);
                $default_ticket_clone->save();
                $default_ticket_clone->_add_relation_to($default_date, 'Datetime');
                foreach ($default_prices as $default_price) {
                    // clone price, strip out ID, then save to get a new ID
                    $default_price_clone = clone $default_price;
                    $default_price_clone->set('PRC_ID', null);
                    $default_price_clone->save();
                    $default_price_clone->_add_relation_to($default_ticket_clone, 'Ticket');
                }
            }
        }
        return $default_dates;
    }
}