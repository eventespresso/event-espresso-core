<?php

use EventEspresso\core\CPTs\CptQueryModifier;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions;
use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * CPT_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
class EE_CPT_Strategy extends EE_Base
{
    private static ?EE_CPT_Strategy $_instance = null;

    protected ?EEM_CPT_Base $CPT_model = null;

    /**
     * @var CptQueryModifier[]
     */
    protected array $query_modifier = [];

    /**
     * the current page, if it utilizes CPTs
     */
    protected array $CPT = [];

    /**
     * return value from CustomPostTypeDefinitions::getDefinitions()
     */
    protected array $_CPTs = [];

    protected array $_CPT_taxonomies = [];

    protected array $_CPT_terms = [];

    protected array $_CPT_endpoints = [];


    /**
     * @singleton method used to instantiate class object
     * @param CustomPostTypeDefinitions|null $custom_post_types
     * @param CustomTaxonomyDefinitions|null $taxonomies
     * @return EE_CPT_Strategy
     */
    public static function instance(
        CustomPostTypeDefinitions $custom_post_types = null,
        CustomTaxonomyDefinitions $taxonomies = null
    ): EE_CPT_Strategy {
        // check if class object is instantiated
        if (
            ! self::$_instance instanceof EE_CPT_Strategy
            && $custom_post_types instanceof CustomPostTypeDefinitions
            && $taxonomies instanceof CustomTaxonomyDefinitions
        ) {
            self::$_instance = new self($custom_post_types, $taxonomies);
        }
        return self::$_instance;
    }


    /**
     * @param CustomPostTypeDefinitions $custom_post_types
     * @param CustomTaxonomyDefinitions $taxonomies
     */
    protected function __construct(
        CustomPostTypeDefinitions $custom_post_types,
        CustomTaxonomyDefinitions $taxonomies
    ) {
        // get CPT data
        $this->_CPTs           = $custom_post_types->getDefinitions();
        $this->_CPT_endpoints  = $this->_set_CPT_endpoints();
        $this->_CPT_taxonomies = $taxonomies->getCustomTaxonomyDefinitions();
        add_action('pre_get_posts', [$this, 'pre_get_posts'], 5);
    }


    /**
     * @return array
     */
    public function get_CPT_endpoints(): array
    {
        return $this->_CPT_endpoints;
    }


    /**
     * @return array
     */
    public function get_CPT_taxonomies(): array
    {
        return $this->_CPT_taxonomies;
    }


    /**
     * add CPT "slugs" to array of default espresso "pages"
     *
     * @return array
     */
    private function _set_CPT_endpoints(): array
    {
        $_CPT_endpoints = [];
        foreach ($this->_CPTs as $CPT_type => $CPT) {
            if (isset($CPT['plural_slug'])) {
                $_CPT_endpoints [ (string) $CPT['plural_slug'] ] = $CPT_type;
            }
        }
        return $_CPT_endpoints;
    }


    public function wpQueryPostType(?WP_Query $wp_query): string
    {
        if (! $wp_query instanceof WP_Query) {
            return '';
        }
        // cuz WP_Query is a mess and doesn't always have the post_type set in the same place
        $post_type = $wp_query->query->post_type ?? '';
        $post_type = $wp_query->query['post_type'] ?? $post_type;
        $post_type = $wp_query->query_vars['post_type'] ?? $post_type;
        return is_array($post_type) ? (string) reset($post_type) : (string) $post_type;
    }


    public function isEspressoPostType(WP_Query $wp_query): bool
    {
        $post_type = $this->wpQueryPostType($wp_query);
        return isset($this->_CPTs[ $post_type ]);
    }


