import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Organization Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="font-bold text-2xl flex items-center mb-4">
              <span className="text-primary-600">morethan</span>
              <span className="italic ml-1 text-primary-600">me</span>
            </Link>
            <p className="text-neutral-300 mb-4 leading-relaxed">
              A student-led charitable initiative from Rishihood University, dedicated to uplifting communities across India through compassion, service, and meaningful change.
            </p>
            <p className="text-sm text-neutral-400">
              Registered Student Organization<br />
              Rishihood University, Batch 2023
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <div>
                <p className="font-medium text-neutral-200">Email</p>
                <p>morethanme.ngo@gmail.com</p>
              </div>
              <div>
                <p className="font-medium text-neutral-200">Phone</p>
                <p className="mb-1"><a href="tel:+917541062514" className="hover:text-white transition-colors">+91 75410 62514</a></p>
                <p><a href="tel:+918679144515" className="hover:text-white transition-colors">+91 86791 44515</a></p>
              </div>
              <div>
                <p className="font-medium text-neutral-200">Address</p>
                <p>Rishihood University<br />Sonipat, Haryana, India</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-neutral-300 hover:text-white transition-colors">About Us</Link>
              <Link href="/our-family" className="block text-neutral-300 hover:text-white transition-colors">Our Family</Link>
              <Link href="/transparency" className="block text-neutral-300 hover:text-white transition-colors">Transparency</Link>
              <Link href="/contact" className="block text-neutral-300 hover:text-white transition-colors">Contact</Link>
              <Link href="/joinUs" className="block text-neutral-300 hover:text-white transition-colors">Join Us</Link>
              <Link href="/donate" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded font-medium transition-colors">Donate Now</Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-neutral-700 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-400">
            <div>
              <p>&copy; {new Date().getFullYear()} More Than Me Initiative. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 