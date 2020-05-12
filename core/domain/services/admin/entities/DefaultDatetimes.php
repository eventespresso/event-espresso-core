<?php

namespace EventEspresso\core\domain\services\admin\entities;

use EE_Base_Class;
use EE_Datetime;
use EE_Error;
use EE_Event;
use EEM_Datetime;
use EventEspresso\core\exceptions\InvalidEntityException;
use ReflectionException;

/**
 * Class DefaultDatetime
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\entities
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DefaultDatetimes implements DefaultEntityGeneratorInterface
{

    /**
     * @var DefaultTickets $default_tickets
     */
    protected $default_tickets;

    /**
     * @var EEM_Datetime $datetime_model
     */
    protected $datetime_model;

    /**
     * @param DefaultTickets $default_tickets
     * @param EEM_Datetime $datetime_model
     */
    public function __construct(DefaultTickets $default_tickets, EEM_Datetime $datetime_model)
    {
        $this->default_tickets = $default_tickets;
        $this->datetime_model = $datetime_model;
    }


    /**
     * @param EE_Event|EE_Base_Class $entity
     * @return EE_Datetime[]
     * @throws EE_Error
     * @throws InvalidEntityException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity)
    {
        if (! $entity instanceof EE_Event) {
            throw new InvalidEntityException($entity, 'EE_Event');
        }
        $default_dates = [];
        $blank_dates = $this->datetime_model->create_new_blank_datetime();
        if (is_array($blank_dates)) {
            foreach ($blank_dates as $blank_date) {
                if (! $blank_date instanceof EE_Datetime) {
                    throw new InvalidEntityException($blank_date, 'EE_Datetime');
                }
                // clone date, strip out ID, then save to get a new ID
                $default_date = clone $blank_date;
                $default_date->set('DTT_ID', null);
                $default_date->save();
                $default_date->_add_relation_to($entity->ID(), 'Event');
                $this->default_tickets->create($default_date);
                $default_dates[ $default_date->ID() ] = $default_date;
            }
        }
        return $default_dates;
    }
}
