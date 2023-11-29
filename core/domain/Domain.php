<?php

namespace EventEspresso\core\domain;

use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;

/**
 * DomainBase Class
 * A container for all domain data related to Event Espresso Core
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 * @since   4.9.44
 */
class Domain extends DomainBase implements CaffeinatedInterface
{
    /**
     * URL path component used to denote an API request
     */
    const API_NAMESPACE   = 'ee/v';

    const ASSET_NAMESPACE = 'eventespresso';

    const TEXT_DOMAIN     = 'event_espresso';

    /**
     * Slug used for the context where a registration status is changed from a manual trigger in the Registration Admin
     * Page ui.
     */
    const CONTEXT_REGISTRATION_STATUS_CHANGE_REGISTRATION_ADMIN        = 'manual_registration_status_change_from_registration_admin';

    const CONTEXT_REGISTRATION_STATUS_CHANGE_REGISTRATION_ADMIN_NOTIFY = 'manual_registration_status_change_from_registration_admin_and_notify';


    /**
     * Whether or not EE core is the full premium version.
     *
     * @since 4.9.59.p
     * @var bool
     */
    private bool $caffeinated = false;

    /**
     * @since 5.0.0.p
     * @var bool
     */
    private bool $multisite;


    public function __construct(FilePath $plugin_file, Version $version)
    {
        parent::__construct($plugin_file, $version);
        $this->setCaffeinated();
        $this->multisite = is_multisite();
    }


    /**
     * Whether or not EE core is the full premium version.
     *
     * @return bool
     * @since 4.9.59.p
     */
    public function isCaffeinated(): bool
    {
        return $this->caffeinated;
    }


    /**
     * Setter for $is_caffeinated property.
     *
     * @since        4.9.59.p
     * @noinspection PhpUndefinedConstantInspection
     */
    private function setCaffeinated()
    {
        $this->caffeinated = ! (defined('EE_DECAF') && EE_DECAF)
                             && is_readable($this->pluginPath() . 'caffeinated/brewing_regular.php');
    }


    /**
     * This should be used everywhere the Event Espresso brand name is referenced in public facing interfaces
     * to allow for filtering the brand.
     *
     * @return string
     */
    public static function brandName(): string
    {
        return (string) apply_filters('FHEE__EventEspresso_core_domain_Domain__brandName', 'Event Espresso');
    }


    /**
     * @return bool
     * @since 5.0.0.p
     */
    public function isMultiSite(): bool
    {
        return $this->multisite;
    }
}
