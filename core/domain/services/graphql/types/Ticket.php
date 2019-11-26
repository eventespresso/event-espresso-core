<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Ticket;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\graphql\mutators\TicketCreate;
use EventEspresso\core\domain\services\graphql\mutators\TicketDelete;
use EventEspresso\core\domain\services\graphql\mutators\TicketUpdate;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class Ticket
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Ticket extends TypeBase
{

    /**
     * Ticket constructor.
     *
     * @param EEM_Ticket $ticket_model
     */
    public function __construct(EEM_Ticket $ticket_model)
    {
        $this->model = $ticket_model;
        $this->setName('Ticket');
        $this->setDescription(__('A ticket for an event date', 'event_espresso'));
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
                esc_html__('Ticket ID', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Ticket Name', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'String',
                'description',
                esc_html__('Description of Ticket', 'event_espresso')
            ),
            new GraphQLField(
                'startDate',
                'String',
                'start_date',
                esc_html__('Start time/date of Ticket', 'event_espresso')
            ),
            new GraphQLField(
                'endDate',
                'String',
                'end_date',
                esc_html__('End time/date of Ticket', 'event_espresso')
            ),
            new GraphQLField(
                'min',
                'Int',
                'min',
                esc_html__('Minimum quantity of this ticket that must be purchased', 'event_espresso')
            ),
            new GraphQLField(
                'max',
                'Int',
                'max',
                esc_html__(
                    'Maximum quantity of this ticket that can be purchased in one transaction',
                    'event_espresso'
                ),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'price',
                'Float',
                'price',
                esc_html__('Final calculated price for ticket', 'event_espresso')
            ),
            new GraphQLOutputField(
                'prices',
                ['list_of' => 'Price'],
                'prices',
                esc_html__('The related ticket prices.', 'event_espresso')
            ),
            new GraphQLField(
                'sold',
                'Int',
                'sold',
                esc_html__('Number of this ticket sold', 'event_espresso')
            ),
            new GraphQLField(
                'quantity',
                'Int',
                'qty',
                esc_html__('Quantity of this ticket that is available', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'reserved',
                'Int',
                'reserved',
                esc_html__(
                    'Quantity of this ticket that is reserved, but not yet fully purchased',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'uses',
                'Int',
                'uses',
                esc_html__('Number of datetimes this ticket can be used at', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'isRequired',
                'Boolean',
                'required',
                esc_html__(
                    'Flag indicating whether this ticket must be purchased with a transaction',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'isTaxable',
                'Boolean',
                'taxable',
                esc_html__(
                    'Flag indicating whether there is tax applied on this ticket',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'isDefault',
                'Boolean',
                'is_default',
                esc_html__('Flag indicating that this ticket is a default ticket', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('The order in which the Datetime is displayed', 'event_espresso')
            ),
            new GraphQLField(
                'row',
                'Int',
                'row',
                esc_html__('How tickets are displayed in the ui', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('Ticket Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                esc_html__('Ticket Creator ID', 'event_espresso')
            ),
            new GraphQLOutputField(
                'parent',
                $this->name(),
                null,
                esc_html__('The parent ticket of the current ticket', 'event_espresso')
            ),
            new GraphQLInputField(
                'parent',
                'ID',
                null,
                esc_html__('The parent ticket ID', 'event_espresso')
            ),
            new GraphQLField(
                'reverseCalculate',
                'Boolean',
                'reverse_calculate',
                esc_html__(
                    'Flag indicating whether ticket calculations should run in reverse and calculate the base ticket price from the provided ticket total.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'isFree',
                'Boolean',
                'is_free',
                esc_html__('Flag indicating whether the ticket is free.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'event',
                'Event',
                null,
                esc_html__('Event of the ticket.', 'event_espresso')
            ),
            new GraphQLInputField(
                'datetimes',
                ['list_of' => 'ID'],
                null,
                sprintf(
                    '%1$s %2$s',
                    esc_html__('Globally unique IDs of the datetimes related to the ticket.', 'event_espresso'),
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
                'mutateAndGetPayload' => TicketUpdate::mutateAndGetPayload($this->model, $this),
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
                'mutateAndGetPayload' => TicketDelete::mutateAndGetPayload($this->model, $this),
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
                'mutateAndGetPayload' => TicketCreate::mutateAndGetPayload($this->model, $this),
            ]
        );
    }
}
