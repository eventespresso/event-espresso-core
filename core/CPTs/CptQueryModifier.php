<?php

namespace EventEspresso\core\CPTs;

use EE_CPT_Attendee_Strategy;
use EE_CPT_Default_Strategy;
use EE_CPT_Event_Strategy;
use EE_CPT_Strategy;
use EE_CPT_Venue_Strategy;
use EE_Error;
use EE_Request_Handler;
use EE_Secondary_Table;
use EE_Table_Base;
use EEM_CPT_Base;
use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\modules\ModuleRoutesManager;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\RequestInterface;
use WP_Post;
use WP_Query;

/**
 * Class CptQueryModifier
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 */
class CptQueryModifier
{
    protected CurrentPage $current_page;

    protected LoaderInterface $loader;

    protected RequestInterface $request;

    protected WP_Query $wp_query;

    protected ?EEM_CPT_Base $model = null;

    /**
     * meta table for the related CPT
     */
    protected ?EE_Secondary_Table $meta_table = null;

    protected ?EE_Request_Handler $request_handler = null;

    protected string $post_type = '';

    /**
     * @var EE_CPT_Attendee_Strategy|EE_CPT_Default_Strategy|EE_CPT_Event_Strategy|EE_CPT_Venue_Strategy|null
     */
    protected $cpt_strategy = null;

    /**
     * CPT details from CustomPostTypeDefinitions for specific post type
     *
     * @var array $cpt_details
     */
    protected array $cpt_details = [];

    /**
     * @var EE_Table_Base[] $model_tables
     */
    protected array $model_tables = [];

    protected array $taxonomies = [];


    /**
     * CptQueryModifier constructor
     *
     * @param string           $post_type
     * @param array            $cpt_details
     * @param WP_Query         $wp_query
     * @param CurrentPage      $current_page
     * @param RequestInterface $request
     * @param LoaderInterface  $loader
     * @throws EE_Error
     */
    public function __construct(
        string $post_type,
        array $cpt_details,
        WP_Query $wp_query,
        CurrentPage $current_page,
        RequestInterface $request,
        LoaderInterface $loader
    ) {
        $this->loader       = $loader;
        $this->request      = $request;
        $this->current_page = $current_page;
        $this->setWpQuery($wp_query);
        $this->setPostType($post_type);
        $this->setCptDetails($cpt_details);
        $this->init();
    }


    public function postType(): string
    {
        return $this->post_type;
    }


    protected function setPostType(string $post_type)
    {
        $this->post_type = $post_type;
    }


    public function cptDetails(): array
    {
        return $this->cpt_details;
    }


    protected function setCptDetails(array $cpt_details)
    {
        $this->cpt_details = $cpt_details;
    }


    /**
     * @return EE_Table_Base[]
     */
    public function modelTables(): array
    {
        return $this->model_tables;
    }


    /**
     * @param EE_Table_Base[] $model_tables
     */
    protected function setModelTables(array $model_tables)
    {
        $this->model_tables = $model_tables;
    }


    public function taxonomies(): array
    {
        if (empty($this->taxonomies)) {
            $this->initializeTaxonomies();
        }
        return $this->taxonomies;
    }


    protected function setTaxonomies(array $taxonomies)
    {
        $this->taxonomies = $taxonomies;
    }


    public function metaTable(): ?EE_Secondary_Table
    {
        return $this->meta_table;
    }


    public function setMetaTable(EE_Secondary_Table $meta_table)
    {
        $this->meta_table = $meta_table;
    }


    public function model(): ?EEM_CPT_Base
    {
        return $this->model;
    }


    protected function setModel(EEM_CPT_Base $CPT_model)
    {
        $this->model = $CPT_model;
    }


    /**
     * @return EE_Request_Handler
     * @deprecated 4.9.63.p
     */
    public function request(): ?EE_Request_Handler
    {
        if (! $this->request_handler instanceof EE_Request_Handler) {
            $this->request_handler = LoaderFactory::getLoader()->getShared('EE_Request_Handler');
        }
        return $this->request_handler;
    }


    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps


    public function WpQuery(): WP_Query
    {
        return $this->wp_query;
    }


    // phpcs:enable


    public function setWpQuery(WP_Query $wp_query)
    {
        $this->wp_query = $wp_query;
    }


    protected function initializeTaxonomies()
    {
        // check if taxonomies have already been set and that this CPT has taxonomies registered for it
        if (
            empty($this->taxonomies)
            && isset($this->cpt_details['args']['taxonomies'])
        ) {
            // if so then grab them, but we want the taxonomy name as the key
            $taxonomies = array_flip($this->cpt_details['args']['taxonomies']);
            // then grab the list of ALL taxonomies
            /** @var CustomTaxonomyDefinitions $taxonomy_definitions */
            $taxonomy_definitions = $this->loader->getShared(CustomTaxonomyDefinitions::class);
            $all_taxonomies       = $taxonomy_definitions->getCustomTaxonomyDefinitions();
            foreach ($taxonomies as $taxonomy => &$details) {
                // add details to our taxonomies if they exist
                $details = $all_taxonomies[ $taxonomy ] ?? [];
            }
            // ALWAYS unset() variables that were passed by reference
            unset($details);
            $this->setTaxonomies($taxonomies);
        }
    }


