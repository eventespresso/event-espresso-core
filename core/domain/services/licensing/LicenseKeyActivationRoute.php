<?php

namespace EventEspresso\core\domain\services\licensing;

use EE_Network_Config;
use EventEspresso\core\domain\services\capabilities\FeatureFlag;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\services\licensing\LicenseManager;
use EventEspresso\core\services\licensing\PluginLicense;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\routing\Route;

/**
 * LicenseKeyActivationRoute
 * On activation, this route will check if the old PUE license key is set and
 * if so, it will update the new EDD license key if it is not already set.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing
 * @author      Brent Christensen
 * @since       $VID:$
 */
class LicenseKeyActivationRoute extends Route
{
    private ?EE_Network_Config $network_config = null;

    private ?PluginLicense $core_license = null;


    public function matchesCurrentRequest(): bool
    {
        /** @var FeatureFlags $feature */
        $feature = $this->loader->getShared(FeatureFlags::class);
        return $this->request->isActivation()
            && $feature instanceof FeatureFlags
            && $feature->allowed(FeatureFlag::USE_EDD_PLUGIN_LICENSING);
    }


    /**
     * @return void
     */
    protected function registerDependencies()
    {
        $this->core_license   = $this->loader->getShared(PluginLicense::class);
        $this->network_config = $this->loader->getShared(EE_Network_Config::class);
    }


    protected function requestHandler(): bool
    {
        // use old PUE license key if new one is not set
        if (
            $this->core_license instanceof PluginLicense
            && $this->core_license->isMissingLicenseKey()
            && ! empty($this->network_config->core->site_license_key)
        ) {
            // save the old PUE license key as the new EDD license key
            $this->core_license->setLicenseKey($this->network_config->core->site_license_key);
            // and now try activating the new EDD license key
            /** @var LicenseManager $licence_manager */
            $licence_manager = LoaderFactory::getShared(LicenseManager::class);
            $licence_manager->activateLicense(
                $this->core_license->licenseKey(),
                $this->core_license->itemID(),
                $this->core_license->itemName(),
                $this->core_license->pluginSlug(),
                $this->core_license->version(),
                $this->core_license->minCoreVersion()
            );
        }
        return true;
    }
}
