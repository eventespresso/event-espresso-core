# EE4 Forms System Overview

## Form Sections

In EE4, *form sections* are PHP classes that take care of:

1. Rendering an HTML form (including stylesheets and javascript)
2. Validating the form's request data (client-side and server-side) and displaying errors in the form
3. Passing on normalized, validated data to other code

An EE4 Formsection is a PHP class that extends `EE_Form_Section_Proper`, and has a list of inputs and other nested sub-sections. Each input corresponds to a piece of information gathered in the form (eg, an email address), defines how that input should be displayed (eg, in a text input), how that data should be normalized (eg, to a string, not an integer or an array), and what constitutes valid input (eg it needs an "@" sign followed by a valid domain name).

Let's see an example of the code: a form for updating a WP_User's shirt size. First we define the form:

```php
class EE_Sample_Form extends EE_Form_Section_Proper{
	function __construct(){
		$this->_subsections = array(
			'h1'=>new EE_Form_Section_HTML('<h1>My Easy Sample Form</h1>'),
			'email'=>new EE_Email_Input(array('required'=>true)),
			'shirt_size'=>new EE_Select_Input(array(''=>'Please select...', 's'=>  __("Small", "event_espresso"),'m'=>  __("Medium", "event_espresso"),'l'=>  __("Large", "event_espresso")),array('required'=>true,'default'=>'s')),);
        }
}
```

The above class defines a form with 3 sub-sections: a nice little header saying "My Easy Sample Form", an email text input, and a shirt size select input.

Here is the code that displays the form and handles form submission:

```php
$form = new EE_Sample_Form();
if( $form->was_submitted( )){
	$form->receive_form_submission();
	if( $form->is_valid() ){
		$wp_user = get_user_by_email($form->get_input_value( 'email' ) );
		update_user_meta($wp_user->ID, 'shirt_size', $form->get_input_value( 'shirt_size') );
		wp_redirect( 'http://mysite.com/success_form' );
		die;
	}
}
//display either the blank form, or the form with validation errors in it
?>
<form method="POST">
<?php echo $form->get_html_and_js(); ?>
<input type="submit" value="Submit">
</form>
```

We create an instance of EE_Sample_Form(), ask it whether that form was submitted according to the request data. If it believes the form was submitted, it validates the input. If the form submission contained valid data, it is used to update a usermeta field called "shirt_size" for the WP_User corresponding to the email provided.

If the form wasn't submitted (ie, it's probably a GET request) the form is echoed out to the page. If it was submitted but contained invalid data (eg, they didn't enter an email, or tinkered with the form's HTML and provided "shirt_size" with a value of "hackerzrule") then the form is re-displayed to the user with validation errors present and they are asked to resolve the errors.

So on first request the above code will echo

```html
<form method="POST">

	
		<div id="sample-form" class="" style="">
			<h1>My Easy Sample Form</h1>
		
			<div id="sample-form-email-input-dv" class="-input-dv">
				<label id="sample-form-email-lbl" class="ee-required-label " style="" for="Sample_Form[email]">Email<span class="ee-asterisk">*</span></label>
				
				<input type="email" name="Sample_Form[email]" id="sample-form-email" class="ee-required  email" required="" value="" style="">
				<span id="sample-form-email-help" class="description" style=""></span>
			</div>
		
			<div id="sample-form-shirt-size-input-dv" class="-input-dv">
				<label id="sample-form-shirt-size-lbl" class="ee-required-label " style="" for="Sample_Form[shirt_size]">Shirt Size<span class="ee-asterisk">*</span></label>
				
				
				<select id="sample-form-shirt-size" name="Sample_Form[shirt_size]" class="ee-required " required="" style="">
					<option value="">Please select...</option>
					<option value="s" selected="selected">Small</option>
					<option value="m">Medium</option>
					<option value="l">Large</option>
				</select>
				<span id="sample-form-shirt-size-help" class="description" style=""></span>
			</div>
		
	
</div>
<!-- AHEE__Form_Section_Layout__sample_form__html -->
<!-- AFEE__Form_Section_Layout__sample_form -->
<input type="submit" value="Submit">
</form>
```

