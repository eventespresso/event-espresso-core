<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct access.');

use EventEspresso\core\libraries\form_sections\strategies\filter\VsprintfFilter;

/**
 * Tests the VsprintfFilter strategy.
 *
 * @package    EventEspresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.35
 * @group forms
 * @group strategies
 * @group agg
 * @group integration
 */
class VsprintfFilterTest extends EE_UnitTestCase
{
    /**
     * @group 10580
     */
    public function test_filtering_form_section()
    {
        $form = new EE_Form_Section_Proper(
            array(
                'form_html_filter' => new VsprintfFilter(
                    '^^-1%1$s--2%2$s---3%3$s----4%4$s-1%1$s^^',
                    array(
                      'argument1',
                      'argument2',
                    )
                ),
                'subsections' => array(
                  'some_input' => new EE_Text_Input()
                )
            )
        );

        //get the html for the form
        $actual_output = $form->get_html();
        //our expectations are the following output:
        //^^-1argument1--2argument2---3
        // <table id="form-section-proper" class="form-table">
        // 		<tbody>
        // 			<tr>
        //
        // 				<th scope="row">
        // 					<label id="form-section-proper-some-input-lbl" class="" style="" for="Form_Section_Proper[some_input]">Some Input</label>
        // 				</th>
        // 				<td>
        // 					<input type="text" name="Form_Section_Proper[some_input]" id="form-section-proper-some-input" class=" large-text" value="" style="">
        // 				</td>
        // 			</tr>
        // 	</tbody>
        // </table>
        // <!-- close form-section-proper -->
        //
        // <!-- AHEE__Form_Section_Layout__form_section_proper__html -->
        // <!-- AFEE__Form_Section_Layout__form_section_proper -->----4
        //
        //
        //
        //<label id="form-section-proper-some-input-lbl" class="" style="" for="Form_Section_Proper[some_input]">Some Input</label>
        //
        //
        //<input type="text" name="Form_Section_Proper[some_input]" id="form-section-proper-some-input" class=" large-text large-text" value="" style="">
        //
        //-1argument1^^

        //there should be two instances of the following, one at the beginning and one at the end
        $expected_string_end = '-1argument1^^';
        $this->assertEquals(2, substr_count($actual_output, '-1argument1'));
        $this->assertEquals(0, strpos($actual_output, '^^-1argument1'));
        $this->assertEquals(
            strlen($actual_output)-strlen($expected_string_end),
            strrpos($actual_output, $expected_string_end)
        );

        //there should be one instance of the following
        $this->assertEquals(1, substr_count($actual_output, '--2argument2'));
        $this->assertEquals(0, strpos($actual_output, '^^-1argument1--2argument2'));

        //entire form should be in here
        $this->assertEquals(
            1,
            substr_count($actual_output, '<!-- AHEE__Form_Section_Layout__form_section_proper__html -->')
        );

        //text input should appear twice
        $this->assertEquals(
            2,
            substr_count($actual_output, '<input type="text"')
        );
    }
}