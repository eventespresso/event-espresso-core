<?php

namespace EventEspresso\core\domain;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface RequiresDomainInterface
 * Indicates a class that may utilize a DomainInterface class
 * and provides a getter plus a setter for injecting it
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface RequiresDomainInterface
{

    /**
     * @param DomainInterface $domain
     */
    public function setDomain(DomainInterface $domain = null);


    /**
     * @return DomainInterface
     */
    public function domain();

}
// Location: RequiresDomainInterface.php
