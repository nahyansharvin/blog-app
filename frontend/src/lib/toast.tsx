import toast from "react-hot-toast"

type PromiseProps = {
    promise: Promise<any>
    loading: string
    success: string
    error: string
}

export const Success = (message: string) => {
    return toast.success(message)
}

export const Error = (message: string) => {
    return toast.error(message)
}

export const PromiseToast = ({ promise, loading, success, error }: PromiseProps) => {
    return toast.promise(promise, {
        loading,
        success,
        error,
    })
}
