Tests whether disabling a message context works as expected for generating and sending messages.

* [ ] Pick a message template to edit (doesn't matter which - but pick one that has all contexts with "To" field content)
* [ ] In the editor for the message template, verify the UI for enabling/disabling context appears.
* [ ] Verify the action of enabling/disabling the context works as expected and ONLY disables/enables for that message template.
* [ ] Leave the context disabled.
* [ ] Trigger a message to send for that message template (doesn't matter how you trigger) and verify that no messages for the disabled context are sent.
* [ ] Verify that even if a context is enabled and there is no "To" field content that the context will still not be generated/sent.
      