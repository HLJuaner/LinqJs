const  pageSize = 5;
//创建一组json数据
var people = [
    { Id:1,Name:"张三",Age:18,Sex:"男"},
    { Id:2,Name:"李四",Age:35,Sex:"女"},
    { Id:3,Name:"王五",Age:45,Sex:"男"},
    { Id:4,Name:"赵六",Age:19,Sex:"男"},
    { Id:5,Name:"孙七",Age:20,Sex:"女"},
    { Id:6,Name:"赵四",Age:55,Sex:"女"},
    { Id:7,Name:"刘能",Age:58,Sex:"男"},
    { Id:8,Name:"王二丫",Age:25,Sex:"女"},
    { Id:9,Name:"嘻嘻哈",Age:36,Sex:"男"},
    { Id:10,Name:"嘿嘿",Age:16,Sex:"女"}
];

var $ = function (id) {
    return document.getElementById(id)
}

var getPeople = function (curPage,peopleArray) {
    peopleArray = peopleArray == undefined ? people  : peopleArray;
    var peopleHtml = "";
    var peopleList = Enumerable.From(peopleArray)
        .Take(pageSize * curPage)
        .Skip(pageSize * (curPage - 1))
        .ToArray(); //必须将返回的类型转为 Array 否则 返回的数据类型为 linq.js自定义的 Enumerable 类型 这点不要忘了

    // value 代表 json中 object 对象  index 表示 json中 object 对象下标
    Enumerable.From(peopleList).ForEach(function (value,index) {
        peopleHtml += "<tr>";
        peopleHtml += "<td>" + parseInt(index + 1) + "</td>";
        peopleHtml += "<td>" + value.Name + "</td>";
        peopleHtml += "<td>" + value.Age + "</td>";
        peopleHtml += "<td>" + value.Sex + "</td>";
        peopleHtml += "</tr>";
    });
    $("peopleData").innerHTML = peopleHtml;
    $("pagination").innerHTML = setPage(curPage,peopleArray);
}

var setPage = function (curPage,peopleArray) {
    //根据数据总数 和  每页显示总数 计算处 分页的总数
    const pages = Math.floor(peopleArray.length / pageSize) == 0 ? 1 :  Math.floor(peopleArray.length / pageSize);
    //上一页 取绝对值
    const previousPage = Math.abs(curPage - 1);
    //下一页
    const nextPage = parseInt(curPage + 1);
    var pageHtml = "";
    pageHtml += previousPage <= 0 ? "<li class=\"disabled\"><span>&laquo;</span></li>"  : "<li><a href='javascript:getPeople(" + previousPage + ")'>&laquo;</a></li>";
    for(var i = 0; i < pages ; i++){
        var pageIndex = parseInt( i + 1 );
        if(pageIndex == curPage){
            pageHtml += "<li class=\"active\"><span>"+  pageIndex +"</span></li>";
        }else{
            pageHtml += "<li><a href='javascript:getPeople(" + pageIndex + ")'>"+  pageIndex +"</a></li>";
        }
    }
    pageHtml += nextPage > pages ? "<li class=\"disabled\"><span>&raquo;</span></li>"  : "<li><a href='javascript:getPeople(" + nextPage + ")'>&raquo;</a></li>";
    return pageHtml;
}

var search = function () {
    var searchContent = $("searchContent").value;
    var peopleArray = people;
    if(searchContent != ""){
        peopleArray =  Enumerable.From(peopleArray).Where("$.Name == '" + searchContent + "'").ToArray();
    }
    getPeople(1,peopleArray);
}

window.onload = function () {
    getPeople(1,people);
}
