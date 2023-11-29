import { cancelBgFixed } from '@/utils/utils';

interface ILoginModal {
  setModalOpen: (flag: boolean) => void;
}

export default function LoginModal({ setModalOpen }: ILoginModal) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
      <div className="relative w-1/3 h-2/3 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
        <div className="w-full h-full px-12 flex justify-center flex-col">
          <div className="mb-12 text-2xl font-bold">Log In To REVIEWERS</div>

          <form>
            <div className="mb-2 font-medium text-sm">E-Mail</div>
            <div className="w-full h-12 border border-gray-400 rounded-md mb-4 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="email"
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-email"></div>
            </div>

            <div className="mb-2 font-medium text-sm">Password</div>
            <div className="w-full h-12 border border-gray-400 rounded-md mb-6 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="password"
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-pw"></div>
            </div>

            <button className="w-full h-12 text-white bg-black hover:bg-gray-800 rounded-md">
              SIGN IN
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-gray-400">
            Forgot your password?
          </div>
        </div>

        <div
          className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
          onClick={() => {
            setModalOpen(false);
            cancelBgFixed();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
