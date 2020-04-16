<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql;

use EE_Error;
use EE_UnitTestCase;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
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
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    public function setUp()
    {
        parent::setUp();
        if (! class_exists('WPGraphQL')) {
            require_once EE_THIRD_PARTY . 'wp-graphql/wp-graphql.php';
        }
        // load handler for EE GraphQL requests
        $graphQL_manager = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\graphql\GraphQLManager'
        );
        $graphQL_manager->init();

    }

}