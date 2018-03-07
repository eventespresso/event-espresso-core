<?php

namespace EventEspresso\core\domain\services\gutenberg\loaders;

use EE_Request;
use EventEspresso\core\domain\services\gutenberg\GutenbergBlockLoader;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EventsList
 * GutenbergBlockLoader for the Events List GutenbergBlock / EspressoEvents shortcode
 *
 * @package EventEspresso\core\domain\services\gutenberg\loaders
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventsList extends GutenbergBlockLoader
{

    /**
     * Perform any early setup required by the loader
     *
     * @return void
     */
    public function initialize()
    {
        // TODO: Implement initialize() method.
    }


    /**
     * Returns true if the GutenbergBlock should be loaded for the given request
     *
     * @param EE_Request $request
     * @return boolean
     */
    public function loadBlockForRequest(EE_Request $request)
    {
        return true;
    }


    /**
     * Returns a unique string identifier for the Gutenberg block
     * which would usually by the block's Fully Qualified Class Name
     * but could be anything as long as it will not conflict with other blocks
     *
     * @return string
     */
    public function getBlockIdentifier()
    {
        return 'EventEspresso\core\domain\entities\gutenberg\blocks\EventsList';
    }
}