    /**
     * @throws EE_Error
     * @since 4.9.63.p
     */
    protected function init()
    {
        $this->setAdditionalCptDetails();
        $this->setRequestVarsIfCpt();
        // convert post_type to model name
        $model_name = str_replace('EE_', '', $this->cpt_details['class_name']);
        // load all tables related to CPT
        $this->setupModelsAndTables($model_name);
        // load and instantiate CPT_*_Strategy
        $this->cpt_strategy = $this->cpt_strategy === null
            ? $this->cptStrategyClass($model_name)
            : $this->cpt_strategy;
        // !!!!!!!!!!  IMPORTANT !!!!!!!!!!!!
        // here's the list of available filters in the WP_Query object
        // 'posts_where_paged'
        // 'posts_groupby'
        // 'posts_join_paged'
        // 'posts_orderby'
        // 'posts_distinct'
        // 'post_limits'
        // 'posts_fields'
        // 'posts_join'
        add_filter('posts_fields', [$this, 'postsFields'], 10, 2);
        add_filter('posts_join', [$this, 'postsJoin'], 10, 2);
        add_filter('the_posts', [$this, 'thePosts'], 1, 2);
        if ($this->wp_query->is_main_query()) {
            add_filter('get_edit_post_link', [$this, 'getEditPostLink'], 10, 2);
            $this->addTemplateFilters();
        }
    }


    /**
     * sets some basic query vars that pertain to the CPT
     *
     * @return void
     */
    protected function setAdditionalCptDetails()
    {
        // the post or category or term that is triggering EE
        $this->cpt_details['espresso_page'] = $this->current_page->isEspressoPage();
        // requested post name
        $this->cpt_details['post_name'] = $this->request->getRequestParam('post_name');
        // add support for viewing 'private', 'draft', or 'pending' posts
        if (
            isset($this->wp_query->query_vars['p'])
            && $this->wp_query->query_vars['p'] !== 0
            && is_user_logged_in()
            && current_user_can('edit_post', $this->wp_query->query_vars['p'])
        ) {
            // we can just inject directly into the WP_Query object
            $this->wp_query->query['post_status'] = ['publish', 'private', 'draft', 'pending'];
            // now set the main 'ee' request var so that the appropriate module can load the appropriate template(s)
            $this->request->setRequestParam('ee', $this->cpt_details['singular_slug']);
        }
    }


    /**
     * Checks if we're on a EE-CPT archive-or-single page, and if we've never set the EE request var.
     * If so, sets the 'ee' request variable
     * so other parts of EE can know what CPT is getting queried.
     * To Mike's knowledge, this must be called from during or after the pre_get_posts hook
     * in order for is_archive() and is_single() methods to work properly.
     *
     * @return void
     */
    public function setRequestVarsIfCpt()
    {
        // check if ee action var has been set
        if (! $this->request->requestParamIsSet('ee')) {
            /** @var ModuleRoutesManager $module_routes_manager */
            $module_routes_manager = $this->loader->getShared(ModuleRoutesManager::class);
            // check that route exists for CPT archive slug
            if (is_archive() && $module_routes_manager->getRoute($this->cpt_details['plural_slug'])) {
                // ie: set "ee" to "events"
                $this->request->setRequestParam('ee', $this->cpt_details['plural_slug']);
                // or does it match a single page CPT like /event/
            } elseif (is_single() && $module_routes_manager->getRoute($this->cpt_details['singular_slug'])) {
                // ie: set "ee" to "event"
                $this->request->setRequestParam('ee', $this->cpt_details['singular_slug']);
            }
        }
    }


