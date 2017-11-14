<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class AdminNotice
 * generates WordPress admin notices from EventEspresso\core\services\notices\Notice objects
 *
 * @package EventEspresso\core\services\notices
 * @author  Brent Christensen
 * @since   4.9.47.rc.041
 */
class AdminNotice
{

    const ERROR       = 'notice-error';

    const WARNING     = 'notice-warning';

    const SUCCESS     = 'notice-success';

    const INFORMATION = 'notice-info';

    const DISMISSABLE = ' is-dismissible';

    /**
     * generic system notice to be converted into a WP admin notice
     *
     * @var NoticeInterface $notice
     */
    private $notice;


    /**
     * AdminNotice constructor.
     *
     * @param NoticeInterface $notice
     * @param bool            $display_now
     */
    public function __construct(NoticeInterface $notice, $display_now = true)
    {
        $this->notice = $notice;
        if (! did_action('admin_notices')) {
            add_action('admin_notices', array($this, 'displayNotice'));
        } elseif ($display_now) {
            $this->displayNotice();
        }
    }


    /**
     * @return void
     */
    public function displayNotice()
    {
        echo $this->getNotice();
    }


    /**
     * produces something  like:
     *  <div class="notice notice-success is-dismissible event-espresso-admin-notice">
     *      <p>YOU DID IT!</p>
     *      <button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this
     *      notice.</span></button>
     *  </div>
     *
     * @return string
     */
    public function getNotice()
    {
        return sprintf(
            '<div class="notice %1$s%2$s event-espresso-admin-notice"><p>%3$s</p></div>',
            $this->getType(),
            $this->notice->isDismissible() ? AdminNotice::DISMISSABLE : '',
            $this->getMessage()
        );
    }


    /**
     * @return string
     */
    private function getType()
    {
        switch ($this->notice->type()) {
            case Notice::ERROR :
                return AdminNotice::ERROR;
                break;
            case Notice::ATTENTION :
                return AdminNotice::WARNING;
                break;
            case Notice::SUCCESS :
                return AdminNotice::SUCCESS;
                break;
            case Notice::INFORMATION :
            default:
                return AdminNotice::INFORMATION;
                break;
        }
    }


    /**
     * @return string
     */
    protected function getMessage()
    {
        $message = $this->notice->message();
        if (WP_DEBUG && $this->getType() === AdminNotice::ERROR) {
            $message .= '<br/><span class="tiny-text">' . $this->generateErrorCode() . '</span>';
        }
        return $message;
    }


    /**
     * create error code from filepath, function name,
     * and line number where notice was generated
     *
     * @return string
     */
    protected function generateErrorCode()
    {
        $file       = explode('.', basename($this->notice->file()));
        $error_code = ! empty($file[0]) ? $file[0] : '';
        $error_code .= ! empty($error_code) ? ' - ' . $this->notice->func() : $this->notice->func();
        $error_code .= ' - ' . $this->notice->line();
        return $error_code;
    }


}
