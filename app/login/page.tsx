export default function Login() {
    return (
        <div>
            <form className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input className="border border-black" id="email" type="email" name="email" />

                <label htmlFor="pw">Password</label>
                <input className="border border-black" id="pw" type="password" name="pw" />
            </form>
        </div>
    )
}
