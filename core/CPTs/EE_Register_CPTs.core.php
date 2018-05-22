<?php

use EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions;
use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomyTerms;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EE_Register_CPTs
 *
 * @package               Event Espresso
 * @subpackage            includes/core/
 * @author                Darren Ethier
 * @deprecated            4.9.62.p
 */
class EE_Register_CPTs
{


    /**
     * instantiated at init priority 5
     *
     * @deprecated 4.9.62.p
     */
    public function __construct()
    {
        do_action('AHEE__EE_Register_CPTs__construct_end', $this);
    }


    /**
     * This will flush rewrite rules on demand.  This actually gets called around wp init priority level 100.
     *
     * @deprecated 4.9.62.p
     * @return void
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public static function maybe_flush_rewrite_rules()
    {
        /** @var EventEspresso\core\domain\services\custom_post_types\RewriteRules $rewrite_rules */
        $rewrite_rules = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RewriteRules'
        );
        $rewrite_rules->flushRewriteRules();
    }


    /**
     * @return CustomTaxonomyDefinitions
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getTaxonomyDefinitions()
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions'
        );
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $description The description content.
     * @param string $taxonomy    The taxonomy name for the taxonomy being filtered.
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function ee_filter_ee_term_description_not_wp($description, $taxonomy)
    {
        $taxonomies = EE_Register_CPTs::getTaxonomyDefinitions();
        return $taxonomies->filterCustomTermDescription($description, $taxonomy);
    }


    /**
     * @deprecated 4.9.62.p
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_taxonomies()
    {
        $taxonomies = EE_Register_CPTs::getTaxonomyDefinitions();
        return $taxonomies->getCustomTaxonomyDefinitions();
    }


    /**
     * @return CustomPostTypeDefinitions
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getCustomPostTypeDefinitions()
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'
        );
    }


    /**
     * @deprecated 4.9.62.p
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_CPTs()
    {
        $custom_post_types = EE_Register_CPTs::getCustomPostTypeDefinitions();
        return $custom_post_types->getDefinitions();
    }


    /**
     * @deprecated 4.9.62.p
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_private_CPTs()
    {
        $custom_post_types = EE_Register_CPTs::getCustomPostTypeDefinitions();
        return $custom_post_types->getPrivateCustomPostTypes();
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $post_type_slug              If a slug is included, then attempt to retrieve the model name for
     *                                            the given cpt slug.  Otherwise if empty, then we'll return all cpt
     *                                            model names for cpts registered in EE.
     * @return array           Empty array if no matching model names for the given slug or an array of model
     *                                            names indexed by post type slug.
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_cpt_model_names($post_type_slug = '')
    {
        $custom_post_types = EE_Register_CPTs::getCustomPostTypeDefinitions();
        return $custom_post_types->getCustomPostTypeModelNames($post_type_slug);
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $post_type_slug If valid slug is provided, then will instantiate the model only for
     *                               the cpt matching the given slug.  Otherwise all cpt models will be
     *                               instantiated (if possible).
     * @return EEM_CPT_Base[]        successful instantiation will return an array of successfully instantiated
     *                               EEM models indexed by post slug.
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function instantiate_cpt_models($post_type_slug = '')
    {
        $custom_post_types = EE_Register_CPTs::getCustomPostTypeDefinitions();
        return $custom_post_types->getCustomPostTypeModels($post_type_slug);
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $taxonomy_name , eg 'books'
     * @param string $singular_name internationalized singular name
     * @param string $plural_name   internationalized plural name
     * @param array  $override_args like $args on http://codex.wordpress.org/Function_Reference/register_taxonomy
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws DomainException
     */
    public function register_taxonomy($taxonomy_name, $singular_name, $plural_name, $override_args = array())
    {
        /** @var \EventEspresso\core\domain\services\custom_post_types\registerCustomTaxonomies $taxonomies */
        $taxonomies = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomies'
        );
        $taxonomies->registerCustomTaxonomy(
            $taxonomy_name,
            $singular_name,
            $plural_name,
            $override_args
        );
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $post_type     the actual post type name
     *                              (VERY IMPORTANT: this much match what the slug is for admin pages related to this
     *                              cpt Also any models must use this slug as well)
     * @param string $singular_name a pre-internationalized string for the singular name of the objects
     * @param string $plural_name   a pre-internalized string for the plural name of the objects
     * @param array  $override_args exactly like $args as described in
     *                              http://codex.wordpress.org/Function_Reference/register_post_type The default values
     *                              set in this function will be overridden by whatever you set in $override_args
     * @param string $singular_slug
     * @param string $plural_slug
     * @return void , but registers the custom post type
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws DomainException
     */
    public function register_CPT(
        $post_type,
        $singular_name,
        $plural_name,
        $override_args = array(),
        $singular_slug = '',
        $plural_slug = ''
    ) {
        /** @var \EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes $register_custom_post_types */
        $register_custom_post_types = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes'
        );
        $register_custom_post_types->registerCustomPostType(
            $post_type,
            $singular_name,
            $plural_name,
            $singular_slug,
            $plural_slug,
            $override_args
        );
    }


    /**
     * @return RegisterCustomTaxonomyTerms
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getRegisterCustomTaxonomyTerms()
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomyTerms'
        );
    }


    /**
     * @deprecated 4.9.62.p
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_must_use_event_types()
    {
        $register_custom_taxonomy_terms = EE_Register_CPTs::getRegisterCustomTaxonomyTerms();
        $register_custom_taxonomy_terms->setMustUseEventTypes();
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $taxonomy     The name of the taxonomy
     * @param array  $term_details An array of term details indexed by slug and containing Name of term, and
     *                             description as the elements in the array
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_must_use_terms($taxonomy, $term_details)
    {
        $register_custom_taxonomy_terms = EE_Register_CPTs::getRegisterCustomTaxonomyTerms();
        $register_custom_taxonomy_terms->setMustUseTerms($taxonomy, $term_details);
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $taxonomy  The taxonomy we're using for the default term
     * @param string $term_slug The slug of the term that will be the default.
     * @param array  $cpt_slugs An array of custom post types we want the default assigned to
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_default_term($taxonomy, $term_slug, $cpt_slugs = array())
    {
        $register_custom_taxonomy_terms = EE_Register_CPTs::getRegisterCustomTaxonomyTerms();
        $register_custom_taxonomy_terms->registerCustomTaxonomyTerm(
            $taxonomy,
            $term_slug,
            $cpt_slugs
        );
    }


    /**
     * @deprecated 4.9.62.p
     * @param  int     $post_id ID of CPT being saved
     * @param  WP_Post $post    Post object
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function save_default_term($post_id, $post)
    {
        $register_custom_taxonomy_terms = EE_Register_CPTs::getRegisterCustomTaxonomyTerms();
        $register_custom_taxonomy_terms->saveDefaultTerm($post_id, $post);
    }
}

/**
 * This is just a utility object for holding the settings of a default term that gets used in the wp 'save_post' hook
 * when a particular custom post type is published.
 *
 * @deprecated 4.9.62.p
 */
class EE_Default_Term
{

    // props holding the items
    public $taxonomy = '';

    public $cpt_slugs = array();

    public $term_slug = '';


    /**
     * @deprecated 4.9.62.p
     * @param string $taxonomy  The taxonomy the default term belongs to
     * @param string $term_slug The slug of the term that will be the default.
     * @param array  $cpt_slugs The custom post type the default term gets saved with
     */
    public function __construct($taxonomy, $term_slug, $cpt_slugs = array())
    {
        $this->taxonomy = $taxonomy;
        $this->cpt_slugs = (array) $cpt_slugs;
        $this->term_slug = $term_slug;
    }
}
