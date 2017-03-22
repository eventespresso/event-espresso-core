<?php
namespace EventEspresso\core\services\container;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use OutOfBoundsException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class OpenCoffeeShop
 * Initialize and configure the CoffeeSop DI container
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class OpenCoffeeShop {

	/**
	 * @var CoffeeShop $CoffeeShop
	 */
	private $CoffeeShop;



    /**
     * OpenCoffeeShop constructor
     *
     * @throws InvalidInterfaceException
     */
	public function __construct()
    {
        // instantiate the DI container
		$this->CoffeeShop = new CoffeeShop();
    }



	/**
	 * @return CoffeeShop
	 */
	public function CoffeeShop() {
		return $this->CoffeeShop;
	}



    /**
     * configure coffee makers which control the different kinds of brews
     * ( shared services, new factory objects, etc )
     *
     * @throws InvalidEntityException
     */
	public function setupCoffeeMakers() {
        // create a dependency injector class for resolving class constructor arguments
        $DependencyInjector = new DependencyInjector(
            $this->CoffeeShop,
            new \EEH_Array()
        );
        // and some coffeemakers, one for creating new instances
        $this->CoffeeShop->addCoffeeMaker(
            new NewCoffeeMaker($this->CoffeeShop, $DependencyInjector),
            CoffeeMaker::BREW_NEW
        );
        // one for shared services
        $this->CoffeeShop->addCoffeeMaker(
            new SharedCoffeeMaker($this->CoffeeShop, $DependencyInjector),
            CoffeeMaker::BREW_SHARED
        );
        // and one for classes that only get loaded
        $this->CoffeeShop->addCoffeeMaker(
            new LoadOnlyCoffeeMaker($this->CoffeeShop, $DependencyInjector),
            CoffeeMaker::BREW_LOAD_ONLY
        );
    }



    /**
     * Recipes define how to load legacy classes
     *
     * @throws InvalidIdentifierException
     */
    public function addRecipes() {
        // add default recipe, which should handle loading for most PSR-4 compatible classes
        // as long as they are not type hinting for interfaces
        $this->CoffeeShop->addRecipe(
            new Recipe(
                Recipe::DEFAULT_ID
            )
        );
        // PSR-4 compatible class with aliases
		$this->CoffeeShop->addRecipe(
			new Recipe(
				'CommandHandlerManager',
				'EventEspresso\core\services\commands\CommandHandlerManager',
                array(
                    'CommandHandlerManagerInterface',
                    'EventEspresso\core\services\commands\CommandHandlerManagerInterface',
                ),
                array(),
				CoffeeMaker::BREW_SHARED
			)
		);
		// PSR-4 compatible class with aliases, which dependency on CommandHandlerManager
		$this->CoffeeShop->addRecipe(
			new Recipe(
				'CommandBus',
				'EventEspresso\core\services\commands\CommandBus',
                array(
                    'CommandBusInterface',
                    'EventEspresso\core\services\commands\CommandBusInterface',
                ),
                array(),
				CoffeeMaker::BREW_SHARED
			)
		);
		// LEGACY classes that are NOT compatible with PSR-4 autoloading, and so must specify a filepath
		// add a wildcard recipe for loading legacy core interfaces
		$this->CoffeeShop->addRecipe(
			new Recipe(
				'EEI_*',
				'',
                array(),
                array(),
				CoffeeMaker::BREW_LOAD_ONLY,
                array(
                    EE_INTERFACES . '*.php',
                    EE_INTERFACES . '*.interfaces.php',
                )
			)
		);
		// add a wildcard recipe for loading models
		$this->CoffeeShop->addRecipe(
			new Recipe(
				'EEM_*',
                '',
                array(),
                array(),
				CoffeeMaker::BREW_SHARED,
				EE_MODELS . '*.model.php'
			)
		);
		// add a wildcard recipe for loading core classes
		$this->CoffeeShop->addRecipe(
			new Recipe(
				'EE_*',
                '',
                array(),
                array(),
                CoffeeMaker::BREW_SHARED,
				array(
					EE_CORE . '*.core.php',
					EE_ADMIN . '*.core.php',
					EE_CPTS . '*.core.php',
					EE_CORE . 'data_migration_scripts' . DS . '*.core.php',
					EE_CORE . 'request_stack' . DS . '*.core.php',
					EE_CORE . 'middleware' . DS . '*.core.php',
				)
			)
		);
		// load admin page parent class
		$this->CoffeeShop->addRecipe(
			new Recipe(
				'EE_Admin_Page*',
                '',
                array(),
                array(),
                CoffeeMaker::BREW_LOAD_ONLY,
				array( EE_ADMIN . '*.core.php' )
			)
		);
		// add a wildcard recipe for loading core classes
		// $this->CoffeeShop->addRecipe(
		// 	new Recipe(
		// 		'*_Admin_Page',
        //      '',
        //      array(),
        // 		array(),
        // 		CoffeeMaker::BREW_SHARED,
		// 		array(
		// 			EE_ADMIN_PAGES . 'transactions' . DS . '*.core.php',
		// 		)
		// 	)
		// );
	}



    /**
     * bootstrap EE and the request stack
     *
     * @throws ServiceNotFoundException
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     * @throws InvalidIdentifierException
     * @throws exceptions\ServiceExistsException
     * @throws OutOfBoundsException
     * @throws exceptions\InstantiationException
     */
    public function firstBrew()
    {
        $this->CoffeeShop->brew('EE_Request', array($_GET, $_POST, $_COOKIE));
        $this->CoffeeShop->brew('EE_Response');
        $this->CoffeeShop->brew('EE_Bootstrap');
    }


}
// End of file OpenCoffeeShop.php
// Location: /OpenCoffeeShop.php
