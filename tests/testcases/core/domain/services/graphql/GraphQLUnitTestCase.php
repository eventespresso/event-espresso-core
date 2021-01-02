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
            $this->markTestSkipped('WP GraphQL compatible with PHP 7+ only');
            return;
        }
    }
}
