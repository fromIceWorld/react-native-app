import { useImageContext, useImageDiapatch, useImageDispatch } from '@/Context/ImageViewContext';
import {Image} from 'expo-image'
import {Pressable, StyleSheet, TouchableHighlight, TouchableOpacity, View,Dimensions,Text} from 'react-native'
import { getInitImage,ImageSurce,width,height } from '@/utils/imageSize';
import {useState,useEffect} from 'react'
const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Style = StyleSheet.create({
  imageContainer:{
    paddingRight:10,
  },
    image:{
        width: '100%',
        backgroundColor: '#0553',
        borderRadius:10
      }
})
const images = [
    {
        uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
      },
      {
        uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
      },
      {
        uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
      },
]

const MyImage = ()=>{
  const [h,setH] = useState(0)
  const imgDispatch = useImageDispatch();
  const ImageContext = useImageContext();
  function touch(e:any){
    console.log('press',ImageContext,imgDispatch);
    imgDispatch.setConfig({
      images:[],
      visible:true,
      index:0
    })
    }
    useEffect(()=>{
      getInitImage(ImageSurce.local,require('@/assets/images/nature.jpg'),0).then(h=>{
        setH(h)
      })
    },[])
    return <>
          <Pressable onPress={touch} style={{...Style.imageContainer,height:h}}>
             <Image
                style={{...Style.image,height:h}}
                source={require('@/assets/images/nature.jpg')}
                placeholder={blurhash}
                contentFit="contain"
                transition={1000}
              />
            </Pressable>
    </>
}

export default MyImage