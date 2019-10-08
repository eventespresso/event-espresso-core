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
use EE_Event;
use EEM_Event;
use EventEspresso\core\services\graphql\TypeBase;
use WP_Post;

/**
 * Class Event
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Event extends TypeBase
{

    /**
     * Event constructor.
     *
     * @param EEM_Event $event_model
     */
    public function __construct(EEM_Event $event_model)
    {
        $this->model = $event_model;
        $this->setName('Event');
        $this->setIsCustomPostType(true);
        $this->setFields( [
            'name'                  => [
                'type'        => 'String',
                'description' => __('Event Name', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'name');
                },
            ],
            'desc'                  => [
                'type'        => 'String',
                'description' => __('Event Description', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'description');
                },
            ],
            'shortDesc'             => [
                'type'        => 'String',
                'description' => __('Event Short Description', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'short_description');
                },
            ],
            'created'               => [
                'type'        => 'String',
                'description' => __('Date/Time Event Created', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'created');
                },
            ],
            // Already registered by WP GraphQL
            /* 'modified'  => [
                'type'        => 'String',
                'description' => __('Date/Time Event Modified', 'event_espresso'),
            ], */
            'wpUser'                => [
                'type'        => 'User',
                'description' => __('Event Creator', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'wp_user');
                },
            ],
            'order'                 => [
                'type'        => 'Int',
                'description' => __('Event Menu Order', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'order');
                },
            ],
            // Already registered by WP GraphQL
            /* 'parent'  => [
                'type'        => 'Venue',
                'description' => __('Venue Parent ID', 'event_espresso'),
            ], */
            'displayDesc'           => [
                'type'        => 'Boolean',
                'description' => __('Display Description Flag', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'display_description');
                },
            ],
            'displayTicketSelector' => [
                'type'        => 'Boolean',
                'description' => __('Display Ticket Selector Flag', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'display_ticket_selector');
                },
            ],
            'visibleOn'             => [
                'type'        => 'String',
                'description' => __('Event Visible Date', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'visible_on');
                },
            ],
            'additionalLimit'       => [
                'type'        => 'String',
                'description' => __('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'additional_limit');
                },
            ],
            'phone'                 => [
                'type'        => 'String',
                'description' => __('Event Phone Number', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'phone');
                },
            ],
            'memberOnly'            => [
                'type'        => 'Boolean',
                'description' => __('Member-Only Event Flag', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'member_only');
                },
            ],
            'allowOverflow'         => [
                'type'        => 'Boolean',
                'description' => __('Allow Overflow on Event', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'allow_overflow');
                },
            ],
            'timezoneString'        => [
                'type'        => 'String',
                'description' => __('Timezone (name) for Event times', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'timezone_string');
                },
            ],
            'externalUrl'           => [
                'type'        => 'String',
                'description' => __('URL of Event Page if hosted elsewhere', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'external_url');
                },
            ],
            'donations'             => [
                'type'        => 'Boolean',
                'description' => __('Accept Donations?', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'donations');
                },
            ],
            'isSoldOut'             => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the tickets sold for the event, met or exceed the registration limit',
                    'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_sold_out');
                },
            ],
            'isPostponed'           => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the event is marked as postponed', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_postponed');
                },
            ],
            'isCancelled'           => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the event is marked as cancelled', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_cancelled');
                },
            ],
            'isUpcoming'            => [
                'type'        => 'Boolean',
                'description' => __('Whether the event is upcoming', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_upcoming');
                },
            ],
            'isActive'              => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating event is active', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_active');
                },
            ],
            'isInactive'            => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating event is inactive', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_inactive');
                },
            ],
            'isExpired'             => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating event is expired or not', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'is_expired');
                },
            ],
        ] );
    }


    /**
     * @param WP_Post $post
     * @return EE_Base_Class|EE_Event|null
     * @since $VID:$
     */
    private function getEvent(WP_Post $post)
    {
        return $post instanceof WP_Post ? $this->model->get_one_by_ID($post->ID) : null;
    }


    /**
     * @param WP_Post $post
     * @param mixed $field
     * @return string
     * @since $VID:$
     */
    public function resolveField(WP_Post $post, $field)
    {
        $event = $this->getEvent($post);
        return $event instanceof EE_Event ? $event->{$field}() : null;
    }


    /**
     * @param WP_Post $post
     * @return EE_Base_Class|EE_Event|null
     * @since $VID:$
     */
    public function resolveParent(WP_Post $post)
    {
        $event = $this->getEvent($post);
        return $event instanceof EE_Event ? $this->model->get_one_by_ID($event->parent()) : null;
    }
}