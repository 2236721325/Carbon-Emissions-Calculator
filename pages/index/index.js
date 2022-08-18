import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

const app = getApp()
const dealProjects={
  衣:[{
      name:'购买衣服数量',
      type:'衣',
      unit:'件',
      EmissionRate:6.4
  },
  {
      name:'洗衣粉用量',
      type:'衣',
      unit:'千克',
      EmissionRate:0.72
  },
],
食:[
  {
      name:'吸烟数量',
      type:'食',
      unit:'包',
      EmissionRate:0.02
  },
  {
      name:'塑料袋用量',
      type:'食',
      unit:'个',
      EmissionRate:0.0001
  },
  {
      name:'纸制品用量',
      type:'食',
      unit:'千克',
      EmissionRate:3.5
  },
  {
      name:'一次性筷子用量',
      type:'食',
      unit:'双',
      EmissionRate:0.02
  },
  {
      name:'喝白酒数量',
      type:'食',
      unit:'千克',
      EmissionRate:2
  },
  {
      name:'喝啤酒数量',
      type:'食',
      unit:'瓶',
      EmissionRate:0.2
  },
  {
      name:'肉类消费',
      type:'食',
      unit:'千克',
      EmissionRate:1.6
  },
  {
      name:'粮食消费',
      type:'食',
      unit:'千克',
      EmissionRate:2.34
  },
],
住:[
  {
      name:'用电量',
      type:'住',
      unit:'度',
      EmissionRate:0.96
  },
  {
      name:'煤气用量',
      type:'住',
      unit:'立方米',
      EmissionRate:0.71
  },
  {
      name:'天然气用量',
      type:'住',
      unit:'立方米',
      EmissionRate:2.17
  },
  {
      name:'燃煤用量',
      type:'住',
      unit:'吨',
      EmissionRate:1973.9
  },
  {
      name:'装修用木材',
      type:'住',
      unit:'立方米',
      EmissionRate:643
  },
  {
      name:'装修用陶瓷',
      type:'住',
      unit:'立方米',
      EmissionRate:15.4
  },
  {
      name:'集中取暖',
      type:'住',
      unit:'平方米',
      EmissionRate:32.6
  },
  {
      name:'装修用钢材',
      type:'住',
      unit:'千克',
      EmissionRate:17.3
  },
  {
      name:'装修用铝材',
      type:'住',
      unit:'千克',
      EmissionRate:24.7
  },
],
行:[

  {
      name:'飞机里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.28
  },
  {
      name:'火车里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.01
  },
  {
      name:'轮船里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.01
  },
  {
      name:'地铁里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.002
  },
  {
      name:'公共汽车里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.01
  },
  {
      name:'低油耗小轿车里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.16
  },
  {
      name:'中油耗小轿车里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.25
  },
  {
      name:'高油耗小轿车里程',
      type:'行',
      unit:'公里',
      EmissionRate:0.33
  },
]
}
Page({
  data: {
    columns: [
      {
        values: Object.keys(dealProjects),
        className: 'column1',
      },
      {
        values: dealProjects['衣'].map(item=>item.name),
        className: 'column2',
      },
    ],
    records:[
    ],
    show:false,
    currentDealProject:dealProjects['衣'][0],
    input:'',
    currentResult:0,
    allResult:0,
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    let ColumnIndex = picker.getColumnIndex(index);
    picker.setColumnValues(1,dealProjects[value[0]].map(item=>item.name));
    var pos=index==0?0:ColumnIndex;
    this.setData({
      currentDealProject:dealProjects[value[0]][pos]
    })
  },
  onConfirm(){
    this.setData({
      show:false
    })
  }	,
  onCancel(){
    this.setData({
      show:false
    })
  }	,
  showPicker()
  {
    this.setData({ show: true });
  },
  closePicker()
  {
    this.setData({ show: false });
  },
  calculate(){
    var inputNumber=Number(this.data.input);
    console.log(inputNumber)
    if(isNaN(inputNumber)){
    }
    else if(inputNumber==0)
    {

    }
    else{
      var result=parseFloat((inputNumber*this.data.currentDealProject.EmissionRate).toFixed(6));
      var j=-1;
      for(var i=0;i<this.data.records.length;i++){
        if(this.data.records[i].name==this.data.currentDealProject.name){
          j=i;
          break;
        }
      };
      console.log(j);
      if(j==-1){
        this.data.records.push({name:this.data.currentDealProject.name,unit:this.data.currentDealProject.unit,input:inputNumber,result:result});
        console.log(this.data.records)
    }
    else{
      var temp=this.data.records[j].result;
      this.data.records[j].input=parseFloat(( inputNumber).toFixed(6));
      this.data.records[j].result=parseFloat((result).toFixed(6));
      result=result-temp;
    }
    this.setData({
      currentResult:result,
      allResult:parseFloat((this.data.allResult+result).toFixed(6)),
      records:this.data.records
    })
}
      
  },
  clear(){
    this.setData({
      allResult:0,
      records:[]
    })
  },
  singelDelete(event){
    let value=event.currentTarget.dataset.value;
    var j=-1;
    for(var i=0;i<this.data.records.length;i++){
      if(this.data.records[i].name==value){
        j=i;
        break;
      }
    };
    console.log(j);
    console.log(this.data.records[j]);
    console.log(this.data.records);
    this.setData({
      allResult:parseFloat((this.data.allResult-this.data.records[j].result).toFixed(6))
    })
    this.data.records.splice(j,1);
    this.setData({
      records:this.data.records
    })

  }
});