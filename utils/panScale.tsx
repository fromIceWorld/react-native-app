// 判断 缩放
interface Point{
    x:number,
    y:number,
}
// 获取两个点之间的距离
function distance2d(point1:Point, point2:Point){
    return Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2))
}
export {distance2d}