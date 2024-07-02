import BackendService from "./BackendService";

export const getAllBlogs = () => {
    return BackendService.get("/blog/bulk");
}

export const getBlog = (id: string) => {
    return BackendService.get(`/blog/${id}`);
}