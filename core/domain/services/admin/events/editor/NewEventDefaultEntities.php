<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Datetime;
use EE_Error;
use EE_Event;
use EEM_Datetime;
use EEM_Event;
use EEM_Price;
use EEM_Price_Type;
use EEM_Ticket;
use EventEspresso\core\domain\services\admin\entities\DefaultDatetimes;
use EventEspresso\core\exceptions\InvalidEntityException;
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
     * @var DefaultDatetimes $default_datetime
     */
    protected $default_datetime;



    /**
     * NewEventDefaultEntities constructor.
     *
     * @param EEM_Datetime     $datetime_model
     * @param EEM_Event        $event_model
     * @param EEM_Price        $price_model
     * @param EEM_Price_Type   $price_type_model
     * @param EEM_Ticket       $ticket_model
     * @param DefaultDatetimes $default_datetime
     */
    public function __construct(
        EEM_Datetime $datetime_model,
        EEM_Event $event_model,
        EEM_Price $price_model,
        EEM_Price_Type $price_type_model,
        EEM_Ticket $ticket_model,
        DefaultDatetimes $default_datetime
    ) {
        $this->default_datetime = $default_datetime;
        parent::__construct(
            $datetime_model,
            $event_model,
            $price_model,
            $price_type_model,
            $ticket_model
        );
    }


    /**
     * @param int $eventId
     * @return EE_Datetime[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidEntityException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getData($eventId)
    {

        $EVT_ID = absint($eventId);
        if ($EVT_ID < 1) {
            throw new InvalidArgumentException(
                esc_html__(
                    'A missing or invalid event ID was received.',
                    'event_espresso'
                )
            );
        }
        $event = $this->event_model->get_one_by_ID($EVT_ID);
        if (! $event instanceof EE_Event) {
            throw new InvalidEntityException($event, 'EE_Event');
        }
        return $this->default_datetime->create($event);
    }
}
