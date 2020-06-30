<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql;

use EE_Error;
use EE_System;
use EE_UnitTestCase;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared\GQLRequestsMock;
use InvalidArgumentException;

/**
 * Class GraphQLUnitTestCase
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GraphQLUnitTestCase extends EE_UnitTestCase
{

    /**
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    public function setUp()
    {
        parent::setUp();
        if (PHP_VERSION_ID < 70100) {
            $this->markTestSkipped(
                'WP GraphQL compatible with PHP 7+ only'
            );
            return;
        }
        if (! class_exists('WPGraphQL')) {
            require_once EE_THIRD_PARTY . 'wp-graphql/wp-graphql.php';
        }
        do_action('after_setup_theme');
        $eeSystem = EE_System::instance();
        remove_action('init', [$eeSystem, 'set_hooks_for_core'], 1);
        remove_action('init', [$eeSystem, 'perform_activations_upgrades_and_migrations'], 3);
        remove_action('init', [$eeSystem, 'load_CPTs_and_session'], 5);
        remove_action('init', [$eeSystem, 'load_controllers'], 7);
        remove_action('init', [$eeSystem, 'core_loaded_and_ready'], 9);
        remove_action('init', [$eeSystem, 'initialize'], 10);
        remove_action('init', [$eeSystem, 'initialize_last'], 100);
        do_action('init');
        GQLRequestsMock::register();
        // load handler for EE GraphQL requests
        $graphQL_manager = LoaderFactory::getLoader()->getNew(
            'EventEspresso\core\services\graphql\GraphQLManager'
        );
        $graphQL_manager->init();
    }

    public function testDumb()
    {
        $this->assertTrue(true);
    }
}
