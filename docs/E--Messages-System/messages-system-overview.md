# Messages System Overview

The Messages system in Event Espresso 4 is an internal library that handles all the notifications for various events triggered by the code. It is built as a modular system to make it easier to extend.

## Core Components

The following gives an overview of the core components that make up the system:

### Messengers, Message Types and Contexts

#### Messengers
In the EE messages system, *messengers* refer to the code used to *transport* messages.  These are represented by objects extending the `EE_messenger` class.  Example messengers are:  `EE_Email_messenger`, which is used to transport messages via email; `EE_Html_messenger` which is used to transport messages via html (display in the browser); and `EE_Pdf_messenger` which is used to transport messages via .pdf (display/serve as pdf document format).

#### Message Types
Message Types describe the *kind* of message that is being sent.  Generally speaking, the message type has a close correlation to what triggers a message generation/sending.  Example message types are `EE_Registration_message_type` (triggered whenever a registration is approved),  `EE_Ticketing_message_type` (triggered when a printed ticket is requested - and this is also a message type made available via add-on), and `EE_Invoice_message_type` (triggered when a invoice is requested).

#### Contexts
Contexts are a property of Message Types that help describe variations of content that might get used for generated messages of that message type.  *Usually* the term context is equivalent to _recipient_ but that is not hard-coded because it keeps things flexible for when context might represent something other than a recipient.  For example, the `EE_Registration_message_type` indicates three different contexts `admin` (content intended for the event author), `primary_registrant` (content intended for the primary registration), and `registrant` (content intended for all registrants)`.  Contexts can be enabled/disabled by user's via the Messages system template UI and whenever messages are triggered, there will end up being one message for each active context.  The variation of content in the generated messages between contexts is thus customizable by event administrators.

### Generating vs Sending Messengers
Please see more information on this [here](http://developer.eventespresso.com/docs/generating-messengers-vs-sending-messengers/).

### Messages Template system
More info on the Messages Template system can be found [here](overview-message-template-packs-variations.md).

### Message Models
**EE_Message** is used to represent the message resource as it exists in the database.  CRUD for this resource are handled via the corresponding **EEM_Message** model.

**EE_Message_Factory** is a class used for creating the `EE_Message` entity from data fed it.  `EEM_Message` uses this, and it is also used when generating default `EE_Message` objects not persisted to the db yet. 

Prior to EE4.9, Message resources were passed through the code as a stdClass object and did not persist to the database.  IN EE 4.9 a major new feature for the Messages System is the introduction of a queue system and the tracking of messages.  The message entity is a full representation of a message in various states as represented by a status code (`STS_ID` in the db).  The stati that represent the different states are:

**EEM_Message::status_sent**
Code in the db is `MSN`
This represents that the message was *sent* at the time indicated in the `MSG_modified` timestamp.

**EEM_Message::status_idle**
Code in the db is `MID`
This represents that the message has been generated and is waiting to be sent.

**EEM_Message::status_failed**
Code in the db is `MFL`
This represents that there was an attempt to send *or* generate this message at teh scheduled time, but it failed at the timestamp indicated in the `MSG_modified` column.  Any errors are saved with the `EE_Message` resource so one can find out what the cause was for the fail.

**EEM_Message::status_resend**
Code in the db is `MRS`
This represents a message that has already been sent at least once, but it is  currently flagged for resending. The `MSG_modified` column indicates the timestamp when this flag was set.

**EEM_Message::status_incomplete**
Code in the db is `MIC`

Indicates a message that is in its initial state and has not been generated yet.  All `EE_Message` resource objects begin with this status when first created. **Very Important:** Entities with this status very likely, and usually, will result in multiple EE_Message objects being subsequently generated from the original incomplete entity.  This is because the `MIC` `EE_Message` resource contains instructions for what to generate and there may be multiple contexts/recipients for the same set of data.  So one EE_Message entity with the status of `MIC` does not always mean only one `EE_Message` entity will be created on generation.

**EEM_Message::status_retry**
Code in the db is `MRT`
This indicates a message that was successfully generated, but unable to be sent by the attached messenger.  This may have occurred because of an error with the messenger.  An example where this could happen is if a third party email handler is being used and it was not setup correctly.  The error is saved with the entity so it can be viewed.  The difference between this status and `EEM_Message::status_failed` is that this status can be retried for sending, whereas `MFL` messages cannot be retried.  At the time of writing this doc, the messages system *does not* automatically retry sending messages with this status.  Manual triggering of a retry is required. 

### Controllers

The main controller for the messages system is the `EED_Messages` module.  This directs all incoming requests to the appropriate business classes for handling the request.

The secondary controller for the messages system is the `EE_Messages_Scheduler`.  This class is primarily used for scheduling the wp-cron jobs that will handle batch processing of messages, and for spawning separate requests for any messages processing.

### Repositories/Collections
There are a number of classes that serve as repositories/collections for various message related resources.

#### EE_Message_Type_Collection
This holds all the installed EE_message_type objects.

#### EE_Messenger_Collection
This holds all the installed EE_messenger objects.

#### EE_Message_Repository
This used as a repository of EE_Message objects being processed.

#### EE_Messages_Data_Handler_Collection
This holds all the various EE_Messages_incoming_data objects.

#### EE_Messages_Template_Group_Collection
This holds EE_Message_Template_Group entities retrieved from the db.

### Data Transport/Converter classes
In the messages system, there are a number of classes used for building objects serving as data transports and/or converters.

#### Data Handlers
Theses are children of the `EE_Messages_incoming_data` class.  Each message type indicates what Data Handler is used to _prepare_ data for when that message type is used to _generate_ a message.  Data Handlers are used for both converting data provided by a trigger, and for caching it and transporting it throughout the messages flow where it ultimately gets used by the messages shortcode parser when parsing templates and generating content for each message.  The data handlers server two main purposes:

1. Ensuring that data is in a consistent format to be used for generating content.
2. Cache all data that might be used in the message being generated to keep database hits to a minimum while parsing content and generating the message.

#### EE_Message_To_Generate (and children)
These are transition objects used for carrying rudimentary info about the messages prior to generation.  

#### EE_Message_Addressee
This is a transport object that is used by EE_Messages_Generator and created from data found in `EE_Messages_incoming_data` object by `EE_message_type` objects.  This contains structured data representing the recipient of the message.

### Business Logic and Helper Classes
There are a number of business logic and helper classes used for processing messages:

#### EE_Message_Type_Collection_Loader
This class contains the EE_Message_Type_Collection and takes care of loading all installed `EE_message_type` objects into the collection.

#### EE_Messenger_Collection_Loader
This class contains the EE_Messenger_Collection and takes care of loading all installed `EE_messenger` objects into the collection.

#### EE_Message_Resource_Manager
This is one of the more important classes in the messages system.  Anytime a message type or messenger is requested, the request goes through this object.  It has a number of methods used for verifying message types and messengers.  The `EE_Message_Resource_Manager` is also loaded at the beginning of every request to take care setting the active messenger and message type property and representing that to client code.

#### EE_Messages_Queue
`EE_Messages_Queue` holds an instance of `EE_Message_Repository` and is used for adding/removing/searching `EE_Message` objects being processed. It also: 
- batch retrieves and processses `EE_Message` objects already in the db.  
- executes the send logic for each `EE_Message`.
- monitors and provides rate-limiting and batch limits on messages being processed.

#### EE_Messages_Processor
This contains the majority of the business logic for processing message activity.  

#### EE_Messages_Generator
Essentially, this class is responsible for generating `EE_Message` objects so they are ready for sending.
This involves:
- preparing the initial `EE_Message` object (`EEM_Message::status_incomplete`) that is used as the reference for generation.
- Retrieving `EEM_Message::status_incomplete` objects from the database, and utilizing the info contained within to generate the resulting `EEM_Message::status_idle` `EE_Message` objects ready for sending.

#### EEH_MSG_Template
This is a helper class that is used for handling any display logic related to messages.
