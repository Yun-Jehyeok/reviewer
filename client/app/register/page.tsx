export default function Register() {
    return (
        <div>
            <form className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input className="border border-black" id="email" type="email" name="email" />

                <label htmlFor="pw">Password</label>
                <input className="border border-black" id="pw" type="password" name="pw" />

                <label htmlFor="pwc">Password Check</label>
                <input className="border border-black" id="pwc" type="password" name="pwc" />

                <label htmlFor="name">Name</label>
                <input className="border border-black" id="name" type="text" name="name" />

                <label htmlFor="nickname">Nickname</label>
                <input className="border border-black" id="nickname" type="text" name="nickname" />

                <label htmlFor="phone">Phone</label>
                <input className="border border-black" id="phone" type="text" name="phone" />
            </form>
        </div>
    )
}
