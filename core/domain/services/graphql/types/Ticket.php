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
        $this->setGraphQLToModelMap([
            'id'               => 'ID',
            'name'             => 'name',
            'description'      => 'description',
            'startDate'        => 'start_date',
            'endDate'          => 'end_date',
            'min'              => 'min',
            'price'            => 'price',
            'sold'             => 'sold',
            'reserved'         => 'reserved',
            'isRequired'       => 'required',
            'isTaxable'        => 'taxable',
            'isDefault'        => 'is_default',
            'order'            => 'order',
            'row'              => 'row',
            'reverseCalculate' => 'reverse_calculate',
            'isFree'           => 'is_free',
        ]);

        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    public static function getFieldDefinitions()
    {
        return [
            'id'               => [
                'type'        => [
                    'non_null' => 'Int',
                ],
                'description' => __('Ticket ID', 'event_espresso'),
            ],
            'name'             => [
                'type'        => 'String',
                'description' => __('Ticket Name', 'event_espresso'),
            ],
            'description'      => [
                'type'        => 'String',
                'description' => __('Description of Ticket', 'event_espresso'),
            ],
            'startDate'        => [
                'type'        => 'String',
                'description' => __('Start time/date of Ticket', 'event_espresso'),
            ],
            'endDate'          => [
                'type'        => 'String',
                'description' => __('End time/date of Ticket', 'event_espresso'),
            ],
            'min'              => [
                'type'        => 'Int',
                'description' => __('Minimum quantity of this ticket that must be purchased', 'event_espresso'),
            ],
            'max'              => [
                'type'        => 'Int',
                'description' => __('Maximum quantity of this ticket that can be purchased in one transaction', 'event_espresso'),
            ],
            'price'            => [
                'type'        => 'Float',
                'description' => __('Final calculated price for ticket', 'event_espresso'),
            ],
            'sold'             => [
                'type'        => 'Int',
                'description' => __('Number of this ticket sold', 'event_espresso'),
            ],
            'quantity'         => [
                'type'        => 'Int',
                'description' => __('Quantity of this ticket that is available', 'event_espresso'),
            ],
            'reserved'         => [
                'type'        => 'Int',
                'description' => __('Quantity of this ticket that is reserved, but not yet fully purchased', 'event_espresso'),
            ],
            'uses'             => [
                'type'        => 'Int',
                'description' => __('Number of datetimes this ticket can be used at', 'event_espresso'),
            ],
            'isRequired'       => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether this ticket must be purchased with a transaction', 'event_espresso'),
            ],
            'isTaxable'        => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether there is tax applied on this ticket', 'event_espresso'),
            ],
            'isDefault'        => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating that this ticket is a default ticket', 'event_espresso'),
            ],
            'order'            => [
                'type'        => 'Int',
                'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
            ],
            'row'              => [
                'type'        => 'Int',
                'description' => __('How tickets are displayed in the ui', 'event_espresso'),
            ],
            'wpUser'           => [
                'type'        => 'User',
                'description' => __('Ticket Creator ID', 'event_espresso'),
            ],
            'parent'           => [
                'type'        => 'Ticket',
                'description' => __('The parent ticket of the current ticket', 'event_espresso'),
            ],
            'reverseCalculate' => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether ticket calculations should run in reverse and calculate the base ticket price from the provided ticket total.', 'event_espresso'),
            ],
            'isFree'           => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the ticket is free.', 'event_espresso'),
            ],
        ];
    }
}