<?php

/**
 *
 * EEME_Base
 * For magically adding fields, relations, and functions onto existing models.
 * example child class: adds a class called EEME_Sample_Attendee which adds an extra table for
 * meta info that we want to use for frequent querying (otherwise we could just use the extra meta features),
 * and adds a field named 'ATT_foobar' on the Attendee model,
 * which is actually a foreign key to transactions, and
 * a relation to transactions, and a function called new_func() onto EEM_Attendee which
 * gets all attendees which have a direct relation to the specified transaction.
 * For example:
 *
 * class EEME_Sample_Attendee extends EEME_Base{
 *      function __construct() {
 *          parent::__construct('Attendee');
 *      }
 *
 *      public function registerExtensions()
 *      {
 *          $this->_extra_tables    = [
 *              'Mock_Attendee_Meta' => new EE_Secondary_Table(
 *                  'esp_mock_attendee_meta',
 *                  'MATTM_ID',
 *                  'ATT_ID'
 *              ),
 *          ];
 *          $this->_extra_fields    = [
 *              'Mock_Attendee_Meta' => [
 *                  'MATTM_ID'   => new EE_DB_Only_Int_Field(
 *                      'MATTM_ID',
 *                      esc_html__('Mock Attendee Meta Row ID', 'event_espresso'),
 *                      false
 *                  ),
 *                  'MATT_ID_fk' => new EE_DB_Only_Int_Field(
 *                      'ATT_ID',
 *                      esc_html__("Foreign Key to Attendee in Post Table", "event_espresso"),
 *                      false
 *                  ),
 *                  'ATT_foobar' => new EE_Foreign_Key_Int_Field(
 *                      'ATT_foobar', esc_html__("Foobar", 'event_espresso'),
 *                      true,
 *                      0,
 *                      'Transaction'
 *                  ),
 *              ],
 *          ];
 *          $this->_extra_relations = ['Transaction' => new EE_Belongs_To_Relation()];
 *      }
 *
 *      function ext_new_func($arg1){
 *          return $this->_->get_all(array(array('Transaction.TXN_ID'=>$arg1)));
 *      }
 * }
 *
 * example usage: early you need to simply construct this extension, and it will automatically
 * add any of its needed hooks. Like so: new EEME_Sample_Attendee();
 * then you can use that field, relation, and function on the EEM_Attendee singleton. Eg.
 * $attendees_directly_related_to_txn_1 = EEM_Attendee::instance()->new_func(1);
 *
 * @package     Event Espresso
 * @subpackage  core/libraries/plugin_api/db
 * @author      Mike Nelson
 */
abstract class EEME_Base
{
    const extending_method_prefix        = 'ext_';

    const dynamic_callback_method_prefix = 'dynamic_callback_method_';

    protected array $_extra_tables = [];

    protected array $_extra_fields = [];

    protected array $_extra_relations = [];

    /**
     * The model name that is extended (not classname)
     *
     * @var string
     */
    protected string $_model_name_extended = '';

    /**
     * The model this extends
     *
     * @var EEM_Base|null
     */
    protected $_ = null;


    /**
     * @throws EE_Error
     */
    public function __construct(?string $model_name_extended = '')
    {
        if ($model_name_extended) {
            // setting this inside a conditional for backwards compatibility
            // because non-updated child classes may set the property directly and not pass to this constructor
            $this->_model_name_extended = $model_name_extended;
        }
        if (! $this->_model_name_extended) {
            throw new EE_Error(
                // not translated because this is happening prior to the WP init hook when translations are set up
                "When declaring a model extension, you must define its _model_name_extended property. It should be a model name like 'Attendee' or 'Event'"
            );
        }
        $construct_end_action = "AHEE__EEM_{$this->_model_name_extended}__construct__end";
        if (did_action($construct_end_action)) {
            throw new EE_Error(
                sprintf(
                    "Hooked in model extension '%s' too late! The model %s has already been used! We know because the action %s has been fired",
                    get_class($this),
                    $this->_model_name_extended,
                    $construct_end_action
                )
            );
        }
        add_action("AHEE__EEM_{$this->_model_name_extended}__instance__before_construct", [$this, 'extendModel']);
    }


    /**
     * Used to populate the $_extra_tables, $_extra_fields, and $_extra_relations arrays;
     *
     * @return void
     * @since 5.0.42
     */
    public function registerExtensions() {
        // Intentionally left blank, child classes should override this method to populate the arrays
        // with their own values.
        // For example:
        // $this->_extra_tables    = [...];
        // $this->_extra_fields    = [...];
        // $this->_extra_relations = [...];
    }


