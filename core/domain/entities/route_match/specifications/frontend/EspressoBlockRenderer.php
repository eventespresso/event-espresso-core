<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\frontend;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class EspressoBlockRenderer
 * Returns true when the current request is for the ServerSideRender of an Event Espresso Block
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\publica
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoBlockRenderer extends RouteMatchSpecification
{

    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return strpos(
            $this->request->requestUri(),
            'wp-json/wp/v2/block-renderer/eventespresso'
        ) !== false
            || strpos(
                $this->request->requestUri(),
                'wp-json/gutenberg/v2/block-renderer/eventespresso'
            ) !== false;
    }
}
