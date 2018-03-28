<?php
use EventEspresso\core\services\container\CoffeeShop;
use EventEspresso\core\services\container\DependencyInjector;
use EventEspresso\core\services\container\Recipe;
use EventEspresso\core\services\container\CoffeeMaker;
use EventEspresso\core\services\container\NewCoffeeMaker;
use EventEspresso\core\services\container\SharedCoffeeMaker;
use EventEspresso\core\services\container\LoadOnlyCoffeeMaker;
use EventEspresso\tests\mocks\core\services\container\Coffee;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CoffeeShopTest
 * Description
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @group   CoffeeShop
 */
class CoffeeShopTest extends EE_UnitTestCase
{

    /**
     * @var CoffeeShop $CoffeeShop
     */
    private $CoffeeShop;

    /**
     * @var DependencyInjector $DependencyInjector
     */
    private $DependencyInjector;



    /**
     * setUp
     */
    public function setUp()
    {
    	parent::setUp();
        $this->markTestSkipped('CoffeeShop DI not implemented yet.');
        // instantiate the container
        $this->CoffeeShop = new CoffeeShop();
        // create a dependency injector class for resolving class constructor arguments
        $this->DependencyInjector = new DependencyInjector(
            $this->CoffeeShop,
            new \EEH_Array()
        );
        // and some coffeemakers, one for creating new instances
        $this->CoffeeShop->addCoffeeMaker(
            new NewCoffeeMaker($this->CoffeeShop, $this->DependencyInjector),
            CoffeeMaker::BREW_NEW
        );
        // and one for shared services
        $this->CoffeeShop->addCoffeeMaker(
            new SharedCoffeeMaker($this->CoffeeShop, $this->DependencyInjector),
            CoffeeMaker::BREW_SHARED
        );
    }



    public function addDefaultRecipes()
    {
        $this->CoffeeShop->addRecipe(new Recipe(Recipe::DEFAULT_ID));
    }



    public function addRecipeForRequest()
    {
        $this->CoffeeShop->addRecipe(
            new Recipe(
                'EE_Request',
                'EE_Request',
                array(),
                array(
                    'get'=> array(),
                    'post' => array(),
                    'cookie' => array(),
                    'server' => array()
                ),
                CoffeeMaker::BREW_SHARED,
                array(EE_CORE . 'request_stack/EE_Request.core.php')
            )
        );
        // add recipe for Request, since we're going to need it
        $this->CoffeeShop->brew(
            'EventEspresso\core\services\request\Request',
            array($_GET, $_POST, $_COOKIE, $_SERVER),
            CoffeeMaker::BREW_SHARED
        );
        $this->CoffeeShop->addAliases(
            'EventEspresso\core\services\request\Request',
            array('Request', 'EventEspresso\core\services\request\RequestInterface')
        );
        /** @var EventEspresso\core\services\request\Request $request */
        $request = $this->CoffeeShop->brew('Request');
        /** @var \EE_Request $legacy_request */
        $legacy_request = $this->CoffeeShop->brew('EE_Request');
        $legacy_request->setRequest($request);
    }



    public function test_addCoffeeMaker()
    {
        try {
            // and CoffeeMaker for classes that do not require instantiation
            $added = $this->CoffeeShop->addCoffeeMaker(
                new LoadOnlyCoffeeMaker($this->CoffeeShop, $this->DependencyInjector),
                CoffeeMaker::BREW_LOAD_ONLY
            );
            $this->assertTrue($added);
        } catch (Exception $e) {
            $this->fail(
                sprintf(
                    'CoffeeShop::addCoffeeMaker() should Not have thrown the following Exception: %1$s'
                )
            );
        }
    }



    public function test_addClosure()
    {
        try {
            $closure = function () {
                return 'I AM CLOSURE';
            };
            $added = $this->CoffeeShop->addClosure('i-am-closure', $closure);
            $this->assertInstanceOf('Closure', $added);
        } catch (Exception $e) {
            $this->fail(
                sprintf(
                    'CoffeeShop::addClosure() should Not have thrown the following Exception: %1$s',
                    $e->getMessage()
                )
            );
        }
    }



