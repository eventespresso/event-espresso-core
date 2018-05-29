<?php

namespace EventEspresso\tests\testcases\core\domain\services\custom_post_types;

use EE_Dependency_Map;
use EE_Error;
use EE_UnitTestCase;
use EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\domain\services\custom_post_types\RegisterCustomPostTypesMock;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RegisterCustomPostTypesTest
 *
 * @group CustomPostTypes
 * @package EventEspresso\tests\testcases\core\domain\services\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class RegisterCustomPostTypesTest extends EE_UnitTestCase
{

    /**
     * @var CustomPostTypeDefinitions $custom_post_types
     */
    public $custom_post_types;

    /**
     * @var RegisterCustomPostTypesMock $register_custom_post_types
     */
    public $register_custom_post_types;


    /**
     * @since 4.9.62.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function setUp()
    {
        parent::setUp();
        $this->custom_post_types = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'
        );
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\tests\mocks\core\domain\services\custom_post_types\RegisterCustomPostTypesMock',
            array(
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions' => EE_Dependency_Map::load_from_cache,
            )
        );
        $this->register_custom_post_types = LoaderFactory::getLoader()->getShared(
            'EventEspresso\tests\mocks\core\domain\services\custom_post_types\RegisterCustomPostTypesMock'
        );
    }


    /**
     * @since 4.9.62.p
     */
    public function testPrepareArguments()
    {
        $custom_post_types = $this->custom_post_types->getDefinitions();
        foreach ($custom_post_types as $custom_post_type => $CPT) {
            $this->assertEquals(
                $this->getExpected($custom_post_type),
                $this->register_custom_post_types->prepareArguments(
                    $custom_post_type,
                    $CPT['singular_name'],
                    $CPT['plural_name'],
                    $CPT['singular_slug'],
                    $CPT['plural_slug'],
                    $CPT['args']
                ),
                "The prepared arguments for {$custom_post_type} do not match what is expected."
            );
        }
    }


    /**
     * @since 4.9.62.p
     * @param string $custom_post_type
     * @return array|mixed
     */
    public function getExpected($custom_post_type)
    {
        $custom_post_types = array(
            'espresso_events'    => array(
                'labels'             => array(
                    'name'               => 'Events',
                    'singular_name'      => 'Event',
                    'singular_slug'      => 'event',
                    'plural_slug'        => 'events',
                    'add_new'            => 'Add Event',
                    'add_new_item'       => 'Add New Event',
                    'edit_item'          => 'Edit Event',
                    'new_item'           => 'New Event',
                    'all_items'          => 'All Events',
                    'view_item'          => 'View Event',
                    'search_items'       => 'Search Events',
                    'not_found'          => 'No Events found',
                    'not_found_in_trash' => 'No Events found in Trash',
                    'parent_item_colon'  => '',
                    'menu_name'          => 'Events',
                ),
                'public'             => true,
                'publicly_queryable' => true,
                'show_ui'            => false,
                'show_ee_ui'         => true,
                'show_in_menu'       => false,
                'show_in_nav_menus'  => true,
                'query_var'          => true,
                'rewrite'            => array(
                    'slug' => 'events',
                ),
                'capability_type'    => 'event',
                'map_meta_cap'       => true,
                'has_archive'        => true,
                'hierarchical'       => false,
                'menu_position'      =>
                    null,
                'supports'           => array(
                    0 => 'title',
                    1 => 'editor',
                    2 => 'author',
                    3 => 'thumbnail',
                    4 => 'excerpt',
                    5 => 'custom-fields',
                    6 => 'comments',
                ),
                'capabilities'       => array(
                    'edit_post'              => 'ee_edit_event',
                    'read_post'              => 'ee_read_event',
                    'delete_post'            => 'ee_delete_event',
                    'edit_posts'             => 'ee_edit_events',
                    'edit_others_posts'      => 'ee_edit_others_events',
                    'publish_posts'          => 'ee_publish_events',
                    'read_private_posts'     => 'ee_read_private_events',
                    'delete_posts'           => 'ee_delete_events',
                    'delete_private_posts'   => 'ee_delete_private_events',
                    'delete_published_posts' => 'ee_delete_published_events',
                    'delete_others_posts'    => 'ee_delete_others_events',
                    'edit_private_posts'     => 'ee_edit_private_events',
                    'edit_published_posts'   => 'ee_edit_published_events',
                ),
                'taxonomies'         => array(
                    0 => 'espresso_event_categories',
                    1 => 'espresso_event_type',
                    2 => 'post_tag',
                ),
                'page_templates'     => true,
            ),
            'espresso_venues'    => array(
                'labels'             => array(
                    'name'               => 'Venues',
                    'singular_name'      => 'Venue',
                    'singular_slug'      => 'venue',
                    'plural_slug'        => 'venues',
                    'add_new'            => 'Add Venue',
                    'add_new_item'       => 'Add New Venue',
                    'edit_item'          => 'Edit Venue',
                    'new_item'           => 'New Venue',
                    'all_items'          => 'All Venues',
                    'view_item'          => 'View Venue',
                    'search_items'       => 'Search Venues',
                    'not_found'          => 'No Venues found',
                    'not_found_in_trash' => 'No Venues found in Trash',
                    'parent_item_colon'  => '',
                    'menu_name'          => 'Venues',
                ),
                'public'             => true,
                'publicly_queryable' => true,
                'show_ui'            => false,
                'show_ee_ui'         => true,
                'show_in_menu'       => false,
                'show_in_nav_menus'  => true,
                'query_var'          => true,
                'rewrite'            => array(
                    'slug' => 'venues',
                ),
                'capability_type'    => 'venue',
                'map_meta_cap'       => true,
                'has_archive'        => true,
                'hierarchical'       => false,
                'menu_position'      =>
                    null,
                'supports'           => array(
                    0 => 'title',
                    1 => 'editor',
                    2 => 'author',
                    3 => 'thumbnail',
                    4 => 'excerpt',
                    5 => 'custom-fields',
                    6 => 'comments',
                ),
                'capabilities'       => array(
                    'edit_post'              => 'ee_edit_venue',
                    'read_post'              => 'ee_read_venue',
                    'delete_post'            => 'ee_delete_venue',
                    'edit_posts'             => 'ee_edit_venues',
                    'edit_others_posts'      => 'ee_edit_others_venues',
                    'publish_posts'          => 'ee_publish_venues',
                    'read_private_posts'     => 'ee_read_private_venues',
                    'delete_posts'           => 'ee_delete_venues',
                    'delete_private_posts'   => 'ee_delete_private_venues',
                    'delete_published_posts' => 'ee_delete_published_venues',
                    'delete_others_posts'    => 'ee_edit_others_venues',
                    'edit_private_posts'     => 'ee_edit_private_venues',
                    'edit_published_posts'   => 'ee_edit_published_venues',
                ),
                'taxonomies'         => array(
                    0 => 'espresso_venue_categories',
                    1 => 'post_tag',
                ),
                'page_templates'     => true,
            ),
            'espresso_attendees' => array(
                'labels'             => array(
                    'name'               => 'Contacts',
                    'singular_name'      => 'Contact',
                    'singular_slug'      => 'contact',
                    'plural_slug'        => 'contacts',
                    'add_new'            => 'Add Contact',
                    'add_new_item'       => 'Add New Contact',
                    'edit_item'          => 'Edit Contact',
                    'new_item'           => 'New Contact',
                    'all_items'          => 'All Contacts',
                    'view_item'          => 'View Contact',
                    'search_items'       => 'Search Contacts',
                    'not_found'          => 'No Contacts found',
                    'not_found_in_trash' => 'No Contacts found in Trash',
                    'parent_item_colon'  => '',
                    'menu_name'          => 'Contacts',
                ),
                'public'             => false,
                'publicly_queryable' => false,
                'show_ui'            => false,
                'show_ee_ui'         => true,
                'show_in_menu'       => false,
                'show_in_nav_menus'  => false,
                'query_var'          => true,
                'rewrite'            => array(
                    'slug' => 'contacts',
                ),
                'capability_type'    => 'contact',
                'map_meta_cap'       => true,
                'has_archive'        => false,
                'hierarchical'       => false,
                'menu_position'      =>
                    null,
                'supports'           => array(
                    0 => 'editor',
                    1 => 'thumbnail',
                    2 => 'excerpt',
                    3 => 'custom-fields',
                    4 => 'comments',
                ),
                'taxonomies'         => array(
                    0 => 'post_tag',
                ),
                'capabilities'       => array(
                    'edit_post'              => 'ee_edit_contact',
                    'read_post'              => 'ee_read_contact',
                    'delete_post'            => 'ee_delete_contact',
                    'edit_posts'             => 'ee_edit_contacts',
                    'edit_others_posts'      => 'ee_edit_contacts',
                    'publish_posts'          => 'ee_edit_contacts',
                    'read_private_posts'     => 'ee_edit_contacts',
                    'delete_posts'           => 'ee_delete_contacts',
                    'delete_private_posts'   => 'ee_delete_contacts',
                    'delete_published_posts' => 'ee_delete_contacts',
                    'delete_others_posts'    => 'ee_delete_contacts',
                    'edit_private_posts'     => 'ee_edit_contacts',
                    'edit_published_posts'   => 'ee_edit_contacts',
                ),
            ),
        );
        return isset($custom_post_types[ $custom_post_type ]) ? $custom_post_types[ $custom_post_type ] : array();
    }
}
// location: tests/testcases/core/domain/services/custom_post_types/RegisterCustomPostTypesTest.php