<?php

namespace EventEspresso\tests\mocks\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ClassToLoad
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\loaders
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
abstract class ClassToLoad
{

    private $args = array();


    /**
     * NewClassToLoad constructor.
     *
     * @param array $args
     */
    public function __construct(array $args = array())
    {
        $this->args = $args;
    }


    /**
     * @return array
     */
    public function args()
    {
        return $this->args;
    }


    public function sameInstance(ClassToLoad $other_class)
    {
        return $other_class === $this;
    }
}
