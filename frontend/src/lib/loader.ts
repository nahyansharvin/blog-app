import { loadingAtom } from "@/store/loadingAtom";
import { useSetRecoilState } from "recoil";

const useLoader = () => {
    const setLoading = useSetRecoilState(loadingAtom);
    return { loader: () => setLoading(prev => !prev) };
};

export default useLoader;