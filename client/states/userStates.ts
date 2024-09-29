import { userIFC } from "@/interfaces/userIFC";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface IUserState extends userIFC {
    token: string;
}
