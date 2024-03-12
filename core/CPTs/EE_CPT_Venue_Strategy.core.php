<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 * EE_CPT_Venue_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
class EE_CPT_Venue_Strategy
{
    /**
     * $CPT - the current page, if it utilizes CPTs
     *
     * @var array|null
     */
    protected ?array $CPT = null;


    /**
     * @param array|WP_Query|null $wp_query
     * @param array               $CPT
     */
    public function __construct($wp_query, array $CPT = [])
    {
        if (is_array($wp_query) && $wp_query['WP_Query'] instanceof WP_Query) {
            $this->CPT = $wp_query['CPT'] ?? $CPT;
            $wp_query  = $wp_query['WP_Query'];
        } else {
            $this->CPT = $CPT;
        }
        if ($wp_query instanceof WP_Query && ! $wp_query->is_tag) {
            $wp_query->is_espresso_venue_single   = is_singular()
                && (
                    (isset($wp_query->query->post_type) && $wp_query->query->post_type === EspressoPostType::VENUES)
                    || (isset($wp_query->query['post_type']) && $wp_query->query['post_type'] === EspressoPostType::VENUES)
                );
            $wp_query->is_espresso_venue_archive  = is_post_type_archive(EspressoPostType::VENUES);
            $wp_query->is_espresso_venue_taxonomy = is_tax('espresso_venue_categories');
        }
        add_filter('the_posts', [$this, 'the_posts'], 1, 2);
    }


    /**
     * @param array    $posts
     * @param WP_Query $wp_query
     * @return array
     */
    public function the_posts(array $posts, WP_Query $wp_query): array
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== EspressoPostType::VENUES) {
            return $posts;
        }
        // automagically load the EEH_Venue_View helper so that it's functions are available
        if (
            isset(EE_Registry::instance()->CFG->map_settings->use_google_maps)
            && EE_Registry::instance()->CFG->map_settings->use_google_maps
        ) {
            EEH_Maps::espresso_google_map_js();
        }
        remove_filter('the_posts', [$this, 'the_posts'], 1);
        return $posts;
    }
}
