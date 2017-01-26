<?php



/**
 * Class EEM_Base
 * Multi-table model. Especially handles joins when querying.
 * An important note about values dealt with in models and model objects:
 * values used by models exist in basically 3 different domains, which the EE_Model_Fields help convert between:
 * 1. Client-code values (eg, controller code may refer to a date as "March 21, 2013")
 * 2. Model object values (eg, after the model object has called set() on the value and saves it onto the model object,
 * it may become a unix timestamp, eg 12312412412)
 * 3. Database values (eg, we may later decide to store dates as mysql dates, in which case they'd be stored as
 * '2013-03-21 00:00:00') Sometimes these values are the same, but often they are not. When your client code is using a
 * model's functions, you need to be aware which domain your data exists in. If it is client-code values (ie, it hasn't
 * had a EE_Model_Field call prepare_for_set on it) then use the model functions as normal. However, if you are calling
 * the model functions with values from the model object domain (ie, the code your writing is probably within a model
 * object, and all the values you're dealing with have had an EE_Model_Field call prepare_for_set on them), then you'll
 * want to set $values_already_prepared_by_model_object to FALSE within the argument-list of the functions you call (in
 * order to avoid re-processing those values). If your values are already in the database values domain, you'll either
 * way to convert them into the model object domain by creating model objects from those raw db values (ie,using
 * EEM_Base::_create_objects), or just use $wpdb directly.
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Michael Nelson
 * @since                 EE4
 */
abstract class EEM_Base extends EE_Base
{

    //admin posty
    //basic -> grants access to mine -> if they don't have it, select none
    //*_others -> grants access to others that arent private, and all mine -> if they don't have it, select mine
    //*_private -> grants full access -> if dont have it, select all mine and others' non-private
    //*_published -> grants access to published -> if they dont have it, select non-published
    //*_global/default/system -> grants access to global items -> if they don't have it, select non-global
    //publish_{thing} -> can change status TO publish; SPECIAL CASE
    //frontend posty
    //by default has access to published
    //basic -> grants access to mine that arent published, and all published
    //*_others ->grants access to others that arent private, all mine
    //*_private -> grants full access
    //frontend non-posty
    //like admin posty
    //category-y
    //assign -> grants access to join-table
    //(delete, edit)
    //payment-method-y
    //for each registered payment method,
    //ee_payment_method_{pmttype} -> if they don't have it, select all where they aren't of that type
    /**
     * Flag to indicate whether the values provided to EEM_Base have already been prepared
     * by the model object or not (ie, the model object has used the field's _prepare_for_set function on the values).
     * They almost always WILL NOT, but it's not necessarily a requirement.
     * For example, if you want to run EEM_Event::instance()->get_all(array(array('EVT_ID'=>$_GET['event_id'])));
     *
     * @var boolean
     */
    private $_values_already_prepared_by_model_object = 0;

    /**
     * when $_values_already_prepared_by_model_object equals this, we assume
     * the data is just like form input that needs to have the model fields'
     * prepare_for_set and prepare_for_use_in_db called on it
     */
    const not_prepared_by_model_object = 0;

    /**
     * when $_values_already_prepared_by_model_object equals this, we
     * assume this value is coming from a model object and doesn't need to have
     * prepare_for_set called on it, just prepare_for_use_in_db is used
     */
    const prepared_by_model_object = 1;

    /**
     * when $_values_already_prepared_by_model_object equals this, we assume
     * the values are already to be used in the database (ie no processing is done
     * on them by the model's fields)
     */
    const prepared_for_use_in_db = 2;


    protected $singular_item = 'Item';

    protected $plural_item   = 'Items';

    /**
     * @type \EE_Table_Base[] $_tables array of EE_Table objects for defining which tables comprise this model.
     */
    protected $_tables;

    /**
     * with two levels: top-level has array keys which are database table aliases (ie, keys in _tables)
     * and the value is an array. Each of those sub-arrays have keys of field names (eg 'ATT_ID', which should also be
     * variable names on the model objects (eg, EE_Attendee), and the keys should be children of EE_Model_Field
     *
     * @var \EE_Model_Field_Base[] $_fields
     */
    protected $_fields;

    /**
     * array of different kinds of relations
     *
     * @var \EE_Model_Relation_Base[] $_model_relations
     */
    protected $_model_relations;

    /**
     * @var \EE_Index[] $_indexes
     */
    protected $_indexes = array();

    /**
     * Default strategy for getting where conditions on this model. This strategy is used to get default
     * where conditions which are added to get_all, update, and delete queries. They can be overridden
     * by setting the same columns as used in these queries in the query yourself.
     *
     * @var EE_Default_Where_Conditions
     */
    protected $_default_where_conditions_strategy;

    /**
     * Strategy for getting conditions on this model when 'default_where_conditions' equals 'minimum'.
     * This is particularly useful when you want something between 'none' and 'default'
     *
     * @var EE_Default_Where_Conditions
     */
    protected $_minimum_where_conditions_strategy;

    /**
     * String describing how to find the "owner" of this model's objects.
     * When there is a foreign key on this model to the wp_users table, this isn't needed.
     * But when there isn't, this indicates which related model, or transiently-related model,
     * has the foreign key to the wp_users table.
     * Eg, for EEM_Registration this would be 'Event' because registrations are directly
     * related to events, and events have a foreign key to wp_users.
     * On EEM_Transaction, this would be 'Transaction.Event'
     *
     * @var string
     */
    protected $_model_chain_to_wp_user = '';

    /**
     * This is a flag typically set by updates so that we don't load the where strategy on updates because updates
     * don't need it (particularly CPT models)
     *
     * @var bool
     */
    protected $_ignore_where_strategy = false;

    /**
     * String used in caps relating to this model. Eg, if the caps relating to this
     * model are 'ee_edit_events', 'ee_read_events', etc, it would be 'events'.
     *
     * @var string. If null it hasn't been initialized yet. If false then we
     * have indicated capabilities don't apply to this
     */
    protected $_caps_slug = null;

    /**
     * 2d array where top-level keys are one of EEM_Base::valid_cap_contexts(),
     * and next-level keys are capability names, and each's value is a
     * EE_Default_Where_Condition. If the requester requests to apply caps to the query,
     * they specify which context to use (ie, frontend, backend, edit or delete)
     * and then each capability in the corresponding sub-array that they're missing
     * adds the where conditions onto the query.
     *
     * @var array
     */
    protected $_cap_restrictions = array(
        self::caps_read       => array(),
        self::caps_read_admin => array(),
        self::caps_edit       => array(),
        self::caps_delete     => array(),
    );

    /**
     * Array defining which cap restriction generators to use to create default
     * cap restrictions to put in EEM_Base::_cap_restrictions.
     * Array-keys are one of EEM_Base::valid_cap_contexts(), and values are a child of
     * EE_Restriction_Generator_Base. If you don't want any cap restrictions generated
     * automatically set this to false (not just null).
     *
     * @var EE_Restriction_Generator_Base[]
     */
    protected $_cap_restriction_generators = array();

    /**
     * constants used to categorize capability restrictions on EEM_Base::_caps_restrictions
     */
    const caps_read       = 'read';

    const caps_read_admin = 'read_admin';

    const caps_edit       = 'edit';

    const caps_delete     = 'delete';

    /**
     * Keys are all the cap contexts (ie constants EEM_Base::_caps_*) and values are their 'action'
     * as how they'd be used in capability names. Eg EEM_Base::caps_read ('read_frontend')
     * maps to 'read' because when looking for relevant permissions we're going to use
     * 'read' in teh capabilities names like 'ee_read_events' etc.
     *
     * @var array
     */
    protected $_cap_contexts_to_cap_action_map = array(
        self::caps_read       => 'read',
        self::caps_read_admin => 'read',
        self::caps_edit       => 'edit',
        self::caps_delete     => 'delete',
    );

    /**
     * Timezone
     * This gets set via the constructor so that we know what timezone incoming strings|timestamps are in when there
     * are EE_Datetime_Fields in use.  This can also be used before a get to set what timezone you want strings coming
     * out of the created objects.  NOT all EEM_Base child classes use this property but any that use a
     * EE_Datetime_Field data type will have access to it.
     *
     * @var string
     */
    protected $_timezone;


    /**
     * This holds the id of the blog currently making the query.  Has no bearing on single site but is used for
     * multisite.
     *
     * @var int
     */
    protected static $_model_query_blog_id;

    /**
     * A copy of _fields, except the array keys are the model names pointed to by
     * the field
     *
     * @var EE_Model_Field_Base[]
     */
    private $_cache_foreign_key_to_fields = array();

    /**
     * Cached list of all the fields on the model, indexed by their name
     *
     * @var EE_Model_Field_Base[]
     */
    private $_cached_fields = null;

    /**
     * Cached list of all the fields on the model, except those that are
     * marked as only pertinent to the database
     *
     * @var EE_Model_Field_Base[]
     */
    private $_cached_fields_non_db_only = null;

    /**
     * A cached reference to the primary key for quick lookup
     *
     * @var EE_Model_Field_Base
     */
    private $_primary_key_field = null;

    /**
     * Flag indicating whether this model has a primary key or not
     *
     * @var boolean
     */
    protected $_has_primary_key_field = null;

    /**
     * Whether or not this model is based off a table in WP core only (CPTs should set
     * this to FALSE, but if we were to make an EE_WP_Post model, it should set this to true).
     *
     * @var boolean
     */
    protected $_wp_core_model = false;

    /**
     *    List of valid operators that can be used for querying.
     * The keys are all operators we'll accept, the values are the real SQL
     * operators used
     *
     * @var array
     */
    protected $_valid_operators = array(
        '='           => '=',
        '<='          => '<=',
        '<'           => '<',
        '>='          => '>=',
        '>'           => '>',
        '!='          => '!=',
        'LIKE'        => 'LIKE',
        'like'        => 'LIKE',
        'NOT_LIKE'    => 'NOT LIKE',
        'not_like'    => 'NOT LIKE',
        'NOT LIKE'    => 'NOT LIKE',
        'not like'    => 'NOT LIKE',
        'IN'          => 'IN',
        'in'          => 'IN',
        'NOT_IN'      => 'NOT IN',
        'not_in'      => 'NOT IN',
        'NOT IN'      => 'NOT IN',
        'not in'      => 'NOT IN',
        'between'     => 'BETWEEN',
        'BETWEEN'     => 'BETWEEN',
        'IS_NOT_NULL' => 'IS NOT NULL',
        'is_not_null' => 'IS NOT NULL',
        'IS NOT NULL' => 'IS NOT NULL',
        'is not null' => 'IS NOT NULL',
        'IS_NULL'     => 'IS NULL',
        'is_null'     => 'IS NULL',
        'IS NULL'     => 'IS NULL',
        'is null'     => 'IS NULL',
        'REGEXP'      => 'REGEXP',
        'regexp'      => 'REGEXP',
        'NOT_REGEXP'  => 'NOT REGEXP',
        'not_regexp'  => 'NOT REGEXP',
        'NOT REGEXP'  => 'NOT REGEXP',
        'not regexp'  => 'NOT REGEXP',
    );

    /**
     * operators that work like 'IN', accepting a comma-separated list of values inside brackets. Eg '(1,2,3)'
     *
     * @var array
     */
    protected $_in_style_operators = array('IN', 'NOT IN');

    /**
     * operators that work like 'BETWEEN'.  Typically used for datetime calculations, i.e. "BETWEEN '12-1-2011' AND
     * '12-31-2012'"
     *
     * @var array
     */
    protected $_between_style_operators = array('BETWEEN');

    /**
     * operators that are used for handling NUll and !NULL queries.  Typically used for when checking if a row exists
     * on a join table.
     *
     * @var array
     */
    protected $_null_style_operators = array('IS NOT NULL', 'IS NULL');

    /**
     * Allowed values for $query_params['order'] for ordering in queries
     *
     * @var array
     */
    protected $_allowed_order_values = array('asc', 'desc', 'ASC', 'DESC');

    /**
     * When these are keys in a WHERE or HAVING clause, they are handled much differently
     * than regular field names. It is assumed that their values are an array of WHERE conditions
     *
     * @var array
     */
    private $_logic_query_param_keys = array('not', 'and', 'or', 'NOT', 'AND', 'OR');

    /**
     * Allowed keys in $query_params arrays passed into queries. Note that 0 is meant to always be a
     * 'where', but 'where' clauses are so common that we thought we'd omit it
     *
     * @var array
     */
    private $_allowed_query_params = array(
        0,
        'limit',
        'order_by',
        'group_by',
        'having',
        'force_join',
        'order',
        'on_join_limit',
        'default_where_conditions',
        'caps',
    );

    /**
     * All the data types that can be used in $wpdb->prepare statements.
     *
     * @var array
     */
    private $_valid_wpdb_data_types = array('%d', '%s', '%f');

    /**
     *    EE_Registry Object
     *
     * @var    object
     * @access    protected
     */
    protected $EE = null;


    /**
     * Property which, when set, will have this model echo out the next X queries to the page for debugging.
     *
     * @var int
     */
    protected $_show_next_x_db_queries = 0;

    /**
     * When using _get_all_wpdb_results, you can specify a custom selection. If you do so,
     * it gets saved on this property so those selections can be used in WHERE, GROUP_BY, etc.
     *
     * @var array
     */
    protected $_custom_selections = array();

    /**
     * key => value Entity Map using  array( EEM_Base::$_model_query_blog_id => array( ID => model object ) )
     * caches every model object we've fetched from the DB on this request
     *
     * @var array
     */
    protected $_entity_map;

    /**
     * constant used to show EEM_Base has not yet verified the db on this http request
     */
    const db_verified_none = 0;

    /**
     * constant used to show EEM_Base has verified the EE core db on this http request,
     * but not the addons' dbs
     */
    const db_verified_core = 1;

    /**
     * constant used to show EEM_Base has verified the addons' dbs (and implicitly
     * the EE core db too)
     */
    const db_verified_addons = 2;

    /**
     * indicates whether an EEM_Base child has already re-verified the DB
     * is ok (we don't want to do it repetitively). Should be set to one the constants
     * looking like EEM_Base::db_verified_*
     *
     * @var int - 0 = none, 1 = core, 2 = addons
     */
    protected static $_db_verification_level = EEM_Base::db_verified_none;

    /**
     * @const constant for 'default_where_conditions' to apply default where conditions to ALL queried models
     *        (eg, if retrieving registrations ordered by their datetimes, this will only return non-trashed
     *        registrations for non-trashed tickets for non-trashed datetimes)
     */
    const default_where_conditions_all = 'all';

    /**
     * @const constant for 'default_where_conditions' to apply default where conditions to THIS model only, but
     *        no other models which are joined to (eg, if retrieving registrations ordered by their datetimes, this will
     *        return non-trashed registrations, regardless of the related datetimes and tickets' statuses).
     *        It is preferred to use EEM_Base::default_where_conditions_minimum_others because, when joining to
     *        models which share tables with other models, this can return data for the wrong model.
     */
    const default_where_conditions_this_only = 'this_model_only';

    /**
     * @const constant for 'default_where_conditions' to apply default where conditions to other models queried,
     *        but not the current model (eg, if retrieving registrations ordered by their datetimes, this will
     *        return all registrations related to non-trashed tickets and non-trashed datetimes)
     */
    const default_where_conditions_others_only = 'other_models_only';

    /**
     * @const constant for 'default_where_conditions' to apply minimum where conditions to all models queried.
     *        For most models this the same as EEM_Base::default_where_conditions_none, except for models which share
     *        their table with other models, like the Event and Venue models. For example, when querying for events
     *        ordered by their venues' name, this will be sure to only return real events with associated real venues
     *        (regardless of whether those events and venues are trashed)
     *        In contrast, using EEM_Base::default_where_conditions_none would could return WP posts other than EE
     *        events.
     */
    const default_where_conditions_minimum_all = 'minimum';

    /**
     * @const constant for 'default_where_conditions' to apply apply where conditions to other models, and full default
     *        where conditions for the queried model (eg, when querying events ordered by venues' names, this will
     *        return non-trashed events for any venues, regardless of whether those associated venues are trashed or
     *        not)
     */
    const default_where_conditions_minimum_others = 'full_this_minimum_others';

    /**
     * @const constant for 'default_where_conditions' to NOT apply any where conditions. This should very rarely be
     *        used, because when querying from a model which shares its table with another model (eg Events and Venues)
     *        it's possible it will return table entries for other models. You should use
     *        EEM_Base::default_where_conditions_minimum_all instead.
     */
    const default_where_conditions_none = 'none';



    /**
     * About all child constructors:
     * they should define the _tables, _fields and _model_relations arrays.
     * Should ALWAYS be called after child constructor.
     * In order to make the child constructors to be as simple as possible, this parent constructor
     * finalizes constructing all the object's attributes.
     * Generally, rather than requiring a child to code
     * $this->_tables = array(
     *        'Event_Post_Table' => new EE_Table('Event_Post_Table','wp_posts')
     *        ...);
     *  (thus repeating itself in the array key and in the constructor of the new EE_Table,)
     * each EE_Table has a function to set the table's alias after the constructor, using
     * the array key ('Event_Post_Table'), instead of repeating it. The model fields and model relations
     * do something similar.
     *
     * @param null $timezone
     * @throws \EE_Error
     */
    protected function __construct($timezone = null)
    {
        // check that the model has not been loaded too soon
        if (! did_action('AHEE__EE_System__load_espresso_addons')) {
            throw new EE_Error (
                sprintf(
                    __('The %1$s model can not be loaded before the "AHEE__EE_System__load_espresso_addons" hook has been called. This gives other addons a chance to extend this model.',
                        'event_espresso'),
                    get_class($this)
                )
            );
        }
        /**
         * Set blogid for models to current blog. However we ONLY do this if $_model_query_blog_id is not already set.
         */
        if (empty(EEM_Base::$_model_query_blog_id)) {
            EEM_Base::set_model_query_blog_id();
        }
        /**
         * Filters the list of tables on a model. It is best to NOT use this directly and instead
         * just use EE_Register_Model_Extension
         *
         * @var EE_Table_Base[] $_tables
         */
        $this->_tables = apply_filters('FHEE__' . get_class($this) . '__construct__tables', $this->_tables);
        foreach ($this->_tables as $table_alias => $table_obj) {
            /** @var $table_obj EE_Table_Base */
            $table_obj->_construct_finalize_with_alias($table_alias);
            if ($table_obj instanceof EE_Secondary_Table) {
                /** @var $table_obj EE_Secondary_Table */
                $table_obj->_construct_finalize_set_table_to_join_with($this->_get_main_table());
            }
        }
        /**
         * Filters the list of fields on a model. It is best to NOT use this directly and instead just use
         * EE_Register_Model_Extension
         *
         * @param EE_Model_Field_Base[] $_fields
         */
        $this->_fields = apply_filters('FHEE__' . get_class($this) . '__construct__fields', $this->_fields);
        $this->_invalidate_field_caches();
        foreach ($this->_fields as $table_alias => $fields_for_table) {
            if (! array_key_exists($table_alias, $this->_tables)) {
                throw new EE_Error(sprintf(__("Table alias %s does not exist in EEM_Base child's _tables array. Only tables defined are %s",
                    'event_espresso'), $table_alias, implode(",", $this->_fields)));
            }
            foreach ($fields_for_table as $field_name => $field_obj) {
                /** @var $field_obj EE_Model_Field_Base | EE_Primary_Key_Field_Base */
                //primary key field base has a slightly different _construct_finalize
                /** @var $field_obj EE_Model_Field_Base */
                $field_obj->_construct_finalize($table_alias, $field_name, $this->get_this_model_name());
            }
        }
        // everything is related to Extra_Meta
        if (get_class($this) !== 'EEM_Extra_Meta') {
            //make extra meta related to everything, but don't block deleting things just
            //because they have related extra meta info. For now just orphan those extra meta
            //in the future we should automatically delete them
            $this->_model_relations['Extra_Meta'] = new EE_Has_Many_Any_Relation(false);
        }
        //and change logs
        if (get_class($this) !== 'EEM_Change_Log') {
            $this->_model_relations['Change_Log'] = new EE_Has_Many_Any_Relation(false);
        }
        /**
         * Filters the list of relations on a model. It is best to NOT use this directly and instead just use
         * EE_Register_Model_Extension
         *
         * @param EE_Model_Relation_Base[] $_model_relations
         */
        $this->_model_relations = apply_filters('FHEE__' . get_class($this) . '__construct__model_relations',
            $this->_model_relations);
        foreach ($this->_model_relations as $model_name => $relation_obj) {
            /** @var $relation_obj EE_Model_Relation_Base */
            $relation_obj->_construct_finalize_set_models($this->get_this_model_name(), $model_name);
        }
        foreach ($this->_indexes as $index_name => $index_obj) {
            /** @var $index_obj EE_Index */
            $index_obj->_construct_finalize($index_name, $this->get_this_model_name());
        }
        $this->set_timezone($timezone);
        //finalize default where condition strategy, or set default
        if (! $this->_default_where_conditions_strategy) {
            //nothing was set during child constructor, so set default
            $this->_default_where_conditions_strategy = new EE_Default_Where_Conditions();
        }
        $this->_default_where_conditions_strategy->_finalize_construct($this);
        if (! $this->_minimum_where_conditions_strategy) {
            //nothing was set during child constructor, so set default
            $this->_minimum_where_conditions_strategy = new EE_Default_Where_Conditions();
        }
        $this->_minimum_where_conditions_strategy->_finalize_construct($this);
        //if the cap slug hasn't been set, and we haven't set it to false on purpose
        //to indicate to NOT set it, set it to the logical default
        if ($this->_caps_slug === null) {
            $this->_caps_slug = EEH_Inflector::pluralize_and_lower($this->get_this_model_name());
        }
        //initialize the standard cap restriction generators if none were specified by the child constructor
        if ($this->_cap_restriction_generators !== false) {
            foreach ($this->cap_contexts_to_cap_action_map() as $cap_context => $action) {
                if (! isset($this->_cap_restriction_generators[$cap_context])) {
                    $this->_cap_restriction_generators[$cap_context] = apply_filters(
                        'FHEE__EEM_Base___construct__standard_cap_restriction_generator',
                        new EE_Restriction_Generator_Protected(),
                        $cap_context,
                        $this
                    );
                }
            }
        }
        //if there are cap restriction generators, use them to make the default cap restrictions
        if ($this->_cap_restriction_generators !== false) {
            foreach ($this->_cap_restriction_generators as $context => $generator_object) {
                if (! $generator_object) {
                    continue;
                }
                if (! $generator_object instanceof EE_Restriction_Generator_Base) {
                    throw new EE_Error(
                        sprintf(
                            __('Index "%1$s" in the model %2$s\'s _cap_restriction_generators is not a child of EE_Restriction_Generator_Base. It should be that or NULL.',
                                'event_espresso'),
                            $context,
                            $this->get_this_model_name()
                        )
                    );
                }
                $action = $this->cap_action_for_context($context);
                if (! $generator_object->construction_finalized()) {
                    $generator_object->_construct_finalize($this, $action);
                }
            }
        }
        do_action('AHEE__' . get_class($this) . '__construct__end');
    }



    /**
     * Generates the cap restrictions for the given context, or if they were
     * already generated just gets what's cached
     *
     * @param string $context one of EEM_Base::valid_cap_contexts()
     * @return EE_Default_Where_Conditions[]
     */
    protected function _generate_cap_restrictions($context)
    {
        if (isset($this->_cap_restriction_generators[$context])
            && $this->_cap_restriction_generators[$context]
               instanceof
               EE_Restriction_Generator_Base
        ) {
            return $this->_cap_restriction_generators[$context]->generate_restrictions();
        } else {
            return array();
        }
    }



    /**
     * Used to set the $_model_query_blog_id static property.
     *
     * @param int $blog_id  If provided then will set the blog_id for the models to this id.  If not provided then the
     *                      value for get_current_blog_id() will be used.
     */
    public static function set_model_query_blog_id($blog_id = 0)
    {
        EEM_Base::$_model_query_blog_id = $blog_id > 0 ? (int)$blog_id : get_current_blog_id();
    }



    /**
     * Returns whatever is set as the internal $model_query_blog_id.
     *
     * @return int
     */
    public static function get_model_query_blog_id()
    {
        return EEM_Base::$_model_query_blog_id;
    }



    /**
     *        This function is a singleton method used to instantiate the Espresso_model object
     *
     * @access public
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any
     *                         incoming timezone data that gets saved).  Note this just sends the timezone info to the
     *                         date time model field objects.  Default is NULL (and will be assumed using the set
     *                         timezone in the 'timezone_string' wp option)
     * @return static (as in the concrete child class)
     */
    public static function instance($timezone = null)
    {
        // check if instance of Espresso_model already exists
        if (! static::$_instance instanceof static) {
            // instantiate Espresso_model
            static::$_instance = new static($timezone);
        }
        //we might have a timezone set, let set_timezone decide what to do with it
        static::$_instance->set_timezone($timezone);
        // Espresso_model object
        return static::$_instance;
    }



    /**
     * resets the model and returns it
     *
     * @param null | string $timezone
     * @return EEM_Base|null (if the model was already instantiated, returns it, with
     * all its properties reset; if it wasn't instantiated, returns null)
     */
    public static function reset($timezone = null)
    {
        if (static::$_instance instanceof EEM_Base) {
            //let's try to NOT swap out the current instance for a new one
            //because if someone has a reference to it, we can't remove their reference
            //so it's best to keep using the same reference, but change the original object
            //reset all its properties to their original values as defined in the class
            $r = new ReflectionClass(get_class(static::$_instance));
            $static_properties = $r->getStaticProperties();
            foreach ($r->getDefaultProperties() as $property => $value) {
                //don't set instance to null like it was originally,
                //but it's static anyways, and we're ignoring static properties (for now at least)
                if (! isset($static_properties[$property])) {
                    static::$_instance->{$property} = $value;
                }
            }
            //and then directly call its constructor again, like we would if we
            //were creating a new one
            static::$_instance->__construct($timezone);
            return self::instance();
        }
        return null;
    }



    /**
     * retrieve the status details from esp_status table as an array IF this model has the status table as a relation.
     *
     * @param  boolean $translated return localized strings or JUST the array.
     * @return array
     * @throws \EE_Error
     */
    public function status_array($translated = false)
    {
        if (! array_key_exists('Status', $this->_model_relations)) {
            return array();
        }
        $model_name = $this->get_this_model_name();
        $status_type = str_replace(' ', '_', strtolower(str_replace('_', ' ', $model_name)));
        $stati = EEM_Status::instance()->get_all(array(array('STS_type' => $status_type)));
        $status_array = array();
        foreach ($stati as $status) {
            $status_array[$status->ID()] = $status->get('STS_code');
        }
        return $translated
            ? EEM_Status::instance()->localized_status($status_array, false, 'sentence')
            : $status_array;
    }



