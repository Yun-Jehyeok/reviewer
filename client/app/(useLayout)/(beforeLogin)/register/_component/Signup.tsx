import SignupForm from './SignupForm';

export default function Signup() {
    return (
        <div className="w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center">
            <div className="w-[640px] h-fit bg-white shadow-lg rounded-md flex p-20">
                <div className="w-full">
                    <div className="text-center text-4xl font-bold mb-12">
                        Sign Up
                    </div>

                    <SignupForm />
                </div>
            </div>
        </div>
    );
}