And if there were validation errors performed, HTML for them would be automatically inserted directly into the form's HTML.

So why should your code use the forms system instead of creating the HTML, javascript form-validation, server-side form-validation, and other related code yourself? Because this is a way of making your code more DRY ("don't repeat yourself", a coding principle that helps make your client code more easily-cheangeable), and once you get the hang of it, will be much quicker.

That's the basics, now let's jump into how to customize your forms to make them behave and look just the way you need.

### Input Types

Event Espresso comes with many different built-in input types, like `EE_Email_Input` and `EE_Select_Input` you saw in `EE_Sample_Form`. They are contained in the event-espresso-core/core/libraries/form_sections/inputs. Each has a display strategy (how it looks), normalization strategy (what data type it represents), and validation strategy (what range of values it considers acceptable).

| Input Class name | Displays as: | Normalizes to (represents): | Validates so long as the input is: | Comments |
| ---------------- | ------------ | --------------------------- | ---------------------------------- | -------- |
`EE_Admin_File_Uploader_Input` | a special WP file uploader, automatically including the needed CSS and JS | string | valid url | Should only be used from admin-pages
`EE_CVV_Input` | text input | string | integer | Also when the "sensitive data" is removed, clears out the value
`EE_Checkbox_Multi_Input` | checkbox | array of strings or array of integers | values in list of options provided | Options provided can be either strings or integers which affects the normalization and validation
`EE_Country_Select_Input` | text input | string | valid credit card | Automatically generates the list of options from entries in wp_esp_country database table
`EE_Currency_Input` | select (dropdown) | string | valid currency code | automatically generates options from entires in wp_esp_currency table
`EE_Email_Input` | email input | string | valid email address | 
`EE_Fixed_Hidden_Input` | hidden input | string | N/A | User input is ignored
`EE_Month_Input` | select (dropdown) | string (January = "01", February = "02", etc) or integer (January = 1, February = 2, etc) | valid month number | constructor takes $leading_zero a boolean indicating whether values should be like "01" or 1
`EE_Radio_Button_Input` | radio | string or integer | in list of options provided | options can be strings or integers which affects normalization and validation
`EE_Select_Input` | select (dropdown) | string or integer | in list of options provided | options can be array of strings or integers
`EE_Select_Reveal_Input` (EE4.8.41+) | select (dropdown) | string or integer | in list of options provided | same as `EE_Select_Input`, except related form sections are hidden or revealed by the selection. Eg if this input has 2 options "credit_card" and "echeck", and the input has sibling form sections BY THOSE SAME NAMES, then when "credit_card" is selected, the sibling "credit_card" form section will be revealed, and the "echeck" section will be hidden. That is, the values should be Relative Form Paths (see "Relative Form Paths" below), but are FROM THE INPUT's PARENT; in other words, they're form paths relative to this `EE_Select_Reveal_Input`, but automatically have `../` prepended onto them.
`EE_State_Select_Input` | select (dropdown) | integer (state ID) | in list of options | Options taken from the wp_esp_state database table
`EE_Submit_Input` | submit | string | none |
`EE_Text_Area_Input` | textarea | string | none |
`EE_Text_Input` | text | string | none |
`EE_Year_Input` | select (dropdown) | string | valid string representing a year | May optional show years in a two-digit (eg "14") or four-digit (eg "2014") format
`EE_Yes_No_Input` | select (dropdown) | boolean | none (besides verifying its a boolean) | 

### EE_Form_Section_Base

All the other form section classes, and even form input classes, inherit from this base class. You can provide the following options in the $options_array in the constructor:

