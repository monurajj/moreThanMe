import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-lg border border-neutral-200">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 border-b pb-4">Privacy Policy</h1>
                <p className="text-sm text-neutral-500 mb-8 font-medium">Last Updated: February 20, 2026</p>

                <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">1. Introduction</h2>
                        <p>
                            Welcome to our platform (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting the privacy and security of our users (&quot;you,&quot; &quot;your,&quot; or &quot;participant&quot;). Our website organizes workshops, skill development sessions, and various campus-based educational events.
                        </p>
                        <p>
                            This Privacy Policy explains how we collect, use, and safeguard your information when you access our platform or register for an event. We ensure that our practices align with applicable data protection standards. By continuing to use our website and registering for events, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">2. Information We Collect</h2>
                        <p>
                            In order to provide you with seamless event registration and updates, we collect only the necessary information. We strictly limit our collection to basic user data, which includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Name:</strong> To identify you as a participant and issue certificates or event passes.</li>
                            <li><strong>Email Address:</strong> To send registration confirmations, event schedules, and important updates.</li>
                            <li><strong>Phone Number:</strong> To contact you for urgent notifications or coordinate during the event.</li>
                        </ul>
                        <p className="mt-2">
                            We do not collect any sensitive personal data, background information, or extended profiles beyond what is explicitly mentioned above.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">3. How We Use Your Information</h2>
                        <p>
                            Your trust is our priority. Therefore, we ensure that the basic user data collected is solely used for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Communication:</strong> Sending you necessary event information, schedule changes, or prompt responses to your inquiries.</li>
                            <li><strong>Event Management:</strong> Verifying your identity at the venue, allocating seating or resources, and ensuring smooth operations during workshops and skill development sessions.</li>
                        </ul>
                        <p className="mt-2">
                            We do not sell, rent, trade, or distribute your email or phone number to any marketing agencies or unassociated third parties. Your data remains strictly internal for the purpose of the events you registered for.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">4. Payment Processing</h2>
                        <p>
                            Our platform collects fixed participation fees for event registration. We prioritize your financial security and privacy by not handling the transactions directly on our infrastructure.
                        </p>
                        <p>
                            All payments are processed via a secure third-party payment gateway. Consequently, the website does not store card details, UPI IDs, passwords, or any payment credentials on its servers. When initiating a transaction, you will securely interact with the payment processor, whose independent privacy policy and terms govern the payment handling process.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">5. Data Protection and Security</h2>
                        <p>
                            We adopt robust data collection, storage, and processing practices, complemented by stringent security measures, to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We limit access to your basic user data exclusively to authorized personnel directly involved in event coordination and administration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">6. Cookies and Tracking</h2>
                        <p>
                            Our website may use fundamental browsing enhancements to improve the user experience. However, we do not employ extensive tracking technologies, profiling tools, or invasive behavioral tracking. Any temporary data utilized during your session is primarily to maintain the reliability and performance of our online event registration forms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">7. Limitation of Liability</h2>
                        <p>
                            While we endeavor to implement the best commercially viable security practices, no method of transmission over the internet or electronic storage is completely infallible. Therefore, we cannot guarantee absolute security. To the maximum extent permitted by applicable law, we shall not be held liable for any indirect, incidental, special, consequential, or punitive damages, including data theft or breaches resulting from circumstances beyond our reasonable control or due to unforeseeable cyber-attacks.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">8. Changes to this Privacy Policy</h2>
                        <p>
                            We reserve the right to revise, update, or amend this Privacy Policy at our discretion to reflect changes in legal requirements or our operational scope. When we do, we will update the &quot;Last Updated&quot; date at the top of this page. We encourage participants to periodically review this page to stay informed about how we protect their personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">9. Governing Law</h2>
                        <p>
                            This Privacy Policy and any disputes arising directly or indirectly from it shall be exclusively governed by and construed in accordance with the laws of India, irrespective of conflict of law principles. Any legal action or procedural proceedings shall be addressed under the jurisdiction of competent courts in India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary-700 mb-3">10. Contact Us</h2>
                        <p>
                            Should you have any questions or require clarifications regarding this Privacy Policy or our data handling practices, please contact our support team. We value your participation and are committed to resolving your concerns promptly and professionally.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