    /**
     * setupModelsAndTables
     *
     * @param string $model_name
     * @throws EE_Error
     */
    protected function setupModelsAndTables(string $model_name)
    {
        // get CPT table data via CPT Model
        $full_model_name = strpos($model_name, 'EEM_') !== 0
            ? 'EEM_' . $model_name
            : $model_name;
        $model           = $this->loader->getShared($full_model_name);
        if (! $model instanceof EEM_CPT_Base) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'The "%1$s" model could not be loaded.',
                        'event_espresso'
                    ),
                    $full_model_name
                )
            );
        }
        $this->setModel($model);
        $this->setModelTables($this->model->get_tables());
        $meta_model = $model_name . '_Meta';
        // is there a Meta Table for this CPT?
        if (
            isset($this->cpt_details['tables'][ $meta_model ])
            && $this->cpt_details['tables'][ $meta_model ] instanceof EE_Secondary_Table
        ) {
            $this->setMetaTable($this->cpt_details['tables'][ $meta_model ]);
        }
    }


    /**
     * cptStrategyClass
     *
     * @param string $model_name
     * @return EE_CPT_Event_Strategy|EE_CPT_Attendee_Strategy|EE_CPT_Default_Strategy|EE_CPT_Venue_Strategy
     */
    protected function cptStrategyClass(string $model_name)
    {
        // creates classname like:  CPT_Event_Strategy
        $CPT_Strategy_class_name = 'EE_CPT_' . $model_name . '_Strategy';
        // load and instantiate
        $CPT_Strategy = $this->loader->getShared($CPT_Strategy_class_name, [$this->wp_query, $this->cpt_details]);
        if ($CPT_Strategy === null) {
            $CPT_Strategy = $this->loader->getShared('EE_CPT_Default_Strategy', [$this->wp_query, $this->cpt_details]);
        }
        return $CPT_Strategy;
    }


    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     */
    public function postsFields(string $SQL, WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== $this->post_type) {
            return $SQL;
        }
        // does this CPT have a meta table ?
        if ($this->meta_table instanceof EE_Secondary_Table) {
            // adds something like ", wp_esp_event_meta.* " to WP Query SELECT statement
            $SQL .= ', ' . $this->meta_table->get_table_name() . '.* ';
        }
        remove_filter('posts_fields', [$this, 'postsFields']);
        return $SQL;
    }


    /**
     * @param string $SQL
     * @param WP_Query $wp_query
     * @return string
     */
    public function postsJoin(string $SQL, WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== $this->post_type) {
            return $SQL;
        }
        // does this CPT have a meta table ?
        if ($this->meta_table instanceof EE_Secondary_Table) {
            global $wpdb;
            // adds something like " LEFT JOIN wp_esp_event_meta ON ( wp_esp_event_meta.EVT_ID = wp_posts.ID ) " to WP Query JOIN statement
            $posts_table = $wpdb->posts;
            $meta_table = $this->meta_table->get_table_name();
            $foreign_key = $this->meta_table->get_fk_on_table();
            $SQL .= " LEFT JOIN $meta_table ON ( $meta_table.$foreign_key = $posts_table.ID ) ";
        }
        remove_filter('posts_join', [$this, 'postsJoin']);
        return $SQL;
    }


    /**
     * thePosts
     *
     * @param WP_Post[] $posts
     * @param WP_Query  $wp_query
     * @return WP_Post[]
     */
    public function thePosts(array $posts, WP_Query $wp_query): array
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== $this->post_type) {
            return $posts;
        }
        $CPT_class = $this->cpt_details['class_name'];
        // loop thru posts
        if ($this->model instanceof EEM_CPT_Base) {
            foreach ($posts as $post) {
                if ($post->post_type === $this->post_type) {
                    $post->{$CPT_class} = $this->model->instantiate_class_from_post_object($post);
                }
            }
        }
        remove_filter('the_posts', [$this, 'thePosts'], 1);
        return $posts;
    }


    /**
     * @param string|null $url
     * @param int    $ID
     * @return null|string
     */
    public function getEditPostLink(?string $url, int $ID): ?string
    {
        // need to make sure we only edit links if our cpt
        global $post;
        // notice if the cpt is registered with `show_ee_ui` set to false, we take that to mean that the WordPress core ui
        // for interacting with the CPT is desired and there is no EE UI for interacting with the CPT in the admin.
        if (
            ! $post instanceof WP_Post
            || $post->post_type !== $this->post_type
            || (
                isset($this->cpt_details['args']['show_ee_ui'])
                && ! $this->cpt_details['args']['show_ee_ui']
            )
        ) {
            return $url;
        }
        // k made it here so all is good.
        return wp_nonce_url(
            add_query_arg(
                ['page' => $this->post_type, 'post' => $ID, 'action' => 'edit'],
                admin_url('admin.php')
            ),
            'edit',
            'edit_nonce'
        );
    }


    /**
     * Execute any template filters.
     * This method is only called if in main query.
     *
     * @return void
     */
    public function addTemplateFilters()
    {
        // if requested cpt supports page_templates and it's the main query
        if (! empty($this->cpt_details['args']['page_templates']) && $this->wp_query->is_main_query()) {
            // then let's hook into the appropriate query_template hook
            add_filter('single_template', [$this, 'singleCptTemplate']);
        }
    }


    /**
     * Callback for single_template wp filter.
     * This is used to load the set page_template for a single ee cpt if its set.  If "default" then we load the normal
     * hierarchy.
     *
     * @param string $current_template Existing default template path derived for this page call.
     * @return string the path to the full template file.
     */
    public function singleCptTemplate(string $current_template): string
    {
        $object = get_queried_object();
        // does this called object HAVE a page template set that is something other than the default.
        $template = get_post_meta($object->ID, '_wp_page_template', true);
        // exit early if default or not set or invalid path (accounts for theme changes)
        if (
            $template === 'default'
            || empty($template)
            || ! is_readable(get_stylesheet_directory() . '/' . $template)
        ) {
            return $current_template;
        }
        // made it here so we SHOULD be able to just locate the template and then return it.
        return locate_template([$template]);
    }
}
