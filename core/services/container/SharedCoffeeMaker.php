<?php
namespace EventEspresso\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class SharedCoffeeMaker
 * Instead of returning a newly instantiated object every time,
 * this CoffeeMaker builds an object once and then stores that
 * object in the "carafe" Collection so that the next time the
 * class is required, we simply return that previously built object.
 * Therefore the exact same instance is returned every time it is requested.
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class SharedCoffeeMaker extends CoffeeMaker
{



    /**
     * @return string
     */
    public function type()
    {
        return CoffeeMaker::BREW_SHARED;
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
                $service = call_user_func_array(
                    array($reflector->getName(), $method),
                    $this->injector()->resolveDependencies($recipe, $reflector, $arguments)
                );
                break;
            case 'newInstance' :
                $service = $reflector->newInstance();
                break;
            case 'newInstanceArgs' :
            default :
                $service = $reflector->newInstanceArgs(
                    $this->injector()->resolveDependencies($recipe, $reflector, $arguments)
                );
        }
        return $this->coffeePot()->addService($recipe->identifier(), $service);
    }

}
// End of file SharedCoffeeMaker.php
// Location: /SharedCoffeeMaker.php