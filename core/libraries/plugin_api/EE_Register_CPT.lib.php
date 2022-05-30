<?php

use EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomyTerms;

/**
 * Use this to register or deregister a new custom post type or custom taxonomy for the EE CPT system.
 *
 * @package          Event Espresso
 * @subpackage       plugin api, custom post type, custom taxonomy
 * @since            4.5.0
 * @author           Darren Ethier
 */
class EE_Register_CPT implements EEI_Plugin_API
{
    /**
     * Holds values for registered variations
     *
     * @since 4.5.0
     *
     * @var array[][][]
     */
    protected static $_registry = [];


    /**
     * Used to register new CPTs and Taxonomies.
     *
     * @param string $identifier              reference used for the addon registering cpts and cts
     * @param array  $setup_args              {
     *                                        An array of required values for registering the cpts and taxonomies
     * @type array   $cpts                    {
     *                                        An array of cpts and their arguments.(short example below)
     * @return void
     * @throws  EE_Error
     * @see CustomPostTypeDefinitions::setDefinitions for a more complete example.
     *                                        'people' => array(
     *                                        'singular_name' => esc_html__('People', 'event_espresso'),
     *                                        'plural_name' => esc_html__('People', 'event_espresso'),
     *                                        'singular_slug' => esc_html__('people', 'event_espresso'),
     *                                        'plural_slug' => esc_html__('peoples', 'event_espresso'),
     *                                        'class_name' => 'EE_People'
     *                                        )
     *                                        },
     * @type array   $cts                     {
     *                                        An array of custom taxonomies and their arguments (short example below).
     * @see CustomTaxonomyDefinitions::setTaxonomies() for a more complete example.
     *                                        'espresso_people_type' => array(
     *                                        'singular_name' => esc_html__('People Type', 'event_espresso'),
     *                                        'plural_name' => esc_html__('People Types', 'event_espresso'),
     *                                        'args' => array()
     *                                        )
     *                                        },
     * @type array   $default_terms           {
     *                                        An array of terms to set as the default for a given taxonomy and the
     *                                        custom post types applied to.
     *                                        'taxonomy_name' => array(
     *                                        'term' => array( 'cpt_a_name', 'cpt_b_name' )
     *                                        )
     *                                        }
     *                                        }
     */
    public static function register($identifier = '', array $setup_args = [])
    {

        // check for required params
        if (empty($identifier)) {
            throw new EE_Error(
                esc_html__(
                    'In order to register custom post types and custom taxonomies, you must include a value to reference what had been registered',
                    'event_espresso'
                )
            );
        }

        if (! is_array($setup_args) || (empty($setup_args['cpts']) && empty($setup_args['cts']))) {
            throw new EE_Error(
                esc_html__(
                    'In order to register custom post types or custom taxonomies, you must include an array containing either an array of custom post types to register (key "cpts"), an array of custom taxonomies ("cts") or both.',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_registry[ $identifier ])) {
            return;
        }

        // make sure cpt ref is unique.
        if (isset(self::$_registry[ $identifier ])) {
            $identifier = uniqid() . '_' . $identifier;
        }

        // make sure this was called in the right place!
        if (did_action('AHEE__EE_System__load_CPTs_and_session__complete')) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    esc_html__(
                        'EE_Register_CPT has been called and given a reference of "%s".  It may or may not work because it should be called on or before "AHEE__EE_System__load_CPTs_and_session__complete" action hook.',
                        'event_espresso'
                    ),
                    $identifier
                ),
                '4.5.0'
            );
        }
        // validate incoming args
        $validated = [
            'cpts'          => isset($setup_args['cpts'])
                ? (array) $setup_args['cpts']
                : [],
            'cts'           => isset($setup_args['cts'])
                ? (array) $setup_args['cts']
                : [],
            'default_terms' => isset($setup_args['default_terms'])
                ? (array) $setup_args['default_terms']
                : [],
        ];

        self::$_registry[ $identifier ] = $validated;

        // hook into to cpt system
        add_filter(
            'FHEE__EventEspresso_core_domain_entities_custom_post_types_CustomPostTypeDefinitions__getCustomPostTypes',
            [__CLASS__, 'filterCustomPostTypeDefinitions'],
            5
        );
        add_filter(
            'FHEE__EventEspresso_core_domain_entities_custom_post_types_TaxonomyDefinitions__getTaxonomies',
            [__CLASS__, 'filterCustomTaxonomyDefinitions'],
            5
        );
        add_action(
            'AHEE__EventEspresso_core_domain_services_custom_post_types_RegisterCustomTaxonomyTerms__construct_end',
            [__CLASS__, 'registerCustomTaxonomyTerm'],
            5
        );
    }


    /**
     * Callback for
     * FHEE__EventEspresso_core_domain_entities_custom_post_types_CustomPostTypeDefinitions__getCustomPostTypes
     * that adds additional custom post types to be registered.
     *
     * @param array $custom_post_type_definitions array of cpts that are already set
     * @return array new array of cpts and their registration information
     */
    public static function filterCustomPostTypeDefinitions(array $custom_post_type_definitions)
    {
        foreach (self::$_registry as $registries) {
            foreach ($registries['cpts'] as $cpt_name => $cpt_settings) {
                $custom_post_type_definitions[ $cpt_name ] = $cpt_settings;
            }
        }
        return $custom_post_type_definitions;
    }


    /**
     * Callback for
     * FHEE__EventEspresso_core_domain_entities_custom_post_types_TaxonomyDefinitions__getTaxonomies
     * that adds additional custom taxonomies to be registered.
     *
     * @param array $custom_taxonomy_definitions array of cts that are already set.
     * @return array new array of cts and their registration information.
     */
    public static function filterCustomTaxonomyDefinitions(array $custom_taxonomy_definitions)
    {
        foreach (self::$_registry as $registries) {
            foreach ($registries['cts'] as $ct_name => $ct_settings) {
                $custom_taxonomy_definitions[ $ct_name ] = $ct_settings;
            }
        }
        return $custom_taxonomy_definitions;
    }


    /**
     * Callback for
     * AHEE__EventEspresso_core_domain_services_custom_post_types_RegisterCustomTaxonomyTerms__construct_end
     * which is used to set the default terms
     *
     * @param RegisterCustomTaxonomyTerms $register_custom_taxonomy_terms
     * @return void
     */
    public static function registerCustomTaxonomyTerm(RegisterCustomTaxonomyTerms $register_custom_taxonomy_terms)
    {
        foreach (self::$_registry as $registries) {
            foreach ($registries['default_terms'] as $taxonomy => $terms) {
                foreach ($terms as $term => $cpts) {
                    $register_custom_taxonomy_terms->registerCustomTaxonomyTerm(
                        $taxonomy,
                        $term,
                        $cpts
                    );
                }
            }
        }
    }


    /**
     * @param array $cpts array of cpts that are already set
     * @return array new array of cpts and their registration information
     * @deprecated 4.9.62.p
     */
    public static function filter_cpts(array $cpts)
    {
        foreach (self::$_registry as $registries) {
            foreach ($registries['cpts'] as $cpt_name => $cpt_settings) {
                $cpts[ $cpt_name ] = $cpt_settings;
            }
        }
        return $cpts;
    }


    /**
     * @param array $cts array of cts that are already set.
     * @return array new array of cts and their registration information.
     * @deprecated 4.9.62.p
     */
    public static function filter_cts(array $cts)
    {
        foreach (self::$_registry as $registries) {
            foreach ($registries['cts'] as $ct_name => $ct_settings) {
                $cts[ $ct_name ] = $ct_settings;
            }
        }
        return $cts;
    }


    /**
     * @param EE_Register_CPTs $cpt_class
     * @return void
     * @deprecated 4.9.62.p
     */
    public static function default_terms(EE_Register_CPTs $cpt_class)
    {
        foreach (self::$_registry as $registries) {
            foreach ($registries['default_terms'] as $taxonomy => $terms) {
                foreach ($terms as $term => $cpts) {
                    $cpt_class->set_default_term($taxonomy, $term, $cpts);
                }
            }
        }
    }


    /**
     * This deregisters whats been registered on this class (for the given slug).
     *
     * @param string $identifier The reference for the item registered to be removed.
     *
     * @return void
     * @since 4.5.0
     *
     */
    public static function deregister($identifier = '')
    {
        unset(self::$_registry[ $identifier ]);
    }
}
