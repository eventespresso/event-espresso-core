<?php

/**
 * Base Model from which EEM_Custom_Table_Base and EEM_WP_Query_Base should inherit.
 * This should obviously be functionality shared between the two.
 * Clearly EEM_WP_Query_Base will need to have additional logic for determining which class attributes are actually
 * meta value entries; it will have to state what's the custom post type's post_type; what class attributes map onto what post columns; and others.
 * However, much functionality should be the same: 
 */

require_once('EE_Base.php');
abstract class EEM_Base extends EE_Base{
	
	
	
	/**
	 * Internationalized string for the singular name of these items. Eg, 'Event', 'Registration', 'Question Group', etc
	 * @var string 
	 */
	protected $singular_item = NULL;
	
	
	
	
	/**
	 * Internationalized string for the plural name of these items. Eg, 'Events', 'Registrations', 'Question Groups', etc.
	 * @var string
	 */
	protected $plural_item = NULL;
	
	
	
	
	
	
}
