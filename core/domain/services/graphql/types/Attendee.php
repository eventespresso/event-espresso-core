<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Attendee;
use EE_Attendee;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Class Attendee
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Attendee extends TypeBase
{

    /**
     * Attendee constructor.
     *
     * @param EEM_Attendee $attendee_model
     */
    public function __construct(EEM_Attendee $attendee_model)
    {
        $this->model = $attendee_model;
        $this->setName($this->namespace . 'Attendee');
        $this->setIsCustomPostType(false); // Set to false to use our model queries
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                ['non_null' => 'ID'],
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'dbId',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('The attendee ID.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'cacheId',
                ['non_null' => 'String'],
                null,
                esc_html__('The cache ID of the object.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'address',
                'String',
                'address',
                esc_html__('Address Part 1', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'avatar',
                'String',
                null,
                esc_html__('Address Part 1', 'event_espresso'),
                null,
                [$this, 'getAvatar'],
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'address2',
                'String',
                'address2',
                esc_html__('Address Part 2', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'bio',
                'String',
                'bio',
                esc_html__('Attendee Biography', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'city',
                'String',
                'city',
                esc_html__('City', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'country',
                $this->namespace . 'Country',
                null,
                esc_html__('Country', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'email',
                'String',
                'email',
                esc_html__('Email Address', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'firstName',
                'String',
                'fname',
                esc_html__('Attendee First Name', 'event_espresso')
            ),
            new GraphQLOutputField(
                'fullName',
                'String',
                'full_name',
                esc_html__('Attendee Name', 'event_espresso')
            ),
            new GraphQLOutputField(
                'lastName',
                'String',
                'lname',
                esc_html__('Attendee Last Name', 'event_espresso')
            ),
            new GraphQLOutputField(
                'phone',
                'String',
                'phone',
                esc_html__('Phone', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'shortBio',
                'String',
                'short_bio',
                esc_html__('Attendee Short Biography', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'state',
                $this->namespace . 'State',
                null,
                esc_html__('State', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
            new GraphQLOutputField(
                'zip',
                'String',
                'zip',
                esc_html__('ZIP/Postal Code', 'event_espresso'),
                null,
                null,
                ['ee_edit_contacts']
            ),
        ];
    }


    /**
     * @param EE_Attendee   $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @since $VID:$
     */
    public function getAvatar(EE_Attendee $source, array $args, AppContext $context, ResolveInfo $info)
    {
        $email = $source->email();

        if (empty($email)) {
            return get_avatar_url('', array('force_default' => true));
        }
        $avatar = get_avatar_url($email);
        return $avatar ? $avatar : null;
    }
}
