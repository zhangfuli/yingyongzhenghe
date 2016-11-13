//跨域
Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
});
var vm = new Vue({
	el:"#vue",
	data:{
		url:"http://localhost:8086/homepage/",
		left_lists:{},
		centers:{},
		centerlength:'',
		selected:''
	},
	methods:{
		//获得左侧tab
		// get_left:function(){
		// 	this.$http.get(this.url+"tab/showall").then(function(response){
		// 		this.left_lists=response.data;
		// 	})
		// },
		//获得锚链接  name、icon
		study:function(){
			$(".life-btn").removeClass("my-active");
			$(".study-btn").addClass("my-active");
			$(".help-btn").removeClass("my-active");
			$(".activity-btn").removeClass("my-active");
			$(".community-btn").removeClass("my-active");
			$(".apply").fadeIn("slow");
			this.$http.get(this.url+"app/showbytab?tabid=1").then(function(response){
					this.centers =  response.data;
					this.centerlength = response.data.length;			
			});
			setTimeout(function(){
				$('.apply').fadeIn('slow');
			},300);
			
		},
		life:function(){
			$(".study-btn").removeClass("my-active");
			$(".life-btn").addClass("my-active");
			$(".help-btn").removeClass("my-active");
			$(".activity-btn").removeClass("my-active");
			$(".community-btn").removeClass("my-active");
			this.$http.get(this.url+"app/showbytab?tabid=2").then(function(response){
					this.centers =  response.data;
					this.centerlength = response.data.length;		
			});
			setTimeout(function(){
				$('.apply').fadeIn('slow');
			},300);
		},
		activity:function(){
			$(".study-btn").removeClass("my-active");
			$(".activity-btn").addClass("my-active");
			$(".help-btn").removeClass("my-active");
			$(".life-btn").removeClass("my-active");
			$(".community-btn").removeClass("my-active");
			this.$http.get(this.url+"app/showbytab?tabid=3").then(function(response){
					this.centers =  response.data;
					this.centerlength = response.data.length;		
			});
			setTimeout(function(){
				$('.apply').fadeIn('slow');
			},300);
		},
		help:function(){
			$(".study-btn").removeClass("my-active");
			$(".activity-btn").removeClass("my-active");
			$(".help-btn").addClass("my-active");
			$(".life-btn").removeClass("my-active");
			$(".community-btn").removeClass("my-active");
			this.$http.get(this.url+"app/showbytab?tabid=4").then(function(response){
					this.centers =  response.data;
					this.centerlength = response.data.length;			
			});
			setTimeout(function(){
				$('.apply').fadeIn('slow');
			},300);
		},
		community:function(){
			$(".study-btn").removeClass("my-active");
			$(".activity-btn").removeClass("my-active");
			$(".help-btn").removeClass("my-active");
			$(".life-btn").removeClass("my-active");
			$(".community-btn").addClass("my-active");
			this.$http.get(this.url+"app/showbytab?tabid=5").then(function(response){
					this.centers =  response.data;
					this.centerlength = response.data.length;		
			});

		},
		//点击链接
		app_href:function(index){
			console.log(this.centers[index+1].href);
			window.open(this.centers[index+1].href);
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
vm.study();
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