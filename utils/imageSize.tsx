import { Image,Dimensions } from "react-native"

enum ImageSurce {
    url,
    local
}
const {width,height} = Dimensions.get('window')

function getInitImage(type:ImageSurce = ImageSurce.local,url:string|NodeRequire,index:number ){
    return new Promise((resolve,reject)=>{
        switch (type){
            case ImageSurce.local:
                const img = Image.resolveAssetSource(url as NodeRequire);
                resolve(width/(img.width/img.height))
                break;
            case ImageSurce.url:
                Image.getSize(url as string,(w,h)=>{
                    resolve(width/(w/h))
                });
                break;
        }
    })
}
export {getInitImage ,ImageSurce,width,height}