<?php
namespace EventEspresso\core\services\validators;

/**
 * Class URLValidator
 *
 * Replacement for `filter_var($url, FILTER_VALIDATE_URL)` because of all the problems mentioned on
 * https://d-mueller.de/blog/why-url-validation-with-filter_var-might-not-be-a-good-idea/.
 * Why not just use `esc_url_raw()`? Yes, we could. But it's better to consolidate the validation logic in case it needs
 * to be tweaked someday.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.68.p
 *
 */
class URLValidator
{
    /**
     * Returns whether or not the URL is valid
     * @since 4.9.68.p
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
