import {Currency, CurrencyProps} from '../../valueObjects/config/Currency';
import {CurrentUser, CurrentUserProps} from '../../valueObjects/config/CurrentUser';
import {DateTimeFormats, DateTimeFormatsProps} from '../../valueObjects/dateTime/DateTimeFormats';
import {Locale, LocaleProps} from '../../valueObjects/config/Locale';
import {SiteUrl, SiteUrlProps} from '../../valueObjects/config/SiteUrl';
import {Timezone, TimezoneProps} from '../../valueObjects/config/Timezone';

const { eejsdata }: eeJsProps = window;
const { data }: eeJsDataProps = eejsdata;

type eeJsProps = {
    data: object;
};

type eeJsDataProps = {
    brandName: string;
    currency_config: CurrencyProps;
    eejs_api_nonce: string;
    locale: object;
    nonce: string;
    paths: eeJsDataPathsProps;
    default_timezone: eeJsDataTimezoneProps;
};

type eeJsDataPathsProps = {
    admin_url: string;
    site_url: string;
};

type eeJsDataTimezoneProps = {
    pretty: string;
    string: string;
    offset: number;
};

export type ConfigProps = {
    brandName: string;
    currency: CurrencyProps;
    currentUser: CurrentUserProps;
    dateTimeFormats: DateTimeFormatsProps;
    locale: LocaleProps;
    nonce: string;
    siteUrl: SiteUrlProps;
    timezone: TimezoneProps;
}

export const ConfigData: ConfigProps = {
    brandName: data.brandName || 'Event Espresso',
    currency: Currency(data.currency_config),
    currentUser: CurrentUser({} as CurrentUserProps),
    dateTimeFormats: DateTimeFormats({} as DateTimeFormatsProps),
    locale: Locale({
        user: data.locale && data.locale.user ? data.locale.user : '',
        site: data.locale && data.locale.site ? data.locale.site : '',
    }),
    nonce: data.eejs_api_nonce || '',
    siteUrl: SiteUrl({
        admin: data.paths && data.paths.admin_url ? data.paths.admin_url : '',
        home: data.paths && data.paths.site_url ? data.paths.site_url : '',
    }),
    timezone: Timezone({
        city: data.default_timezone && data.default_timezone.pretty ? data.default_timezone.pretty : '',
        name: data.default_timezone && data.default_timezone.string ? data.default_timezone.string : '',
        offset: data.default_timezone && data.default_timezone.offset ? data.default_timezone.offset : 0,
    }),
};
