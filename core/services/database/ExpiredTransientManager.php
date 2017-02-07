<?php
namespace EventEspresso\core\services\database;

use EE_Error;
use EventEspresso\core\exceptions\EntityConstructionException;
use WP_Error;
use wpdb;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ExpiredTransientManager
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ExpiredTransientManager
{

    /**
     * @var array $transients
     */
    private $transients = array();

    public function addTransientToClear($transient_key, $expiration = 0)
    {
        // since transient expiration timestamps are set in the future, we can compare against NOW
        $expiration = $expiration ? $expiration : time();
        $this->transients[ $expiration ][] = $transient_key;
    }

    public function clearExpiredTransients()
    {
        /** @type wpdb $wpdb */
        global $wpdb;
        // filter the query limit. Set to 0 to turn off garbage collection
        $limit = absint(
            apply_filters(
                'FHEE__EventEspresso_core_services_database_ExpiredTransientManager__clearExpiredTransients__limit',
                50
            )
        );
        // non-zero LIMIT means take out the trash
        if ($limit) {
            $cache_key = str_replace('_', '\_', CacheManager::CACHE_TRANSIENT_PREFIX);
            $cache_key = '\_transient\_timeout\_' . $cache_key . '%';
            $SQL = "
                SELECT option_name
                FROM {$wpdb->options}
                WHERE option_name
                REGEXP '{$cache_key}'
                AND option_value < {$expiration}
                LIMIT {$limit}
            ";
            $expired_cache = $wpdb->get_col($SQL);
            // valid results?
            if ( ! $expired_cache instanceof WP_Error && ! empty($expired_cache)) {
                // format array of results into something usable within the actual DELETE query's IN clause
                $expired = array();
                foreach ($expired_cache as $expired) {
                    $expired[] = "'" . $expired . "'";
                    $expired[] = "'" . str_replace('timeout_', '', $expired) . "'";
                }
                $expired = implode(', ', $expired);
                $SQL = "
                    DELETE FROM {$wpdb->options}
                    WHERE option_name
                    IN ( $expired );
                ";
                $results = $wpdb->query($SQL);
                // if something went wrong, then notify the admin
                if ($results instanceof WP_Error && is_admin()) {
                    EE_Error::add_error($results->get_error_message(), __FILE__, __FUNCTION__, __LINE__);
                }
            }
            do_action(
                'FHEE__EventEspresso_core_services_database_ExpiredTransientManager__clearExpiredTransients__limit',
                $limit
            );
        }
    }


}
// End of file ExpiredTransientManager.php
// Location: EventEspresso\core\services\database/ExpiredTransientManager.php