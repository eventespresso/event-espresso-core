<?php

namespace EventEspresso\core\domain\services\licensing;

/**
 * LicenseStatus
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing
 * @author      Brent Christensen
 * @since       5.0.40.p
 */
class LicenseStatus
{
    public const ACTIVE        = 'active';

    public const DECAF         = 'decaf';

    public const DISABLED      = 'disabled';

    public const EXPIRED       = 'expired';

    public const INVALID       = 'invalid';

    public const NONE          = 'none';

    public const REVOKED       = 'revoked';

    public const SITE_INACTIVE = 'site_inactive';

    public const VALID         = 'valid';
}
