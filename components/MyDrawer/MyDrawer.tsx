import { useState,useRef,useMemo, useEffect  } from "react"
import { Text,PanResponder, View,StyleSheet,Dimensions,Animated ,TouchableHighlight,LogBox} from "react-native"

LogBox.ignoreLogs([])

const style = StyleSheet.create({
    container:{
        position:'relative',
        height:Dimensions.get('window').height,
        width:'100%'
    },
    drawer:{
        position:'absolute',
        width:'100%',
        height:'100%',
        left:'-100%',
        top:0,
        zIndex:1,
    },
    mask:{
        position:'absolute',
        backgroundColor:"#000",
        width:'100%',
        height:'100%',
        left:0,
        top:0,
        zIndex:1,
    },
    main:{
        backgroundColor:'red',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
})


type Mode = 'static' | 'overlay' | 'displace'

type Side = 'left' | 'top' | 'right' | 'bottom'



interface Props {
    open?:boolean,
    type?:Mode,
    side?:Side,
    panThreshold?:number, //平移阈值
    content?:any
    children?:any,
    onOpen?:()=>void,
    onClose?:()=>void,

}
let defaultProps:Props = {
    open:false,
    type:'static',
    side:'left',
    panThreshold: Dimensions.get('window').width -50,
}

const MyDrawer = (props:Props)=>{
    let config = useRef({...defaultProps,...props}).current,
        {open,type,side,panThreshold,content,onClose,onOpen} = config;
    const maskRef = useRef(null)
    let [onTouch,setOnTouch] = useState(false);
    let [isOpen,setState] = useState(open!);
    const {width:clientWidth,height:clientHeight} = Dimensions.get('window');
    // 转化输入的平移阈值：  小数:百分比宽度,整数:真实宽度。
    panThreshold = tansformPanThreshold(panThreshold!,side!,clientWidth,clientHeight);
    const drawerDefaultStyle = getDrawerStyle(side!,panThreshold)
    // drawer 偏移值 
    let offset = useRef({
        x:0,
        y:0
    }).current;                                                 
    const pan = useRef(new Animated.ValueXY()).current; //滑动动画
    const mask = useRef(new Animated.Value(0)).current; // 遮罩渐变

    const maskOpacity = mask.interpolate({
            inputRange:[0,panThreshold],
            outputRange:[0,0.3]
        });
    const defaultPosition = getDefaultPosition(isOpen,side!,panThreshold)
    
    // style
    const containerStyle = {...style['container']},
          drawerStyle = {...style['drawer'],...drawerDefaultStyle},
          mainStyle= {...style['main']};
    
    const maskEvent = Animated.event([
        mask
    ], {
        useNativeDriver:false
    })
    const moveEvent = Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {
            useNativeDriver:false
        }
      )      
      //  默认打开
    if(isOpen){
        Animated.spring(
            pan, // Auto-multiplexed
            {toValue: {x: defaultPosition.x, y: defaultPosition.y}, bounciness:0,useNativeDriver: true}, 
            ).start();
        maskEvent(panThreshold)    

    } 
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder:(evt,gestureState)=>false,
        onMoveShouldSetPanResponder:(evt,gestureState)=>true,
        onPanResponderGrant:(evt,gestureState)=>{
        },
        onPanResponderReject:(evt,gestureState)=>{
           
        },
        onPanResponderMove: (evt,gestureState)=>{
            let {dx,dy} = gestureState;
            // 左右拉动时，阻止上下动
            if(['left','right'].includes(side!)){
                dy = 0
            }
            // 上下动时，阻止左右动
            if(['top','bottom'].includes(side!)){
                dx = 0
            }
            // 左侧/右侧 收缩后，不允许反向滑动
            if(offset.x == 0 && ((dx <0 && side == 'left') || (side == 'right' && dx >0))){
                return
            }
            // 上侧/下侧 收缩后，不允许反向滑动
            if(offset.y == 0 && ((dy <0 && side == 'top') || (side == 'bottom' && dy >0))){
                return
            }
            // 左/右拉出后不允许继续滑动
            if(offset.x == panThreshold && ((side == 'left' && dx >0) || (side == 'right' && dx < 0)) ){
                return
            }
            // 上/下拉出后不允许继续滑动
            if(offset.y == panThreshold && ((side == 'top' && dy >0) || (side == 'bottom' && dy < 0)) ){
                return
            }
            setOnTouch(true)
            moveEvent(evt,{dx:dx+offset.x,dy:dy + offset.y});
            let p = mapMask(side!,dx,dy,panThreshold!)
            maskEvent(p)
        },
        onPanResponderRelease: (evt,gestureState) => {
        const {dx,dy,vx,vy} = gestureState;
        let nextXpositive =0,nextXnegative = 0,nextYpositive = 0,nextYnegative = 0;
        switch(side){
            case 'left':
                nextXpositive = vx==0 || dx == 0 ? offset.x
                                        :  vx > 0.3 || dx > 100 ? panThreshold!: 0 ;
                break;                         
            case 'right':
                nextXnegative = vx == 0 || dx == 0 ? offset.x
                                        : vx < -0.3 || dx <-100  ? -panThreshold! :0;
                break;                         
            case 'top':
                nextYpositive = vy==0 || dy == 0 ? offset.y 
                                        :  vy > 0.3 || dy > 100 ? panThreshold!: 0 ;
                break;                         
            case 'bottom':
                nextYnegative = vy == 0 || dy == 0 ? offset.y
                                        : vy <-0.3 || dy <-100  ? -panThreshold! :0;
                break;   
        }
        if(nextXpositive +  nextXnegative + nextYpositive + nextYnegative == 0){
            onClose!()
            Animated.spring(
                mask, // Auto-multiplexed
                {toValue:0,speed:28,bounciness:1,useNativeDriver: true}, // Back to zero
                ).start();
                
        }else{
            onOpen!()
            Animated.spring(
                mask, // Auto-multiplexed
                {toValue:panThreshold!,speed:28,bounciness:1,useNativeDriver: true}, // Back to zero
                ).start();
            
        }
        offset.x = nextXpositive || nextXnegative;
        offset.y = nextYpositive || nextYnegative;
        Animated.spring(
            pan, // Auto-multiplexed
            {toValue: {x: offset.x , y: offset.y}, speed:148,bounciness:0,useNativeDriver: true}, // Back to zero
            ).start(({finished})=>{
                if(nextXpositive +  nextXnegative + nextYpositive + nextYnegative == 0){
                    setState(false)
                    setOnTouch(false)
                }else{
                    setState(true)
                }
            });

        }
    })).current
    const maskPanResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder:(evt,gestureState)=>false,
        onMoveShouldSetPanResponder:(evt,gestureState)=>false,
    })).current
    return <Animated.View style={{...containerStyle,transform: [{ translateX: pan.x },{translateY:pan.y}]}}  {...panResponder.panHandlers}
            >
                <Animated.View  style={drawerStyle} 
                               >
                    {content}
                </Animated.View>
                {/*  @ts-ignore 遮罩*/  }
                <Animated.View {...maskPanResponder.panHandlers} onTouchStart={()=>console.log('press')} ref={maskRef} style={{...style['mask'],opacity:maskOpacity,zIndex:onTouch ? 10 : 0}}>
                </Animated.View>
                <View style={mainStyle} >
                    {props.children}
                </View>
            </Animated.View>
}

