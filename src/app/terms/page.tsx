import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FFF8F3] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#F2E3DB] space-y-8">
          
          <div className="border-b border-[#F2E3DB] pb-6 mb-8">
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-[#4E342E] mb-4">Terms of Service</h1>
            <p className="text-[#8D6E63] text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>

          <div className="space-y-6 text-[#4E342E] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3">1. Agreement to Terms</h2>
              <p className="text-[#8D6E63]">
                By accessing or using the Ciste Blasta website and purchasing our products, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Products & Orders</h2>
              <ul className="list-disc pl-5 space-y-2 text-[#8D6E63]">
                <li><strong>Artisanal Nature:</strong> All our cakes and chocolates are handcrafted. Slight variations in color, design, and finish from the images on our website may occur.</li>
                <li><strong>Order Acceptance:</strong> An order is only considered confirmed once the status is updated to "CONFIRMED" by our team. We reserve the right to refuse or cancel any order for reasons including, but not limited to, ingredient unavailability or delivery constraints.</li>
                <li><strong>Custom Orders:</strong> Base prices for custom cakes are estimates. Final pricing may vary based on design complexity and size, which will be communicated before preparation begins.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Delivery Policy</h2>
              <p className="text-[#8D6E63] mb-2">
                We take utmost care in delivering our fragile products:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#8D6E63]">
                <li>Delivery charges are calculated dynamically based on your location and distance from our kitchen.</li>
                <li>Customers must ensure someone is available at the provided address to receive the delivery. Since our products are perishable, we cannot accept responsibility for items left outside or returned to us due to unavailability.</li>
                <li>We strive to meet specific delivery timelines, but minor delays due to traffic or weather conditions may occur.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Cancellations & Refunds</h2>
              <ul className="list-disc pl-5 space-y-2 text-[#8D6E63]">
                <li><strong>Perishable Goods:</strong> Due to the perishable nature of our products, we do not accept returns.</li>
                <li><strong>Cancellations:</strong> Orders can be cancelled for a full refund only if the status is "PENDING". Once preparation has begun (Status: "PREPARING"), the order cannot be cancelled or refunded.</li>
                <li><strong>Damaged Items:</strong> If your product arrives damaged, please take a photograph immediately and contact us within 2 hours of delivery. We will review the issue and issue a replacement or refund at our sole discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Intellectual Property</h2>
              <p className="text-[#8D6E63]">
                All content on this website, including product images, logos, text, and graphics, is the property of Ciste Blasta and is protected by copyright laws. You may not reproduce, distribute, or use this content without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
              <p className="text-[#8D6E63]">
                Ciste Blasta shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or website. For customers with food allergies, while we take precautions, our kitchen handles ingredients like dairy, nuts, and gluten. Please communicate any severe allergies prior to ordering.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Contact Information</h2>
              <p className="text-[#8D6E63]">
                If you have questions about these Terms, please contact us at <a href="mailto:hello@cisteblasta.com" className="text-[#D98292] hover:underline">hello@cisteblasta.com</a> or visit our <Link href="/contact" className="text-[#D98292] hover:underline">Contact Page</Link>.
              </p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}