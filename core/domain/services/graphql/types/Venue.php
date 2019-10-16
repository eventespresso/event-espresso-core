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
        $this->setGraphQLToModelMap([
            'name'          => 'name',
            'desc'          => 'description',
            'shortDesc'     => 'excerpt',
            'identifier'    => 'identifier',
            'created'       => 'created',
            'order'         => 'order',
            'address'       => 'address',
            'address2'      => 'address2',
            'city'          => 'city',
            'zip'           => 'zip',
            'phone'         => 'phone',
            'virtualPhone'  => 'virtual_phone',
            'url'           => 'venue_url',
            'virtualUrl'    => 'virtual_url',
            'googleMapLink' => 'google_map_link',
            'enableForGmap' => 'enable_for_gmap',
        ]);
        $this->setFields($this->getFields());
    }


    /**
     * @return array
     * @since $VID:$
     */
    public static function getFieldDefinitions()
    {
        return [
            'name'          => [
                'type'        => 'String',
                'description' => __('Venue Name', 'event_espresso'),
            ],
            'desc'          => [
                'type'        => 'String',
                'description' => __('Venue Description', 'event_espresso'),
            ],
            'shortDesc'     => [
                'type'        => 'String',
                'description' => __('Short Description of Venue', 'event_espresso'),
            ],
            'identifier'    => [
                'type'        => 'String',
                'description' => __('Venue Identifier', 'event_espresso'),
            ],
            'created'       => [
                'type'        => 'String',
                'description' => __('Date Venue Created', 'event_espresso'),
            ],
            'order'         => [
                'type'        => 'Int',
                'description' => __('Venue order', 'event_espresso'),
            ],
            'wpUser'        => [
                'type'        => 'User',
                'description' => __('Venue Creator', 'event_espresso'),
            ],
            'address'       => [
                'type'        => 'String',
                'description' => __('Venue Address line 1', 'event_espresso'),
            ],
            'address2'      => [
                'type'        => 'String',
                'description' => __('Venue Address line 2', 'event_espresso'),
            ],
            'city'          => [
                'type'        => 'String',
                'description' => __('Venue City', 'event_espresso'),
            ],
            'state'  => [
                'type'        => 'State',
                'description' => __('Venue state', 'event_espresso'),
            ],
            'country'  => [
                'type'        => 'Country',
                'description' => __('Venue country', 'event_espresso'),
            ],
            'zip'           => [
                'type'        => 'String',
                'description' => __('Venue Zip/Postal Code', 'event_espresso'),
            ],
            'capacity'      => [
                'type'        => 'Int',
                'description' => __('Venue Capacity', 'event_espresso'),
            ],
            'phone'         => [
                'type'        => 'String',
                'description' => __('Venue Phone', 'event_espresso'),
            ],
            'virtualPhone'  => [
                'type'        => 'String',
                'description' => __('Call in Number', 'event_espresso'),
            ],
            'url'           => [
                'type'        => 'String',
                'description' => __('Venue Website', 'event_espresso'),
            ],
            'virtualUrl'    => [
                'type'        => 'String',
                'description' => __('Virtual URL', 'event_espresso'),
            ],
            'googleMapLink' => [
                'type'        => 'String',
                'description' => __('Google Map Link', 'event_espresso'),
            ],
            'enableForGmap' => [
                'type'        => 'String',
                'description' => __('Show Google Map?', 'event_espresso'),
            ],
        ];
    }
}