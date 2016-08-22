<?php
namespace EventEspresso\core\domain\entities;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class RegUrlLink
 * generates a REG_url_link
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class RegUrlLink
{

    /*
     * @var string $reg_url_link
     */
    private $reg_url_link;



    /**
     * @param string $reg_url_link
     * @return \EventEspresso\core\domain\entities\RegUrlLink
     */
    public static function fromRegUrlLinkString($reg_url_link)
    {
        if (empty($reg_url_link) || ! is_string($reg_url_link)) {
            throw new \InvalidArgumentException(
                __(
                    'You must supply a valid non-empty string to generate a reg_url_link.',
                    'event_espresso'
                )
            );
        }
        return new RegUrlLink(1, '', $reg_url_link);
    }



    /**
     * @param \EE_Registration $registration
     * @return \EventEspresso\core\domain\entities\RegUrlLink
     */
    public static function fromRegistration(\EE_Registration $registration)
    {
        return new RegUrlLink(
            $registration->count(),
            $registration->ticket_line_item()
        );
    }



    /**
     * CreateRegUrlLinkCommand constructor.
     *
     * @param int    $reg_count
     * @param mixed  $base_code
     * @param string $reg_url_link
     */
    public function __construct(
        $reg_count = 1,
        $base_code = '',
        $reg_url_link = ''
    ) {
        if ( ! empty($reg_url_link) && is_string($reg_url_link)) {
            $this->reg_url_link = apply_filters(
                'FHEE__\EventEspresso\core\domain\entities\RegUrlLink__construct__reg_url_link',
                $reg_url_link,
                $reg_count,
                $base_code,
                $reg_url_link
            );
            return;
        }
        $reg_count = min(1, absint($reg_count));
        $base_code = $base_code instanceof \EE_Line_Item ? $base_code->code() : $base_code;
        if (empty($base_code) || ! is_string($base_code)) {
            throw new \InvalidArgumentException(
                __(
                    'You must supply a valid EE_Line_Item or a non-empty string to generate a reg_url_link.',
                    'event_espresso'
                )
            );
        }
        $this->reg_url_link = apply_filters(
            'FHEE__\EventEspresso\core\domain\entities\RegUrlLink__construct__reg_url_link',
            $reg_count . '-' . md5($base_code . microtime()),
            $reg_count,
            $base_code,
            $reg_url_link
        );
    }



    /**
     * Return the object as a string
     *
     * @return string
     */
    public function __toString()
    {
        return $this->reg_url_link;
    }
}
// End of file RegUrlLink.php
// Location: /RegUrlLink.php