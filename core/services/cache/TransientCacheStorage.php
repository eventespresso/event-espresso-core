<?php

namespace EventEspresso\core\services\cache;

/**
 * Class TransientCacheStorage
 * Manages the creation and cleanup of transients
 * by tracking transient keys and their corresponding expiration.
 * The transient cleanup schedule is filterable
 * to control how often cleanup occurs
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.31
 */
class TransientCacheStorage implements CacheStorageInterface
{
    /**
     * wp-option option_name for tracking transients
     *
     * @type string
     */
    private const TRANSIENT_SCHEDULE_OPTIONS_KEY = 'ee_transient_schedule';

    public const  FREQUENCY_OFF                  = 'off';

    public const  FREQUENCY_5_MINUTES            = '5-minutes';

    public const  FREQUENCY_15_MINUTES           = '15-minutes';

    public const  FREQUENCY_HOUR                 = 'hour';

    public const  FREQUENCY_12_HOURS             = '12-hours';

    public const  FREQUENCY_DAY                  = 'day';


    private int $current_time;

    private array $transients;

    /**
     * how often to perform transient cleanup
     *
     * @var string $transient_cleanup_frequency
     */
    private string $transient_cleanup_frequency;


    /**
     * TransientCacheStorage constructor.
     *
     * @param string $transient_cleanup_frequency one of the FREQUENCY_* constants
     */
    public function __construct(string $transient_cleanup_frequency = TransientCacheStorage::FREQUENCY_HOUR)
    {
        $this->setTransientCleanupFrequency($transient_cleanup_frequency);
        // round current time down to closest 5 minutes to simplify scheduling
        $this->current_time = $this->roundTimestamp(time(), TransientCacheStorage::FREQUENCY_5_MINUTES, false);
        $this->transients   = (array) get_option(TransientCacheStorage::TRANSIENT_SCHEDULE_OPTIONS_KEY, []);
        if (
            ! (defined('DOING_AJAX') && DOING_AJAX)
            && $this->transient_cleanup_frequency !== TransientCacheStorage::FREQUENCY_OFF
        ) {
            add_action('shutdown', [$this, 'checkTransientCleanupSchedule'], 999);
        }
    }


    /**
     * Sets how often transient cleanup occurs
     *
     * @param string $transient_cleanup_frequency one of the FREQUENCY_* constants
     * @return void
     */
    private function setTransientCleanupFrequency(string $transient_cleanup_frequency)
    {
        // sets how often transients are cleaned up
        $transient_cleanup_frequency_options = apply_filters(
            'FHEE__TransientCacheStorage__transient_cleanup_schedule_options',
            [
                TransientCacheStorage::FREQUENCY_OFF,
                TransientCacheStorage::FREQUENCY_5_MINUTES,
                TransientCacheStorage::FREQUENCY_15_MINUTES,
                TransientCacheStorage::FREQUENCY_HOUR,
                TransientCacheStorage::FREQUENCY_12_HOURS,
                TransientCacheStorage::FREQUENCY_DAY,
            ]
        );
        $transient_cleanup_frequency         = apply_filters(
            'FHEE__TransientCacheStorage__transient_cleanup_schedule',
            $transient_cleanup_frequency
        );
        $this->transient_cleanup_frequency =  in_array(
            (string) $transient_cleanup_frequency,
            (array) $transient_cleanup_frequency_options,
            true
        )
            ? $transient_cleanup_frequency
            : TransientCacheStorage::FREQUENCY_HOUR;
    }


