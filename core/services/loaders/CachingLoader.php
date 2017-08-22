<?php

namespace EventEspresso\core\services\loaders;

use Closure;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\collections\CollectionInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CachingLoader
 * caches objects returned by the decorated loader
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CachingLoader extends LoaderDecorator
{

    /**
     * @var CollectionInterface $cache
     */
    protected $cache;

    /**
     * @var string $identifier
     */
    protected $identifier;



    /**
     * CachingLoader constructor.
     *
     * @param LoaderDecoratorInterface $loader
     * @param CollectionInterface      $cache
     * @param string                   $identifier
     * @throws InvalidDataTypeException
     */
    public function __construct(LoaderDecoratorInterface $loader, CollectionInterface $cache, $identifier = '')
    {
        parent::__construct($loader);
        $this->cache = $cache;
        $this->setIdentifier($identifier);
        if ($this->identifier !== '') {
            // to only clear this cache, and assuming an identifier has been set, simply do the following:
            // do_action('AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache__IDENTIFIER');
            // where "IDENTIFIER" = the string that was set during construction
            add_action(
                "AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache__{$identifier}",
                array($this, 'reset')
            );
        }
        // to clear ALL caches, simply do the following:
        // do_action('AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache');
        add_action(
            'AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache',
            array($this, 'reset')
        );
    }



    /**
     * @return string
     */
    public function identifier()
    {
        return $this->identifier;
    }



    /**
     * @param string $identifier
     * @throws InvalidDataTypeException
     */
    private function setIdentifier($identifier)
    {
        if ( ! is_string($identifier)) {
            throw new InvalidDataTypeException('$identifier', $identifier, 'string');
        }
        $this->identifier = $identifier;
    }



    /**
     * @param string $fqcn
     * @param array  $arguments
     * @param bool   $shared
     * @return mixed
     */
    public function load($fqcn, $arguments = array(), $shared = true)
    {
        $fqcn = ltrim($fqcn, '\\');
        // caching can be turned off via the following code:
        // add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_true');
        if(
            apply_filters(
                'FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache',
                false,
                $this
            )
        ){
            // even though $shared might be true, caching should be bypassed for whatever reason,
            // so we don't want the core loader to cache anything, therefore caching is turned off
            return $this->loader->load($fqcn, $arguments, false);
        }
        $identifier = md5($fqcn . $this->getIdentifierForArgument($arguments));
        if($this->cache->has($identifier)){
            return $this->cache->get($identifier);
        }
        $object = $this->loader->load($fqcn, $arguments, $shared);
        if($object instanceof $fqcn){
            $this->cache->add($object, $identifier);
        }
        return $object;
    }



    /**
     * empties cache and calls reset() on loader if method exists
     */
    public function reset()
    {
        $this->cache->trashAndDetachAll();
        $this->loader->reset();
    }



    /**
     * build a string representation of a class' arguments
     * (mostly because Closures can't be serialized)
     *
     * @param array $arguments
     * @return string
     */
    private function getIdentifierForArgument(array $arguments)
    {
        $identifier = '';
        foreach ($arguments as $argument) {
            switch (true) {
                case is_object($argument) :
                case $argument instanceof Closure :
                    $identifier .= spl_object_hash($argument);
                    break;
                case is_array($argument) :
                    $identifier .= $this->getIdentifierForArgument($argument);
                    break;
                default :
                    $identifier .= $argument;
                    break;
            }
        }
        return $identifier;
    }


}
// End of file CachingLoader.php
// Location: EventEspresso\core\services\loaders/CachingLoader.php
