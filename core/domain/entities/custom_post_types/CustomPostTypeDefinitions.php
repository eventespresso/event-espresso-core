<?php

namespace EventEspresso\core\domain\entities\custom_post_types;

use EE_Core_Config;
use EEM_CPT_Base;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * Class CustomPostTypeDefinitions
 * Information about Event Espresso's Custom Post Types
 *
 * @package EventEspresso\core\domain\entities\custom_post_types
 * @author  Darren Ethier / Brent Christensen
 * @since   4.9.62.p
 */
class CustomPostTypeDefinitions
{

    /**
     * @var EE_Core_Config
     */
    public $core_config;

    /**
     * @var array $custom_post_types
     */
    private $custom_post_types;

    /**
     * @var LoaderInterface $loader
     */
    private $loader;


    /**
     * EspressoCustomPostTypeDefinitions constructor.
     *
     * @param EE_Core_Config  $core_config
     * @param LoaderInterface $loader
     */
    public function __construct(EE_Core_Config $core_config, LoaderInterface $loader)
    {
        $this->core_config = $core_config;
        $this->loader = $loader;
        $this->setDefinitions();
    }


    /**
     * defines Espresso Custom Post Types
     * NOTE the ['args']['page_templates'] array index is something specific to our CPTs
     * and not part of the WP custom post type api.
     *
     * @return void
     */
    private function setDefinitions()
    {
        $this->custom_post_types = array(
            'espresso_events'    => array(
                'singular_name' => esc_html__('Event', 'event_espresso'),
                'plural_name'   => esc_html__('Events', 'event_espresso'),
                'singular_slug' => esc_html__('event', 'event_espresso'),
                'plural_slug'   => $this->core_config->event_cpt_slug,
                'class_name'    => 'EE_Event',
                'model_name'    => 'EEM_Event',
                'args'          => array(
                    'public'            => true,
                    'show_in_nav_menus' => true,
                    'capability_type'   => 'event',
                    'capabilities'      => array(
                        'edit_post'              => 'ee_edit_event',
                        'read_post'              => 'ee_read_event',
                        'delete_post'            => 'ee_delete_event',
                        'edit_posts'             => 'ee_edit_events',
                        'edit_others_posts'      => 'ee_edit_others_events',
                        'publish_posts'          => 'ee_publish_events',
                        'read_private_posts'     => 'ee_read_private_events',
                        'delete_posts'           => 'ee_delete_events',
                        'delete_private_posts'   => 'ee_delete_private_events',
                        'delete_published_posts' => 'ee_delete_published_events',
                        'delete_others_posts'    => 'ee_delete_others_events',
                        'edit_private_posts'     => 'ee_edit_private_events',
                        'edit_published_posts'   => 'ee_edit_published_events',
                    ),
                    'taxonomies'        => array(
                        'espresso_event_categories',
                        'espresso_event_type',
                        'post_tag',
                    ),
                    'page_templates'    => true,
                ),
            ),
            'espresso_venues'    => array(
                'singular_name' => esc_html__('Venue', 'event_espresso'),
                'plural_name'   => esc_html__('Venues', 'event_espresso'),
                'singular_slug' => esc_html__('venue', 'event_espresso'),
                'plural_slug'   => esc_html__('venues', 'event_espresso'),
                'class_name'    => 'EE_Venue',
                'model_name'    => 'EEM_Venue',
                'args'          => array(
                    'public'            => true,
                    'show_in_nav_menus' => false, // by default this doesn't show for decaf,
                    'capability_type'   => 'venue',
                    'capabilities'      => array(
                        'edit_post'              => 'ee_edit_venue',
                        'read_post'              => 'ee_read_venue',
                        'delete_post'            => 'ee_delete_venue',
                        'edit_posts'             => 'ee_edit_venues',
                        'edit_others_posts'      => 'ee_edit_others_venues',
                        'publish_posts'          => 'ee_publish_venues',
                        'read_private_posts'     => 'ee_read_private_venues',
                        'delete_posts'           => 'ee_delete_venues',
                        'delete_private_posts'   => 'ee_delete_private_venues',
                        'delete_published_posts' => 'ee_delete_published_venues',
                        'delete_others_posts'    => 'ee_edit_others_venues',
                        'edit_private_posts'     => 'ee_edit_private_venues',
                        'edit_published_posts'   => 'ee_edit_published_venues',
                    ),
                    'taxonomies'        => array(
                        'espresso_venue_categories',
                        'post_tag',
                    ),
                    'page_templates'    => true,
                ),
            ),
            'espresso_attendees' => array(
                'singular_name' => esc_html__('Contact', 'event_espresso'),
                'plural_name'   => esc_html__('Contacts', 'event_espresso'),
                'singular_slug' => esc_html__('contact', 'event_espresso'),
                'plural_slug'   => esc_html__('contacts', 'event_espresso'),
                'class_name'    => 'EE_Attendee',
                'model_name'    => 'EEM_Attendee',
                'args'          => array(
                    'public'             => false,
                    'publicly_queryable' => false,
                    'hierarchical'       => false,
                    'has_archive'        => false,
                    'supports'           => array(
                        'editor',
                        'thumbnail',
                        'excerpt',
                        'custom-fields',
                        'comments',
                    ),
                    'taxonomies'         => array('post_tag'),
                    'capability_type'    => 'contact',
                    'capabilities'       => array(
                        'edit_post'              => 'ee_edit_contact',
                        'read_post'              => 'ee_read_contact',
                        'delete_post'            => 'ee_delete_contact',
                        'edit_posts'             => 'ee_edit_contacts',
                        'edit_others_posts'      => 'ee_edit_contacts',
                        'publish_posts'          => 'ee_edit_contacts',
                        'read_private_posts'     => 'ee_edit_contacts',
                        'delete_posts'           => 'ee_delete_contacts',
                        'delete_private_posts'   => 'ee_delete_contacts',
                        'delete_published_posts' => 'ee_delete_contacts',
                        'delete_others_posts'    => 'ee_delete_contacts',
                        'edit_private_posts'     => 'ee_edit_contacts',
                        'edit_published_posts'   => 'ee_edit_contacts',
                    ),
                ),
            ),
        );
    }


