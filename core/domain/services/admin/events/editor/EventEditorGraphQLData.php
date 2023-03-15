<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Error;
use EventEspresso\core\domain\entities\admin\GraphQLData\Datetimes;
use EventEspresso\core\domain\entities\admin\GraphQLData\Event;
use EventEspresso\core\domain\entities\admin\GraphQLData\Prices;
use EventEspresso\core\domain\entities\admin\GraphQLData\PriceTypes;
use EventEspresso\core\domain\entities\admin\GraphQLData\Tickets;
use EventEspresso\core\domain\entities\admin\GraphQLData\Venues;
use ReflectionException;

/**
 * Class EventEditorGraphQLData
 * Assembles GraphQL entity data for the Event Editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class EventEditorGraphQLData
{
    /**
     * @var Event
     */
    protected $event;

    /**
     * @var Datetimes
     */
    protected $datetimes;

    /**
     * @var Prices
     */
    protected $prices;

    /**
     * @var PriceTypes
     */
    protected $price_types;

    /**
     * @var Tickets
     */
    protected $tickets;

    /**
     * @var EventEntityRelations
     */
    protected $relations;

    /**
     * @var EventManagerData
     */
    protected $managers;

    /**
     * @var NewEventDefaultEntities
     */
    protected $default_entities;

    /**
     * @var TicketMeta
     */
    protected $ticket_meta;

    /**
     * @var FormBuilder
     */
    protected $form_builder;

    /**
     * @var Venues
     */
    protected $venues;


    /**
     * EventEditorGraphQLData constructor.
     *
     * @param Datetimes               $datetimes
     * @param Event                   $event
     * @param Prices                  $prices
     * @param PriceTypes              $price_types
     * @param Tickets                 $tickets
     * @param EventEntityRelations    $relations
     * @param EventManagerData        $managers
     * @param NewEventDefaultEntities $default_entities
     * @param TicketMeta              $ticket_meta
     * @param FormBuilder             $form_builder
     * @param Venues                  $venues
     */
    public function __construct(
        Datetimes $datetimes,
        Event $event,
        Prices $prices,
        PriceTypes $price_types,
        Tickets $tickets,
        EventEntityRelations $relations,
        EventManagerData $managers,
        NewEventDefaultEntities $default_entities,
        TicketMeta $ticket_meta,
        FormBuilder $form_builder,
        Venues $venues
    ) {
        $this->datetimes        = $datetimes;
        $this->event            = $event;
        $this->default_entities = $default_entities;
        $this->prices           = $prices;
        $this->price_types      = $price_types;
        $this->managers         = $managers;
        $this->relations        = $relations;
        $this->tickets          = $tickets;
        $this->ticket_meta      = $ticket_meta;
        $this->form_builder     = $form_builder;
        $this->venues           = $venues;
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function getData(int $eventId)
    {
        $this->default_entities->getData($eventId);
        $event = $this->event->getData(['id' => $eventId]);
        $datetimes = $this->datetimes->getData(['eventId' => $eventId]);
        $eventManagers = $this->managers ->getData($eventId);

        $tickets = $this->tickets->getData([
            'eventId'               => $eventId,
            'includeDefaultTickets' => true,
        ]);

        $prices = $this->prices->getData([
            'eventId'                     => $eventId,
            'includeDefaultTicketsPrices' => true,
            'includeDefaultPrices'        => true,
        ]);

        $priceTypes = $this->price_types->getData();

        $relations = $this->relations->getData($eventId);

        $ticketMeta = $this->ticket_meta->getData($eventId);

        $formBuilder = $this->form_builder->getData($eventId);

        $venues = $this->venues->getData();

        return compact(
            'datetimes',
            'event',
            'eventManagers',
            'formBuilder',
            'prices',
            'priceTypes',
            'relations',
            'tickets',
            'ticketMeta',
            'venues'
        );
    }
}
