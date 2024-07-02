import { atom } from "recoil"

const authAtom = atom({
    key: "authAtom",
    default: {
        isAuthenticated: false,
        name: null,
        email: null,
    }
})

export { authAtom }