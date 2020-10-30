<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Error;
use EventEspresso\core\domain\entities\admin\GraphQLData\Datetimes;
use EventEspresso\core\domain\entities\admin\GraphQLData\Event;
use EventEspresso\core\domain\entities\admin\GraphQLData\Prices;
use EventEspresso\core\domain\entities\admin\GraphQLData\PriceTypes;
use EventEspresso\core\domain\entities\admin\GraphQLData\Tickets;
use ReflectionException;

/**
 * Class EventEditorGraphQLData
 * Assembles GraphQL entity data for the Event Editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class EventEditorGraphQLData
{

    /**
     * @var Event $event
     */
    protected $event;

    /**
     * @var Datetimes $datetimes
     */
    protected $datetimes;

    /**
     * @var Prices $prices
     */
    protected $prices;

    /**
     * @var PriceTypes $price_types
     */
    protected $price_types;

    /**
     * @var Tickets $tickets
     */
    protected $tickets;

    /**
     * @var EventEntityRelations $relations
     */
    protected $relations;

    /**
     * @var EventManagers $managers
     */
    protected $managers;

    /**
     * @var NewEventDefaultEntities $default_entities
     */
    protected $default_entities;


    /**
     * EventEditorGraphQLData constructor.
     *
     * @param Datetimes               $datetimes
     * @param Event                   $event
     * @param Prices                  $prices
     * @param PriceTypes              $price_types
     * @param Tickets                 $tickets
     * @param EventEntityRelations    $relations
     * @param EventManagers           $managers
     * @param NewEventDefaultEntities $default_entities
     */
    public function __construct(
        Datetimes $datetimes,
        Event $event,
        Prices $prices,
        PriceTypes $price_types,
        Tickets $tickets,
        EventEntityRelations $relations,
        EventManagers $managers,
        NewEventDefaultEntities $default_entities
    ) {
        $this->datetimes        = $datetimes;
        $this->event            = $event;
        $this->default_entities = $default_entities;
        $this->prices           = $prices;
        $this->price_types      = $price_types;
        $this->managers         = $managers;
        $this->relations        = $relations;
        $this->tickets          = $tickets;
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getData(int $eventId)
    {
        $event = $this->event->getData(['id' => $eventId]);
        $datetimes = $this->datetimes->getData(['eventId' => $eventId]);
        $eventManagers = $this->managers ->getData($eventId);

        // Avoid undefined variable warning in PHP >= 7.3
        $tickets = null;
        $prices  = null;

        if (empty($datetimes['nodes']) || (isset($_REQUEST['action']) && $_REQUEST['action'] === 'create_new')) {
            $this->default_entities->getData($eventId);
            $datetimes = $this->datetimes->getData(['eventId' => $eventId]);
        }

        if (! empty($datetimes['nodes'])) {
            $datetimeIn = wp_list_pluck($datetimes['nodes'], 'id');

            if (! empty($datetimeIn)) {
                $tickets = $this->tickets->getData(['datetimeIn' => $datetimeIn]);
            }
        }

        if (! empty($tickets['nodes'])) {
            $ticketIn = wp_list_pluck($tickets['nodes'], 'id');
        }

        $pricesArgs = ['includeDefaultPrices' => true];

        if (! empty($ticketIn)) {
            $pricesArgs['ticketIn'] = $ticketIn;
        }
        $prices = $this->prices->getData($pricesArgs);

        $priceTypes = $this->price_types->getData();

        $relations = $this->relations->getData($eventId);

        return compact(
            'datetimes',
            'event',
            'eventManagers',
            'prices',
            'priceTypes',
            'relations',
            'tickets'
        );
    }
}
