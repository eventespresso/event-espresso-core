import { defaultDateFormat, defaultTimeFormat } from './defaults';

export type DateTimeFormatsProps = {
    dateFormat: string;
    timeFormat: string;
}

export const DateTimeFormats = ({ dateFormat, timeFormat }: DateTimeFormatsProps): DateTimeFormatsProps => {
    return {
        dateFormat: dateFormat || defaultDateFormat,
        timeFormat: timeFormat || defaultTimeFormat,
    };
};
