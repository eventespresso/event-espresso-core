import { defaultDateFormat, defaultTimeFormat } from './defaultDateTimeFormats';

export type DateTimeFormatsProps = {
    dateFormat: string;
    timeFormat: string;
    dateTimeFormat?: string;
}

export const DateTimeFormats = (formats: DateTimeFormatsProps): DateTimeFormatsProps => {
    const maybeDefault = {
        dateFormat: formats.dateFormat || defaultDateFormat,
        timeFormat: formats.timeFormat || defaultTimeFormat,
        dateTimeFormat: '',
    };
    return {
        ...maybeDefault,
        dateTimeFormat: maybeDefault.dateFormat + ' ' + maybeDefault.timeFormat
    };
};
