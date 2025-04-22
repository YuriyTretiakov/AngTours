export interface ITour {
    description: string;
    id: string;
    img: string;
    name: string;
    price: string;
    tourOperator: string;
    type?: string;
    date?: string;
    locationId: string;
    country?: ICountriesResponseItem;
    code?: string;
}
export interface ITourServerResponse {
    tours: ITour[];
}

export interface ITourType {
    // key: string;
    key: 'all' | 'single' | 'group';
    label?: string;
}


export interface ICountriesResponseItem {
    iso_code2: string;
    iso_code3: string;
    name_ru: string;
    flag_url: string;
}
export interface ILocation {
    lat: number;
    lng: number;
}