<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use DomainException;
use EE_Admin_Config;
use EE_Datetime;
use EE_Error;
use EE_Event;
use EEH_DTT_Helper;
use EEM_Datetime;
use EEM_Event;
use EEM_Price;
use EEM_Price_Type;
use EEM_Ticket;
use EE_Ticket;
use EEM_Venue;
use EventEspresso\core\domain\services\assets\EspressoEditorAssetManager;
use EventEspresso\core\domain\services\converters\RestApiSpoofer;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\RestPasswordIncorrectException;
use EventEspresso\core\exceptions\RestPasswordRequiredException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\RestException;
use InvalidArgumentException;
use ReflectionException;
use WP_Post;

/**
 * Class AdvancedEditorEntityData
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AdvancedEditorEntityData
{

    /**
     * @var EE_Event
     */
    protected $event;

    /**
     * @var RestApiSpoofer
     */
    protected $spoofer;

    /**
     * @var EE_Admin_Config
     */
    protected $admin_config;

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
     * @var EEM_Venue $venue_model
     */
    protected $venue_model;


    /**
     * AdvancedEditorAdminForm constructor.
     *
     * @param EE_Event        $event
     * @param RestApiSpoofer  $spoofer
     * @param EE_Admin_Config $admin_config
     * @param EEM_Datetime    $datetime_model
     * @param EEM_Event       $event_model
     * @param EEM_Price       $price_model
     * @param EEM_Price_Type  $price_type_model
     * @param EEM_Ticket      $ticket_model
     * @param EEM_Venue       $venue_model
     */
    public function __construct(
        EE_Event $event,
        RestApiSpoofer $spoofer,
        EE_Admin_Config $admin_config,
        EEM_Datetime $datetime_model,
        EEM_Event $event_model,
        EEM_Price $price_model,
        EEM_Price_Type $price_type_model,
        EEM_Ticket $ticket_model,
        EEM_Venue $venue_model
    ) {
        $this->event = $event;
        $this->admin_config = $admin_config;
        $this->spoofer = $spoofer;
        $this->datetime_model = $datetime_model;
        $this->event_model = $event_model;
        $this->price_model = $price_model;
        $this->price_type_model = $price_type_model;
        $this->ticket_model = $ticket_model;
        $this->venue_model = $venue_model;
        add_action('admin_enqueue_scripts', [$this, 'loadScriptsStyles']);
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @throws DomainException
     * @since $VID:$
     */
    public function loadScriptsStyles()
    {
        if ($this->admin_config->useAdvancedEditor()) {
            $eventId = $this->event instanceof EE_Event ? $this->event->ID() : 0;
            if (! $eventId) {
                global $post;
                $eventId = isset($_REQUEST['post']) ? absint($_REQUEST['post']) : 0;
                $eventId = $eventId === 0 && $post instanceof WP_Post && $post->post_type === 'espresso_events'
                    ? $post->ID
                    : $eventId;
            }
            if ($eventId) {
                $data = $this->getAllEventData($eventId);
                $data = wp_json_encode($data);
                add_action(
                    'admin_footer',
                    static function () use ($data) {
                        wp_add_inline_script(
                            EspressoEditorAssetManager::JS_HANDLE_EDITOR,
                            "var eeEditorEventData={$data};",
                            'before'
                        );
                    }
                );
            }
        }
    }


    /**
     * @param int $eventId
     * @return array
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    protected function getEventDates($eventId)
    {
        return $this->spoofer->getApiResults(
            $this->datetime_model,
            [
                [
                    'EVT_ID'      => $eventId,
                    'DTT_deleted' => ['IN', [true, false]]
                ]
            ]
        );
    }


    /**
     * @param int $eventId
     * @param array $eventDates
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    protected function addDefaultEntities($eventId, array $eventDates = [])
    {
        $default_dates = $this->datetime_model->create_new_blank_datetime();
        if (is_array($default_dates) && isset($default_dates[0]) && $default_dates[0] instanceof EE_Datetime) {
            $default_date = $default_dates[0];
            $default_date->save();
            $default_date->_add_relation_to($eventId, 'Event');
            $default_tickets = $this->ticket_model->get_all_default_tickets();
            $default_prices = $this->price_model->get_all_default_prices();
            foreach ($default_tickets as $default_ticket) {
                $default_ticket->save();
                $default_ticket->_add_relation_to($default_date, 'Datetime');
                foreach ($default_prices as $default_price) {
                    $default_price->save();
                    $default_price->_add_relation_to($default_ticket, 'Ticket');
                }
            }
        }
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @throws RestException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DomainException
     * @since $VID:$
     */
    protected function getAllEventData($eventId)
    {
        // these should ultimately be extracted out into their own classes (one per model)
        $event = $this->spoofer->getOneApiResult(
            $this->event_model,
            [['EVT_ID' => $eventId]]
        );
        if (! (is_array($event) && isset($event['EVT_ID']) && $event['EVT_ID'] === $eventId)) {
            return [];
        }
        $eventDates = $this->getEventDates($eventId);
        if ((! is_array($eventDates) || empty($eventDates))
            || (isset($_REQUEST['action']) && $_REQUEST['action'] === 'create_new')
        ) {
            $this->addDefaultEntities($eventId);
            $eventDates = $this->getEventDates($eventId);
        }

        $event = [$eventId => $event];
        $relations = [
            'event'    => [
                $eventId => [
                    'datetime' => []
                ]
            ],
            'datetime' => [],
            'ticket'   => [],
            'price'    => [],
        ];

        $datetimes = [];
        $eventDateTickets = [];
        if (is_array($eventDates)) {
            foreach ($eventDates as $eventDate) {
                if (isset($eventDate['DTT_ID']) && $eventDate['DTT_ID']) {
                    $DTT_ID = $eventDate['DTT_ID'];
                    $datetimes[ $DTT_ID ] = $eventDate;
                    $relations['event'][ $eventId ]['datetime'][] = $DTT_ID;
                    $eventDateTickets[ $DTT_ID ] = $this->spoofer->getApiResults(
                        $this->ticket_model,
                        [[
                            'Datetime.DTT_ID' => $DTT_ID,
                            'TKT_deleted' => ['IN', [true, false]]
                        ]]
                    );
                }
            }
        }

        $prices = [];
        $tickets = [];
        if (is_array($eventDateTickets)) {
            foreach ($eventDateTickets as $DTT_ID => $dateTickets) {
                if (is_array($dateTickets)) {
                    $relations['datetime'][ $DTT_ID ]['ticket'] = [];
                    foreach ($dateTickets as $ticket) {
                        if (isset($ticket['TKT_ID']) && $ticket['TKT_ID']) {
                            $TKT_ID = $ticket['TKT_ID'];
                            $tickets[ $TKT_ID ] = $ticket;
                            $relations['datetime'][ $DTT_ID ]['ticket'][] = $TKT_ID;
                            $ticketPrices[ $TKT_ID ] = $this->spoofer->getApiResults(
                                $this->price_model,
                                [['Ticket.TKT_ID' => $TKT_ID]]
                            );
                            if (is_array($ticketPrices[ $TKT_ID ])) {
                                $relations['ticket'][ $TKT_ID ]['price'] = [];
                                foreach ($ticketPrices[ $TKT_ID ] as $ticketPrice) {
                                    $PRC_ID = $ticketPrice['PRC_ID'];
                                    $prices[ $PRC_ID ] = $ticketPrice;
                                    $relations['ticket'][ $TKT_ID ]['price'][] = $PRC_ID;
                                }
                            }
                        }
                    }
                }
            }
        }
        $price_type_results = $this->spoofer->getApiResults(
            $this->price_type_model,
            [['PRT_deleted' => false]]
        );
        $price_types = [];
        foreach ($price_type_results as $price_type) {
            $price_types[ $price_type['PRT_ID'] ] = $price_type;
        }
        $venue = $this->spoofer->getOneApiResult(
            $this->venue_model,
            [['Event.EVT_ID' => $eventId]]
        );
        if (is_array($venue) && isset($venue['VNU_ID'])) {
            $relations['event'][ $eventId ]['venue'] = [ $venue['VNU_ID'] ];
            $venue = [$venue['VNU_ID'] => $venue];
        }

        $schemas = [
            'event'      => $this->spoofer->getModelSchema('events'),
            'datetime'   => $this->spoofer->getModelSchema('datetimes'),
            'ticket'     => $this->spoofer->getModelSchema('tickets'),
            'price'      => $this->spoofer->getModelSchema('prices'),
            'price_type' => $this->spoofer->getModelSchema('price_types'),
            'venue'      => $this->spoofer->getModelSchema('venues'),
        ];

        $tktRegCount = [];
        foreach ($tickets as $ticket) {
            $tkt_instance = $this->ticket_model->get_one_by_ID($ticket['TKT_ID']);

            $tktRegCount[ $ticket['TKT_ID'] ] = $tkt_instance instanceof EE_Ticket ?
            $tkt_instance->count_registrations()
            : 0;
        }

        return [
            'eventId'     => $eventId,
            'event'       => $event,
            'datetime'    => $datetimes,
            'ticket'      => $tickets,
            'price'       => $prices,
            'price_type'  => $price_types,
            'venue'       => $venue,
            'schemas'     => $schemas,
            'relations'   => $relations,
            'tktRegCount' => $tktRegCount,
        ];
    }
}
