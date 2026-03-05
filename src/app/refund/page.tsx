import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-lg border border-neutral-200">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 border-b pb-4">
          Refund Policy
        </h1>
        <p className="text-sm text-neutral-500 mb-8 font-medium">
          Last Updated: March 4, 2026
        </p>

        <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              1. Overview
            </h2>
            <p>
              MoreThanMe is a student-led initiative that raises funds to
              support social projects and community work. Donations made through
              this website are voluntary contributions intended to support these
              initiatives and are not payments for commercial products or
              services.
            </p>
            <p>
              This Refund Policy explains the limited circumstances in which we
              can consider returning a donation. By donating through this
              Platform, you acknowledge and agree to the terms below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              2. General rule – donations are non-refundable
            </h2>
            <p>
              Once a donation has been successfully made and credited to the
              bank account displayed on our website, it is generally{" "}
              <strong>non-refundable</strong>. Funds are often quickly allocated
              towards ongoing or planned activities, and reversing donations can
              disrupt this planning.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              3. When a refund may be considered
            </h2>
            <p>
              In rare cases, we may consider a refund request at our discretion
              in situations such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Duplicate donations</strong> – you accidentally donated
                the same amount more than once within a short period of time.
              </li>
              <li>
                <strong>Clear technical error</strong> – a payment was
                processed incorrectly (for example, an amount significantly
                different from what you intended due to a clear input or system
                error).
              </li>
            </ul>
            <p className="mt-2">
              Change of mind or personal reasons alone will normally{" "}
              <strong>not</strong> qualify for a refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              4. How to request a refund
            </h2>
            <p>
              If you believe you are eligible for a refund under the situations
              described above, please contact us as soon as possible (ideally
              within <strong>7 days</strong> of the donation) using the details
              on our <strong>Contact</strong> page and provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Your full name and contact number.</li>
              <li>
                Date and approximate time of the donation, along with the UPI
                or transaction reference ID.
              </li>
              <li>The exact amount donated.</li>
              <li>A brief explanation of the issue (duplicate, error, etc.).</li>
            </ul>
            <p className="mt-2">
              Sharing a screenshot of your payment confirmation will help us
              verify the request faster.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              5. Processing approved refunds
            </h2>
            <p>
              If we approve a refund request, the amount will be returned to the
              original payment source (for example, the same bank account or UPI
              handle used to make the donation). We do not issue cash refunds.
            </p>
            <p>
              The time taken for the refunded amount to reflect in your account
              may vary depending on your bank or payment service provider but
              typically takes between <strong>5–10</strong> working days after
              processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              6. No liability for third-party charges
            </h2>
            <p>
              We are not responsible for any charges, fees or deductions applied
              by your bank, UPI app or payment service provider before or after
              a donation or refund (for example, currency conversion fees,
              service charges or delays).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              7. Disputes and chargebacks
            </h2>
            <p>
              Before raising a dispute or chargeback with your bank or payment
              service, we encourage you to first contact us so that we can try
              to resolve the issue directly. Unfounded or fraudulent disputes
              may affect our ability to continue our work and can be contested
              by us with supporting records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              8. Changes to this Refund Policy
            </h2>
            <p>
              We may update this Refund Policy from time to time to reflect
              changes in our activities or applicable regulations. The updated
              version will be posted on this page with a revised &quot;Last
              Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-3">
              9. Governing law
            </h2>
            <p>
              This Refund Policy is governed by the laws of India. Any disputes
              arising in connection with donations or refunds shall be subject
              to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
