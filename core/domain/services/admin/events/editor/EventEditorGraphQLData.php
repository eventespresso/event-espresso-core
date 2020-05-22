<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Error;
use EEM_Price;
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
            $ticketIds = wp_list_pluck($tickets['nodes'], 'dbId');
        }

        /**
         * We need to get the prices that are related to the given tickets
         * Or are defalut prices.
         * We will first query for such prices and then limit our GQL query
         * to those price IDs.
         */
        $where_params = [
            'AND' => [
                'PRC_deleted'    => 0,
                'PRC_is_default' => 1,
            ],
        ];
        if (! empty($ticketIds)) {
            $where_params['Ticket.TKT_ID'] = ['IN', $ticketIds];
        }
        $priceIds = EEM_Price::instance()->get_col([
            [
            // If the price is related to any of these tickets
            // OR
            // it's a default price and not trashed
                'OR' => $where_params,
            ],
            'group_by'                 => 'PRC_ID',
            'default_where_conditions' => 'minimum',
        ]);

        if (! empty($priceIds)) {
            $prices = $this->prices->getData(['idIn' => $priceIds]);
        }

        $priceTypes = $this->price_types->getData();

        $relations = $this->relations->getData($eventId);


        return compact('datetimes', 'tickets', 'prices', 'priceTypes', 'relations');
    }
}
