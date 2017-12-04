<?php
namespace EventEspresso\core\services\notices;

use DomainException;
use Exception;

/**
 * NextRequestNoticeDataAccess
 * Handles retrieving and storing "next request" notices.  Next request notices are notices that get displayed on the
 * next request if they haven't been dismissed or already processed.  Typically this will be notices that get generated
 * after the hook point usual notices are fired or on a noheaders route.
 *
 * @package EventEspresso\core\services\notices
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class NextRequestNoticeDataAccess
{

    const OPTION_KEY = 'ee_next_request_notices';


    /**
     * @var NoticesContainerInterface
     */
    private $notices_container;


    /**
     * NextRequestNoticeDataAccess constructor.
     *
     * @param NoticesContainerInterface $notices
     */
    public function __construct(NoticesContainerInterface $notices)
    {
        $this->notices_container = $notices;
        $this->retrieveStoredNotices();
    }


    /**
     * Retrieve next request notices and add them to the notice container.
     */
    protected function retrieveStoredNotices()
    {
        $next_request_notices = get_option(self::OPTION_KEY, array());
        if (! empty($next_request_notices)) {
            foreach ($next_request_notices as $next_request_notice_identifier => $details) {
                try {
                    $this->validateNoticeData($next_request_notice_identifier, $details);
                    $notice = $this->notices_container->addNotice(
                        $details['type'],
                        $details['identifier'],
                        $details['message']
                    )->setRouteMatchConfigIdentifier($details['route_match_config_identifier'])
                     ->setDismissible($details['dismissible'])
                     ->setCapabilityRequired($details['capability'], $details['capability_context']);

                    if (isset($details['file'], $details['func'], $details['line'])) {
                        $notice->setFileFunctionLine($details['file'], $details['func'], $details['line']);
                    }
                } catch (Exception $e) {
                    $this->notices_container->addError(
                        'failed_notice_creation_' . (string) $next_request_notice_identifier,
                        sprintf(
                            esc_html__(
                                'There was an error with retrieving records for a next request notice.  The error was: %1$s',
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
     * Validate the notice data to make sure the expected shape is present.
     * @param       $identifier
     * @param array $details
     * @throws DomainException
     */
    private function validateNoticeData($identifier, array $details)
    {
        if (! is_string($identifier)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Next Request notices require an identifier that is a string.  The identifier provided was (%1$s)',
                        'event_espresso'
                    ),
                    print_r($identifier, true)
                )
            );
        }
        if (! isset(
            $details['type'],
            $details['identifier'],
            $details['message'],
            $details['capability'],
            $details['capability_context'],
            $details['dismissed'],
            $details['route_match_config_identifier']
        )) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The next request notice (At index %1$s in the db) could not be retrieved from the database.',
                        'event_espresso'
                    ),
                    $identifier
                )
            );
        }
    }


    /**
     * Save notices to the db.
     */
    public function saveNotices()
    {
        $notices_value_for_option = array();
        foreach ($this->notices_container->getNoticesShownOnNextRequest() as $notice) {
            if (! $notice instanceof NoticeInterface
                || ! $notice->showOnNextRequest()
                || $notice->isDismissed()
                || $notice->isProcessed()
                || ! $notice->isPersistent()
            ) {
                $notices_value_for_option[] = $notice->toArray();
            }
        }
        $existing_saved_notices = get_option(self::OPTION_KEY, array());
        if (empty($existing_saved_notices)) {
            add_option(self::OPTION_KEY, array(), '', 'no');
        }
        update_option(self::OPTION_KEY, $notices_value_for_option);
    }
}
