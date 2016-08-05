<?php
namespace EventEspresso\core\services\container;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



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
	 * @var DependencyInjector $DependencyInjector
	 */
	private $DependencyInjector;



	/**
	 * OpenCoffeeShop constructor.
	 */
	public function __construct()
    {
		// instantiate the container
		$this->CoffeeShop = new CoffeeShop();
		// create a dependency injector class for resolving class constructor arguments
		$this->DependencyInjector = new DependencyInjector(
			$this->CoffeeShop,
			new \EEH_Array()
		);
		// and some coffeemakers, one for creating new instances
		$this->CoffeeShop->addCoffeeMaker(
			new NewCoffeeMaker( $this->CoffeeShop, $this->DependencyInjector ),
			CoffeeMaker::BREW_NEW
		);
		// one for shared services
		$this->CoffeeShop->addCoffeeMaker(
			new SharedCoffeeMaker( $this->CoffeeShop, $this->DependencyInjector ),
			CoffeeMaker::BREW_SHARED
		);
		// and one for classes that only get loaded
		$this->CoffeeShop->addCoffeeMaker(
			new LoadOnlyCoffeeMaker( $this->CoffeeShop, $this->DependencyInjector ),
			CoffeeMaker::BREW_LOAD_ONLY
		);
		// add default recipe, which should handle loading for most PSR-4 compatible classes
		// as long as they are not type hinting for interfaces
		$this->CoffeeShop->addRecipe(
			new Recipe(
				Recipe::DEFAULT_ID
			)
		);
	}



	/**
	 * @return \EventEspresso\core\services\container\CoffeeShop
	 */
	public function CoffeeShop() {
		return $this->CoffeeShop;
	}



	public function addRecipes() {

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




}
// End of file OpenCoffeeShop.php
// Location: /OpenCoffeeShop.php
