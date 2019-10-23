<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Venue;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;

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
     * @return \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[]
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
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                __('Venue Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                __('Venue Creator ID', 'event_espresso')
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
            new GraphQLOutputField(
                'state',
                'State',
                null,
                __('Venue state', 'event_espresso')
            ),
            new GraphQLInputField(
                'state',
                'Int',
                null,
                __('State ID', 'event_espresso')
            ),
            new GraphQLOutputField(
                'country',
                'Country',
                null,
                __('Venue country', 'event_espresso')
            ),
            new GraphQLInputField(
                'country',
                'String',
                null,
                __('Country ISO Code', 'event_espresso')
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