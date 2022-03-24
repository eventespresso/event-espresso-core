<?php

/**
 * EE_Restriction_Generator_Public
 * Generates cap restrictions array that essentially makes this model public
 * (however, if there's a status it IS still dependent on that),
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_Public extends EE_Restriction_Generator_Base
{
    /**
     * @return EE_Default_Where_Conditions[]|EE_Return_None_Where_Conditions[]
     * @throws EE_Error
     */
    protected function _generate_restrictions(): array
    {
        // if there are no standard caps for this model, then for allow full access
        if (! $this->model()->cap_slug()) {
            return [];
        }

        $restrictions = [];
        // does the basic cap exist? (eg 'ee_read_registrations')
        if (
            EE_Restriction_Generator_Base::is_cap(
                $this->model(),
                $this->action()
            )
        ) {
            if ($this->model() instanceof EEM_CPT_Base) {
                $restrictions[ EE_Restriction_Generator_Base::get_cap_name(
                    $this->model(),
                    $this->action()
                ) ] = new EE_Default_Where_Conditions(
                    $this->addPublishedPostConditions()
                );
            } elseif ($this->model() instanceof EEM_Soft_Delete_Base) {
                $restrictions[ EE_Restriction_Generator_Base::get_cap_name(
                    $this->model(),
                    $this->action()
                ) ] = new EE_Default_Where_Conditions(
                    [$this->model()->deleted_field_name() => false]
                );
            }
            // don't impose any restrictions if they don't have the basic reading cap

            // does the others cap exist? (eg 'ee_read_others_registrations')
            if (
                EE_Restriction_Generator_Base::is_cap(
                    $this->model(),
                    $this->action() . '_others'
                )
            ) {// both caps exist
                if ($this->model() instanceof EEM_CPT_Base) {
                    // then if they don't have the others cap,
                    // AT MOST show them their own and other published ones
                    $restrictions[ EE_Restriction_Generator_Base::get_cap_name(
                        $this->model(),
                        $this->action() . '_others'
                    ) ] = new EE_Default_Where_Conditions(
                        [
                            'OR*' .
                            EE_Restriction_Generator_Base::get_cap_name(
                                $this->model(),
                                $this->action() . '_others'
                            ) => $this->addPublishedPostConditions(
                                [
                                    EE_QUERY_PLACEHOLDER_USER_FIELD_NAME => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                                ]
                            ),
                        ]
                    );
                } elseif ($this->model() instanceof EEM_Soft_Delete_Base) {
                    // then if they don't have the other cap,
                    // AT MOST show them their own or non deleted ones
                    $restrictions[ EE_Restriction_Generator_Base::get_cap_name(
                        $this->model(),
                        $this->action() . '_others'
                    ) ] = new EE_Default_Where_Conditions(
                        [
                            'OR*' .
                            EE_Restriction_Generator_Base::get_cap_name(
                                $this->model(),
                                $this->action() . '_others'
                            ) => [
                                EE_QUERY_PLACEHOLDER_USER_FIELD_NAME => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                                $this->model()->deleted_field_name(
                                )                                    => false,
                            ],
                        ]
                    );
                }
                // again, if they don't have the others cap,
                // continue showing all because there are no inherently hidden ones

                // does the private cap exist (eg 'ee_read_others_private_events')
                if (
                    EE_Restriction_Generator_Base::is_cap(
                        $this->model(),
                        $this->action() . '_private'
                    ) && $this->model() instanceof EEM_CPT_Base
                ) {
                    // if they have basic and others, but not private,
                    // restrict them to see theirs and others' that aren't private
                    $restrictions[ EE_Restriction_Generator_Base::get_cap_name(
                        $this->model(),
                        $this->action() . '_private'
                    ) ] = new EE_Default_Where_Conditions(
                        [
                            'OR*' .
                            EE_Restriction_Generator_Base::get_cap_name(
                                $this->model(),
                                $this->action() . '_private'
                            ) => $this->addPublishedPostConditions(
                                [
                                    EE_QUERY_PLACEHOLDER_USER_FIELD_NAME => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                                ],
                                false
                            ),
                        ]
                    );
                }
            }
        } else {
            // there is no basic cap. So allow full access
            $restrictions = [];
        }
        return $restrictions;
    }
}
