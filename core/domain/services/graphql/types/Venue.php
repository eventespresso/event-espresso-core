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
use EE_Venue;
use EEM_Venue;
use EventEspresso\core\services\graphql\TypeBase;
use WP_Post;

/**
 * Class Venue
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Venue extends TypeBase
{

    /**
     * Venue constructor.
     *
     * @param EEM_Venue $venue_model
     */
    public function __construct(EEM_Venue $venue_model)
    {
        $this->model = $venue_model;
        $this->setName('Venue');
        $this->setIsCustomPostType(true);
        $this->setFields([
            'name'          => [
                'type'        => 'String',
                'description' => __('Venue Name', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'name');
                },
            ],
            'desc'          => [
                'type'        => 'String',
                'description' => __('Venue Description', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'description');
                },
            ],
            'shortDesc'     => [
                'type'        => 'String',
                'description' => __('Short Description of Venue', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'excerpt');
                },
            ],
            'identifier'    => [
                'type'        => 'String',
                'description' => __('Venue Identifier', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'identifier');
                },
            ],
            'created'       => [
                'type'        => 'String',
                'description' => __('Date Venue Created', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'created');
                },
            ],
            // Already registered
            /* 'modified'  => [
                'type'        => 'String',
                'description' => __('Venue Modified Date', 'event_espresso'),
            ], */
            'order'         => [
                'type'        => 'Int',
                'description' => __('Venue order', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'order');
                },
            ],
            'wpUser'        => [
                'type'        => 'User',
                'description' => __('Venue Creator', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'wp_user');
                },
            ],
            // Already registered
            /* 'parent'  => [
                'type'        => 'Venue',
                'description' => __('Venue Parent ID', 'event_espresso'),
            ], */
            'address'       => [
                'type'        => 'String',
                'description' => __('Venue Address line 1', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'address');
                },
            ],
            'address2'      => [
                'type'        => 'String',
                'description' => __('Venue Address line 2', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'address2');
                },
            ],
            'city'          => [
                'type'        => 'String',
                'description' => __('Venue City', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'city');
                },
            ],
            /* 'state'  => [
                'type'        => 'State',
                'description' => __('Venue state', 'event_espresso'),
            ],
            'country'  => [
                'type'        => 'Country',
                'description' => __('Venue country', 'event_espresso'),
            ], */
            'zip'           => [
                'type'        => 'String',
                'description' => __('Venue Zip/Postal Code', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'zip');
                },
            ],
            'capacity'      => [
                'type'        => 'Int',
                'description' => __('Venue Capacity', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveCapacity($post);
                },
            ],
            'phone'         => [
                'type'        => 'String',
                'description' => __('Venue Phone', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'phone');
                },
            ],
            'virtualPhone'  => [
                'type'        => 'String',
                'description' => __('Call in Number', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'virtual_phone');
                },
            ],
            'url'           => [
                'type'        => 'String',
                'description' => __('Venue Website', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'venue_url');
                },
            ],
            'virtualUrl'    => [
                'type'        => 'String',
                'description' => __('Virtual URL', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'virtual_url');
                },
            ],
            'googleMapLink' => [
                'type'        => 'String',
                'description' => __('Google Map Link', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'google_map_link');
                },
            ],
            'enableForGmap' => [
                'type'        => 'String',
                'description' => __('Show Google Map?', 'event_espresso'),
                'resolve' => function (WP_Post $post) {
                    return $this->resolveField($post, 'enable_for_gmap');
                },
            ],
        ] );
    }


    /**
     * @param WP_Post $post
     * @return EE_Base_Class|EE_Venue|null
     * @since $VID:$
     */
    private function getVenue(WP_Post $post)
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
        $venue = $this->getVenue($post);
        return $venue instanceof EE_Venue ? $venue->{$field}() : null;
    }


    /**
     * @param WP_Post $post
     * @return int
     * @since $VID:$
     */
    public function resolveCapacity(WP_Post $post)
    {
        $venue = $this->getVenue($post);
        $capacity = $venue instanceof EE_Venue ? $venue->capacity() : EE_INF;
        return $this->parseInfiniteValue($capacity);
    }


    /**
     * @param WP_Post $post
     * @return EE_Base_Class|EE_Venue|null
     * @since $VID:$
     */
    public function resolveParent(WP_Post $post)
    {
        $venue = $this->getVenue($post);
        return $venue instanceof EE_Venue ? $this->model->get_one_by_ID($venue->parent()) : null;
    }
}