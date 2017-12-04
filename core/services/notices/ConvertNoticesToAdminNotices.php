<?php

namespace EventEspresso\core\services\notices;

use DomainException;
use EventEspresso\core\services\route\RouteMatcher;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class ConvertNoticesToAdminNotices
 * Converts notifications in a NoticesContainer into AdminNotice notifications
 *
 * @package EventEspresso\core\services\notices
 * @author  Brent Christensen
 * @since   4.9.53.rc
 */
class ConvertNoticesToAdminNotices extends NoticeConverter
{


    /**
     * ConvertNoticesToAdminNotices constructor.
     *
     * @param NoticesContainerInterface $notices
     * @param RouteMatcher              $route_matcher
     */
    public function __construct(NoticesContainerInterface $notices, RouteMatcher $route_matcher)
    {
        parent::__construct($notices, $route_matcher, RouteMatcher::ROUTE_ADMIN_ANY);
    }


    /**
     * Converts Notice objects into AdminNotice notifications
     *
     * @param NoticeInterface[] $notices
     * @param bool              $throw_exceptions
     * @throws DomainException
     * @throws InvalidArgumentException
     */
    public function process(array $notices = array(), $throw_exceptions = false)
    {
        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $notices = empty($notices) ? $this->getNotices() : $notices;
        $error_string = '';
        foreach ($notices as $notice) {
            if (! $notice instanceof NoticeInterface
                || ! $this->useNotice($notice)
            ) {
                continue;
            }
            if ($notice->type() === Notice::ERROR) {
                if ($throw_exceptions) {
                    $error_string .= '<br />' . $notice->message();
                } else {
                    new AdminNotice($notice);
                }
                $notice->setProcessed();
                continue;
            }
            $notice->setProcessed();
            new AdminNotice($notice);
        }
        if ($throw_exceptions && ! empty($error_string)) {
            throw new DomainException(esc_html__('The following errors occurred:', 'event_espresso') . $error_string);
        }
    }


    /**
     * This ensures that this converter processes any notices automatically
     * @return void
     */
    public function setHookForRequest()
    {
        add_action('in_admin_header', array($this, 'process'));
    }


    /**
     * @param NoticeInterface $notice
     * @return bool
     * @throws InvalidArgumentException
     */
    public function useNotice(NoticeInterface $notice)
    {
        return $this->canUseByCapability($notice)
                && ! $notice->isDismissed()
                && ! $notice->isProcessed()
                && $this->getRouteMatcher()->isOnRoute($notice->getRouteMatchConfigIdentifier());
    }
}
