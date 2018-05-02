<?php
namespace EventEspresso\core\domain;

/**
 * Interface RequiresDomainInterface
 * Indicates a class that may utilize a DomainInterface class
 * and provides a getter plus a setter for injecting it
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 *
 */
interface RequiresDomainInterface
{

    /**
     * @param DomainInterface $domain
     */
    public function setDomain(DomainInterface $domain);


    /**
     * @return DomainInterface
     */
    public function domain();
}
