//绑定事件
var EventUtil={
    getEvent:function(event){
        return event ? event:window.event;
    },
   
    getTarget:function(event){
        return event.target||event.srcElement;
    },
   
    on:function (element,eventName,listener){
    if (element.addEventListener){
        element.addEventListener(eventName,listener,false);
    }
    else if (element.attachEvent){
        element.attachEvent('on'+eventName,listener);
    }
    else
        element['on'+eventName]=listener;
    },
};

    
    var cardsArr;	
	
    //玩家点击再来一张的时候发牌；
	var player1Yao=document.getElementById("player1-yao");   
    EventUtil.on(player1Yao,'click',card.deal);
    var player2Yao=document.getElementById("player2-yao");
    EventUtil.on(player2Yao,'click',card.deal);

    //获取放牌区的位置
    var placeCardr=document.getElementById("place-card-r");
    var placeCardl=document.getElementById("place-card-l");

    //重新开始restart
    var restart=document.getElementById("restart");
    EventUtil.on(restart,'click',control.restart);

    //发牌
    var deal=document.getElementById("deal");
    EventUtil.on(deal,'click',card.sDeal);

    //获取当前的积分值
    var player1Win=document.getElementById("player1-win");
    var player2Win=document.getElementById("player2-win");

    //当玩家都不要牌的时候判断点数的大小，并开始清零
    var player1Enough=document.getElementById("player1-enough");
    EventUtil.on(player1Enough,'click',control.playerenough);
    var player2Enough=document.getElementById("player2-enough");
    EventUtil.on(player2Enough,'click',control.playerenough);       
    
    //发牌区显示背景图   
    var cardBgImg=document.getElementById("card-bg-img");
    
    //获取玩家1,2的id,当赢的时候改变玩家的颜色
    var play1=document.getElementById("play1");
    var play2=document.getElementById("play2");

    //获取中断的id,当点击中断后，除积分外，全部清除
    var pause=document.getElementById("pause");
    EventUtil.on(pause,'click',control.pausefun); 

    //获取玩家的下注积分
    var player1Bet=document.getElementById("player1-bet");  
    var player2Bet=document.getElementById("player2-bet");  

    //  当点击确认后，表示下注成功，下注过程中要判断下注的大小，可以开始发牌了
    var player1Submit=document.getElementById("player1-submit");
    EventUtil.on(player1Submit,'click',function(){
            var tt=parseInt(player1Bet.value);
            var tt1=parseInt(player1Win.value);
            player1Bet.disabled =true;
            if (tt<10  || (tt > tt1)){
                alert("最少下注10分，最高不得超过你现在拥有的积分");
                console.log(player1Win.value);
                 console.log(player1Bet.value);
            }
            else{
                card.player1Sub=true;
            }
            if(tt1==0){
                alert("你已经没有积分了，请选择重新开始");
            }
    });

    var player2Submit=document.getElementById("player2-submit");
    EventUtil.on(player2Submit,'click',function(){
            var tt=parseInt(player2Bet.value);
            var tt1=parseInt(player2Win.value);
            player2Bet.disabled =true;
            if (tt<10  || (tt > tt1)){
                alert("最少下注10分，最高不得超过你现在拥有的积分");
            }
            else{
                card.player2Sub=true;
            }
            if(tt1==0){
                alert("你已经没有积分了，请选择重新开始");
            }
    });
	

    //显示牌面的背景图
    control.cardDisplay();




    
