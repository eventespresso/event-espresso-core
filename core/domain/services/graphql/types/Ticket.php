<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Ticket;
use EventEspresso\core\services\graphql\TypeBase;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;

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
     * @return array
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                [
                    'key'         => 'ID',
                    'type'        => [
                        'non_null' => 'Int',
                    ],
                    'description' => __('Ticket ID', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'name',
                [
                    'key'         => 'name',
                    'type'        => 'String',
                    'description' => __('Ticket Name', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'description',
                [
                    'key'         => 'description',
                    'type'        => 'String',
                    'description' => __('Description of Ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'startDate',
                [
                    'key'         => 'start_date',
                    'type'        => 'String',
                    'description' => __('Start time/date of Ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'endDate',
                [
                    'key'         => 'end_date',
                    'type'        => 'String',
                    'description' => __('End time/date of Ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'min',
                [
                    'key'         => 'min',
                    'type'        => 'Int',
                    'description' => __('Minimum quantity of this ticket that must be purchased', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'max',
                [
                    'key'            => 'max',
                    'type'           => 'Int',
                    'description'    => __('Maximum quantity of this ticket that can be purchased in one transaction', 'event_espresso'),
                    'formatCallback' => [$this, 'parseInfiniteValue'],
                ]
            ),
            new GraphQLField(
                'price',
                [
                    'key'         => 'price',
                    'type'        => 'Float',
                    'description' => __('Final calculated price for ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'sold',
                [
                    'key'         => 'sold',
                    'type'        => 'Int',
                    'description' => __('Number of this ticket sold', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'quantity',
                [
                    'key'            => 'qty',
                    'type'           => 'Int',
                    'description'    => __('Quantity of this ticket that is available', 'event_espresso'),
                    'formatCallback' => [$this, 'parseInfiniteValue'],
                ]
            ),
            new GraphQLField(
                'reserved',
                [
                    'key'         => 'reserved',
                    'type'        => 'Int',
                    'description' => __('Quantity of this ticket that is reserved, but not yet fully purchased', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'uses',
                [
                    'key'            => 'uses',
                    'type'           => 'Int',
                    'description'    => __('Number of datetimes this ticket can be used at', 'event_espresso'),
                    'formatCallback' => [$this, 'parseInfiniteValue'],
                ]
            ),
            new GraphQLField(
                'isRequired',
                [
                    'key'         => 'required',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether this ticket must be purchased with a transaction', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isTaxable',
                [
                    'key'         => 'taxable',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether there is tax applied on this ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isDefault',
                [
                    'key'         => 'is_default',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating that this ticket is a default ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'order',
                [
                    'key'         => 'order',
                    'type'        => 'Int',
                    'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'row',
                [
                    'key'         => 'row',
                    'type'        => 'Int',
                    'description' => __('How tickets are displayed in the ui', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'wpUser',
                [
                    'type'        => 'User',
                    'description' => __('Ticket Creator ID', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'parent',
                [
                    'key'         => 'ID',
                    'type'        => 'Ticket',
                    'description' => __('The parent ticket of the current ticket', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'reverseCalculate',
                [
                    'key'         => 'reverse_calculate',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether ticket calculations should run in reverse and calculate the base ticket price from the provided ticket total.', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isFree',
                [
                    'key'         => 'is_free',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether the ticket is free.', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'event',
                [
                    'type'        => 'Event',
                    'description' => __('Event of the ticket.', 'event_espresso'),
                ]
            ),
        ];
    }
}