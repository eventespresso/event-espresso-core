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
                'String',
                'name',
                __('Venue Name', 'event_espresso')
            ),
            new GraphQLField(
                'desc',
                'String',
                'description',
                __('Venue Description', 'event_espresso')
            ),
            new GraphQLField(
                'shortDesc',
                'String',
                'excerpt',
                __('Short Description of Venue', 'event_espresso')
            ),
            new GraphQLField(
                'identifier',
                'String',
                'identifier',
                __('Venue Identifier', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'String',
                'created',
                __('Date Venue Created', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                __('Venue order', 'event_espresso')
            ),
            new GraphQLField(
                'wpUser',
                'User',
                null,
                __('Venue Creator', 'event_espresso')
            ),
            new GraphQLField(
                'address',
                'String',
                'address',
                __('Venue Address line 1', 'event_espresso')
            ),
            new GraphQLField(
                'address2',
                'String',
                'address2',
                __('Venue Address line 2', 'event_espresso')
            ),
            new GraphQLField(
                'city',
                'String',
                'city',
                __('Venue City', 'event_espresso')
            ),
            new GraphQLField(
                'state',
                'State',
                null,
                __('Venue state', 'event_espresso')
            ),
            new GraphQLField(
                'country',
                'Country',
                null,
                __('Venue country', 'event_espresso')
            ),
            new GraphQLField(
                'zip',
                'String',
                'zip',
                __('Venue Zip/Postal Code', 'event_espresso')
            ),
            new GraphQLField(
                'capacity',
                'Int',
                'capacity',
                __('Venue Capacity', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'phone',
                'String',
                'phone',
                __('Venue Phone', 'event_espresso')
            ),
            new GraphQLField(
                'virtualPhone',
                'String',
                'virtual_phone',
                __('Call in Number', 'event_espresso')
            ),
            new GraphQLField(
                'url',
                'String',
                'venue_url',
                __('Venue Website', 'event_espresso')
            ),
            new GraphQLField(
                'virtualUrl',
                'String',
                'virtual_url',
                __('Virtual URL', 'event_espresso')
            ),
            new GraphQLField(
                'googleMapLink',
                'String',
                'google_map_link',
                __('Google Map Link', 'event_espresso')
            ),
            new GraphQLField(
                'enableForGmap',
                'String',
                'enable_for_gmap',
                __('Show Google Map?', 'event_espresso')
            ),
        ];
    }
}