<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;
use WP_User;
use GraphQLRelay\Relay;

/**
 * Class CurrentUser
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CurrentUser extends JsonDataNode
{
    const NODE_NAME = 'currentUser';

    /**
     * @var Capabilities $capabilities
     */
    private $capabilities;

    /**
     * @param Capabilities $capabilities
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(Capabilities $capabilities, JsonDataNodeValidator $validator)
    {
        if (! class_exists('WPGraphQL')) {
            require_once EE_THIRD_PARTY . 'wp-graphql/wp-graphql.php';
        }
        parent::__construct($validator);
        $this->capabilities = $capabilities;
        $this->setNodeName(CurrentUser::NODE_NAME);
    }

    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $current_user = wp_get_current_user();
        if (! $current_user instanceof WP_User) {
            $current_user = new WP_User();
        }

        if (class_exists(Relay::class)) {
            $this->addData('id', Relay::toGlobalId('user', $current_user->ID));
        }
        $this->addData('databaseId', $current_user->ID);
        $this->addData('description', $current_user->description);
        $this->addData('email', $current_user->user_email);
        $this->addData('firstName', $current_user->first_name);
        $this->addData('isa', is_super_admin($current_user->ID));
        $this->addData('lastName', $current_user->last_name);
        $this->addData('locale', get_user_locale($current_user->ID));
        $this->addData('name', $current_user->display_name);
        $this->addData('nicename', $current_user->user_nicename);
        $this->addData('nickname', $current_user->nickname);
        $this->addData('username', $current_user->user_login);
        $this->addData('roles', $current_user->roles);
        $this->addData('__typename', 'User');
        $this->addDataNode($this->capabilities);
        $this->setInitialized(true);
    }
}
