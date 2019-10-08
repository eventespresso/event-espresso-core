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

use EE_Base_Class;
use EE_Ticket;
use EE_Error;
use EE_WP_User;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\graphql\TypeBase;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\Data\DataSource;

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
     * @param EEM_Ticket $datetime_model
     */
    public function __construct(EEM_Ticket $datetime_model)
    {
        $this->model = $datetime_model;
        $this->setName('Ticket');
        $this->setDescription(__('A ticket for an event date', 'event_espresso'));
        $this->setIsCustomPostType(false);
        $this->setFields([
            'id'               => [
                'type'        => [
                    'non_null' => 'Int',
                ],
                'description' => __('Ticket ID', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'ID');
                },
            ],
            'name'             => [
                'type'        => 'String',
                'description' => __('Ticket Name', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'name');
                },
            ],
            'description'      => [
                'type'        => 'String',
                'description' => __('Description of Ticket', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'description');
                },
            ],
            'startDate'        => [
                'type'        => 'String',
                'description' => __('Start time/date of Ticket', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'start_date');
                },
            ],
            'endDate'          => [
                'type'        => 'String',
                'description' => __('End time/date of Ticket', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'end_date');
                },
            ],
            'min'              => [
                'type'        => 'Int',
                'description' => __('Minimum quantity of this ticket that must be purchased', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'min');
                },
            ],
            'max'              => [
                'type'        => 'Int',
                'description' => __('Maximum quantity of this ticket that can be purchased in one transaction',
                    'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'max');
                },
            ],
            'price'            => [
                'type'        => 'Float',
                'description' => __('Final calculated price for ticket', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'price');
                },
            ],
            'sold'             => [
                'type'        => 'Int',
                'description' => __('Number of this ticket sold', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'sold');
                },
            ],
            'quantity'         => [
                'type'        => 'Int',
                'description' => __('Quantity of this ticket that is available', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    $qty = $ticket instanceof EE_Ticket ? $ticket->qty() : EE_INF;
                    return $this->parseInfiniteValue($qty);
                },
            ],
            'reserved'         => [
                'type'        => 'Int',
                'description' => __('Quantity of this ticket that is reserved, but not yet fully purchased',
                    'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'reserved');
                },
            ],
            'uses'             => [
                'type'        => 'Int',
                'description' => __('Number of datetimes this ticket can be used at', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    $uses = $ticket instanceof EE_Ticket ? $ticket->uses() : EE_INF;
                    return $this->parseInfiniteValue($uses);
                },
            ],
            'isRequired'       => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether this ticket must be purchased with a transaction',
                    'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'required');
                },
            ],
            'isTaxable'        => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether there is tax applied on this ticket',
                    'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'taxable');
                },
            ],
            'isDefault'        => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating that this ticket is a default ticket', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'is_default');
                },
            ],
            'order'            => [
                'type'        => 'Int',
                'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'order');
                },
            ],
            'row'              => [
                'type'        => 'Int',
                'description' => __('How tickets are displayed in the ui', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'row');
                },
            ],
            'wpUser'           => [
                'type'        => 'User',
                'description' => __('Ticket Creator ID', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket, $args, $context) {
                    return $this->resolveWpUser($ticket, $args, $context);
                },
            ],
            'parent'           => [
                'type'        => 'Ticket',
                'description' => __('The parent ticket of the current ticket', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveParent($ticket);
                },
            ],
            'reverseCalculate' => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether ticket calculations should run in reverse and calculate the base ticket price from the provided ticket total.',
                    'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'reverse_calculate');
                },
            ],
            'isFree'           => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the ticket is free.', 'event_espresso'),
                'resolve'     => function (EE_Ticket $ticket) {
                    return $this->resolveField($ticket, 'is_free');
                },
            ],
            'datetimes'        => [
                'type'        => ['list_of' => 'Datetime'],
                'description' => __('The ticket datetimes.', 'event_espresso'),
                'resolve'     => static function (EE_Ticket $ticket, $args, $context) {
                    return $ticket instanceof EE_Ticket ? $ticket->get_many_related('Datetime') : null;
                },
            ],
        ] );
    }


    /**
     * @param EE_Ticket $ticket
     * @param mixed $field
     * @return string
     * @since $VID:$
     */
    public function resolveField(EE_Ticket $ticket, $field)
    {
        return $ticket instanceof EE_Ticket ? $ticket->{$field}() : null;
    }


    /**
     * @param EE_Ticket $ticket
     * @param           $args
     * @param           $context
     * @return Deferred|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @since $VID:$
     */
    public function resolveWpUser(EE_Ticket $ticket, $args, $context)
    {
        $wp_user = $ticket instanceof EE_Ticket ? $ticket->wp_user() : null;
        return $wp_user instanceof EE_WP_User
            ? DataSource::resolve_post_object($wp_user->ID(), $context)
            : null;
    }


    /**
     * @param EE_Ticket $ticket
     * @return EE_Base_Class|EE_Ticket|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveParent(EE_Ticket $ticket)
    {
        return $ticket instanceof EE_Ticket ? $this->model->get_one_by_ID($ticket->parent()) : null;
    }
}