    /**
     * Gets all the EE_Base_Class objects which match the $query_params, by querying the DB.
     *
     * @param array $query_params             {
     * @var array $0 (where) array {
     *                                        eg: array('QST_display_text'=>'Are you bob?','QST_admin_text'=>'Determine
     *                                        if user is bob') becomes SQL >> "...WHERE QST_display_text = 'Are you
     *                                        bob?' AND QST_admin_text = 'Determine if user is bob'...") To add WHERE
     *                                        conditions based on related models (and even
     *                                        models-related-to-related-models) prepend the model's name onto the field
     *                                        name. Eg,
     *                                        EEM_Event::instance()->get_all(array(array('Venue.VNU_ID'=>12))); becomes
     *                                        SQL >> "SELECT * FROM wp_posts AS Event_CPT LEFT JOIN wp_esp_event_meta
     *                                        AS Event_Meta ON Event_CPT.ID = Event_Meta.EVT_ID LEFT JOIN
     *                                        wp_esp_event_venue AS Event_Venue ON Event_Venue.EVT_ID=Event_CPT.ID LEFT
     *                                        JOIN wp_posts AS Venue_CPT ON Venue_CPT.ID=Event_Venue.VNU_ID LEFT JOIN
     *                                        wp_esp_venue_meta AS Venue_Meta ON Venue_CPT.ID = Venue_Meta.VNU_ID WHERE
     *                                        Venue_CPT.ID = 12 Notice that automatically took care of joining Events
     *                                        to Venues (even when each of those models actually consisted of two
     *                                        tables). Also, you may chain the model relations together. Eg instead of
     *                                        just having
     *                                        "Venue.VNU_ID", you could have
     *                                        "Registration.Attendee.ATT_ID" as a field on a query for events (because
     *                                        events are related to Registrations, which are related to Attendees). You
     *                                        can take it even further with
     *                                        "Registration.Transaction.Payment.PAY_amount" etc. To change the operator
     *                                        (from the default of '='), change the value to an numerically-indexed
     *                                        array, where the first item in the list is the operator. eg: array(
     *                                        'QST_display_text' => array('LIKE','%bob%'), 'QST_ID' => array('<',34),
     *                                        'QST_wp_user' => array('in',array(1,2,7,23))) becomes SQL >> "...WHERE
     *                                        QST_display_text LIKE '%bob%' AND QST_ID < 34 AND QST_wp_user IN
     *                                        (1,2,7,23)...". Valid operators so far: =, !=, <, <=, >, >=, LIKE, NOT
     *                                        LIKE, IN (followed by numeric-indexed array), NOT IN (dido), BETWEEN
     *                                        (followed by an array with exactly 2 date strings), IS NULL, and IS NOT
     *                                        NULL Values can be a string, int, or float. They can also be arrays IFF
     *                                        the operator is IN. Also, values can actually be field names. To indicate
     *                                        the value is a field, simply provide a third array item (true) to the
     *                                        operator-value array like so: eg: array( 'DTT_reg_limit' => array('>',
     *                                        'DTT_sold', TRUE) ) becomes SQL >> "...WHERE DTT_reg_limit > DTT_sold"
     *                                        Note: you can also use related model field names like you would any other
     *                                        field name. eg:
     *                                        array('Datetime.DTT_reg_limit'=>array('=','Datetime.DTT_sold',TRUE) could
     *                                        be used if you were querying EEM_Tickets (because Datetime is directly related to tickets) Also, by default all the where conditions are AND'd together. To override this, add an array key 'OR' (or 'AND') and the array to be OR'd together eg: array('OR'=>array('TXN_ID' => 23 , 'TXN_timestamp__>' =>
     *                                        345678912)) becomes SQL >> "...WHERE TXN_ID = 23 OR TXN_timestamp =
     *                                        345678912...". Also, to negate an entire set of conditions, use 'NOT' as
     *                                        an array key. eg: array('NOT'=>array('TXN_total' =>
     *                                        50, 'TXN_paid'=>23) becomes SQL >> "...where ! (TXN_total =50 AND
     *                                        TXN_paid =23) Note: the 'glue' used to join each condition will continue
     *                                        to be what you last specified. IE, "AND"s by default, but if you had
     *                                        previously specified to use ORs to join, ORs will continue to be used.
     *                                        So, if you specify to use an "OR" to join conditions, it will continue to
     *                                        "stick" until you specify an AND. eg
     *                                        array('OR'=>array('NOT'=>array('TXN_total' => 50,
     *                                        'TXN_paid'=>23)),AND=>array('TXN_ID'=>1,'STS_ID'=>'TIN') becomes SQL >>
     *                                        "...where ! (TXN_total =50 OR TXN_paid =23) AND TXN_ID=1 AND
     *                                        STS_ID='TIN'" They can be nested indefinitely. eg:
     *                                        array('OR'=>array('TXN_total' => 23, 'NOT'=> array( 'TXN_timestamp'=> 345678912, 'AND'=>array('TXN_paid' => 53, 'STS_ID' => 'TIN')))) becomes SQL >> "...WHERE TXN_total = 23 OR ! (TXN_timestamp = 345678912 OR (TXN_paid = 53 AND STS_ID = 'TIN'))..." GOTCHA: because this is an array, array keys must be unique, making it impossible to place two or more where conditions applying to the same field. eg: array('PAY_timestamp'=>array('>',$start_date),'PAY_timestamp'=>array('<',$end_date),'PAY_timestamp'=>array('!=',$special_date)), as PHP enforces that the array keys must be unique, thus removing the first two array entries with key 'PAY_timestamp'. becomes SQL >> "PAY_timestamp !=  4234232", ignoring the first two PAY_timestamp conditions). To overcome this, you can add a '*' character to the end of the field's name, followed by anything. These will be removed when generating the SQL string, but allow for the array keys to be unique. eg: you could rewrite the previous query as: array('PAY_timestamp'=>array('>',$start_date),'PAY_timestamp*1st'=>array('<',$end_date),'PAY_timestamp*2nd'=>array('!=',$special_date)) which correctly becomes SQL >>
     *                                        "PAY_timestamp > 123412341 AND PAY_timestamp < 2354235235234 AND
     *                                        PAY_timestamp != 1241234123" This can be applied to condition operators
     *                                        too, eg:
     *                                        array('OR'=>array('REG_ID'=>3,'Transaction.TXN_ID'=>23),'OR*whatever'=>array('Attendee.ATT_fname'=>'bob','Attendee.ATT_lname'=>'wilson')));
     * @var mixed   $limit                    int|array    adds a limit to the query just like the SQL limit clause, so
     *                                        limits of "23", "25,50", and array(23,42) are all valid would become SQL
     *                                        "...LIMIT 23", "...LIMIT 25,50", and "...LIMIT 23,42" respectively.
     *                                        Remember when you provide two numbers for the limit, the 1st number is
     *                                        the OFFSET, the 2nd is the LIMIT
     * @var array   $on_join_limit            allows the setting of a special select join with a internal limit so you
     *                                        can do paging on one-to-many multi-table-joins. Send an array in the
     *                                        following format array('on_join_limit'
     *                                        => array( 'table_alias', array(1,2) ) ).
     * @var mixed   $order_by                 name of a column to order by, or an array where keys are field names and
     *                                        values are either 'ASC' or 'DESC'.
     *                                        'limit'=>array('STS_ID'=>'ASC','REG_date'=>'DESC'), which would becomes
     *                                        SQL "...ORDER BY TXN_timestamp..." and "...ORDER BY STS_ID ASC, REG_date
     *                                        DESC..." respectively. Like the
     *                                        'where' conditions, these fields can be on related models. Eg
     *                                        'order_by'=>array('Registration.Transaction.TXN_amount'=>'ASC') is
     *                                        perfectly valid from any model related to 'Registration' (like Event,
     *                                        Attendee, Price, Datetime, etc.)
     * @var string  $order                    If 'order_by' is used and its value is a string (NOT an array), then
     *                                        'order' specifies whether to order the field specified in 'order_by' in
     *                                        ascending or descending order. Acceptable values are 'ASC' or 'DESC'. If,
     *                                        'order_by' isn't used, but 'order' is, then it is assumed you want to
     *                                        order by the primary key. Eg,
     *                                        EEM_Event::instance()->get_all(array('order_by'=>'Datetime.DTT_EVT_start','order'=>'ASC');
     *                                        //(will join with the Datetime model's table(s) and order by its field
     *                                        DTT_EVT_start) or
     *                                        EEM_Registration::instance()->get_all(array('order'=>'ASC'));//will make
     *                                        SQL "SELECT * FROM wp_esp_registration ORDER BY REG_ID ASC"
     * @var mixed   $group_by                 name of field to order by, or an array of fields. Eg either
     *                                        'group_by'=>'VNU_ID', or
     *                                        'group_by'=>array('EVT_name','Registration.Transaction.TXN_total') Note:
     *                                        if no
     *                                        $group_by is specified, and a limit is set, automatically groups by the
     *                                        model's primary key (or combined primary keys). This avoids some
     *                                        weirdness that results when using limits, tons of joins, and no group by,
     *                                        see https://events.codebasehq.com/projects/event-espresso/tickets/9389
     * @var array   $having                   exactly like WHERE parameters array, except these conditions apply to the
     *                                        grouped results (whereas WHERE conditions apply to the pre-grouped
     *                                        results)
     * @var array   $force_join               forces a join with the models named. Should be a numerically-indexed
     *                                        array where values are models to be joined in the query.Eg
     *                                        array('Attendee','Payment','Datetime'). You may join with transient
     *                                        models using period, eg "Registration.Transaction.Payment". You will
     *                                        probably only want to do this in hopes of increasing efficiency, as
     *                                        related models which belongs to the current model
     *                                        (ie, the current model has a foreign key to them, like how Registration
     *                                        belongs to Attendee) can be cached in order to avoid future queries
     * @var string  $default_where_conditions can be set to 'none', 'this_model_only', 'other_models_only', or 'all'.
     *                                        set this to 'none' to disable all default where conditions. Eg, usually
     *                                        soft-deleted objects are filtered-out if you want to include them, set
     *                                        this query param to 'none'. If you want to ONLY disable THIS model's
     *                                        default where conditions set it to 'other_models_only'. If you only want
     *                                        this model's default where conditions added to the query, use
     *                                        'this_model_only'. If you want to use all default where conditions
     *                                        (default), set to 'all'.
     * @var string  $caps                     controls what capability requirements to apply to the query; ie, should
     *                                        we just NOT apply any capabilities/permissions/restrictions and return
     *                                        everything? Or should we only show the current user items they should be
     *                                        able to view on the frontend, backend, edit, or delete? can be set to
     *                                        'none' (default), 'read_frontend', 'read_backend', 'edit' or 'delete'
     *                                        }
     * @return EE_Base_Class[]  *note that there is NO option to pass the output type. If you want results different
     *                                        from EE_Base_Class[], use _get_all_wpdb_results()and make it public
     *                                        again. Array keys are object IDs (if there is a primary key on the model.
     *                                        if not, numerically indexed) Some full examples: get 10 transactions
     *                                        which have Scottish attendees: EEM_Transaction::instance()->get_all(
     *                                        array( array(
     *                                        'OR'=>array(
     *                                        'Registration.Attendee.ATT_fname'=>array('like','Mc%'),
     *                                        'Registration.Attendee.ATT_fname*other'=>array('like','Mac%')
     *                                        )
     *                                        ),
     *                                        'limit'=>10,
     *                                        'group_by'=>'TXN_ID'
     *                                        ));
     *                                        get all the answers to the question titled "shirt size" for event with id
     *                                        12, ordered by their answer EEM_Answer::instance()->get_all(array( array(
     *                                        'Question.QST_display_text'=>'shirt size',
     *                                        'Registration.Event.EVT_ID'=>12
     *                                        ),
     *                                        'order_by'=>array('ANS_value'=>'ASC')
     *                                        ));
     * @throws \EE_Error
     */
    public function get_all($query_params = array())
    {
        if (isset($query_params['limit'])
            && ! isset($query_params['group_by'])
        ) {
            $query_params['group_by'] = array_keys($this->get_combined_primary_key_fields());
        }
        return $this->_create_objects($this->_get_all_wpdb_results($query_params, ARRAY_A, null));
    }



    /**
     * Modifies the query parameters so we only get back model objects
     * that "belong" to the current user
     *
     * @param array $query_params @see EEM_Base::get_all()
     * @return array like EEM_Base::get_all
     */
    public function alter_query_params_to_only_include_mine($query_params = array())
    {
        $wp_user_field_name = $this->wp_user_field_name();
        if ($wp_user_field_name) {
            $query_params[0][$wp_user_field_name] = get_current_user_id();
        }
        return $query_params;
    }



    /**
     * Returns the name of the field's name that points to the WP_User table
     *  on this model (or follows the _model_chain_to_wp_user and uses that model's
     * foreign key to the WP_User table)
     *
     * @return string|boolean string on success, boolean false when there is no
     * foreign key to the WP_User table
     */
    public function wp_user_field_name()
    {
        try {
            if (! empty($this->_model_chain_to_wp_user)) {
                $models_to_follow_to_wp_users = explode('.', $this->_model_chain_to_wp_user);
                $last_model_name = end($models_to_follow_to_wp_users);
                $model_with_fk_to_wp_users = EE_Registry::instance()->load_model($last_model_name);
                $model_chain_to_wp_user = $this->_model_chain_to_wp_user . '.';
            } else {
                $model_with_fk_to_wp_users = $this;
                $model_chain_to_wp_user = '';
            }
            $wp_user_field = $model_with_fk_to_wp_users->get_foreign_key_to('WP_User');
            return $model_chain_to_wp_user . $wp_user_field->get_name();
        } catch (EE_Error $e) {
            return false;
        }
    }



    /**
     * Returns the _model_chain_to_wp_user string, which indicates which related model
     * (or transiently-related model) has a foreign key to the wp_users table;
     * useful for finding if model objects of this type are 'owned' by the current user.
     * This is an empty string when the foreign key is on this model and when it isn't,
     * but is only non-empty when this model's ownership is indicated by a RELATED model
     * (or transiently-related model)
     *
     * @return string
     */
    public function model_chain_to_wp_user()
    {
        return $this->_model_chain_to_wp_user;
    }



    /**
     * Whether this model is 'owned' by a specific wordpress user (even indirectly,
     * like how registrations don't have a foreign key to wp_users, but the
     * events they are for are), or is unrelated to wp users.
     * generally available
     *
     * @return boolean
     */
    public function is_owned()
    {
        if ($this->model_chain_to_wp_user()) {
            return true;
        } else {
            try {
                $this->get_foreign_key_to('WP_User');
                return true;
            } catch (EE_Error $e) {
                return false;
            }
        }
    }



    /**
     * Used internally to get WPDB results, because other functions, besides get_all, may want to do some queries, but
     * may want to preserve the WPDB results (eg, update, which first queries to make sure we have all the tables on
     * the model)
     *
     * @param array  $query_params      like EEM_Base::get_all's $query_params
     * @param string $output            ARRAY_A, OBJECT_K, etc. Just like
     * @param mixed  $columns_to_select , What columns to select. By default, we select all columns specified by the
     *                                  fields on the model, and the models we joined to in the query. However, you can
     *                                  override this and set the select to "*", or a specific column name, like
     *                                  "ATT_ID", etc. If you would like to use these custom selections in WHERE,
     *                                  GROUP_BY, or HAVING clauses, you must instead provide an array. Array keys are
     *                                  the aliases used to refer to this selection, and values are to be
     *                                  numerically-indexed arrays, where 0 is the selection and 1 is the data type.
     *                                  Eg, array('count'=>array('COUNT(REG_ID)','%d'))
     * @return array | stdClass[] like results of $wpdb->get_results($sql,OBJECT), (ie, output type is OBJECT)
     * @throws \EE_Error
     */
    protected function _get_all_wpdb_results($query_params = array(), $output = ARRAY_A, $columns_to_select = null)
    {
        // remember the custom selections, if any, and type cast as array
        // (unless $columns_to_select is an object, then just set as an empty array)
        // Note: (array) 'some string' === array( 'some string' )
        $this->_custom_selections = ! is_object($columns_to_select) ? (array)$columns_to_select : array();
        $model_query_info = $this->_create_model_query_info_carrier($query_params);
        $select_expressions = $columns_to_select !== null
            ? $this->_construct_select_from_input($columns_to_select)
            : $this->_construct_default_select_sql($model_query_info);
        $SQL = "SELECT $select_expressions " . $this->_construct_2nd_half_of_select_query($model_query_info);
        return $this->_do_wpdb_query('get_results', array($SQL, $output));
    }



    /**
     * Gets an array of rows from the database just like $wpdb->get_results would,
     * but you can use the $query_params like on EEM_Base::get_all() to more easily
     * take care of joins, field preparation etc.
     *
     * @param array  $query_params      like EEM_Base::get_all's $query_params
     * @param string $output            ARRAY_A, OBJECT_K, etc. Just like
     * @param mixed  $columns_to_select , What columns to select. By default, we select all columns specified by the
     *                                  fields on the model, and the models we joined to in the query. However, you can
     *                                  override this and set the select to "*", or a specific column name, like
     *                                  "ATT_ID", etc. If you would like to use these custom selections in WHERE,
     *                                  GROUP_BY, or HAVING clauses, you must instead provide an array. Array keys are
     *                                  the aliases used to refer to this selection, and values are to be
     *                                  numerically-indexed arrays, where 0 is the selection and 1 is the data type.
     *                                  Eg, array('count'=>array('COUNT(REG_ID)','%d'))
     * @return array|stdClass[] like results of $wpdb->get_results($sql,OBJECT), (ie, output type is OBJECT)
     * @throws \EE_Error
     */
    public function get_all_wpdb_results($query_params = array(), $output = ARRAY_A, $columns_to_select = null)
    {
        return $this->_get_all_wpdb_results($query_params, $output, $columns_to_select);
    }



    /**
     * For creating a custom select statement
     *
     * @param mixed $columns_to_select either a string to be inserted directly as the select statement,
     *                                 or an array where keys are aliases, and values are arrays where 0=>the selection
     *                                 SQL, and 1=>is the datatype
     * @throws EE_Error
     * @return string
     */
    private function _construct_select_from_input($columns_to_select)
    {
        if (is_array($columns_to_select)) {
            $select_sql_array = array();
            foreach ($columns_to_select as $alias => $selection_and_datatype) {
                if (! is_array($selection_and_datatype) || ! isset($selection_and_datatype[1])) {
                    throw new EE_Error(
                        sprintf(
                            __(
                                "Custom selection %s (alias %s) needs to be an array like array('COUNT(REG_ID)','%%d')",
                                "event_espresso"
                            ),
                            $selection_and_datatype,
                            $alias
                        )
                    );
                }
                if (! in_array($selection_and_datatype[1], $this->_valid_wpdb_data_types)) {
                    throw new EE_Error(
                        sprintf(
                            __(
                                "Datatype %s (for selection '%s' and alias '%s') is not a valid wpdb datatype (eg %%s)",
                                "event_espresso"
                            ),
                            $selection_and_datatype[1],
                            $selection_and_datatype[0],
                            $alias,
                            implode(",", $this->_valid_wpdb_data_types)
                        )
                    );
                }
                $select_sql_array[] = "{$selection_and_datatype[0]} AS $alias";
            }
            $columns_to_select_string = implode(", ", $select_sql_array);
        } else {
            $columns_to_select_string = $columns_to_select;
        }
        return $columns_to_select_string;
    }



    /**
     * Convenient wrapper for getting the primary key field's name. Eg, on Registration, this would be 'REG_ID'
     *
     * @return string
     * @throws \EE_Error
     */
    public function primary_key_name()
    {
        return $this->get_primary_key_field()->get_name();
    }



    /**
     * Gets a single item for this model from the DB, given only its ID (or null if none is found).
     * If there is no primary key on this model, $id is treated as primary key string
     *
     * @param mixed $id int or string, depending on the type of the model's primary key
     * @return EE_Base_Class
     */
    public function get_one_by_ID($id)
    {
        if ($this->get_from_entity_map($id)) {
            return $this->get_from_entity_map($id);
        }
        return $this->get_one(
            $this->alter_query_params_to_restrict_by_ID(
                $id,
                array('default_where_conditions' => EEM_Base::default_where_conditions_minimum_all)
            )
        );
    }



    /**
     * Alters query parameters to only get items with this ID are returned.
     * Takes into account that the ID might be a string produced by EEM_Base::get_index_primary_key_string(),
     * or could just be a simple primary key ID
     *
     * @param int   $id
     * @param array $query_params
     * @return array of normal query params, @see EEM_Base::get_all
     * @throws \EE_Error
     */
    public function alter_query_params_to_restrict_by_ID($id, $query_params = array())
    {
        if (! isset($query_params[0])) {
            $query_params[0] = array();
        }
        $conditions_from_id = $this->parse_index_primary_key_string($id);
        if ($conditions_from_id === null) {
            $query_params[0][$this->primary_key_name()] = $id;
        } else {
            //no primary key, so the $id must be from the get_index_primary_key_string()
            $query_params[0] = array_replace_recursive($query_params[0], $this->parse_index_primary_key_string($id));
        }
        return $query_params;
    }



    /**
     * Gets a single item for this model from the DB, given the $query_params. Only returns a single class, not an
     * array. If no item is found, null is returned.
     *
     * @param array $query_params like EEM_Base's $query_params variable.
     * @return EE_Base_Class|EE_Soft_Delete_Base_Class|NULL
     * @throws \EE_Error
     */
    public function get_one($query_params = array())
    {
        if (! is_array($query_params)) {
            EE_Error::doing_it_wrong('EEM_Base::get_one',
                sprintf(__('$query_params should be an array, you passed a variable of type %s', 'event_espresso'),
                    gettype($query_params)), '4.6.0');
            $query_params = array();
        }
        $query_params['limit'] = 1;
        $items = $this->get_all($query_params);
        if (empty($items)) {
            return null;
        } else {
            return array_shift($items);
        }
    }



    /**
     * Returns the next x number of items in sequence from the given value as
     * found in the database matching the given query conditions.
     *
     * @param mixed $current_field_value    Value used for the reference point.
     * @param null  $field_to_order_by      What field is used for the
     *                                      reference point.
     * @param int   $limit                  How many to return.
     * @param array $query_params           Extra conditions on the query.
     * @param null  $columns_to_select      If left null, then an array of
     *                                      EE_Base_Class objects is returned,
     *                                      otherwise you can indicate just the
     *                                      columns you want returned.
     * @return EE_Base_Class[]|array
     * @throws \EE_Error
     */
    public function next_x(
        $current_field_value,
        $field_to_order_by = null,
        $limit = 1,
        $query_params = array(),
        $columns_to_select = null
    ) {
        return $this->_get_consecutive($current_field_value, '>', $field_to_order_by, $limit, $query_params,
            $columns_to_select);
    }



    /**
     * Returns the previous x number of items in sequence from the given value
     * as found in the database matching the given query conditions.
     *
     * @param mixed $current_field_value    Value used for the reference point.
     * @param null  $field_to_order_by      What field is used for the
     *                                      reference point.
     * @param int   $limit                  How many to return.
     * @param array $query_params           Extra conditions on the query.
     * @param null  $columns_to_select      If left null, then an array of
     *                                      EE_Base_Class objects is returned,
     *                                      otherwise you can indicate just the
     *                                      columns you want returned.
     * @return EE_Base_Class[]|array
     * @throws \EE_Error
     */
    public function previous_x(
        $current_field_value,
        $field_to_order_by = null,
        $limit = 1,
        $query_params = array(),
        $columns_to_select = null
    ) {
        return $this->_get_consecutive($current_field_value, '<', $field_to_order_by, $limit, $query_params,
            $columns_to_select);
    }



    /**
     * Returns the next item in sequence from the given value as found in the
     * database matching the given query conditions.
     *
     * @param mixed $current_field_value    Value used for the reference point.
     * @param null  $field_to_order_by      What field is used for the
     *                                      reference point.
     * @param array $query_params           Extra conditions on the query.
     * @param null  $columns_to_select      If left null, then an EE_Base_Class
     *                                      object is returned, otherwise you
     *                                      can indicate just the columns you
     *                                      want and a single array indexed by
     *                                      the columns will be returned.
     * @return EE_Base_Class|null|array()
     * @throws \EE_Error
     */
    public function next(
        $current_field_value,
        $field_to_order_by = null,
        $query_params = array(),
        $columns_to_select = null
    ) {
        $results = $this->_get_consecutive($current_field_value, '>', $field_to_order_by, 1, $query_params,
            $columns_to_select);
        return empty($results) ? null : reset($results);
    }



    /**
     * Returns the previous item in sequence from the given value as found in
     * the database matching the given query conditions.
     *
     * @param mixed $current_field_value    Value used for the reference point.
     * @param null  $field_to_order_by      What field is used for the
     *                                      reference point.
     * @param array $query_params           Extra conditions on the query.
     * @param null  $columns_to_select      If left null, then an EE_Base_Class
     *                                      object is returned, otherwise you
     *                                      can indicate just the columns you
     *                                      want and a single array indexed by
     *                                      the columns will be returned.
     * @return EE_Base_Class|null|array()
     * @throws EE_Error
     */
    public function previous(
        $current_field_value,
        $field_to_order_by = null,
        $query_params = array(),
        $columns_to_select = null
    ) {
        $results = $this->_get_consecutive($current_field_value, '<', $field_to_order_by, 1, $query_params,
            $columns_to_select);
        return empty($results) ? null : reset($results);
    }



