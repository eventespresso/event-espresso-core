# Model Statuses
Statuses indicates different states of the data in Event Espresso. 
There are three flavours of models that use statuses in Event Espresso:
* Custom Post Type Models 
* Event Espresso Status Table Models
* Soft Deleted/Archived/Trashed Models

You may want to re-familiarize yourself with [the models in use by Event Espresso](./model-querying.md#what-models-exist).

Lastly, if you need more details on the statuses of models, there is usually helpful information on the models' PHP classes (eg `EEM_Event`), often in constants (eg on `EEM_Event::sold_out` describes the meaning of that status).

## Statuses of Custom Post Type Models
All Event Espresso models that are custom post types (eg Events, Venues, Attendees, and a few others in add-ons) use the WordPress database table `wp_posts`, including the column `status`, in addition to a "meta" table (that stores data that doesn't fit neatly into the WordPress post table, but is so commonly used it deserves its own column in a table.)   
They use the same statuses as posts.

### Events

Events use WordPress core statuses:

* `auto-draft` - an event that WordPress automatically saved. It does not yet have an entry in the `wp_esp_event_meta` table, nor is related data (like datetimes and tickets) saved yet. 
* `draft` - an event that has been saved but not published. Not visible on the frontend, but related data (like datetimes and tickets) are saved.
* `pending` - an event that is pending review by someone with permission to publish events.
* `future` - an event that's scheduled to be published on a future date.
* `publish` - an event that is visible.
* `publish` with a `password` - an event once the visitors has provided the event's password.
* `private` - an event that is only viewable to the creator and privileged admins.
* `trash` - an event that will no longer appear on the frontend of the site, but its related data (eg datetimes, tickets, and registrations) still exist.

Plus some custom statuses:

* `cancelled` - an event that has been given the status of "cancelled". It still appears on the frontend but its tickets are not listed.
* `postponed` - effectively the same as `cancelled`, but different implied meaning.
* `sold_out` - the same as `cancelled`, but events are also automatically set to "sold out" when there are no more tickets available for purchase or all the datetimes' limits are reached. Note: if the event was initially `private`, when its tickets are sold out, it will not be updated to `sold_out` as that would make it suddenly become publicly visible. Instead, it remains `private`.

### Venues
Like events, venues use WordPress core statuses. Please refer to [event statuses](#events). There are no custom statuses for venues.

### Attendees / Contacts
Unlike events and venues, attendees aren't public by default. So effectively the only statuses for attendees are:

* `publish` - an attendee that was created through event registration (but again, they are not public)
* `trash` - marked as they should be treated as deleted, although there information is technically all still stored

## Statuses of Models with a Foreign Key to the Event Espresso Status Table
Event Espresso adds a table called `wp_esp_status`, whose primary key are 3-character status codes, and contains some extra (mostly unused) meta information about each status.
But for most situations, just knowing the status code of an object is sufficient.

### Message
Messages are the records of emails (and possibly text messages, tweets, etc) that have been sent (or scheduled to be sent) to contacts.

* `MIC` incomplete - the message has not yet been fully generated. The default, initial status.
* `MID` idle - message is waiting to be sent.
* `MSN` sent - the message was succesfully sent with no known error.
* `MFL` failed - the system attempted to send the message, but there was an error.
* `MRS` resend - the message will be resent.
* `MRT` retry - the message was successfully generated, but the messenger was unable to send, but it can be retried.
* `MDO` debug only - if debugging is on, a record is left; otherwise this message would have been deleted.

See the class `EEM_Message` for more information.

### Payments
Payment objects are records of attempts to exchange funds. 
Note: when registrants elect to pay with an offline payment methods (like Check and Invoice) no payment record is created until an event organizer manually records the payment was fulfilled.

* `PFL` failed - there was a technical error while attempting payment. This is also the initial status of payments (which makes sense if there was a fatal error after the payment was created but before it was updated to something else).
* `PPN` pending - The initial status while users are directed offsite for payment. Payments with this status are automatically updated to failed after they are expired
* `PAP` approved - the funds were successfully received, and applied to the transaction.
* `PDC` declined - the payment processor/gateway declined the user's card etc.
* `PCN` cancelled - the payment was initiated (eg the user was sent off-site) but subsequently cancelled the payment

### Registrations
Registrations are reservations for places at the event. 

* `RIC` incomplete -  Initial status for registrations when they are first created. Payments are NOT allowed. Automatically toggled to whatever the default Event registration status is upon completion of the attendee information reg step NO space reserved. Registration is NOT active
* `RNA` not approved - Payments are NOT allowed. Event Admin must manually toggle STS_ID for it to change. No space reserved. Registration is active.
* `RPP` pending payment - Payments are allowed and the status will automatically be toggled to `RAP` if payment is made in full by the attendee. No space reserved. Registration is active
* `RWL` wait list - The registration has been placed on the waiting list (see the wait-list add-on). Payments are allowed. The status will automatically be toggled to RAP if payment is made in full by the attendee. No space reserved. Registration is active.
* `RAP` approved - The registration has been approved (although the transaction may not yet be paid in full). Further payments are permitted if required. A space IS reserved. Registration is active.
* `RCN` cancelled - The registration was cancelled by the registrant. Payments are NOT allowed. NO space reserved. Registration is NOT active
* `RDC` declined - The registration was rejected by the event manager. Payments are NOT allowed. No space reserved. Registration is NOT active

### Transactions
Transactions are basically orders for one or more registrations. Their status is related to registrations, although they can be changed independently.

* `TFL` failed - Either due to a technical reason (server or computer crash during registration), or some other reason that prevent the collection of any useful contact information from any of the registrants.
* `TAB` abandoned - Either due to a technical reason (server or computer crash during registration), or due to an abandoned cart after registrant chose not to complete the registration process HOWEVER... an abandoned TXN differs from a failed TXN in that it was able to capture contact information for at least one registrant. When users are sent for payment offsite, their transaction is immediately updated to "TAB", but updated to something else upon their return.
* `TIN` incomplete - Meaning that monies are still owing
* `TCM` complete - No monies are owing
* `TOP` overpaid - This is the same as complete, but site admins actually owe clients the moneys! 

## Soft Deleted/Archived/Trashable Models
These are models with a special field of type `EE_Trashed_Flag_Field`, which indicates if the item is either soft-deleted/trashed/archived (the terms are used interchangeably.)
Note that when you're querying these models, trashed items are automatically omitted unless you explicitly include them. See their common parent class `EE_Soft_Delete_Base` for helper methods. 

### Datetimes
Trashed datetimes don't appear on the frontend, but are still visible by event managers.

### Tickets
Tickets are automatically archived (trashed) when their price changes.
They can also be explicitly archived. Archived tickets aren't visible on the frontend.

### Message Templates (the model class is `EEM_Message_Template_Group`)
This model is actually for items called "message templates" in the admin.

### Prices
Trashed prices modifiers (eg percent discounts) will continue to apply to tickets that were already using them.
They will not, however, apply to new tickets.

### Price Types
Similar to prices, trashed price types will continue to be used for existing prices of that type. They will not be an option for newly created price modifiers though.

### Questions
Trashed questions do not appear on the frontend, nor can they be added to other question groups while trashed.

### Question Groups
Trashed question groups will continue to appear on the frontend for their related events. 
They cannot, however, be added to other events.

## Other Models
Other models have no status. They live life to the fullest then go out in a blaze of glory. 