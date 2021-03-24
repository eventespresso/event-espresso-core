<?php

/**
 * EE_Restriction_Generator_Protected
 * Generates restrictions (EE_Default_Where_Conditions[]) relating to models
 * with "global"-scoped objects. This class is for when there are basic
 * capabilities relating to the model (eg "read_things"),
 *  "others" capabilities, and "global" capabilities; because some of the
 *  objects are considered "global". Basically you can only access others'
 *  global items if you have the global capability
 * (eg, if you only have "read_things", you can only read your own global and
 * non-global things). In order for this to work properly, you must specify the
 * name of a field (on this model or a related model) that is a boolean
 * indicating whether or not an object is "global".
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_Global extends EE_Restriction_Generator_Base
{

    /**
     * name of the model field that indicates whether or not a model object is
     * "global"
     *
     * @var string
     */
    protected $_global_field_name;


    /**
     * @param string $global_field_name name of the model field that indicates
     *                                  whether or not a model object is
     *                                  "global"
     */
    public function __construct(string $global_field_name)
    {
        $this->_global_field_name = $global_field_name;
    }


    /**
     * @return EE_Default_Where_Conditions[]|EE_Return_None_Where_Conditions[]
     * @throws EE_Error
     */
    protected function _generate_restrictions(): array
    {
        // if there are no standard caps for this model, then for now
        // all we know is if they need the default cap to access this
        if (! $this->model()->cap_slug()) {
            return [
                EE_Restriction_Generator_Base::get_default_restrictions_cap(
                ) => new EE_Return_None_Where_Conditions(),
            ];
        }
        return [
            EE_Restriction_Generator_Base::get_cap_name(
                $this->model(),
                $this->action()
            ) => new EE_Return_None_Where_Conditions(),
            EE_Restriction_Generator_Base::get_cap_name(
                $this->model(),
                $this->action() . '_others'
            ) => new EE_Default_Where_Conditions(
                [
                    // I need to be the owner, or it must be a global item
                    'OR*no_' .
                    EE_Restriction_Generator_Base::get_cap_name(
                        $this->model(),
                        $this->action() . '_others'
                    ) => [
                        EE_QUERY_PLACEHOLDER_USER_FIELD_NAME => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                        $this->_global_field_name            => true,
                    ],
                ]
            ),
            EE_Restriction_Generator_Base::get_cap_name(
                $this->model(),
                $this->action() . '_global'
            ) => new EE_Default_Where_Conditions(
                [
                    // it mustn't be global
                    $this->_global_field_name => false,
                ]
            ),
        ];
    }
}