| Option | Description |
| ------ | ----------- | 
html_id | The "id" attribute of the HTML element that represents this form section (eg the div or input)
html_class | The value of the "class" attribute of the HTML element
html_style | The value of the "style" attribute of the HTML element
other_html_attributes | Any extra HTML attributes you may want to put on the HTML element representing the form section. (This should just be a string which will be put into the HTML element)

### EE_Form_Section_Proper

Representing a "normal" form section, with subsections and sub-inputs. It accepts all of EE_Form_Section_Base' inputs plus the following:

| Option | Description |
| ------ | ----------- |
name | 	the name of the form section (will be used in the default html_name, html_id, label, etc). ONLY provide this if there is no parent form section. Otherwise, if its a sub-section of another form section, the name is specified by the subsection array key. See the example below
subsections | Array of EE_Form_Section_Base children that are the subsections of this section. Ie, an array of inputs and sub-form-sections. Array keys are the section names
layout_strategy | Sets the strategy for how the form section will be layed out when displaying it, a child of EE_Layout_Strategy_Base. This dictates what HTML will be used to open and close the form section, how the subsections will be rendered and what their spacers will be, and where the inputs, along with their labels and help text, will be placed.

> **Important:** the topmost EE_Form_Section_Proper should be explicitly given a "name" in the constructor's arguments, otherwise its name will be derived from the classname (and if you have two forms with the name "EE_Form_Section_Proper" on the same page their input names will overlap and cause trouble). However, you should NOT set a "name" for sub-sections or inputs because it's given via the array key in the parent form section's subsections array.  See below for the example.

```php
//making a custom form that extends EE_Form_Section_Proper is a good practice
class EE_My_Form_Section extends EE_Form_Section_Proper {
    function __construct( $options = array() ) {
        $options[ 'subsections' ] = array_merge( array(
            'my_input' => EE_Text_Input()
        ), $options[ 'subsections' ] ? $options[ 'subsections' ] : array()
        parent::__construct( $options );
    }
}

//it's best to make a class that extends EE_Form_Section_Proper
//because it's default name will be different from other forms
//and it can override parent methods if you want
$best_form = new EE_My_Form_Section( array(
    'name' => 'best_form', 
    'subsections' => array(
        'input1' => new EE_Text_Input()
    )
));

//using EE_Form_Section_Proper is ok too, just make sure you provide a "name"
//option when it's not an sub-section
$ok_form = new EE_Form_Section_Proper( array(
    'name' => 'ok_form', 
    'subsections' => array(
        'input1' => new EE_Text_Input(),
        'my_sub_form' => new EE_My_Form_Section()
    )
));

//when the form section you are using IS a sub-section, then DON'T provide a name
$very_bad_form = new EE_Form_Section_Proper( array(
    //oups! forgot to provide a name. this is bad! compare to $ok_form
    'subsections' => array(
        'bad_named_twice' => new EE_My_Form_Section( array( 
            'name' => 'unnecessary' //this sub-section shouldn't have a "name" option because the name is specified by "bad_named_twiced", 
                                    //the array key in the parent's subsections array. Compare to 'my_sub_form' in $ok_form
         ),
    )
));
```

### EE_Form_Input_Base

Representing a piece of data we want to retrieve from the user in the form, and handles how we want to display that input. It accepts all of EE_Form_Section_Base' inputs plus the following:

