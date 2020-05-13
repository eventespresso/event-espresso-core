<?php

namespace EventEspresso\tests\testcases\core\services\dependencies;

use EventEspresso\core\services\dependencies\ClassAlias;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

/**
 * Class ClassAliasTest
 *
 * @package EventEspresso\tests\testcases\core\services\dependencies
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class ClassAliasTest extends EspressoPHPUnitFrameworkTestCase
{

    /**
     * @var string $interface
     */
    private $interface = 'EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface';

    /**
     * @var string $base_class
     */
    private $base_class = 'EventEspresso\core\domain\entities\route_match\RouteMatchSpecification';

    /**
     * @var string $child_class_fqcn
     */
    private $child_class_fqcn = 'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorAddNew';

    /**
     * @param $alias
     * @param $fqcn
     * @since 4.9.71.p
     * @return ClassAlias
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    private function getClassAlias($alias, $fqcn)
    {
        return new ClassAlias($alias, $fqcn);
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\dependencies\ClassAlias',
            $this->getClassAlias($this->interface, $this->base_class)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__constructWithBadParameters()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidAliasException');
        $this->getClassAlias($this->base_class, $this->interface);
    }

    /**
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    public function testAlias()
    {
        $class_alias = $this->getClassAlias($this->interface, $this->base_class);
        $this->assertEquals($this->interface, $class_alias->alias());
    }

    /**
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    public function testFqcn()
    {
        $class_alias = $this->getClassAlias($this->interface, $this->base_class);
        $this->assertEquals($this->base_class, $class_alias->fqcn());
    }

    /**
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     */
    public function testChildFqcn()
    {
        $class_alias = $this->getClassAlias($this->base_class, $this->child_class_fqcn);
        $this->assertEquals($this->child_class_fqcn, $class_alias->fqcn());
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidAliasException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__constructWithNonSubClass()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidAliasException');
        $this->getClassAlias(
            $this->child_class_fqcn,
            'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit'
        );
    }
}
// location: /testcases/core/services/dependencies/ClassAliasTest.php
