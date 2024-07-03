import { WriteBlogRequest } from "@/lib/types";
import BackendService from "./BackendService";

export const getAllBlogs = () => {
    return BackendService.get("/blog/bulk");
}

export const getBlog = (id: string) => {
    return BackendService.get(`/blog/${id}`);
}

export const createBlog = (data: WriteBlogRequest) => {
    return BackendService.post("/blog", data);
}

export const updateBlog = (data: Partial<WriteBlogRequest> & {id: string}) => {
    return BackendService.patch(`/blog`, data);
}