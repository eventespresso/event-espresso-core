<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\database\WordPressOption;
use Throwable;
use WPGraphQL;
use WPGraphQL\Data\Config;
use WPGraphQL\Router;

/**
 * Class GraphQLEndpoint
 * A class for saving and obtaining our own little copy of the GQL request endpoint
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\graphql
 * @since   $VID:$
 */
class GraphQLEndpoint extends WordPressOption
{
    const DEFAULT_ENDPOINT = 'graphql';

    const OPTION_NAME      = 'ee-graphql-endpoint';

    /**
     * @var boolean
     */
    private $is_gql_request;


    /**
     * GraphQLEndpoint constructor.
     */
    public function __construct()
    {
        parent::__construct(GraphQLEndpoint::OPTION_NAME, GraphQLEndpoint::DEFAULT_ENDPOINT, true);
        add_action('after_setup_theme', [$this, 'verifyAndSetEndpoint'], 20);
    }


    public function getEndpoint()
    {
        return $this->loadOption();
    }


    /**
     * @return mixed|void|bool
     * @since   $VID:$
     */
    public function isGraphqlRequest()
    {
        if (! isset($this->is_gql_request)) {
            // grab the GQL endpoint that we saved in the future... wait... wut?
            $endpoint = $this->getEndpoint();
            if (! class_exists('WPGraphQL')) {
                require_once EE_THIRD_PARTY . 'wp-graphql/src/Router.php';
            }
            // set our saved endpoint on the WP GQL Pouter class
            // don't worry, they overwrite this value when they initialize things
            Router::$route = $endpoint;
            // now call their function for checking if this is a GQL request
            // because they use a bunch of filters and stuff we don't want to duplicate here
            $this->is_gql_request = Router::is_graphql_http_request();
        }
        return $this->is_gql_request;
    }


    public function verifyAndSetEndpoint()
    {
        try {
            if (! class_exists('WPGraphQL')) {
                require_once EE_THIRD_PARTY . 'wp-graphql/wp-graphql.php';
                // Normally the following is handled within WPGraphQL::actions() by an anonymous function
                // that is hooked into 'after_setup_theme' at priority 10.
                // Since THIS method is also hooked into 'after_setup_theme', but at priority 20,
                // we've obviously already missed the boat,
                // and since we also know that WPGraphQL doesn't exist atm, the following logic must not have run.
                new Config();
                new Router();
                do_action('graphql_init', WPGraphQL::instance());
            }
            // i know, i know, i know...
            // WHY are we saving the graphql_endpoint to a WP option if WP GraphQL is already doing the same ?!?!
            // Because we perform our request type detection during `plugins_loaded`,
            // but they don't settle on their endpoint until `after_setup_theme` has run,
            // which is too late for us, so we are just going to save this separately so that we have it.
            // Oh, and this will essentially recheck this value on EVERY request
            // but will only update our saved value if it has actually changed
            $this->updateOption(
                get_graphql_setting(
                    'graphql_endpoint',
                    apply_filters('graphql_endpoint', GraphQLEndpoint::DEFAULT_ENDPOINT)
                )
            );
        } catch (Throwable $t) {
            // eat it
        }
    }
}
