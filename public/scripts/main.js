//跨域
Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
});
console.log("123");
//易班验证
var APPID = "192494f4fb128dd1";  
var CALLBACK = "http://f.yiban.cn/iapp80911"; //"http://f.yiban.cn/iapp55163";
console.log("456");
if (location.search['verify_request']) {
    Vue.$http.get('http://localhost:8080/homepage/auth/?vq='+location.search['verify_request']);
    console.log("if");
}
else {
    window.location = 'https://openapi.yiban.cn/oauth/authorize?client_id=' + APPID + '&redirect_uri=' + CALLBACK + '&display=html';	
    console.log("else");
}
console.log("789")
//vue
var vm = new Vue({
	el:"#vue",
	data:{
		url:"http://localhost:8080/homepage/",
		left_lists:{},
		centers:{},
		centerlength:'',
		selected:''
	},
	methods:{
		//获得左侧tab
		get_left:function(){
			this.$http.get(this.url+"tab/showall").then(function(response){
				this.left_lists=response.data;
			})
		},
		//获得锚链接  name、icon
		right_tab:function(index){
			for(var i = 0 ;i <this.left_lists.length;i++){
				$('.tabBtn_'+i).removeClass("my-active");
			}
			$('.tabBtn_'+index).addClass("my-active");
			$(".apply").fadeIn("slow");
			index = index+1;
			this.$http.get(this.url+"app/showbytab?tabid="+index).then(function(response){
					this.centers =  response.data;
					this.centerlength = response.data.length;			
			});
			setTimeout(function(){
				$('.apply').fadeIn('slow');
			},300);
			
		},
		//点击链接
		app_href:function(index){
			window.open(this.centers[index].href);
		},
		//用于删除左侧tab
		delete_tab:function(index){
			var tab_id = this.left_lists[index].id;
			this.$http.get(this.url+"tab/delete?id="+tab_id).then(function(response){
				if(response.data.code==0){
					this.left_lists.splice(index,1);
					alert("删除成功");
				}else{
					alert("未知错误")
				}
			})
		},
		//用于删除右侧
		delete_app:function(index){
			var app_id = this.centers[index].id;
			this.$http.get(this.url+"app/update?id="+app_id).then(function(response){
				if(response.data.code == 0){
					this.centers.splice(index,1);
					alert("删除成功")
				}else{
					alert("未知错误");
				}
			});
		}
	},
});
vm.get_left();
setTimeout(function(){
	vm.right_tab(0);
},300);

function submit_form(){
	$.ajax({
            url: vm.url+'app/create',
            type:'post',
            data: new FormData(this),
            processData:false,
            cache: false,
            contentType:false,
    })
}

function dengLu(){
	window.location.href="";
}
function shuZiShiDa(){
	window.location.href="http://i.upc.edu.cn"
}