<?php

namespace EventEspresso\core\services\json;

use DomainException;

/**
 * Class JsonDataNode
 * Description
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class PrimaryJsonDataNode extends JsonDataNode
{

    /**
     * @var string $domain
     */
    private $domain;

    /**
     * wp script handle for the app that requires the JSON data
     *
     * @var string $target_script
     */
    private $target_script;


    /**
     * @param string $domain
     * @throws DomainException
     */
    public function setDomain($domain)
    {
        $is_set = $this->domain !== null;
        $this->validator->propertyOverwriteError($is_set, $domain, 'domain route');
        $this->domain = $domain;
    }


    /**
     * @param string $target_script
     * @throws DomainException
     */
    public function setTargetScript($target_script)
    {
        $is_set = $this->target_script !== null;
        $this->validator->propertyOverwriteError($is_set, $target_script, 'target script');
        $this->target_script = $target_script;
    }


    /**
     * @return string
     */
    public function domain()
    {
        return $this->domain;
    }


    /**
     * @return string
     */
    public function targetScript()
    {
        return $this->target_script;
    }
}
