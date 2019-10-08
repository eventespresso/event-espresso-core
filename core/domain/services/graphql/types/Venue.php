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
use EEM_State;
use EEM_Country;
use EventEspresso\core\services\graphql\TypeBase;
use WPGraphQL\Model\Post;

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
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'name');
                },
            ],
            'desc'          => [
                'type'        => 'String',
                'description' => __('Venue Description', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'description');
                },
            ],
            'shortDesc'     => [
                'type'        => 'String',
                'description' => __('Short Description of Venue', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'excerpt');
                },
            ],
            'identifier'    => [
                'type'        => 'String',
                'description' => __('Venue Identifier', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'identifier');
                },
            ],
            'created'       => [
                'type'        => 'String',
                'description' => __('Date Venue Created', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'created');
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
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'order');
                },
            ],
            'wpUser'        => [
                'type'        => 'User',
                'description' => __('Venue Creator', 'event_espresso'),
                'resolve'     => function ($source, $args, $context) {
                    return $this->resolveWpUser($source, $args, $context);
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
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'address');
                },
            ],
            'address2'      => [
                'type'        => 'String',
                'description' => __('Venue Address line 2', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'address2');
                },
            ],
            'city'          => [
                'type'        => 'String',
                'description' => __('Venue City', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'city');
                },
            ],
            'state'  => [
                'type'        => 'State',
                'description' => __('Venue state', 'event_espresso'),
                'resolve'     => function ($source) {
                    return $this->resolveState($source);
                },
            ],
            'country'  => [
                'type'        => 'Country',
                'description' => __('Venue country', 'event_espresso'),
                'resolve'     => function ($source) {
                    return $this->resolveCountry($source);
                },
            ],
            'zip'           => [
                'type'        => 'String',
                'description' => __('Venue Zip/Postal Code', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'zip');
                },
            ],
            'capacity'      => [
                'type'        => 'Int',
                'description' => __('Venue Capacity', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveCapacity($source);
                },
            ],
            'phone'         => [
                'type'        => 'String',
                'description' => __('Venue Phone', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'phone');
                },
            ],
            'virtualPhone'  => [
                'type'        => 'String',
                'description' => __('Call in Number', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'virtual_phone');
                },
            ],
            'url'           => [
                'type'        => 'String',
                'description' => __('Venue Website', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'venue_url');
                },
            ],
            'virtualUrl'    => [
                'type'        => 'String',
                'description' => __('Virtual URL', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'virtual_url');
                },
            ],
            'googleMapLink' => [
                'type'        => 'String',
                'description' => __('Google Map Link', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'google_map_link');
                },
            ],
            'enableForGmap' => [
                'type'        => 'String',
                'description' => __('Show Google Map?', 'event_espresso'),
                'resolve' => function ($source) {
                    return $this->resolveField($source, 'enable_for_gmap');
                },
            ],
        ] );
    }


    /**
     * @param Post|EE_Venue $source
     * @return EE_Base_Class|EE_Venue|null
     * @since $VID:$
     */
    private function getVenue($source)
    {
        // If it comes from a custom connection
        // where the $source is already instantiated.
        if ($source instanceof EE_Venue) {
            return $source;
        }

        $id = $source instanceof Post ? $source->ID : 0;

        if ($id) {
            return $this->model->get_one_by_ID($id);
        }
        return null;
    }


    /**
     * @param Post|EE_Venue $source The source instance.
     * @param string        $field  The field name.
     * @return mixed
     * @since $VID:$
     */
    public function resolveField($source, $field)
    {
        $venue = $this->getVenue($source);
        return $venue instanceof EE_Venue ? $venue->{$field}() : null;
    }


    /**
     * @param Post|EE_Venue $source The source instance.
     * @return int
     * @since $VID:$
     */
    public function resolveCapacity($source)
    {
        $venue = $this->getVenue($source);
        $capacity = $venue instanceof EE_Venue ? $venue->capacity() : EE_INF;
        return $this->parseInfiniteValue($capacity);
    }


    /**
     * @param Post|EE_Venue $source The source instance.
     * @return int
     * @since $VID:$
     */
    public function resolveState($source)
    {
        $venue = $this->getVenue($source);
        $state_id = $venue instanceof EE_Venue ? $venue->state_ID() : 0;
        if ($state_id) {
            return EEM_State::instance()->get_one_by_ID($state_id);
        }
        return null;
    }


    /**
     * @param Post|EE_Venue $source The source instance.
     * @return int
     * @since $VID:$
     */
    public function resolveCountry($source)
    {
        $venue = $this->getVenue($source);
        $country_id = $venue instanceof EE_Venue ? $venue->country_ID() : 0;
        if ($country_id) {
            return EEM_Country::instance()->get_one_by_ID($country_id);
        }
        return null;
    }
}