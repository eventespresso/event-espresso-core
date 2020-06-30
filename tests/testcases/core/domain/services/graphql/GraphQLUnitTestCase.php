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
use WPGraphQL;
use WPGraphQL\Data\Config;
use WPGraphQL\Router;

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

        new Config();
        new Router();
        $wp_gql = WPGraphQL::instance();
        do_action('graphql_init', $wp_gql);
        $wp_gql->setup_types();

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
