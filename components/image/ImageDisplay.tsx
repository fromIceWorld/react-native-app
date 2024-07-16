import {Text} from 'react-native'
import ImageView from './ImageView'
import { useImageContext } from '@/Context/ImageViewContext';
const ImageDisplay = ()=>{
    const ImageContext  = useImageContext();
    console.log('ImageContext',ImageContext)
    return  <ImageView {...ImageContext.config} onClose={ImageContext.onClose}></ImageView>

}
export default ImageDisplay