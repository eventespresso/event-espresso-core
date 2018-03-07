<?php

namespace EventEspresso\core\domain\services\gutenberg;

use EE_Request;
use EventEspresso\core\domain\entities\gutenberg\GutenbergBlockInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface GutenbergBlockLoaderInterface
 * Classes implementing this interface are responsible
 * for deciding whether to load a particular GutenbergBlock
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
interface GutenbergBlockLoaderInterface
{

    /**
     * Perform any early setup required by the loader
     *
     * @return void
     */
    public function initialize();


    /**
     * Returns true if the GutenbergBlock should be loaded for the given request
     *
     * @param EE_Request $request
     * @return boolean
     */
    public function loadBlockForRequest(EE_Request $request);


    /**
     * Returns a unique string identifier for the Gutenberg block
     * which would usually by the block's Fully Qualified Class Name
     * but could be anything as long as it will not conflict with other blocks
     *
     * @return string
     */
    public function getBlockIdentifier();


    /**
     * @return GutenbergBlockInterface
     */
    public function loadGutenbergBlock();
}
