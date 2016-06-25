var card={

    gameOver:true, //表示游戏是否结束
    notice:false, //表示是否要通知

    player1Num:0,//玩家1手中牌的数量
    player2Num:0,//玩家2手中牌的数量

    player1Sum:0,//玩家1手中牌的点数
    player2Sum:0,//玩家2手中牌的点数

    player1A:0,
    player2A:0,//玩家手中A的个数

    player1Enough:false,
    player2Enough:false, //表示牌是否够了

    player1Sub:false,
    player2Sub:false, //表示是否确定了下注

    player1hide:"",
    player2hide:"", //记录第二张牌的花色以及数值

    sendCard:false, //表示是否已经发牌

    //洗牌
    shuffle:function (){
       var cardsArr=['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13','d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12','d13','h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12','h13','s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'];
       
        var newarr=[];
        //每次取出一张，长度在不断的变化
        while(cardsArr.length>1){
            var tt=parseInt(Math.random()*cardsArr.length);
            newarr.push(cardsArr[tt]);//注意push采用[]；splice直接修改数组，但取出来的还是数组，不是单个的数字；
            cardsArr.splice(tt,1);
        }

        newarr.push(cardsArr[0]);
        cardsArr.splice(0,1);

        return newarr;
    },

    //初始发牌,四张牌
    sDeal:function (){
        if( !card.sendCard){
            if (card.player1Sub  && card.player2Sub ){
                card.sendCard=true;
                control.cardDisplay();
                play1.style.color="#dd2";
                play2.style.color="#dd2";
                var target=EventUtil.getTarget(event);
                card.gameOver=false;

                //每次开始的时候都要洗牌；
                cardsArr=card.shuffle();

                //将每一个img的src变为空
                for(var i=0;i<placeCardr.childNodes.length;i++){
                    placeCardr.childNodes[i].src="";
                    placeCardl.childNodes[i].src="";
                }

                //各发两张牌
                var t=0;
                for (var i=0;i<4;i++){
                    var tt=card.judge(cardsArr.pop());
                    if(i%2==0){
                        card.player1Deal();
                    }else{
                        card.player2Deal();
                    }
                }
            }else{
                alert("请确定已经下注");  
            }
        }else{
            alert("已经发过牌了");
        }
    },

    //给玩家1发牌
    player1Deal:function (){
        if( card.player1Sum<=21 && card.player2Sum<=21){
            var tt=card.judge(cardsArr.pop());
            var i=card.player1Num;
        
            if(i!=1){
                placeCardl.childNodes[i+1].src="images/" +tt[1]+ "/"+tt[0]+".png";  
                placeCardl.childNodes[i+1].style.left="0"+(i*15)+"px";//向左偏移15px;
            }else{
                card.player1hide=tt;
                placeCardl.childNodes[i+1].src="images/common/hide.png";  
                placeCardl.childNodes[i+1].style.left="0"+(i*15)+"px";//向左偏移15px;
            }

            cardBgImg.removeChild(cardBgImg.lastChild);//每发一张牌，总数减少
            //如果是j,k,Q的时候，要将其当做10；
            if (tt[0]>10) {tt[0]="10";}
            
            card.player1Num+=1;
            card.player1Sum+=parseInt(tt[0]); //总的点数
            if(tt[0]==1){
                card.player1A+=1;
            }
        }
        else{
            control.showresult();
        }
    },

    //给玩家2发牌
    player2Deal:function (){
        if( card.player2Sum<=21 && card.player1Sum<=21){
            var tt=card.judge(cardsArr.pop());
            var i=card.player2Num;
            

            if (i!=1){
                placeCardr.childNodes[i+1].src="images/" +tt[1]+ "/"+tt[0]+".png";  
                placeCardr.childNodes[i+1].style.left="0"+(i*15)+"px";//向左偏移15px;
                cardBgImg.removeChild(cardBgImg.lastChild);
            }else{
                card.player2hide=tt;
                placeCardr.childNodes[i+1].src="images/common/hide.png";  
                placeCardr.childNodes[i+1].style.left="0"+(i*15)+"px";//向左偏移15px;
            }

            cardBgImg.removeChild(cardBgImg.lastChild);
            //如果是j,k,Q的时候，要将其当做10；
            if (tt[0]>10) {tt[0]="10";}
            
            card.player2Num+=1;
            card.player2Sum+=parseInt(tt[0]); //总的点数
            if(tt[0]==1){
                card.player2A+=1;
            }
        }
        else{
            control.showresult();
        }
    },

    //当玩家点击再来一张的时候，就发一张牌，通过判断target的id来确定谁要牌
    deal :function (event){
        var target=EventUtil.getTarget(event);
        if( card.player1Sub && card.player2Sub ){
            if(target.id=="player1-yao" && !card.gameOver){
                card.player1Deal();
            }
            if(target.id=="player2-yao" && !card.gameOver){
                card.player2Deal();
            }
        }
    },


    //判断花色和数字,返回一个数组，分别代表花色和牌值
    judge: function (tt){
        var cardNum=tt.slice(1);//获取后面的数字
        var cardColor=tt.slice(0,1);//获取花色标志

        //判断属于那种花色，从而改变src的地址
        if (cardColor=="c") {cardColor="club";}
        if (cardColor=="d") {cardColor="diamond";}
        if (cardColor=="h") {cardColor="heart";}
        if (cardColor=="s") {cardColor="spade";}
        var singleCard=[cardNum,cardColor];
        return singleCard;
    },


    //计算手中A的个数，当A=11点数不超过21的话，设A=11；
    //否则A=1；
    playersumA:function (){
        if(card.player1A){
           var sum1=card.player1Sum-card.player1A+card.player1A*11;
           if(sum1<=21 ){
                card.player1Sum=sum1;
                card.player1A=0;
           }
        }
        if(card.player2A){
           var sum1=card.player2Sum-card.player2A+card.player2A*11;
           if(sum1<=21 ){
                card.player2Sum=sum1;
                card.player2A=0;
           }
        }
    },
};
