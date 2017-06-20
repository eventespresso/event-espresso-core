This checklist verifies that the registration summary message type works as expected.
 
 * [ ] Make sure MER is active
 * [ ] Make sure the Registration Summary message type is active (its not by default on a fresh install)
 * [ ] Setup one event that has the DRS set to RPP
 * [ ] Setup another event that has the DRS set to Not Approved
 * [ ] Setup another event that has the DRS set to RPP
 * [ ] Go to the frontend and add tickets for both Event 1 and Event 2 to the cart.
 * [ ] Complete the registration for the tickets in the cart.
 * [ ] Verify that the registration summary sends as expected.
 * [ ] Go to the frontend and add tickets for both Event 1 and Event 3 to the cart.
 * [ ] Complete the registration for the tickets in the cart.
 * [ ] Verify that the registration summary does NOT get sent (it shouldn't because the registrations in the cart are the same status)