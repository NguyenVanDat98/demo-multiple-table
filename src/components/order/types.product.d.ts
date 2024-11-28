declare interface ProductBase {
    _id:                string;
    manufacturerId:     string;
    productGroupId:     string;
    images:             string[];
    productDetail:      ProductDetail;
    name:               string;
    type:               string;
    supplierId:         string;
    saleLevel:          string;
    branchId:           number;
    codeBySupplier:     string;
    stock:              number;
    createdAt:          Date;
    updatedAt:          Date;
    __v:                number;
    tenantId:           number;
    priceDefault:       number;
    searchField:        string[];
    supplier:           Supplier;
    variants:           Variant[];
    selectVariant:      string;
    cumulativeDiscount: CumulativeDiscount[];
    summaryDiscount:    SummaryDiscount;
    productGroup:       Manufacturer;
    manufacturer:       Manufacturer;
}

declare interface CumulativeDiscount {
    _id:                 string;
    condition:           Condition;
    applyVariantId:      string;
    typeReward:          string;
    typeRepeat:          string;
    timesReward:         number;
    value:               number;
    name:                string;
    valueType:           string;
    target:              string;
    targetType:          string;
    targetId:            string;
    typeDiscount:        string;
    status:              string;
    code:                number;
    itemReward:          ItemReward;
    applyTimeSheetValid: null;
    actualValue:         number;
}

declare interface Condition {
    gte:      number;
    lte:      number;
    isRanger: boolean;
}

declare interface ItemReward {
    name:     string;
    quantity: number;
}

declare interface Manufacturer {
    name: string;
    _id:  string;
    id:   string;
}

declare interface ProductDetail {
    package:    string;
    element:    string;
    country:    number;
    dosageForm: string;
}

declare interface SummaryDiscount {
    core:          number;
    soft:          number;
    lk:            number;
    rewardItem:    number;
    rewardProduct: number;
}

declare interface Supplier {
    _id:         string;
    name:        string;
    code:        string;
    address:     Address;
    phoneNumber: string;
}

declare interface Address {
    street:     string;
    wardId:     string;
    districtId: string;
    cityId:     string;
}

declare interface Variant {
    _id:              string;
    productUnit:      string;
    exchangeValue:    number;
    price:            number;
    variantIsDefault: boolean;
    cost:             number;
    variantCode:      string;
    unit:             Unit;
    weight?:          number;
}

declare interface Unit {
    name: string;
    _id:  string;
}
