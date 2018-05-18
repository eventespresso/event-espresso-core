<?php

namespace EventEspresso\tests\testcases\core\domain\services\custom_post_types;

defined('EVENT_ESPRESSO_VERSION') || exit;

use EE_Dependency_Map;
use EE_Error;
use EE_UnitTestCase;
use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\domain\services\custom_post_types\RegisterCustomTaxonomiesMock;
use InvalidArgumentException;

/**
 * Class RegisterCustomTaxonomiesTest
 *
 * @group CustomPostTypes
 * @package EventEspresso\tests\testcases\core\domain\services\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class RegisterCustomTaxonomiesTest extends EE_UnitTestCase
{

    /**
     * @var CustomTaxonomyDefinitions $custom_taxonomies
     */
    public $custom_taxonomies;

    /**
     * @var RegisterCustomTaxonomiesMock $register_custom_taxonomies
     */
    public $register_custom_taxonomies;


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
        $this->custom_taxonomies          = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions'
        );
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\tests\mocks\core\domain\services\custom_post_types\RegisterCustomTaxonomiesMock',
            array(
                'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions' => EE_Dependency_Map::load_from_cache,
            )
        );
        $this->register_custom_taxonomies = LoaderFactory::getLoader()->getShared(
            'EventEspresso\tests\mocks\core\domain\services\custom_post_types\RegisterCustomTaxonomiesMock'
        );
    }


    /**
     * @since 4.9.62.p
     */
    public function testPrepareArguments()
    {
        $custom_taxonomies = $this->custom_taxonomies->getCustomTaxonomyDefinitions();
        foreach ($custom_taxonomies as $taxonomy => $tax) {
            $this->assertEquals(
                $this->getExpected($taxonomy),
                $this->register_custom_taxonomies->prepareArguments(
                    $tax['singular_name'],
                    $tax['plural_name'],
                    $tax['args']
                )
            );
        }
    }


    /**
     * @since 4.9.62.p
     * @param string $taxonomy
     * @return array|mixed
     */
    public function getExpected($taxonomy)
    {
        $custom_taxonomies = array(
            'espresso_event_categories' => array(
                'hierarchical'      => true,
                'labels'            => array(
                    'name'          => 'Event Categories',
                    'singular_name' => 'Event Category',
                ),
                'show_ui'           => true,
                'show_ee_ui'        => true,
                'show_admin_column' => true,
                'query_var'         => true,
                'show_in_nav_menus' => true,
                'map_meta_cap'      => true,
                'public'            => true,
                'show_in_rest'      => true,
                'capabilities'      => array(
                    'manage_terms' => 'ee_manage_event_categories',
                    'edit_terms'   => 'ee_edit_event_category',
                    'delete_terms' => 'ee_delete_event_category',
                    'assign_terms' => 'ee_assign_event_category',
                ),
                'rewrite'           => array(
                    'slug' => 'event-category',
                ),
            ),
            'espresso_venue_categories' => array(
                'hierarchical'      => true,
                'labels'            => array(
                    'name'          => 'Venue Categories',
                    'singular_name' => 'Venue Category',
                ),
                'show_ui'           => true,
                'show_ee_ui'        => true,
                'show_admin_column' => true,
                'query_var'         => true,
                'show_in_nav_menus' => true,
                'map_meta_cap'      => true,
                'public'            => true,
                'show_in_rest'      => true,
                'capabilities'      => array(
                    'manage_terms' => 'ee_manage_venue_categories',
                    'edit_terms'   => 'ee_edit_venue_category',
                    'delete_terms' => 'ee_delete_venue_category',
                    'assign_terms' => 'ee_assign_venue_category',
                ),
                'rewrite'           => array(
                    'slug' => 'venue-category',
                ),
            ),
            'espresso_event_type'       => array(
                'hierarchical'      => true,
                'labels'            => array(
                    'name'          => 'Event Types',
                    'singular_name' => 'Event Type',
                ),
                'show_ui'           => false,
                'show_ee_ui'        => true,
                'show_admin_column' => true,
                'query_var'         => true,
                'show_in_nav_menus' => false,
                'map_meta_cap'      => true,
                'public'            => true,
                'show_in_rest'      => true,
                'capabilities'      => array(
                    'manage_terms' => 'ee_read_event_type',
                    'edit_terms'   => 'ee_edit_event_type',
                    'delete_terms' => 'ee_delete_event_type',
                    'assign_terms' => 'ee_assign_event_type',
                ),
                'rewrite'           => array(
                    'slug' => 'event-type',
                ),
            ),
        );
        return isset($custom_taxonomies[$taxonomy]) ? $custom_taxonomies[ $taxonomy ] : array();
    }
}
// location: tests/testcases/core/domain/services/custom_post_types/RegisterCustomTaxonomiesTest.php