    public function test_addService()
    {
        try {
            $added = $this->CoffeeShop->addService('i-am-stdClass', new stdClass());
            $this->assertTrue($added);
        } catch (Exception $e) {
            $this->fail(
                sprintf(
                    'CoffeeShop::addService() should Not have thrown the following Exception: %1$s',
                    $e->getMessage()
                )
            );
        }
    }



    public function test_addRecipe()
    {
        try {
            // add default recipe, which should handle loading for most PSR-4 compatible classes
            // as long as they are not type hinting for interfaces
            $this->assertTrue(
                $this->CoffeeShop->addRecipe(new Recipe(Recipe::DEFAULT_ID))
            );
        } catch (Exception $e) {
            $this->fail(
                sprintf(
                    'CoffeeShop::addCoffeeMaker() should Not have thrown the following Exception: %1$s',
                    $e->getMessage()
                )
            );
        }
    }



    public function test_getRecipe()
    {
        $this->addDefaultRecipes();
        try {
            $recipe = $this->CoffeeShop->getRecipe(Recipe::DEFAULT_ID);
            $this->assertInstanceOf('EventEspresso\core\services\container\RecipeInterface', $recipe);
            $this->assertEquals(Recipe::DEFAULT_ID, $recipe->identifier());
            $this->assertEquals(CoffeeMaker::BREW_NEW, $recipe->type());
        } catch (Exception $e) {
            $this->fail(
                sprintf(
                    'CoffeeShop::getRecipe() should Not have thrown the following Exception: %1$s',
                    $e->getMessage()
                )
            );
        }
    }



    public function test_addAliases()
    {
        try {
            $this->CoffeeShop->addAliases('EE_Class_For_Testing_Loading', array('Testing_Loading'));
        } catch (Exception $e) {
            $this->fail(
                sprintf(
                    'CoffeeShop::addAliases() should Not have thrown the following Exception: %1$s',
                    $e->getMessage()
                )
            );
        }
    }



    public function test_has()
    {
        $this->assertFalse($this->CoffeeShop->has('EE_Class_For_Testing_Loading'));
    }



    public function test_get()
    {
        $this->addDefaultRecipes();
        try {
            // attempt to get class that should NOT have a valid Recipe yet
            $this->CoffeeShop->get('EE_Class_For_Testing_Loading');
            $this->fail('CoffeeShop::get() should have thrown an Exception');
        } catch (Exception $e) {
            $this->assertInstanceOf('Exception', $e);
        }
    }



    public function test_brew_new()
    {
        $this->addDefaultRecipes();
        try {
            // attempt to get class that should NOT have a valid Recipe yet
            $this->CoffeeShop->get('EE_Class_For_Testing_Loading');
            $this->fail('CoffeeShop::get() should have thrown an Exception');
        } catch (Exception $e) {
            $this->assertInstanceOf('Exception', $e);
        }
        // add recipe for our mock class
        $added = $this->CoffeeShop->addRecipe(
            new Recipe(
                'EE_Class_For_Testing_Loading',
                'EE_Class_For_Testing_Loading',
                array(),
                array(),
                CoffeeMaker::BREW_NEW,
                array(
                    EE_TESTS_DIR . 'mocks/core/EE_Class_For_Testing_Loading.core.php',
                )
            )
        );
        $this->assertTrue($added);
        // attempt to brew class
        $mock1 = $this->CoffeeShop->brew('EE_Class_For_Testing_Loading');
        $this->assertInstanceOf('EE_Class_For_Testing_Loading', $mock1);
        // and another one which should be a NEW instance
        $mock2 = $this->CoffeeShop->brew('EE_Class_For_Testing_Loading');
        $this->assertInstanceOf('EE_Class_For_Testing_Loading', $mock2);
        $this->assertFalse($mock1 === $mock2);
    }



