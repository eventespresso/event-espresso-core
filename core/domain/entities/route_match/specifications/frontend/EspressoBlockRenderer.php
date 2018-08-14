<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\frontend;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class EspressoBlockRenderer
 * Returns true when the current request is for the ServerSideRender of an Event Espresso Block
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\publica
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoBlockRenderer extends RouteMatchSpecification
{

    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return strpos(
            $this->request->requestUri(),
            'wp-json/gutenberg/v1/block-renderer/eventespresso'
        ) !== false;
    }
}
