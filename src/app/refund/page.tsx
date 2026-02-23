import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-lg border border-neutral-200">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 border-b pb-4">Refund Policy</h1>
                <p className="text-sm text-neutral-500 mb-8 font-medium">Last Updated: February 23, 2026</p>

                <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">1. Overview</h2>
                        <p>
                            Our platform focuses exclusively on delivering educational value by organizing workshops, skill development sessions, and campus-based educational events. To cover the logistical, instructional, and operational expenses of these gatherings, we collect fixed participation fees. We clearly and explicitly state that payments made on this platform are for event participation fees only.
                        </p>
                        <p>
                            We aim to ensure transparency and clarity regarding the financial commitments of our users. This Refund Policy delineates the exact conditions under which a financial reimbursement may be issued. By paying the registration fee for an event, you acknowledge and accept the terms set forth herein.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">2. Cancellation by the Organizer</h2>
                        <p>
                            We invest considerable effort into the planning and execution of our events to ensure they run as scheduled. However, situations outside of our direct control, or logistical complications, may necessitate the amendment of schedules. Refunds should only apply if an event is cancelled by the organizer.
                        </p>
                        <p>
                            If we officially cancel a workshop or skill development session and are unable to provide an adequate alternative date or substitute event that meets the original criteria, participants who have successfully paid their registration fees will be eligible for a full refund. The decision to cancel and the subsequent authorization of refunds rest solely within the organizer&apos;s discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">3. Participant No-Shows and Cancellations</h2>
                        <p>
                            We secure venues, materials, and instructors based on the number of confirmed registrations. Therefore, there are absolutely no refunds for participant no-shows. If you successfully register and pay the event participation fee but fail to attend the event for any personal, medical, professional, or logistical reason, your fee will be forfeited.
                        </p>
                        <p>
                            Additionally, if a participant chooses to cancel their registration voluntarily prior to the event, they remain ineligible for any refund. We highly encourage participants to carefully consider their schedules prior to committing to the event registration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">4. Non-Transferable Tickets</h2>
                        <p>
                            Standard event participation passes are issued directly to the individual whose fundamental details (name, email, and phone number) were provided during registration. Tickets and passes are non-transferable unless explicitly stated otherwise for a specific event. You may not sell, barter, or unilaterally transfer your event registration to another individual.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">5. Refund Processing Mechanism</h2>
                        <p>
                            When a refund is approved exclusively due to an event cancellation by the organizer, the reimbursement process will be initiated automatically. Please note that payments are processed via a secure third-party payment gateway, and we do not store your direct financial instruments.
                        </p>
                        <p>
                            The refund will be credited back to the original source of the payment (e.g., the specific credit card, debit card, or UPI account used during registration). Processing times fluctuate depending on the third-party payment gateway and your corresponding financial institution&apos;s policies, typically taking between 5 to 10 standard business days to reflect on your statement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">6. Limitation of Liability</h2>
                        <p>
                            In the unlikely scenario of an event cancellation, the organizer&apos;s utmost liability is strictly limited to the refund of the event participation fee actually received. We will not be accountable for any ancillary, indirect, or consequential expenses, damages, or losses incurred by the participant, including but not limited to travel arrangements, accommodation costs, or loss of anticipated educational benefit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">7. Governing Law</h2>
                        <p>
                            This Refund Policy, its execution, and any complications resulting from it shall be governed by and constructed in accordance with the laws of India. All participants agree that any dispute or administrative challenge over refunds shall be managed under the exclusive legal jurisdiction of India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">8. Adjustments to Policy</h2>
                        <p>
                            We maintain the right to adjust, evolve, or modify this Refund Policy. The revised terms will be publicly uploaded on our website, maintaining the core foundational rule that refunds are strictly restricted to organizer-initiated cancellations.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
