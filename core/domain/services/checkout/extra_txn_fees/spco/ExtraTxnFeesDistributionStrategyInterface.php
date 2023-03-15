<?php

namespace EventEspresso\core\domain\services\checkout\extra_txn_fees\spco;

use EE_Registration;

interface ExtraTxnFeesDistributionStrategyInterface
{
    /**
     * @param float $extra_fees
     * @param EE_Registration[] $registrations
     */
    public function applyExtraFeesToRegistrants($extra_fees, array $registrations);
}