    public function test_brew_shared()
    {
        $this->addDefaultRecipes();
        try {
            // attempt to get class that should NOT have a valid Recipe yet
            $this->CoffeeShop->get('EE_Class_For_Testing_Loading');
            $this->fail('CoffeeShop::get() should have thrown an Exception');
        } catch (Exception $e) {
            $this->assertInstanceOf('Exception', $e);
        }
        // add recipe for our mock class
        $added = $this->CoffeeShop->addRecipe(
            new Recipe(
                'EE_Class_For_Testing_Loading',
                'EE_Class_For_Testing_Loading',
                array(),
                array(),
                CoffeeMaker::BREW_SHARED,
                array(
                    EE_TESTS_DIR . 'mocks/core/EE_Class_For_Testing_Loading.core.php',
                )
            )
        );
        $this->assertTrue($added);
        // attempt to brew class
        $mock1 = $this->CoffeeShop->brew('EE_Class_For_Testing_Loading');
        $this->assertInstanceOf('EE_Class_For_Testing_Loading', $mock1);
        // and another one which should be the SAME instance
        $mock2 = $this->CoffeeShop->brew('EE_Class_For_Testing_Loading');
        $this->assertInstanceOf('EE_Class_For_Testing_Loading', $mock2);
        $this->assertTrue($mock1 === $mock2);
    }



    public function test_brew_new_with_wildcard_recipe()
    {
        $this->addDefaultRecipes();
        try {
            // attempt to get class that should NOT have a valid Recipe yet
            $this->CoffeeShop->get('EE_Taxes');
            $this->fail('CoffeeShop::get() should have thrown an Exception');
        } catch (Exception $e) {
            $this->assertInstanceOf('Exception', $e);
        }
        // now add recipe for loading our entities as shared services (singletons)
        $added = $this->CoffeeShop->addRecipe(
            new Recipe(
                'EE_*',
                '',
                array(),
                array(),
                CoffeeMaker::BREW_NEW,
                array(EE_CLASSES . '*.class.php')
            )
        );
        $this->assertTrue($added);
        // attempt to brew EE_Taxes class since it is not coupled to EE_Base_Class
        $object_1 = $this->CoffeeShop->brew('EE_Taxes', array());
        $this->assertInstanceOf('EE_Taxes', $object_1);
        // and another one which should be the SAME instance
        $object_2 = $this->CoffeeShop->brew('EE_Taxes', array());
        $this->assertInstanceOf('EE_Taxes', $object_2);
        $this->assertFalse($object_1 === $object_2);
    }



    public function test_brew_shared_with_wildcard_recipe()
    {
        $this->addDefaultRecipes();
        try {
            // attempt to get class that should NOT have a valid Recipe yet
            $this->CoffeeShop->get('EE_Taxes');
            $this->fail('CoffeeShop::get() should have thrown an Exception');
        } catch (Exception $e) {
            $this->assertInstanceOf('Exception', $e);
        }
        // now add recipe for loading our entities as shared services (singletons)
        $added = $this->CoffeeShop->addRecipe(
            new Recipe(
                'EE_*',
                '',
                array(),
                array(),
                CoffeeMaker::BREW_SHARED,
                array(EE_CLASSES . '*.class.php')
            )
        );
        $this->assertTrue($added);
        // attempt to brew EE_Taxes class since it is not coupled to EE_Base_Class
        $object_1 = $this->CoffeeShop->brew('EE_Taxes', array());
        $this->assertInstanceOf('EE_Taxes', $object_1);
        // and another one which should be the SAME instance
        $object_2 = $this->CoffeeShop->brew('EE_Taxes', array());
        $this->assertInstanceOf('EE_Taxes', $object_2);
        $this->assertTrue($object_1 === $object_2);
    }



