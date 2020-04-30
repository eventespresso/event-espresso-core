<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Error;
use EventEspresso\core\domain\entities\admin\GraphQLData\Datetimes;
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
     * @var NewEventDefaultEntities $default_entities
     */
    protected $default_entities;


    /**
     * EventEditorGraphQLData constructor.
     *
     * @param Datetimes  $datetimes
     * @param Prices     $prices
     * @param PriceTypes $price_types
     * @param Tickets    $tickets
     * @param EventEntityRelations $relations
     * @param NewEventDefaultEntities $default_entities
     */
    public function __construct(
        Datetimes $datetimes,
        Prices $prices,
        PriceTypes $price_types,
        Tickets $tickets,
        EventEntityRelations $relations,
        NewEventDefaultEntities $default_entities
    ) {
        $this->datetimes = $datetimes;
        $this->default_entities = $default_entities;
        $this->prices = $prices;
        $this->price_types = $price_types;
        $this->relations = $relations;
        $this->tickets = $tickets;
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getData($eventId)
    {
        $datetimes = $this->datetimes->getData(['eventId' => $eventId]);

        // Avoid undefined variable warning in PHP >= 7.3
        $tickets = null;
        $prices = null;

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

            if (! empty($ticketIn)) {
                $prices = $this->prices->getData(['ticketIn' => $ticketIn]);
            }
        }

        $priceTypes = $this->price_types->getData();

        $relations = $this->relations->getData($eventId);


        return compact('datetimes', 'tickets', 'prices', 'priceTypes', 'relations');
    }
}
