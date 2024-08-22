// Let's add functionality to the questions.html page.

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('.question-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // getting user details
        let username = document.getElementById('username').value.trim();
        let userAge = document.getElementById('userAge').value.trim();
        let gender = document.getElementById('gender').value.trim();


        // getting user answers
        let question1 = document.getElementById('question1').value.trim();
        let question2 = document.getElementById('question2').value.trim();
        let question3 = document.getElementById('question3').value.trim();


        // console.log("Question 1:", question1);
        // console.log("Question 2:", question2);
        // console.log("Question 3:", question3);

        // Validate that all answer fields are filled
        if (!question1 || !question2 || !question3) {
            alert("Please answer all the questions before submitting.");
            return; // Stop form submission if any field is empty
        }

        // now let's store user details & answers in localstorage
        let newResponse = {
            username: username,
            userAge: userAge,
            gender: gender,
            question1: question1,
            question2: question2,
            question3: question3,
            likes: 0,
            id: Date.now()
        }

        let responses = JSON.parse(localStorage.getItem('responses')) || [];
        responses.push(newResponse);
        localStorage.setItem('responses', JSON.stringify(responses));

        
        form.reset();
        window.location.href = 'responses.html';


    });

    

})