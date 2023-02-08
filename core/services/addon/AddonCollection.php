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
    public function addAddon($addon)
    {
        return $this->add($addon, $addon->slug());
    }


    /**
     * @param string $addon_slug
     * @return AddonApiVersion|null
     */
    public function getAddon($addon_slug)
    {
        return $this->get($addon_slug);
    }


    /**
     * @param string $addon_slug
     * @return bool
     */
    public function hasAddon($addon_slug)
    {
        return $this->has($addon_slug);
    }
}
