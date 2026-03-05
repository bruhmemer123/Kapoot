let currentQuestion=0
let points=0
let questionCount=0
const maxQuestions=10
let totalTimeRemaining=60
let qnTimeRemaining=10
let totalTimer=null
let qnTimer=null
let correctans=[]
let wrongans=[]
let qnno=1
let tempquestions=[]
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
    tempquestions = [...questionsData]
    clearInterval(totalTimer)
    clearInterval(qnTimer)
    let menu=document.getElementById("menu")
    let questions=document.getElementById("questions")
    qnno=1
    points=0
    questionCount=0 
    correctans=[]
    wrongans=[]
    menu.classList.add("hide")
    questions.classList.remove("hide")
    document.getElementById("restart").classList.add("hide")
    document.getElementById("correctans").classList.add("hide")
    document.getElementById("wrongans").classList.add("hide")
    totalTimeRemaining=61
    document.querySelector(".totaltimer").textContent = "Total time:" + totalTimeRemaining
    startTotalTimer()
    loadQuestion()

}

function loadQuestion(){
    document.getElementById("questions").classList.remove("hide")
    document.getElementById("correct").classList.add("hide")
    document.getElementById("incorrect").classList.add("hide")
    document.querySelector(".points").textContent="Points:"+points
    if(questionCount>=maxQuestions||tempquestions.length===0){
        endGame()
        return
    }
    qnTimeRemaining=10
    document.querySelector(".qntimer").textContent = "Question time:" + qnTimeRemaining
    clearInterval(qnTimer)
    qnTimer=setInterval(()=>{
        qnTimeRemaining--
        document.querySelector(".qntimer").textContent="Question time:"+qnTimeRemaining
        if(qnTimeRemaining==0){
            clearInterval(qnTimer)
            points-=2
            document.getElementById("incorrect").classList.remove("hide")
            tempquestions.splice(currentQuestion,1)
            questionCount++;
            loadQuestion()
        }
    },1000)
    
    currentQuestion=Math.floor(Math.random() * tempquestions.length)
    let q=tempquestions[currentQuestion]
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
                correctans.push(qnno++)
                document.getElementById("correct").classList.remove("hide")
            } else {
                points-=2
                wrongans.push(qnno++)
                document.getElementById("incorrect").classList.remove("hide")
            }
            console.log(points)
            tempquestions.splice(currentQuestion,1)
            questionCount++
            setTimeout(loadQuestion, 300)
        }
    })
}

function endGame(){
    clearInterval(totalTimer)
    clearInterval(qnTimer)
    document.querySelector(".correctans").textContent=`Correct answers:`+correctans.join(", ")
    document.getElementById("correctans").classList.remove("hide")
    document.querySelector(".wrongans").textContent=`Wrong answers:`+wrongans.join(", ")
    document.getElementById("wrongans").classList.remove("hide")
    document.getElementById("questions").classList.add("hide")
    alert("Game Over! Final Score: " + points)
    document.getElementById("restart").classList.remove("hide")
}