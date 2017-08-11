### Expectations

- On existing installs, there is not a `cc` field for the message templates created in the db until the initial time someone adds a value in this field.  This means for someone used to the structure of the `esp_message_template` table, they might wonder _where_ the cc field is.  Also of note is that the cc field row when created will not be grouped with the other rows for the same template because its inserted after they were created.  It's not a big deal from a technical standpoint, but just something to note.
- Fresh installs or resetting message templates for the email messenger will have the cc field created in the db right away.
- The cc field allows the same valid shortcodes as what is available for the to field.
- When a message is generated and sent, the cc field is saved with the extra meta for the message.  On future resends of that _identical_ message (from the context of the list table) any attached cc's will be used again.  If you're watching the database you'll see this extra meta entry show up as `MSG_cc`
- The message activity list table does not show any cc information and the cc email addresses are not included in any search queries.

### Initial install

* [ ] Verify on fresh install that in the db there is a row for the cc field in the `esp_message_template` table for each message template attached to the email messenger.
* [ ] Verify on existing/fresh installs that the cc field shows up in the message template editor for email message templates but does NOT show up for non email message templates.
 * [ ] Verify on existing installs that when you save a template for the email messenger with content in the cc field, that the content sticks.  In the db there should be a new row for cc field for that message type and messsenger in the `esp_message_template` table.
 * [ ] When you send a test message from a message template with something in the cc field, the test message should go to the cc email address (if its a valid address).
 
 ### Shortcode Parsing/Sending

* [ ] Verify that when you have something in the cc field on initial message creation/sending, that something (if its a shortcode is parsed correctly), if its a valid email, receives the email.
* [ ] Verify that when you regenerate a message from the context of list tables and that message has a cc field with content, the cc field value (assuming a valid email) receives the message.
* [ ] Verify when resending from the context of the message activity list table, for any messages that had an attached cc value, the cc email address (assuming its valid) receives the emails.
* [ ] Verify for all email sends, that if there is nothing in the cc field, that the message is still sent to/received by the main recipient just fine.

### Other

* [ ] Ensure activating any add-ons that add new templates (ticketing for example, or the new Automated Upcoming Event Notifications add-on) still add their custom templates without issues and their messages work as expected.