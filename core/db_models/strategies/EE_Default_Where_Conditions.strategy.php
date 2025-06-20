<?php

const EE_QUERY_PLACEHOLDER_CURRENT_USER    = EE_Default_Where_Conditions::current_user_placeholder;
const EE_QUERY_PLACEHOLDER_USER_FIELD_NAME = EE_Default_Where_Conditions::user_field_name_placeholder;

/**
 * Class EE_Default_Where_Conditions
 * Strategy to be used for getting default where conditions for EEM_Base
 * children. Should be initialized and set on model construction
 *
 * @package     Event Espresso
 * @subpackage  core/db_models
 * @author      Mike Nelson
 * @since       4.6.0
 */
class EE_Default_Where_Conditions
{

    /**
     * Constant for 'default_where_conditions' to apply default where conditions to ALL queried models
     * ex: if retrieving registrations ordered by their datetimes,
     * this will only return non-trashed registrations for non-trashed tickets for non-trashed datetimes
     */
    public const ALL = 'all';

    /**
     * Constant for 'default_where_conditions' to apply default where conditions to THIS model only,
     * but no other models which are joined to (ex: if retrieving registrations ordered by their datetimes,
     * this will return non-trashed registrations, regardless of the related datetimes and tickets' statuses).
     * It is preferred to use EE_Default_Where_Conditions::MINIMUM_OTHERS because, when joining to
     * models which share tables with other models, this can return data for the wrong model.
     */
    public const THIS_MODEL_ONLY = 'this_model_only';

    /**
     * Constant for 'default_where_conditions' to apply default where conditions to other models queried,
     * but not the current model (ex: if retrieving registrations ordered by their datetimes,
     * this will return all registrations related to non-trashed tickets and non-trashed datetimes)
     */
    public const OTHER_MODELS_ONLY = 'other_models_only';

    /**
     * Constant for 'default_where_conditions' to apply minimum where conditions to all models queried.
     * For most models this is the same as EE_Default_Where_Conditions::NONE,
     * except for models which share their table with other models, like the Event and Venue models.
     * For example, when querying for events ordered by their venues' name,
     * this will be sure to only return real events with associated real venues
     * (regardless of whether those events and venues are trashed).
     * In contrast, using EE_Default_Where_Conditions::NONE could return WP posts other than EE events.
     */
    public const MINIMUM_ALL = 'minimum';

    /**
     * Constant for 'default_where_conditions' to apply where conditions to other models,
     * and full default where conditions for the queried model
     * (ex: when querying events ordered by venues' names,
     * this will return non-trashed events for any venues,
     * regardless of whether those associated venues are trashed or not)
     */
    public const MINIMUM_OTHERS = 'full_this_minimum_others';

    /**
     * Constant for 'default_where_conditions' to NOT apply any where conditions at all.
     * This should very rarely be used, because when querying from a model which shares its table with another model
     * (ex: Events and Venues) it's possible it will return table entries for other models.
     * You should use EE_Default_Where_Conditions::MINIMUM_ALL instead.
     */
    public const NONE = 'none';

    /**
     * This const can be used in EE_Default_Where_Conditions values.
     * At the time of querying it will be replaced with the current user's ID
     * (because we don't want to use the current user's ID at time of initializing the
     * models because it's too early).
     */
    public const current_user_placeholder = '%$current_user_placeholder_should_be_replaced_automatically$%';

    /**
     * This const can be used in EE_Default_Where_Conditions where parameters
     * as the name of the user field. When we are actually generating the where
     * conditions, it will be replaced with the model's wp user field name
     */
    public const user_field_name_placeholder = '%$user_field_name_placeholder$%';

    /**
     * Model for which this strategy find default where conditions
     *
     * @var EEM_Base
     */
    protected EEM_Base $_model;

    /**
     * Where conditions specified on construction
     *
     * @var array
     */
    protected array $_where_conditions_provided = [];


