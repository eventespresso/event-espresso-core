<?php

add_filter(
    'FHEE__EventEspresso_core_domain_values_session_SessionLifespan__setLifespan___lifespan',
    function ($lifespan) {
        if (! has_filter('FHEE__EE_Session__construct___lifespan')) {
            return $lifespan;
        }
        deprecated_espresso_action_or_filter_doing_it_wrong(
            'FHEE__EE_Session__construct___lifespan',
            'FHEE__EventEspresso_core_domain_values_session_SessionLifespan__setLifespan___lifespan',
            '\EventEspresso\core\domain\values\session\SessionLifespan::setLifespan()',
            '5.0.0',
            '5.1.0',
            'filter'
        );
        return apply_filters(
            'FHEE__EE_Session__construct___lifespan',
            $lifespan
        );
    }
);
