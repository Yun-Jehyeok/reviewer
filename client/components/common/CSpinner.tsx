import { SyncLoader } from 'react-spinners';

export default function CSpinner() {
  return (
    <div className="w-screen h-screen bg-gray-500 bg-opacity-40 z-[9999] flex justify-center items-center fixed top-0 left-0">
      <SyncLoader color="#36d7b7" />
    </div>
  );
}
