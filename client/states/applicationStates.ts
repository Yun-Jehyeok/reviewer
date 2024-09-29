import { applicationIFC } from "@/interfaces/applicationIFC";
import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const applicationState = atom<applicationIFC>({
    key: "applicationState",
    default: {
        _id: "",
        postId: "",
        reviewerId: {
            _id: "",
            reputation: 0,
            register_date: "",
            profile_img: "",
            isReviewer: false,
            posts: [],
            point: 0,
            phone: "",
            nickname: "",
            name: "",
            login_way: "",
            lang: [],
            isSubmit: false,
            grade: "",
            getApplications: [],
            email: "",
            applications: [],
            price: 0,
            introduce: "",
            oneLineIntroduce: "",
        },
        applicantId: {
            _id: "",
            reputation: 0,
            register_date: "",
            profile_img: "",
            isReviewer: false,
            posts: [],
            point: 0,
            phone: "",
            nickname: "",
            name: "",
            login_way: "",
            lang: [],
            isSubmit: false,
            grade: "",
            getApplications: [],
            email: "",
            applications: [],
            price: 0,
            introduce: "",
            oneLineIntroduce: "",
        },
        status: "",
        register_date: "",
        chatRoom: "",
    },
    effects_UNSTABLE: [persistAtom],
});
