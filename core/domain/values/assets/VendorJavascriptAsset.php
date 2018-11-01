<?php

namespace EventEspresso\core\domain\values\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * VendorJavascriptAsset
 * Details for a Vendor Javascript Asset
 *
 * @package EventEspresso\core\domain\values\assets
 * @author  Darren Ethier
 * @since   $VID:$
 */
class VendorJavascriptAsset extends JavascriptAsset
{

    /**
     * VendorJavascriptAsset constructor.
     *
     * @param string          $handle
     * @param array           $dependencies
     * @param bool            $load_in_footer
     * @param DomainInterface $domain
     * @throws DomainException
     * @throws InvalidDataTypeException
     */
    public function __construct($handle, array $dependencies, $load_in_footer, DomainInterface $domain)
    {
        $source = $this->constructSource($handle, $domain);
        parent::__construct($handle, $source, $dependencies, $load_in_footer, $domain);
    }


    /**
     * Constructs the source string for the given
     *
     * @param string          $handle
     * @param DomainInterface $domain
     * @return string
     * @throws DomainException
     */
    private function constructSource($handle, DomainInterface $domain)
    {
        $dev_suffix = wp_scripts_get_suffix('dev');
        $vendor_path = $domain->pluginUrl() . 'assets/vendor/';
        return "{$vendor_path}{$handle}{$dev_suffix}.js";
    }
}
