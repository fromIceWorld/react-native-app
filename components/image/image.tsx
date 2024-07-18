import { useImageContext, useImageDiapatch, useImageDispatch } from '@/Context/ImageViewContext';
import {Image, ImageSource} from 'expo-image'
import {Pressable, StyleSheet, TouchableHighlight, TouchableOpacity, View,Dimensions,Text} from 'react-native'
import { getInitImage,ImageSurce,width,height } from '@/utils/imageSize';
import {useState,useEffect} from 'react'
const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Style = StyleSheet.create({
    image:{
        height: '100%',
        backgroundColor: '#0553',
      }
})
interface Prop{
  source:'string'|ImageSource
}

const MyImage = (prop:Prop)=>{
  const imgDispatch = useImageDispatch();
  const ImageContext = useImageContext();
  function touch(e:any){
    imgDispatch.setConfig({
      images:[],
      visible:true,
      index:0
    })
    }
    return <Pressable onPress={touch}>
             <Image
                style={{...Style.image}}
                source={prop.source}
                placeholder={blurhash}
                transition={1000}
              />
            </Pressable>
}

export default MyImage