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

use EEM_Venue;
use EventEspresso\core\services\graphql\TypeBase;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;

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
                'name',
                [
                    'key'         => 'name',
                    'type'        => 'String',
                    'description' => __('Venue Name', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'desc',
                [
                    'key'         => 'description',
                    'type'        => 'String',
                    'description' => __('Venue Description', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'shortDesc',
                [
                    'key'         => 'excerpt',
                    'type'        => 'String',
                    'description' => __('Short Description of Venue', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'identifier',
                [
                    'key'         => 'identifier',
                    'type'        => 'String',
                    'description' => __('Venue Identifier', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'created',
                [
                    'key'         => 'created',
                    'type'        => 'String',
                    'description' => __('Date Venue Created', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'order',
                [
                    'key'         => 'order',
                    'type'        => 'Int',
                    'description' => __('Venue order', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'wpUser',
                [
                    'type'        => 'User',
                    'description' => __('Venue Creator', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'address',
                [
                    'key'         => 'address',
                    'type'        => 'String',
                    'description' => __('Venue Address line 1', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'address2',
                [
                    'key'         => 'address2',
                    'type'        => 'String',
                    'description' => __('Venue Address line 2', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'city',
                [
                    'key'         => 'city',
                    'type'        => 'String',
                    'description' => __('Venue City', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'state',
                [
                    'type'        => 'State',
                    'description' => __('Venue state', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'country',
                [
                    'type'        => 'Country',
                    'description' => __('Venue country', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'zip',
                [
                    'key'         => 'zip',
                    'type'        => 'String',
                    'description' => __('Venue Zip/Postal Code', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'capacity',
                [
                    'key'            => 'capacity',
                    'type'           => 'Int',
                    'description'    => __('Venue Capacity', 'event_espresso'),
                    'formatCallback' => [$this, 'parseInfiniteValue'],
                ]
            ),
            new GraphQLField(
                'phone',
                [
                    'key'         => 'phone',
                    'type'        => 'String',
                    'description' => __('Venue Phone', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'virtualPhone',
                [
                    'key'         => 'virtual_phone',
                    'type'        => 'String',
                    'description' => __('Call in Number', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'url',
                [
                    'key'         => 'venue_url',
                    'type'        => 'String',
                    'description' => __('Venue Website', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'virtualUrl',
                [
                    'key'         => 'virtual_url',
                    'type'        => 'String',
                    'description' => __('Virtual URL', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'googleMapLink',
                [
                    'key'         => 'google_map_link',
                    'type'        => 'String',
                    'description' => __('Google Map Link', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'enableForGmap',
                [
                    'key'         => 'enable_for_gmap',
                    'type'        => 'String',
                    'description' => __('Show Google Map?', 'event_espresso'),
                ]
            ),
        ];
    }
}