    /**
     * Returns the a consecutive number of items in sequence from the given
     * value as found in the database matching the given query conditions.
     *
     * @param mixed  $current_field_value   Value used for the reference point.
     * @param string $operand               What operand is used for the sequence.
     * @param string $field_to_order_by     What field is used for the reference point.
     * @param int    $limit                 How many to return.
     * @param array  $query_params          Extra conditions on the query.
     * @param null   $columns_to_select     If left null, then an array of EE_Base_Class objects is returned,
     *                                      otherwise you can indicate just the columns you want returned.
     * @return EE_Base_Class[]|array
     * @throws EE_Error
     */
    protected function _get_consecutive(
        $current_field_value,
        $operand = '>',
        $field_to_order_by = null,
        $limit = 1,
        $query_params = array(),
        $columns_to_select = null
    ) {
        //if $field_to_order_by is empty then let's assume we're ordering by the primary key.
        if (empty($field_to_order_by)) {
            if ($this->has_primary_key_field()) {
                $field_to_order_by = $this->get_primary_key_field()->get_name();
            } else {
                if (WP_DEBUG) {
                    throw new EE_Error(__('EEM_Base::_get_consecutive() has been called with no $field_to_order_by argument and there is no primary key on the field.  Please provide the field you would like to use as the base for retrieving the next item(s).',
                        'event_espresso'));
                }
                EE_Error::add_error(__('There was an error with the query.', 'event_espresso'));
                return array();
            }
        }
        if (! is_array($query_params)) {
            EE_Error::doing_it_wrong('EEM_Base::_get_consecutive',
                sprintf(__('$query_params should be an array, you passed a variable of type %s', 'event_espresso'),
                    gettype($query_params)), '4.6.0');
            $query_params = array();
        }
        //let's add the where query param for consecutive look up.
        $query_params[0][$field_to_order_by] = array($operand, $current_field_value);
        $query_params['limit'] = $limit;
        //set direction
        $incoming_orderby = isset($query_params['order_by']) ? (array)$query_params['order_by'] : array();
        $query_params['order_by'] = $operand === '>'
            ? array($field_to_order_by => 'ASC') + $incoming_orderby
            : array($field_to_order_by => 'DESC') + $incoming_orderby;
        //if $columns_to_select is empty then that means we're returning EE_Base_Class objects
        if (empty($columns_to_select)) {
            return $this->get_all($query_params);
        } else {
            //getting just the fields
            return $this->_get_all_wpdb_results($query_params, ARRAY_A, $columns_to_select);
        }
    }



    /**
     * This sets the _timezone property after model object has been instantiated.
     *
     * @param null | string $timezone valid PHP DateTimeZone timezone string
     */
    public function set_timezone($timezone)
    {
        if ($timezone !== null) {
            $this->_timezone = $timezone;
        }
        //note we need to loop through relations and set the timezone on those objects as well.
        foreach ($this->_model_relations as $relation) {
            $relation->set_timezone($timezone);
        }
        //and finally we do the same for any datetime fields
        foreach ($this->_fields as $field) {
            if ($field instanceof EE_Datetime_Field) {
                $field->set_timezone($timezone);
            }
        }
    }



    /**
     * This just returns whatever is set for the current timezone.
     *
     * @access public
     * @return string
     */
    public function get_timezone()
    {
        //first validate if timezone is set.  If not, then let's set it be whatever is set on the model fields.
        if (empty($this->_timezone)) {
            foreach ($this->_fields as $field) {
                if ($field instanceof EE_Datetime_Field) {
                    $this->set_timezone($field->get_timezone());
                    break;
                }
            }
        }
        //if timezone STILL empty then return the default timezone for the site.
        if (empty($this->_timezone)) {
            $this->set_timezone(EEH_DTT_Helper::get_timezone());
        }
        return $this->_timezone;
    }



    /**
     * This returns the date formats set for the given field name and also ensures that
     * $this->_timezone property is set correctly.
     *
     * @since 4.6.x
     * @param string $field_name The name of the field the formats are being retrieved for.
     * @param bool   $pretty     Whether to return the pretty formats (true) or not (false).
     * @throws EE_Error   If the given field_name is not of the EE_Datetime_Field type.
     * @return array formats in an array with the date format first, and the time format last.
     */
    public function get_formats_for($field_name, $pretty = false)
    {
        $field_settings = $this->field_settings_for($field_name);
        //if not a valid EE_Datetime_Field then throw error
        if (! $field_settings instanceof EE_Datetime_Field) {
            throw new EE_Error(sprintf(__('The field sent into EEM_Base::get_formats_for (%s) is not registered as a EE_Datetime_Field. Please check the spelling and make sure you are submitting the right field name to retrieve date_formats for.',
                'event_espresso'), $field_name));
        }
        //while we are here, let's make sure the timezone internally in EEM_Base matches what is stored on
        //the field.
        $this->_timezone = $field_settings->get_timezone();
        return array($field_settings->get_date_format($pretty), $field_settings->get_time_format($pretty));
    }



    /**
     * This returns the current time in a format setup for a query on this model.
     * Usage of this method makes it easier to setup queries against EE_Datetime_Field columns because
     * it will return:
     *  - a formatted string in the timezone and format currently set on the EE_Datetime_Field for the given field for
     *  NOW
     *  - or a unix timestamp (equivalent to time())
     *
     * @since 4.6.x
     * @param string $field_name       The field the current time is needed for.
     * @param bool   $timestamp        True means to return a unix timestamp. Otherwise a
     *                                 formatted string matching the set format for the field in the set timezone will
     *                                 be returned.
     * @param string $what             Whether to return the string in just the time format, the date format, or both.
     * @throws EE_Error    If the given field_name is not of the EE_Datetime_Field type.
     * @return int|string  If the given field_name is not of the EE_Datetime_Field type, then an EE_Error
     *                                 exception is triggered.
     */
    public function current_time_for_query($field_name, $timestamp = false, $what = 'both')
    {
        $formats = $this->get_formats_for($field_name);
        $DateTime = new DateTime("now", new DateTimeZone($this->_timezone));
        if ($timestamp) {
            return $DateTime->format('U');
        }
        //not returning timestamp, so return formatted string in timezone.
        switch ($what) {
            case 'time' :
                return $DateTime->format($formats[1]);
                break;
            case 'date' :
                return $DateTime->format($formats[0]);
                break;
            default :
                return $DateTime->format(implode(' ', $formats));
                break;
        }
    }



    /**
     * This receives a time string for a given field and ensures that it is setup to match what the internal settings
     * for the model are.  Returns a DateTime object.
     * Note: a gotcha for when you send in unix timestamp.  Remember a unix timestamp is already timezone agnostic,
     * (functionally the equivalent of UTC+0).  So when you send it in, whatever timezone string you include is
     * ignored.
     *
     * @param string $field_name      The field being setup.
     * @param string $timestring      The date time string being used.
     * @param string $incoming_format The format for the time string.
     * @param string $timezone        By default, it is assumed the incoming time string is in timezone for
     *                                the blog.  If this is not the case, then it can be specified here.  If incoming
     *                                format is
     *                                'U', this is ignored.
     * @return DateTime
     * @throws \EE_Error
     */
    public function convert_datetime_for_query($field_name, $timestring, $incoming_format, $timezone = '')
    {
        //just using this to ensure the timezone is set correctly internally
        $this->get_formats_for($field_name);
        //load EEH_DTT_Helper
        $set_timezone = empty($timezone) ? EEH_DTT_Helper::get_timezone() : $timezone;
        $incomingDateTime = date_create_from_format($incoming_format, $timestring, new DateTimeZone($set_timezone));
        return \EventEspresso\core\domain\entities\DbSafeDateTime::createFromDateTime( $incomingDateTime->setTimezone(new DateTimeZone($this->_timezone)) );
    }



    /**
     * Gets all the tables comprising this model. Array keys are the table aliases, and values are EE_Table objects
     *
     * @return EE_Table_Base[]
     */
    public function get_tables()
    {
        return $this->_tables;
    }



    /**
     * Updates all the database entries (in each table for this model) according to $fields_n_values and optionally
     * also updates all the model objects, where the criteria expressed in $query_params are met..
     * Also note: if this model has multiple tables, this update verifies all the secondary tables have an entry for
     * each row (in the primary table) we're trying to update; if not, it inserts an entry in the secondary table. Eg:
     * if our model has 2 tables: wp_posts (primary), and wp_esp_event (secondary). Let's say we are trying to update a
     * model object with EVT_ID = 1
     * (which means where wp_posts has ID = 1, because wp_posts.ID is the primary key's column), which exists, but
     * there is no entry in wp_esp_event for this entry in wp_posts. So, this update script will insert a row into
     * wp_esp_event, using any available parameters from $fields_n_values (eg, if "EVT_limit" => 40 is in
     * $fields_n_values, the new entry in wp_esp_event will set EVT_limit = 40, and use default for other columns which
     * are not specified)
     *
     * @param array   $fields_n_values         keys are model fields (exactly like keys in EEM_Base::_fields, NOT db
     *                                         columns!), values are strings, ints, floats, and maybe arrays if they
     *                                         are to be serialized. Basically, the values are what you'd expect to be
     *                                         values on the model, NOT necessarily what's in the DB. For example, if
     *                                         we wanted to update only the TXN_details on any Transactions where its
     *                                         ID=34, we'd use this method as follows:
     *                                         EEM_Transaction::instance()->update(
     *                                         array('TXN_details'=>array('detail1'=>'monkey','detail2'=>'banana'),
     *                                         array(array('TXN_ID'=>34)));
     * @param array   $query_params            very much like EEM_Base::get_all's $query_params
     *                                         in client code into what's expected to be stored on each field. Eg,
     *                                         consider updating Question's QST_admin_label field is of type
     *                                         Simple_HTML. If you use this function to update that field to $new_value
     *                                         = (note replace 8's with appropriate opening and closing tags in the
     *                                         following example)"8script8alert('I hack all');8/script88b8boom
     *                                         baby8/b8", then if you set $values_already_prepared_by_model_object to
     *                                         TRUE, it is assumed that you've already called
     *                                         EE_Simple_HTML_Field->prepare_for_set($new_value), which removes the
     *                                         malicious javascript. However, if
     *                                         $values_already_prepared_by_model_object is left as FALSE, then
     *                                         EE_Simple_HTML_Field->prepare_for_set($new_value) will be called on it,
     *                                         and every other field, before insertion. We provide this parameter
     *                                         because model objects perform their prepare_for_set function on all
     *                                         their values, and so don't need to be called again (and in many cases,
     *                                         shouldn't be called again. Eg: if we escape HTML characters in the
     *                                         prepare_for_set method...)
     * @param boolean $keep_model_objs_in_sync if TRUE, makes sure we ALSO update model objects
     *                                         in this model's entity map according to $fields_n_values that match
     *                                         $query_params. This obviously has some overhead, so you can disable it
     *                                         by setting this to FALSE, but be aware that model objects being used
     *                                         could get out-of-sync with the database
     * @return int how many rows got updated or FALSE if something went wrong with the query (wp returns FALSE or num
     *                                         rows affected which *could* include 0 which DOES NOT mean the query was
     *                                         bad)
     * @throws \EE_Error
     */
    public function update($fields_n_values, $query_params, $keep_model_objs_in_sync = true)
    {
        if (! is_array($query_params)) {
            EE_Error::doing_it_wrong('EEM_Base::update',
                sprintf(__('$query_params should be an array, you passed a variable of type %s', 'event_espresso'),
                    gettype($query_params)), '4.6.0');
            $query_params = array();
        }
        /**
         * Action called before a model update call has been made.
         *
         * @param EEM_Base $model
         * @param array    $fields_n_values the updated fields and their new values
         * @param array    $query_params    @see EEM_Base::get_all()
         */
        do_action('AHEE__EEM_Base__update__begin', $this, $fields_n_values, $query_params);
        /**
         * Filters the fields about to be updated given the query parameters. You can provide the
         * $query_params to $this->get_all() to find exactly which records will be updated
         *
         * @param array    $fields_n_values fields and their new values
         * @param EEM_Base $model           the model being queried
         * @param array    $query_params    see EEM_Base::get_all()
         */
        $fields_n_values = (array)apply_filters('FHEE__EEM_Base__update__fields_n_values', $fields_n_values, $this,
            $query_params);
        //need to verify that, for any entry we want to update, there are entries in each secondary table.
        //to do that, for each table, verify that it's PK isn't null.
        $tables = $this->get_tables();
        //and if the other tables don't have a row for each table-to-be-updated, we'll insert one with whatever values available in the current update query
        //NOTE: we should make this code more efficient by NOT querying twice
        //before the real update, but that needs to first go through ALPHA testing
        //as it's dangerous. says Mike August 8 2014
        //we want to make sure the default_where strategy is ignored
        $this->_ignore_where_strategy = true;
        $wpdb_select_results = $this->_get_all_wpdb_results($query_params);
        foreach ($wpdb_select_results as $wpdb_result) {
            // type cast stdClass as array
            $wpdb_result = (array)$wpdb_result;
            //get the model object's PK, as we'll want this if we need to insert a row into secondary tables
            if ($this->has_primary_key_field()) {
                $main_table_pk_value = $wpdb_result[$this->get_primary_key_field()->get_qualified_column()];
            } else {
                //if there's no primary key, we basically can't support having a 2nd table on the model (we could but it would be lots of work)
                $main_table_pk_value = null;
            }
            //if there are more than 1 tables, we'll want to verify that each table for this model has an entry in the other tables
            //and if the other tables don't have a row for each table-to-be-updated, we'll insert one with whatever values available in the current update query
            if (count($tables) > 1) {
                //foreach matching row in the DB, ensure that each table's PK isn't null. If so, there must not be an entry
                //in that table, and so we'll want to insert one
                foreach ($tables as $table_obj) {
                    $this_table_pk_column = $table_obj->get_fully_qualified_pk_column();
                    //if there is no private key for this table on the results, it means there's no entry
                    //in this table, right? so insert a row in the current table, using any fields available
                    if (! (array_key_exists($this_table_pk_column, $wpdb_result)
                           && $wpdb_result[$this_table_pk_column])
                    ) {
                        $success = $this->_insert_into_specific_table($table_obj, $fields_n_values,
                            $main_table_pk_value);
                        //if we died here, report the error
                        if (! $success) {
                            return false;
                        }
                    }
                }
            }
            //				//and now check that if we have cached any models by that ID on the model, that
            //				//they also get updated properly
            //				$model_object = $this->get_from_entity_map( $main_table_pk_value );
            //				if( $model_object ){
            //					foreach( $fields_n_values as $field => $value ){
            //						$model_object->set($field, $value);
            //let's make sure default_where strategy is followed now
            $this->_ignore_where_strategy = false;
        }
        //if we want to keep model objects in sync, AND
        //if this wasn't called from a model object (to update itself)
        //then we want to make sure we keep all the existing
        //model objects in sync with the db
        if ($keep_model_objs_in_sync && ! $this->_values_already_prepared_by_model_object) {
            if ($this->has_primary_key_field()) {
                $model_objs_affected_ids = $this->get_col($query_params);
            } else {
                //we need to select a bunch of columns and then combine them into the the "index primary key string"s
                $models_affected_key_columns = $this->_get_all_wpdb_results($query_params, ARRAY_A);
                $model_objs_affected_ids = array();
                foreach ($models_affected_key_columns as $row) {
                    $combined_index_key = $this->get_index_primary_key_string($row);
                    $model_objs_affected_ids[$combined_index_key] = $combined_index_key;
                }
            }
            if (! $model_objs_affected_ids) {
                //wait wait wait- if nothing was affected let's stop here
                return 0;
            }
            foreach ($model_objs_affected_ids as $id) {
                $model_obj_in_entity_map = $this->get_from_entity_map($id);
                if ($model_obj_in_entity_map) {
                    foreach ($fields_n_values as $field => $new_value) {
                        $model_obj_in_entity_map->set($field, $new_value);
                    }
                }
            }
            //if there is a primary key on this model, we can now do a slight optimization
            if ($this->has_primary_key_field()) {
                //we already know what we want to update. So let's make the query simpler so it's a little more efficient
                $query_params = array(
                    array($this->primary_key_name() => array('IN', $model_objs_affected_ids)),
                    'limit'                    => count($model_objs_affected_ids),
                    'default_where_conditions' => EEM_Base::default_where_conditions_none,
                );
            }
        }
        $model_query_info = $this->_create_model_query_info_carrier($query_params);
        $SQL = "UPDATE "
               . $model_query_info->get_full_join_sql()
               . " SET "
               . $this->_construct_update_sql($fields_n_values)
               . $model_query_info->get_where_sql();//note: doesn't use _construct_2nd_half_of_select_query() because doesn't accept LIMIT, ORDER BY, etc.
        $rows_affected = $this->_do_wpdb_query('query', array($SQL));
        /**
         * Action called after a model update call has been made.
         *
         * @param EEM_Base $model
         * @param array    $fields_n_values the updated fields and their new values
         * @param array    $query_params    @see EEM_Base::get_all()
         * @param int      $rows_affected
         */
        do_action('AHEE__EEM_Base__update__end', $this, $fields_n_values, $query_params, $rows_affected);
        return $rows_affected;//how many supposedly got updated
    }



    /**
     * Analogous to $wpdb->get_col, returns a 1-dimensional array where teh values
     * are teh values of the field specified (or by default the primary key field)
     * that matched the query params. Note that you should pass the name of the
     * model FIELD, not the database table's column name.
     *
     * @param array  $query_params @see EEM_Base::get_all()
     * @param string $field_to_select
     * @return array just like $wpdb->get_col()
     * @throws \EE_Error
     */
    public function get_col($query_params = array(), $field_to_select = null)
    {
        if ($field_to_select) {
            $field = $this->field_settings_for($field_to_select);
        } elseif ($this->has_primary_key_field()) {
            $field = $this->get_primary_key_field();
        } else {
            //no primary key, just grab the first column
            $field = reset($this->field_settings());
        }
        $model_query_info = $this->_create_model_query_info_carrier($query_params);
        $select_expressions = $field->get_qualified_column();
        $SQL = "SELECT $select_expressions " . $this->_construct_2nd_half_of_select_query($model_query_info);
        return $this->_do_wpdb_query('get_col', array($SQL));
    }



    /**
     * Returns a single column value for a single row from the database
     *
     * @param array  $query_params    @see EEM_Base::get_all()
     * @param string $field_to_select @see EEM_Base::get_col()
     * @return string
     * @throws \EE_Error
     */
    public function get_var($query_params = array(), $field_to_select = null)
    {
        $query_params['limit'] = 1;
        $col = $this->get_col($query_params, $field_to_select);
        if (! empty($col)) {
            return reset($col);
        } else {
            return null;
        }
    }



