This checklist verifies that when there are more than one event registered for, and there all the events in the registration have the same custom template, then a custom template will get used.  Thus, the only time a global template will be used is when there are more than one event in the outgoing message and each event is assigned to a different message template group.  For reference see [https://events.codebasehq.com/projects/event-espresso/tickets/10201](https://events.codebasehq.com/projects/event-espresso/tickets/10201).

> Note: you can test this with any message template group but the below steps are a basic validation of expected behaviour.  The below steps are also covered by `c-TestCustomMessageTemplateCept.php`.

> You will need the MER add-on active for this.

* [ ] Create two custom message template groups for the Registration Approved Message Type.  Name one "Custom Template A" and the other "Custom Template B".
* [ ] In each of the custom message template groups you created.  Edit them so that you have a way later for verifying which template was used in generating a message.
* [ ] Create three events.  For two of the events, assign them to Custom Template A message template group, for the third, assign it to the Custom Template B message template group.
* [ ] Do one registration process via SPCO where you select tickets from both Events that have Custom Message Template A assigned to them.
* [ ] Do another registration process via SPCO where you select one (or more) tickets from an event assigned to Custom Message Template A and one (or more) tickets from an event assigned to Custom Message Template B.
* [ ] Go to the message activity list table.  Verify that the messages associated with the first transaction are all using Custom Message Template A for the generated message.
* [ ] Verify that the messages associated with the second transaction are using the global registration approved message template group for the generated message.