    /**
     * Custom where conditions. Model relation chains will be automatically
     * added onto any field names
     *
     * @param array $custom_where_conditions
     */
    public function __construct(array $custom_where_conditions = [])
    {
        $this->_where_conditions_provided = $custom_where_conditions;
    }


    /**
     * finalizes construction of the strategy for use in getting default where
     * conditions for querying of the model.
     *
     * @param EEM_Base $model
     */
    public function _finalize_construct(EEM_Base $model)
    {
        $this->_model = $model;
    }


    /**
     * Returns the where conditions explicitly passed in the constructor
     *
     * @return array
     */
    public function get_where_conditions_provided(): array
    {
        return $this->_where_conditions_provided;
    }


    /**
     * Gets the where conditions to be added onto the query
     *
     * @param string $model_relation_chain
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions
     */
    public function get_default_where_conditions(
        string $model_relation_chain = ''
    ): array {
        return $this->prepare_where_conditions_for_querying(
            array_merge(
                $this->_get_default_where_conditions(),
                $this->get_where_conditions_provided()
            ),
            $model_relation_chain
        );
    }


    /**
     * Gets the default where conditions that are specific to this child of
     * EE_Default_Where_Conditions. Adding model relation chains is handled by
     * the public method get_default_where_conditions
     *
     * @return array
     */
    protected function _get_default_where_conditions(): array
    {
        return [];
    }


    /**
     * Takes the default query parameters, and traverses them, adding the model
     * relation chain onto them (intelligently doesn't do that to logic query
     * params like 'NOT', 'OR', and 'AND')
     *
     * @param array  $where_conditions
     * @param string $model_relation_chain
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function prepare_where_conditions_for_querying(
        array $where_conditions = [],
        string $model_relation_chain = ''
    ): array {
        $qualified_where_conditions = [];
        foreach ($where_conditions as $key => $value) {
            if ($this->isOrHasQueryOperator($key)) {
                $qualified_where_conditions[ $key ] =
                    $this->prepare_where_conditions_for_querying(
                        $value,
                        $model_relation_chain
                    );
            } else {
                $qualified_where_conditions =
                    $this->prepare_where_condition(
                        $qualified_where_conditions,
                        $model_relation_chain,
                        $key,
                        $value
                    );
            }
        }
        return $qualified_where_conditions;
    }


    /**
     * @param string $query_string
     * @return bool
     */
    private function isOrHasQueryOperator(string $query_string): bool
    {
        return in_array($query_string, ['OR', 'AND', 'NOT'])
            || strpos($query_string, 'OR*') !== false
            || strpos($query_string, 'AND*') !== false
            || strpos($query_string, 'NOT*') !== false;
    }


    /**
     * ensures relation name is fully qualified
     * and swaps placeholders for expected values
     *
     * @param array  $qualified_where_conditions
     * @param string $model_relation_chain
     * @param string $key
     * @param mixed  $value
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function prepare_where_condition(
        array $qualified_where_conditions,
        string $model_relation_chain,
        string $key,
        $value
    ): array {
        $model_relation_chain = $model_relation_chain !== ''
            ? rtrim($model_relation_chain, '.') . '.'
            : $model_relation_chain;
        // check for the current user id placeholder, and if present, change it
        if ($value === self::current_user_placeholder) {
            $value = get_current_user_id();
        }
        // check for user field placeholder
        if ($key === self::user_field_name_placeholder) {
            if (! $this->_model->wp_user_field_name()) {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'There is no foreign key to the WP_User model on model %s. Please either modify your default where conditions, add a _model_chain_to_wp_user onto the model, or a proper EE_WP_User_Field onto the model',
                            'event_espresso'
                        ),
                        $this->_model->get_this_model_name()
                    )
                );
            }
            $key = $this->_model->wp_user_field_name();
        }
        $qualified_where_conditions[ $model_relation_chain . $key ] = $value;
        return $qualified_where_conditions;
    }
}
