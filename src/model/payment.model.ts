export class Payment {
    constructor(
        public Name: string,
        // must be either 'bank' or 'card'
        public PaymentType: string,
        public CardInfo?: CardInfo,
        public BankInfo?: BankInfo
    ) { }
}

export class CardInfo {
    constructor(
        // must be visa, master, amex
        public CardNo: string,
        public CardHolder: string,
        // must be format MM/YY
        public ExpiryDate: string
    ) { }
}

export class BankInfo {
    constructor(
        public AccountNo: string,
        public AccountHolder: string,
        public RoutingNo: string) { }
}