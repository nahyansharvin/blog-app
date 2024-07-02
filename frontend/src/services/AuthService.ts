import BackendService from "./BackendService";

export const signIn = ({ email, password }: any) => {
    return BackendService.post("/auth/signin", { email, password });
}

export const signUp = async ({ username, email, password }: any) => {
    return await BackendService.post("/auth/signup", { username, email, password });
}