// 将输入的 平移阈值，转化为真实平移
function tansformPanThreshold(val:number,type:Side,clientWidth:number,clientHeight:number){
    let panThreshold = val,xAxis =['left','right'].includes(type);
    if(val<=0){
        panThreshold = xAxis ? clientWidth : clientHeight; 
    }else if(val>0 && val<=1){
        panThreshold = xAxis ? clientWidth* panThreshold : clientHeight*panThreshold; 
    }else{
        panThreshold = xAxis ? Math.min(panThreshold,clientWidth) :Math.min(panThreshold,clientWidth)
    }
    return panThreshold
}
// 获取 drawer 位置 和 width，height
function getDrawerStyle(side:Side,panThreshold:number){
    let position:any = {};
    switch(side){
        case 'left':
            position.left = -panThreshold;
            position.width = panThreshold;
            break;
        case 'right':
            position.left = panThreshold;
            position.width = panThreshold;
            break;
        case 'top':
            position.top = -panThreshold;
            position.left = 0;
            position.height = panThreshold;
            break;
        case 'bottom':
            position.top = panThreshold;
            position.left = 0;
            position.height = panThreshold;
            break;
    }
    return position
}
// 获取 初始状态 打开|关闭
function getDefaultPosition(isOpen:boolean,side:Side,panThreshold:number){
    let position:any = {
        x:0,
        y:0
    };
    if(isOpen){
        switch(side){
            case 'left':
                position.x = panThreshold;
                break;
            case 'right':
                position.x = -panThreshold;
                break;
            case 'top':
                position.y = panThreshold;
                break;
            case 'bottom':
                position.y = -panThreshold;
                break;
        }
    }
    
    return position
}

// 根据开关 映射遮罩
function mapMask(side:Side,dx:number,dy:number,panThreshold:number){
    if(['left','top'].includes(side) ){
        if(dx >0 || dy >0){
            return  Math.min((dx || dy)*3, panThreshold)
        }else{
            return panThreshold - Math.abs(dx || dy)
        }
    }
    if(['right','bottom'].includes(side)){
        if(dx < 0 || dy < 0){
            return Math.abs(dx || dy)
        }else{
            return panThreshold - Math.abs(dx || dy)
        }
    }
}
export default MyDrawer