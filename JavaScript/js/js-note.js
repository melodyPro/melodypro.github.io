$(function(){
	var dataType = function(){
		var width=600, height=300;
		var cluster=d3.cluster()     //定义一个集群图布局
			.size([width-300, height]);

		var svg=d3.select(".data-type-svg").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(150,0)");

		var diagonal=d3.svg.diagonal()      //生成一条贝塞尔曲线
			.projection(function (d) {      //projection 点变换器，交换x和y轴坐标，将默认纵向的图形变为横向
				return [d.y, d.x];
			});

		d3.json("/json/data-type.json", function (error,data) {
			var nodes=cluster.nodes(data);
			var links=cluster.links(nodes);

			var link=svg.selectAll(".link")
				.data(links)
				.enter()
				.append("path")
				.attr("class", "link")
				.attr("d", diagonal);

			var node=svg.selectAll(".node")
				.data(nodes)
				.enter()
				.append("g")
				.attr("class", "node")
				.attr("transform",function(d){
					return "translate(" + d.y + "," + d.x + ")";
				})

			node.append("circle")
				.attr("r",5);

			node.append("text")
				.attr("dx",function(d){
					return d.children ? -8 : 8;
				})
				.attr("dy",3)
				.style("text-anchor",function(d){
					return d.children ? "end" : "start";
				})
				.text(function(d){
					return d.name;
				});
		})
	}

	dataType();
});