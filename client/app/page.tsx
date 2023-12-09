import Footer from "@/components/footer";
import Navigation from "@/components/nav";

export default function Home() {
  return (
    <div className="w-full">
      <Navigation />

      <div className="w-full px-20">
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl"></div>
      </div>

      <div className=" w-full text-3xl font-extrabold py-16 px-20">BEST REVIEWERS</div>
      <div className="w-full px-20 flex justify-between gap-12">
        <div className="w-1/3 cursor-pointer">
          <div className="w-full h-[540px] bg-[#9C9C9C] rounded-xl"></div>
          <div className="w-full flex justify-between mt-4">
            <div>
              <div className="text-lg font-bold">Hoodies & Sweetshirt</div>
              <div className="text-[#7F7F7F] text-sm">Explore Now!</div>
            </div>
            <div className="flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-1/3 cursor-pointer">
          <div className="w-full h-[540px] bg-[#B29BC7] rounded-xl"></div>
          <div className="w-full flex justify-between mt-4">
            <div>
              <div className="text-lg font-bold">Coats & Parkas</div>
              <div className="text-[#7F7F7F] text-sm">Explore Now!</div>
            </div>
            <div className="flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-1/3 cursor-pointer">
          <div className="w-full h-[540px] bg-[#B1DAD8] rounded-xl"></div>
          <div className="w-full flex justify-between mt-4">
            <div>
              <div className="text-lg font-bold">Tees & T-Shirt</div>
              <div className="text-[#7F7F7F] text-sm">Explore Now!</div>
            </div>
            <div className="flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full text-3xl font-extrabold py-16 px-20 mt-8">NEW REVIEWERS</div>
      <div className="w-full px-20 flex justify-between gap-12">
        <div className="w-1/3 cursor-pointer">
          <div className="w-full h-[540px] bg-[#9C9C9C] rounded-xl"></div>
          <div className="w-full flex justify-between mt-4">
            <div>
              <div className="text-lg font-bold">Hoodies & Sweetshirt</div>
              <div className="text-[#7F7F7F] text-sm">Explore Now!</div>
            </div>
            <div className="flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-1/3 cursor-pointer">
          <div className="w-full h-[540px] bg-[#B29BC7] rounded-xl"></div>
          <div className="w-full flex justify-between mt-4">
            <div>
              <div className="text-lg font-bold">Coats & Parkas</div>
              <div className="text-[#7F7F7F] text-sm">Explore Now!</div>
            </div>
            <div className="flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-1/3 cursor-pointer">
          <div className="w-full h-[540px] bg-[#B1DAD8] rounded-xl"></div>
          <div className="w-full flex justify-between mt-4">
            <div>
              <div className="text-lg font-bold">Tees & T-Shirt</div>
              <div className="text-[#7F7F7F] text-sm">Explore Now!</div>
            </div>
            <div className="flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