    /**
     * we need to be able to round timestamps off to match the set transient cleanup frequency
     * so if a transient is set to expire at 1:17 pm for example, and our cleanup schedule is every hour,
     * then that timestamp needs to be rounded up to 2:00 pm so that it is removed
     * during the next scheduled cleanup after its expiration.
     * We also round off the current time timestamp to the closest 5 minutes
     * just to make the timestamps a little easier to round which helps with debugging.
     *
     * @param int    $timestamp         [required] the timestamp to round
     * @param string $cleanup_frequency one of the FREQUENCY_* constants
     * @param bool   $round_up          if true, then the timestamp is rounded up to the next interval
     * @return int
     */
    private function roundTimestamp(
        int $timestamp,
        string $cleanup_frequency = TransientCacheStorage::FREQUENCY_HOUR,
        bool $round_up = true
    ): int {
        $cleanup_frequency = $cleanup_frequency ?: $this->transient_cleanup_frequency;
        // in order to round the time to the closest xx minutes (or hours),
        // we take the minutes (or hours) portion of the timestamp and divide it by xx,
        // round down to a whole number, then multiply by xx to bring us almost back up to where we were
        // why round down ? so the minutes (or hours) don't go over 60 (or 24)
        // and bump the hour, which could bump the day, which could bump the month, etc,
        // which would be bad because we don't always want to round up,
        // but when we do we can easily achieve that by simply adding the desired offset,
        $minutes = '00';
        $hours   = 'H';
        switch ($cleanup_frequency) {
            case TransientCacheStorage::FREQUENCY_5_MINUTES:
                $minutes = floor((int) date('i', $timestamp) / 5) * 5;
                $minutes = str_pad($minutes, 2, '0', STR_PAD_LEFT);
                $offset  = MINUTE_IN_SECONDS * 5;
                break;
            case TransientCacheStorage::FREQUENCY_15_MINUTES:
                $minutes = floor((int) date('i', $timestamp) / 15) * 15;
                $minutes = str_pad($minutes, 2, '0', STR_PAD_LEFT);
                $offset  = MINUTE_IN_SECONDS * 15;
                break;
            case TransientCacheStorage::FREQUENCY_12_HOURS:
                $hours  = floor((int) date('H', $timestamp) / 12) * 12;
                $hours  = str_pad($hours, 2, '0', STR_PAD_LEFT);
                $offset = HOUR_IN_SECONDS * 12;
                break;
            case TransientCacheStorage::FREQUENCY_DAY:
                $hours  = '03'; // run cleanup at 3:00 am (or first site hit after that)
                $offset = DAY_IN_SECONDS;
                break;
            case TransientCacheStorage::FREQUENCY_HOUR:
            default:
                $offset = HOUR_IN_SECONDS;
                break;
        }
        $rounded_timestamp = (int) strtotime(date("Y-m-d $hours:$minutes:00", $timestamp));
        $rounded_timestamp += $round_up ? $offset : 0;
        return (int) apply_filters(
            'FHEE__TransientCacheStorage__roundTimestamp__timestamp',
            $rounded_timestamp,
            $timestamp,
            $cleanup_frequency,
            $round_up
        );
    }


    /**
     * Saves supplied data to a transient
     * if an expiration is set, then it automatically schedules the transient for cleanup
     *
     * @param string $key        [required] the transient key to track
     * @param mixed  $data       [required] the data to store in the transient
     * @param int    $expiration number of seconds until the cache expires
     * @return bool
     */
    public function add(string $key, $data, int $expiration = 0): bool
    {
        $expiration = (int) abs($expiration);
        $saved      = set_transient($key, $data, $expiration);
        if ($saved && $expiration) {
            $this->scheduleTransientCleanup($key, $expiration);
        }
        return $saved;
    }


    /**
     * retrieves transient data
     * automatically triggers early cache refresh for standard cache items
     * in order to avoid cache stampedes on busy sites.
     * For non-standard cache items like PHP Session data where early refreshing is not wanted,
     * the $standard_cache parameter should be set to false when retrieving data
     *
     * @param string $key            [required] the transient key to track
     * @param bool   $standard_cache [optional] if true, then will trigger early cache refresh
     * @return string|null
     */
    public function get(string $key, bool $standard_cache = true): ?string
    {
        if (isset($this->transients[ $key ])) {
            // to avoid cache stampedes (AKA: dog piles) for standard cache items,
            // check if known cache expires within the next minute,
            // and if so, remove it from our tracking and return nothing.
            // this should trigger the cache content to be regenerated during this request,
            // while allowing any following requests to still access the existing cache
            // until it gets replaced with the refreshed content
            if (
                $standard_cache
                && $this->transients[ $key ] - time() <= MINUTE_IN_SECONDS
            ) {
                unset($this->transients[ $key ]);
                $this->updateTransients();
                return null;
            }

            // for non-standard cache items, remove the key from our tracking,
            // but proceed to retrieve the transient so that it also gets removed from the db
            if ($this->transients[ $key ] <= time()) {
                unset($this->transients[ $key ]);
                $this->updateTransients();
            }
        }

        $content = (string) get_transient($key);
        return $content ?: null;
    }


    /**
     * delete a single transient and remove tracking
     *
     * @param string $key [required] full or partial transient key to be deleted
     */
    public function delete(string $key)
    {
        $this->deleteMany([$key]);
    }


