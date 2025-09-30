<?php

namespace EventEspresso\core\services\session;

use EE_Error;
use EEH_URL;
use ErrorException;
use EventEspresso\core\services\request\RequestInterface;
use Throwable;

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

    const REQUEST_PARAM_RETRY_SESSION             = 'ee_retry_session';

    const SESSION_SAVE_HANDLER_STATUS_FAILED      = 'session_save_handler_failed';

    const SESSION_SAVE_HANDLER_STATUS_SUCCESS     = 'session_save_handler_success';

    const SESSION_SAVE_HANDLER_STATUS_UNKNOWN     = 'session_save_handler_untested';


    protected RequestInterface $request;

    /**
     * @var string
     * @since 5.0.47
     */
    private string $open_basedir = '';

    /**
     * @var string
     * @since 5.0.47
     */
    private string $save_handler = '';

    /**
     * @var string
     * @since 5.0.47
     */
    private string $save_path = '';


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
    public function startSession(): int
    {
        // check that session has started
        if (session_id() === '') {
            // clear any previous error
            error_clear_last();

            // convert warnings to ErrorException so we can catch them
            $previous_handler = set_error_handler([$this, 'customErrorHandler'], E_WARNING);

            try {
                $this->initializeSessionVars();
                // starts a new session if one doesn't already exist, or re-initiates an existing one
                if ($this->hasCustomSessionSaveHandler()) {
                    $this->checkCustomSessionSaveHandler();
                } else {
                    $this->verifySessionSavePath();
                    $this->sessionStart();
                }
            } catch (Throwable $error) {
                error_log(
                    sprintf(
                        '[SessionStartHandler] session_start() warning: %s in %s:%s',
                        $error->getMessage(),
                        $error->getFile(),
                        $error->getLine()
                    )
                );
                $this->displaySessionErrorNotice(
                    $error->getMessage(),
                    $error->getFile(),
                    __FUNCTION__,
                    $error->getLine()
                );
            } finally {
                $this->restorePreviousErrorHandler($previous_handler);
            }
        }
        return session_status();
    }


    /**
     * @return void
     * @since 5.0.47
     */
    private function initializeSessionVars(): void
    {
        $this->open_basedir = ini_get('open_basedir') ?: '';
        $this->save_handler = strtolower((string) ini_get('session.save_handler'));
        $this->save_path    = session_save_path() ?: '';
    }


    /**
     * @return void
     * @throws Throwable
     * @since 5.0.46
     */
    private function sessionStart(): void
    {
        session_start();
        session_write_close();
    }


    /**
     * @return void
     * @throws ErrorException
     * @since 5.0.46
     */
    private function verifySessionSavePath(): void
    {
        if (WP_DEBUG) {
            error_log(
                sprintf(
                    "[SessionStartHandler] diagnostic: save_handler=%s save_path=%s open_basedir=%s",
                    $this->save_handler,
                    $this->save_path,
                    $this->open_basedir ?: '(none)'
                )
            );
        }
        // Only validate session save path as a filesystem directory when PHP is
        // configured to use the 'files' session save handler. Other handlers
        // (memcache, memcached, redis, user, etc.) use different transport
        // formats (hosts, sockets, URIs) and are not filesystem directories.
        if ($this->save_handler !== 'files') {
            // assume the configured handler knows how to interpret the save path
            // (e.g. "unix:///run/memcached/memcached.sock", "127.0.0.1:11211", etc.)
            return;
        }
        $this->save_path = $this->normalizeSessionSavePath($this->save_path);
        // Use @-suppressed checks to avoid PHP warnings while validating.
        if (! @is_dir($this->save_path) || ! @is_writable($this->save_path)) {
            throw new ErrorException(
                sprintf(
                    esc_html__('Invalid or missing session save path: %s', 'event_espresso'),
                    $this->save_path
                ),
                0,
                E_WARNING,
                __FILE__,
                __LINE__
            );
        }
    }


    /**
     * @param string $session_save_path
     * @return string
     * @throws ErrorException
     * @since 5.0.47
     */
    private function normalizeSessionSavePath(string $session_save_path): string
    {
        // Normalize "N;/path" style values
        if (strpos($session_save_path, ';') !== false) {
            $parts             = explode(';', $session_save_path);
            $session_save_path = end($parts);
        }
        $session_save_path = trim((string) $session_save_path);
        if ($session_save_path === '') {
            // fall back to a sane temp dir if PHP reports no explicit session_save_path
            $session_save_path = sys_get_temp_dir();
        }
        // normalize trailing separators
        $session_save_path = rtrim($session_save_path, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
        // For 'files' handler we expect a writable filesystem directory.
        // However, calling realpath() or is_dir() on paths outside of PHP's
        // configured open_basedir can trigger warnings.
        // Handle that case explicitly by checking open_basedir first
        // and avoiding functions that would emit warnings.
        if ($this->open_basedir !== '') {
            $session_save_path = $this->checkPathsOutsideBaseDir($session_save_path);
        } else {
            // No open_basedir restriction; realpath() is safe to use and gives
            // us a canonical path for the directory checks.
            $session_save_path = @realpath($session_save_path) ?: $session_save_path;
        }
        return $session_save_path;
    }


    /**
     * @param string $session_save_path
     * @return string
     * @throws ErrorException
     * @since 5.0.47
     */
    private function checkPathsOutsideBaseDir(string $session_save_path): string
    {
        // open_basedir is set; check whether the configured session path
        // appears to be within one of the allowed paths.
        $allowed_paths = array_filter(array_map('trim', explode(PATH_SEPARATOR, $this->open_basedir)));
        $allowed       = false;
        foreach ($allowed_paths as $allowed_path) {
            if ($allowed_path === '') {
                continue;
            }
            // normalize trailing separators for comparison
            $allowed_path_norm = rtrim($allowed_path, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
            // compare start of paths for a match
            if (strncmp($session_save_path, $allowed_path_norm, strlen($allowed_path_norm)) === 0) {
                $allowed = true;
                break;
            }
        }
        if ($allowed) {
            return $session_save_path;
        }
        error_log(
            sprintf(
                "[SessionStartHandler] session_save_path outside open_basedir: save_path=%s open_basedir=%s",
                $session_save_path,
                $this->open_basedir
            )
        );
        throw new ErrorException(
            sprintf(
                esc_html__(
                    'Session save path "%s" is outside PHP open_basedir allowed paths: %s. Ask your server admin to move session.save_path inside open_basedir or update open_basedir',
                    'event_espresso'
                ),
                $session_save_path,
                $this->open_basedir
            ),
            0,
            E_WARNING,
            __FILE__,
            __LINE__
        );
    }


    /**
     * Returns `true` if the 'session.save_handler' ini setting matches a known custom handler
     *
     * @return bool
     * @since 4.9.68.p
     */
    private function hasCustomSessionSaveHandler(): bool
    {
        return $this->save_handler === 'user';
    }


    /**
     * Attempt to start the PHP session when a custom Session Save Handler is known to be set.
     *
     * @throws ErrorException
     * @throws Throwable
     * @since 4.9.68.p
     */
    private function checkCustomSessionSaveHandler(): void
    {
        // If we've already successfully tested the session save handler
        // on a previous request then just start the session
        if ($this->sessionSaveHandlerIsValid()) {
            $this->sessionStart();
            return;
        }
        // If not, then attempt to deal with any errors,
        // otherwise, try to hobble along without the session
        if (! $this->handleSessionSaveHandlerErrors()) {
            return;
        }
        // there is no record of a fatal error while trying to start the session
        // so let's see if there's a custom session save handler. Proceed with caution
        if ($this->initializeSessionSaveHandlerStatus() === false) {
            throw new ErrorException(
                esc_html__('Failed to initialize session save handler status', 'event_espresso'),
                0,
                E_WARNING,
                __FILE__,
                __LINE__
            );
        }
        // hold your breath, the custom session save handler might cause a fatal here...
        $this->sessionStart();
        // phew! we made it! the custom session handler is a-ok
        if ($this->setSessionSaveHandlerStatusToValid() === false) {
            throw new ErrorException(
                esc_html__('Failed to set session save handler status to valid', 'event_espresso'),
                0,
                E_WARNING,
                __FILE__,
                __LINE__
            );
        }
    }


    /**
     * retrieves the value for the 'ee_session_save_handler_status' WP option.
     * default value = 'session_save_handler_untested'
     *
     * @return string
     * @since 4.9.68.p
     */
    private function getSessionSaveHandlerStatus(): string
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
     * @return bool
     * @since 4.9.68.p
     */
    private function initializeSessionSaveHandlerStatus(): bool
    {
        return update_option(
            SessionStartHandler::OPTION_NAME_SESSION_SAVE_HANDLER_STATUS,
            SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_FAILED
        );
    }


    /**
     * Sets the 'ee_session_save_handler_status' WP option value to 'session_save_handler_success'
     *
     * @return bool
     * @since 4.9.68.p
     */
    private function setSessionSaveHandlerStatusToValid(): bool
    {
        return update_option(
            SessionStartHandler::OPTION_NAME_SESSION_SAVE_HANDLER_STATUS,
            SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_SUCCESS
        );
    }


    /**
     * Sets the 'ee_session_save_handler_status' WP option value to 'session_save_handler_untested'
     *
     * @return bool
     * @since 4.9.68.p
     */
    private function resetSessionSaveHandlerStatus(): bool
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
     * @return bool
     * @since 4.9.68.p
     */
    private function sessionSaveHandlerIsValid(): bool
    {
        return $this->getSessionSaveHandlerStatus() === SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_SUCCESS;
    }


    /**
     * Returns `true` if the 'ee_session_save_handler_status' WP option value
     * is equal to 'session_save_handler_failed'
     *
     * @return bool
     * @since 4.9.68.p
     */
    private function sessionSaveHandlerFailed(): bool
    {
        return $this->getSessionSaveHandlerStatus() === SessionStartHandler::SESSION_SAVE_HANDLER_STATUS_FAILED;
    }


    /**
     * @param int    $severity
     * @param string $message
     * @param string $file
     * @param int    $line
     * @return bool
     * @throws ErrorException
     * @since 5.0.46
     */
    public function customErrorHandler(int $severity, string $message, string $file, int $line): bool
    {
        // Only convert warnings we care about
        if (($severity & E_WARNING) === E_WARNING) {
            throw new ErrorException($message, 0, $severity, $file, $line);
        }
        // fallback to PHP's normal handler for other severities
        return false;
    }


    /**
     * @param callable|null $previous_handler
     * @return void
     * @since 5.0.46
     */
    private function restorePreviousErrorHandler(?callable $previous_handler): void
    {
        if ($previous_handler !== null) {
            set_error_handler($previous_handler);
        } else {
            restore_error_handler();
        }
    }


    /**
     * Returns `true` if no errors were detected with the session save handler,
     * otherwise attempts to work notify the appropriate authorities
     * with a suggestion for how to fix the issue, and returns `false`.
     *
     * @return bool
     * @throws ErrorException
     * @throws Throwable
     * @since 4.9.68.p
     */
    private function handleSessionSaveHandlerErrors(): bool
    {
        // Check if we had a fatal error last time while trying to start the session
        if ($this->sessionSaveHandlerFailed()) {
            // apparently, last time we tried using the custom session save handler there was a fatal
            if ($this->request->requestParamIsSet(SessionStartHandler::REQUEST_PARAM_RETRY_SESSION)) {
                if ($this->resetSessionSaveHandlerStatus() === false) {
                    throw new ErrorException(
                        esc_html__('Failed to reset session save handler status', 'event_espresso'),
                        0,
                        E_WARNING,
                        __FILE__,
                        __LINE__
                    );
                }
                // remove "ee_retry_session", otherwise if the problem still isn't fixed,
                // we'll just keep getting the fatal error over and over.
                // Better to remove it and redirect, and try on the next request
                EEH_URL::safeRedirectAndExit(
                    remove_query_arg(
                        [SessionStartHandler::REQUEST_PARAM_RETRY_SESSION],
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
     * @since 4.9.68.p
     */
    private function displaySessionSaveHandlerErrorNotice(): void
    {
        $retry_session_url = add_query_arg(
            [SessionStartHandler::REQUEST_PARAM_RETRY_SESSION => true],
            EEH_URL::current_url()
        );
        $this->displaySessionErrorNotice(
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


    /**
     * Generates an EE_Error notice regarding the current session woes
     * but only if the current user is an admin with permission to 'install_plugins'.
     *
     * @since 5.0.46
     */
    private function displaySessionErrorNotice(string $message, string $file, string $function, int $line): void
    {
        if (current_user_can('install_plugins')) {
            EE_Error::add_error($message, $file, $function, $line);
        }
    }
}