    /**
     * @group CoffeeShopTestRequest
     * @throws OutOfBoundsException
     * @throws \EventEspresso\core\exceptions\InvalidClassException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
     * @throws \EventEspresso\core\services\container\exceptions\InstantiationException
     * @throws \EventEspresso\core\services\container\exceptions\ServiceExistsException
     * @throws \EventEspresso\core\services\container\exceptions\ServiceNotFoundException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_brew_with_injected_dependency()
    {
        $this->addDefaultRecipes();
        $this->addRecipeForRequest();
        try {
            // attempt to get class that should NOT have a valid Recipe yet
            $this->CoffeeShop->get('EE_Session_Mock');
            $this->fail('CoffeeShop::get() should have thrown an Exception');
        } catch (Exception $e) {
            $this->assertInstanceOf('Exception', $e);
        }
        // add default recipe for our mock classes
        $added = $this->CoffeeShop->addRecipe(
            new Recipe(
                'EE_*',
                '',
                array(),
                array(),
                CoffeeMaker::BREW_SHARED,
                array(
                    EE_TESTS_DIR . 'mocks/core/*.core.php',
                )
            )
        );
        $this->assertTrue($added);
        // attempt to brew EE_Session_Mock class which type hints for EE_Encryption
        // but first add alias for interface
        $this->CoffeeShop->addAliases(
            'EventEspresso\core\services\cache\TransientCacheStorage',
            'EventEspresso\core\services\cache\CacheStorageInterface'
        );
        $session = $this->CoffeeShop->brew('EE_Session_Mock');
        $this->assertInstanceOf('EE_Session_Mock', $session);
        $this->assertInstanceOf('EE_Encryption', $session->encryption());
    }



    public function test_ingredients_and_dependency_substitution()
    {
        $this->addDefaultRecipes();
        // Add Recipe for using HonduranBean in place of BeanInterface
        $this->CoffeeShop->addRecipe(
            new Recipe(
                'HonduranBean',
                'EventEspresso\tests\mocks\core\services\container\HonduranBean',
                array('EventEspresso\tests\mocks\core\services\container\BeanInterface'),
                array(),
                CoffeeMaker::BREW_SHARED
            )
        );
        // Add Recipe for HonduranCoffee
        $this->CoffeeShop->addRecipe(
            new Recipe(
                'HonduranCoffee',
                'EventEspresso\tests\mocks\core\services\container\Coffee'
            )
        );
        /** @var Coffee $HonduranCoffee */
        $HonduranCoffee = $this->CoffeeShop->brew('HonduranCoffee');
        // test it
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\Coffee',
            $HonduranCoffee,
            "brew HonduranCoffee directly (should be instance of Coffee): "
        );
        // test that bean type is an instance of HonduranBean
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\HonduranBean',
            $HonduranCoffee->getBeans(),
            "bean type should be instance of HonduranBean"
        );
        // Add another Recipe for KenyanCoffee
        $this->CoffeeShop->addRecipe(
            new Recipe(
                'KenyanCoffee',
                'EventEspresso\tests\mocks\core\services\container\Coffee'
            )
        );
        /** @var Coffee $HonduranCoffee */
        $KenyanCoffee = $this->CoffeeShop->brew('KenyanCoffee');
        // test it
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\Coffee',
            $KenyanCoffee,
            "brew KenyanCoffee directly (should be instance of Coffee): "
        );
        // test that bean type is an instance of HonduranBean
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\HonduranBean',
            $KenyanCoffee->getBeans(),
            "bean type should be instance of HonduranBean"
        );
        // BUT... It can't be KenyanCoffee if it's using HonduranBean
        // Remove Recipe for KenyanCoffee";
        $this->CoffeeShop->removeRecipe('KenyanCoffee');
        // and the Closure used for generating instances of KenyanCoffee
        $this->CoffeeShop->removeClosure('KenyanCoffee');
        // Now Add NEW Recipe for KenyanCoffee that specifies KenyanBean
        $this->CoffeeShop->addRecipe(
            new Recipe(
                'KenyanCoffee',
                'EventEspresso\tests\mocks\core\services\container\Coffee',
                array(),
                array('EventEspresso\tests\mocks\core\services\container\BeanInterface' => 'EventEspresso\tests\mocks\core\services\container\KenyanBean'),
                CoffeeMaker::BREW_NEW
            )
        );
        // brew another KenyanCoffee directly
        $KenyanCoffee = $this->CoffeeShop->brew('KenyanCoffee');
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\Coffee',
            $KenyanCoffee,
            "brew KenyanCoffee directly (should be instance of Coffee): "
        );
        // and test that bean type is NOW an instance of KenyanBean
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\KenyanBean',
            $KenyanCoffee->getBeans(),
            "bean type should be instance of KenyanBean"
        );
    }


    private function addClosureForCoffeeFactory()
    {
        $this->addDefaultRecipes();
        $this->addRecipeForRequest();
        // can't pass properties directly to a Closure
        $coffee_shop = $this->CoffeeShop;
        // create a Closure called "CoffeeFromRequest"
        $this->CoffeeShop->addClosure(
            'CoffeeFactory',
            function () use ($coffee_shop)
            {
                /** @var EventEspresso\core\services\request\Request $request */
                $request   = $coffee_shop->brew('Request');
                $bean_type = $request->getRequestParam('bean_type', 'Honduran');
                $bean_type = in_array($bean_type, array('Honduran', 'Kenyan'), true)
                    ? "{$bean_type}Bean"
                    : 'HonduranBean';
                return $coffee_shop->brew(
                    'EventEspresso\tests\mocks\core\services\container\Coffee',
                    array(
                        $coffee_shop->brew(
                            'EventEspresso\tests\mocks\core\services\container\\' . $bean_type
                        )
                    )
                );
            }
        );
    }



    /**
     * @group CoffeeShopAddClosure
     * @throws OutOfBoundsException
     * @throws \EventEspresso\core\exceptions\InvalidClassException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
     * @throws \EventEspresso\core\services\container\exceptions\InstantiationException
     * @throws \EventEspresso\core\services\container\exceptions\ServiceExistsException
     * @throws \EventEspresso\core\services\container\exceptions\ServiceNotFoundException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_object_factories_using_addClosure()
    {
        $this->addClosureForCoffeeFactory();
        // brew a Coffee using the CoffeeFactory,
        // which should use the default bean type since we haven't specified one
        $default_coffee = $this->CoffeeShop->brew('CoffeeFactory');
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\Coffee',
            $default_coffee,
            'should be instance of Coffee'
        );
        // and test that default bean type is an instance of HonduranBean
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\HonduranBean',
            $default_coffee->getBeans(),
            'bean type should be instance of HonduranBean'
        );
    }


    /**
     * @group CoffeeShopAddClosure
     * @throws OutOfBoundsException
     * @throws \EventEspresso\core\exceptions\InvalidClassException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
     * @throws \EventEspresso\core\services\container\exceptions\InstantiationException
     * @throws \EventEspresso\core\services\container\exceptions\ServiceExistsException
     * @throws \EventEspresso\core\services\container\exceptions\ServiceNotFoundException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_object_factories_using_addClosure_and_get_param()
    {
        // first, add a $_GET param specifying the bean type as Kenyan
        $_GET['bean_type'] = 'Kenyan';
        $this->addClosureForCoffeeFactory();
        // brew another Coffee using the CoffeeFactory
        $new_coffee = $this->CoffeeShop->brew('CoffeeFactory');
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\Coffee',
            $new_coffee,
            'should be instance of Coffee'
        );
        // and test that bean type is NOW an instance of KenyanBean
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\container\KenyanBean',
            $new_coffee->getBeans(),
            'bean type should be instance of KenyanBean'
        );
    }


}
// End of file CoffeeShopTest.php
// Location: testcases/core/services/container/CoffeeShopTest.php
