<?php

namespace EventEspresso\core\services\json;

use DomainException;

/**
 * Class JsonDataNode
 * A Root level Data Node that directly targets a script and use case domain that it provides data for
 * There can only be one primary data node per request, so care has to be taken to ensure that
 * multiple Route objects are not attempting to set a primary data node - THERE CAN ONLY BE ONE !!!
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class PrimaryJsonDataNode extends JsonDataNode
{

    /**
     * wp script handle for the app that requires the JSON data
     *
     * @var string $target_script
     */
    private $target_script;


    /**
     * sets the WP script handle that this data node is providing data for.
     * The JSON data will written to the DOM inline prior to the targeted script handle
     *
     * @param string $target_script
     * @throws DomainException
     */
    public function setTargetScript($target_script)
    {
        if ($this->target_script !== null) {
            $this->validator->overwriteError($target_script, 'target script');
        }
        $this->target_script = $target_script;
    }


    /**
     * the WP script handle that this data node is providing data for
     *
     * @return string
     */
    public function targetScript()
    {
        return $this->target_script;
    }
}
