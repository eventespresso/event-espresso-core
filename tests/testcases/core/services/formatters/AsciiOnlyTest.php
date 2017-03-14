<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\services\formatters\AsciiOnly;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class AsciiOnlyTest
 * Verifies we're correctly removing non-ascii characters
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class AsciiOnlyTest extends \EE_UnitTestCase
{
    protected $formatter;
    public function __construct()
    {
        $this->formatter = new AsciiOnly();
        parent::__construct();
    }



    /**
     * @group current
     */
    public function test_format(){
        //array keys are the strings, values are arrays containign each emoji in that string
        $emoji_strings = array(
            'I feel 😁 today' => array('😁'),
            'I would like a taco 🌮, and some ramen 🍜 too' => array('🌮','🍜'),
            'Party 🈵 time' => array('🈵'),
        );
        foreach($emoji_strings as $emoji_string => $emojis){
            $this->assertEquals(
                str_replace($emojis,'',$emoji_string),
                $this->formatter->format($emoji_string)
            );
        }
    }




}
// End of file EmojiRemovalTest.php
// Location: tests\testcases\core\services\formatters/EmojiRemovalTest.php