<?php

namespace EventEspresso\core\domain\services\graphql\types;

use Exception;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EE_Datetime;
use EEM_Datetime;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeCreate;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeDelete;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeUpdate;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeBulkUpdate;
use EventEspresso\core\domain\services\graphql\mutators\BulkEntityDelete;
use EventEspresso\core\domain\services\graphql\mutators\EntityReorder;
use GraphQL\Error\UserError;
use GraphQLRelay\Relay;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Class EventDate
 * Description
 *
 * @since   5.0.0.p
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Manzoor Wani
 * @property EEM_Datetime $model
 */
class Datetime extends TypeBase
{
    /**
     * EventDate constructor.
     *
     * @param EEM_Datetime $datetime_model
     */
    public function __construct(EEM_Datetime $datetime_model)
    {
        $this->setName($this->namespace . 'Datetime');
        $this->setDescription(__('An event date', 'event_espresso'));
        $this->setIsCustomPostType(false);
        parent::__construct($datetime_model);
    }


    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array
    {
        $fields = [
            new GraphQLField(
                'id',
                ['non_null' => 'ID'],
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'dbId',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('The datetime ID.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'cacheId',
                ['non_null' => 'String'],
                null,
                esc_html__('The cache ID of the object.', 'event_espresso')
            ),
            new GraphQLField(
                'capacity',
                'Int',
                'reg_limit',
                esc_html__('Registration Limit for this time', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'description',
                'String',
                'description',
                esc_html__('Description for Datetime', 'event_espresso')
            ),
            new GraphQLField(
                'endDate',
                'String',
                'end_date_and_time',
                esc_html__('End date and time of the Event', 'event_espresso'),
                [$this, 'formatDatetime']
            ),
            new GraphQLOutputField(
                'event',
                $this->namespace . 'Event',
                null,
                esc_html__('Event of the datetime.', 'event_espresso')
            ),
            new GraphQLInputField(
                'event',
                'ID',
                null,
                esc_html__('Globally unique event ID of the datetime.', 'event_espresso')
            ),
            new GraphQLInputField(
                'eventId',
                'Int',
                null,
                esc_html__('Event ID of the datetime.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isActive',
                'Boolean',
                'is_active',
                esc_html__('Flag indicating datetime is active', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isExpired',
                'Boolean',
                'is_expired',
                esc_html__('Flag indicating datetime is expired or not', 'event_espresso')
            ),
            new GraphQLField(
                'isPrimary',
                'Boolean',
                'is_primary',
                esc_html__('Flag indicating datetime is primary one for event', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isSoldOut',
                'Boolean',
                'sold_out',
                esc_html__(
                    'Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'isTrashed',
                'Boolean',
                null,
                esc_html__('Flag indicating datetime has been trashed.', 'event_espresso'),
                null,
                [$this, 'getIsTrashed']
            ),
            new GraphQLOutputField(
                'isUpcoming',
                'Boolean',
                'is_upcoming',
                esc_html__('Whether the date is upcoming', 'event_espresso')
            ),
            new GraphQLOutputField(
                'length',
                'Int',
                'length',
                esc_html__('The length of the event (start to end time) in seconds', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Datetime Name', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('The order in which the Datetime is displayed', 'event_espresso')
            ),
            new GraphQLOutputField(
                'parent',
                $this->name(),
                null,
                esc_html__('The parent datetime of the current datetime', 'event_espresso')
            ),
            new GraphQLInputField(
                'parent',
                'ID',
                null,
                esc_html__('The parent datetime ID', 'event_espresso')
            ),
            new GraphQLField(
                'reserved',
                'Int',
                'reserved',
                esc_html__('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso')
            ),
            new GraphQLField(
                'startDate',
                'String',
                'start_date_and_time',
                esc_html__('Start date and time of the Event', 'event_espresso'),
                [$this, 'formatDatetime']
            ),
            new GraphQLField(
                'sold',
                'Int',
                'sold',
                esc_html__('How many sales for this Datetime that have occurred', 'event_espresso')
            ),
            new GraphQLOutputField(
                'status',
                $this->namespace . 'DatetimeStatusEnum',
                'get_active_status',
                esc_html__('Datetime status', 'event_espresso')
            ),
            new GraphQLInputField(
                'tickets',
                ['list_of' => 'ID'],
                null,
                sprintf(
                    '%1$s %2$s',
                    esc_html__('Globally unique IDs of the tickets related to the datetime.', 'event_espresso'),
                    esc_html__('Ignored if empty.', 'event_espresso')
                )
            ),
            new GraphQLField(
                'venue',
                'String',
                null,
                esc_html__('Datetime venue ID', 'event_espresso'),
                null,
                function (EE_Datetime $source) {
                    $venue_ID = $source->venue_ID();
                    return $venue_ID
                        // Since venue is a CPT, $type will be 'post'
                        ? Relay::toGlobalId('post', $venue_ID)
                        : null;
                }
            ),
        ];

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_types__datetime_fields',
            $fields,
            $this->name,
            $this->model
        );
    }


    /**
     * @param EE_Datetime   $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return bool
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @throws UnexpectedEntityException
     */
    public function getIsTrashed(EE_Datetime $source, array $args, AppContext $context, ResolveInfo $info): bool
    {
        return (bool) $source->get('DTT_deleted');
    }

    /**
     * Return the base mutation config for bulk update.
     *
     * @param string $base_input
     * @return array
     */
    public static function bulkUpdateBaseConfig(string $base_input): array
    {
        return [
            'inputFields'     => [
                /**
                 * represents the input that is unique for each entity
                 * e.g. dates may be unique for datetimes and tickets
                 */
                'uniqueInputs' => [
                    'type'        => [
                        'non_null' => ['list_of' => $base_input],
                    ],
                    'description' => esc_html__(
                        'List of unique inputs for each entity in bulk update',
                        'event_espresso'
                    ),
                ],
                /**
                 * represents the common input for all entities
                 * e.g. capacity or quantity may be same for all dates/tickets
                 */
                'sharedInput' => [
                    'type'        => $base_input,
                    'description' => esc_html__(
                        'Shared input for all entities in bulk update',
                        'event_espresso'
                    ),
                ],
            ],
            'outputFields'        => [
                'updated' => [
                    'type' => ['list_of' => 'ID'],
                ],
                'failed' => [
                    'type' => ['list_of' => 'ID'],
                ],
            ],
        ];
    }


    /**
     * @param array $inputFields The mutation input fields.
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws Exception
     */
    public function registerMutations(array $inputFields)
    {
        register_graphql_input_type(
            'Update' .  $this->name() . 'BaseInput',
            [
                'fields' => $inputFields,
            ]
        );
        // Register mutation to update an entity.
        register_graphql_mutation(
            'update' . $this->name(),
            [
                'inputFields'         => $inputFields,
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'    => $this->name(),
                        'resolve' => [$this, 'resolveFromPayload'],
                    ],
                ],
                'mutateAndGetPayload' => DatetimeUpdate::mutateAndGetPayload($this->model, $this),
            ]
        );
        $base_input = 'Update' .  $this->name() . 'BaseInput';
        // Register mutation to update an entity.
        register_graphql_mutation(
            'bulkUpdate' . $this->name(),
            array_merge(
                Datetime::bulkUpdateBaseConfig($base_input),
                [
                    'mutateAndGetPayload' => DatetimeBulkUpdate::mutateAndGetPayload($this->model, $this),
                ]
            )
        );

        // Register mutation to update an entity.
        register_graphql_mutation(
            'bulkDelete' . $this->namespace . 'Entities',
            [
                'inputFields'         => [
                    'entityIds'  => [
                        'type'        => [
                            'non_null' => ['list_of' => 'ID'],
                        ],
                        'description' => esc_html__('The list of GUIDs of the entities to be deleted.', 'event_espresso'),
                    ],
                    'entityType' => [
                        'type'        => [
                            'non_null' => $this->namespace . 'ModelNameEnum',
                        ],
                        'description' => esc_html__('The entity type for the IDs', 'event_espresso'),
                    ],
                    'deletePermanently' => [
                        'type'        => 'Boolean',
                        'description' => esc_html__('Whether to delete the entities permanently.', 'event_espresso'),
                    ],
                ],
                'outputFields'        => [
                    'deleted' => [
                        'type' => ['list_of' => 'ID'],
                    ],
                    'failed' => [
                        'type' => ['list_of' => 'ID'],
                    ],
                ],
                'mutateAndGetPayload' => BulkEntityDelete::mutateAndGetPayload(),
            ]
        );
        // Register mutation to delete an entity.
        register_graphql_mutation(
            'delete' . $this->name(),
            [
                'inputFields'         => [
                    'id'                => $inputFields['id'],
                    'deletePermanently' => [
                        'type'        => 'Boolean',
                        'description' => esc_html__('Whether to delete the entity permanently.', 'event_espresso'),
                    ],
                ],
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'        => $this->name(),
                        'description' => esc_html__('The object before it was deleted', 'event_espresso'),
                        'resolve'     => static function ($payload) {
                            $deleted = (object) $payload['deleted'];

                            return ! empty($deleted) ? $deleted : null;
                        },
                    ],
                ],
                'mutateAndGetPayload' => DatetimeDelete::mutateAndGetPayload($this->model, $this),
            ]
        );

        // remove primary key from input.
        unset($inputFields['id']);
        // Register mutation to update an entity.
        register_graphql_mutation(
            'create' . $this->name(),
            [
                'inputFields'         => $inputFields,
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'    => $this->name(),
                        'resolve' => [$this, 'resolveFromPayload'],
                    ],
                ],
                'mutateAndGetPayload' => DatetimeCreate::mutateAndGetPayload($this->model, $this),
            ]
        );

        // Register mutation to update an entity.
        register_graphql_mutation(
            'reorder' . $this->namespace . 'Entities',
            [
                'inputFields'         => [
                    'entityIds'  => [
                        'type'        => [
                            'non_null' => ['list_of' => 'ID'],
                        ],
                        'description' => esc_html__('The reordered list of entity GUIDs.', 'event_espresso'),
                    ],
                    'entityType' => [
                        'type'        => [
                            'non_null' => $this->namespace . 'ModelNameEnum',
                        ],
                        'description' => esc_html__('The entity type for the IDs', 'event_espresso'),
                    ],
                ],
                'outputFields'        => [
                    'ok' => [
                        'type'    => 'Boolean',
                        'resolve' => function ($payload) {
                            return (bool) $payload['ok'];
                        },
                    ],
                ],
                'mutateAndGetPayload' => EntityReorder::mutateAndGetPayload(),
            ]
        );
    }
}
