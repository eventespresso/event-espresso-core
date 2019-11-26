<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Ticket;
use EEM_Price;
use EEM_Price_Type;
use EEM_Datetime;
use EE_Error;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use GraphQL\Error\UserError;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQLRelay\Relay;

/**
 * Class RootQuery
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RootQuery extends TypeBase
{

    /**
     * RootQuery constructor.
     */
    public function __construct()
    {
        $this->setName('RootQuery');
        $this->setIsCustomPostType(true);
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLOutputField(
                'eventRelations',
                'String',
                null,
                esc_html__('JSON encoded relational data of the models', 'event_espresso'),
                null,
                [$this, 'getEventRelationalData'],
                [
                    'eventId' => [
                        'type'        => ['non_null' => 'Int'],
                        'description' => esc_html__('The event ID to get the relational data for.', 'event_espresso'),
                    ],
                ]
            ),
        ];
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    public function getEventRelationalData($source, array $args, AppContext $context, ResolveInfo $info)
    {
        /**
         * Throw an exception if there's no event ID
         */
        if (empty($args['eventId']) || ! absint($args['eventId'])) {
            throw new UserError(esc_html__(
                'No event ID was provided to get the relational data for',
                'event_espresso'
            ));
        }

        $eventId = absint($args['eventId']);

        $data = [
            'datetimes'  => [],
            'tickets'    => [],
            'prices'     => [],
        ];

        $eem_datetime   = EEM_Datetime::instance();
        $eem_ticket     = EEM_Ticket::instance();
        $eem_price      = EEM_Price::instance();
        $eem_price_type = EEM_Price_Type::instance();

        // PROCESS DATETIMES
        $related_models = [
            'tickets' => $eem_ticket,
        ];
        // Get the IDs of event datetimes.
        $datetimeIds = $eem_datetime->get_col([['EVT_ID' => $eventId]]);
        foreach ($datetimeIds as $datetimeId) {
            $GID = self::convertToGlobalId($eem_datetime->item_name(), $datetimeId);
            foreach ($related_models as $key => $model) {
                // Get the IDs of related entities for the datetime ID.
                $Ids = $model->get_col([['Datetime.DTT_ID' => $datetimeId]]);
                if (! empty($Ids)) {
                    $data['datetimes'][ $GID ][ $key ] = self::convertToGlobalId($model->item_name(), $Ids);
                }
            }
        }

        // PROCESS TICKETS
        $related_models = [
            'datetimes' => $eem_datetime,
            'prices'    => $eem_price,
        ];
        // Get the IDs of all datetime tickets.
        $ticketIds = $eem_ticket->get_col([['Datetime.DTT_ID' => ['in', $datetimeIds]]]);
        foreach ($ticketIds as $ticketId) {
            $GID = self::convertToGlobalId($eem_ticket->item_name(), $ticketId);

            foreach ($related_models as $key => $model) {
                // Get the IDs of related entities for the ticket ID.
                $Ids = $model->get_col([['Ticket.TKT_ID' => $ticketId]]);
                if (! empty($Ids)) {
                    $data['tickets'][ $GID ][ $key ] = self::convertToGlobalId($model->item_name(), $Ids);
                }
            }
        }

        // PROCESS PRICES
        $related_models = [
            'tickets'    => $eem_ticket,
            'priceTypes' => $eem_price_type,
        ];
        // Get the IDs of all ticket prices.
        $priceIds = $eem_price->get_col([['Ticket.TKT_ID' => ['in', $ticketIds]]]);
        foreach ($priceIds as $priceId) {
            $GID = self::convertToGlobalId($eem_price->item_name(), $priceId);

            foreach ($related_models as $key => $model) {
                // Get the IDs of related entities for the price ID.
                $Ids = $model->get_col([['Price.PRC_ID' => $priceId]]);
                if (! empty($Ids)) {
                    $data['prices'][ $GID ][ $key ] = self::convertToGlobalId($model->item_name(), $Ids);
                }
            }
        }

        return json_encode($data);
    }

    /**
     * Convert the DB ID into GID
     *
     * @param string    $type
     * @param int|int[] $ID
     * @return mixed
     */
    public static function convertToGlobalId($type, $ID)
    {
        if (is_array($ID)) {
            return array_map(function ($id) use ($type) {
                return self::convertToGlobalId($type, $id);
            }, $ID);
        }
        return Relay::toGlobalId($type, $ID);
    }
}
