import { createContext,useState,useContext } from "react";


export const ImageViewContext = createContext(null);
export const ImageViewDispatch = createContext(null)

export function ImageViewProvider({children}){
    const [config,setConfig] = useState({
            images:[],
            visible:false,
            index:0,
        })
    function onClose(){
        setConfig((state)=>({...state,visible:false}))
    }
    return <ImageViewContext.Provider value={{config,onClose}}>
                <ImageViewDispatch.Provider value={{setConfig}}>
                     {children}
                </ImageViewDispatch.Provider>
            </ImageViewContext.Provider>
}

export function useImageContext(){
    return useContext(ImageViewContext)
}
export function useImageDispatch(){
    return useContext(ImageViewDispatch)
}
export default ImageViewProvider;