import {Image} from 'expo-image'
import {StyleSheet} from 'react-native'

const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Style = StyleSheet.create({
    image:{
        flex: 1,
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
    return <>
             <Image
                style={Style.image}
                source={require('@/assets/images/nature.jpg')}
                placeholder={blurhash}
                contentFit="contain"
                transition={1000}
              />
    </>
}

export default MyImage