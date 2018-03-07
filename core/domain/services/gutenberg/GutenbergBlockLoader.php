<?php

namespace EventEspresso\core\domain\services\gutenberg;


use EventEspresso\core\domain\entities\gutenberg\GutenbergBlockInterface;
use EventEspresso\core\services\loaders\LoaderInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class GutenbergBlockLoader
 * This class is responsible for deciding whether to load a particular GutenbergBlock
 * based on the current Request, as well as performing the actual loading.
 * ALL loaders should be located in
 *  \core\domain\services\gutenberg\loaders\
 * under the appropriate namespace root
 * and can be added to the core loaders using the following filter:
 * FHEE__EventEspresso_core_services_gutenberg_GutenbergBlockManager__registerGutenbergBlockLoaders__block_loader_collection
 * which exposes a Collection of GutenbergBlockLoaderInterface objects
 *
 * @package EventEspresso\core\services\gutenberg
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class GutenbergBlockLoader implements GutenbergBlockLoaderInterface
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;


    /**
     * GutenbergBlockLoader constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * @return GutenbergBlockInterface
     */
    public function loadGutenbergBlock()
    {
        return $this->loader->getShared($this->getBlockIdentifier());
    }
}
