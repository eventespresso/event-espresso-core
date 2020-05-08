<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Venue;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\domain\services\graphql\mutators\VenueUpdate;

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
        $this->setName($this->namespace . 'Venue');
        $this->setIsCustomPostType(true);
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLOutputField(
                'dbId',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('The venue ID.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'cacheId',
                ['non_null' => 'String'],
                null,
                esc_html__('The cache ID of the object.', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Venue Name', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'String',
                'description',
                esc_html__('Venue Description', 'event_espresso')
            ),
            new GraphQLField(
                'shortDescription',
                'String',
                'excerpt',
                esc_html__('Short Description of Venue', 'event_espresso')
            ),
            new GraphQLField(
                'identifier',
                'String',
                'identifier',
                esc_html__('Venue Identifier', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'String',
                'created',
                esc_html__('Date Venue Created', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Venue order', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('Venue Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                esc_html__('Venue Creator ID', 'event_espresso')
            ),
            new GraphQLField(
                'address',
                'String',
                'address',
                esc_html__('Venue Address line 1', 'event_espresso')
            ),
            new GraphQLField(
                'address2',
                'String',
                'address2',
                esc_html__('Venue Address line 2', 'event_espresso')
            ),
            new GraphQLField(
                'city',
                'String',
                'city',
                esc_html__('Venue City', 'event_espresso')
            ),
            new GraphQLOutputField(
                'state',
                $this->namespace . 'State',
                null,
                esc_html__('Venue state', 'event_espresso')
            ),
            new GraphQLInputField(
                'state',
                'Int',
                null,
                esc_html__('State ID', 'event_espresso')
            ),
            new GraphQLOutputField(
                'country',
                $this->namespace . 'Country',
                null,
                esc_html__('Venue country', 'event_espresso')
            ),
            new GraphQLInputField(
                'country',
                'String',
                null,
                esc_html__('Country ISO Code', 'event_espresso')
            ),
            new GraphQLField(
                'zip',
                'String',
                'zip',
                esc_html__('Venue Zip/Postal Code', 'event_espresso')
            ),
            new GraphQLField(
                'capacity',
                'Int',
                'capacity',
                esc_html__('Venue Capacity', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'phone',
                'String',
                'phone',
                esc_html__('Venue Phone', 'event_espresso')
            ),
            new GraphQLField(
                'virtualPhone',
                'String',
                'virtual_phone',
                esc_html__('Call in Number', 'event_espresso')
            ),
            new GraphQLField(
                'url',
                'String',
                'venue_url',
                esc_html__('Venue Website', 'event_espresso')
            ),
            new GraphQLField(
                'virtualUrl',
                'String',
                'virtual_url',
                esc_html__('Virtual URL', 'event_espresso')
            ),
            new GraphQLField(
                'googleMapLink',
                'String',
                'google_map_link',
                esc_html__('Google Map Link', 'event_espresso')
            ),
            new GraphQLField(
                'enableForGmap',
                'String',
                'enable_for_gmap',
                esc_html__('Show Google Map?', 'event_espresso')
            ),
        ];
    }


    /**
     * Extends the existing WP GraphQL mutations.
     *
     * @since $VID:$
     */
    public function extendMutations()
    {
        add_action(
            'graphql_post_object_mutation_update_additional_data',
            VenueUpdate::mutateFields($this->model, $this),
            10,
            6
        );
    }
}
