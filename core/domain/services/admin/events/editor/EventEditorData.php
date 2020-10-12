<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EEM_Datetime;
use EEM_Event;
use EEM_Price;
use EEM_Price_Type;
use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\Utilities;

/**
 * Class EventEditorData
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class EventEditorData implements EventEditorDataInterface
{

    /**
     * @var EEM_Datetime $datetime_model
     */
    protected $datetime_model;

    /**
     * @var EEM_Event $event_model
     */
    protected $event_model;

    /**
     * @var EEM_Price $price_model
     */
    protected $price_model;

    /**
     * @var EEM_Price_Type $price_type_model
     */
    protected $price_type_model;

    /**
     * @var EEM_Ticket $ticket_model
     */
    protected $ticket_model;

    /**
     * @var Utilities
     */
    protected $utilities;


    /**
     * AdvancedEditorAdminForm constructor.
     *
     * @param EEM_Datetime   $datetime_model
     * @param EEM_Event      $event_model
     * @param EEM_Price      $price_model
     * @param EEM_Price_Type $price_type_model
     * @param EEM_Ticket     $ticket_model
     * @param Utilities      $utilities
     */
    public function __construct(
        EEM_Datetime $datetime_model,
        EEM_Event $event_model,
        EEM_Price $price_model,
        EEM_Price_Type $price_type_model,
        EEM_Ticket $ticket_model,
        Utilities $utilities
    ) {
        $this->datetime_model   = $datetime_model;
        $this->event_model      = $event_model;
        $this->price_model      = $price_model;
        $this->price_type_model = $price_type_model;
        $this->ticket_model     = $ticket_model;
        $this->utilities        = $utilities;
    }
}
