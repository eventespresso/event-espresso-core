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
use EE_Datetime;
use EE_Error;
use EE_Event;
use EEM_Datetime;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\graphql\TypeBase;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\Data\DataSource;

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
        $this->setFields([
            'id'          => [
                'type'        => [
                    'non_null' => 'Int',
                ],
                'description' => __('The datetime ID.', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'ID');
                },
            ],
            'name'        => [
                'type'        => 'String',
                'description' => __('Datetime Name', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'name');
                },
            ],
            'description' => [
                'type'        => 'String',
                'description' => __('Description for Datetime', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'description');
                },
            ],
            'start'       => [
                'type'        => 'String',
                'description' => __('Start timestamp of Event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'start');
                },
            ],
            'startDate'   => [
                'type'        => 'String',
                'description' => __('Start time/date of Event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'start_date');
                },
            ],
            'end'         => [
                'type'        => 'String',
                'description' => __('End timestamp of Event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'end');
                },
            ],
            'endDate'     => [
                'type'        => 'String',
                'description' => __('End time/date of Event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'end_date');
                },
            ],
            'startTime'   => [
                'type'        => 'String',
                'description' => __('Start time of Event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'start_time');
                },
            ],
            'endTime'     => [
                'type'        => 'String',
                'description' => __('End time of Event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'end_time');
                },
            ],
            'capacity'    => [
                'type'        => 'Int',
                'description' => __('Registration Limit for this time', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    $capacity = $datetime instanceof EE_Datetime ? $datetime->reg_limit() : EE_INF;
                    return $this->parseInfiniteValue($capacity);
                },
            ],
            'sold'        => [
                'type'        => 'Int',
                'description' => __('How many sales for this Datetime that have occurred', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'sold');
                },
            ],
            'reserved'    => [
                'type'        => 'Int',
                'description' => __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'reserved');
                },
            ],
            'order'       => [
                'type'        => 'Int',
                'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'order');
                },
            ],
            'length'      => [
                'type'        => 'Int',
                'description' => __('The length of the event (start to end time) in seconds', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'length');
                },
            ],
            'parent'      => [
                'type'        => 'Datetime',
                'description' => __('The parent datetime of the current datetime', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveParent($datetime);
                },
            ],
            'isPrimary'   => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating datetime is primary one for event', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'is_primary');
                },
            ],
            'isSoldOut'   => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit',
                    'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'sold_out');
                },
            ],
            'isUpcoming'  => [
                'type'        => 'Boolean',
                'description' => __('Whether the date is upcoming', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'is_upcoming');
                },
            ],
            'isActive'    => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating datetime is active', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'is_active');
                },
            ],
            'isExpired'   => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating datetime is expired or not', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime) {
                    return $this->resolveField($datetime, 'is_expired');
                },
            ],
            'event'       => [
                'type'        => 'Event',
                'description' => __('Event of the datetime.', 'event_espresso'),
                'resolve'     => function (EE_Datetime $datetime, $args, $context) {
                    return $this->resolveEvent($datetime, $args, $context);
                },
            ],
        ]);
    }


    /**
     * @param EE_Datetime $datetime
     * @param mixed       $field
     * @return string
     * @since $VID:$
     */
    public function resolveField(EE_Datetime $datetime, $field)
    {
        return $datetime instanceof EE_Datetime ? $datetime->{$field}() : null;
    }


    /**
     * @param EE_Datetime $datetime
     * @param             $args
     * @param             $context
     * @return Deferred|null
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveEvent(EE_Datetime $datetime, $args, $context)
    {
        $event = $datetime instanceof EE_Datetime ? $datetime->event() : null;
        return $event instanceof EE_Event
            ? DataSource::resolve_post_object($event->ID(), $context)
            : null;
    }


    /**
     * @param EE_Datetime $datetime
     * @return EE_Base_Class|EE_Datetime|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveParent(EE_Datetime $datetime)
    {
        return $datetime instanceof EE_Datetime ? $this->model->get_one_by_ID($datetime->parent()) : null;
    }
}