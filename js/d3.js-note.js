/**
 * Created by HuangWen on 2015/11/13.
 */

$(function(){
    //switch the jumbotron
    $(window).scroll(function(){
        var x = $(this).scrollTop();
        if(x > 10){
            $('.jumbotron').addClass('sm');
        }else{
            $('.jumbotron').removeClass('sm');
        };
    });
    //add line num of code
    $('.code pre').each(function(){
        var lines = $(this).text().split('\n').length;
        var h = $(this).height();
        var $numbering = $('<ul/>').addClass('line-num');
        $(this).parent().prepend($numbering);
        for(var i=1;i<=lines;i++){
            $numbering.append($('<li/>').text(i));
        }
        var $li = $(this).siblings('.line-num').find('li');
        $li.css("height",h/lines+"px");//set the .line-num>li height
    });

    //d3-datum
    function d3DatumTest(){
        var fruit = ["Apple","Banana","Cherry"];
        var $p = d3.select('#d3-datum').selectAll('p');
        $p.datum(fruit)
            .text(function(d,i){
                return d[i];
            })
            .append('span')
            .text(function(d,i){
                return " "+d[i];
            })
            .style({'color':'#f00'})
        ;
        console.log($p);            //[Array[3]]
        console.log($p.datum());    //["Apple", "Banana", "Cherry"]
    }
    d3DatumTest();
    //d3-data
    function d3DataTest(){
        var fruit = [
            {name: "Apple", amount: 9},
            {name: "Banana", amount: 5},
            {name: "Cherry", amount: 2}
        ];
        var $p = d3.select('#d3-data').selectAll('p');
        $p.data(fruit)
            .text(function(d){
                return d.amount+" : "+ d.name;
            });
        console.log($p);
    }
    d3DataTest();
    //d3-enter
    function d3EnterTest(){
        var fruit = ["Apple","Banana","Cherry","Durian","Fig"];
        var $p = d3.select('#d3-enter').selectAll('p');
        $p.data(fruit)
            .enter(fruit)
            .append('p')
            .text(function(d){
                return d;
            })
    }
    d3EnterTest();
    //d3-exit
    function d3ExitTest(){
        var fruit = ["Durian","Fig"];
        var $p = d3.select('#d3-exit').selectAll('p');
        $p.data(fruit)
            .text(function(d){
                return d;
            })
            .exit()
            .remove();
    }
    d3ExitTest();
    //bar chart base
    function barChartBase(){
        var w = 600,
            h = 400,
            padding = 20,       //padding of svg
            barPadding = 5,     //padding between bar
            barData = [8,12,15,20,10,25,15,35,30,22,16,25,12,18,9];
        var barWidth = (w - padding*2)/barData.length - barPadding;     //width of each bar
        var svg = d3.select('#bar-chart-base').append('svg').attr({'width':w,'height':h});
        svg.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr({
                'fill': function(d){
                    return 'rgb(255, ' + (255 - d*8) + ', 0)';
                },
                x: function(d,i){
                    return padding + (w - padding*2)/barData.length*i;
                },
                y: function(d){
                    return h - padding - d*10;
                },
                'width': barWidth,
                'height': function(d){
                    return d*10;
                }
            });
        // add text
        svg.selectAll('text')
            .data(barData)
            .enter()
            .append('text')
            .attr({
                'fill': '#fff',
                'font-size': '14px',
                'font-weight': 'bold',
                'text-anchor': 'middle',
                x: function(d,i){
                    return padding + (w - padding*2)/barData.length*i + barWidth/2;
                },
                y: function(d){
                    return h - (padding + d*10);
                },
                dy: '1em'         //y 轴方向偏移量
            })
            .text(function(d){
                return d;
            });
    }
    barChartBase();

    //bar chart renew
    function barChartRenew(){
        var w = 600,
            h = 400,
            padding = 20,
            barPadding = 5,
            barData = [8,12,15,20,10,25,15,35,30,22,16,25,12,18,9];
        var svg = d3.select('#bar-chart-renew').append('svg').attr({'width':w,'height':h});

        function draw(){
            var barWidth = (w - padding*2)/barData.length - barPadding;
            //update
            svg.selectAll('rect')
                .data(barData)
                .transition()
                .delay(function(d,i){
                    return i/barData.length*50;
                })
                .duration(300)
                .ease('cubic-in-out')
                .attr({
                    'fill': function(d){
                        return 'rgb(255, ' + (255 - d*8) + ', 0)';
                    },
                    x: function(d,i){
                        return padding + (w - padding*2)/barData.length*i;
                    },
                    y: function(d){
                        return h - (padding + d*10);
                    },
                    'width': barWidth,
                    'height': function(d){
                        return d*10;
                    }
                });
            svg.selectAll('text')
                .data(barData)
                .transition()
                .delay(function(d,i){
                    return i/barData.length*50;
                })
                .duration(300)
                .ease('cubic-in-out')
                .attr({
                    'fill': '#fff',
                    'font-size': '14px',
                    'font-weight': 'bold',
                    'text-anchor': 'middle',
                    x: function(d,i){
                        return padding + (w - padding*2)/barData.length*i + barWidth/2;
                    },
                    y: function(d){
                        return h - (padding + d*10);
                    },
                    dy: '1em'
                })
                .text(function(d){
                    return d;
                });

            //enter
            svg.selectAll('rect')
                .data(barData)
                .enter()            //返回缺失元素的部分
                .append('rect')
                .attr({
                    'fill': function(d){
                        return 'rgb(255, ' + (255 - d*8) +', 0';
                    },
                    x: function(d,i){
                        return padding + (w - padding*2)/barData.length*i;
                    },
                    y: function(d){
                        return h - (padding + d*10);
                    },
                    'width': barWidth,
                    'height': function(d){
                        return d*10;
                    }
                });
            svg.selectAll('text')
                .data(barData)
                .enter()
                .append('text')
                .attr({
                    'fill': '#fff',
                    'font-size': '14px',
                    'font-weight': 'bold',
                    'text-anchor': 'middle',
                    x: function(d,i){
                        return padding + (w - padding*2)/barData.length*i + barWidth/2;
                    },
                    y: function(d){
                        return h - (padding + d*10);
                    },
                    dy: '1em'
                })
                .text(function(d){
                    return d;
                });

            //exit
            svg.selectAll('rect')
                .data(barData)
                .exit()
                .transition()
                .delay(function(d,i){
                    return i/barData.length*50;
                })
                .duration(300)
                .ease('cubic-in-out')
                .remove();
            svg.selectAll('text')
                .data(barData)
                .exit()
                .transition()
                .delay(function(d,i){
                    return i/barData.length*50;
                })
                .duration(300)
                .ease('cubic-in-out')
                .remove();
        }
        draw();

        $('#bar-chart-renew .ascending').click(function(){
            barData.sort(d3.ascending);        //降序
            draw();
        })
        $('#bar-chart-renew .descending').click(function(){
            barData.sort(d3.descending);        //降序
            draw();
        })
        $('#bar-chart-renew .add').click(function(){
            barData.push(Math.floor(Math.random() * 35));       //往数组的末尾新增一个或多个元素
            draw();
        })
        $('#bar-chart-renew .del').click(function(){
            barData.pop();                                      //删除数组最后一位元素
            draw();
        })
    }
    barChartRenew();
    function scalesAndAxis(){
        var scale = d3.scale.linear().domain([0,300]).range([0,10]);
        console.log(scale(150));        //5
        console.log(scale.invert(8));   //240

        scale.clamp(true);
        console.log(scale(500));        //10

        console.log(scale(200));        //6.666666666666666
        scale.rangeRound([0,10]);
        console.log(scale(200));        //7

        scale.domain([0.9999999996,299.233333333]).nice();
        console.log(scale.domain());    //[0, 300]

        var ticks = scale.ticks(3);
        console.log(ticks);            //[0, 100, 200, 300]

        var tickFormat = scale.tickFormat(3,"+%");
        for(var i = 0;i<ticks.length;i++){
            ticks[i] = tickFormat(ticks[i]);
        }
        console.log(ticks);            //["+0%", "+10000%", "+20000%", "+30000%"]
    }
    scalesAndAxis();
    function colorCategory10(){
        var w = 600,
            h = 100;
        var colorData = d3.range(1,20,2);
        var svg = d3.select('#category10').append('svg').attr({'width':w,'height':h});
        var color = d3.scale.category10();

        var radius = w/(colorData.length*2);
        svg.selectAll('circle')
            .data(colorData)
            .enter()
            .append('circle')
            .attr({
                'cx': function(d,i){
                    return radius*(2*i+1);
                },
                'cy': 50,
                'r': function(d){
                    return radius;
                },
                'fill': function(d,i){
                    return color(i);
                }
            });
        svg.selectAll('text')
            .data(colorData)
            .enter()
            .append('text')
            .attr({
                'x': function(d,i){
                    return radius*(2*i+1);
                },
                'y': radius + 50,
                'dy': '1em',
                'fill': '#000',
                'font-size': '12px',
                'text-anchor': 'middle'
            })
            .text(function(d,i){
                return color(i);
            });
    }
    colorCategory10();
    function colorCategory20(){
        var w = 600,
            h = 36;
        var colorData = d3.range(1,20);
        var svg = d3.select('#category20').append('svg').attr({'width':w,'height':h});
        var color = d3.scale.category20();

        var radius = w/(colorData.length*2);
        svg.selectAll('circle')
            .data(colorData)
            .enter()
            .append('circle')
            .attr({
                'cx': function(d,i){
                    return radius*(2*i+1);
                },
                'cy': 18,
                'r': radius,
                'fill': function(d,i){
                    return color(i);
                }
            });
    }
    colorCategory20();
    function colorCategory20b(){
        var w = 600,
            h = 36;
        var colorData = d3.range(1,20);
        var svg = d3.select('#category20b').append('svg').attr({'width':w,'height':h});
        var color = d3.scale.category20b();

        var radius = w/(colorData.length*2);
        svg.selectAll('circle')
            .data(colorData)
            .enter()
            .append('circle')
            .attr({
                'cx': function(d,i){
                    return radius*(2*i+1);
                },
                'cy': 18,
                'r': radius,
                'fill': function(d,i){
                    return color(i);
                }
            });
    }
    colorCategory20b();
    function colorCategory20c(){
        var w = 600,
            h = 36;
        var colorData = d3.range(1,20);
        var svg = d3.select('#category20c').append('svg').attr({'width':w,'height':h});
        var color = d3.scale.category20c();

        var radius = w/(colorData.length*2);
        svg.selectAll('circle')
            .data(colorData)
            .enter()
            .append('circle')
            .attr({
                'cx': function(d,i){
                    return radius*(2*i+1);
                },
                'cy': 18,
                'r': radius,
                'fill': function(d,i){
                    return color(i);
                }
            });
    }
    colorCategory20c();

    function barChartAxis(){
        var w = 600,
            h = 400,
            padding = 20,
            barData = [8,12,15,20,10,25,15,35,30,22,16,25,12,18,9];
        var svg = d3.select('#bar-chart-axis').append('svg').attr({'width':w,'height':h});
        var color = d3.scale.category20c();

        var xScale = d3.scale.ordinal().domain(d3.range(barData.length)).rangeRoundBands([padding,w - padding],0.2);
        var yScale = d3.scale.linear().domain([0,d3.max(barData)]).range([h - padding,padding]);

        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        svg.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr({
                'fill': function(d,i){
                    return color(i);
                },
                'x': function(d,i){
                    return xScale(i);
                },
                'y': function(d){
                    return yScale(d);
                },
                'width': xScale.rangeBand(),
                'height': function(d){
                    return h - (padding + yScale(d));
                }
            });

        svg.selectAll('text')
            .data(barData)
            .enter()
            .append('text')
            .attr({
                'fill': '#fff',
                'font-size': '14px',
                'text-anchor': 'middle',
                'x': function(d,i){
                    return xScale(i) + xScale.rangeBand()/2;
                },
                'y': function(d){
                    return yScale(d);
                },
                'dy': '1em'
            })
            .text(function(d){
                return d;
            });

        svg.append('g')
            .attr({
                'class': 'axis',
                'transform': 'translate(0, ' + (h - padding) +')'
            })
            .call(xAxis);
        svg.append('g')
            .attr({
                'class': 'axis',
                'transform': 'translate(' + padding +', 0)'
            })
            .call(yAxis);
    }
    barChartAxis();

    function scatterChartAxis() {
        var w = 600,
            h = 400,
            padding = 30,
            chartData = [[5,20], [480,90], [250,50], [100,30], [330,95], [410,12],[475,44], [25,67], [85,21], [220,88]];
        var svg = d3.select('#scatter-chart-axis').append('svg').attr({'width':w,'height':h});

        var xScale = d3.scale.linear()
            .domain([0,d3.max(chartData,function(d){return d[0];})])
            .rangeRound([padding,w - padding]);
        var yScale = d3.scale.linear()
            .domain([0,d3.max(chartData,function(d){return d[1];})])
            .rangeRound([h - padding,padding]);
        var rScale = d3.scale.linear()
            .domain([0,d3.max(chartData,function(d){return d[1];})])
            .range([8,20]);
        var colorScale = d3.scale.category20();

        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        svg.selectAll('circle')
            .data(chartData)
            .enter()
            .append('circle')
            .attr({
                'cx': function (d) {
                    return xScale(d[0]);
                },
                'cy': function (d) {
                    return yScale(d[1]);
                },
                'r': function (d) {
                    return rScale(d[1]);
                },
                'fill': function (d) {
                    return colorScale(d[1]);
                }
            });
        
        svg.append('g')
            .attr({
                'class': 'axis',
                'transform': 'translate(0, ' + (h -padding) + ')'
            })
            .call(xAxis);

        svg.append('g')
            .attr({
                'class': 'axis',
                'transform': 'translate(' + padding + ', 0)'
            })
            .call(yAxis);
    }
    scatterChartAxis();
    
});
