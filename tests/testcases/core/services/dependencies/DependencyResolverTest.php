<?php

namespace EventEspresso\tests\testcases\core\services\dependencies;

use EE_Dependency_Map;
use EventEspresso\core\exceptions\InvalidAliasException;
use EventEspresso\core\services\dependencies\ClassAlias;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\Request;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Oof;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Ouch;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Owie;
use EventEspresso\tests\mocks\core\services\dependencies\DependencyResolverMock;
use PHPUnit_Framework_TestCase;

/**
 * Class DependencyResolverTest
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class DependencyResolverTest extends PHPUnit_Framework_TestCase
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var array $request_params
     */
    private $request_params = array();

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    protected function setUp()
    {
        $this->loader = LoaderFactory::getLoader();
        $this->request_params = array(
            'oof' => 'OOF!',
            'ouch' => 'OUCH!',
            'owie' => 'OWIE!',
        );
    }

    /**
     * @since 4.9.71.p
     * @return DependencyResolverMock
     */
    public function getDependencyResolver()
    {
        return new DependencyResolverMock(
            $this->loader->getShared('EventEspresso\core\services\container\Mirror'),
            $this->loader->getShared('EventEspresso\core\services\loaders\ClassInterfaceCache'),
            $this->loader->getShared('EE_Dependency_Map')
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function testMirror()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\container\Mirror',
            $this->getDependencyResolver()->mirror()
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function testClassInterfaceCache()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\loaders\ClassInterfaceCache',
            $this->getDependencyResolver()->classCache()
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function testDependencyMap()
    {
        $this->assertInstanceOf(
            'EE_Dependency_Map',
            $this->getDependencyResolver()->dependencyMap()
        );
    }

    /**
     * @throws InvalidAliasException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testAddAlias()
    {
        $alias = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwieInterface';
        $fqcn = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie';
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addAlias(new ClassAlias($alias, $fqcn));
        /** @var ClassAlias[] $aliases */
        $aliases = $DependencyResolver->getAliases();
        $this->assertArrayHasKey($alias, $aliases);
        $this->assertInstanceOf(
            'EventEspresso\core\services\dependencies\ClassAlias',
            $aliases[ $alias ]
        );
        $this->assertEquals($fqcn, $aliases[ $alias ]->fqcn());
    }

    /**
     * @since 4.9.71.p
     * @throws InvalidAliasException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testResolveAlias()
    {
        $request_alias = 'EventEspresso\core\services\request\RequestInterface';
        $request_fqcn = 'EventEspresso\core\services\request\Request';

        $DependencyResolver = $this->getDependencyResolver();
        $this->assertFalse(EE_Dependency_Map::instance()->has($request_fqcn));
        $DependencyResolver->addAlias(new ClassAlias($request_alias, $request_fqcn));
        $this->assertEquals(
            $request_fqcn,
            $DependencyResolver->resolveAlias($request_alias)
        );
        // now add a custom alias and try to resolve it
        $alias = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwieInterface';
        $fqcn = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie';
        $DependencyResolver->addAlias(new ClassAlias($alias, $fqcn));
        $this->assertEquals(
            $fqcn,
            $DependencyResolver->resolveAlias($alias)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function testAddNamespaceRoot()
    {
        $namespace_root = 'EventEspresso\tests\mocks\core\services\dependencies\composites';
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addNamespaceRoot($namespace_root);
        $namespace_roots = $DependencyResolver->getNamespaceRoots();
        $this->assertContains($namespace_root, $namespace_roots);
        $key = array_search($namespace_root, $namespace_roots, true);
        $this->assertEquals($namespace_root, $namespace_roots[ $key ]);
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testDependencyRecursionExists()
    {
        $namespace_root = 'EventEspresso\tests\mocks\core\services\dependencies\composites';
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addNamespaceRoot($namespace_root);
        $this->assertTrue(
            $DependencyResolver->dependencyRecursionExists(
                'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie'
            )
        );
    }

    /**
     * @since 4.9.71.p
     * @return Owie
     */
    public function getBoneHurtingJuice()
    {
        $request = new Request($this->request_params, array(), array(), array());
        return new Owie(
            new Ouch(
                new Oof($request),
                $request
            ),
            $request
        );
    }

    /**
     * @since 4.9.71.p
     */
    public function testOofOuchOwie()
    {
        // confirm our nested objects work properly
        $this->assertEquals('OOF!OUCH!OWIE!', $this->getBoneHurtingJuice()->oofOuchOwie());
    }


    /**
     * @since 4.9.71.p
     * @throws InvalidAliasException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \ReflectionException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveDependenciesForClass()
    {
        $namespace_root = 'EventEspresso\tests\mocks\core\services\dependencies\composites';
        $alias = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwieInterface';
        $fqcn = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie';
        $this->assertFalse(EE_Dependency_Map::instance()->has($fqcn));
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addNamespaceRoot($namespace_root);
        $DependencyResolver->addAlias(new ClassAlias($alias, $fqcn));
        $DependencyResolver->resolveDependenciesForClass($fqcn);
        $this->assertTrue(EE_Dependency_Map::instance()->has($fqcn));
    }

}

// location: /tests/testcases/core/services/dependencies/DependencyResolverTest.php