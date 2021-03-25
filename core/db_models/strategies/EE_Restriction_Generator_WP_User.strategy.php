<?php

/**
 * EE_Restriction_Generator_Protected
 * Special restrictions for WP Users. Basically users can always access
 * themselves, but their access to other users is controlled by conditions
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_WP_User extends EE_Restriction_Generator_Base
{

    /**
     * @return EE_Default_Where_Conditions[]
     * @throws EE_Error
     */
    protected function _generate_restrictions(): array
    {
        return [
            // if they can't access users, they can still access themselves
            EE_Restriction_Generator_Base::get_cap_name(
                $this->model(),
                $this->action()
            ) => new EE_Default_Where_Conditions(
                [
                    EE_QUERY_PLACEHOLDER_USER_FIELD_NAME => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                ]
            ),

        ];
    }
}
