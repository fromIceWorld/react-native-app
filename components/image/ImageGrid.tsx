import {StyleSheet,View} from 'react-native'
import { Image } from 'expo-image'
import MyImage from './image';
import { height } from '@/utils/imageSize';

const imgs = new Array(4).fill(0);
const ImageGrid = ()=>{
     {
        switch(imgs.length){
            case 3:
                return <ImageGrid3></ImageGrid3>;
            case 2:
                return <ImageGrid2></ImageGrid2>;
            case 1:
                return <ImageGrid1></ImageGrid1>;
            default:
                return <ImageGrid4></ImageGrid4>; 
        }
    }
}
// 4宫格
const Grid4Style = StyleSheet.create({
    container:{
        borderRadius:10,
        overflow:'hidden',
        display:'flex',
        flexWrap:'wrap',
        height:220,
    },
    grid4Container:{
        display:'flex',
        flexDirection:'row',
        flex:1,
    },
    gridUp:{
        marginBottom:3,
    },
    gridBottom:{
        marginTop:3,
    },
    img:{
        height:110,
        flex:1,
    }
})
const ImageGrid4 = ()=>
        {
          return <View style={Grid4Style['container']}>
                    <View style={{...Grid4Style['grid4Container'],...Grid4Style['gridUp']}}>
                        {imgs.slice(0,2).map((img,index)=>{
                            return <View  key={index} style={{...Grid4Style['img'],marginLeft:index == 1 ? 1.5 : 0,marginRight:index == 0 ? 1.5 : 0 }} >
                                    <MyImage source={require('@/assets/images/nature.jpg')}></MyImage>
                            </View>
                        })}
                    </View>
                    <View  style={{...Grid4Style['grid4Container'],...Grid4Style['gridBottom']}}>
                        {imgs.slice(2,4).map((img,index)=>{
                            return <View  key={index} style={{...Grid4Style['img'],marginLeft:index == 1 ? 1.5 : 0,marginRight:index == 0 ? 1.5 : 0 }}>
                                        <MyImage source={require('@/assets/images/nature.jpg')}></MyImage>
                            </View>
                        })}
                    </View>
                </View>
        }

// 3宫格
const Grid3Style = StyleSheet.create({
    container:{
        borderRadius:10,
        overflow:'hidden',
        
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        height:220,
    },
    grid3Container:{
        display:'flex',
        flex:1,
    },
    gridLeft:{
        // marginRight:3,
    },
    gridRight:{
        // marginLeft:3,
    },
    img:{
        height:110,
        flex:1,
    },
   
})        
const ImageGrid3 = ()=>
        {
          return <View style={Grid3Style['container']}>
                    <View style={{...Grid3Style['grid3Container'],...Grid3Style['gridLeft']}}>
                        {imgs.slice(0,1).map((img,index)=>{
                            return <View  key={index} style={{...Grid3Style['img'],marginRight:1.5}}>
                                <MyImage source={require('@/assets/images/nature.jpg')}></MyImage>
                            </View>
                        })}
                    </View>
                    <View  style={{...Grid3Style['grid3Container'],...Grid3Style['gridRight']}}>
                        {imgs.slice(1,3).map((img,index)=>{
                            return <View key={index} style={{...Grid3Style['img'],marginLeft:1.5,marginBottom:index == 0 ? 1.5 : 0,marginTop:index == 1 ? 1.5 : 0}}>
                                    <MyImage source={require('@/assets/images/nature.jpg')}></MyImage>
                            </View>
                        })}
                    </View>
                </View>
        }
 const Grid2Style = StyleSheet.create({
    container:{
        borderRadius:10,
        overflow:'hidden',
        
        display:'flex',
        flexDirection:'row',

        height:220,
    },
    img:{
        flex:1,
    }

 })       
 const ImageGrid2 = ()=>{
        return <View style={Grid2Style['container']}>
                            {imgs.slice(0,2).map((img,index)=>{
                                return <View key={index}  style={{...Grid2Style['img'],marginRight:index == 0 ? 1.5 : 0,marginLeft:index == 1 ? 1.5 :0}}>
                                        <MyImage source={require('@/assets/images/nature.jpg')}></MyImage>
                                 </View>
                            })}
        </View>
 }       
 const Grid1Style = StyleSheet.create({
    container:{
        borderRadius:10,
        overflow:'hidden',
        
        display:'flex',
        height:220,
    },
    img:{
        height:110,
        flex:1,
    }

 })       
 const ImageGrid1 = ()=>{
        return <View style={Grid1Style['container']}>
                            {imgs.slice(0,1).map((img,index)=>{
                                return <Image contentFit='cover' key={index} style={{...Grid1Style['img']}}   source={require('@/assets/images/humen.jpg')}>

                                 </Image>
                            })}
        </View>
 }       

export default ImageGrid