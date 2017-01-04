<?php

/**
 * For CPT models who have a post type field
 */
class EE_WP_Post_Type_Field extends EE_DB_Only_Text_Field
{
    /**
     * @param string $post_type the exact string to be used for the post type
     *                          of all these post type model objects/rows
     */
    function __construct($post_type)
    {
        parent::__construct('post_type', __("Post Type", 'event_espresso'), false, $post_type);
    }
}