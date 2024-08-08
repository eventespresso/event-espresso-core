<?php

namespace EventEspresso\core\domain\values\gateways;

use DateInterval;
use DateTime;
use DateTimeImmutable;
use DateTimeZone;
use EventEspresso\core\services\database\WordPressOption;
use Exception;

/**
 * GracePeriod
 *
 *  Manages the grace period for different license types in the Event Espresso plugin.
 *  The grace period is a set number of days during which plugin functionality is still available
 *  after the license has expired. The length of the grace period depends on the license type.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\values\gateways
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class GracePeriod extends WordPressOption
{
    private const OPTION_NAME        = 'ee_gateway_grace_period';

    private const EXPIRY_DATE_FORMAT = 'Y-m-d H:i:s';

    public const  LICENSE_ACTIVE     = 'active';

    public const  LICENSE_DECAF      = 'decaf';

    public const  LICENSE_EXPIRED    = 'expired';


    protected DateTimeImmutable $current_date;

    protected DateTimeImmutable $grace_period_start_date;

    protected DateTimeZone $UTC_TZ;

    protected array $grace_periods = [
        GracePeriod::LICENSE_ACTIVE  => 14,
        GracePeriod::LICENSE_EXPIRED => 14,
        GracePeriod::LICENSE_DECAF   => 28,
    ];


    /**
     * @throws Exception
     */
    public function __construct()
    {
        parent::__construct(GracePeriod::OPTION_NAME, 0);
        $this->UTC_TZ                  = new DateTimeZone('UTC');
        $this->current_date            = new DateTimeImmutable('now', $this->UTC_TZ);
        $this->grace_period_start_date = $this->gracePeriodStartDate();
    }


    /**
     * @param string $license_status
     * @param string $license_expires
     * @return bool
     * @throws Exception
     */
    public function withinGracePeriod(string $license_status, string $license_expires): bool
    {
        if ($license_status === GracePeriod::LICENSE_ACTIVE) {
            return true;
        }
        $license_expires_datetime = $this->licenseExpiresDateTime($license_expires);
        if ($license_expires_datetime instanceof DateTimeImmutable) {
            $this->resetGracePeriodIfLicenseExpired($this->licenseExpiresDateTime($license_expires));
        }
        return $this->daysLeft() <= $this->gracePeriodForLicense($license_status);
    }


    /**
     * @return DateTimeImmutable
     * @throws Exception
     */
    protected function gracePeriodStartDate(): DateTimeImmutable
    {
        $grace_period_start_timestamp = $this->loadOption();
        if (! $grace_period_start_timestamp) {
            $grace_period_start_timestamp = time();
            $this->updateOption($grace_period_start_timestamp, true);
        }
        return new DateTimeImmutable("@$grace_period_start_timestamp", $this->UTC_TZ);
    }


    /**
     * will reset the grace period start date if the license is expired
     *
     * @param DateTimeImmutable $license_expiry_date
     * @throws Exception
     */
    protected function resetGracePeriodIfLicenseExpired(DateTimeImmutable $license_expiry_date)
    {
        // return if license has not expired
        if ($license_expiry_date >= $this->current_date) {
            return;
        }
        // return if grace period start date is already set to the date the license expired
        if ($license_expiry_date == $this->grace_period_start_date) {
            return;
        }
        // reset grace period start date to the date the license expired
        $grace_period_timestamp = $license_expiry_date->getTimestamp();
        $this->updateOption($grace_period_timestamp, true);
        $this->grace_period_start_date = new DateTimeImmutable("@$grace_period_timestamp", $this->UTC_TZ);
    }


    /**
     * returns the number of days between the grace period start date and the current date
     *
     * @return DateInterval
     * @throws Exception
     */
    protected function gracePeriodDateInterval(): DateInterval
    {
        return $this->grace_period_start_date->diff($this->current_date, true);
    }


    /**
     * returns the number of days left in the grace period
     *
     * @return int
     * @throws Exception
     */
    protected function daysLeft(): int
    {
        return max((int) $this->gracePeriodDateInterval()->format('%a'), 0);
    }


    /**
     * @param string $license_status
     * @return int
     */
    protected function gracePeriodForLicense(string $license_status): int
    {
        return $this->grace_periods[ $license_status ] ?? 0;
    }


    /**
     * @param string $license_expires
     * @return DateTimeImmutable|null
     */
    protected function licenseExpiresDateTime(string $license_expires): ?DateTimeImmutable
    {
        if (empty($license_expires)) {
            return null;
        }
        $dateTime = DateTime::createFromFormat(GracePeriod::EXPIRY_DATE_FORMAT, $license_expires);
        $errors   = DateTime::getLastErrors();
        // return null if date could not be created or there were errors
        if (
            $dateTime === false
            || (is_array($errors) && ($errors['warning_count'] > 0 || $errors['error_count'] > 0))
        ) {
            return null;
        }
        return DateTimeImmutable::createFromMutable($dateTime);
    }


    /**
     * override parent method to prevent deletion
     *
     * @return bool
     */
    public function deleteOption(): bool
    {
        return false;
    }
}
