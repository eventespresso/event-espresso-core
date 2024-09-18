<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Event;
use EE_State;
use EE_Venue;
use EE_Ticket;
use EEM_State;
use EE_Attendee;
use EE_Datetime;
use EEM_Country;
use EE_Base_Class;
use GraphQL\Deferred;
use GraphQLRelay\Relay;
use WPGraphQL\AppContext;

trait StatelessResolver
{
    protected function resolveId(EE_Base_Class $source): string
    {
        if (method_exists($source, 'UUID') && is_callable([$source, 'UUID'])) {
            return $source->UUID();
        }

        return Relay::toGlobalId($source->get_model()->item_name(), $source->ID());
    }

    protected function resolveCacheId(EE_Base_Class $source): string
    {
        $item_name = $source->get_model()->item_name();
        $id = $source->ID();
        // Since cacheId does not need to be globally unique
        // $uniqid is sufficient, still adding the model name and ID
        // may be we need/use them in future.
        return uniqid("{$item_name}:{$id}:", true);
    }

    protected function resolveParent(EE_Base_Class $source): ?EE_Base_Class
    {
        return $source->get_model()->get_one_by_ID($source->parent());
    }

    protected function resolveEvent(EE_Base_Class $source, AppContext $context): ?Deferred
    {
        switch (true) {
            case $source instanceof EE_Datetime:
                $event = $source->event();
                break;
            case $source instanceof EE_Venue:
            case $source instanceof EE_Ticket:
                $event = $source->get_related_event();
                break;
            default:
                $event = null;
                break;
        }

        if (! ($event instanceof EE_Event)) {
return null;
        }

        return $context->get_loader('post')->load_deferred($event->ID());
    }

    protected function resolveWpUser(EE_Base_Class $source, AppContext $context): ?Deferred
    {
        $user_id = $source->wp_user();

        if (! $user_id) {
            return null;
        }

        return $context->get_loader('user')->load_deferred($user_id);
    }

    protected function resolveUserId($source): ?string
    {
        $user_id = $source->wp_user();

        if (! $user_id) {
            return null;
        }

        return Relay::toGlobalId('user', $user_id);
    }

    protected function resolveState($source): ?EE_Base_Class
    {
        $state_id = null;

        if ($source instanceof EE_Attendee || $source instanceof EE_Venue) {
            $state_id = $source->state_ID();
        }

        if (! $state_id) {
            return null;
        }

        return EEM_State::instance()->get_one_by_ID($state_id);
    }

    protected function resolveCountry(EE_Base_Class $source): ?EE_Base_Class
    {
        $country_iso = null;

        switch (true) {
            case $source instanceof EE_State:
                $country_iso = $source->country_iso();
                break;
            case $source instanceof EE_Attendee:
            case $source instanceof EE_Venue:
                $country_iso = $source->country_ID();
                break;
        }

        if (! $country_iso) {
            return null;
        }

        return EEM_Country::instance()->get_one_by_ID($country_iso);
    }
}
