import BackendService from "./BackendService";

export const signIn = ({ email, password }: any) => {
    return BackendService.post("/auth/signin", { email, password });
}

export const signUp = ({ username, email, password }: any) => {
    return BackendService.post("/auth/signup", { username, email, password });
}

export const signOut = () => {
    return BackendService.post("/auth/signout");
}