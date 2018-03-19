<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\services\loaders\LoaderInterface;
use SplDoublyLinkedList;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestStackBuilder
 * Assembles the EventEspresso RequestStack
 * ! IMPORTANT ! middleware stack operates FIRST IN FIRST OUT
 * so items at the beginning of the final middleware array will run last
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
class RequestStackBuilder extends SplDoublyLinkedList
{

    /**
     * @type LoaderInterface $loader
     */
    private $loader;


    /**
     * RequestStackBuilder constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
        $this->setIteratorMode(SplDoublyLinkedList::IT_MODE_LIFO | SplDoublyLinkedList::IT_MODE_KEEP);
    }


    /**
     * builds decorated middleware stack
     * by continuously injecting previous middleware app into the next
     *
     * @param RequestStackCoreAppInterface $application
     * @return RequestStack
     */
    public function resolve(RequestStackCoreAppInterface $application)
    {
        $core_app = $application;
        // NOW... because the RequestStack is following the decorator pattern,
        // the first stack app we add will end up at the center of the stack,
        // and will end up being the last item to actually run, but we don't want that!
        // Basically we're dealing with TWO stacks, and transferring items from one to the other,
        // BUT... we want the final stack to be in the same order as the first.
        // So we need to reverse the iterator mode when transferring items,
        // because if we don't, the second stack will end  up in the incorrect order.
        $this->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO | SplDoublyLinkedList::IT_MODE_KEEP);
        for ($this->rewind(); $this->valid(); $this->next()) {
            $middleware_app       = $this->current();
            $middleware_app_class = array_shift($middleware_app);
            $middleware_app_args  = is_array($middleware_app) ? $middleware_app : array();
            $middleware_app_args  = array($application, $this->loader) + $middleware_app_args;
            $application = $this->loader->getShared($middleware_app_class, $middleware_app_args);
        }
        return new RequestStack($application, $core_app);
    }
}