    /**
     * Makes the SQL for after "UPDATE table_X inner join table_Y..." and before "...WHERE". Eg "Question.name='party
     * time?', Question.desc='what do you think?',..." Values are filtered through wpdb->prepare to avoid against SQL
     * injection, but currently no further filtering is done
     *
     * @global      $wpdb
     * @param array $fields_n_values array keys are field names on this model, and values are what those fields should
     *                               be updated to in the DB
     * @return string of SQL
     * @throws \EE_Error
     */
    public function _construct_update_sql($fields_n_values)
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        $cols_n_values = array();
        foreach ($fields_n_values as $field_name => $value) {
            $field_obj = $this->field_settings_for($field_name);
            //if the value is NULL, we want to assign the value to that.
            //wpdb->prepare doesn't really handle that properly
            $prepared_value = $this->_prepare_value_or_use_default($field_obj, $fields_n_values);
            $value_sql = $prepared_value === null ? 'NULL'
                : $wpdb->prepare($field_obj->get_wpdb_data_type(), $prepared_value);
            $cols_n_values[] = $field_obj->get_qualified_column() . "=" . $value_sql;
        }
        return implode(",", $cols_n_values);
    }



    /**
     * Deletes a single row from the DB given the model object's primary key value. (eg, EE_Attendee->ID()'s value).
     * Performs a HARD delete, meaning the database row should always be removed,
     * not just have a flag field on it switched
     * Wrapper for EEM_Base::delete_permanently()
     *
     * @param mixed $id
     * @return boolean whether the row got deleted or not
     * @throws \EE_Error
     */
    public function delete_permanently_by_ID($id)
    {
        return $this->delete_permanently(
            array(
                array($this->get_primary_key_field()->get_name() => $id),
                'limit' => 1,
            )
        );
    }



    /**
     * Deletes a single row from the DB given the model object's primary key value. (eg, EE_Attendee->ID()'s value).
     * Wrapper for EEM_Base::delete()
     *
     * @param mixed $id
     * @return boolean whether the row got deleted or not
     * @throws \EE_Error
     */
    public function delete_by_ID($id)
    {
        return $this->delete(
            array(
                array($this->get_primary_key_field()->get_name() => $id),
                'limit' => 1,
            )
        );
    }



    /**
     * Identical to delete_permanently, but does a "soft" delete if possible,
     * meaning if the model has a field that indicates its been "trashed" or
     * "soft deleted", we will just set that instead of actually deleting the rows.
     *
     * @see EEM_Base::delete_permanently
     * @param array   $query_params
     * @param boolean $allow_blocking
     * @return int how many rows got deleted
     * @throws \EE_Error
     */
    public function delete($query_params, $allow_blocking = true)
    {
        return $this->delete_permanently($query_params, $allow_blocking);
    }



    /**
     * Deletes the model objects that meet the query params. Note: this method is overridden
     * in EEM_Soft_Delete_Base so that soft-deleted model objects are instead only flagged
     * as archived, not actually deleted
     *
     * @param array   $query_params   very much like EEM_Base::get_all's $query_params
     * @param boolean $allow_blocking if TRUE, matched objects will only be deleted if there is no related model info
     *                                that blocks it (ie, there' sno other data that depends on this data); if false,
     *                                deletes regardless of other objects which may depend on it. Its generally
     *                                advisable to always leave this as TRUE, otherwise you could easily corrupt your
     *                                DB
     * @return int how many rows got deleted
     * @throws \EE_Error
     */
    public function delete_permanently($query_params, $allow_blocking = true)
    {
        /**
         * Action called just before performing a real deletion query. You can use the
         * model and its $query_params to find exactly which items will be deleted
         *
         * @param EEM_Base $model
         * @param array    $query_params   @see EEM_Base::get_all()
         * @param boolean  $allow_blocking whether or not to allow related model objects
         *                                 to block (prevent) this deletion
         */
        do_action('AHEE__EEM_Base__delete__begin', $this, $query_params, $allow_blocking);
        //some MySQL databases may be running safe mode, which may restrict
        //deletion if there is no KEY column used in the WHERE statement of a deletion.
        //to get around this, we first do a SELECT, get all the IDs, and then run another query
        //to delete them
        $items_for_deletion = $this->_get_all_wpdb_results($query_params);
        $deletion_where = $this->_setup_ids_for_delete($items_for_deletion, $allow_blocking);
        if ($deletion_where) {
            //echo "objects for deletion:";var_dump($objects_for_deletion);
            $model_query_info = $this->_create_model_query_info_carrier($query_params);
            $table_aliases = array_keys($this->_tables);
            $SQL = "DELETE "
                   . implode(", ", $table_aliases)
                   . " FROM "
                   . $model_query_info->get_full_join_sql()
                   . " WHERE "
                   . $deletion_where;
            //		/echo "delete sql:$SQL";
            $rows_deleted = $this->_do_wpdb_query('query', array($SQL));
        } else {
            $rows_deleted = 0;
        }
        //and lastly make sure those items are removed from the entity map; if they could be put into it at all
        if ($this->has_primary_key_field()) {
            foreach ($items_for_deletion as $item_for_deletion_row) {
                $pk_value = $item_for_deletion_row[$this->get_primary_key_field()->get_qualified_column()];
                if (isset($this->_entity_map[EEM_Base::$_model_query_blog_id][$pk_value])) {
                    unset($this->_entity_map[EEM_Base::$_model_query_blog_id][$pk_value]);
                }
            }
        }
        /**
         * Action called just after performing a real deletion query. Although at this point the
         * items should have been deleted
         *
         * @param EEM_Base $model
         * @param array    $query_params @see EEM_Base::get_all()
         * @param int      $rows_deleted
         */
        do_action('AHEE__EEM_Base__delete__end', $this, $query_params, $rows_deleted);
        return $rows_deleted;//how many supposedly got deleted
    }



    /**
     * Checks all the relations that throw error messages when there are blocking related objects
     * for related model objects. If there are any related model objects on those relations,
     * adds an EE_Error, and return true
     *
     * @param EE_Base_Class|int $this_model_obj_or_id
     * @param EE_Base_Class     $ignore_this_model_obj a model object like 'EE_Event', or 'EE_Term_Taxonomy', which
     *                                                 should be ignored when determining whether there are related
     *                                                 model objects which block this model object's deletion. Useful
     *                                                 if you know A is related to B and are considering deleting A,
     *                                                 but want to see if A has any other objects blocking its deletion
     *                                                 before removing the relation between A and B
     * @return boolean
     * @throws \EE_Error
     */
    public function delete_is_blocked_by_related_models($this_model_obj_or_id, $ignore_this_model_obj = null)
    {
        //first, if $ignore_this_model_obj was supplied, get its model
        if ($ignore_this_model_obj && $ignore_this_model_obj instanceof EE_Base_Class) {
            $ignored_model = $ignore_this_model_obj->get_model();
        } else {
            $ignored_model = null;
        }
        //now check all the relations of $this_model_obj_or_id and see if there
        //are any related model objects blocking it?
        $is_blocked = false;
        foreach ($this->_model_relations as $relation_name => $relation_obj) {
            if ($relation_obj->block_delete_if_related_models_exist()) {
                //if $ignore_this_model_obj was supplied, then for the query
                //on that model needs to be told to ignore $ignore_this_model_obj
                if ($ignored_model && $relation_name === $ignored_model->get_this_model_name()) {
                    $related_model_objects = $relation_obj->get_all_related($this_model_obj_or_id, array(
                        array(
                            $ignored_model->get_primary_key_field()->get_name() => array(
                                '!=',
                                $ignore_this_model_obj->ID(),
                            ),
                        ),
                    ));
                } else {
                    $related_model_objects = $relation_obj->get_all_related($this_model_obj_or_id);
                }
                if ($related_model_objects) {
                    EE_Error::add_error($relation_obj->get_deletion_error_message(), __FILE__, __FUNCTION__, __LINE__);
                    $is_blocked = true;
                }
            }
        }
        return $is_blocked;
    }



    /**
     * This sets up our delete where sql and accounts for if we have secondary tables that will have rows deleted as
     * well.
     *
     * @param  array  $objects_for_deletion This should be the values returned by $this->_get_all_wpdb_results()
     * @param boolean $allow_blocking       if TRUE, matched objects will only be deleted if there is no related model
     *                                      info that blocks it (ie, there' sno other data that depends on this data);
     *                                      if false, deletes regardless of other objects which may depend on it. Its
     *                                      generally advisable to always leave this as TRUE, otherwise you could
     *                                      easily corrupt your DB
     * @throws EE_Error
     * @return string    everything that comes after the WHERE statement.
     */
    protected function _setup_ids_for_delete($objects_for_deletion, $allow_blocking = true)
    {
        if ($this->has_primary_key_field()) {
            $primary_table = $this->_get_main_table();
            $other_tables = $this->_get_other_tables();
            $deletes = $query = array();
            foreach ($objects_for_deletion as $delete_object) {
                //before we mark this object for deletion,
                //make sure there's no related objects blocking its deletion (if we're checking)
                if (
                    $allow_blocking
                    && $this->delete_is_blocked_by_related_models(
                        $delete_object[$primary_table->get_fully_qualified_pk_column()]
                    )
                ) {
                    continue;
                }
                //primary table deletes
                if (isset($delete_object[$primary_table->get_fully_qualified_pk_column()])) {
                    $deletes[$primary_table->get_fully_qualified_pk_column()][] = $delete_object[$primary_table->get_fully_qualified_pk_column()];
                }
                //other tables
                if (! empty($other_tables)) {
                    foreach ($other_tables as $ot) {
                        //first check if we've got the foreign key column here.
                        if (isset($delete_object[$ot->get_fully_qualified_fk_column()])) {
                            $deletes[$ot->get_fully_qualified_pk_column()][] = $delete_object[$ot->get_fully_qualified_fk_column()];
                        }
                        // wait! it's entirely possible that we'll have a the primary key
                        // for this table in here, if it's a foreign key for one of the other secondary tables
                        if (isset($delete_object[$ot->get_fully_qualified_pk_column()])) {
                            $deletes[$ot->get_fully_qualified_pk_column()][] = $delete_object[$ot->get_fully_qualified_pk_column()];
                        }
                        // finally, it is possible that the fk for this table is found
                        // in the fully qualified pk column for the fk table, so let's see if that's there!
                        if (isset($delete_object[$ot->get_fully_qualified_pk_on_fk_table()])) {
                            $deletes[$ot->get_fully_qualified_pk_column()][] = $delete_object[$ot->get_fully_qualified_pk_column()];
                        }
                    }
                }
            }
            //we should have deletes now, so let's just go through and setup the where statement
            foreach ($deletes as $column => $values) {
                //make sure we have unique $values;
                $values = array_unique($values);
                $query[] = $column . ' IN(' . implode(",", $values) . ')';
            }
            return ! empty($query) ? implode(' AND ', $query) : '';
        } elseif (count($this->get_combined_primary_key_fields()) > 1) {
            $ways_to_identify_a_row = array();
            $fields = $this->get_combined_primary_key_fields();
            //note: because there' sno primary key, that means nothing else  can be pointing to this model, right?
            foreach ($objects_for_deletion as $delete_object) {
                $values_for_each_cpk_for_a_row = array();
                foreach ($fields as $cpk_field) {
                    if ($cpk_field instanceof EE_Model_Field_Base) {
                        $values_for_each_cpk_for_a_row[] = $cpk_field->get_qualified_column()
                                                           . "="
                                                           . $delete_object[$cpk_field->get_qualified_column()];
                    }
                }
                $ways_to_identify_a_row[] = "(" . implode(" AND ", $values_for_each_cpk_for_a_row) . ")";
            }
            return implode(" OR ", $ways_to_identify_a_row);
        } else {
            //so there's no primary key and no combined key...
            //sorry, can't help you
            throw new EE_Error(sprintf(__("Cannot delete objects of type %s because there is no primary key NOR combined key",
                "event_espresso"), get_class($this)));
        }
    }



    /**
     * Count all the rows that match criteria expressed in $query_params (an array just like arg to EEM_Base::get_all).
     * If $field_to_count isn't provided, the model's primary key is used. Otherwise, we count by field_to_count's
     * column
     *
     * @param array  $query_params   like EEM_Base::get_all's
     * @param string $field_to_count field on model to count by (not column name)
     * @param bool   $distinct       if we want to only count the distinct values for the column then you can trigger
     *                               that by the setting $distinct to TRUE;
     * @return int
     * @throws \EE_Error
     */
    public function count($query_params = array(), $field_to_count = null, $distinct = false)
    {
        $model_query_info = $this->_create_model_query_info_carrier($query_params);
        if ($field_to_count) {
            $field_obj = $this->field_settings_for($field_to_count);
            $column_to_count = $field_obj->get_qualified_column();
        } elseif ($this->has_primary_key_field()) {
            $pk_field_obj = $this->get_primary_key_field();
            $column_to_count = $pk_field_obj->get_qualified_column();
        } else {
            //there's no primary key
            //if we're counting distinct items, and there's no primary key,
            //we need to list out the columns for distinction;
            //otherwise we can just use star
            if ($distinct) {
                $columns_to_use = array();
                foreach ($this->get_combined_primary_key_fields() as $field_obj) {
                    $columns_to_use[] = $field_obj->get_qualified_column();
                }
                $column_to_count = implode(',', $columns_to_use);
            } else {
                $column_to_count = '*';
            }
        }
        $column_to_count = $distinct ? "DISTINCT " . $column_to_count : $column_to_count;
        $SQL = "SELECT COUNT(" . $column_to_count . ")" . $this->_construct_2nd_half_of_select_query($model_query_info);
        return (int)$this->_do_wpdb_query('get_var', array($SQL));
    }



    /**
     * Sums up the value of the $field_to_sum (defaults to the primary key, which isn't terribly useful)
     *
     * @param array  $query_params like EEM_Base::get_all
     * @param string $field_to_sum name of field (array key in $_fields array)
     * @return float
     * @throws \EE_Error
     */
    public function sum($query_params, $field_to_sum = null)
    {
        $model_query_info = $this->_create_model_query_info_carrier($query_params);
        if ($field_to_sum) {
            $field_obj = $this->field_settings_for($field_to_sum);
        } else {
            $field_obj = $this->get_primary_key_field();
        }
        $column_to_count = $field_obj->get_qualified_column();
        $SQL = "SELECT SUM(" . $column_to_count . ")" . $this->_construct_2nd_half_of_select_query($model_query_info);
        $return_value = $this->_do_wpdb_query('get_var', array($SQL));
        $data_type = $field_obj->get_wpdb_data_type();
        if ($data_type === '%d' || $data_type === '%s') {
            return (float)$return_value;
        } else {//must be %f
            return (float)$return_value;
        }
    }



    /**
     * Just calls the specified method on $wpdb with the given arguments
     * Consolidates a little extra error handling code
     *
     * @param string $wpdb_method
     * @param array  $arguments_to_provide
     * @throws EE_Error
     * @global wpdb  $wpdb
     * @return mixed
     */
    protected function _do_wpdb_query($wpdb_method, $arguments_to_provide)
    {
        //if we're in maintenance mode level 2, DON'T run any queries
        //because level 2 indicates the database needs updating and
        //is probably out of sync with the code
        if (! EE_Maintenance_Mode::instance()->models_can_query()) {
            throw new EE_Error(sprintf(__("Event Espresso Level 2 Maintenance mode is active. That means EE can not run ANY database queries until the necessary migration scripts have run which will take EE out of maintenance mode level 2. Please inform support of this error.",
                "event_espresso")));
        }
        /** @type WPDB $wpdb */
        global $wpdb;
        if (! method_exists($wpdb, $wpdb_method)) {
            throw new EE_Error(sprintf(__('There is no method named "%s" on Wordpress\' $wpdb object',
                'event_espresso'), $wpdb_method));
        }
        if (WP_DEBUG) {
            $old_show_errors_value = $wpdb->show_errors;
            $wpdb->show_errors(false);
        }
        $result = $this->_process_wpdb_query($wpdb_method, $arguments_to_provide);
        $this->show_db_query_if_previously_requested($wpdb->last_query);
        if (WP_DEBUG) {
            $wpdb->show_errors($old_show_errors_value);
            if (! empty($wpdb->last_error)) {
                throw new EE_Error(sprintf(__('WPDB Error: "%s"', 'event_espresso'), $wpdb->last_error));
            } elseif ($result === false) {
                throw new EE_Error(sprintf(__('WPDB Error occurred, but no error message was logged by wpdb! The wpdb method called was "%1$s" and the arguments were "%2$s"',
                    'event_espresso'), $wpdb_method, var_export($arguments_to_provide, true)));
            }
        } elseif ($result === false) {
            EE_Error::add_error(
                sprintf(
                    __('A database error has occurred. Turn on WP_DEBUG for more information.||A database error occurred doing wpdb method "%1$s", with arguments "%2$s". The error was "%3$s"',
                        'event_espresso'),
                    $wpdb_method,
                    var_export($arguments_to_provide, true),
                    $wpdb->last_error
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return $result;
    }



    /**
     * Attempts to run the indicated WPDB method with the provided arguments,
     * and if there's an error tries to verify the DB is correct. Uses
     * the static property EEM_Base::$_db_verification_level to determine whether
     * we should try to fix the EE core db, the addons, or just give up
     *
     * @param string $wpdb_method
     * @param array  $arguments_to_provide
     * @return mixed
     */
    private function _process_wpdb_query($wpdb_method, $arguments_to_provide)
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        $wpdb->last_error = null;
        $result = call_user_func_array(array($wpdb, $wpdb_method), $arguments_to_provide);
        // was there an error running the query? but we don't care on new activations
        // (we're going to setup the DB anyway on new activations)
        if (($result === false || ! empty($wpdb->last_error))
            && EE_System::instance()->detect_req_type() !== EE_System::req_type_new_activation
        ) {
            switch (EEM_Base::$_db_verification_level) {
                case EEM_Base::db_verified_none :
                    // let's double-check core's DB
                    $error_message = $this->_verify_core_db($wpdb_method, $arguments_to_provide);
                    break;
                case EEM_Base::db_verified_core :
                    // STILL NO LOVE?? verify all the addons too. Maybe they need to be fixed
                    $error_message = $this->_verify_addons_db($wpdb_method, $arguments_to_provide);
                    break;
                case EEM_Base::db_verified_addons :
                    // ummmm... you in trouble
                    return $result;
                    break;
            }
            if (! empty($error_message)) {
                EE_Log::instance()->log(__FILE__, __FUNCTION__, $error_message, 'error');
                trigger_error($error_message);
            }
            return $this->_process_wpdb_query($wpdb_method, $arguments_to_provide);
        }
        return $result;
    }



    /**
     * Verifies the EE core database is up-to-date and records that we've done it on
     * EEM_Base::$_db_verification_level
     *
     * @param string $wpdb_method
     * @param array  $arguments_to_provide
     * @return string
     */
    private function _verify_core_db($wpdb_method, $arguments_to_provide)
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        //ok remember that we've already attempted fixing the core db, in case the problem persists
        EEM_Base::$_db_verification_level = EEM_Base::db_verified_core;
        $error_message = sprintf(
            __('WPDB Error "%1$s" while running wpdb method "%2$s" with arguments %3$s. Automatically attempting to fix EE Core DB',
                'event_espresso'),
            $wpdb->last_error,
            $wpdb_method,
            wp_json_encode($arguments_to_provide)
        );
        EE_System::instance()->initialize_db_if_no_migrations_required(false, true);
        return $error_message;
    }



    /**
     * Verifies the EE addons' database is up-to-date and records that we've done it on
     * EEM_Base::$_db_verification_level
     *
     * @param $wpdb_method
     * @param $arguments_to_provide
     * @return string
     */
    private function _verify_addons_db($wpdb_method, $arguments_to_provide)
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        //ok remember that we've already attempted fixing the addons dbs, in case the problem persists
        EEM_Base::$_db_verification_level = EEM_Base::db_verified_addons;
        $error_message = sprintf(
            __('WPDB AGAIN: Error "%1$s" while running the same method and arguments as before. Automatically attempting to fix EE Addons DB',
                'event_espresso'),
            $wpdb->last_error,
            $wpdb_method,
            wp_json_encode($arguments_to_provide)
        );
        EE_System::instance()->initialize_addons();
        return $error_message;
    }



    /**
     * In order to avoid repeating this code for the get_all, sum, and count functions, put the code parts
     * that are identical in here. Returns a string of SQL of everything in a SELECT query except the beginning
     * SELECT clause, eg " FROM wp_posts AS Event INNER JOIN ... WHERE ... ORDER BY ... LIMIT ... GROUP BY ... HAVING
     * ..."
     *
     * @param EE_Model_Query_Info_Carrier $model_query_info
     * @return string
     */
    private function _construct_2nd_half_of_select_query(EE_Model_Query_Info_Carrier $model_query_info)
    {
        return " FROM " . $model_query_info->get_full_join_sql() .
               $model_query_info->get_where_sql() .
               $model_query_info->get_group_by_sql() .
               $model_query_info->get_having_sql() .
               $model_query_info->get_order_by_sql() .
               $model_query_info->get_limit_sql();
    }



    /**
     * Set to easily debug the next X queries ran from this model.
     *
     * @param int $count
     */
    public function show_next_x_db_queries($count = 1)
    {
        $this->_show_next_x_db_queries = $count;
    }



    /**
     * @param $sql_query
     */
    public function show_db_query_if_previously_requested($sql_query)
    {
        if ($this->_show_next_x_db_queries > 0) {
            echo $sql_query;
            $this->_show_next_x_db_queries--;
        }
    }



    /**
     * Adds a relationship of the correct type between $modelObject and $otherModelObject.
     * There are the 3 cases:
     * 'belongsTo' relationship: sets $id_or_obj's foreign_key to be $other_model_id_or_obj's primary_key. If
     * $otherModelObject has no ID, it is first saved.
     * 'hasMany' relationship: sets $other_model_id_or_obj's foreign_key to be $id_or_obj's primary_key. If $id_or_obj
     * has no ID, it is first saved.
     * 'hasAndBelongsToMany' relationships: checks that there isn't already an entry in the join table, and adds one.
     * If one of the model Objects has not yet been saved to the database, it is saved before adding the entry in the
     * join table
     *
     * @param        EE_Base_Class                     /int $thisModelObject
     * @param        EE_Base_Class                     /int $id_or_obj EE_base_Class or ID of other Model Object
     * @param string $relationName                     , key in EEM_Base::_relations
     *                                                 an attendee to a group, you also want to specify which role they
     *                                                 will have in that group. So you would use this parameter to
     *                                                 specify array('role-column-name'=>'role-id')
     * @param array  $extra_join_model_fields_n_values This allows you to enter further query params for the relation
     *                                                 to for relation to methods that allow you to further specify
     *                                                 extra columns to join by (such as HABTM).  Keep in mind that the
     *                                                 only acceptable query_params is strict "col" => "value" pairs
     *                                                 because these will be inserted in any new rows created as well.
     * @return EE_Base_Class which was added as a relation. Object referred to by $other_model_id_or_obj
     * @throws \EE_Error
     */
    public function add_relationship_to(
        $id_or_obj,
        $other_model_id_or_obj,
        $relationName,
        $extra_join_model_fields_n_values = array()
    ) {
        $relation_obj = $this->related_settings_for($relationName);
        return $relation_obj->add_relation_to($id_or_obj, $other_model_id_or_obj, $extra_join_model_fields_n_values);
    }



    /**
     * Removes a relationship of the correct type between $modelObject and $otherModelObject.
     * There are the 3 cases:
     * 'belongsTo' relationship: sets $modelObject's foreign_key to null, if that field is nullable.Otherwise throws an
     * error
     * 'hasMany' relationship: sets $otherModelObject's foreign_key to null,if that field is nullable.Otherwise throws
     * an error
     * 'hasAndBelongsToMany' relationships:removes any existing entry in the join table between the two models.
     *
     * @param        EE_Base_Class /int $id_or_obj
     * @param        EE_Base_Class /int $other_model_id_or_obj EE_Base_Class or ID of other Model Object
     * @param string $relationName key in EEM_Base::_relations
     * @return boolean of success
     * @throws \EE_Error
     * @param array  $where_query  This allows you to enter further query params for the relation to for relation to
     *                             methods that allow you to further specify extra columns to join by (such as HABTM).
     *                             Keep in mind that the only acceptable query_params is strict "col" => "value" pairs
     *                             because these will be inserted in any new rows created as well.
     */
    public function remove_relationship_to($id_or_obj, $other_model_id_or_obj, $relationName, $where_query = array())
    {
        $relation_obj = $this->related_settings_for($relationName);
        return $relation_obj->remove_relation_to($id_or_obj, $other_model_id_or_obj, $where_query);
    }



    /**
     * @param mixed           $id_or_obj
     * @param string          $relationName
     * @param array           $where_query_params
     * @param EE_Base_Class[] objects to which relations were removed
     * @return \EE_Base_Class[]
     * @throws \EE_Error
     */
    public function remove_relations($id_or_obj, $relationName, $where_query_params = array())
    {
        $relation_obj = $this->related_settings_for($relationName);
        return $relation_obj->remove_relations($id_or_obj, $where_query_params);
    }



    /**
     * Gets all the related items of the specified $model_name, using $query_params.
     * Note: by default, we remove the "default query params"
     * because we want to get even deleted items etc.
     *
     * @param mixed  $id_or_obj    EE_Base_Class child or its ID
     * @param string $model_name   like 'Event', 'Registration', etc. always singular
     * @param array  $query_params like EEM_Base::get_all
     * @return EE_Base_Class[]
     * @throws \EE_Error
     */
    public function get_all_related($id_or_obj, $model_name, $query_params = null)
    {
        $model_obj = $this->ensure_is_obj($id_or_obj);
        $relation_settings = $this->related_settings_for($model_name);
        return $relation_settings->get_all_related($model_obj, $query_params);
    }



    /**
     * Deletes all the model objects across the relation indicated by $model_name
     * which are related to $id_or_obj which meet the criteria set in $query_params.
     * However, if the model objects can't be deleted because of blocking related model objects, then
     * they aren't deleted. (Unless the thing that would have been deleted can be soft-deleted, that still happens).
     *
     * @param EE_Base_Class|int|string $id_or_obj
     * @param string                   $model_name
     * @param array                    $query_params
     * @return int how many deleted
     * @throws \EE_Error
     */
    public function delete_related($id_or_obj, $model_name, $query_params = array())
    {
        $model_obj = $this->ensure_is_obj($id_or_obj);
        $relation_settings = $this->related_settings_for($model_name);
        return $relation_settings->delete_all_related($model_obj, $query_params);
    }



    /**
     * Hard deletes all the model objects across the relation indicated by $model_name
     * which are related to $id_or_obj which meet the criteria set in $query_params. If
     * the model objects can't be hard deleted because of blocking related model objects,
     * just does a soft-delete on them instead.
     *
     * @param EE_Base_Class|int|string $id_or_obj
     * @param string                   $model_name
     * @param array                    $query_params
     * @return int how many deleted
     * @throws \EE_Error
     */
    public function delete_related_permanently($id_or_obj, $model_name, $query_params = array())
    {
        $model_obj = $this->ensure_is_obj($id_or_obj);
        $relation_settings = $this->related_settings_for($model_name);
        return $relation_settings->delete_related_permanently($model_obj, $query_params);
    }



    /**
     * Instead of getting the related model objects, simply counts them. Ignores default_where_conditions by default,
     * unless otherwise specified in the $query_params
     *
     * @param        int             /EE_Base_Class $id_or_obj
     * @param string $model_name     like 'Event', or 'Registration'
     * @param array  $query_params   like EEM_Base::get_all's
     * @param string $field_to_count name of field to count by. By default, uses primary key
     * @param bool   $distinct       if we want to only count the distinct values for the column then you can trigger
     *                               that by the setting $distinct to TRUE;
     * @return int
     * @throws \EE_Error
     */
    public function count_related(
        $id_or_obj,
        $model_name,
        $query_params = array(),
        $field_to_count = null,
        $distinct = false
    ) {
        $related_model = $this->get_related_model_obj($model_name);
        //we're just going to use the query params on the related model's normal get_all query,
        //except add a condition to say to match the current mod
        if (! isset($query_params['default_where_conditions'])) {
            $query_params['default_where_conditions'] = EEM_Base::default_where_conditions_none;
        }
        $this_model_name = $this->get_this_model_name();
        $this_pk_field_name = $this->get_primary_key_field()->get_name();
        $query_params[0][$this_model_name . "." . $this_pk_field_name] = $id_or_obj;
        return $related_model->count($query_params, $field_to_count, $distinct);
    }



    /**
     * Instead of getting the related model objects, simply sums up the values of the specified field.
     * Note: ignores default_where_conditions by default, unless otherwise specified in the $query_params
     *
     * @param        int           /EE_Base_Class $id_or_obj
     * @param string $model_name   like 'Event', or 'Registration'
     * @param array  $query_params like EEM_Base::get_all's
     * @param string $field_to_sum name of field to count by. By default, uses primary key
     * @return float
     * @throws \EE_Error
     */
    public function sum_related($id_or_obj, $model_name, $query_params, $field_to_sum = null)
    {
        $related_model = $this->get_related_model_obj($model_name);
        if (! is_array($query_params)) {
            EE_Error::doing_it_wrong('EEM_Base::sum_related',
                sprintf(__('$query_params should be an array, you passed a variable of type %s', 'event_espresso'),
                    gettype($query_params)), '4.6.0');
            $query_params = array();
        }
        //we're just going to use the query params on the related model's normal get_all query,
        //except add a condition to say to match the current mod
        if (! isset($query_params['default_where_conditions'])) {
            $query_params['default_where_conditions'] = EEM_Base::default_where_conditions_none;
        }
        $this_model_name = $this->get_this_model_name();
        $this_pk_field_name = $this->get_primary_key_field()->get_name();
        $query_params[0][$this_model_name . "." . $this_pk_field_name] = $id_or_obj;
        return $related_model->sum($query_params, $field_to_sum);
    }



    /**
     * Uses $this->_relatedModels info to find the first related model object of relation $relationName to the given
     * $modelObject
     *
     * @param int | EE_Base_Class $id_or_obj        EE_Base_Class child or its ID
     * @param string              $other_model_name , key in $this->_relatedModels, eg 'Registration', or 'Events'
     * @param array               $query_params     like EEM_Base::get_all's
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function get_first_related(EE_Base_Class $id_or_obj, $other_model_name, $query_params)
    {
        $query_params['limit'] = 1;
        $results = $this->get_all_related($id_or_obj, $other_model_name, $query_params);
        if ($results) {
            return array_shift($results);
        } else {
            return null;
        }
    }



    /**
     * Gets the model's name as it's expected in queries. For example, if this is EEM_Event model, that would be Event
     *
     * @return string
     */
    public function get_this_model_name()
    {
        return str_replace("EEM_", "", get_class($this));
    }



    /**
     * Gets the model field on this model which is of type EE_Any_Foreign_Model_Name_Field
     *
     * @return EE_Any_Foreign_Model_Name_Field
     * @throws EE_Error
     */
    public function get_field_containing_related_model_name()
    {
        foreach ($this->field_settings(true) as $field) {
            if ($field instanceof EE_Any_Foreign_Model_Name_Field) {
                $field_with_model_name = $field;
            }
        }
        if (! isset($field_with_model_name) || ! $field_with_model_name) {
            throw new EE_Error(sprintf(__("There is no EE_Any_Foreign_Model_Name field on model %s", "event_espresso"),
                $this->get_this_model_name()));
        }
        return $field_with_model_name;
    }



    /**
     * Inserts a new entry into the database, for each table.
     * Note: does not add the item to the entity map because that is done by EE_Base_Class::save() right after this.
     * If client code uses EEM_Base::insert() directly, then although the item isn't in the entity map,
     * we also know there is no model object with the newly inserted item's ID at the moment (because
     * if there were, then they would already be in the DB and this would fail); and in the future if someone
     * creates a model object with this ID (or grabs it from the DB) then it will be added to the
     * entity map at that time anyways. SO, no need for EEM_Base::insert ot add to the entity map
     *
     * @param array $field_n_values keys are field names, values are their values (in the client code's domain if
     *                              $values_already_prepared_by_model_object is false, in the model object's domain if
     *                              $values_already_prepared_by_model_object is true. See comment about this at the top
     *                              of EEM_Base)
     * @return int new primary key on main table that got inserted
     * @throws EE_Error
     */
    public function insert($field_n_values)
    {
        /**
         * Filters the fields and their values before inserting an item using the models
         *
         * @param array    $fields_n_values keys are the fields and values are their new values
         * @param EEM_Base $model           the model used
         */
        $field_n_values = (array)apply_filters('FHEE__EEM_Base__insert__fields_n_values', $field_n_values, $this);
        if ($this->_satisfies_unique_indexes($field_n_values)) {
            $main_table = $this->_get_main_table();
            $new_id = $this->_insert_into_specific_table($main_table, $field_n_values, false);
            if ($new_id !== false) {
                foreach ($this->_get_other_tables() as $other_table) {
                    $this->_insert_into_specific_table($other_table, $field_n_values, $new_id);
                }
            }
            /**
             * Done just after attempting to insert a new model object
             *
             * @param EEM_Base   $model           used
             * @param array      $fields_n_values fields and their values
             * @param int|string the              ID of the newly-inserted model object
             */
            do_action('AHEE__EEM_Base__insert__end', $this, $field_n_values, $new_id);
            return $new_id;
        } else {
            return false;
        }
    }



    /**
     * Checks that the result would satisfy the unique indexes on this model
     *
     * @param array  $field_n_values
     * @param string $action
     * @return boolean
     * @throws \EE_Error
     */
    protected function _satisfies_unique_indexes($field_n_values, $action = 'insert')
    {
        foreach ($this->unique_indexes() as $index_name => $index) {
            $uniqueness_where_params = array_intersect_key($field_n_values, $index->fields());
            if ($this->exists(array($uniqueness_where_params))) {
                EE_Error::add_error(
                    sprintf(
                        __(
                            "Could not %s %s. %s uniqueness index failed. Fields %s must form a unique set, but an entry already exists with values %s.",
                            "event_espresso"
                        ),
                        $action,
                        $this->_get_class_name(),
                        $index_name,
                        implode(",", $index->field_names()),
                        http_build_query($uniqueness_where_params)
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
        }
        return true;
    }



    /**
     * Checks the database for an item that conflicts (ie, if this item were
     * saved to the DB would break some uniqueness requirement, like a primary key
     * or an index primary key set) with the item specified. $id_obj_or_fields_array
     * can be either an EE_Base_Class or an array of fields n values
     *
     * @param EE_Base_Class|array $obj_or_fields_array
     * @param boolean             $include_primary_key whether to use the model object's primary key
     *                                                 when looking for conflicts
     *                                                 (ie, if false, we ignore the model object's primary key
     *                                                 when finding "conflicts". If true, it's also considered).
     *                                                 Only works for INT primary key,
     *                                                 STRING primary keys cannot be ignored
     * @throws EE_Error
     * @return EE_Base_Class|array
     */
    public function get_one_conflicting($obj_or_fields_array, $include_primary_key = true)
    {
        if ($obj_or_fields_array instanceof EE_Base_Class) {
            $fields_n_values = $obj_or_fields_array->model_field_array();
        } elseif (is_array($obj_or_fields_array)) {
            $fields_n_values = $obj_or_fields_array;
        } else {
            throw new EE_Error(
                sprintf(
                    __(
                        "%s get_all_conflicting should be called with a model object or an array of field names and values, you provided %d",
                        "event_espresso"
                    ),
                    get_class($this),
                    $obj_or_fields_array
                )
            );
        }
        $query_params = array();
        if ($this->has_primary_key_field()
            && ($include_primary_key
                || $this->get_primary_key_field()
                   instanceof
                   EE_Primary_Key_String_Field)
            && isset($fields_n_values[$this->primary_key_name()])
        ) {
            $query_params[0]['OR'][$this->primary_key_name()] = $fields_n_values[$this->primary_key_name()];
        }
        foreach ($this->unique_indexes() as $unique_index_name => $unique_index) {
            $uniqueness_where_params = array_intersect_key($fields_n_values, $unique_index->fields());
            $query_params[0]['OR']['AND*' . $unique_index_name] = $uniqueness_where_params;
        }
        //if there is nothing to base this search on, then we shouldn't find anything
        if (empty($query_params)) {
            return array();
        } else {
            return $this->get_one($query_params);
        }
    }



    /**
     * Like count, but is optimized and returns a boolean instead of an int
     *
     * @param array $query_params
     * @return boolean
     * @throws \EE_Error
     */
    public function exists($query_params)
    {
        $query_params['limit'] = 1;
        return $this->count($query_params) > 0;
    }



    /**
     * Wrapper for exists, except ignores default query parameters so we're only considering ID
     *
     * @param int|string $id
     * @return boolean
     * @throws \EE_Error
     */
    public function exists_by_ID($id)
    {
        return $this->exists(
            array(
                'default_where_conditions' => EEM_Base::default_where_conditions_none,
                array(
                    $this->primary_key_name() => $id,
                ),
            )
        );
    }



    /**
     * Inserts a new row in $table, using the $cols_n_values which apply to that table.
     * If a $new_id is supplied and if $table is an EE_Other_Table, we assume
     * we need to add a foreign key column to point to $new_id (which should be the primary key's value
     * on the main table)
     * This is protected rather than private because private is not accessible to any child methods and there MAY be
     * cases where we want to call it directly rather than via insert().
     *
     * @access   protected
     * @param EE_Table_Base $table
     * @param array         $fields_n_values each key should be in field's keys, and value should be an int, string or
     *                                       float
     * @param int           $new_id          for now we assume only int keys
     * @throws EE_Error
     * @global WPDB         $wpdb            only used to get the $wpdb->insert_id after performing an insert
     * @return int ID of new row inserted, or FALSE on failure
     */
    protected function _insert_into_specific_table(EE_Table_Base $table, $fields_n_values, $new_id = 0)
    {
        global $wpdb;
        $insertion_col_n_values = array();
        $format_for_insertion = array();
        $fields_on_table = $this->_get_fields_for_table($table->get_table_alias());
        foreach ($fields_on_table as $field_name => $field_obj) {
            //check if its an auto-incrementing column, in which case we should just leave it to do its autoincrement thing
            if ($field_obj->is_auto_increment()) {
                continue;
            }
            $prepared_value = $this->_prepare_value_or_use_default($field_obj, $fields_n_values);
            //if the value we want to assign it to is NULL, just don't mention it for the insertion
            if ($prepared_value !== null) {
                $insertion_col_n_values[$field_obj->get_table_column()] = $prepared_value;
                $format_for_insertion[] = $field_obj->get_wpdb_data_type();
            }
        }
        if ($table instanceof EE_Secondary_Table && $new_id) {
            //its not the main table, so we should have already saved the main table's PK which we just inserted
            //so add the fk to the main table as a column
            $insertion_col_n_values[$table->get_fk_on_table()] = $new_id;
            $format_for_insertion[] = '%d';//yes right now we're only allowing these foreign keys to be INTs
        }
        //insert the new entry
        $result = $this->_do_wpdb_query('insert',
            array($table->get_table_name(), $insertion_col_n_values, $format_for_insertion));
        if ($result === false) {
            return false;
        }
        //ok, now what do we return for the ID of the newly-inserted thing?
        if ($this->has_primary_key_field()) {
            if ($this->get_primary_key_field()->is_auto_increment()) {
                return $wpdb->insert_id;
            } else {
                //it's not an auto-increment primary key, so
                //it must have been supplied
                return $fields_n_values[$this->get_primary_key_field()->get_name()];
            }
        } else {
            //we can't return a  primary key because there is none. instead return
            //a unique string indicating this model
            return $this->get_index_primary_key_string($fields_n_values);
        }
    }



    /**
     * Prepare the $field_obj 's value in $fields_n_values for use in the database.
     * If the field doesn't allow NULL, try to use its default. (If it doesn't allow NULL,
     * and there is no default, we pass it along. WPDB will take care of it)
     *
     * @param EE_Model_Field_Base $field_obj
     * @param array               $fields_n_values
     * @return mixed string|int|float depending on what the table column will be expecting
     * @throws \EE_Error
     */
    protected function _prepare_value_or_use_default($field_obj, $fields_n_values)
    {
        //if this field doesn't allow nullable, don't allow it
        if (! $field_obj->is_nullable()
            && (
                ! isset($fields_n_values[$field_obj->get_name()]) || $fields_n_values[$field_obj->get_name()] === null)
        ) {
            $fields_n_values[$field_obj->get_name()] = $field_obj->get_default_value();
        }
        $unprepared_value = isset($fields_n_values[$field_obj->get_name()]) ? $fields_n_values[$field_obj->get_name()]
            : null;
        return $this->_prepare_value_for_use_in_db($unprepared_value, $field_obj);
    }



    /**
     * Consolidates code for preparing  a value supplied to the model for use int eh db. Calls the field's
     * prepare_for_use_in_db method on the value, and depending on $value_already_prepare_by_model_obj, may also call
     * the field's prepare_for_set() method.
     *
     * @param mixed               $value value in the client code domain if $value_already_prepared_by_model_object is
     *                                   false, otherwise a value in the model object's domain (see lengthy comment at
     *                                   top of file)
     * @param EE_Model_Field_Base $field field which will be doing the preparing of the value. If null, we assume
     *                                   $value is a custom selection
     * @return mixed a value ready for use in the database for insertions, updating, or in a where clause
     */
    private function _prepare_value_for_use_in_db($value, $field)
    {
        if ($field && $field instanceof EE_Model_Field_Base) {
            switch ($this->_values_already_prepared_by_model_object) {
                /** @noinspection PhpMissingBreakStatementInspection */
                case self::not_prepared_by_model_object:
                    $value = $field->prepare_for_set($value);
                //purposefully left out "return"
                case self::prepared_by_model_object:
                    $value = $field->prepare_for_use_in_db($value);
                case self::prepared_for_use_in_db:
                    //leave the value alone
            }
            return $value;
        } else {
            return $value;
        }
    }



    /**
     * Returns the main table on this model
     *
     * @return EE_Primary_Table
     * @throws EE_Error
     */
    protected function _get_main_table()
    {
        foreach ($this->_tables as $table) {
            if ($table instanceof EE_Primary_Table) {
                return $table;
            }
        }
        throw new EE_Error(sprintf(__('There are no main tables on %s. They should be added to _tables array in the constructor',
            'event_espresso'), get_class($this)));
    }



    /**
     * table
     * returns EE_Primary_Table table name
     *
     * @return string
     * @throws \EE_Error
     */
    public function table()
    {
        return $this->_get_main_table()->get_table_name();
    }



    /**
     * table
     * returns first EE_Secondary_Table table name
     *
     * @return string
     */
    public function second_table()
    {
        // grab second table from tables array
        $second_table = end($this->_tables);
        return $second_table instanceof EE_Secondary_Table ? $second_table->get_table_name() : null;
    }



    /**
     * get_table_obj_by_alias
     * returns table name given it's alias
     *
     * @param string $table_alias
     * @return EE_Primary_Table | EE_Secondary_Table
     */
    public function get_table_obj_by_alias($table_alias = '')
    {
        return isset($this->_tables[$table_alias]) ? $this->_tables[$table_alias] : null;
    }



    /**
     * Gets all the tables of type EE_Other_Table from EEM_CPT_Basel_Model::_tables
     *
     * @return EE_Secondary_Table[]
     */
    protected function _get_other_tables()
    {
        $other_tables = array();
        foreach ($this->_tables as $table_alias => $table) {
            if ($table instanceof EE_Secondary_Table) {
                $other_tables[$table_alias] = $table;
            }
        }
        return $other_tables;
    }



    /**
     * Finds all the fields that correspond to the given table
     *
     * @param string $table_alias , array key in EEM_Base::_tables
     * @return EE_Model_Field_Base[]
     */
    public function _get_fields_for_table($table_alias)
    {
        return $this->_fields[$table_alias];
    }



    /**
     * Recurses through all the where parameters, and finds all the related models we'll need
     * to complete this query. Eg, given where parameters like array('EVT_ID'=>3) from within Event model, we won't
     * need any related models. But if the array were array('Registrations.REG_ID'=>3), we'd need the related
     * Registration model. If it were array('Registrations.Transactions.Payments.PAY_ID'=>3), then we'd need the
     * related Registration, Transaction, and Payment models.
     *
     * @param array $query_params like EEM_Base::get_all's $query_parameters['where']
     * @return EE_Model_Query_Info_Carrier
     * @throws \EE_Error
     */
    public function _extract_related_models_from_query($query_params)
    {
        $query_info_carrier = new EE_Model_Query_Info_Carrier();
        if (array_key_exists(0, $query_params)) {
            $this->_extract_related_models_from_sub_params_array_keys($query_params[0], $query_info_carrier, 0);
        }
        if (array_key_exists('group_by', $query_params)) {
            if (is_array($query_params['group_by'])) {
                $this->_extract_related_models_from_sub_params_array_values(
                    $query_params['group_by'],
                    $query_info_carrier,
                    'group_by'
                );
            } elseif (! empty ($query_params['group_by'])) {
                $this->_extract_related_model_info_from_query_param(
                    $query_params['group_by'],
                    $query_info_carrier,
                    'group_by'
                );
            }
        }
        if (array_key_exists('having', $query_params)) {
            $this->_extract_related_models_from_sub_params_array_keys(
                $query_params[0],
                $query_info_carrier,
                'having'
            );
        }
        if (array_key_exists('order_by', $query_params)) {
            if (is_array($query_params['order_by'])) {
                $this->_extract_related_models_from_sub_params_array_keys(
                    $query_params['order_by'],
                    $query_info_carrier,
                    'order_by'
                );
            } elseif (! empty($query_params['order_by'])) {
                $this->_extract_related_model_info_from_query_param(
                    $query_params['order_by'],
                    $query_info_carrier,
                    'order_by'
                );
            }
        }
        if (array_key_exists('force_join', $query_params)) {
            $this->_extract_related_models_from_sub_params_array_values(
                $query_params['force_join'],
                $query_info_carrier,
                'force_join'
            );
        }
        return $query_info_carrier;
    }



    /**
     * For extracting related models from WHERE (0), HAVING (having), ORDER BY (order_by) or forced joins (force_join)
     *
     * @param array                       $sub_query_params like EEM_Base::get_all's $query_params[0] or
     *                                                      $query_params['having']
     * @param EE_Model_Query_Info_Carrier $model_query_info_carrier
     * @param string                      $query_param_type one of $this->_allowed_query_params
     * @throws EE_Error
     * @return \EE_Model_Query_Info_Carrier
     */
    private function _extract_related_models_from_sub_params_array_keys(
        $sub_query_params,
        EE_Model_Query_Info_Carrier $model_query_info_carrier,
        $query_param_type
    ) {
        if (! empty($sub_query_params)) {
            $sub_query_params = (array)$sub_query_params;
            foreach ($sub_query_params as $param => $possibly_array_of_params) {
                //$param could be simply 'EVT_ID', or it could be 'Registrations.REG_ID', or even 'Registrations.Transactions.Payments.PAY_amount'
                $this->_extract_related_model_info_from_query_param($param, $model_query_info_carrier,
                    $query_param_type);
                //if $possibly_array_of_params is an array, try recursing into it, searching for keys which
                //indicate needed joins. Eg, array('NOT'=>array('Registration.TXN_ID'=>23)). In this case, we tried
                //extracting models out of the 'NOT', which obviously wasn't successful, and then we recurse into the value
                //of array('Registration.TXN_ID'=>23)
                $query_param_sans_stars = $this->_remove_stars_and_anything_after_from_condition_query_param_key($param);
                if (in_array($query_param_sans_stars, $this->_logic_query_param_keys, true)) {
                    if (! is_array($possibly_array_of_params)) {
                        throw new EE_Error(sprintf(__("You used a special where query param %s, but the value isn't an array of where query params, it's just %s'. It should be an array, eg array('EVT_ID'=>23,'OR'=>array('Venue.VNU_ID'=>32,'Venue.VNU_name'=>'monkey_land'))",
                            "event_espresso"),
                            $param, $possibly_array_of_params));
                    } else {
                        $this->_extract_related_models_from_sub_params_array_keys($possibly_array_of_params,
                            $model_query_info_carrier, $query_param_type);
                    }
                } elseif ($query_param_type === 0 //ie WHERE
                          && is_array($possibly_array_of_params)
                          && isset($possibly_array_of_params[2])
                          && $possibly_array_of_params[2] == true
                ) {
                    //then $possible_array_of_params looks something like array('<','DTT_sold',true)
                    //indicating that $possible_array_of_params[1] is actually a field name,
                    //from which we should extract query parameters!
                    if (! isset($possibly_array_of_params[0], $possibly_array_of_params[1])) {
                        throw new EE_Error(sprintf(__("Improperly formed query parameter %s. It should be numerically indexed like array('<','DTT_sold',true); but you provided %s",
                            "event_espresso"), $query_param_type, implode(",", $possibly_array_of_params)));
                    }
                    $this->_extract_related_model_info_from_query_param($possibly_array_of_params[1],
                        $model_query_info_carrier, $query_param_type);
                }
            }
        }
        return $model_query_info_carrier;
    }



    /**
     * For extracting related models from forced_joins, where the array values contain the info about what
     * models to join with. Eg an array like array('Attendee','Price.Price_Type');
     *
     * @param array                       $sub_query_params like EEM_Base::get_all's $query_params[0] or
     *                                                      $query_params['having']
     * @param EE_Model_Query_Info_Carrier $model_query_info_carrier
     * @param string                      $query_param_type one of $this->_allowed_query_params
     * @throws EE_Error
     * @return \EE_Model_Query_Info_Carrier
     */
    private function _extract_related_models_from_sub_params_array_values(
        $sub_query_params,
        EE_Model_Query_Info_Carrier $model_query_info_carrier,
        $query_param_type
    ) {
        if (! empty($sub_query_params)) {
            if (! is_array($sub_query_params)) {
                throw new EE_Error(sprintf(__("Query parameter %s should be an array, but it isn't.", "event_espresso"),
                    $sub_query_params));
            }
            foreach ($sub_query_params as $param) {
                //$param could be simply 'EVT_ID', or it could be 'Registrations.REG_ID', or even 'Registrations.Transactions.Payments.PAY_amount'
                $this->_extract_related_model_info_from_query_param($param, $model_query_info_carrier,
                    $query_param_type);
            }
        }
        return $model_query_info_carrier;
    }



    /**
     * Extract all the query parts from $query_params (an array like whats passed to EEM_Base::get_all)
     * and put into a EEM_Related_Model_Info_Carrier for easy extraction into a query. We create this object
     * instead of directly constructing the SQL because often we need to extract info from the $query_params
     * but use them in a different order. Eg, we need to know what models we are querying
     * before we know what joins to perform. However, we need to know what data types correspond to which fields on
     * other models before we can finalize the where clause SQL.
     *
     * @param array $query_params
     * @throws EE_Error
     * @return EE_Model_Query_Info_Carrier
     */
    public function _create_model_query_info_carrier($query_params)
    {
        if (! is_array($query_params)) {
            EE_Error::doing_it_wrong(
                'EEM_Base::_create_model_query_info_carrier',
                sprintf(
                    __(
                        '$query_params should be an array, you passed a variable of type %s',
                        'event_espresso'
                    ),
                    gettype($query_params)
                ),
                '4.6.0'
            );
            $query_params = array();
        }
        $where_query_params = isset($query_params[0]) ? $query_params[0] : array();
        //first check if we should alter the query to account for caps or not
        //because the caps might require us to do extra joins
        if (isset($query_params['caps']) && $query_params['caps'] !== 'none') {
            $query_params[0] = $where_query_params = array_replace_recursive(
                $where_query_params,
                $this->caps_where_conditions(
                    $query_params['caps']
                )
            );
        }
        $query_object = $this->_extract_related_models_from_query($query_params);
        //verify where_query_params has NO numeric indexes.... that's simply not how you use it!
        foreach ($where_query_params as $key => $value) {
            if (is_int($key)) {
                throw new EE_Error(
                    sprintf(
                        __(
                            "WHERE query params must NOT be numerically-indexed. You provided the array key '%s' for value '%s' while querying model %s. All the query params provided were '%s' Please read documentation on EEM_Base::get_all.",
                            "event_espresso"
                        ),
                        $key,
                        var_export($value, true),
                        var_export($query_params, true),
                        get_class($this)
                    )
                );
            }
        }
        if (
            array_key_exists('default_where_conditions', $query_params)
            && ! empty($query_params['default_where_conditions'])
        ) {
            $use_default_where_conditions = $query_params['default_where_conditions'];
        } else {
            $use_default_where_conditions = EEM_Base::default_where_conditions_all;
        }
        $where_query_params = array_merge(
            $this->_get_default_where_conditions_for_models_in_query(
                $query_object,
                $use_default_where_conditions,
                $where_query_params
            ),
            $where_query_params
        );
        $query_object->set_where_sql($this->_construct_where_clause($where_query_params));
        // if this is a "on_join_limit" then we are limiting on on a specific table in a multi_table join.
        // So we need to setup a subquery and use that for the main join.
        // Note for now this only works on the primary table for the model.
        // So for instance, you could set the limit array like this:
        // array( 'on_join_limit' => array('Primary_Table_Alias', array(1,10) ) )
        if (array_key_exists('on_join_limit', $query_params) && ! empty($query_params['on_join_limit'])) {
            $query_object->set_main_model_join_sql(
                $this->_construct_limit_join_select(
                    $query_params['on_join_limit'][0],
                    $query_params['on_join_limit'][1]
                )
            );
        }
        //set limit
        if (array_key_exists('limit', $query_params)) {
            if (is_array($query_params['limit'])) {
                if (! isset($query_params['limit'][0], $query_params['limit'][1])) {
                    $e = sprintf(
                        __(
                            "Invalid DB query. You passed '%s' for the LIMIT, but only the following are valid: an integer, string representing an integer, a string like 'int,int', or an array like array(int,int)",
                            "event_espresso"
                        ),
                        http_build_query($query_params['limit'])
                    );
                    throw new EE_Error($e . "|" . $e);
                }
                //they passed us an array for the limit. Assume it's like array(50,25), meaning offset by 50, and get 25
                $query_object->set_limit_sql(" LIMIT " . $query_params['limit'][0] . "," . $query_params['limit'][1]);
            } elseif (! empty ($query_params['limit'])) {
                $query_object->set_limit_sql(" LIMIT " . $query_params['limit']);
            }
        }
        //set order by
        if (array_key_exists('order_by', $query_params)) {
            if (is_array($query_params['order_by'])) {
                //if they're using 'order_by' as an array, they can't use 'order' (because 'order_by' must
                //specify whether to ascend or descend on each field. Eg 'order_by'=>array('EVT_ID'=>'ASC'). So
                //including 'order' wouldn't make any sense if 'order_by' has already specified which way to order!
                if (array_key_exists('order', $query_params)) {
                    throw new EE_Error(
                        sprintf(
                            __(
                                "In querying %s, we are using query parameter 'order_by' as an array (keys:%s,values:%s), and so we can't use query parameter 'order' (value %s). You should just use the 'order_by' parameter ",
                                "event_espresso"
                            ),
                            get_class($this),
                            implode(", ", array_keys($query_params['order_by'])),
                            implode(", ", $query_params['order_by']),
                            $query_params['order']
                        )
                    );
                }
                $this->_extract_related_models_from_sub_params_array_keys(
                    $query_params['order_by'],
                    $query_object,
                    'order_by'
                );
                //assume it's an array of fields to order by
                $order_array = array();
                foreach ($query_params['order_by'] as $field_name_to_order_by => $order) {
                    $order = $this->_extract_order($order);
                    $order_array[] = $this->_deduce_column_name_from_query_param($field_name_to_order_by) . SP . $order;
                }
                $query_object->set_order_by_sql(" ORDER BY " . implode(",", $order_array));
            } elseif (! empty ($query_params['order_by'])) {
                $this->_extract_related_model_info_from_query_param(
                    $query_params['order_by'],
                    $query_object,
                    'order',
                    $query_params['order_by']
                );
                $order = isset($query_params['order'])
                    ? $this->_extract_order($query_params['order'])
                    : 'DESC';
                $query_object->set_order_by_sql(
                    " ORDER BY " . $this->_deduce_column_name_from_query_param($query_params['order_by']) . SP . $order
                );
            }
        }
        //if 'order_by' wasn't set, maybe they are just using 'order' on its own?
        if (! array_key_exists('order_by', $query_params)
            && array_key_exists('order', $query_params)
            && ! empty($query_params['order'])
        ) {
            $pk_field = $this->get_primary_key_field();
            $order = $this->_extract_order($query_params['order']);
            $query_object->set_order_by_sql(" ORDER BY " . $pk_field->get_qualified_column() . SP . $order);
        }
        //set group by
        if (array_key_exists('group_by', $query_params)) {
            if (is_array($query_params['group_by'])) {
                //it's an array, so assume we'll be grouping by a bunch of stuff
                $group_by_array = array();
                foreach ($query_params['group_by'] as $field_name_to_group_by) {
                    $group_by_array[] = $this->_deduce_column_name_from_query_param($field_name_to_group_by);
                }
                $query_object->set_group_by_sql(" GROUP BY " . implode(", ", $group_by_array));
            } elseif (! empty ($query_params['group_by'])) {
                $query_object->set_group_by_sql(
                    " GROUP BY " . $this->_deduce_column_name_from_query_param($query_params['group_by'])
                );
            }
        }
        //set having
        if (array_key_exists('having', $query_params) && $query_params['having']) {
            $query_object->set_having_sql($this->_construct_having_clause($query_params['having']));
        }
        //now, just verify they didn't pass anything wack
        foreach ($query_params as $query_key => $query_value) {
            if (! in_array($query_key, $this->_allowed_query_params, true)) {
                throw new EE_Error(
                    sprintf(
                        __(
                            "You passed %s as a query parameter to %s, which is illegal! The allowed query parameters are %s",
                            'event_espresso'
                        ),
                        $query_key,
                        get_class($this),
                        //						print_r( $this->_allowed_query_params, TRUE )
                        implode(',', $this->_allowed_query_params)
                    )
                );
            }
        }
        $main_model_join_sql = $query_object->get_main_model_join_sql();
        if (empty($main_model_join_sql)) {
            $query_object->set_main_model_join_sql($this->_construct_internal_join());
        }
        return $query_object;
    }



    /**
     * Gets the where conditions that should be imposed on the query based on the
     * context (eg reading frontend, backend, edit or delete).
     *
     * @param string $context one of EEM_Base::valid_cap_contexts()
     * @return array like EEM_Base::get_all() 's $query_params[0]
     * @throws \EE_Error
     */
    public function caps_where_conditions($context = self::caps_read)
    {
        EEM_Base::verify_is_valid_cap_context($context);
        $cap_where_conditions = array();
        $cap_restrictions = $this->caps_missing($context);
        /**
         * @var $cap_restrictions EE_Default_Where_Conditions[]
         */
        foreach ($cap_restrictions as $cap => $restriction_if_no_cap) {
            $cap_where_conditions = array_replace_recursive($cap_where_conditions,
                $restriction_if_no_cap->get_default_where_conditions());
        }
        return apply_filters('FHEE__EEM_Base__caps_where_conditions__return', $cap_where_conditions, $this, $context,
            $cap_restrictions);
    }



    /**
     * Verifies that $should_be_order_string is in $this->_allowed_order_values,
     * otherwise throws an exception
     *
     * @param string $should_be_order_string
     * @return string either ASC, asc, DESC or desc
     * @throws EE_Error
     */
    private function _extract_order($should_be_order_string)
    {
        if (in_array($should_be_order_string, $this->_allowed_order_values)) {
            return $should_be_order_string;
        } else {
            throw new EE_Error(sprintf(__("While performing a query on '%s', tried to use '%s' as an order parameter. ",
                "event_espresso"), get_class($this), $should_be_order_string));
        }
    }



    /**
     * Looks at all the models which are included in this query, and asks each
     * for their universal_where_params, and returns them in the same format as $query_params[0] (where),
     * so they can be merged
     *
     * @param EE_Model_Query_Info_Carrier $query_info_carrier
     * @param string                      $use_default_where_conditions can be 'none','other_models_only', or 'all'.
     *                                                                  'none' means NO default where conditions will
     *                                                                  be used AT ALL during this query.
     *                                                                  'other_models_only' means default where
     *                                                                  conditions from other models will be used, but
     *                                                                  not for this primary model. 'all', the default,
     *                                                                  means default where conditions will apply as
     *                                                                  normal
     * @param array                       $where_query_params           like EEM_Base::get_all's $query_params[0]
     * @throws EE_Error
     * @return array like $query_params[0], see EEM_Base::get_all for documentation
     */
    private function _get_default_where_conditions_for_models_in_query(
        EE_Model_Query_Info_Carrier $query_info_carrier,
        $use_default_where_conditions = EEM_Base::default_where_conditions_all,
        $where_query_params = array()
    ) {
        $allowed_used_default_where_conditions_values = EEM_Base::valid_default_where_conditions();
        if (! in_array($use_default_where_conditions, $allowed_used_default_where_conditions_values)) {
            throw new EE_Error(sprintf(__("You passed an invalid value to the query parameter 'default_where_conditions' of '%s'. Allowed values are %s",
                "event_espresso"), $use_default_where_conditions,
                implode(", ", $allowed_used_default_where_conditions_values)));
        }
        $universal_query_params = array();
        if ($this->_should_use_default_where_conditions( $use_default_where_conditions, true)) {
            $universal_query_params = $this->_get_default_where_conditions();
        } else if ($this->_should_use_minimum_where_conditions( $use_default_where_conditions, true)) {
            $universal_query_params = $this->_get_minimum_where_conditions();
        }
        foreach ($query_info_carrier->get_model_names_included() as $model_relation_path => $model_name) {
            $related_model = $this->get_related_model_obj($model_name);
            if ( $this->_should_use_default_where_conditions( $use_default_where_conditions, false)) {
                $related_model_universal_where_params = $related_model->_get_default_where_conditions($model_relation_path);
            } elseif ($this->_should_use_minimum_where_conditions( $use_default_where_conditions, false)) {
                $related_model_universal_where_params = $related_model->_get_minimum_where_conditions($model_relation_path);
            } else {
                //we don't want to add full or even minimum default where conditions from this model, so just continue
                continue;
            }
            $overrides = $this->_override_defaults_or_make_null_friendly(
                $related_model_universal_where_params,
                $where_query_params,
                $related_model,
                $model_relation_path
            );
            $universal_query_params = EEH_Array::merge_arrays_and_overwrite_keys(
                $universal_query_params,
                $overrides
            );
        }
        return $universal_query_params;
    }



    /**
     * Determines whether or not we should use default where conditions for the model in question
     * (this model, or other related models).
     * Basically, we should use default where conditions on this model if they have requested to use them on all models,
     * this model only, or to use minimum where conditions on all other models and normal where conditions on this one.
     * We should use default where conditions on related models when they requested to use default where conditions
     * on all models, or specifically just on other related models
     * @param      $default_where_conditions_value
     * @param bool $for_this_model false means this is for OTHER related models
     * @return bool
     */
    private function _should_use_default_where_conditions( $default_where_conditions_value, $for_this_model = true )
    {
        return (
                   $for_this_model
                   && in_array(
                       $default_where_conditions_value,
                       array(
                           EEM_Base::default_where_conditions_all,
                           EEM_Base::default_where_conditions_this_only,
                           EEM_Base::default_where_conditions_minimum_others,
                       ),
                       true
                   )
               )
               || (
                   ! $for_this_model
                   && in_array(
                       $default_where_conditions_value,
                       array(
                           EEM_Base::default_where_conditions_all,
                           EEM_Base::default_where_conditions_others_only,
                       ),
                       true
                   )
               );
    }

    /**
     * Determines whether or not we should use default minimum conditions for the model in question
     * (this model, or other related models).
     * Basically, we should use minimum where conditions on this model only if they requested all models to use minimum
     * where conditions.
     * We should use minimum where conditions on related models if they requested to use minimum where conditions
     * on this model or others
     * @param      $default_where_conditions_value
     * @param bool $for_this_model false means this is for OTHER related models
     * @return bool
     */
    private function _should_use_minimum_where_conditions($default_where_conditions_value, $for_this_model = true)
    {
        return (
                   $for_this_model
                   && $default_where_conditions_value === EEM_Base::default_where_conditions_minimum_all
               )
               || (
                   ! $for_this_model
                   && in_array(
                       $default_where_conditions_value,
                       array(
                           EEM_Base::default_where_conditions_minimum_others,
                           EEM_Base::default_where_conditions_minimum_all,
                       ),
                       true
                   )
               );
    }


    /**
     * Checks if any of the defaults have been overridden. If there are any that AREN'T overridden,
     * then we also add a special where condition which allows for that model's primary key
     * to be null (which is important for JOINs. Eg, if you want to see all Events ordered by Venue's name,
     * then Event's with NO Venue won't appear unless you allow VNU_ID to be NULL)
     *
     * @param array    $default_where_conditions
     * @param array    $provided_where_conditions
     * @param EEM_Base $model
     * @param string   $model_relation_path like 'Transaction.Payment.'
     * @return array like EEM_Base::get_all's $query_params[0]
     * @throws \EE_Error
     */
    private function _override_defaults_or_make_null_friendly(
        $default_where_conditions,
        $provided_where_conditions,
        $model,
        $model_relation_path
    ) {
        $null_friendly_where_conditions = array();
        $none_overridden = true;
        $or_condition_key_for_defaults = 'OR*' . get_class($model);
        foreach ($default_where_conditions as $key => $val) {
            if (isset($provided_where_conditions[$key])) {
                $none_overridden = false;
            } else {
                $null_friendly_where_conditions[$or_condition_key_for_defaults]['AND'][$key] = $val;
            }
        }
        if ($none_overridden && $default_where_conditions) {
            if ($model->has_primary_key_field()) {
                $null_friendly_where_conditions[$or_condition_key_for_defaults][$model_relation_path
                                                                                . "."
                                                                                . $model->primary_key_name()] = array('IS NULL');
            }/*else{
				//@todo NO PK, use other defaults
			}*/
        }
        return $null_friendly_where_conditions;
    }



    /**
     * Uses the _default_where_conditions_strategy set during __construct() to get
     * default where conditions on all get_all, update, and delete queries done by this model.
     * Use the same syntax as client code. Eg on the Event model, use array('Event.EVT_post_type'=>'esp_event'),
     * NOT array('Event_CPT.post_type'=>'esp_event').
     *
     * @param string $model_relation_path eg, path from Event to Payment is "Registration.Transaction.Payment."
     * @return array like EEM_Base::get_all's $query_params[0] (where conditions)
     */
    private function _get_default_where_conditions($model_relation_path = null)
    {
        if ($this->_ignore_where_strategy) {
            return array();
        }
        return $this->_default_where_conditions_strategy->get_default_where_conditions($model_relation_path);
    }



    /**
     * Uses the _minimum_where_conditions_strategy set during __construct() to get
     * minimum where conditions on all get_all, update, and delete queries done by this model.
     * Use the same syntax as client code. Eg on the Event model, use array('Event.EVT_post_type'=>'esp_event'),
     * NOT array('Event_CPT.post_type'=>'esp_event').
     * Similar to _get_default_where_conditions
     *
     * @param string $model_relation_path eg, path from Event to Payment is "Registration.Transaction.Payment."
     * @return array like EEM_Base::get_all's $query_params[0] (where conditions)
     */
    protected function _get_minimum_where_conditions($model_relation_path = null)
    {
        if ($this->_ignore_where_strategy) {
            return array();
        }
        return $this->_minimum_where_conditions_strategy->get_default_where_conditions($model_relation_path);
    }



    /**
     * Creates the string of SQL for the select part of a select query, everything behind SELECT and before FROM.
     * Eg, "Event.post_id, Event.post_name,Event_Detail.EVT_ID..."
     *
     * @param EE_Model_Query_Info_Carrier $model_query_info
     * @return string
     * @throws \EE_Error
     */
    private function _construct_default_select_sql(EE_Model_Query_Info_Carrier $model_query_info)
    {
        $selects = $this->_get_columns_to_select_for_this_model();
        foreach (
            $model_query_info->get_model_names_included() as $model_relation_chain =>
            $name_of_other_model_included
        ) {
            $other_model_included = $this->get_related_model_obj($name_of_other_model_included);
            $other_model_selects = $other_model_included->_get_columns_to_select_for_this_model($model_relation_chain);
            foreach ($other_model_selects as $key => $value) {
                $selects[] = $value;
            }
        }
        return implode(", ", $selects);
    }



    /**
     * Gets an array of columns to select for this model, which are necessary for it to create its objects.
     * So that's going to be the columns for all the fields on the model
     *
     * @param string $model_relation_chain like 'Question.Question_Group.Event'
     * @return array numerically indexed, values are columns to select and rename, eg "Event.ID AS 'Event.ID'"
     */
    public function _get_columns_to_select_for_this_model($model_relation_chain = '')
    {
        $fields = $this->field_settings();
        $selects = array();
        $table_alias_with_model_relation_chain_prefix = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
            $this->get_this_model_name());
        foreach ($fields as $field_obj) {
            $selects[] = $table_alias_with_model_relation_chain_prefix
                         . $field_obj->get_table_alias()
                         . "."
                         . $field_obj->get_table_column()
                         . " AS '"
                         . $table_alias_with_model_relation_chain_prefix
                         . $field_obj->get_table_alias()
                         . "."
                         . $field_obj->get_table_column()
                         . "'";
        }
        //make sure we are also getting the PKs of each table
        $tables = $this->get_tables();
        if (count($tables) > 1) {
            foreach ($tables as $table_obj) {
                $qualified_pk_column = $table_alias_with_model_relation_chain_prefix
                                       . $table_obj->get_fully_qualified_pk_column();
                if (! in_array($qualified_pk_column, $selects)) {
                    $selects[] = "$qualified_pk_column AS '$qualified_pk_column'";
                }
            }
        }
        return $selects;
    }



    /**
     * Given a $query_param like 'Registration.Transaction.TXN_ID', pops off 'Registration.',
     * gets the join statement for it; gets the data types for it; and passes the remaining 'Transaction.TXN_ID'
     * onto its related Transaction object to do the same. Returns an EE_Join_And_Data_Types object which contains the
     * SQL for joining, and the data types
     *
     * @param null|string                 $original_query_param
     * @param string                      $query_param          like Registration.Transaction.TXN_ID
     * @param EE_Model_Query_Info_Carrier $passed_in_query_info
     * @param    string                   $query_param_type     like Registration.Transaction.TXN_ID
     *                                                          or 'PAY_ID'. Otherwise, we don't expect there to be a
     *                                                          column name. We only want model names, eg 'Event.Venue'
     *                                                          or 'Registration's
     * @param string                      $original_query_param what it originally was (eg
     *                                                          Registration.Transaction.TXN_ID). If null, we assume it
     *                                                          matches $query_param
     * @throws EE_Error
     * @return void only modifies the EEM_Related_Model_Info_Carrier passed into it
     */
    private function _extract_related_model_info_from_query_param(
        $query_param,
        EE_Model_Query_Info_Carrier $passed_in_query_info,
        $query_param_type,
        $original_query_param = null
    ) {
        if ($original_query_param === null) {
            $original_query_param = $query_param;
        }
        $query_param = $this->_remove_stars_and_anything_after_from_condition_query_param_key($query_param);
        /** @var $allow_logic_query_params bool whether or not to allow logic_query_params like 'NOT','OR', or 'AND' */
        $allow_logic_query_params = in_array($query_param_type, array('where', 'having'));
        $allow_fields = in_array($query_param_type, array('where', 'having', 'order_by', 'group_by', 'order'));
        //check to see if we have a field on this model
        $this_model_fields = $this->field_settings(true);
        if (array_key_exists($query_param, $this_model_fields)) {
            if ($allow_fields) {
                return;
            } else {
                throw new EE_Error(sprintf(__("Using a field name (%s) on model %s is not allowed on this query param type '%s'. Original query param was %s",
                    "event_espresso"),
                    $query_param, get_class($this), $query_param_type, $original_query_param));
            }
        } //check if this is a special logic query param
        elseif (in_array($query_param, $this->_logic_query_param_keys, true)) {
            if ($allow_logic_query_params) {
                return;
            } else {
                throw new EE_Error(
                    sprintf(
                        __('Logic query params ("%1$s") are being used incorrectly with the following query param ("%2$s") on model %3$s. %4$sAdditional Info:%4$s%5$s',
                            'event_espresso'),
                        implode('", "', $this->_logic_query_param_keys),
                        $query_param,
                        get_class($this),
                        '<br />',
                        "\t"
                        . ' $passed_in_query_info = <pre>'
                        . print_r($passed_in_query_info, true)
                        . '</pre>'
                        . "\n\t"
                        . ' $query_param_type = '
                        . $query_param_type
                        . "\n\t"
                        . ' $original_query_param = '
                        . $original_query_param
                    )
                );
            }
        } //check if it's a custom selection
        elseif (array_key_exists($query_param, $this->_custom_selections)) {
            return;
        }
        //check if has a model name at the beginning
        //and
        //check if it's a field on a related model
        foreach ($this->_model_relations as $valid_related_model_name => $relation_obj) {
            if (strpos($query_param, $valid_related_model_name . ".") === 0) {
                $this->_add_join_to_model($valid_related_model_name, $passed_in_query_info, $original_query_param);
                $query_param = substr($query_param, strlen($valid_related_model_name . "."));
                if ($query_param === '') {
                    //nothing left to $query_param
                    //we should actually end in a field name, not a model like this!
                    throw new EE_Error(sprintf(__("Query param '%s' (of type %s on model %s) shouldn't end on a period (.) ",
                        "event_espresso"),
                        $query_param, $query_param_type, get_class($this), $valid_related_model_name));
                } else {
                    $related_model_obj = $this->get_related_model_obj($valid_related_model_name);
                    $related_model_obj->_extract_related_model_info_from_query_param($query_param,
                        $passed_in_query_info, $query_param_type, $original_query_param);
                    return;
                }
            } elseif ($query_param === $valid_related_model_name) {
                $this->_add_join_to_model($valid_related_model_name, $passed_in_query_info, $original_query_param);
                return;
            }
        }
        //ok so $query_param didn't start with a model name
        //and we previously confirmed it wasn't a logic query param or field on the current model
        //it's wack, that's what it is
        throw new EE_Error(sprintf(__("There is no model named '%s' related to %s. Query param type is %s and original query param is %s",
            "event_espresso"),
            $query_param, get_class($this), $query_param_type, $original_query_param));
    }



    /**
     * Privately used by _extract_related_model_info_from_query_param to add a join to $model_name
     * and store it on $passed_in_query_info
     *
     * @param string                      $model_name
     * @param EE_Model_Query_Info_Carrier $passed_in_query_info
     * @param string                      $original_query_param used to extract the relation chain between the queried
     *                                                          model and $model_name. Eg, if we are querying Event,
     *                                                          and are adding a join to 'Payment' with the original
     *                                                          query param key
     *                                                          'Registration.Transaction.Payment.PAY_amount', we want
     *                                                          to extract 'Registration.Transaction.Payment', in case
     *                                                          Payment wants to add default query params so that it
     *                                                          will know what models to prepend onto its default query
     *                                                          params or in case it wants to rename tables (in case
     *                                                          there are multiple joins to the same table)
     * @return void
     * @throws \EE_Error
     */
    private function _add_join_to_model(
        $model_name,
        EE_Model_Query_Info_Carrier $passed_in_query_info,
        $original_query_param
    ) {
        $relation_obj = $this->related_settings_for($model_name);
        $model_relation_chain = EE_Model_Parser::extract_model_relation_chain($model_name, $original_query_param);
        //check if the relation is HABTM, because then we're essentially doing two joins
        //If so, join first to the JOIN table, and add its data types, and then continue as normal
        if ($relation_obj instanceof EE_HABTM_Relation) {
            $join_model_obj = $relation_obj->get_join_model();
            //replace the model specified with the join model for this relation chain, whi
            $relation_chain_to_join_model = EE_Model_Parser::replace_model_name_with_join_model_name_in_model_relation_chain($model_name,
                $join_model_obj->get_this_model_name(), $model_relation_chain);
            $new_query_info = new EE_Model_Query_Info_Carrier(
                array($relation_chain_to_join_model => $join_model_obj->get_this_model_name()),
                $relation_obj->get_join_to_intermediate_model_statement($relation_chain_to_join_model));
            $passed_in_query_info->merge($new_query_info);
        }
        //now just join to the other table pointed to by the relation object, and add its data types
        $new_query_info = new EE_Model_Query_Info_Carrier(
            array($model_relation_chain => $model_name),
            $relation_obj->get_join_statement($model_relation_chain));
        $passed_in_query_info->merge($new_query_info);
    }



    /**
     * Constructs SQL for where clause, like "WHERE Event.ID = 23 AND Transaction.amount > 100" etc.
     *
     * @param array $where_params like EEM_Base::get_all
     * @return string of SQL
     * @throws \EE_Error
     */
    private function _construct_where_clause($where_params)
    {
        $SQL = $this->_construct_condition_clause_recursive($where_params, ' AND ');
        if ($SQL) {
            return " WHERE " . $SQL;
        } else {
            return '';
        }
    }



    /**
     * Just like the _construct_where_clause, except prepends 'HAVING' instead of 'WHERE',
     * and should be passed HAVING parameters, not WHERE parameters
     *
     * @param array $having_params
     * @return string
     * @throws \EE_Error
     */
    private function _construct_having_clause($having_params)
    {
        $SQL = $this->_construct_condition_clause_recursive($having_params, ' AND ');
        if ($SQL) {
            return " HAVING " . $SQL;
        } else {
            return '';
        }
    }



    /**
     * Gets the EE_Model_Field on the model indicated by $model_name and the $field_name.
     * Eg, if called with _get_field_on_model('ATT_ID','Attendee'), it will return the EE_Primary_Key_Field on
     * EEM_Attendee.
     *
     * @param string $field_name
     * @param string $model_name
     * @return EE_Model_Field_Base
     * @throws EE_Error
     */
    protected function _get_field_on_model($field_name, $model_name)
    {
        $model_class = 'EEM_' . $model_name;
        $model_filepath = $model_class . ".model.php";
        if (is_readable($model_filepath)) {
            require_once($model_filepath);
            $model_instance = call_user_func($model_name . "::instance");
            /* @var $model_instance EEM_Base */
            return $model_instance->field_settings_for($field_name);
        } else {
            throw new EE_Error(sprintf(__('No model named %s exists, with classname %s and filepath %s',
                'event_espresso'), $model_name, $model_class, $model_filepath));
        }
    }



    /**
     * Used for creating nested WHERE conditions. Eg "WHERE ! (Event.ID = 3 OR ( Event_Meta.meta_key = 'bob' AND
     * Event_Meta.meta_value = 'foo'))"
     *
     * @param array  $where_params see EEM_Base::get_all for documentation
     * @param string $glue         joins each subclause together. Should really only be " AND " or " OR "...
     * @throws EE_Error
     * @return string of SQL
     */
    private function _construct_condition_clause_recursive($where_params, $glue = ' AND')
    {
        $where_clauses = array();
        foreach ($where_params as $query_param => $op_and_value_or_sub_condition) {
            $query_param = $this->_remove_stars_and_anything_after_from_condition_query_param_key($query_param);//str_replace("*",'',$query_param);
            if (in_array($query_param, $this->_logic_query_param_keys)) {
                switch ($query_param) {
                    case 'not':
                    case 'NOT':
                        $where_clauses[] = "! ("
                                           . $this->_construct_condition_clause_recursive($op_and_value_or_sub_condition,
                                $glue)
                                           . ")";
                        break;
                    case 'and':
                    case 'AND':
                        $where_clauses[] = " ("
                                           . $this->_construct_condition_clause_recursive($op_and_value_or_sub_condition,
                                ' AND ')
                                           . ")";
                        break;
                    case 'or':
                    case 'OR':
                        $where_clauses[] = " ("
                                           . $this->_construct_condition_clause_recursive($op_and_value_or_sub_condition,
                                ' OR ')
                                           . ")";
                        break;
                }
            } else {
                $field_obj = $this->_deduce_field_from_query_param($query_param);
                //if it's not a normal field, maybe it's a custom selection?
                if (! $field_obj) {
                    if (isset($this->_custom_selections[$query_param][1])) {
                        $field_obj = $this->_custom_selections[$query_param][1];
                    } else {
                        throw new EE_Error(sprintf(__("%s is neither a valid model field name, nor a custom selection",
                            "event_espresso"), $query_param));
                    }
                }
                $op_and_value_sql = $this->_construct_op_and_value($op_and_value_or_sub_condition, $field_obj);
                $where_clauses[] = $this->_deduce_column_name_from_query_param($query_param) . SP . $op_and_value_sql;
            }
        }
        return $where_clauses ? implode($glue, $where_clauses) : '';
    }



    /**
     * Takes the input parameter and extract the table name (alias) and column name
     *
     * @param array $query_param like Registration.Transaction.TXN_ID, Event.Datetime.start_time, or REG_ID
     * @throws EE_Error
     * @return string table alias and column name for SQL, eg "Transaction.TXN_ID"
     */
    private function _deduce_column_name_from_query_param($query_param)
    {
        $field = $this->_deduce_field_from_query_param($query_param);
        if ($field) {
            $table_alias_prefix = EE_Model_Parser::extract_table_alias_model_relation_chain_from_query_param($field->get_model_name(),
                $query_param);
            return $table_alias_prefix . $field->get_qualified_column();
        } elseif (array_key_exists($query_param, $this->_custom_selections)) {
            //maybe it's custom selection item?
            //if so, just use it as the "column name"
            return $query_param;
        } else {
            throw new EE_Error(sprintf(__("%s is not a valid field on this model, nor a custom selection (%s)",
                "event_espresso"), $query_param, implode(",", $this->_custom_selections)));
        }
    }



    /**
     * Removes the * and anything after it from the condition query param key. It is useful to add the * to condition
     * query param keys (eg, 'OR*', 'EVT_ID') in order for the array keys to still be unique, so that they don't get
     * overwritten Takes a string like 'Event.EVT_ID*', 'TXN_total**', 'OR*1st', and 'DTT_reg_start*foobar' to
     * 'Event.EVT_ID', 'TXN_total', 'OR', and 'DTT_reg_start', respectively.
     *
     * @param string $condition_query_param_key
     * @return string
     */
    private function _remove_stars_and_anything_after_from_condition_query_param_key($condition_query_param_key)
    {
        $pos_of_star = strpos($condition_query_param_key, '*');
        if ($pos_of_star === false) {
            return $condition_query_param_key;
        } else {
            $condition_query_param_sans_star = substr($condition_query_param_key, 0, $pos_of_star);
            return $condition_query_param_sans_star;
        }
    }



    /**
     * creates the SQL for the operator and the value in a WHERE clause, eg "< 23" or "LIKE '%monkey%'"
     *
     * @param                            mixed      array | string    $op_and_value
     * @param EE_Model_Field_Base|string $field_obj . If string, should be one of EEM_Base::_valid_wpdb_data_types
     * @throws EE_Error
     * @return string
     */
    private function _construct_op_and_value($op_and_value, $field_obj)
    {
        if (is_array($op_and_value)) {
            $operator = isset($op_and_value[0]) ? $this->_prepare_operator_for_sql($op_and_value[0]) : null;
            if (! $operator) {
                $php_array_like_string = array();
                foreach ($op_and_value as $key => $value) {
                    $php_array_like_string[] = "$key=>$value";
                }
                throw new EE_Error(
                    sprintf(
                        __(
                            "You setup a query parameter like you were going to specify an operator, but didn't. You provided '(%s)', but the operator should be at array key index 0 (eg array('>',32))",
                            "event_espresso"
                        ),
                        implode(",", $php_array_like_string)
                    )
                );
            }
            $value = isset($op_and_value[1]) ? $op_and_value[1] : null;
        } else {
            $operator = '=';
            $value = $op_and_value;
        }
        //check to see if the value is actually another field
        if (is_array($op_and_value) && isset($op_and_value[2]) && $op_and_value[2] == true) {
            return $operator . SP . $this->_deduce_column_name_from_query_param($value);
        } elseif (in_array($operator, $this->_in_style_operators) && is_array($value)) {
            //in this case, the value should be an array, or at least a comma-separated list
            //it will need to handle a little differently
            $cleaned_value = $this->_construct_in_value($value, $field_obj);
            //note: $cleaned_value has already been run through $wpdb->prepare()
            return $operator . SP . $cleaned_value;
        } elseif (in_array($operator, $this->_between_style_operators) && is_array($value)) {
            //the value should be an array with count of two.
            if (count($value) !== 2) {
                throw new EE_Error(
                    sprintf(
                        __(
                            "The '%s' operator must be used with an array of values and there must be exactly TWO values in that array.",
                            'event_espresso'
                        ),
                        "BETWEEN"
                    )
                );
            }
            $cleaned_value = $this->_construct_between_value($value, $field_obj);
            return $operator . SP . $cleaned_value;
        } elseif (in_array($operator, $this->_null_style_operators)) {
            if ($value !== null) {
                throw new EE_Error(
                    sprintf(
                        __(
                            "You attempted to give a value  (%s) while using a NULL-style operator (%s). That isn't valid",
                            "event_espresso"
                        ),
                        $value,
                        $operator
                    )
                );
            }
            return $operator;
        } elseif ($operator === 'LIKE' && ! is_array($value)) {
            //if the operator is 'LIKE', we want to allow percent signs (%) and not
            //remove other junk. So just treat it as a string.
            return $operator . SP . $this->_wpdb_prepare_using_field($value, '%s');
        } elseif (! in_array($operator, $this->_in_style_operators) && ! is_array($value)) {
            return $operator . SP . $this->_wpdb_prepare_using_field($value, $field_obj);
        } elseif (in_array($operator, $this->_in_style_operators) && ! is_array($value)) {
            throw new EE_Error(
                sprintf(
                    __(
                        "Operator '%s' must be used with an array of values, eg 'Registration.REG_ID' => array('%s',array(1,2,3))",
                        'event_espresso'
                    ),
                    $operator,
                    $operator
                )
            );
        } elseif (! in_array($operator, $this->_in_style_operators) && is_array($value)) {
            throw new EE_Error(
                sprintf(
                    __(
                        "Operator '%s' must be used with a single value, not an array. Eg 'Registration.REG_ID => array('%s',23))",
                        'event_espresso'
                    ),
                    $operator,
                    $operator
                )
            );
        } else {
            throw new EE_Error(
                sprintf(
                    __(
                        "It appears you've provided some totally invalid query parameters. Operator and value were:'%s', which isn't right at all",
                        "event_espresso"
                    ),
                    http_build_query($op_and_value)
                )
            );
        }
    }



    /**
     * Creates the operands to be used in a BETWEEN query, eg "'2014-12-31 20:23:33' AND '2015-01-23 12:32:54'"
     *
     * @param array                      $values
     * @param EE_Model_Field_Base|string $field_obj if string, it should be the datatype to be used when querying, eg
     *                                              '%s'
     * @return string
     * @throws \EE_Error
     */
    public function _construct_between_value($values, $field_obj)
    {
        $cleaned_values = array();
        foreach ($values as $value) {
            $cleaned_values[] = $this->_wpdb_prepare_using_field($value, $field_obj);
        }
        return $cleaned_values[0] . " AND " . $cleaned_values[1];
    }



    /**
     * Takes an array or a comma-separated list of $values and cleans them
     * according to $data_type using $wpdb->prepare, and then makes the list a
     * string surrounded by ( and ). Eg, _construct_in_value(array(1,2,3),'%d') would
     * return '(1,2,3)'; _construct_in_value("1,2,hack",'%d') would return '(1,2,1)' (assuming
     * I'm right that a string, when interpreted as a digit, becomes a 1. It might become a 0)
     *
     * @param mixed                      $values    array or comma-separated string
     * @param EE_Model_Field_Base|string $field_obj if string, it should be a wpdb data type like '%s', or '%d'
     * @return string of SQL to follow an 'IN' or 'NOT IN' operator
     * @throws \EE_Error
     */
    public function _construct_in_value($values, $field_obj)
    {
        //check if the value is a CSV list
        if (is_string($values)) {
            //in which case, turn it into an array
            $values = explode(",", $values);
        }
        $cleaned_values = array();
        foreach ($values as $value) {
            $cleaned_values[] = $this->_wpdb_prepare_using_field($value, $field_obj);
        }
        //we would just LOVE to leave $cleaned_values as an empty array, and return the value as "()",
        //but unfortunately that's invalid SQL. So instead we return a string which we KNOW will evaluate to be the empty set
        //which is effectively equivalent to returning "()". We don't return "(0)" because that only works for auto-incrementing columns
        if (empty($cleaned_values)) {
            $all_fields = $this->field_settings();
            $a_field = array_shift($all_fields);
            $main_table = $this->_get_main_table();
            $cleaned_values[] = "SELECT "
                                . $a_field->get_table_column()
                                . " FROM "
                                . $main_table->get_table_name()
                                . " WHERE FALSE";
        }
        return "(" . implode(",", $cleaned_values) . ")";
    }



    /**
     * @param mixed                      $value
     * @param EE_Model_Field_Base|string $field_obj if string it should be a wpdb data type like '%d'
     * @throws EE_Error
     * @return false|null|string
     */
    private function _wpdb_prepare_using_field($value, $field_obj)
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        if ($field_obj instanceof EE_Model_Field_Base) {
            return $wpdb->prepare($field_obj->get_wpdb_data_type(),
                $this->_prepare_value_for_use_in_db($value, $field_obj));
        } else {//$field_obj should really just be a data type
            if (! in_array($field_obj, $this->_valid_wpdb_data_types)) {
                throw new EE_Error(sprintf(__("%s is not a valid wpdb datatype. Valid ones are %s", "event_espresso"),
                    $field_obj, implode(",", $this->_valid_wpdb_data_types)));
            }
            return $wpdb->prepare($field_obj, $value);
        }
    }



    /**
     * Takes the input parameter and finds the model field that it indicates.
     *
     * @param string $query_param_name like Registration.Transaction.TXN_ID, Event.Datetime.start_time, or REG_ID
     * @throws EE_Error
     * @return EE_Model_Field_Base
     */
    protected function _deduce_field_from_query_param($query_param_name)
    {
        //ok, now proceed with deducing which part is the model's name, and which is the field's name
        //which will help us find the database table and column
        $query_param_parts = explode(".", $query_param_name);
        if (empty($query_param_parts)) {
            throw new EE_Error(sprintf(__("_extract_column_name is empty when trying to extract column and table name from %s",
                'event_espresso'), $query_param_name));
        }
        $number_of_parts = count($query_param_parts);
        $last_query_param_part = $query_param_parts[count($query_param_parts) - 1];
        if ($number_of_parts === 1) {
            $field_name = $last_query_param_part;
            $model_obj = $this;
        } else {// $number_of_parts >= 2
            //the last part is the column name, and there are only 2parts. therefore...
            $field_name = $last_query_param_part;
            $model_obj = $this->get_related_model_obj($query_param_parts[$number_of_parts - 2]);
        }
        try {
            return $model_obj->field_settings_for($field_name);
        } catch (EE_Error $e) {
            return null;
        }
    }



    /**
     * Given a field's name (ie, a key in $this->field_settings()), uses the EE_Model_Field object to get the table's
     * alias and column which corresponds to it
     *
     * @param string $field_name
     * @throws EE_Error
     * @return string
     */
    public function _get_qualified_column_for_field($field_name)
    {
        $all_fields = $this->field_settings();
        $field = isset($all_fields[$field_name]) ? $all_fields[$field_name] : false;
        if ($field) {
            return $field->get_qualified_column();
        } else {
            throw new EE_Error(sprintf(__("There is no field titled %s on model %s. Either the query trying to use it is bad, or you need to add it to the list of fields on the model.",
                'event_espresso'), $field_name, get_class($this)));
        }
    }



    /**
     * similar to \EEM_Base::_get_qualified_column_for_field() but returns an array with data for ALL fields.
     * Example usage:
     * EEM_Ticket::instance()->get_all_wpdb_results(
     *      array(),
     *      ARRAY_A,
     *      EEM_Ticket::instance()->get_qualified_columns_for_all_fields()
     *  );
     * is equivalent to
     *  EEM_Ticket::instance()->get_all_wpdb_results( array(), ARRAY_A, '*' );
     * and
     *  EEM_Event::instance()->get_all_wpdb_results(
     *      array(
     *          array(
     *              'Datetime.Ticket.TKT_ID' => array( '<', 100 ),
     *          ),
     *          ARRAY_A,
     *          implode(
     *              ', ',
     *              array_merge(
     *                  EEM_Event::instance()->get_qualified_columns_for_all_fields( '', false ),
     *                  EEM_Ticket::instance()->get_qualified_columns_for_all_fields( 'Datetime', false )
     *              )
     *          )
     *      )
     *  );
     * selects rows from the database, selecting all the event and ticket columns, where the ticket ID is below 100
     *
     * @param string $model_relation_chain        the chain of models used to join between the model you want to query
     *                                            and the one whose fields you are selecting for example: when querying
     *                                            tickets model and selecting fields from the tickets model you would
     *                                            leave this parameter empty, because no models are needed to join
     *                                            between the queried model and the selected one. Likewise when
     *                                            querying the datetime model and selecting fields from the tickets
     *                                            model, it would also be left empty, because there is a direct
     *                                            relation from datetimes to tickets, so no model is needed to join
     *                                            them together. However, when querying from the event model and
     *                                            selecting fields from the ticket model, you should provide the string
     *                                            'Datetime', indicating that the event model must first join to the
     *                                            datetime model in order to find its relation to ticket model.
     *                                            Also, when querying from the venue model and selecting fields from
     *                                            the ticket model, you should provide the string 'Event.Datetime',
     *                                            indicating you need to join the venue model to the event model,
     *                                            to the datetime model, in order to find its relation to the ticket model.
     *                                            This string is used to deduce the prefix that gets added onto the
     *                                            models' tables qualified columns
     * @param bool   $return_string               if true, will return a string with qualified column names separated
     *                                            by ', ' if false, will simply return a numerically indexed array of
     *                                            qualified column names
     * @return array|string
     */
    public function get_qualified_columns_for_all_fields($model_relation_chain = '', $return_string = true)
    {
        $table_prefix = str_replace('.', '__', $model_relation_chain) . (empty($model_relation_chain) ? '' : '__');
        $qualified_columns = array();
        foreach ($this->field_settings() as $field_name => $field) {
            $qualified_columns[] = $table_prefix . $field->get_qualified_column();
        }
        return $return_string ? implode(', ', $qualified_columns) : $qualified_columns;
    }



    /**
     * constructs the select use on special limit joins
     * NOTE: for now this has only been tested and will work when the  table alias is for the PRIMARY table. Although
     * its setup so the select query will be setup on and just doing the special select join off of the primary table
     * (as that is typically where the limits would be set).
     *
     * @param  string       $table_alias The table the select is being built for
     * @param  mixed|string $limit       The limit for this select
     * @return string                The final select join element for the query.
     */
    public function _construct_limit_join_select($table_alias, $limit)
    {
        $SQL = '';
        foreach ($this->_tables as $table_obj) {
            if ($table_obj instanceof EE_Primary_Table) {
                $SQL .= $table_alias === $table_obj->get_table_alias()
                    ? $table_obj->get_select_join_limit($limit)
                    : SP . $table_obj->get_table_name() . " AS " . $table_obj->get_table_alias() . SP;
            } elseif ($table_obj instanceof EE_Secondary_Table) {
                $SQL .= $table_alias === $table_obj->get_table_alias()
                    ? $table_obj->get_select_join_limit_join($limit)
                    : SP . $table_obj->get_join_sql($table_alias) . SP;
            }
        }
        return $SQL;
    }



    /**
     * Constructs the internal join if there are multiple tables, or simply the table's name and alias
     * Eg "wp_post AS Event" or "wp_post AS Event INNER JOIN wp_postmeta Event_Meta ON Event.ID = Event_Meta.post_id"
     *
     * @return string SQL
     * @throws \EE_Error
     */
    public function _construct_internal_join()
    {
        $SQL = $this->_get_main_table()->get_table_sql();
        $SQL .= $this->_construct_internal_join_to_table_with_alias($this->_get_main_table()->get_table_alias());
        return $SQL;
    }



    /**
     * Constructs the SQL for joining all the tables on this model.
     * Normally $alias should be the primary table's alias, but in cases where
     * we have already joined to a secondary table (eg, the secondary table has a foreign key and is joined before the
     * primary table) then we should provide that secondary table's alias. Eg, with $alias being the primary table's
     * alias, this will construct SQL like:
     * " INNER JOIN wp_esp_secondary_table AS Secondary_Table ON Primary_Table.pk = Secondary_Table.fk".
     * With $alias being a secondary table's alias, this will construct SQL like:
     * " INNER JOIN wp_esp_primary_table AS Primary_Table ON Primary_Table.pk = Secondary_Table.fk".
     *
     * @param string $alias_prefixed table alias to join to (this table should already be in the FROM SQL clause)
     * @return string
     */
    public function _construct_internal_join_to_table_with_alias($alias_prefixed)
    {
        $SQL = '';
        $alias_sans_prefix = EE_Model_Parser::remove_table_alias_model_relation_chain_prefix($alias_prefixed);
        foreach ($this->_tables as $table_obj) {
            if ($table_obj instanceof EE_Secondary_Table) {//table is secondary table
                if ($alias_sans_prefix === $table_obj->get_table_alias()) {
                    //so we're joining to this table, meaning the table is already in
                    //the FROM statement, BUT the primary table isn't. So we want
                    //to add the inverse join sql
                    $SQL .= $table_obj->get_inverse_join_sql($alias_prefixed);
                } else {
                    //just add a regular JOIN to this table from the primary table
                    $SQL .= $table_obj->get_join_sql($alias_prefixed);
                }
            }//if it's a primary table, dont add any SQL. it should already be in the FROM statement
        }
        return $SQL;
    }



    /**
     * Gets an array for storing all the data types on the next-to-be-executed-query.
     * This should be a growing array of keys being table-columns (eg 'EVT_ID' and 'Event.EVT_ID'), and values being
     * their data type (eg, '%s', '%d', etc)
     *
     * @return array
     */
    public function _get_data_types()
    {
        $data_types = array();
        foreach ($this->field_settings() as $field_obj) {
            //$data_types[$field_obj->get_table_column()] = $field_obj->get_wpdb_data_type();
            /** @var $field_obj EE_Model_Field_Base */
            $data_types[$field_obj->get_qualified_column()] = $field_obj->get_wpdb_data_type();
        }
        return $data_types;
    }



    /**
     * Gets the model object given the relation's name / model's name (eg, 'Event', 'Registration',etc. Always singular)
     *
     * @param string $model_name
     * @throws EE_Error
     * @return EEM_Base
     */
    public function get_related_model_obj($model_name)
    {
        $model_classname = "EEM_" . $model_name;
        if (! class_exists($model_classname)) {
            throw new EE_Error(sprintf(__("You specified a related model named %s in your query. No such model exists, if it did, it would have the classname %s",
                'event_espresso'), $model_name, $model_classname));
        }
        return call_user_func($model_classname . "::instance");
    }



    /**
     * Returns the array of EE_ModelRelations for this model.
     *
     * @return EE_Model_Relation_Base[]
     */
    public function relation_settings()
    {
        return $this->_model_relations;
    }



    /**
     * Gets all related models that this model BELONGS TO. Handy to know sometimes
     * because without THOSE models, this model probably doesn't have much purpose.
     * (Eg, without an event, datetimes have little purpose.)
     *
     * @return EE_Belongs_To_Relation[]
     */
    public function belongs_to_relations()
    {
        $belongs_to_relations = array();
        foreach ($this->relation_settings() as $model_name => $relation_obj) {
            if ($relation_obj instanceof EE_Belongs_To_Relation) {
                $belongs_to_relations[$model_name] = $relation_obj;
            }
        }
        return $belongs_to_relations;
    }



    /**
     * Returns the specified EE_Model_Relation, or throws an exception
     *
     * @param string $relation_name name of relation, key in $this->_relatedModels
     * @throws EE_Error
     * @return EE_Model_Relation_Base
     */
    public function related_settings_for($relation_name)
    {
        $relatedModels = $this->relation_settings();
        if (! array_key_exists($relation_name, $relatedModels)) {
            throw new EE_Error(
                sprintf(
                    __('Cannot get %s related to %s. There is no model relation of that type. There is, however, %s...',
                        'event_espresso'),
                    $relation_name,
                    $this->_get_class_name(),
                    implode(', ', array_keys($relatedModels))
                )
            );
        }
        return $relatedModels[$relation_name];
    }



    /**
     * A convenience method for getting a specific field's settings, instead of getting all field settings for all
     * fields
     *
     * @param string $fieldName
     * @throws EE_Error
     * @return EE_Model_Field_Base
     */
    public function field_settings_for($fieldName)
    {
        $fieldSettings = $this->field_settings(true);
        if (! array_key_exists($fieldName, $fieldSettings)) {
            throw new EE_Error(sprintf(__("There is no field/column '%s' on '%s'", 'event_espresso'), $fieldName,
                get_class($this)));
        }
        return $fieldSettings[$fieldName];
    }



    /**
     * Checks if this field exists on this model
     *
     * @param string $fieldName a key in the model's _field_settings array
     * @return boolean
     */
    public function has_field($fieldName)
    {
        $fieldSettings = $this->field_settings(true);
        if (isset($fieldSettings[$fieldName])) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * Returns whether or not this model has a relation to the specified model
     *
     * @param string $relation_name possibly one of the keys in the relation_settings array
     * @return boolean
     */
    public function has_relation($relation_name)
    {
        $relations = $this->relation_settings();
        if (isset($relations[$relation_name])) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * gets the field object of type 'primary_key' from the fieldsSettings attribute.
     * Eg, on EE_Answer that would be ANS_ID field object
     *
     * @param $field_obj
     * @return boolean
     */
    public function is_primary_key_field($field_obj)
    {
        return $field_obj instanceof EE_Primary_Key_Field_Base ? true : false;
    }



    /**
     * gets the field object of type 'primary_key' from the fieldsSettings attribute.
     * Eg, on EE_Answer that would be ANS_ID field object
     *
     * @return EE_Model_Field_Base
     * @throws EE_Error
     */
    public function get_primary_key_field()
    {
        if ($this->_primary_key_field === null) {
            foreach ($this->field_settings(true) as $field_obj) {
                if ($this->is_primary_key_field($field_obj)) {
                    $this->_primary_key_field = $field_obj;
                    break;
                }
            }
            if (! $this->_primary_key_field instanceof EE_Primary_Key_Field_Base) {
                throw new EE_Error(sprintf(__("There is no Primary Key defined on model %s", 'event_espresso'),
                    get_class($this)));
            }
        }
        return $this->_primary_key_field;
    }



    /**
     * Returns whether or not not there is a primary key on this model.
     * Internally does some caching.
     *
     * @return boolean
     */
    public function has_primary_key_field()
    {
        if ($this->_has_primary_key_field === null) {
            try {
                $this->get_primary_key_field();
                $this->_has_primary_key_field = true;
            } catch (EE_Error $e) {
                $this->_has_primary_key_field = false;
            }
        }
        return $this->_has_primary_key_field;
    }



    /**
     * Finds the first field of type $field_class_name.
     *
     * @param string $field_class_name class name of field that you want to find. Eg, EE_Datetime_Field,
     *                                 EE_Foreign_Key_Field, etc
     * @return EE_Model_Field_Base or null if none is found
     */
    public function get_a_field_of_type($field_class_name)
    {
        foreach ($this->field_settings() as $field) {
            if ($field instanceof $field_class_name) {
                return $field;
            }
        }
        return null;
    }



    /**
     * Gets a foreign key field pointing to model.
     *
     * @param string $model_name eg Event, Registration, not EEM_Event
     * @return EE_Foreign_Key_Field_Base
     * @throws EE_Error
     */
    public function get_foreign_key_to($model_name)
    {
        if (! isset($this->_cache_foreign_key_to_fields[$model_name])) {
            foreach ($this->field_settings() as $field) {
                if (
                    $field instanceof EE_Foreign_Key_Field_Base
                    && in_array($model_name, $field->get_model_names_pointed_to())
                ) {
                    $this->_cache_foreign_key_to_fields[$model_name] = $field;
                    break;
                }
            }
            if (! isset($this->_cache_foreign_key_to_fields[$model_name])) {
                throw new EE_Error(sprintf(__("There is no foreign key field pointing to model %s on model %s",
                    'event_espresso'), $model_name, get_class($this)));
            }
        }
        return $this->_cache_foreign_key_to_fields[$model_name];
    }



    /**
     * Gets the actual table for the table alias
     *
     * @param string $table_alias eg Event, Event_Meta, Registration, Transaction, but maybe
     *                            a table alias with a model chain prefix, like 'Venue__Event_Venue___Event_Meta'.
     *                            Either one works
     * @return EE_Table_Base
     */
    public function get_table_for_alias($table_alias)
    {
        $table_alias_sans_model_relation_chain_prefix = EE_Model_Parser::remove_table_alias_model_relation_chain_prefix($table_alias);
        return $this->_tables[$table_alias_sans_model_relation_chain_prefix]->get_table_name();
    }



    /**
     * Returns a flat array of all field son this model, instead of organizing them
     * by table_alias as they are in the constructor.
     *
     * @param bool $include_db_only_fields flag indicating whether or not to include the db-only fields
     * @return EE_Model_Field_Base[] where the keys are the field's name
     */
    public function field_settings($include_db_only_fields = false)
    {
        if ($include_db_only_fields) {
            if ($this->_cached_fields === null) {
                $this->_cached_fields = array();
                foreach ($this->_fields as $fields_corresponding_to_table) {
                    foreach ($fields_corresponding_to_table as $field_name => $field_obj) {
                        $this->_cached_fields[$field_name] = $field_obj;
                    }
                }
            }
            return $this->_cached_fields;
        } else {
            if ($this->_cached_fields_non_db_only === null) {
                $this->_cached_fields_non_db_only = array();
                foreach ($this->_fields as $fields_corresponding_to_table) {
                    foreach ($fields_corresponding_to_table as $field_name => $field_obj) {
                        /** @var $field_obj EE_Model_Field_Base */
                        if (! $field_obj->is_db_only_field()) {
                            $this->_cached_fields_non_db_only[$field_name] = $field_obj;
                        }
                    }
                }
            }
            return $this->_cached_fields_non_db_only;
        }
    }



    /**
     *        cycle though array of attendees and create objects out of each item
     *
     * @access        private
     * @param        array $rows of results of $wpdb->get_results($query,ARRAY_A)
     * @return \EE_Base_Class[] array keys are primary keys (if there is a primary key on the model. if not,
     *                           numerically indexed)
     * @throws \EE_Error
     */
    protected function _create_objects($rows = array())
    {
        $array_of_objects = array();
        if (empty($rows)) {
            return array();
        }
        $count_if_model_has_no_primary_key = 0;
        $has_primary_key = $this->has_primary_key_field();
        $primary_key_field = $has_primary_key ? $this->get_primary_key_field() : null;
        foreach ((array)$rows as $row) {
            if (empty($row)) {
                //wp did its weird thing where it returns an array like array(0=>null), which is totally not helpful...
                return array();
            }
            //check if we've already set this object in the results array,
            //in which case there's no need to process it further (again)
            if ($has_primary_key) {
                $table_pk_value = $this->_get_column_value_with_table_alias_or_not(
                    $row,
                    $primary_key_field->get_qualified_column(),
                    $primary_key_field->get_table_column()
                );
                if ($table_pk_value && isset($array_of_objects[$table_pk_value])) {
                    continue;
                }
            }
            $classInstance = $this->instantiate_class_from_array_or_object($row);
            if (! $classInstance) {
                throw new EE_Error(
                    sprintf(
                        __('Could not create instance of class %s from row %s', 'event_espresso'),
                        $this->get_this_model_name(),
                        http_build_query($row)
                    )
                );
            }
            //set the timezone on the instantiated objects
            $classInstance->set_timezone($this->_timezone);
            //make sure if there is any timezone setting present that we set the timezone for the object
            $key = $has_primary_key ? $classInstance->ID() : $count_if_model_has_no_primary_key++;
            $array_of_objects[$key] = $classInstance;
            //also, for all the relations of type BelongsTo, see if we can cache
            //those related models
            //(we could do this for other relations too, but if there are conditions
            //that filtered out some fo the results, then we'd be caching an incomplete set
            //so it requires a little more thought than just caching them immediately...)
            foreach ($this->_model_relations as $modelName => $relation_obj) {
                if ($relation_obj instanceof EE_Belongs_To_Relation) {
                    //check if this model's INFO is present. If so, cache it on the model
                    $other_model = $relation_obj->get_other_model();
                    $other_model_obj_maybe = $other_model->instantiate_class_from_array_or_object($row);
                    //if we managed to make a model object from the results, cache it on the main model object
                    if ($other_model_obj_maybe) {
                        //set timezone on these other model objects if they are present
                        $other_model_obj_maybe->set_timezone($this->_timezone);
                        $classInstance->cache($modelName, $other_model_obj_maybe);
                    }
                }
            }
        }
        return $array_of_objects;
    }



    /**
     * The purpose of this method is to allow us to create a model object that is not in the db that holds default
     * values. A typical example of where this is used is when creating a new item and the initial load of a form.  We
     * dont' necessarily want to test for if the object is present but just assume it is BUT load the defaults from the
     * object (as set in the model_field!).
     *
     * @return EE_Base_Class single EE_Base_Class object with default values for the properties.
     */
    public function create_default_object()
    {
        $this_model_fields_and_values = array();
        //setup the row using default values;
        foreach ($this->field_settings() as $field_name => $field_obj) {
            $this_model_fields_and_values[$field_name] = $field_obj->get_default_value();
        }
        $className = $this->_get_class_name();
        $classInstance = EE_Registry::instance()
                                    ->load_class($className, array($this_model_fields_and_values), false, false);
        return $classInstance;
    }



    /**
     * @param mixed $cols_n_values either an array of where each key is the name of a field, and the value is its value
     *                             or an stdClass where each property is the name of a column,
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function instantiate_class_from_array_or_object($cols_n_values)
    {
        if (! is_array($cols_n_values) && is_object($cols_n_values)) {
            $cols_n_values = get_object_vars($cols_n_values);
        }
        $primary_key = null;
        //make sure the array only has keys that are fields/columns on this model
        $this_model_fields_n_values = $this->_deduce_fields_n_values_from_cols_n_values($cols_n_values);
        if ($this->has_primary_key_field() && isset($this_model_fields_n_values[$this->primary_key_name()])) {
            $primary_key = $this_model_fields_n_values[$this->primary_key_name()];
        }
        $className = $this->_get_class_name();
        //check we actually found results that we can use to build our model object
        //if not, return null
        if ($this->has_primary_key_field()) {
            if (empty($this_model_fields_n_values[$this->primary_key_name()])) {
                return null;
            }
        } else if ($this->unique_indexes()) {
            $first_column = reset($this_model_fields_n_values);
            if (empty($first_column)) {
                return null;
            }
        }
        // if there is no primary key or the object doesn't already exist in the entity map, then create a new instance
        if ($primary_key) {
            $classInstance = $this->get_from_entity_map($primary_key);
            if (! $classInstance) {
                $classInstance = EE_Registry::instance()
                                            ->load_class($className,
                                                array($this_model_fields_n_values, $this->_timezone), true, false);
                // add this new object to the entity map
                $classInstance = $this->add_to_entity_map($classInstance);
            }
        } else {
            $classInstance = EE_Registry::instance()
                                        ->load_class($className, array($this_model_fields_n_values, $this->_timezone),
                                            true, false);
        }
        //it is entirely possible that the instantiated class object has a set timezone_string db field and has set it's internal _timezone property accordingly (see new_instance_from_db in model objects particularly EE_Event for example).  In this case, we want to make sure the model object doesn't have its timezone string overwritten by any timezone property currently set here on the model so, we intentionally override the model _timezone property with the model_object timezone property.
        $this->set_timezone($classInstance->get_timezone());
        return $classInstance;
    }



    /**
     * Gets the model object from the  entity map if it exists
     *
     * @param int|string $id the ID of the model object
     * @return EE_Base_Class
     */
    public function get_from_entity_map($id)
    {
        return isset($this->_entity_map[EEM_Base::$_model_query_blog_id][$id])
            ? $this->_entity_map[EEM_Base::$_model_query_blog_id][$id] : null;
    }



    /**
     * add_to_entity_map
     * Adds the object to the model's entity mappings
     *        Effectively tells the models "Hey, this model object is the most up-to-date representation of the data,
     *        and for the remainder of the request, it's even more up-to-date than what's in the database.
     *        So, if the database doesn't agree with what's in the entity mapper, ignore the database"
     *        If the database gets updated directly and you want the entity mapper to reflect that change,
     *        then this method should be called immediately after the update query
     * Note: The map is indexed by whatever the current blog id is set (via EEM_Base::$_model_query_blog_id).  This is
     * so on multisite, the entity map is specific to the query being done for a specific site.
     *
     * @param    EE_Base_Class $object
     * @throws EE_Error
     * @return \EE_Base_Class
     */
    public function add_to_entity_map(EE_Base_Class $object)
    {
        $className = $this->_get_class_name();
        if (! $object instanceof $className) {
            throw new EE_Error(sprintf(__("You tried adding a %s to a mapping of %ss", "event_espresso"),
                is_object($object) ? get_class($object) : $object, $className));
        }
        /** @var $object EE_Base_Class */
        if (! $object->ID()) {
            throw new EE_Error(sprintf(__("You tried storing a model object with NO ID in the %s entity mapper.",
                "event_espresso"), get_class($this)));
        }
        // double check it's not already there
        $classInstance = $this->get_from_entity_map($object->ID());
        if ($classInstance) {
            return $classInstance;
        } else {
            $this->_entity_map[EEM_Base::$_model_query_blog_id][$object->ID()] = $object;
            return $object;
        }
    }



    /**
     * if a valid identifier is provided, then that entity is unset from the entity map,
     * if no identifier is provided, then the entire entity map is emptied
     *
     * @param int|string $id the ID of the model object
     * @return boolean
     */
    public function clear_entity_map($id = null)
    {
        if (empty($id)) {
            $this->_entity_map[EEM_Base::$_model_query_blog_id] = array();
            return true;
        }
        if (isset($this->_entity_map[EEM_Base::$_model_query_blog_id][$id])) {
            unset($this->_entity_map[EEM_Base::$_model_query_blog_id][$id]);
            return true;
        }
        return false;
    }



    /**
     * Public wrapper for _deduce_fields_n_values_from_cols_n_values.
     * Given an array where keys are column (or column alias) names and values,
     * returns an array of their corresponding field names and database values
     *
     * @param array $cols_n_values
     * @return array
     */
    public function deduce_fields_n_values_from_cols_n_values($cols_n_values)
    {
        return $this->_deduce_fields_n_values_from_cols_n_values($cols_n_values);
    }



    /**
     * _deduce_fields_n_values_from_cols_n_values
     * Given an array where keys are column (or column alias) names and values,
     * returns an array of their corresponding field names and database values
     *
     * @param string $cols_n_values
     * @return array
     */
    protected function _deduce_fields_n_values_from_cols_n_values($cols_n_values)
    {
        $this_model_fields_n_values = array();
        foreach ($this->get_tables() as $table_alias => $table_obj) {
            $table_pk_value = $this->_get_column_value_with_table_alias_or_not($cols_n_values,
                $table_obj->get_fully_qualified_pk_column(), $table_obj->get_pk_column());
            //there is a primary key on this table and its not set. Use defaults for all its columns
            if ($table_pk_value === null && $table_obj->get_pk_column()) {
                foreach ($this->_get_fields_for_table($table_alias) as $field_name => $field_obj) {
                    if (! $field_obj->is_db_only_field()) {
                        //prepare field as if its coming from db
                        $prepared_value = $field_obj->prepare_for_set($field_obj->get_default_value());
                        $this_model_fields_n_values[$field_name] = $field_obj->prepare_for_use_in_db($prepared_value);
                    }
                }
            } else {
                //the table's rows existed. Use their values
                foreach ($this->_get_fields_for_table($table_alias) as $field_name => $field_obj) {
                    if (! $field_obj->is_db_only_field()) {
                        $this_model_fields_n_values[$field_name] = $this->_get_column_value_with_table_alias_or_not(
                            $cols_n_values, $field_obj->get_qualified_column(),
                            $field_obj->get_table_column()
                        );
                    }
                }
            }
        }
        return $this_model_fields_n_values;
    }



    /**
     * @param $cols_n_values
     * @param $qualified_column
     * @param $regular_column
     * @return null
     */
    protected function _get_column_value_with_table_alias_or_not($cols_n_values, $qualified_column, $regular_column)
    {
        $value = null;
        //ask the field what it think it's table_name.column_name should be, and call it the "qualified column"
        //does the field on the model relate to this column retrieved from the db?
        //or is it a db-only field? (not relating to the model)
        if (isset($cols_n_values[$qualified_column])) {
            $value = $cols_n_values[$qualified_column];
        } elseif (isset($cols_n_values[$regular_column])) {
            $value = $cols_n_values[$regular_column];
        }
        return $value;
    }



    /**
     * refresh_entity_map_from_db
     * Makes sure the model object in the entity map at $id assumes the values
     * of the database (opposite of EE_base_Class::save())
     *
     * @param int|string $id
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function refresh_entity_map_from_db($id)
    {
        $obj_in_map = $this->get_from_entity_map($id);
        if ($obj_in_map) {
            $wpdb_results = $this->_get_all_wpdb_results(
                array(array($this->get_primary_key_field()->get_name() => $id), 'limit' => 1)
            );
            if ($wpdb_results && is_array($wpdb_results)) {
                $one_row = reset($wpdb_results);
                foreach ($this->_deduce_fields_n_values_from_cols_n_values($one_row) as $field_name => $db_value) {
                    $obj_in_map->set_from_db($field_name, $db_value);
                }
                //clear the cache of related model objects
                foreach ($this->relation_settings() as $relation_name => $relation_obj) {
                    $obj_in_map->clear_cache($relation_name, null, true);
                }
            }
            $this->_entity_map[EEM_Base::$_model_query_blog_id][$id] = $obj_in_map;
            return $obj_in_map;
        } else {
            return $this->get_one_by_ID($id);
        }
    }



    /**
     * refresh_entity_map_with
     * Leaves the entry in the entity map alone, but updates it to match the provided
     * $replacing_model_obj (which we assume to be its equivalent but somehow NOT in the entity map).
     * This is useful if you have a model object you want to make authoritative over what's in the entity map currently.
     * Note: The old $replacing_model_obj should now be destroyed as it's now un-authoritative
     *
     * @param int|string    $id
     * @param EE_Base_Class $replacing_model_obj
     * @return \EE_Base_Class
     * @throws \EE_Error
     */
    public function refresh_entity_map_with($id, $replacing_model_obj)
    {
        $obj_in_map = $this->get_from_entity_map($id);
        if ($obj_in_map) {
            if ($replacing_model_obj instanceof EE_Base_Class) {
                foreach ($replacing_model_obj->model_field_array() as $field_name => $value) {
                    $obj_in_map->set($field_name, $value);
                }
                //make the model object in the entity map's cache match the $replacing_model_obj
                foreach ($this->relation_settings() as $relation_name => $relation_obj) {
                    $obj_in_map->clear_cache($relation_name, null, true);
                    foreach ($replacing_model_obj->get_all_from_cache($relation_name) as $cache_id => $cached_obj) {
                        $obj_in_map->cache($relation_name, $cached_obj, $cache_id);
                    }
                }
            }
            return $obj_in_map;
        } else {
            $this->add_to_entity_map($replacing_model_obj);
            return $replacing_model_obj;
        }
    }



    /**
     * Gets the EE class that corresponds to this model. Eg, for EEM_Answer that
     * would be EE_Answer.To import that class, you'd just add ".class.php" to the name, like so
     * require_once($this->_getClassName().".class.php");
     *
     * @return string
     */
    private function _get_class_name()
    {
        return "EE_" . $this->get_this_model_name();
    }



    /**
     * Get the name of the items this model represents, for the quantity specified. Eg,
     * if $quantity==1, on EEM_Event, it would 'Event' (internationalized), otherwise
     * it would be 'Events'.
     *
     * @param int $quantity
     * @return string
     */
    public function item_name($quantity = 1)
    {
        return (int)$quantity === 1 ? $this->singular_item : $this->plural_item;
    }



    /**
     * Very handy general function to allow for plugins to extend any child of EE_TempBase.
     * If a method is called on a child of EE_TempBase that doesn't exist, this function is called
     * (http://www.garfieldtech.com/blog/php-magic-call) and passed the method's name and arguments. Instead of
     * requiring a plugin to extend the EE_TempBase (which works fine is there's only 1 plugin, but when will that
     * happen?) they can add a hook onto 'filters_hook_espresso__{className}__{methodName}' (eg,
     * filters_hook_espresso__EE_Answer__my_great_function) and accepts 2 arguments: the object on which the function
     * was called, and an array of the original arguments passed to the function. Whatever their callback function
     * returns will be returned by this function. Example: in functions.php (or in a plugin):
     * add_filter('FHEE__EE_Answer__my_callback','my_callback',10,3); function
     * my_callback($previousReturnValue,EE_TempBase $object,$argsArray){
     * $returnString= "you called my_callback! and passed args:".implode(",",$argsArray);
     *        return $previousReturnValue.$returnString;
     * }
     * require('EEM_Answer.model.php');
     * $answer=EEM_Answer::instance();
     * echo $answer->my_callback('monkeys',100);
     * //will output "you called my_callback! and passed args:monkeys,100"
     *
     * @param string $methodName name of method which was called on a child of EE_TempBase, but which
     * @param array  $args       array of original arguments passed to the function
     * @throws EE_Error
     * @return mixed whatever the plugin which calls add_filter decides
     */
    public function __call($methodName, $args)
    {
        $className = get_class($this);
        $tagName = "FHEE__{$className}__{$methodName}";
        if (! has_filter($tagName)) {
            throw new EE_Error(
                sprintf(
                    __('Method %1$s on model %2$s does not exist! You can create one with the following code in functions.php or in a plugin: %4$s function my_callback(%4$s \$previousReturnValue, EEM_Base \$object\ $argsArray=NULL ){%4$s     /*function body*/%4$s      return \$whatever;%4$s }%4$s add_filter( \'%3$s\', \'my_callback\', 10, 3 );',
                        'event_espresso'),
                    $methodName,
                    $className,
                    $tagName,
                    '<br />'
                )
            );
        }
        return apply_filters($tagName, null, $this, $args);
    }



    /**
     * Ensures $base_class_obj_or_id is of the EE_Base_Class child that corresponds ot this model.
     * If not, assumes its an ID, and uses $this->get_one_by_ID() to get the EE_Base_Class.
     *
     * @param EE_Base_Class|string|int $base_class_obj_or_id either:
     *                                                       the EE_Base_Class object that corresponds to this Model,
     *                                                       the object's class name
     *                                                       or object's ID
     * @param boolean                  $ensure_is_in_db      if set, we will also verify this model object
     *                                                       exists in the database. If it does not, we add it
     * @throws EE_Error
     * @return EE_Base_Class
     */
    public function ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db = false)
    {
        $className = $this->_get_class_name();
        if ($base_class_obj_or_id instanceof $className) {
            $model_object = $base_class_obj_or_id;
        } else {
            $primary_key_field = $this->get_primary_key_field();
            if (
                $primary_key_field instanceof EE_Primary_Key_Int_Field
                && (
                    is_int($base_class_obj_or_id)
                    || is_string($base_class_obj_or_id)
                )
            ) {
                // assume it's an ID.
                // either a proper integer or a string representing an integer (eg "101" instead of 101)
                $model_object = $this->get_one_by_ID($base_class_obj_or_id);
            } else if (
                $primary_key_field instanceof EE_Primary_Key_String_Field
                && is_string($base_class_obj_or_id)
            ) {
                // assume its a string representation of the object
                $model_object = $this->get_one_by_ID($base_class_obj_or_id);
            } else {
                throw new EE_Error(
                    sprintf(
                        __(
                            "'%s' is neither an object of type %s, nor an ID! Its full value is '%s'",
                            'event_espresso'
                        ),
                        $base_class_obj_or_id,
                        $this->_get_class_name(),
                        print_r($base_class_obj_or_id, true)
                    )
                );
            }
        }
        if ($ensure_is_in_db && $model_object->ID() !== null) {
            $model_object->save();
        }
        return $model_object;
    }



    /**
     * Similar to ensure_is_obj(), this method makes sure $base_class_obj_or_id
     * is a value of the this model's primary key. If it's an EE_Base_Class child,
     * returns it ID.
     *
     * @param EE_Base_Class|int|string $base_class_obj_or_id
     * @return int|string depending on the type of this model object's ID
     * @throws EE_Error
     */
    public function ensure_is_ID($base_class_obj_or_id)
    {
        $className = $this->_get_class_name();
        if ($base_class_obj_or_id instanceof $className) {
            /** @var $base_class_obj_or_id EE_Base_Class */
            $id = $base_class_obj_or_id->ID();
        } elseif (is_int($base_class_obj_or_id)) {
            //assume it's an ID
            $id = $base_class_obj_or_id;
        } elseif (is_string($base_class_obj_or_id)) {
            //assume its a string representation of the object
            $id = $base_class_obj_or_id;
        } else {
            throw new EE_Error(sprintf(__("'%s' is neither an object of type %s, nor an ID! Its full value is '%s'",
                'event_espresso'), $base_class_obj_or_id, $this->_get_class_name(),
                print_r($base_class_obj_or_id, true)));
        }
        return $id;
    }



    /**
     * Sets whether the values passed to the model (eg, values in WHERE, values in INSERT, UPDATE, etc)
     * have already been ran through the appropriate model field's prepare_for_use_in_db method. IE, they have
     * been sanitized and converted into the appropriate domain.
     * Usually the only place you'll want to change the default (which is to assume values have NOT been sanitized by
     * the model object/model field) is when making a method call from WITHIN a model object, which has direct access
     * to its sanitized values. Note: after changing this setting, you should set it back to its previous value (using
     * get_assumption_concerning_values_already_prepared_by_model_object()) eg.
     * $EVT = EEM_Event::instance(); $old_setting =
     * $EVT->get_assumption_concerning_values_already_prepared_by_model_object();
     * $EVT->assume_values_already_prepared_by_model_object(true);
     * $EVT->update(array('foo'=>'bar'),array(array('foo'=>'monkey')));
     * $EVT->assume_values_already_prepared_by_model_object($old_setting);
     *
     * @param int $values_already_prepared like one of the constants on EEM_Base
     * @return void
     */
    public function assume_values_already_prepared_by_model_object(
        $values_already_prepared = self::not_prepared_by_model_object
    ) {
        $this->_values_already_prepared_by_model_object = $values_already_prepared;
    }



    /**
     * Read comments for assume_values_already_prepared_by_model_object()
     *
     * @return int
     */
    public function get_assumption_concerning_values_already_prepared_by_model_object()
    {
        return $this->_values_already_prepared_by_model_object;
    }



    /**
     * Gets all the indexes on this model
     *
     * @return EE_Index[]
     */
    public function indexes()
    {
        return $this->_indexes;
    }



    /**
     * Gets all the Unique Indexes on this model
     *
     * @return EE_Unique_Index[]
     */
    public function unique_indexes()
    {
        $unique_indexes = array();
        foreach ($this->_indexes as $name => $index) {
            if ($index instanceof EE_Unique_Index) {
                $unique_indexes [$name] = $index;
            }
        }
        return $unique_indexes;
    }



    /**
     * Gets all the fields which, when combined, make the primary key.
     * This is usually just an array with 1 element (the primary key), but in cases
     * where there is no primary key, it's a combination of fields as defined
     * on a primary index
     *
     * @return EE_Model_Field_Base[] indexed by the field's name
     * @throws \EE_Error
     */
    public function get_combined_primary_key_fields()
    {
        foreach ($this->indexes() as $index) {
            if ($index instanceof EE_Primary_Key_Index) {
                return $index->fields();
            }
        }
        return array($this->primary_key_name() => $this->get_primary_key_field());
    }



    /**
     * Used to build a primary key string (when the model has no primary key),
     * which can be used a unique string to identify this model object.
     *
     * @param array $cols_n_values keys are field names, values are their values
     * @return string
     * @throws \EE_Error
     */
    public function get_index_primary_key_string($cols_n_values)
    {
        $cols_n_values_for_primary_key_index = array_intersect_key($cols_n_values,
            $this->get_combined_primary_key_fields());
        return http_build_query($cols_n_values_for_primary_key_index);
    }



    /**
     * Gets the field values from the primary key string
     *
     * @see EEM_Base::get_combined_primary_key_fields() and EEM_Base::get_index_primary_key_string()
     * @param string $index_primary_key_string
     * @return null|array
     * @throws \EE_Error
     */
    public function parse_index_primary_key_string($index_primary_key_string)
    {
        $key_fields = $this->get_combined_primary_key_fields();
        //check all of them are in the $id
        $key_vals_in_combined_pk = array();
        parse_str($index_primary_key_string, $key_vals_in_combined_pk);
        foreach ($key_fields as $key_field_name => $field_obj) {
            if (! isset($key_vals_in_combined_pk[$key_field_name])) {
                return null;
            }
        }
        return $key_vals_in_combined_pk;
    }



    /**
     * verifies that an array of key-value pairs for model fields has a key
     * for each field comprising the primary key index
     *
     * @param array $key_vals
     * @return boolean
     * @throws \EE_Error
     */
    public function has_all_combined_primary_key_fields($key_vals)
    {
        $keys_it_should_have = array_keys($this->get_combined_primary_key_fields());
        foreach ($keys_it_should_have as $key) {
            if (! isset($key_vals[$key])) {
                return false;
            }
        }
        return true;
    }



    /**
     * Finds all model objects in the DB that appear to be a copy of $model_object_or_attributes_array.
     * We consider something to be a copy if all the attributes match (except the ID, of course).
     *
     * @param array|EE_Base_Class $model_object_or_attributes_array If its an array, it's field-value pairs
     * @param array               $query_params                     like EEM_Base::get_all's query_params.
     * @throws EE_Error
     * @return \EE_Base_Class[] Array keys are object IDs (if there is a primary key on the model. if not, numerically
     *                                                              indexed)
     */
    public function get_all_copies($model_object_or_attributes_array, $query_params = array())
    {
        if ($model_object_or_attributes_array instanceof EE_Base_Class) {
            $attributes_array = $model_object_or_attributes_array->model_field_array();
        } elseif (is_array($model_object_or_attributes_array)) {
            $attributes_array = $model_object_or_attributes_array;
        } else {
            throw new EE_Error(sprintf(__("get_all_copies should be provided with either a model object or an array of field-value-pairs, but was given %s",
                "event_espresso"), $model_object_or_attributes_array));
        }
        //even copies obviously won't have the same ID, so remove the primary key
        //from the WHERE conditions for finding copies (if there is a primary key, of course)
        if ($this->has_primary_key_field() && isset($attributes_array[$this->primary_key_name()])) {
            unset($attributes_array[$this->primary_key_name()]);
        }
        if (isset($query_params[0])) {
            $query_params[0] = array_merge($attributes_array, $query_params);
        } else {
            $query_params[0] = $attributes_array;
        }
        return $this->get_all($query_params);
    }



    /**
     * Gets the first copy we find. See get_all_copies for more details
     *
     * @param       mixed EE_Base_Class | array        $model_object_or_attributes_array
     * @param array $query_params
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function get_one_copy($model_object_or_attributes_array, $query_params = array())
    {
        if (! is_array($query_params)) {
            EE_Error::doing_it_wrong('EEM_Base::get_one_copy',
                sprintf(__('$query_params should be an array, you passed a variable of type %s', 'event_espresso'),
                    gettype($query_params)), '4.6.0');
            $query_params = array();
        }
        $query_params['limit'] = 1;
        $copies = $this->get_all_copies($model_object_or_attributes_array, $query_params);
        if (is_array($copies)) {
            return array_shift($copies);
        } else {
            return null;
        }
    }



    /**
     * Updates the item with the specified id. Ignores default query parameters because
     * we have specified the ID, and its assumed we KNOW what we're doing
     *
     * @param array      $fields_n_values keys are field names, values are their new values
     * @param int|string $id              the value of the primary key to update
     * @return int number of rows updated
     * @throws \EE_Error
     */
    public function update_by_ID($fields_n_values, $id)
    {
        $query_params = array(
            0                          => array($this->get_primary_key_field()->get_name() => $id),
            'default_where_conditions' => EEM_Base::default_where_conditions_others_only,
        );
        return $this->update($fields_n_values, $query_params);
    }



    /**
     * Changes an operator which was supplied to the models into one usable in SQL
     *
     * @param string $operator_supplied
     * @return string an operator which can be used in SQL
     * @throws EE_Error
     */
    private function _prepare_operator_for_sql($operator_supplied)
    {
        $sql_operator = isset($this->_valid_operators[$operator_supplied]) ? $this->_valid_operators[$operator_supplied]
            : null;
        if ($sql_operator) {
            return $sql_operator;
        } else {
            throw new EE_Error(sprintf(__("The operator '%s' is not in the list of valid operators: %s",
                "event_espresso"), $operator_supplied, implode(",", array_keys($this->_valid_operators))));
        }
    }



    /**
     * Gets an array where keys are the primary keys and values are their 'names'
     * (as determined by the model object's name() function, which is often overridden)
     *
     * @param array $query_params like get_all's
     * @return string[]
     * @throws \EE_Error
     */
    public function get_all_names($query_params = array())
    {
        $objs = $this->get_all($query_params);
        $names = array();
        foreach ($objs as $obj) {
            $names[$obj->ID()] = $obj->name();
        }
        return $names;
    }



    /**
     * Gets an array of primary keys from the model objects. If you acquired the model objects
     * using EEM_Base::get_all() you don't need to call this (and probably shouldn't because
     * this is duplicated effort and reduces efficiency) you would be better to use
     * array_keys() on $model_objects.
     *
     * @param \EE_Base_Class[] $model_objects
     * @param boolean          $filter_out_empty_ids if a model object has an ID of '' or 0, don't bother including it
     *                                               in the returned array
     * @return array
     * @throws \EE_Error
     */
    public function get_IDs($model_objects, $filter_out_empty_ids = false)
    {
        if (! $this->has_primary_key_field()) {
            if (WP_DEBUG) {
                EE_Error::add_error(
                    __('Trying to get IDs from a model than has no primary key', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        $IDs = array();
        foreach ($model_objects as $model_object) {
            $id = $model_object->ID();
            if (! $id) {
                if ($filter_out_empty_ids) {
                    continue;
                }
                if (WP_DEBUG) {
                    EE_Error::add_error(
                        __(
                            'Called %1$s on a model object that has no ID and so probably hasn\'t been saved to the database',
                            'event_espresso'
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
            $IDs[] = $id;
        }
        return $IDs;
    }



    /**
     * Returns the string used in capabilities relating to this model. If there
     * are no capabilities that relate to this model returns false
     *
     * @return string|false
     */
    public function cap_slug()
    {
        return apply_filters('FHEE__EEM_Base__cap_slug', $this->_caps_slug, $this);
    }



    /**
     * Returns the capability-restrictions array (@see EEM_Base::_cap_restrictions).
     * If $context is provided (which should be set to one of EEM_Base::valid_cap_contexts())
     * only returns the cap restrictions array in that context (ie, the array
     * at that key)
     *
     * @param string $context
     * @return EE_Default_Where_Conditions[] indexed by associated capability
     * @throws \EE_Error
     */
    public function cap_restrictions($context = EEM_Base::caps_read)
    {
        EEM_Base::verify_is_valid_cap_context($context);
        //check if we ought to run the restriction generator first
        if (
            isset($this->_cap_restriction_generators[$context])
            && $this->_cap_restriction_generators[$context] instanceof EE_Restriction_Generator_Base
            && ! $this->_cap_restriction_generators[$context]->has_generated_cap_restrictions()
        ) {
            $this->_cap_restrictions[$context] = array_merge(
                $this->_cap_restrictions[$context],
                $this->_cap_restriction_generators[$context]->generate_restrictions()
            );
        }
        //and make sure we've finalized the construction of each restriction
        foreach ($this->_cap_restrictions[$context] as $where_conditions_obj) {
            if ($where_conditions_obj instanceof EE_Default_Where_Conditions) {
                $where_conditions_obj->_finalize_construct($this);
            }
        }
        return $this->_cap_restrictions[$context];
    }



    /**
     * Indicating whether or not this model thinks its a wp core model
     *
     * @return boolean
     */
    public function is_wp_core_model()
    {
        return $this->_wp_core_model;
    }



    /**
     * Gets all the caps that are missing which impose a restriction on
     * queries made in this context
     *
     * @param string $context one of EEM_Base::caps_ constants
     * @return EE_Default_Where_Conditions[] indexed by capability name
     * @throws \EE_Error
     */
    public function caps_missing($context = EEM_Base::caps_read)
    {
        $missing_caps = array();
        $cap_restrictions = $this->cap_restrictions($context);
        foreach ($cap_restrictions as $cap => $restriction_if_no_cap) {
            if (! EE_Capabilities::instance()
                                 ->current_user_can($cap, $this->get_this_model_name() . '_model_applying_caps')
            ) {
                $missing_caps[$cap] = $restriction_if_no_cap;
            }
        }
        return $missing_caps;
    }



    /**
     * Gets the mapping from capability contexts to action strings used in capability names
     *
     * @return array keys are one of EEM_Base::valid_cap_contexts(), and values are usually
     * one of 'read', 'edit', or 'delete'
     */
    public function cap_contexts_to_cap_action_map()
    {
        return apply_filters('FHEE__EEM_Base__cap_contexts_to_cap_action_map', $this->_cap_contexts_to_cap_action_map,
            $this);
    }



    /**
     * Gets the action string for the specified capability context
     *
     * @param string $context
     * @return string one of EEM_Base::cap_contexts_to_cap_action_map() values
     * @throws \EE_Error
     */
    public function cap_action_for_context($context)
    {
        $mapping = $this->cap_contexts_to_cap_action_map();
        if (isset($mapping[$context])) {
            return $mapping[$context];
        }
        if ($action = apply_filters('FHEE__EEM_Base__cap_action_for_context', null, $this, $mapping, $context)) {
            return $action;
        }
        throw new EE_Error(
            sprintf(
                __('Cannot find capability restrictions for context "%1$s", allowed values are:%2$s', 'event_espresso'),
                $context,
                implode(',', array_keys($this->cap_contexts_to_cap_action_map()))
            )
        );
    }



    /**
     * Returns all the capability contexts which are valid when querying models
     *
     * @return array
     */
    public static function valid_cap_contexts()
    {
        return apply_filters('FHEE__EEM_Base__valid_cap_contexts', array(
            self::caps_read,
            self::caps_read_admin,
            self::caps_edit,
            self::caps_delete,
        ));
    }



    /**
     * Returns all valid options for 'default_where_conditions'
     *
     * @return array
     */
    public static function valid_default_where_conditions()
    {
        return array(
            EEM_Base::default_where_conditions_all,
            EEM_Base::default_where_conditions_this_only,
            EEM_Base::default_where_conditions_others_only,
            EEM_Base::default_where_conditions_minimum_all,
            EEM_Base::default_where_conditions_minimum_others,
            EEM_Base::default_where_conditions_none
        );
    }

    // public static function default_where_conditions_full
    /**
     * Verifies $context is one of EEM_Base::valid_cap_contexts(), if not it throws an exception
     *
     * @param string $context
     * @return bool
     * @throws \EE_Error
     */
    static public function verify_is_valid_cap_context($context)
    {
        $valid_cap_contexts = EEM_Base::valid_cap_contexts();
        if (in_array($context, $valid_cap_contexts)) {
            return true;
        } else {
            throw new EE_Error(
                sprintf(
                    __('Context "%1$s" passed into model "%2$s" is not a valid context. They are: %3$s',
                        'event_espresso'),
                    $context,
                    'EEM_Base',
                    implode(',', $valid_cap_contexts)
                )
            );
        }
    }



    /**
     * Clears all the models field caches. This is only useful when a sub-class
     * might have added a field or something and these caches might be invalidated
     */
    protected function _invalidate_field_caches()
    {
        $this->_cache_foreign_key_to_fields = array();
        $this->_cached_fields = null;
        $this->_cached_fields_non_db_only = null;
    }



    /**
     * Gets the list of all the where query param keys that relate to logic instead of field names
     * (eg "and", "or", "not").
     *
     * @return array
     */
    public function logic_query_param_keys()
    {
        return $this->_logic_query_param_keys;
    }



    /**
     * Determines whether or not the where query param array key is for a logic query param.
     * Eg 'OR', 'not*', and 'and*because-i-say-so' shoudl all return true, whereas
     * 'ATT_fname', 'EVT_name*not-you-or-me', and 'ORG_name' should return false
     *
     * @param $query_param_key
     * @return bool
     */
    public function is_logic_query_param_key($query_param_key)
    {
        foreach ($this->logic_query_param_keys() as $logic_query_param_key) {
            if ($query_param_key === $logic_query_param_key
                || strpos($query_param_key, $logic_query_param_key . '*') === 0
            ) {
                return true;
            }
        }
        return false;
    }



}
