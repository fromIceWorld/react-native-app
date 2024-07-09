enum Diriction{
    up,
    right,
    bottom,
    left
}
interface Coordinate {
    x:number, //x轴平移距离 +向右；-向左
    y:number, // y轴平移距离 + 向上;-向下
}

// 获取手势滑动的角度 [0, 180] (0,180)
// TODO:为了和 panResponder 结合，修正panResponder y向下为正的情况
function getAngle(x:number,y:number){
    return 360 * Math.atan2(-y,x)/ (2*Math.PI);
}
// 根据角度将2维平面分区
// [45,135] 向上
// [-135,-45]向下
// [0,45][-45,0] 向右
// [135,180] [-180,-135]
function getDirectionByCoord(coord:Coordinate):Diriction{
    const {x,y} = coord;
    const angle = getAngle(x,y);
    if(angle >= 30 && angle <= 150){
        return Diriction.up
    }else if(angle >= -150 && angle <= -30){
        return Diriction.bottom;
    }else if((angle >=0 && angle<=30) || (angle>=-30 && angle <=0)){
        return Diriction.right
    }else{
        return Diriction.left
    }
}
export {getDirectionByCoord,Diriction}