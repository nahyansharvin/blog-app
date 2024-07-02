import { Error } from "@/lib/toast"

export const handleApiError = (error: any) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error response >> ", error.response.data)
        console.log("Error response >> ", error.response.status)
        console.log("Error response >> ", error.response.headers)
        return Error(error.response.data.message)
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