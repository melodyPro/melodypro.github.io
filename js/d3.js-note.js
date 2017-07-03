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
        var $numbering = $('<ul>').addClass('line-num');
        $(this).parent().prepend($numbering);
        for(var i=1;i<=lines;i++){ $numbering.append($('<li="">').text(i));
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
        for(var i = 0;i</=lines;i++){></ul>