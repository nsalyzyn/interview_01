'use client';

import { useRef } from 'react';

export function InvoiceCalculator() {
    const invoiceRef = useRef(null)
    const paycycleRef = useRef(null)
    const paymentRef = useRef(null)

    return (
        <>
            <label>Invoice due date</label>
            <input type="date" name="invoice" ref={invoiceRef} onChange={updatePaymentDate} />
            <br/>
            <label>Monthly paycycle date</label>
            <input type="date" name="paycycle" ref={paycycleRef} onChange={updatePaymentDate} />
            <br/>
            Supplier should expect a payment on: <span ref={paymentRef}>unknown date</span>
        </>
    )

    function updatePaymentDate() {
        const invoice = invoiceRef.current as unknown as HTMLInputElement;
        const paycycle = paycycleRef.current as unknown as HTMLInputElement;
        const payment = paymentRef.current as unknown as HTMLElement;
    
        if (!invoice.value || !paycycle.value) {
            payment.setHTMLUnsafe("unknown date")
            return;
        }
        const invoiceDate = new Date(invoice.value + "T12:00:00")
        const paycycleDate = new Date(paycycle.value + "T12:00:00")
        const payDate = new Date(invoiceDate.valueOf())
        
        payDate.setDate(paycycleDate.getDate())
        if (invoiceDate.getDate() > paycycleDate.getDate()) {
            payDate.setMonth(payDate.getMonth() + 1)
        }
    
        payment.setHTMLUnsafe(payDate.toDateString())
    }    
}