var control={
	//重玩，积分，下注等都重置
    restart:function(){
        location.reload();
    },

	//点击中断后，清空所有，但是积分不清零
	 pausefun:function (){
	        control.reset();
	        control.cardDisplay();
	        player2Bet.disabled =false;
	        player1Bet.disabled =false;
	        for(var i=0;i<placeCardr.childNodes.length;i++){
	                placeCardr.childNodes[i].src="";
	                placeCardl.childNodes[i].src="";
	        }
	},

	//显示52张牌
    cardDisplay:function (){
        for(var i=cardBgImg.childNodes.length; i<52;i++){
            var img=document.createElement("img");
            img.src="images/common/hide.png";
            img.style.left="0"+(i*6)+"px";
            cardBgImg.appendChild(img);
        }
    },

	//每一局要将点数，和牌数等都置为零
    reset: function (){
        card.player2Enough=false;
        card.player1Enough=false;
        card.player1Sub=false;
        card.player2Sub=false;   
        card.gameOver=true;
        card.notice=false;
        card.player1Sum=0;
        card.player2Sum=0;
        card.player1A=0;
        card.player2A=0;
        card.player1Num=0;
        card.player2Num=0;
        card.player1Sum=0;
        card.player2Sum=0;
        player2Bet.value=10;
        player1Bet.value=10;
        card.sendCard=false;
    },

	//结束后显示第二张
	bgdisplay:function (){
	    placeCardl.childNodes[2].src="images/" +card.player1hide[1]+ "/"+card.player1hide[0]+".png"; 
	    placeCardr.childNodes[2].src="images/" +card.player2hide[1]+ "/"+card.player2hide[0]+".png";
	},

	//当玩家都点击了enough的时候，开始比较点数的大小
	playerenough:function (){
	    var target=EventUtil.getTarget(event);
	    if(target.id=="player1-enough"  && card.player2Sum  && card.player1Sum){
	        card.player1Enough=true;
	        card.playersumA();
	    }
	    if(target.id=="player2-enough" && card.player2Sum  && card.player1Sum){
	        card.player2Enough=true;
	        card.playersumA();
	    }
	    control.showresult();
	},

	showresult:function (){
	    if( card.player2Sum>21 ){
	        control.bgdisplay();
	        card.player1Enough=true;card.player2Enough=true;
	        card.notice=true; 

	    }
	    if( card.player1Sum>21 ){
	        control.bgdisplay();
	        card.player1Enough=true;card.player2Enough=true;
	        card.notice=true;
	        
	    } 
	    if( card.player2Enough && card.player1Enough ){
	        control.bgdisplay();
	        card.notice=true;  
	    } 
	    control.notice();
	},

	//提示输赢以及点数
	notice:function (){
	    if(card.notice ){
	        if(  card.player2Enough && card.player1Enough && card.player2Sum  && card.player1Sum ){
	            control.bgdisplay();  
	            if( card.player1Sum>21 ){
	                alert("Player1的点数爆了，you lose the game");
	                card.player1Sum=0.5;
	            }
	            if( card.player2Sum>21 ){
	                alert("Player2的点数爆了，you lose the game");
	                card.player2Sum=0.5;
	            }
	            if (card.player2Sum>card.player1Sum ){
	                player2Win.value=parseInt( player2Win.value) +parseInt(player2Bet.value);
	                player1Win.value=parseInt(player1Win.value)-parseInt(player1Bet.value);
	                play2.style.color="red";
	                alert("The winner is player2!");
	            }
	            else if(card.player2Sum==card.player1Sum ){
	                alert("It is a draw!");
	            }
	            else{
	                player2Win.value=parseInt( player2Win.value) -parseInt(player2Bet.value);
	                player1Win.value=parseInt(player1Win.value)+parseInt(player1Bet.value);
	                play1.style.color="red";
	                alert("The winner is player1!");
	            }
	            control.reset();
	            player2Bet.disabled =false;
	            player1Bet.disabled =false;
	        }
	    }
	},

};