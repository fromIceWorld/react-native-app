import React, { useState,useEffect,useRef } from 'react';
import { StyleSheet, Button, View, Image, Text,TouchableOpacity } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useImageContext, useImageDispatch } from '@/Context/ImageViewContext';

type Measurements = {
    left: number;
    top: number;
    width: number;
    height: number;
  };


export default function VideoPoster() {
    const imgDispatch = useImageDispatch();
    const ImageContext = useImageContext();

    const poster = useRef(null)
  const [image, setImage] = useState('');
  const [measure, setMeasure] = useState<Measurements | null>(null);
  function touch(e:any){
    imgDispatch.setConfig({
      images:[],
      visible:true,
      index:0
    })
    }
  const generateThumbnail = () => {
    try {
      VideoThumbnails.getThumbnailAsync(
        'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        {
          time: 15000,
        }
      ).then(res=>{
        console.log('拿到图')
        setImage(res.uri);

      });
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(()=>{
    console.log('获取缩略')
    generateThumbnail()
  },[])
  
  return (
    <View style={Style.container}>
      {image ? <Image source={{ uri: image }} style={Style.image} />
             : <Button onPress={generateThumbnail} title="Generate thumbnail" />}
      {
        image && <View style={Style['posterMessage']}>
                    <TouchableOpacity onPress={touch}>
                        <EvilIcons name="play" size={52} color="#0000008a" />
                    </TouchableOpacity>
                    <View style={Style['time']}>
                        <Text style={Style['timeFont']}>{Math.floor(Math.random()*10)}:{Math.floor(Math.random()*50 + 10)}</Text>
                    </View>
                  </View>
      }       
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
   position:'relative',
  },
  time:{
    position:"absolute",
    bottom:10,
    left:6,
    backgroundColor:'#0000007d',
    paddingLeft:4,
    paddingRight:4,
    borderRadius:2
  },
  
  timeFont:{
    color:'#ffffffde'

  },
  posterMessage:{
    position:'absolute',
    width:'100%',
    height:'100%',
    top:0,
    left:0,
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
},
  image: {
    width:'100%',
    height:'100%',
  },
});
