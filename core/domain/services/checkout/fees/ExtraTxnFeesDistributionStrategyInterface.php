<?php

namespace EventEspresso\core\domain\services\checkout\fees;

use EE_Registration;

interface ExtraTxnFeesDistributionStrategyInterface
{
    /**
     * @param float $extra_fees
     * @param EE_Registration[] $registrations
     */
    public function applyExtraFeesToRegistrants(float $extra_fees, array $registrations);
}
