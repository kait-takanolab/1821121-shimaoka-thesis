var select = document.getElementById('selectNum');
//select.onchange = getselect2();
var x = document.getElementById("loop.value");

function getselect(){
    document.getElementById("box2").textContent = document.getElementById("selectNum").value;
}

function getselect2(){
    document.getElementById("box3").textContent = document.getElementById("selectNum").value;
}

//select.onchange = function alert1(){
//    alert(test);
//}


function hantei(){
    var count =0;
    var x = document.getElementById("loop").value;
    var y = document.getElementById("end").value;
    var z = document.getElementById("var").value;
//    var x = document.getElementById("loop");
    if(x == "no" || y=="no"){
        alert("選択してください");
    }
    if(x == "1"){
        count += 1;
    }
    if(y == "2"){
        count += 1;
    }
    if(z == "1"){
        count += 1;
    }
    
    console.log(z,x,y,count);
    document.getElementById("kekka").textContent = count + "問正解";
}