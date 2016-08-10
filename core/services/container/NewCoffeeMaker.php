<?php
namespace EventEspresso\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class NewCoffeeMaker
 * This is the default CoffeeMaker and will return a
 * newly instantiated object every time one is requested.
 * After performing all of the logic for determining how
 * to build an object and resolve it's dependencies,
 * the results are placed in a Closure and stored in the
 * "reservoir" Collection so that the next time the class
 * is required, we simply call the Closure.
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class NewCoffeeMaker extends CoffeeMaker
{


    /**
     * @return string
     */
    public function type()
    {
        return CoffeeMaker::BREW_NEW;
    }



    /**
     * @param RecipeInterface $recipe
     * @param array           $arguments
     * @return mixed
     */
    public function brew(RecipeInterface $recipe, $arguments = array())
    {
        $this->resolveClassAndFilepath($recipe);
        $reflector = $this->injector()->getReflectionClass($recipe->fqcn());
        $method = $this->resolveInstantiationMethod($reflector);
        switch ($method) {
            case 'instance' :
            case 'new_instance' :
            case 'new_instance_from_db';
                $injector = $this->injector();
                $closure = function ($arguments) use ($recipe, $reflector, $method, $injector) {
                    return call_user_func_array(
                        array($reflector->getName(), $method),
                        $injector->resolveDependencies($recipe, $reflector, $arguments)
                    );
                };
                break;
            case 'newInstance' :
                $closure = function () use ($reflector) {
                    return $reflector->newInstance();
                };
                break;
            case 'newInstanceArgs' :
            default :
                $injector = $this->injector();
                $closure = function ($arguments) use ($recipe, $reflector, $injector) {
                    return $reflector->newInstanceArgs(
                        $injector->resolveDependencies($recipe, $reflector, $arguments)
                    );
                };
        }
        return $this->coffeePot()->addClosure($recipe->identifier(), $closure);
    }


}
// End of file NewCoffeeMaker.php
// Location: /NewCoffeeMaker.php