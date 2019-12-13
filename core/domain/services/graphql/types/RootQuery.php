<?php

namespace EventEspresso\core\domain\services\graphql\types;

use Exception;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\admin\events\editor\AdvancedEditorEntityData;
use GraphQL\Error\UserError;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;

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

        return json_encode(AdvancedEditorEntityData::getRelationalData($eventId));
    }
}
