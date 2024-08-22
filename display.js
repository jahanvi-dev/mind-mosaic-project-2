document.addEventListener('DOMContentLoaded', () => {
    let responseList = document.getElementsByClassName('responseList')[0];
    let responses = JSON.parse(localStorage.getItem('responses')) || [];
    let likedResponses = JSON.parse(localStorage.getItem('likedResponses')) || {};
    let comments = JSON.parse(localStorage.getItem('comments')) || {};


    responses.forEach(response => {
        let responseItem = document.createElement('div');
        responseItem.classList.add('response_item');
        responseItem.innerHTML = 
        `<div class = "displayBox1"> 
        <p class = "userData"> ${response.username}, ${response.userAge} </p>
        <button class = "likeButton" dataId ="${response.id}">
        Like  <span class = "likeCount"></span> </button>
        </div>


        <p class = "answersBox" ><strong>Ans 1:</strong> ${response.question1}</p>
        <p class = "answersBox"><strong>Ans 2:</strong> ${response.question2}</p>
        <p class = "answersBox"><strong>Ans 3:</strong> ${response.question3}</p>


        <div class = "comment_section" dataId ="${response.id}">
        <h4> View all comments : </h4>
                <div class="comments_list">
                    ${comments[response.id] ? comments[response.id].map(comment => `<p> - ${comment}</p>`).join('') : '<p class = "no_comment" >No comments yet.</p>'}
                </div>
                <div class = "commentContainer">
                <textarea class="comment_input" placeholder="Add a comment" minlength="30"></textarea>
                <button class="comment_button" dataId="${response.id}">Submit Comment</button>
                </div>
                </div>`;

        let likeButton = responseItem.querySelector('.likeButton');
        let commentButton = responseItem.querySelector('.comment_button');

        if(likedResponses[response.id]){
            likeButton.disabled = true;
            likeButton.textContent = `Liked ${response.likes}`;
        }

        likeButton.addEventListener('click', () => {
            if(!likedResponses[response.id]){
                response.likes += 1;
                likedResponses[response.id] = true;
                localStorage.setItem('responses', JSON.stringify(responses));
                localStorage.setItem('likedResponses', JSON.stringify(likedResponses));

                likeButton.disabled = true;
                likeButton.textContent = `Liked ${response.likes}`;


            }       
    });

    commentButton.addEventListener('click', () => {
        let commentInput = responseItem.querySelector('.comment_input');
        let commentText = commentInput.value.trim();

        if(commentText){
            if(!comments[response.id]){
                comments[response.id] =[];
            }
            comments[response.id].push(commentText);
            localStorage.setItem('comments', JSON.stringify(comments));
            
            let commentList = responseItem.querySelector('.comments_list');
            commentList.innerHTML = comments[response.id].map(comment => `<p>${comment}</p>`).join('');
            commentInput.value = '';
        }   

     });

     responseList.appendChild(responseItem);



    })
})