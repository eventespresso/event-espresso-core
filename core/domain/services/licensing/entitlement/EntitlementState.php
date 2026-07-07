<?php

namespace EventEspresso\core\domain\services\licensing\entitlement;

/**
 * EntitlementState
 *
 * Central entitlement-state names used to decide whether a licensed add-on may execute
 * its gated functionality based on the cached license verdict and grace windows.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing\entitlement
 * @since       5.0.57
 */
class EntitlementState
{
    public const ACTIVE                   = 'active';

    public const INITIAL_GRACE            = 'initial_grace';

    public const EXPIRED_GRACE            = 'expired_grace';

    public const BLOCKED                  = 'blocked';

    public const VERIFICATION_UNAVAILABLE = 'verification_unavailable';
}
