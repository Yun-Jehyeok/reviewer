import SignupForm from "./SignupForm";

export default function Signup() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.wrapperContainer}>
                    <div className={styles.title}>Sign Up</div>

                    <SignupForm />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: "w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center",
    wrapper: "w-4/5 h-fit bg-white shadow-lg rounded-md flex p-20",
    wrapperContainer: "w-full",
    title: "text-center text-4xl font-bold mb-12",
};
