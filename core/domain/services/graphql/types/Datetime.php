<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Datetime;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeCreate;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeDelete;
use EventEspresso\core\domain\services\graphql\mutators\DatetimeUpdate;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class EventDate
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
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
        $this->model = $datetime_model;
        $this->setName('Datetime');
        $this->setDescription(__('An event date', 'event_espresso'));
        $this->setIsCustomPostType(false);
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                ['non_null' => 'ID'],
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLOutputField(
                lcfirst($this->name()) . 'Id',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('The datetime ID.', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Datetime Name', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'String',
                'description',
                esc_html__('Description for Datetime', 'event_espresso')
            ),
            new GraphQLField(
                'start',
                'String',
                'start',
                esc_html__('Start timestamp of Event', 'event_espresso')
            ),
            new GraphQLField(
                'startDate',
                'String',
                'start_date',
                esc_html__('Start time/date of Event', 'event_espresso')
            ),
            new GraphQLField(
                'end',
                'String',
                'end',
                esc_html__('End timestamp of Event', 'event_espresso')
            ),
            new GraphQLField(
                'endDate',
                'String',
                'end_date',
                esc_html__('End time/date of Event', 'event_espresso')
            ),
            new GraphQLField(
                'startTime',
                'String',
                'start_time',
                esc_html__('Start time of Event', 'event_espresso')
            ),
            new GraphQLField(
                'endTime',
                'String',
                'end_time',
                esc_html__('End time of Event', 'event_espresso')
            ),
            new GraphQLField(
                'capacity',
                'Int',
                'reg_limit',
                esc_html__('Registration Limit for this time', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'sold',
                'Int',
                'sold',
                esc_html__('How many sales for this Datetime that have occurred', 'event_espresso')
            ),
            new GraphQLField(
                'reserved',
                'Int',
                'reserved',
                esc_html__('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('The order in which the Datetime is displayed', 'event_espresso')
            ),
            new GraphQLField(
                'length',
                'Int',
                'length',
                esc_html__('The length of the event (start to end time) in seconds', 'event_espresso')
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
                'isPrimary',
                'Boolean',
                'is_primary',
                esc_html__('Flag indicating datetime is primary one for event', 'event_espresso')
            ),
            new GraphQLField(
                'isSoldOut',
                'Boolean',
                'sold_out',
                esc_html__(
                    'Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'isUpcoming',
                'Boolean',
                'is_upcoming',
                esc_html__('Whether the date is upcoming', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'Boolean',
                'is_active',
                esc_html__('Flag indicating datetime is active', 'event_espresso')
            ),
            new GraphQLField(
                'isExpired',
                'Boolean',
                'is_expired',
                esc_html__('Flag indicating datetime is expired or not', 'event_espresso')
            ),
            new GraphQLOutputField(
                'event',
                'Event',
                null,
                esc_html__('Event of the datetime.', 'event_espresso')
            ),
            new GraphQLInputField(
                'eventId',
                'Int',
                null,
                esc_html__('Event ID of the datetime.', 'event_espresso')
            ),
            new GraphQLInputField(
                'event',
                'ID',
                null,
                esc_html__('Globally uqinue event ID of the datetime.', 'event_espresso')
            ),
            new GraphQLInputField(
                'tickets',
                ['list_of' => 'ID'],
                null,
                sprintf(
                    '%1$s %2$s',
                    esc_html__('Globally uqinue IDs of the tickets related to the datetime.', 'event_espresso'),
                    esc_html__('Ignored if empty.', 'event_espresso')
                )
            ),
        ];
    }


    /**
     * @param array $inputFields The mutation input fields.
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function registerMutations(array $inputFields)
    {
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
    }
}
