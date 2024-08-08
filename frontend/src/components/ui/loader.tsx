import React from 'react'
import { loadingAtom } from '@/store/loadingAtom'
import { useRecoilValue } from 'recoil'

const Loader: React.FC = () => {
    const loading = useRecoilValue(loadingAtom)
    
    if (!loading) return null
    return (
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center bg-gray-600/80 z-10">
            <div className="h-[60px] w-[100px] relative">
                <div className="absolute h-[50px] w-[100px] top-0 left-0 animate-spin origin-[50%_100%] overflow-hidden ">
                    <div
                        className={`absolute right-0 left-0 my-0 mx-auto border-4 border-primary rounded-[100%] h-[45px] w-[45px] top-[28px]`}
                    />
                </div>
            </div>
        </div>
    )
}

export default Loader