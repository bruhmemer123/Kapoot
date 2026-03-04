let currentQuestion=Math.floor(Math.random()*10)
let points=0
let questionCount=0
const maxQuestions=10
let totalTimeRemaining=60
let qnTimeRemaining=10
let totalTimer=null
let qnTimer=null
function startTotalTimer(){
    totalTimer=setInterval(()=>{
        totalTimeRemaining--
        document.querySelector(".totaltimer").textContent="Total time:"+totalTimeRemaining
        if(totalTimeRemaining==0){
            clearInterval(totalTimer)
            clearInterval(qnTimer)
            endGame()
        }
    },1000)

}
function startGame(){
    let menu=document.getElementById("menu")
    let questions=document.getElementById("questions")
    menu.classList.add("hide")
    questions.classList.remove("hide")
    totalTimeRemaining=60
    startTotalTimer()
    loadQuestion()

}

function loadQuestion(){
    document.getElementById("questions").classList.remove("hide")
    document.getElementById("correct").classList.add("hide")
    document.getElementById("incorrect").classList.add("hide")
    document.querySelector(".points").textContent="Points:"+points
    if(questionCount>=maxQuestions||questionsData.length===0){
        endGame()
        return
    }
    qnTimeRemaining=10
    clearInterval(qnTimer)
    qnTimer=setInterval(()=>{
        qnTimeRemaining--
        document.querySelector(".qntimer").textContent="Question time:"+qnTimeRemaining
        if(qnTimeRemaining==0){
            clearInterval(qnTimer)
            points-=2
            document.getElementById("incorrect").classList.remove("hide")
            questionsData.splice(currentQuestion,1)
            questionCount++;
            loadQuestion()
        }
    },1000)
    
    currentQuestion=Math.floor(Math.random() * questionsData.length)
    let q=questionsData[currentQuestion]
    document.querySelector(".question").textContent=q.question
    let buttons=document.querySelectorAll(".answers button")
    buttons.forEach(btn => btn.disabled = false)
    buttons.forEach((button, index) => {
        button.textContent=q.answers[index]
        button.onclick=function(){
            buttons.forEach(btn => btn.disabled = true)
            clearInterval(qnTimer)
            if(index===q.correct){
                points+=5
                document.getElementById("correct").classList.remove("hide")
            } else {
                points-=2
                document.getElementById("incorrect").classList.remove("hide")
            }
            console.log(points)
            questionsData.splice(currentQuestion,1)
            questionCount++;
            setTimeout(loadQuestion, 300);
        }
    })
}

function endGame(){
    clearInterval(totalTimer);
    clearInterval(qnTimer);

    document.getElementById("questions").classList.add("hide");
    alert("Game Over! Final Score: " + points);
}