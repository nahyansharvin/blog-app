import { Error } from "@/lib/toast"
import { authAtom } from '@/store/authAtom'
import { resetRecoil } from "recoil-nexus"

export const handleApiError = (error: any) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
            resetRecoil(authAtom)
            return Error("Session expired. Please login again")
        }
        // console.log("Error response >> ", error.response.data)
        // console.log("Error response >> ", error.response.status)
        // console.log("Error response >> ", error.response.headers)
        return Error("Backend adich poyi guys!")
    } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request >> ", error.request)
        return Error("Something went wrong. Please try again")
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error >> ", error.message)
        return Error("Something went wrong. Please try again")
    }
}