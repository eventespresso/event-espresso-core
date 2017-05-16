<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class LoaderDecorator
 * abstract parent class for classes that add additional logic to the loading process
 * by wrapping \EventEspresso\core\services\loaders\CoreLoader
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class LoaderDecorator implements LoaderDecoratorInterface
{


    /**
     * @var LoaderDecoratorInterface $loader
     */
    protected $loader;



    /**
     * LoaderDecorator constructor.
     *
     * @param LoaderDecoratorInterface $loader
     */
    public function __construct(LoaderDecoratorInterface $loader)
    {
        $this->loader = $loader;
    }



}
// End of file LoaderDecorator.php
// Location: core/services/loaders/LoaderDecorator.php