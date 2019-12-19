import { defaultDateFormat, defaultTimeFormat } from './defaultDateTimeFormats';

export type DateTimeFormatsProps = {
    dateFormat: string;
    timeFormat: string;
    dateTimeFormat?: string;
}

export const DateTimeFormats = ({ dateFormat, timeFormat }: DateTimeFormatsProps): DateTimeFormatsProps => {
    const formats: DateTimeFormatsProps = {
        dateFormat: dateFormat || defaultDateFormat,
        timeFormat: timeFormat || defaultTimeFormat,
        dateTimeFormat: '',
    };
    return {
        ...formats,
        dateTimeFormat: formats.dateFormat + ' ' + formats.timeFormat
    };
};
