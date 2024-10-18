const sendBtn = document.getElementById('sendBtn')
const textbox = document.getElementById('textbox')
const chatContainer = document.getElementById('chatContainer')
let arrayOfPossibleMessages = []; 

const user = {message : ''}

// var arrayOfPossibleMessages = [
//     {message: "hi" , response: "Hello my friend"},
//     {message: "how are you?" , response: "I'm fine, thank you!"},
//     {message: "i am fine too" , response: "I'm glad for that, how can i help you?"},
//     {message: "how old are you" , response: "Alexander created me in October 2024"},
//     {message: "what is your name" , response: "My name is Alekor Chatbot"},
// ]
fetch('/messages.json')
    .then(response => response.json())
    .then(data => {
        arrayOfPossibleMessages = data;  // Store the messages from the JSON file
    })
    .catch(error => {
        console.error('Error loading messages:', error);
    });

// Function to display user message
function sendMessage(userMessage){
    const messageElement = document.createElement('div')
    messageElement.style.textAlign = 'right'
    messageElement.style.margin = '0.7rem'
    messageElement.innerHTML = "<span><b>You: </b></span>" +
                                "<span>" + userMessage + "</span>";
    chatContainer.appendChild(messageElement)
}

// Function to display chatbot response
function chatbotResponse(userMessage){

    const messageElement = document.createElement('div')
    

        var result = arrayOfPossibleMessages.filter(val => val.message.includes(userMessage.toLowerCase()))
        if(result.length>0){
            var response = result[0].response
            chatbotMessage = response
        }else {
            chatbotMessage = 'I am not trained yet for this question'
        }
    
    
    setTimeout(()=> {
        messageElement.innerHTML = "<span><b>Chatbot: </b></span>" +
        "<span>" + chatbotMessage + "</span>";

        messageElement.animate([{easing:"ease-in", opacity:0.6}, {opacity:1}], {duration:500})
        messageElement.style.marginBottom='1rem'
        chatContainer.appendChild(messageElement)
        chatContainer.scrollTop = chatContainer.scrollHeight
    }, 500)
    
}

sendBtn.addEventListener('click', (e) => {
    const userMessage = textbox.value;
    if(userMessage == ""){
        alert('Please type a message')
    }else{
        var userMessageText = userMessage.trim();
        user.message = userMessageText;
        textbox.value=''
        sendMessage(userMessageText)
        chatbotResponse(userMessage)
    }
})

textbox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const userMessage = textbox.value;
        if(userMessage == ""){
            alert('Please type a message')
        }else{
            var userMessageText = userMessage.trim();
            user.message = userMessageText;
            textbox.value=''
            sendMessage(userMessageText)
            chatbotResponse(userMessage)
            e.preventDefault(); // Prevents default behavior (like adding a newline)
        }
        
    }
});