<?php

namespace EventEspresso\core\domain\services\capabilities\user_caps;

use EE_Capabilities;

abstract class UserCapabilities
{
    /**
     * @var EE_Capabilities
     */
    private $capabilities;


    /**
     * @var array
     */
    private $caps = [];


    /**
     * @param EE_Capabilities $capabilities
     */
    public function __construct(EE_Capabilities $capabilities)
    {
        $this->capabilities = $capabilities;
    }


    /**
     * @param string     $cap
     * @param string     $context
     * @param int|string $ID
     * @return bool
     */
    protected function hasEntityCap($cap, $context, $ID)
    {
        if (! isset($this->caps[ $cap ][ $context ][ $ID ])) {
            $this->caps[ $cap ][ $context ][ $ID ] = $this->capabilities->current_user_can($cap, $context, $ID);
        }
        return $this->caps[ $cap ][ $context ][ $ID ];
    }


    /**
     * @param string $cap
     * @param string $context
     * @return bool
     */
    protected function hasGlobalCap($cap, $context)
    {
        if (! isset($this->caps[ $cap ][ $context ])) {
            $this->caps[ $cap ][ $context ] = $this->capabilities->current_user_can($cap, $context);
        }
        return $this->caps[ $cap ][ $context ];
    }
}
