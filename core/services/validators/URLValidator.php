<?php
namespace EventEspresso\core\services\validators;

/**
 * Class URLValidator
 *
 * Replacement for `filter_var($url, FILTER_VALIDATE_URL)` because of all the problems mentioned on
 * https://d-mueller.de/blog/why-url-validation-with-filter_var-might-not-be-a-good-idea/
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class URLValidator
{
    /**
     * Returns whether or not the URL is valid
     * @since $VID:$
     * @param $url
     * @return boolean
     */
    public function isValid($url)
    {
        return  esc_url_raw($url) === $url;
    }
}
// End of file URLValidator.php
// Location: ${NAMESPACE}/URLValidator.php
