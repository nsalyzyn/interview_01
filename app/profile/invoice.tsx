'use client';

export function InvoiceCalculator() {
    return (
        <>
            <label>Invoice due date</label>
            <input type="date" name="invoice" id="invoice" onChange={updatePaymentDate} />
            <br/>
            <label>Monthly paycycle date</label>
            <input type="date" name="paycycle" id="paycycle" onChange={updatePaymentDate} />
            <br/>
            Supplier should expect a payment on: <span id="payment">unknown date</span>
        </>
    )
}


function updatePaymentDate() {
    // TODO: Don't fetch by ID - that's gross
    const invoice = document.getElementById('invoice') as HTMLInputElement;
    const paycycle = document.getElementById('paycycle') as HTMLInputElement;
    const payment = document.getElementById('payment');

    if (!invoice.value || !paycycle.value) {
        payment?.setHTMLUnsafe("unknown date")
        return;
    }
    const invoiceDate = new Date(invoice.value + "T12:00:00")
    const paycycleDate = new Date(paycycle.value + "T12:00:00")
    const payDate = new Date(invoiceDate.valueOf())
    
    payDate.setDate(paycycleDate.getDate())
    if (invoiceDate.getDate() > paycycleDate.getDate()) {
        payDate.setMonth(payDate.getMonth() + 1)
    }

    payment?.setHTMLUnsafe(payDate.toDateString())
}
