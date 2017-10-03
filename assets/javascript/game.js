// JavaScript Document


$(document).ready(function() {
// Creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper



function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/wrong.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	console.log("HERE")
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter].question + 
		"</p><p class='first-answer answer'>" + questionArray[questionCounter].choices[0] + 
		"</p><p class='answer'>" + questionArray[questionCounter].choices[1] +
		"</p><p class='answer'>" + questionArray[questionCounter].choices[2] +
		"</p><p class='answer'>" + questionArray[questionCounter].choices[3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 14) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	timeleft = 30;
	function thirtySeconds() {
		//progress bar//
		document.getElementById("progressBar").value = 30 - --timeleft;
//		$("#progressBar").value = 30 - --timeleft;
		//progress bar//
		
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Finished, here's your results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
	{
		question: 'The Beatles - Which album features the song \'Come Together\'?',
		choices: ['Abbey Road', 'Help!', 'Revolver', 'Rubber Soul']
	},
	{
		question: 'Which of these songs was written by the band Aerosmith?',
		choices: ['Whole Lotta Love', 'Sweet Emotion', 'Detroit Rock City', 'Runnin with the devil']
	},
	{
		question: 'What album is certified as the best-selling of all time with 46 million sales?',
		choices: ['Hotel California', 'Back in Black', 'Rumours', 'Thriller']
	},
	{
		question: 'What song features the lyrics \'we don\'t need no education\'?',
		choices: ['Another Brick in the Wall', 'Hot for Teacher', 'School\'s Out', 'Don\'t Stand So Close to Me']
	},
	{
		question: 'Which of these bands did not originate from the United Kingdom?',
		choices: ['Queen', 'Pink Floyd', 'The Doors', 'Black Sabbath']
	},
	{
		question: 'Which modern pop artist is known for singing \'Firework\'?',
		choices: ['Nicki Minaj', 'Katy Perry', 'Adele', 'Ed Sheeran']
	},
	{
		question: 'Who won the 2015 Grammy Award for Record of the Year?',
		choices: ['Sam Smith', 'Meghan Trainor', 'Iggy Azalea', 'Sia']
	},
	{
		question: 'Which of these songs does not begin with a drum solo?',
		choices: ['My Sharona - The Knack', 'Walk This Way - Aerosmith', 'Jump - Van Halen', 'Billie Jean - Michael Jackson']
	},
	{
		question: 'Eddie Van Halen, Eric Clapton, and Jimmy Page all use what instrument?',
		choices: ['Keyboards', 'Bass', 'Drums', 'Guitar']
	},
	{
		question: 'Which \'90s rapper performed the song \'Gangsta\'s Paradise\'?',
		choices: ['Ice Cube', 'Coolio', 'Snoop Dogg', 'Notorious B.I.G.']
	},
	{
		question: 'Which composer is known for the piece \'The Four Seasons\'?',
		choices: ['Ludwig Van Beethoven', 'Giuseppe Verdi', 'Antonio Vivaldi', 'George Frideric Handel']
	},
	{
		question: 'Which of these well-known bands never had a #1 hit in the U.S.?',
		choices: ['Led Zeppelin', 'Eagles', 'Fleetwood Mac', 'The Rolling Stones']
	},
	{
		question: 'What country singer is known for the song \'Achy Breaky Heart\'?',
		choices: ['Garth Brooks', 'Kenny Chesney', 'Dwight Yoakam', 'Billy Ray Cyrus']
	},
	{
		question: 'Complete the missing lyric: \'Is this the real life? Is this just _____?\'',
		choices: ['fantasy', 'imagination', 'destiny', 'delusion']
	},
	{
		question: 'Which song by Psy has been viewed over 2 billion times on YouTube?',
		choices: ['Harry Styles', 'Gangnam Style', 'Wild Style', 'Gundam Style']
	},
	];

var imageArray = [
	"<img class='center-block img-right' src='http://www.pocketfullofliberty.com/wp-content/uploads/2014/05/beatles-abbey-road.jpg'>",
	"<img class='center-block img-right' src='https://img.discogs.com/CJbkiPYI6vT89AV0_rbib5MPSro=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-8624995-1489210032-2136.jpeg.jpg'>",
	"<img class='center-block img-right' src='https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png'>",
	"<img class='center-block img-right' src='https://i.scdn.co/image/c5c31ae0b743f271d0585f13f976cec1e70db457'>",
	"<img class='center-block img-right' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Doors_electra_publicity_photo.JPG/1200px-Doors_electra_publicity_photo.JPG'>",
	"<img class='center-block img-right' src='http://busyteacher.org/uploads/posts/2011-01/1295883356_katy-perry-fireworks-fanmade.png'>",
	"<img class='center-block img-right' src='http://celebmix.com/wp-content/uploads/2016/03/sam-smith-apologizes-for-his-oscar-speech-01.jpg'>",
	"<img class='center-block img-right' src='https://i.ytimg.com/vi/IlHY8MXvf28/maxresdefault.jpg'>",
	"<img class='center-block img-right' src='http://youtubemusicsucks.com/wp-content/uploads/2016/11/jimmy-page-playing-guitar.jpg'>",
	"<img class='center-block img-right' src='https://pbs.twimg.com/profile_images/843639270128697344/VOL9rf-o.jpg'>",
	"<img class='center-block img-right' src='https://i.ytimg.com/vi/xpZUSAIQyLo/hqdefault.jpg'>",
	"<img class='center-block img-right' src='https://www.rockhall.com/sites/default/files/styles/header_image_portrait/public/ledzeppelin1973_gruen_webuseonly.jpg?itok=6FZA_P3p'>",
	"<img class='center-block img-right' src='https://www.biography.com/.image/t_share/MTE1ODA0OTcxNDE5NDAzNzg5/billy-ray-cyrus-227601-1-402.jpg'>",
	"<img class='center-block img-right' src='https://images-na.ssl-images-amazon.com/images/I/71M%2BI5aOauL._SY355_.jpg'>",
	"<img class='center-block img-right' src='https://upload.wikimedia.org/wikipedia/en/a/ad/Gangnam_Style_Official_Cover.png'>",
];
var wrongImagesArray = ["https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif", "https://media.giphy.com/media/BPZenX37AtXyw/giphy.gif"];
var correctAnswers = ["Abbey Road", "Sweet Emotion", "Thriller", "Another Brick in the Wall", "The Doors", "Katy Perry", "Sam Smith", "Jump - Van Halen", "Guitar", "Coolio", "Antonio Vivaldi", "Led Zeppelin", "Billy Ray Cyrus", "fantasy", "Gangnam Style",];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/button-click.mp3");
