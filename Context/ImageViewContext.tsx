import { createContext } from "react";
const ImageViewContext = createContext({
    images:[],
    visible:false,
    index:0
});

export default ImageViewContext;