    /**
     * If this query (not just "main" queries (ie, for WP's infamous "loop")) is for an EE CPT, then we want to
     * supercharge the get_posts query to add our EE stuff (like joining to our tables, selecting extra columns, and
     * adding EE objects to the post to facilitate further querying of related data etc)
     *
     * @param WP_Query $wp_query
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function pre_get_posts(WP_Query $wp_query)
    {
        // add our conditionals
        $this->_set_EE_tags_on_WP_Query($wp_query);
        // check for terms
        $this->_set_post_type_for_terms($wp_query);
        // make sure paging is always set
        $this->_set_paging($wp_query);
        // is a taxonomy set ?
        $this->_set_CPT_taxonomies_on_WP_Query($wp_query);
        // loop thru post_types if set
        $this->_process_WP_Query_post_types($wp_query);
    }


    /**
     * @param WP_Query $wp_query
     * @return void
     */
    private function _set_EE_tags_on_WP_Query(WP_Query $wp_query)
    {
        $wp_query->is_espresso_event_single   = false;
        $wp_query->is_espresso_event_archive  = false;
        $wp_query->is_espresso_event_taxonomy = false;
        $wp_query->is_espresso_venue_single   = false;
        $wp_query->is_espresso_venue_archive  = false;
        $wp_query->is_espresso_venue_taxonomy = false;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _set_CPT_terms()
    {
        if (empty($this->_CPT_terms)) {
            $terms = EEM_Term::instance()->get_all_CPT_post_tags();
            foreach ($terms as $term) {
                if ($term instanceof EE_Term) {
                    $this->_CPT_terms[ $term->slug() ] = $term;
                }
            }
        }
    }


    /**
     * @param WP_Query $wp_query
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _set_post_type_for_terms(WP_Query $wp_query)
    {
        // is a tag set ?
        if (! isset($wp_query->query['tag'])) {
            return;
        }
        // get term for tag
        $term = EEM_Term::instance()->get_post_tag_for_event_or_venue($wp_query->query['tag']);
        // verify the term
        if (! $term instanceof EE_Term) {
            return;
        }
        // set post_type from term
        $term->post_type = (array) apply_filters(
            'FHEE__EE_CPT_Strategy___set_post_type_for_terms__term_post_type',
            array_merge(['post', 'page'], $term->post_type),
            $term
        );
        // if a post type is already set
        if (isset($wp_query->query_vars['post_type'])) {
            // add to existing array
            $term->post_type = array_merge((array) $wp_query->query_vars['post_type'], $term->post_type);
        }
        // just set post_type to our CPT
        $wp_query->set('post_type', array_unique($term->post_type));
    }


    /**
     * @param WP_Query $wp_query
     * @return void
     */
    public function _set_paging(WP_Query $wp_query)
    {
        if ($wp_query->is_main_query() && apply_filters('FHEE__EE_CPT_Strategy___set_paging', true)) {
            $page  = get_query_var('page') ? get_query_var('page') : null;
            $paged = get_query_var('paged') ? get_query_var('paged') : $page;
            $wp_query->set('paged', $paged);
        }
    }


    /**
     * @param WP_Query $wp_query
     */
    protected function _set_CPT_taxonomies_on_WP_Query(WP_Query $wp_query)
    {
        // is a taxonomy set ?
        if (! $wp_query->is_tax) {
            return;
        }
        // loop thru our taxonomies
        foreach ($this->_CPT_taxonomies as $CPT_taxonomy => $CPT_taxonomy_details) {
            // check if one of our taxonomies is set as a query var
            if (! isset($wp_query->query[ $CPT_taxonomy ])) {
                continue;
            }
            // but which CPT does that correspond to??? hmmm... guess we gotta go looping
            foreach ($this->_CPTs as $post_type => $CPT) {
                // verify our CPT has args, is public and has taxonomies set
                if (
                    ! isset($CPT['args']['public'])
                    || ! $CPT['args']['public']
                    || empty($CPT['args']['taxonomies'])
                    || ! in_array($CPT_taxonomy, $CPT['args']['taxonomies'], true)
                ) {
                    continue;
                }
                // if so, then add this CPT post_type to the current query's array of post_types'
                $wp_query->query_vars['post_type']   = isset($wp_query->query_vars['post_type'])
                    ? (array) $wp_query->query_vars['post_type']
                    : [];
                $wp_query->query_vars['post_type'][] = $post_type;
                switch ($post_type) {
                    case EspressoPostType::EVENTS:
                        $wp_query->is_espresso_event_taxonomy = true;
                        break;

                    case EspressoPostType::VENUES:
                        $wp_query->is_espresso_venue_taxonomy = true;
                        break;

                    default:
                        do_action(
                            'AHEE__EE_CPT_Strategy___set_CPT_taxonomies_on_WP_Query__for_' . $post_type . '_post_type',
                            $wp_query,
                            $this
                        );
                }
            }
        }
    }


    /**
     * @param WP_Query $wp_query
     */
    protected function _process_WP_Query_post_types(WP_Query $wp_query)
    {
        if (! isset($wp_query->query_vars['post_type'])) {
            return;
        }
        // loop thru post_types as array
        foreach ((array) $wp_query->query_vars['post_type'] as $post_type) {
            // is current query for an EE CPT ?
            if (! isset($this->_CPTs[ $post_type ])) {
                continue;
            }
            // is EE on or off ?
            if (MaintenanceStatus::isNotDisabled()) {
                // reroute CPT template view to maintenance_mode.template.php
                if (! has_filter('template_include', ['EE_Maintenance_Mode', 'template_include'])) {
                    add_filter('template_include', ['EE_Maintenance_Mode', 'template_include'], 99999);
                }
                if (has_filter('the_content', [EE_Maintenance_Mode::instance(), 'the_content'])) {
                    add_filter('the_content', [$this, 'inject_EE_shortcode_placeholder'], 1);
                }
                return;
            }
            $this->_generate_CptQueryModifier($wp_query, $post_type);
        }
    }


    /**
     * @param WP_Query $wp_query
     * @param string   $post_type
     */
    protected function _generate_CptQueryModifier(WP_Query $wp_query, string $post_type)
    {
        if (
            isset($this->query_modifier[ $post_type ])
            && $this->query_modifier[ $post_type ] instanceof CptQueryModifier
        ) {
            return;
        }
        $this->query_modifier[ $post_type ] = LoaderFactory::getLoader()->getShared(
            CptQueryModifier::class,
            [
                $post_type,
                $this->_CPTs[ $post_type ],
                $wp_query,
            ]
        );
        $this->_CPT_taxonomies              = $this->query_modifier[ $post_type ]->taxonomies();
    }


    /**
     * inject_EE_shortcode_placeholder
     * in order to display the M-Mode notice on our CPT routes,
     * we need to first inject what looks like one of our shortcodes,
     * so that it can be replaced with the actual M-Mode notice
     *
     * @return string
     */
    public function inject_EE_shortcode_placeholder(): string
    {
        return '[ESPRESSO_';
    }
}
