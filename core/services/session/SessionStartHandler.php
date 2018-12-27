<?php

namespace EventEspresso\core\services\session;

use EE_Error;
use EEH_URL;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class SessionStartHandler
 * Handles a fatal error that can occur while starting the session because of an invalid session handler.
 * This fatal error happens regularly on Pantheon's servers,
 * see https://github.com/eventespresso/event-espresso-core/issues/494.
 * This function keeps track of whether we know the custom session handler works or not.
 * If it does, uses the session normally.
 * If we don't know if the custom session save handler works, sets an option before starting the session,
 * and removes it afterwards.
 * This way, if there is a fatal error starting the session, we'll know during the next request,
 * and avoid calling the session. Instead, we'll give a helpful error message and suggest how to fix the problem.
 * Lastly, we need to allow the admin to indicate when they've fixed the problem, so we can try using EE's session
 * again. For that, we give them a link with "ee_retry_session" in it. When they visit a page with that querystring
 * variable, we set ourselves up to retry using the session on the next request, and do a redirect.
 *
 * @package EventEspresso\core\services\session
 * @author  Mike Nelson
 * @since   4.9.68.p
 */
class SessionStartHandler
{
    const OPTION_NAME_SESSION_SAVE_HANDLER_STATUS = 'ee_session_save_handler_status';
    const REQUEST_PARAM_RETRY_SESSION = 'ee_retry_session';
    const SESSION_SAVE_HANDLER_STATUS_FAILED = 'session_save_handler_failed';
    const SESSION_SAVE_HANDLER_STATUS_SUCCESS = 'session_save_handler_success';
    const SESSION_SAVE_HANDLER_STATUS_UNKNOWN = 'session_save_handler_untested';

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * StartSession constructor.
     *
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }

    /**
     * Check if a custom session save handler is in play
     * and attempt to start the PHP session
     *
     * @since 4.9.68.p
     */
    public function startSession()
    {
        // check that session has started
        if (session_id() === '') {
            // starts a new session if one doesn't already exist, or re-initiates an existing one
            if ($this->hasKnownCustomSessionSaveHandler()) {
                $this->checkCustomSessionSaveHandler();
            } else {
                session_start();
            }
        }
    }

    /**
     * Returns `true` if the 'session.save_handler' ini setting matches a known custom handler
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function hasKnownCustomSessionSaveHandler()
    {
        return in_array(
            ini_get('session.save_handler'),
            array(
                'user',
            ),
            true
        );
    }

    /**
     * Attempt to start the PHP session when a custom Session Save Handler is known to be set.
     *
     * @since 4.9.68.p
     */
    private function checkCustomSessionSaveHandler()
    {
        // If we've already successfully tested the session save handler
        // on a previous request then just start the session
        if ($this->sessionSaveHandlerIsValid()) {
            session_start();
            return;
        }
        // If not, then attempt to deal with any errors,
        // otherwise, try to hobble along without the session
        if (! $this->handleSessionSaveHandlerErrors()) {
            return;
        }
        // there is no record of a fatal error while trying to start the session
        // so let's see if there's a custom session save handler. Proceed with caution
        $this->initializeSessionSaveHandlerStatus();
        // hold your breath, the custom session save handler might cause a fatal here...
        session_start();
        // phew! we made it! the custom session handler is a-ok
        $this->setSessionSaveHandlerStatusToValid();
    }


    /**
     * retrieves the value for the 'ee_session_save_handler_status' WP option.
     * default value = 'session_save_handler_untested'
     *
     * @since 4.9.68.p
     * @return string
     */
    private function getSessionSaveHandlerStatus()
    {
        return get_option(
            SessionStartHandler::OPTION_NAME_SESSION_SAVE_HANDLER_STATUS,
            SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_UNKNOWN
        );
    }

    /**
     * Sets the 'ee_session_save_handler_status' WP option value to 'session_save_handler_failed'
     * which can then be upgraded is everything works correctly
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function initializeSessionSaveHandlerStatus()
    {
        return update_option(
            SessionStartHandler::OPTION_NAME_SESSION_SAVE_HANDLER_STATUS,
            SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_FAILED
        );
    }

    /**
     * Sets the 'ee_session_save_handler_status' WP option value to 'session_save_handler_success'
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function setSessionSaveHandlerStatusToValid()
    {
        return update_option(
            SessionStartHandler::OPTION_NAME_SESSION_SAVE_HANDLER_STATUS,
            SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_SUCCESS
        );
    }

    /**
     * Sets the 'ee_session_save_handler_status' WP option value to 'session_save_handler_untested'
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function resetSessionSaveHandlerStatus()
    {
        return update_option(
            SessionStartHandler::OPTION_NAME_SESSION_SAVE_HANDLER_STATUS,
            SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_UNKNOWN
        );
    }

    /**
     * Returns `true` if the 'ee_session_save_handler_status' WP option value
     * is equal to 'session_save_handler_success'
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function sessionSaveHandlerIsValid()
    {
        return $this->getSessionSaveHandlerStatus() === SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_SUCCESS;
    }

    /**
     * Returns `true` if the 'ee_session_save_handler_status' WP option value
     * is equal to 'session_save_handler_failed'
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function sessionSaveHandlerFailed()
    {
        return $this->getSessionSaveHandlerStatus() === SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_FAILED;
    }

    /**
     * Returns `true` if no errors were detected with the session save handler,
     * otherwise attempts to work notify the appropriate authorities
     * with a suggestion for how to fix the issue, and returns `false`.
     *
     *
     * @since 4.9.68.p
     * @return bool
     */
    private function handleSessionSaveHandlerErrors()
    {
        // Check if we had a fatal error last time while trying to start the session
        if ($this->sessionSaveHandlerFailed()) {
            // apparently, last time we tried using the custom session save handler there was a fatal
            if ($this->request->requestParamIsSet(SessionStartHandler::REQUEST_PARAM_RETRY_SESSION)) {
                $this->resetSessionSaveHandlerStatus();
                // remove "ee_retry_session", otherwise if the problem still isn't fixed,
                // we'll just keep getting the fatal error over and over.
                // Better to remove it and redirect, and try on the next request
                EEH_URL::safeRedirectAndExit(
                    remove_query_arg(
                        array(SessionStartHandler::REQUEST_PARAM_RETRY_SESSION),
                        EEH_URL::current_url()
                    )
                );
            }
            // so the session is broken, don't try it again,
            // just show a message to users that can fix it
            $this->displaySessionSaveHandlerErrorNotice();
            return false;
        }
        return true;
    }

    /**
     * Generates an EE_Error notice regarding the current session woes
     * but only if the current user is an admin with permission to 'install_plugins'.
     *
     * @since 4.9.68.p
     */
    private function displaySessionSaveHandlerErrorNotice()
    {
        if (current_user_can('install_plugins')) {
            $retry_session_url = add_query_arg(
                array(SessionStartHandler::REQUEST_PARAM_RETRY_SESSION => true),
                EEH_URL::current_url()
            );
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'It appears there was a fatal error while starting the session, so Event Espresso is not able to process registrations normally. Some hosting companies, like Pantheon, require an extra plugin for Event Espresso to work. Please install the %1$sWordPress Native PHP Sessions plugin%2$s, then %3$sclick here to check if the problem is resolved.%2$s',
                        'event_espresso'
                    ),
                    '<a href="https://wordpress.org/plugins/wp-native-php-sessions/">',
                    '</a>',
                    '<a href="' . $retry_session_url . '">'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }
}
