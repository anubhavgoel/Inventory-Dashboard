export const orderConstant = {
    paymentMode: [
        { value: 'Cash' },
        { value: 'Card' },
        { value: 'Bank' },
        { value: 'Paytm' }
    ],
    rentType: [
        {value: 'NormalReturn',viewValue:'Normal Return'},
        {value: 'RentRefund',viewValue:'Rent Refund'},
        {value: 'SecurityDeduction',viewValue:'Security Deduction'}
    ],
    rentRefundReason: [
        {value: 'Service Deficiency'},
        {value: 'Size issue'},
        {value: 'other'}
    ],
    securityDeductionReason: [
        {value: 'Late Charge'},
        {value: 'Loss of outfit'},
        {value: 'Adhoc Delivery'},
        {value: 'other'}
    ],
}     