    /**
     * delete multiple transients and remove tracking
     *
     * @param array $keys           [required] array of full or partial transient keys to be deleted
     * @param bool  $force_delete   [optional] if true, then will not check incoming keys against those being tracked
     *                              and proceed directly to deleting those entries from the cache storage
     */
    public function deleteMany(array $keys, bool $force_delete = false)
    {
        $full_transient_keys = $force_delete ? $keys : [];
        if (empty($full_transient_keys)) {
            foreach ($this->transients as $transient_key => $expiration) {
                foreach ($keys as $transient_key_to_delete) {
                    if (strpos($transient_key, $transient_key_to_delete) !== false) {
                        $full_transient_keys[] = $transient_key;
                    }
                }
            }
        }
        if ($this->deleteTransientKeys($full_transient_keys)) {
            $this->updateTransients();
        }
    }


    /**
     * sorts transients numerically by timestamp
     * then saves the transient schedule to a WP option
     */
    private function updateTransients()
    {
        asort($this->transients, SORT_NUMERIC);
        update_option(
            TransientCacheStorage::TRANSIENT_SCHEDULE_OPTIONS_KEY,
            $this->transients
        );
    }


    /**
     * schedules a transient for cleanup by adding it to the transient tracking
     *
     * @param string $transient_key [required] the transient key to track
     * @param int    $expiration    [required] the timestamp when the transient should be cleaned up
     */
    private function scheduleTransientCleanup(string $transient_key, int $expiration)
    {
        // make sure a valid future timestamp is set
        $expiration += $expiration < time() ? time() : 0;
        // and round to the closest 15 minutes
        $expiration = $this->roundTimestamp($expiration);
        // save transients to clear using their ID as the key to avoid duplicates
        $this->transients[ $transient_key ] = $expiration;
        $this->updateTransients();
    }


    /**
     * Since our tracked transients are sorted by their timestamps
     * we can grab the first transient and see when it is scheduled for cleanup.
     * If that timestamp is less than or equal to the current time,
     * then cleanup is triggered
     */
    public function checkTransientCleanupSchedule()
    {
        if (empty($this->transients)) {
            return;
        }
        // when do we run the next cleanup job?
        reset($this->transients);
        $next_scheduled_cleanup = current($this->transients);
        // if the next cleanup job is scheduled for the current hour
        if ($next_scheduled_cleanup <= $this->current_time) {
            if ($this->cleanupExpiredTransients()) {
                $this->updateTransients();
            }
        }
    }


    /**
     * loops through the array of tracked transients,
     * compiles a list of those that have expired, and sends that list off for deletion.
     * Also removes any bad records from the transients array
     *
     * @return bool
     */
    private function cleanupExpiredTransients(): bool
    {
        $update = false;
        // filter the query limit. Set to 0 to turn off garbage collection
        $limit = (int) abs(
            apply_filters(
                'FHEE__TransientCacheStorage__clearExpiredTransients__limit',
                50
            )
        );
        // non-zero LIMIT means take out the trash
        if ($limit) {
            $transient_keys = [];
            foreach ($this->transients as $transient_key => $expiration) {
                if ($expiration > $this->current_time) {
                    continue;
                }
                if (! $expiration || ! $transient_key) {
                    unset($this->transients[ $transient_key ]);
                    $update = true;
                    continue;
                }
                $transient_keys[] = $transient_key;
            }
            // delete expired keys, but maintain value of $update if nothing is deleted
            $update = $this->deleteTransientKeys($transient_keys, $limit) ? true : $update;
            do_action('FHEE__TransientCacheStorage__clearExpiredTransients__end', $this);
        }
        return $update;
    }


    /**
     * calls delete_transient() on each transient key provided, up to the specified limit
     *
     * @param array $transient_keys [required] array of transient keys to delete
     * @param int   $limit          [optional] number of transients to delete per call
     * @return bool
     */
    private function deleteTransientKeys(array $transient_keys, int $limit = 50): bool
    {
        if (empty($transient_keys)) {
            return false;
        }
        $counter = 0;
        foreach ($transient_keys as $transient_key) {
            if ($counter === $limit) {
                break;
            }
            // remove any transient prefixes
            $transient_key = strpos($transient_key, '_transient_timeout_') === 0
                ? str_replace('_transient_timeout_', '', $transient_key)
                : $transient_key;
            $transient_key = strpos($transient_key, '_transient_') === 0
                ? str_replace('_transient_', '', $transient_key)
                : $transient_key;
            delete_transient($transient_key);
            unset($this->transients[ $transient_key ]);
            $counter++;
        }
        return $counter > 0;
    }
}
