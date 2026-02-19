import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FFF8F3] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#F2E3DB] space-y-8">
          
          <div className="border-b border-[#F2E3DB] pb-6 mb-8">
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-[#4E342E] mb-4">Privacy Policy</h1>
            <p className="text-[#8D6E63] text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>

          <div className="space-y-6 text-[#4E342E] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
              <p className="text-[#8D6E63]">
                Welcome to Ciste Blasta. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. The Data We Collect</h2>
              <p className="text-[#8D6E63] mb-2">To provide you with our delicious baked goods and seamless delivery, we collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#8D6E63]">
                <li><strong>Identity Data:</strong> First name, last name, and account credentials.</li>
                <li><strong>Contact Data:</strong> Delivery address, billing address, email address, and telephone numbers.</li>
                <li><strong>Location Data:</strong> GPS coordinates (latitude and longitude) used strictly to calculate accurate delivery distances and charges.</li>
                <li><strong>Transaction Data:</strong> Details about payments and other details of products you have purchased from us.</li>
                <li><strong>Feedback Data:</strong> Any reviews, feedback, or custom instructions you leave on our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. How We Use Your Data</h2>
              <p className="text-[#8D6E63] mb-2">We will only use your personal data for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#8D6E63]">
                <li>To register you as a new customer and manage your account.</li>
                <li>To process and deliver your order, including sending WhatsApp or Email notifications regarding order status.</li>
                <li>To calculate accurate delivery fees based on your location.</li>
                <li>To manage our relationship with you, including asking you to leave a review or take a survey.</li>
                <li>To improve our website, products/services, marketing, and customer relationships.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
              <p className="text-[#8D6E63]">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Passwords are encrypted, and we restrict access to your personal data to employees and delivery partners who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Data Sharing</h2>
              <p className="text-[#8D6E63]">
                We <b>do not</b> sell your personal data to third parties. We may share your data with trusted third parties strictly for operational purposes, such as our delivery executives who need your address and phone number to hand over your order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
              <p className="text-[#8D6E63]">
                You have the right to request access to the personal data we hold about you, request corrections to your data through your Profile dashboard, and request the deletion of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Contact Us</h2>
              <p className="text-[#8D6E63]">
                If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:hello@cisteblasta.com" className="text-[#D98292] hover:underline">hello@cisteblasta.com</a> or visit our <Link href="/contact" className="text-[#D98292] hover:underline">Contact Page</Link>.
              </p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}