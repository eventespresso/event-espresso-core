<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EE_Datetime;
use EE_Ticket;
use EEM_Datetime;
use EEM_Ticket;
use EventEspresso\core\domain\services\admin\events\editor\EventEntityRelations;
use EventEspresso\core\services\loaders\LoaderFactory;
use Exception;
use InvalidArgumentException;
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
 * @author  Manzoor Wani
 * @since   5.0.0.p
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
     */
    public function getFields(): array
    {
        return [
            new GraphQLOutputField(
                lcfirst($this->namespace) . 'EventRelations',
                'String',
                null,
                esc_html__('JSON encoded relational data of the models', 'event_espresso'),
                null,
                [$this, 'getEventRelationalData'],
                [],
                [
                    'eventId' => [
                        'type'        => ['non_null' => 'Int'],
                        'description' => esc_html__('The event ID to get the relational data for.', 'event_espresso'),
                    ],
                ]
            ),
            new GraphQLOutputField(
                lcfirst($this->namespace) . 'Datetime',
                $this->namespace . 'Datetime',
                null,
                esc_html__('A datetime', 'event_espresso'),
                null,
                [$this, 'getDatetime'],
                [],
                [
                    'id' => [
                        'type'        => [
                            'non_null' => 'ID',
                        ],
                        'description' => esc_html__('The globally unique identifier of the datetime.', 'event_espresso'),
                    ],
                ]
            ),
            new GraphQLOutputField(
                lcfirst($this->namespace) . 'Ticket',
                $this->namespace . 'Ticket',
                null,
                esc_html__('A ticket', 'event_espresso'),
                null,
                [$this, 'getTicket'],
                [],
                [
                    'id' => [
                        'type'        => [
                            'non_null' => 'ID',
                        ],
                        'description' => esc_html__('The globally unique identifier of the ticket.', 'event_espresso'),
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
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UserError
     * @throws UnexpectedEntityException
     * @since 5.0.0.p
     */
    public function getEventRelationalData($source, array $args, AppContext $context, ResolveInfo $info): string
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
        /** @var EventEntityRelations $event_entity_relations */
        $event_entity_relations = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\admin\events\editor\EventEntityRelations'
        );
        return json_encode($event_entity_relations->getData($eventId));
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UserError
     * @throws UnexpectedEntityException
     * @since 5.0.0.p
     */
    public function getDatetime($source, array $args, AppContext $context, ResolveInfo $info): EE_Datetime
    {
        $parts = Relay::fromGlobalId(sanitize_text_field($args['id']));

        /**
         * Throw an exception if there's no ID
         */
        if (empty($parts['id'])) {
            throw new UserError(esc_html__(
                'A missing or invalid ID was received.',
                'event_espresso'
            ));
        }

        return EEM_Datetime::instance()->get_one_by_ID(absint($parts['id']));
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UserError
     * @throws UnexpectedEntityException
     * @since 5.0.0.p
     */
    public function getTicket($source, array $args, AppContext $context, ResolveInfo $info): EE_Ticket
    {
        $parts = Relay::fromGlobalId(sanitize_text_field($args['id']));

        /**
         * Throw an exception if there's no ID
         */
        if (empty($parts['id'])) {
            throw new UserError(esc_html__(
                'A missing or invalid ID was received.',
                'event_espresso'
            ));
        }

        return EEM_Ticket::instance()->get_one_by_ID(absint($parts['id']));
    }
}
