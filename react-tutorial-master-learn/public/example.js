var CommentBox = React.createClass({
	//初始化阶段，数据为空
	getInitialState: function(){
		return {data: []};
	},

	handleCommentSubmit: function(comment){
		$.ajax({
			url:this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	//获取数据
	loadCommentsFormServer: function(){
		$.ajax({
			url:this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				//成功就处理数据
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function(){
		this.loadCommentsFormServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},

	render: function(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});


var Comment = React.createClass({
	//采用markdown语法
	rawMarkup: function(){
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return {__html:rawMarkup};
	},
	render: function(){
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function(){

		//将显示内容保存在变量当中
		var commentNodes = this.props.data.map(function(comment){
			return (
				//采用Comment组件来显示内容，设置key来标记组件
				<Comment author = {comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({

	//初试状态
	getInitialState: function(){
		return {author: '', text: ''};
	},

	//处理姓名输入框的变化
	handleAuthorChange: function(e) {
		this.setState({
			author: e.target.value
		});
	},
	
	//处理文本输入框的变化
	handleTextChange: function(e) {
		this.setState({
			text: e.target.value
		});
	},

	//提交
	handleSubmit: function(e){
		//阻止默认事件，禁止提交
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		
		//判断输入是否为空
		if(!text || !author){
			return;
		}
		//提交内容
		this.props.onCommentSubmit({author: author, text: text});
		//重新渲染显示
		this.setState({author: "", text: ''});
	},

	render: function(){
		return (
			//添加form的处理事件,为input元素添加姓名或者文本，以及处理事件
			<form className="commentForm" onSubmit={this.handleSubmit}>
				
				<input type="text" placeholder="Your name" 
					value={this.state.author}
					onChange={this.handleAuthorChange}
				/>
				
				<input type="text" placeholder="Your comment" 
					value={this.state.text}
					onChange={this.handleTextChange}
				/>
				<input type="submit" value="Post" />
			</form>
		);
	}
});


ReactDOM.render(
	//定义数据的来源, 以及时间间隔
	<CommentBox url="/api/comments"  pollInterval={2000} />,
	document.getElementById('content')
);