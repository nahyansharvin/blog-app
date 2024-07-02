import { atom } from "recoil"

const authAtom = atom({
    key: "authAtom",
    default: {
        isAuthenticated: false,
        userId: null,
        name: null,
        email: null,
    }
})

export { authAtom }