/**
 * This file exposes fixtures used for testing model-entity factory related
 * code
 */

// schemas
export { EventSchema, EventSchemaProperties } from './event-schema';
export { DateTimeSchema, DateTimeSchemaProperties } from './datetime-schema';
export { CheckinSchema, CheckinSchemaProperties } from './checkin-schema';
export { TicketSchema, TicketSchemaProperties } from './ticket-schema';
export {
	RegistrationSchema,
	RegistrationSchemaProperties,
} from './registration-schema';

// response examples
export { AuthedDateTimeResponse } from './datetime-response-authed';
export { EventResponse } from './event-response-non-authed';
export { AuthedEventResponse } from './event-response-authed';
export {
	PasswordProtectedEventResponse,
} from './event-response-password-protected-authed';
export { AuthedCheckinResponse } from './checkin-response-authed'
export { AuthedTicketResponse } from './ticket-response-authed';

// factories
export * from './factories';

// example entities (constructed from authed responses and the corresponding
// factory)
export * from './entities';