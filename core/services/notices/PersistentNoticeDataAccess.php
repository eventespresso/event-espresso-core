<?php
namespace EventEspresso\core\services\notices;

use DomainException;
use EventEspresso\core\services\route\RouteMatcher;
use Exception;

/**
 * PersistentNoticeDataAccess
 * Handles retrieving persistent notices from the database and then saving them.
 *
 * @package EventEspresso\core\services\notices
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class PersistentNoticeDataAccess
{

    const OPTION_KEY = 'ee_pers_admin_notices';

    /**
     * @var NoticesContainerInterface
     */
    private $notices_container;


    /**
     * PersistentNoticeDataAccess constructor.
     *
     * @param NoticesContainerInterface $notices
     */
    public function __construct(NoticesContainerInterface $notices)
    {
        $this->notices_container = $notices;
        $this->retrieveStoredNotices();
    }


    /**
     * Retrieve stored notices from the database.
     */
    protected function retrieveStoredNotices()
    {
        $persistent_admin_notices = get_option(self::OPTION_KEY, array());
        if (! empty($persistent_admin_notices)) {
            foreach ($persistent_admin_notices as $name => $details) {
                try {
                    $details = $this->maybeConvertLegacyDetailsForNotice($name, $details);
                    // new format for nag notices
                    $notice = $this->notices_container->addNotice(
                        $details['type'],
                        $details['identifier'],
                        $details['message']
                    )->setRouteMatchConfigIdentifier($details['route_match_config_identifier'])
                     ->setPersistent()
                     ->setDismissible(true)
                     ->setDismissed($details['dismissed'])
                     ->setCapabilityRequired($details['capability'], $details['capability_context']);

                    if (isset($details['file'], $details['func'], $details['line'])) {
                        $notice->setFileFunctionLine($details['file'], $details['func'], $details['line']);
                    }
                } catch (Exception $e) {
                    $this->notices_container->addError(
                        'failed_notice_creation_' . $name,
                        sprintf(
                            esc_html__(
                                'There was an error with retrieving records for a persistent notice.  The error was: %1$s',
                                'event_espresso'
                            ),
                            $e->getMessage()
                        )
                    );
                }
            }
        }
    }


    /**
     * Saves persistent notices to the database.
     */
    public function saveNotices()
    {
        $notices_value_for_option = array();
        foreach ($this->notices_container->getPersistentNotices() as $notice) {
            if (! $notice instanceof NoticeInterface
                || (! $notice->isPersistent() && ! $notice->purge())
            ) {
                $notices_value_for_option[] = $notice->toArray();
            }
        }
        $persistent_admin_notices = get_option(self::OPTION_KEY, array());
        if (empty($persistent_admin_notices)) {
            add_option(self::OPTION_KEY, array(), '', 'no');
        }
        update_option(self::OPTION_KEY, $notices_value_for_option);
    }




    /**
     * This determines whether the provided value for $persistent notices needs converted and attempts to do so.
     * There are two generations of persistent notices that are potentially needing to be converted into a consistent
     * shape for the latest version.
     *
     * @param string|int $name
     * @param mixed      $persistent_notices
     * @return array
     * @throws DomainException
     * @throws Exception
     */
    protected function maybeConvertLegacyDetailsForNotice($name, $persistent_notices)
    {
        //first is it already in the expected current format?
        if (is_array($persistent_notices) && (is_int($name) || isset($persistent_notices['type']))) {
            $this->validate($name, $persistent_notices);
            return $persistent_notices;
        }
        //nope, k let's try converting for back compat
        return is_array($persistent_notices)
            ? $this->convertFromVersion2($name, $persistent_notices)
            : $this->convertFromVersion1($name, $persistent_notices);
    }


    /**
     * Validates our expected persistent notice values
     *
     * @param string|int      $name
     * @param array $persistent_notices
     * @throws DomainException
     */
    private function validate($name, array $persistent_notices)
    {
        if (! isset(
            $persistent_notices['type'],
            $persistent_notices['identifier'],
            $persistent_notices['message'],
            $persistent_notices['capability'],
            $persistent_notices['capability_context'],
            $persistent_notices['dismissed'],
            $persistent_notices['route_match_config_identifier']
        )) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The persistent notice (At index %1$s in the db) could not be retrieved from the database.',
                        'event_espresso'
                    ),
                    (string) $name
                )
            );
        }
    }


    /**
     * Converts from version 2 of the persistent notices in the db.
     * @param string $name
     * @param array $persistent_notices
     * @return array
     * @throws DomainException
     */
    private function convertFromVersion2($name, $persistent_notices)
    {
        if (! isset(
            $details['message'],
            $details['capability'],
            $details['cap_context'],
            $details['dismissed']
        )
        ) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The "%1$s" PersistentAdminNotice could not be retrieved from the database.',
                        'event_espresso'
                    ),
                    $name
                )
            );
        }
        return array(
            'type' => Notice::ERROR,
            'identifier' => $name,
            'message' => $persistent_notices['message'],
            'capability' => $persistent_notices['capability'],
            'capability_context' => $persistent_notices['cap_context'],
            'dismissed' => $persistent_notices['dismissed'],
            'route_match_config_identifier' => RouteMatcher::ROUTE_ADMIN_ANY
        );
    }


    /**
     * Converts from version one persistent notices in the db
     *
     * @param string $name
     * @param string $persistent_notices
     * @return array
     * @throws Exception
     */
    private function convertFromVersion1($name, $persistent_notices)
    {
        try {
            return array(
                'type'                          => Notice::ERROR,
                'identifier'                    => $name,
                'message'                       => (string) $persistent_notices,
                'capability'                    => 'manage_options',
                'capability_context'            => 'viewing legacy persistent notice',
                'dismissed'                     => empty($persistent_notices),
                'route_match_config_identifier' => RouteMatcher::ROUTE_ADMIN_ANY
            );
        } catch (Exception $e) {
            throw $e;
        }
    }
}
