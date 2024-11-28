/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Product {
    _id: string;
    name: string;
    productId: string;
    unitPrice: number;
    quantity: number;
    variantId: string;
    totalAmount: number;
}
declare interface Variant {
    _id: string;
    variantSearch: Array<string>;
    productId: string;
    isDefault: boolean;
    unitId: UnitID;
    exchangeValue: number;
    barcode: string;
    cost: number;
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    codeSequence: number;
    variantCode: string;
}

declare interface UnitID {
    description: string;
    status: string;
    _id: string;
    name: string;
    branchId: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
}

declare interface ProductBase {
    _id: string;
    status: string;
    name: string;
    aliasName: string;
    typeId: string;
    manufacturerId: string;
    countryId: number;
    groupId: string;
    partnerId: number;
    branchId: number;
    productDetail: ProductDetail;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    codeSequence: number;
    productCode: string;
    category: string;
    productVariants: ProductVariant[];
    productGroup: Manufacturer;
    batches: any[];
    suppliers: any[];
    manufacturer: Manufacturer;
    totalQuantity: number;
    branch: Branch;
    productType: null;
    partner: Partner;
    country: Country;
    productPosition: null;
}

declare interface Branch {
    address: BranchAddress;
    name: string;
    description: string;
    services: any[];
    diseases: any[];
    branchType: string[];
    speciality: any[];
    workingHours: any[];
    photos: any[];
    isPublic: boolean;
    status: string;
    apiKeys: string[];
    _id: number;
    modules: any[];
    slug: string;
    email: string;
    phoneNumber: string;
    logo: string;
    partnerId: number;
    businessRegistrationCertificate: string;
    pharmacyConnectCode: string;
    pharmacyConnectPassword: string;
    pharmacyConnectUsername: string;
    pharmacyRegistrationNumber: string;
    pharmacyType: string;
    practicingCertificateNumber: string;
    professionalQualification: string;
    representativeCertificateNumber: string;
    representativeName: string;
    representativePhoneNumber: string;
    responsiblePersonEmail: string;
    responsiblePersonName: string;
    responsiblePersonPhone: string;
    updatedAt: Date;
    apiKey: string;
    id: string;
}

declare interface BranchAddress {
    street: string;
    wardId: string;
    districtId: string;
    cityId: string;
    ward: string;
    district: string;
    city: string;
}

declare interface Country {
    _id: number;
    name: string;
    internationalName: string;
}

declare interface Manufacturer {
    _id: string;
    description: string;
    status: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date;
    __v?: number;
    branchId: number;
    id?: string;
}

declare interface Partner {
    address: PartnerAddress;
    modules: string[];
    status: string;
    apiKeys: string[];
    _id: number;
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    partnerCode: string;
    logo: string;
    updatedAt: Date;
    apiKey: string;
    id: string;
}

declare interface PartnerAddress {
    cityId: string;
    street: string;
    districtId: string;
    wardId: string;
}

declare interface ProductDetail {
    ingredient: string;
    dosage: string;
    doseInUse: string;
    medicineCode: string;
    registrationNo: string;
    weight: string;
    packagingSize: string;
}

declare interface ProductVariant {
    _id: string;
    variantSearch: string[];
    productId: string;
    isDefault: boolean;
    unitId: Manufacturer;
    exchangeValue: number;
    barcode: string;
    cost: number;
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    codeSequence: number;
    variantCode: string;
}
