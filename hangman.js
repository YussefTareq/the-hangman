const letters ="abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lets = document.querySelector(".letters");
lettersArray.forEach(letter=>{
    let span = document.createElement("span");
    let theLet = document.createTextNode(letter);
    span.appendChild(theLet);
    span.className="letter-box"
    lets.appendChild(span);
})
const words ={
    programing:["php","javascript","go","scala","fortran","r","mysql","python"],
    movies:["Prestige","Inception","Parasite","Interstellar","Whiplash","Memento","Coco","Up"],
    people:["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi"],
    countries:["Syria","Palestine","Yemen","Egypt","Bahrain","Qatar"]
}
let allKeys =Object.keys(words);

let randomPropNumber =Math.floor(Math.random()*allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber =Math.floor(Math.random()*randomPropValue.length);
let randomValueName =randomPropValue[randomValueNumber];
document.querySelector(".game-info .category span").innerHTML=randomPropName;
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace=Array.from(randomValueName);
lettersAndSpace.forEach(letter=>{
    let span =document.createElement("span")
    if(letter ===' '){
        span.className="has-space"
    }
    lettersGuessContainer.appendChild(span);
});
let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts =0;
let theDraw =document.querySelector(".hangman-draw");

document.addEventListener("click",(e)=>{
    let theStatus=false;
    if(e.target.className ==='letter-box'){
        e.target.classList.add("clicked");
        let theClickedLitter =e.target.innerHTML.toLowerCase();
        let theChosenWord =Array.from(randomValueName.toLowerCase());
        
        theChosenWord.forEach((wordLetter,wordIndex)=>{
            
            if(theClickedLitter == wordLetter){
                theStatus=true;
                guessSpans.forEach((span,spanIndex)=>{
                    if(wordIndex === spanIndex){
                        span.innerHTML =theClickedLitter;
                    }
                })
            }
        });
        if (theStatus!== true){
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("lose").play();
            if(wrongAttempts === 8){

                endGame();

                lets.classList.add("finished");
            }
        }else{
            document.getElementById("win").play();
        }
    }
});
function endGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over , The Word Is ${randomValueName}`);
    div.appendChild(divText);
    div.className = "popup";
    document.body.appendChild(div);
}