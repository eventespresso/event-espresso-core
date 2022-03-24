<?php

namespace EventEspresso\core\services\addon;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\addon\api\AddonApiVersion;
use EventEspresso\core\services\collections\Collection;

/**
 * Class AddonCollection
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\addon
 * @since   $VID:$
 */
class AddonCollection extends Collection
{
    /**
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(AddonApiVersion::class);
    }


    /**
     * @param AddonApiVersion $addon
     * @return bool
     */
    public function addAddon(AddonApiVersion $addon): bool
    {
        return $this->add($addon, $addon->slug());
    }


    /**
     * @param string $addon_slug
     * @return AddonApiVersion|null
     */
    public function getAddon(string $addon_slug): ?AddonApiVersion
    {
        return $this->get($addon_slug);
    }


    /**
     * @param string $addon_slug
     * @return bool
     */
    public function hasAddon(string $addon_slug): bool
    {
        return $this->has($addon_slug);
    }
}
