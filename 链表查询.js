for(let i=0; i < 3; i++){
    setTimeout(function(){
        c(i)
    },1000)
}

function c(num){
    console.log(num)
}