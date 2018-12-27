<?php

namespace EventEspresso\core\libraries\rest_api;

use EE_Error;
use EEM_Base;
use EEH_Inflector;
use EEM_CPT_Base;
use WP_REST_Request;

/**
 * Capabilities
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Capabilities
{

    /**
     * The current user can see at least SOME of these entities.
     *
     * @param EEM_Base $model
     * @param string   $model_context one of the return values from EEM_Base::valid_cap_contexts()
     * @return boolean
     */
    public static function currentUserHasPartialAccessTo($model, $model_context = EEM_Base::caps_read)
    {
        if (apply_filters(
            'FHEE__Capabilities__current_user_has_partial_access_to__override_begin',
            false,
            $model,
            $model
        )) {
            return true;
        }
        foreach ($model->caps_missing($model_context) as $capability_name => $restriction_obj) {
            if ($restriction_obj instanceof \EE_Return_None_Where_Conditions) {
                return false;
            }
        }
        if (apply_filters(
            'FHEE__Capabilities__current_user_has_partial_access_to__override_end',
            false,
            $model,
            $model
        )) {
            return false;
        }
        return true;
    }


    /**
     * Gets an array of all the capabilities the current user is missing that affected
     * the query
     *
     * @param EEM_Base $model
     * @param string   $request_type one of the constants on WP_JSON_Server
     * @return array
     */
    public static function getMissingPermissions($model, $request_type = EEM_Base::caps_read)
    {
        return $model->caps_missing($request_type);
    }


    /**
     * Gets a string of all the capabilities the current user is missing that affected
     * the query
     *
     * @param EEM_Base $model
     * @param string   $model_context one of the return values from EEM_Base::valid_cap_contexts()
     * @return string
     */
    public static function getMissingPermissionsString($model, $model_context = EEM_Base::caps_read)
    {
        return implode(',', array_keys(self::getMissingPermissions($model, $model_context)));
    }

    /**
     * "Removes" password-protected fields. Currently that means setting their values to their default.
     * @since 4.9.74.p
     * @param array $entity
     * @param EEM_Base $model
     * @param ModelVersionInfo $model_version_info
     * @return array
     * @throws EE_Error
     */
    public static function filterOutPasswordProtectedFields(
        $entity,
        EEM_Base $model,
        ModelVersionInfo $model_version_info
    ) {
        $has_password = $model->hasPassword();
        if ($has_password) {
            $entity[ $model->getPasswordField()->get_name() ] = ModelDataTranslator::prepareFieldValueForJson(
                $model->getPasswordField(),
                $model->getPasswordField()->get_default_value(),
                $model_version_info->requestedVersion()
            );
        }
        foreach ($model->field_settings() as $field_name => $field_obj) {
            if ($has_password
                && $model->getPasswordField()->fieldIsProtected($field_name)
                && $entity[ $field_name ]) {
                $replacement_value = ModelDataTranslator::prepareFieldValueForJson(
                    $field_obj,
                    $field_obj->get_default_value(),
                    $model_version_info->requestedVersion()
                );
                if ($model_version_info->fieldHasRenderedFormat($field_obj)) {
                    $entity[ $field_name ]['rendered'] = $replacement_value;
                } elseif ($model_version_info->fieldHasPrettyFormat($field_obj)) {
                    $entity[ $field_name ]['raw'] = $replacement_value;
                    $entity[ $field_name ]['pretty'] = ModelDataTranslator::prepareFieldValueForJson(
                        $field_obj,
                        $field_obj->prepare_for_pretty_echoing($field_obj->get_default_value()),
                        $model_version_info->requestedVersion()
                    );
                } else {
                    // this is most likely an excerpt field. (These should have also had "rendered" and "raw"
                    // versions, but we missed that, and can't change it without breaking backward compatibility)
                    // so just remove it (or rather, set its default)
                    // API clients will just need to look to fields with rendered formats to know if these have
                    // been redacted. Sorry.
                    $entity[ $field_name ] = $replacement_value;
                }
            }
        }
        return $entity;
    }


    /**
     * Takes a entity that's ready to be returned and removes fields which the user shouldn't be able to access.
     *
     * @param array $entity
     * @param EEM_Base $model
     * @param string $request_type one of the return values from EEM_Base::valid_cap_contexts()
     * @param ModelVersionInfo $model_version_info
     * @param string $primary_key_string result of EEM_Base::get_index_primary_key_string(), so that we can
     *                                               use this with models that have no primary key
     * @return array ready for converting into json
     */
    public static function filterOutInaccessibleEntityFields(
        $entity,
        $model,
        $request_type,
        $model_version_info,
        $primary_key_string = null
    ) {
        foreach ($model->field_settings() as $field_name => $field_obj) {
            if ($model_version_info->fieldHasRenderedFormat($field_obj)
                && isset($entity[ $field_name ])
                && is_array($entity[ $field_name ])
                && isset($entity[ $field_name ]['raw'])
            ) {
                unset($entity[ $field_name ]['raw']);
            }
        }
        // theoretically we may want to filter out specific fields for specific models
        return apply_filters(
            'FHEE__Capabilities__filter_out_inaccessible_entity_fields',
            $entity,
            $model,
            $request_type
        );
    }


    /**
     * Verifies the current user has at least partial access to do this action on this model.
     * If not, throws an exception (so we can define the code that sets up this error object
     * once)
     *
     * @param EEM_Base $model
     * @param string   $model_action_context
     * @param string   $action_name
     * @return void
     * @throws RestException
     */
    public static function verifyAtLeastPartialAccessTo($model, $model_action_context, $action_name = 'list')
    {
        if (! Capabilities::currentUserHasPartialAccessTo($model, $model_action_context)) {
            $model_name_plural = EEH_Inflector::pluralize_and_lower($model->get_this_model_name());
            throw new RestException(
                sprintf('rest_cannot_%s_%s', strtolower($action_name), $model_name_plural),
                sprintf(
                    __('Sorry, you are not allowed to %1$s %2$s. Missing permissions: %3$s', 'event_espresso'),
                    $action_name,
                    $model_name_plural,
                    Capabilities::getMissingPermissionsString($model, $model_action_context)
                ),
                array('status' => 403)
            );
        }
    }
}
