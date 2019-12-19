import { useContext } from 'react';

import { ConfigDataProps } from './ConfigData';
import { ConfigContext } from '../context/ConfigProvider';
import {
    CurrencyProps,
    CurrentUserProps,
    DateTimeFormatsProps,
    LocaleProps,
    SiteUrlProps,
    TimezoneProps,
} from '../../valueObjects/config';

export const configTypes = {
    CurrencyProps,
    CurrentUserProps,
    DateTimeFormatsProps,
    LocaleProps,
    SiteUrlProps,
    TimezoneProps,
};

export const useConfig = (): ConfigDataProps => useContext(ConfigContext);
