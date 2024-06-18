//Fisher-Yates shuffle algorithm
function shuffle(anyList)
{
    for(let i=anyList.length-1; i>0; i--)
    {
        //pick a random index for the second-last element
        const j=Math.floor(Math.random()*(i+1));
        [anyList[i],anyList[j]]=[anyList[j],anyList[i]];
    }
    return anyList;
}

//Initialise data storage
const quizData=[
    {
        question:"What is the capital of Japan?",
        options:["Tokyo","Osaka","Kyoto","Hokkaido"],
        answer:"Tokyo"
    },
    {
        question:"How many operational MRT stations are there in SG?",
        options:["50","300","134","220"],
        answer:"134"
    },
    {
        question:"Which company/organisation invented Chat-GPT?",
        options:["IDM","Nvidia","Tesla","OpenAI"],
        answer:"OpenAI"
    },
    {
        question:"In which year did the Titanic sink?",
        options:["1912","1920","1922","1924"],
        answer:"1912"
    },
    {
        question:"What is the tallest moutain in SG?",
        options:["Mt Faber","Mt Everest","Jurong Hill","Bukit Timah Hill"],
        answer:"Bukit Timah Hill"
    },
    {
        question:"Which is the oldest girls' school in SG?",
        options:["CHIJ","Singapore Chinese Girls'","MGS","St Margaret's School"],
        answer:"St Margaret's School"
    },
    
];

const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('timerText');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsContainer = document.getElementById('option-container');
const resultElement = document.getElementById('result');
const timerSettings=document.getElementById('timer-settings');
const timerSettingsLabel=document.getElementById('timer-settings-label');
const feedbackLabel=document.getElementById('feedback');

// Initialize progress bar to 0% before the quiz starts
progressBar.style.width = '0%';

startButton.addEventListener('click', startQuiz);

let current_index = 0;
let score = 0;
let countdownTime=parseInt(timerSettings.value);

//update countdown time when dropdown value changes
timerSettings.addEventListener('change',()=>{
    countdownTime=parseInt(timerSettings.value);
    timerText.textContent=countdownTime;
});

function startQuiz()
{
    shuffle(quizData);
    startButton.style.display = 'none'; // to hide the start button
    timerSettings.style.display='none';
    timerSettingsLabel.style.display='none';
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);

    if(current_index < quizData.length)
    {
        timerText.textContent = countdownTime;

        progressBar.style.width = `${((current_index + 1) / quizData.length) * 100}%`;

        const currentQuestionSet = quizData[current_index];
        questionElement.textContent = currentQuestionSet.question;

        // remove previous button clones
        optionsContainer.innerHTML = '';

        // Clone a button for each option
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsContainer.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        // create a timer object using setInterval() function
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset timer
                clearInterval(timer);
                showFeedback(null);
            }
        }, 1000);
    }else
    {
        endQuiz()
    }
}


function checkAnswer(option)
{
    const answer = quizData[current_index].answer;
    if(option === answer)
    {
        score++;
    }
    resultElement.textContent = `You scored ${score} point(s)`;
    clearInterval(timer);
    showFeedback(option);
}

function showFeedback(option)
{
    const currentQuizData=quizData[current_index];
    let feedback="";

    if(option===currentQuizData.answer)
    {
        feedback="Correct!";
    }else if(option===null)
    {
        feedback=`Time's up! The correct answer was ${currentQuizData.answer}`;
    }else
    {
        `Incorrect! The correct answer was ${currentQuizData.answer}`;
    }
    feedbackLabel.textContent=feedback;

    setTimeout(()=>{
        current_index++;
        loadQuestion();
        feedbackLabel.textContent="";
    },3000);
}

function endQuiz()
{
    clearInterval(timer);

    progressBarContainer.style.display='none';
    optionsContainer.style.display='none';
    timerElement.style.display='none';
    feedbackLabel.textContent="";
    questionElement.textContent="You finished the quiz! Hooray!";
}