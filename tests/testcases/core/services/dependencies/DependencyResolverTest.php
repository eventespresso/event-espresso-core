<?php

namespace EventEspresso\tests\testcases\core\services\dependencies;

use EE_Dependency_Map;
use EventEspresso\core\exceptions\InvalidAliasException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\dependencies\ClassAlias;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestParams;
use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\core\services\request\sanitizers\ServerSanitizer;
use EventEspresso\core\services\request\ServerParams;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Oof;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Ouch;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Owie;
use EventEspresso\tests\mocks\core\services\dependencies\DependencyResolverMock;
use InvalidArgumentException;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\Exception;
use PHPUnit\Framework\TestCase;
use ReflectionException;

/**
 * Class DependencyResolverTest
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class DependencyResolverTest extends TestCase
{
    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var array $request_params
     */
    private $request_params = [];


    /**
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since 4.9.71.p
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->loader         = LoaderFactory::getLoader();
        $this->request_params = [
            'oof'  => 'OOF!',
            'ouch' => 'OUCH!',
            'owie' => 'OWIE!',
        ];
    }


    /**
     * @return DependencyResolverMock
     * @since 4.9.71.p
     */
    public function getDependencyResolver(): DependencyResolverMock
    {
        return new DependencyResolverMock(
            $this->loader->getShared('EventEspresso\core\services\container\Mirror'),
            $this->loader->getShared('EventEspresso\core\services\loaders\ClassInterfaceCache'),
            $this->loader->getShared('EE_Dependency_Map')
        );
    }


    /**
     * @throws Exception
     * @since 4.9.71.p
     */
    public function testMirror()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\container\Mirror',
            $this->getDependencyResolver()->mirror()
        );
    }


    /**
     * @throws Exception
     * @since 4.9.71.p
     */
    public function testClassInterfaceCache()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\loaders\ClassInterfaceCache',
            $this->getDependencyResolver()->classCache()
        );
    }


    /**
     * @throws Exception
     * @since 4.9.71.p
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
     * @throws Exception
     */
    public function testAddAlias()
    {
        $alias              = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwieInterface';
        $fqcn               = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie';
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addAlias(new ClassAlias($alias, $fqcn));
        $aliases = $DependencyResolver->getAliases();
        $this->assertArrayHasKey($alias, $aliases);
        $this->assertInstanceOf(
            'EventEspresso\core\services\dependencies\ClassAlias',
            $aliases[ $alias ]
        );
        $this->assertEquals($fqcn, $aliases[ $alias ]->fqcn());
    }


    /**
     * @throws InvalidAliasException
     * @throws AssertionFailedError
     * @since 4.9.71.p
     */
    public function testResolveAlias()
    {
        $request_alias = 'EventEspresso\core\services\request\RequestInterface';
        $request_fqcn  = 'EventEspresso\core\services\request\Request';

        $DependencyResolver = $this->getDependencyResolver();
        $this->assertFalse(EE_Dependency_Map::instance()->has($request_fqcn));
        $DependencyResolver->addAlias(new ClassAlias($request_alias, $request_fqcn));
        $this->assertEquals(
            $request_fqcn,
            $DependencyResolver->resolveAlias($request_alias)
        );
        // now add a custom alias and try to resolve it
        $alias = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwieInterface';
        $fqcn  = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie';
        $DependencyResolver->addAlias(new ClassAlias($alias, $fqcn));
        $this->assertEquals(
            $fqcn,
            $DependencyResolver->resolveAlias($alias)
        );
    }


    /**
     * @throws Exception
     * @since 4.9.71.p
     */
    public function testAddNamespaceRoot()
    {
        $namespace_root     = 'EventEspresso\tests\mocks\core\services\dependencies\composites';
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addNamespaceRoot($namespace_root);
        $namespace_roots = $DependencyResolver->getNamespaceRoots();
        $this->assertContains($namespace_root, $namespace_roots);
        $key = array_search($namespace_root, $namespace_roots, true);
        $this->assertEquals($namespace_root, $namespace_roots[ $key ]);
    }


    /**
     * @throws AssertionFailedError
     * @since 4.9.71.p
     */
    public function testDependencyRecursionExists()
    {
        $namespace_root     = 'EventEspresso\tests\mocks\core\services\dependencies\composites';
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addNamespaceRoot($namespace_root);
        $this->assertTrue(
            $DependencyResolver->dependencyRecursionExists(
                'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie'
            )
        );
    }


    /**
     * @return Owie
     * @since 4.9.71.p
     */
    public function getBoneHurtingJuice(): Owie
    {
        $request_params = new RequestParams(new RequestSanitizer(), $this->request_params);
        $server_params  = new ServerParams(new ServerSanitizer());
        $request        = new Request($request_params, $server_params);
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
     * @throws InvalidAliasException
     * @throws InvalidDataTypeException
     * @throws AssertionFailedError
     * @throws ReflectionException
     * @throws Exception
     * @since 4.9.71.p
     */
    public function testResolveDependenciesForClass()
    {
        $namespace_root = 'EventEspresso\tests\mocks\core\services\dependencies\composites';
        $alias          = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwieInterface';
        $fqcn           = 'EventEspresso\tests\mocks\core\services\dependencies\composites\OofOuchOwie';
        $this->assertFalse(EE_Dependency_Map::instance()->has($fqcn));
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->addNamespaceRoot($namespace_root);
        $DependencyResolver->addAlias(new ClassAlias($alias, $fqcn));
        $DependencyResolver->resolveDependenciesForClass($fqcn);
        $this->assertTrue(EE_Dependency_Map::instance()->has($fqcn));
    }

}

// location: /tests/testcases/core/services/dependencies/DependencyResolverTest.php
