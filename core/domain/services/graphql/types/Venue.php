<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EE_Error;
use EE_Venue;
use EEM_Venue;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\domain\services\graphql\mutators\VenueUpdate;
use GraphQL\Type\Definition\ResolveInfo;
use ReflectionException;
use WPGraphQL\AppContext;

/**
 * Class Venue
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   5.0.0.p
 * @property EEM_Venue $model
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
        $this->setName($this->namespace . 'Venue');
        $this->setIsCustomPostType(true);
        parent::__construct($venue_model);
    }


    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array
    {
        $fields = [
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
            new GraphQLOutputField(
                'stateName',
                'String',
                'state_name',
                esc_html__('Venue state name', 'event_espresso')
            ),
            new GraphQLOutputField(
                'stateAbbrev',
                'String',
                'state_abbrev',
                esc_html__('Venue state abbreviation', 'event_espresso')
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
            new GraphQLOutputField(
                'countryName',
                'String',
                'country_name',
                esc_html__('Venue country name', 'event_espresso')
            ),
            new GraphQLOutputField(
                'countryISO',
                'String',
                'country_ID',
                esc_html__('Venue Country ISO Code', 'event_espresso')
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
            new GraphQLOutputField(
                'thumbnail',
                'String',
                'thumbnail',
                esc_html__('Venue Thumbnail', 'event_espresso'),
                null,
                [$this, 'getThumbnail']
            ),
        ];

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_types__venue_fields',
            $fields,
            $this->name,
            $this->model
        );
    }


    /**
     * Extends the existing WP GraphQL mutations.
     *
     * @return void
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


    /**
     * @param EE_Venue    $venue
     * @param array       $args
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getThumbnail(EE_Venue $venue, array $args, AppContext $context, ResolveInfo $info): string
    {
        return wp_get_attachment_url(get_post_thumbnail_id($venue->ID()));
    }
}
