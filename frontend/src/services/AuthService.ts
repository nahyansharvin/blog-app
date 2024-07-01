import BackendService from "./BackendService";

export const signIn = ({ email, password }: any) => {
    return BackendService.post("/user/signin", { email, password });
}

export const signUp = async ({ username, email, password }: any) => {
    return await BackendService.post("/user/signup", { username, email, password });
}