| Option | Description |
| ------ | ----------- |
default | normalized default/initial value (eg, if providing the default for a Yes_No_Input, you should provide TRUE or FALSE, not '1' or '0')
html_name | the value of the "name" attribute on the HTML input tag. Best left as the default
html_label_id | The value of the "id" attribute on the label tag
html_label_class | The value of the "class" attribute on the label tag
html_label_style | The value of the "style" attribute on the label tag
html_label_text | The text of the label tag for the input
html_label | Full HTML for the label on the input. Using this overrides all the other html_label_* options
html_help_text | Text explaining the input, usually placed in a tag nearby the input
html_help_class | The value of the "class" attribute on the tag containing the help text
html_help_style | The value of the "style" attribute on the tag containing the help text
required | Shortcut for adding the EE_Required_Validation strategy
display_strategy | Sets the display strategy for the input, should be a subclass of EE_Display_Strategy_Base
validation_strategies | An array of all the validation strategies on this input, children of EE_Validation_Strategy_Base
normalization_strategy | 	Sets the normalization strategy on this input, a child of EE_Normalization_Strategy_Base. Affects the type of the normalized_value (whether it's a string, a boolean, an int, a float, or an array of those things)
sensitive_date_removal_strategy | Sets the sensitive data removal strategy, child of EE_Sensitive_Data_Removal_Strategy. This affects how the data stored on the input is stored when you can clean_sensitive_data() on the input or the form
required_validation_error_message | The text to display near the input if it's required and NOT provided (in both the client-side and server-side validation)
validation_error_message | If the input is provided, but somehow fails validation, this is the message that will appear near the input
ignore_input | boolean. Set to `true` to have the input totally ignore whatever value the user submits server-side. This may be helpful for form inputs when they are to only be used in client-side  Javascript like React, but should be totally ignored server-side

> **Note:** some of the form inputs' first option is actually an array of options (eg EE_Checkbox_Input and EE_Radio_Button_Input), and the 2nd argument is the array of options.

### EE_Form_Section_HTML

HTML Form Sections are really just HTML that you want to accompany a form, but accepts no actual input. This can be handy to add a header to a form section, for example.

You simply provide a string of HTML.

### EE_Form_Section_HTML_From_Template

This is the same as the EE_Form_SEction_HTML, but you instead provide a path to a template file where the HTML is contained, and an array of arguments to be made available to the template while rendering.

### EE_Model_Form_Section - (in progress)

A form section representing a single model object. Each field on the model will be mapped to a form input. In the future, model relations will also be mapped to a form input (or an entire subsection). This is still experimental.

## Getting Validated, Normalized Data from your Form Sections

Ok so you've created a form that displays nice, validates the users' data, normalizes it to the appropriate PHP types, now you want to do something with that data. What's the best way to get at it?

### Distinction between raw_value and normalized_value

Each form input contains two "values":

* the raw value, the exact string or array the user provided in the form submission. This data is generally UNSAFE for usage in your code, espcially for anything getting saved to the database. The only reason you might want to use this data is to re-display it to the user in the form, saying that it was somehow didn't pass validation. It can be retrieve using `EE_Form_Input_Base::raw_value()` and `EE_Form_Input_Base::raw_value_in_form()`(escapes quotes so this can be echoed in an HTML element attribute)
* the normalized value, which is derived from the raw form input but has been validated and normalized according to the normalization strategy of the input. This can be retrieved using `EE_Form_Input_Base::normalized_value()`, or `EE_Form_Section_Proper::input_values()` and `EE_Form_Section_Proper::input_pretty_values()` (individual inputs can change the "pretty" version of the normalized value, but it's normally the same as the normalized value)

For example, let's say you have an `EE_Yes_No_Input` input in your form like so:

```php
$form = new EE_Form_Section_Proper( array(
    'name' => 'Darth Vaders Decision', 
    'subsections' => array(
        'destroy_alderan' => new EE_Yes_No_Input()
    )
);
```

When that form is submitted, and someone selects "Yes", the `raw_value()` would be the string "1", and the `normalized_value()` would be the PHP boolean TRUE.

Another example: let's say you have an `EE_Text_Input` input in your form, which you set the normalization strategy to be `EE_Int_Normalization` like so:

```php
$form = new EE_Form_Section_Proper( array(
    'name' => 'alderan_casulaty_count_form',
    'subsections' => array(
        'count' => new EE_Text_Input( array(
            'normalization_strategy' => new EE_Int_Normalization()
         )
    )
);
```

Now let's say a Rebel Scum is filling this form out, they might disabled javascript so the client-side validation won't work, and they might submit a value of "0; DELETE * FROM wp_posts WHERE 1=1;" instead of a proper number (an SQL injection attack). The `raw_value()` of that input is exactly what they provided: "0; DELETE * FROM wp_posts WHERE 1=1;" and if used in a MySQL query and not escaped, may drop all the posts in your database! See why using the `raw_value()` is a bad idea? However, the `normalized_value()` will simply be NULL because that string couldn't be converted into an integer.

So why do we even keep the `raw_value()`? Because when we check to see if the form is valid (by calling `$form->receive_form_submission( $_POST ); if( $form->is_valid() ) { ... }`) and we see that it isn't, it's nice to have the raw value the user submitted so we can display it back to them and say "Please provide integers only".

## Form Section Usage of Strategies

In the form sections and inputs, many of the classes share some functionality which is hard to achieve with class inheritance. Eg, there could be an `EE_Radio_Button_Input` and an `EE_Text_Input` whose values should both be integers, but there could be other `EE_Radio_Button_Input`s and other `EE_Text_Input`s whose values should be simple strings. In order to avoid repeating the same code in multiple places, instead each `EE_Form_Input_Base` child has a normalization strategy to indicate how the form input's data should be normalized into a PHP variable, and a few other strategies

### Display Strategies

Each input has a single display strategy which dictates how your input will appear on the page. They are contained in core/libraries/form_sections/strategies/display

| Class Name | Description |
| ---------- | ----------- |
`EE_Admin_File_Uploader_Display_Strategy` | 	Displays a file upload input which should be used from Wordpress admin pages. The user can either manually enter a URL of a file into the input, or click a button to bring up Wordpress' media uploader.
`EE_Checkbox_Display_Strategy` | Should only be used by inputs extending EE_Form_Input_With_Options_Base. Shows all the options as checkboxes.
`EE_Hidden_Display_Strategy` | Inputs will be of the type "hidden" and won't take up space in the form
`EE_Radio_Button_Display_Strategy` | Should only be used with inputs extending EE_Form_Input_With_Options_Base. Shows all options as radio buttons
`EE_Select_Display_Strategy` | Should only be used with inputs extending EE_Form_Input_With_Options_Base. Shows a "select" input with each option being a nested "option" tag
`EE_Select_Multiple_Display_Strategy` | Should only be used with inputs extending EE_Form_Input_With_Options_Base. Shows a "Select multiple" input with each option being a nested "option" tag.
`EE_Submit_Input_Display_Strategy` | Displays an input of type "submit"
`EE_Text_Area_Display_Strategy` | Displays a "textarea" tag
`EE_Text_Input_Display_Strategy` | By default shows an input of type "text". However, you can provide either the strings "password" or "email" to its constructor to change its type accordingly

### Normalization Strategies

Each input has a single normalization strategy which dictates what PHP datatype will represent the submitted data (eg, a string, a float, an integer, an array, etc). They are contained in core/libraries/form_sections/strategies/normalization

| Class Name | Description | 
| ---------- | ----------- |
`EE_All_Caps_Normalization` | Makes sure the string is all capital letters
`EE_Boolean_Normalization` | Makes sure the value is either a php boolean `true` or `false`
`EE_Credit_Card_Normalization` | Make sure the value is a string and valid credit card number (it automatically removes whitespace from the user's input)
`EE_Float_Normalization` | Makes sure the user's input is a valid number including decimal places (including negatives)
`EE_Int_Normalization` | Makes sure the user's input is a valid whole number (including negatives)
`EE_Many_Values_Normalization` | Makes sure the result is an array. Its constructor takes an argument to indicate which other normalization strategy should be used on each of the array's elements
`EE_Slug_Normalization` | Makes sure the input is a string which can be a valid URL slug
`EE_Text_Normalization` | Just makes sure the input is a string (as opposed to an array)
`EE_Null_Normalization` | Ignores user input by replacing whatever value was received to just be `null`. Used when you don't want the input to be used server-side at all.

### Validation Strategies

Each input can have zero or more validation strategies which dictate what data is considered valid for the input (both client-side and server-side). They are contained in core/libraries/form_sections/strategies/validation

| Class Name | Description |
| ---------- | ----------- |
`EE_Conditionally_Required_Validation_Strategy` (EE4.8.41+) | Same as `EE_Required_Validation_Strategy`, except the associated input is only required when provided the requirement conditions array is met. The requirement conditions array's top-level key a relative form path (see "Relative Form Paths" below), its value is an array. This 2nd level array has two items: the first is the operator (for now only '=' is accepted), and the 2nd argument is the  the value the field should be in order to make the field required. Eg `array( '../payment_type' => array( '=', 'credit_card' )` means this field is required, provided the sibling input "payment_type" has the value "credit_card".
`EE_Credit_Card_Validation_Strategy` | Validates that the value is a valid credit card number
`EE_Email_Validation_Strategy` | Validates that the value is a valid email address
`EE_Enum_Validation_Strategy` | Validates that the value is one of the list of options provided to the strategy
`EE_Float_Validation_Strategy` | Validates that the value is a valid float/decimal number
`EE_Int_Validation_Strategy` | 	Validates that the input is a valid whole number
`EE_Many_Valued_Validation_Strategy` | Validates the value is an array. Its constructor accepts another validation strategy as an argument, indicating how to validate each element of the array
`EE_Required_Validation_Strategy` | Validates that the value isn't NULL
`EE_Simple_HTML_Validation_Strategy` | Validates that the input only contains "simple" HTML tags (only works server-side; there is currently no client-side validation for this strategy)
`EE_Text_Validation_Strategy` | Validates that the value is a simple string (ie not an array)
`EE_URL_Validation_Strategy` | 	Validates that the input is a valid URL. Server-side it also verifies that the URL isn't broken (ie, that we receive an HTTP 200 response when a request is sent to that URL)

### Sensitive Data Removal Strategies

Each input can have a sensitive data removal strategy. This strategy is optionally invoked by calling `clean_sensitive_data` on the form section or input to clean sensitive user data out of the form in case you want to store the actual form results somewhere (eg, masking credit cards numbers).  They are contained in core/libraries/form_sections/strategies/sensitive_data_removal

| Class Name | Description |
| ---------- | ----------- |
`EE_All_Sensitive_Data_Removal` | Removes the entire normalized and raw value from the input
`EE_CCV_Sensitive_Data` | Masks the entire value with Xs (eg replaces "123" with "XXX")
`EE_Credit_Card_Sensitive_Data_Removal` | Masks the entire credit card number except the last 4 digits
`EE_No_Sensitive_Data_Removal` | Leaves the normalized value as-is (default)

### Layout Strategies

ONLY for EE_Form_Section_Proper. This strategy dictates how to display the form section and layout its subsections. For each of the form's sub-inputs, dictates where to put the input's label, the input itself, its help text and error messages etc. These are contained in core/libraries/form_sections/strategies/layout

| Class Name | Description |
| ---------- | ----------- |
`EE_Two_Column_Layout` | 	Lays the form out in two columns: the first having the input labels, the 2nd for the actual input, help text, and errors.
`EE_Admin_Two_Column_Layout` | Same as EE_Two_Column_Layout except it adds Wordpress-specific classes to make the form layout in the normal "Wordpressy" way
`EE_Div_Per_Section_Layout` | Lays the form out so that each input is in its own div tag (placing labels just above the inputs)
`EE_FIeldset_Section_Layout` | Same as EE_Div_Per_Section_Layout, except opens the form section with a fieldset and legend tags.
`EE_Template_Layout` | Uses a specific template files to layout the form. Please read the strategy's comments for documentation

## Custom Form Layouts

If you need a more custom form layout than what's provided by the default layout strategies, you have several options:

* Use `EE_Template_Layout_Strategy`so the form's layout can be reused elsewhere
* Layout the form manually by using the form's

## Form-wide Validation

So far the form inputs' validation strategies do a pretty good job of validating users' input in forms. But what if you want form validation that depends on multiple inputs? Eg, question A is only required if checkbox B is checked? That is form-wide validation and is handled server-side quite easily in this next example.

Basically, you need to make a child class of `EE_Form_Section_Proper` and override the `_validate()` method, by using `add_validation_error` and providing an `EE_Validation_Error` if there is a validation problem.

```php
class My_Custom_Validation_Form extends EE_Form_Section_Proper {
    function __construct( $options = array() ) {
        $options[ 'subsections' ] = array_merge( array(
            'is_storm_trooper' => new EE_Yes_No_Input(),
            'passphrase' => new EE_Password_Input()
            ), $options[ 'subsections' ] ? $options[ 'subsections' ] : array()
        );
    }
    /**
    * Overrides parent's _validate() method to check
    */
    protected function _validate() {
        if( $this->get_input_value( 'is_storm_trooper'' ) &&
            $this->get_input_value( 'passphrase' ) === NULL ) {
            $this->add_validation_error( new EE_Validation_Error( __( 'If you\'re a storm trooper, proivide a passphrase! Blast \'em!', 'event_espresso'), 'blast_em', $this ) );   
        }
        parent::_validate();
    }
  
    //enqueue a javascript file to handle client-side validation
    public function wp_enqueu_scripts() {
        parent::wp_enqueue_scripts();
        wp_enqueue_script( 'my_form_validation', 'path_to_my_js_file', array( 'jquery-validate', 'ee_form_section_validation', TRUE );
    }
}
```

If a validation error is added to the form, it will be considered invalid and `is_valid()` will return FALSE. Also when re-displaying the form, the form-wide validation error should appear automatically at the top of the form.

Note that this also enqueues a javascript file which could take care of performing the same logic client-side.

##Relative Form Paths (EE4.8.41+)
`EE_Select_Reveal_Input` and `EE_Conditionally_Required_Validation_Strategy` both use "relative form paths" to refer to other inputs in a form. These are modeled after filesystem paths. Pretend each formsection or form input is a directory in a filesystem. How would you change from the current directory, eg "/home/user/me/a" to "/home/user/me/b"? You'd type `cd ../b` right? Likewise, if you have a form with two sub-inputs, "a" and "b", and you want to refer to "b" from "a", you would you "../b". 
That is, "../" means to look to the parent, and anything after that refers to a child form section. 
For example, let's say we have a form that's structured like this

```
grantparent_form_section
-parent_form_section
--child_input
--sibling_input
-aunt_form_section
--cousin_input
```

That is, `grandparent_form_section` has two children: `parent_form_section` and `aunt_form_section`; `parent_form_section` has two child inputs: `child_input` and `sibling_input`; and `aunt_form_section` has a single child: `cousin_input`.
Here are some example relateive form paths, using this form structure:

* From `parent_form_section` to `grandparent_form_section`: `../` (up a level)
* From `parent_form_section` to `aunt_form_setion`: `../aunt_form_section` (up a level, down to "aunt_form_section")
* From `parent_form_section` to `cousin_input`: `../aunt_form_section/cousin_input` (up a level, down to "aunt_form_section", then down to "cousin_input")
* From `parent_form_section` to `child_input`: `child_input` (down to "child_input")
* From `parent_form_section` to itself: '../parent_form_section` (up a level, down to "parent_form_section")
* From `child_input` to `sibling_input`: `../sibling_input` (up a level, down to "sibling_input")
* From 'child_input` to `parent_form_section`: `../` (up a level)
* From `child_input` to `grandparent_form_section`: `../../` (up two levels)
* From `child_input` to `cousin_input`: `../../aunt_form_section/cousin_input` (up two levels, then down to "aunt_form_section", then down to "cousin_input")
* From `grandparent_form_section` to `child_input`: `parent_form_section/child_input` (down to "parent_form_section", then down to "child_input")