    /**
     * @return array
     */
    public function getDefinitions()
    {
        return (array) apply_filters(
            'FHEE__EventEspresso_core_domain_entities_custom_post_types_CustomPostTypeDefinitions__getCustomPostTypes',
            // legacy filter applied for now,
            // later on we'll run a has_filter($tag) check and throw a doing_it_wrong() notice
            apply_filters(
                'FHEE__EE_Register_CPTs__get_CPTs__cpts',
                $this->custom_post_types
            )
        );
    }


    /**
     * @return array
     */
    public function getCustomPostTypeSlugs()
    {
        return array_keys($this->getDefinitions());
    }


    /**
     * This basically goes through the CPT array and returns only CPT's
     * that have the ['args']['public'] option set as false
     *
     * @return array
     */
    public function getPrivateCustomPostTypes()
    {
        $private_CPTs = array();
        foreach ($this->getDefinitions() as $CPT => $details) {
            if (empty($details['args']['public'])) {
                $private_CPTs[ $CPT ] = $details;
            }
        }
        return $private_CPTs;
    }


    /**
     * This returns the corresponding model name for cpts registered by EE.
     *
     * @param string $post_type_slug    If a slug is included, then attempt to retrieve
     *                                  the model name for the given cpt slug.
     *                                  Otherwise if empty, then we'll return
     *                                  all cpt model names for cpts registered in EE.
     * @return array                    Empty array if no matching model names for the given slug
     *                                  or an array of model names indexed by post type slug.
     */
    public function getCustomPostTypeModelNames($post_type_slug = '')
    {
        $cpts = $this->getDefinitions();
        // first if slug passed in...
        if (! empty($post_type_slug)) {
            // check that slug and cpt match
            if (! isset($cpts[ $post_type_slug ])) {
                return array();
            }
            if (empty($cpts[ $post_type_slug ]['class_name'])
                && empty($cpts[ $post_type_slug ]['model_name'])
            ) {
                return array();
            }
            // k let's get the model name for this cpt.
            return $this->getCustomPostTypeModelName($post_type_slug, $cpts[ $post_type_slug ]);
        }
        // if we made it here then we're returning an array of cpt model names indexed by post_type_slug.
        $cpt_models = array();
        foreach ($cpts as $slug => $args) {
            $model = $this->getCustomPostTypeModelName($post_type_slug, $cpts[ $post_type_slug ]);
            if (! empty($model)) {
                $cpt_models[ $slug ] = $model;
            }
        }
        return $cpt_models;
    }


    /**
     * @param       $post_type_slug
     * @param array $cpt
     * @return array
     */
    private function getCustomPostTypeModelName($post_type_slug, array $cpt)
    {
        if (! empty($cpt['model_name'])) {
            return array($post_type_slug => $cpt['model_name']);
        }
        if (! empty($cpt['class_name'])) {
            return array(
                $post_type_slug => $this->deriveCptModelNameFromClassName($cpt['class_name']),
            );
        }
        return array();
    }


    /**
     * @param string $class_name
     * @return string
     */
    private function deriveCptModelNameFromClassName($class_name)
    {
        return str_replace('EE', 'EEM', $class_name);
    }


    /**
     * This instantiates cpt models related to the cpts registered via EE.
     *
     * @since 4.6.16.rc.000
     * @param string $post_type_slug If valid slug is provided, then will instantiate the model only for
     *                               the cpt matching the given slug.  Otherwise all cpt models will be
     *                               instantiated (if possible).
     * @return EEM_CPT_Base[]        successful instantiation will return an array of successfully instantiated
     *                               EEM models indexed by post slug.
     */
    public function getCustomPostTypeModels($post_type_slug = '')
    {
        $cpt_model_names = $this->getCustomPostTypeModelNames($post_type_slug);
        $instantiated = array();
        foreach ($cpt_model_names as $slug => $model_name) {
            $model = $this->loader->getShared($model_name);
            if ($model instanceof EEM_CPT_Base) {
                $instantiated[ $slug ] = $model;
            }
        }
        return $instantiated;
    }
}
