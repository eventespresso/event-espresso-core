<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\services\loaders\LoaderInterface;
use Exception;
use SplDoublyLinkedList;

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
     * @throws Exception
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
            try {
                $middleware_app = $this->validateMiddlewareAppDetails($this->current(), true);
                $middleware_app_class = array_shift($middleware_app);
                $middleware_app_args = is_array($middleware_app) ? $middleware_app : array();
                $middleware_app_args = array($application, $this->loader) + $middleware_app_args;
                $application = $this->loader->getShared($middleware_app_class, $middleware_app_args);
            } catch (InvalidRequestStackMiddlewareException $exception) {
                if (WP_DEBUG) {
                    new ExceptionStackTraceDisplay($exception);
                    continue;
                }
                error_log($exception->getMessage());
            }
        }
        return new RequestStack($application, $core_app);
    }


    /**
     * Ensures that the app details that have been pushed onto RequestStackBuilder
     * are all ordered correctly so that the middleware can be properly constructed
     *
     * @param array $middleware_app
     * @param bool  $recurse
     * @return array
     * @throws InvalidRequestStackMiddlewareException
     */
    protected function validateMiddlewareAppDetails(array $middleware_app, $recurse = false)
    {
        $middleware_app_class = reset($middleware_app);
        // is array empty ?
        if ($middleware_app_class === false) {
            throw new InvalidRequestStackMiddlewareException($middleware_app_class);
        }
        // are the class and arguments in the wrong order ?
        if (is_array($middleware_app_class)) {
            if ($recurse === true) {
                return $this->validateMiddlewareAppDetails(array_reverse($middleware_app));
            }
            throw new InvalidRequestStackMiddlewareException($middleware_app_class);
        }
        // is filter callback working like legacy middleware and sending a numerically indexed array ?
        if (is_int($middleware_app_class)) {
            if ($recurse === true) {
                $middleware_app = array_reverse($middleware_app);
                return $this->validateMiddlewareAppDetails(array(reset($middleware_app), array()));
            }
            throw new InvalidRequestStackMiddlewareException($middleware_app_class);
        }
        // is $middleware_app_class a valid FQCN (or class is already loaded) ?
        if (! class_exists($middleware_app_class)) {
            throw new InvalidRequestStackMiddlewareException($middleware_app_class);
        }
        return $middleware_app;
    }
}
