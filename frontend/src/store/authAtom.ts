import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

const authAtom = atom({
    key: "authAtom",
    default: {
        isAuthenticated: false,
        name: null,
        email: null,
    },
    effects_UNSTABLE: [persistAtom]
})

export { authAtom }