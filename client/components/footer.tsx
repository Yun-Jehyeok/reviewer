export default function Footer() {
  return (
    <div className="w-full mt-32">
      <div className="w-full bg-black h-96 flex flex-col justify-center text-white">
        <div className="w-full px-20 flex justify-between m-auto max-w-[1730px]">
          <div>
            <div className="text-3xl font-bold mb-6">REVIEWERS</div>
            <div className="text-sm text-gray-500">
              Complete your style with awesome
              <br />
              clothes from us.
            </div>
          </div>
          <div className="flex gap-32">
            <div className="flex flex-col gap-6">
              <div>Company</div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                About
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Contact us
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Support
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Careers
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>Quick Link</div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Share Location
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Orders Tracking
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Size Guide
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                FAQs
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>Legal</div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Terms & conditions
              </div>
              <div className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit">
                Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