    public function extendModel()
    {
        $this->registerExtensions();
        add_filter(
            "FHEE__EEM_{$this->_model_name_extended}__construct__tables",
            [$this, 'add_extra_tables_on_filter']
        );
        add_filter(
            "FHEE__EEM_{$this->_model_name_extended}__construct__fields",
            [$this, 'add_extra_fields_on_filter']
        );
        add_filter(
            "FHEE__EEM_{$this->_model_name_extended}__construct__model_relations",
            [$this, 'add_extra_relations_on_filter']
        );
        $this->_register_extending_methods();
    }


    /**
     * @param array $existing_tables
     * @return array
     */
    public function add_extra_tables_on_filter($existing_tables)
    {
        return array_merge($existing_tables, $this->_extra_tables);
    }


    /**
     * @param array $existing_fields
     * @return array
     */
    public function add_extra_fields_on_filter($existing_fields)
    {
        if ($this->_extra_fields) {
            foreach ($this->_extra_fields as $table_alias => $fields) {
                if (! isset($existing_fields[ $table_alias ])) {
                    $existing_fields[ $table_alias ] = [];
                }
                $existing_fields[ $table_alias ] = array_merge(
                    (array) $existing_fields[ $table_alias ],
                    $this->_extra_fields[ $table_alias ]
                );
            }
        }
        return $existing_fields;
    }


    /**
     * @param array $existing_relations
     * @return array
     */
    public function add_extra_relations_on_filter($existing_relations)
    {
        return array_merge($existing_relations, $this->_extra_relations);
    }


    /**
     * scans the child of EEME_Base for functions starting with ext_, and magically makes them functions on the
     * model extended. (Internally uses filters, and the __call magic method)
     */
    protected function _register_extending_methods()
    {
        $all_methods = get_class_methods(get_class($this));
        foreach ($all_methods as $method_name) {
            if (strpos($method_name, self::extending_method_prefix) === 0) {
                $method_name_on_model = str_replace(self::extending_method_prefix, '', $method_name);
                $callback_name        = "FHEE__EEM_{$this->_model_name_extended}__$method_name_on_model";
                add_filter(
                    $callback_name,
                    [$this, self::dynamic_callback_method_prefix . $method_name_on_model],
                    10,
                    10
                );
            }
        }
    }


    /**
     * scans the child of EEME_Base for functions starting with ext_, and magically REMOVES them as functions on the
     * model extended. (Internally uses filters, and the __call magic method)
     */
    public function deregister()
    {
        remove_filter(
            "FHEE__EEM_{$this->_model_name_extended}__construct__tables",
            [$this, 'add_extra_tables_on_filter']
        );
        remove_filter(
            "FHEE__EEM_{$this->_model_name_extended}__construct__fields",
            [$this, 'add_extra_fields_on_filter']
        );
        remove_filter(
            "FHEE__EEM_{$this->_model_name_extended}__construct__model_relations",
            [$this, 'add_extra_relations_on_filter']
        );
        $all_methods = get_class_methods(get_class($this));
        foreach ($all_methods as $method_name) {
            if (strpos($method_name, self::extending_method_prefix) === 0) {
                $method_name_on_model = str_replace(self::extending_method_prefix, '', $method_name);
                $callback_name        = "FHEE__EEM_{$this->_model_name_extended}__$method_name_on_model";
                remove_filter(
                    $callback_name,
                    [$this, self::dynamic_callback_method_prefix . $method_name_on_model]
                );
            }
        }
        $model_to_reset = "EEM_$this->_model_name_extended";
        if (class_exists($model_to_reset)) {
            $model_to_reset::reset();
        }
    }


    /**
     * @param string $callback_method_name
     * @param array  $args
     * @return mixed
     * @throws EE_Error
     */
    public function __call(string $callback_method_name, array $args)
    {
        if (strpos($callback_method_name, self::dynamic_callback_method_prefix) === 0) {
            // it's a dynamic callback for a method name
            $method_called_on_model = str_replace(self::dynamic_callback_method_prefix, '', $callback_method_name);
            // intentionally skipping first array element, ie: [, is correct
            [, $model_called, $args_provided_to_method_on_model] = $args;
            // phpcs:disable WordPress.WP.I18n.SingleUnderscoreGetTextFunction
            $this->_ = $model_called;
            // phpcs:enable
            $extending_method = self::extending_method_prefix . $method_called_on_model;
            if (method_exists($this, $extending_method)) {
                return call_user_func_array([$this, $extending_method], $args_provided_to_method_on_model);
            } else {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            "An odd error occurred. Model '%s' had a method called on it that it didn't recognize. So it passed it onto the model extension '%s' (because it had a function named '%s' which should be able to handle it), but the function '%s' doesnt exist!)",
                            "event_espresso"
                        ),
                        $this->_model_name_extended,
                        get_class($this),
                        $extending_method,
                        $extending_method
                    )
                );
            }
        } else {
            throw new EE_Error(
                sprintf(
                    esc_html__("There is no method named '%s' on '%s'", "event_espresso"),
                    $callback_method_name,
                    get_class($this)
                )
            );
        }
    }
}
