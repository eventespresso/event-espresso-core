<?php

namespace EventEspresso\tests\testcases\core\services\dependencies;

use EventEspresso\core\services\dependencies\ClassAlias;
use PHPUnit_Framework_TestCase;

/**
 * Class ClassAliasTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\dependencies
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ClassAliasTest extends PHPUnit_Framework_TestCase
{

    /**
     * @var string $alias
     */
    private $alias = 'EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface';

    /**
     * @var string $fqcn
     */
    private $fqcn = 'EventEspresso\core\domain\entities\route_match\RouteMatchSpecification';

    /**
     * @param $alias
     * @param $fqcn
     * @since $VID:$
     * @return ClassAlias
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    private function getClassAlias($alias, $fqcn)
    {
        return new ClassAlias($alias, $fqcn);
    }

    /**
     * @since $VID:$
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\dependencies\ClassAlias',
            $this->getClassAlias($this->alias, $this->fqcn)
        );
    }

    /**
     * @since $VID:$
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__constructWithBadParameters()
    {
        $exception = 'EventEspresso\core\exceptions\InvalidAliasException';
        if (method_exists($this, 'expectException')) {
            $this->expectException($exception);
        } elseif (method_exists($this, 'setExpectedException')) {
            $this->setExpectedException($exception);
        }
        $this->assertInstanceOf(
            'EventEspresso\core\services\dependencies\ClassAlias',
            $this->getClassAlias($this->fqcn, $this->alias)
        );
    }

    /**
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    public function testAlias()
    {
        $class_alias = $this->getClassAlias($this->alias, $this->fqcn);
        $this->assertEquals($this->alias, $class_alias->alias());
    }

    /**
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    public function testFqcn()
    {
        $class_alias = $this->getClassAlias($this->alias, $this->fqcn);
        $this->assertEquals($this->fqcn, $class_alias->fqcn());
    }
}

// location: /testcases/core/services/dependencies/ClassAliasTest.php