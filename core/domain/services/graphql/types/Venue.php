<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
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
     * @return GraphQLField[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'name',
                'name',
                'String',
                __('Venue Name', 'event_espresso')
            ),
            new GraphQLField(
                'desc',
                'description',
                'String',
                __('Venue Description', 'event_espresso')
            ),
            new GraphQLField(
                'shortDesc',
                'excerpt',
                'String',
                __('Short Description of Venue', 'event_espresso')
            ),
            new GraphQLField(
                'identifier',
                'identifier',
                'String',
                __('Venue Identifier', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'created',
                'String',
                __('Date Venue Created', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'order',
                'Int',
                __('Venue order', 'event_espresso')
            ),
            new GraphQLField(
                'wpUser',
                'wpUser',
                'User',
                __('Venue Creator', 'event_espresso')
            ),
            new GraphQLField(
                'address',
                'address',
                'String',
                __('Venue Address line 1', 'event_espresso')
            ),
            new GraphQLField(
                'address2',
                'address2',
                'String',
                __('Venue Address line 2', 'event_espresso')
            ),
            new GraphQLField(
                'city',
                'city',
                'String',
                __('Venue City', 'event_espresso')
            ),
            new GraphQLField(
                'state',
                'state',
                'State',
                __('Venue state', 'event_espresso')
            ),
            new GraphQLField(
                'country',
                'country',
                'Country',
                __('Venue country', 'event_espresso')
            ),
            new GraphQLField(
                'zip',
                'zip',
                'String',
                __('Venue Zip/Postal Code', 'event_espresso')
            ),
            new GraphQLField(
                'capacity',
                'capacity',
                'Int',
                __('Venue Capacity', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'phone',
                'phone',
                'String',
                __('Venue Phone', 'event_espresso')
            ),
            new GraphQLField(
                'virtualPhone',
                'virtual_phone',
                'String',
                __('Call in Number', 'event_espresso')
            ),
            new GraphQLField(
                'url',
                'venue_url',
                'String',
                __('Venue Website', 'event_espresso')
            ),
            new GraphQLField(
                'virtualUrl',
                'virtual_url',
                'String',
                __('Virtual URL', 'event_espresso')
            ),
            new GraphQLField(
                'googleMapLink',
                'google_map_link',
                'String',
                __('Google Map Link', 'event_espresso')
            ),
            new GraphQLField(
                'enableForGmap',
                'enable_for_gmap',
                'String',
                __('Show Google Map?', 'event_espresso')
            ),
        ];
    }
}