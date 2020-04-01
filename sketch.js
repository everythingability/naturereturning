var wrapper
var webcam
var godzilla
var textDiv
var clockDiv
var url = "https://weather.elec.york.ac.uk/web-cam/wxLive.png"
var font
var snd
var hasClicked = false
var doSetupDone = false
var dark = false


function refreshBG() {
  // Not sure if this works, it's supposed to reload the image
  var new_url = url //+"?cache=" + new Date().getTime();
  
  document.getElementById("wrapper").background= "url("+new_url+")"
  //wrapper.style("background", "url("+new_url+")")
  //wrapper.style("background-repeat", "no-repeat")
  
}

function preload() {
  //Thank you Mega-X-Stream
  //https://freesound.org/people/Mega-X-stream/sounds/427414/
  snd = loadSound("427414__mega-x-stream__dinosaur-dragon-growls.wav")
  font = loadFont("digital-7.ttf") 
}

function setup() {
  var canvas = createCanvas(640, 480);

  //canvas.parent("wrapper")
  //background("black")
  
  wrapper = select("#wrapper")
  wrapper.style("background", "url("+url+")")
  wrapper.style("background-repeat", "no-repeat")
  
  godzilla = createImg("godzilla.png", "godzilla")
  //godzilla.id("godzilla")
  godzilla.parent("wrapper")
  godzilla.style('z-index', '2')
  godzilla.style('opacity', 0.9)
  
  

  clockDiv = createDiv("LOADING...", "clock")
  clockDiv.id("clock")
  clockDiv.parent("wrapper")
  //clockDiv.position(230, 430)
  clockDiv.style('z-index', '5')
  

  textDiv = createDiv('From: <a href="https://weather.elec.york.ac.uk/camera.html" target="_blank">https://weather.elec.york.ac.uk/camera.html</a>', 'wrapper');
  textDiv.id("text")  
  textDiv.parent("wrapper")

  setInterval(refreshBG, 5000); //do this every 5 seconds
  setInterval(updateClock, 1000); //do this every 1 second
  
  doSetupDone = true
  fullscreen( true )

}

function mousePressed(){
 snd.play()  
}

function draw(){
  if (dark==true){
   
    godzilla.style('-webkit-filter', 'grayscale(70%)')
    godzilla.style('greyscale', 'grayscale(70%)')
    godzilla.style('filter', 'brightness(40%)')
    godzilla.style('-webkit-filter', 'brightness(40%)')
    godzilla.style('-moz-filter', 'brightness(40%)')
    
  }
}




function updateClock() {

  let Hour = hour();
  let realHour = hour()
  
  let min = minute();
  let secs = second()
  let noon = Hour >= 12 ? " PM" : " AM"
  
  if (min < 10)
    min = "0" + min
  Hour %= 12
  
  if (realHour > 19 |realHour < 5){
    dark = true
  }

  var theTime = Hour + ":" + min + ":" + secs + noon
  //print( clockDiv, theTime)
  

  clockDiv.html(theTime)

}