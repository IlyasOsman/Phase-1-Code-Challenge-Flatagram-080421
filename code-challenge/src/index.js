let cardContent;
//Function to display fetched data onto DOM(card)
function cardDisplay(card){
//Getting card content
cardContent = card
cardList = document.getElementById('comments-list'),
cardCommentForm = document.getElementById('comment-form'),
cardCommentInput = document.getElementById('comment'),
cardLikes = document.getElementById('like-count'),
cardLikesBtn = document.getElementById('like-button'),
cardTitle = document.getElementById('card-title'),
cardImage = document.getElementById('card-image'),

cardTitle.textContent = card.title;
cardImage.src = card.image;
cardLikes.textContent = `${card.likes} likes`;

//Removing last child from list
while(cardList.hasChildNodes()){
    cardList.removeChild(cardList.lastChild)
}

card.comments.forEach(comment => {
    let commentTag = document.createElement('li');
    commentTag.textContent = comment.content;
    cardList.appendChild(commentTag);
});

cardLikesBtn.addEventListener('click', (e) => {
    card.likes += 1;
    cardLikes.textContent = `${card.likes} Likes`
    
})

cardCommentForm.addEventListener('submit', (e) => {
    const commentInput = document.querySelector('#comment')
    e.preventDefault();
    let commentTag = document.createElement('li');
    commentTag.textContent = cardCommentInput.value;
    cardList.appendChild(commentTag);
    
    const newComment = {
        id: card.comments.length+1,
        imageId: 1,
        content: cardCommentInput.value
    }
    card.comments.push(newComment);

    fetch('http://localhost:3000/images/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    })

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`Error: ${error}`));
    
    fetch('http://localhost:3000/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`Error: ${error}`));
    
    cardCommentForm.reset();
});

};



function fetchData(path=1){
url = `http://localhost:3000/images/${path}`;
fetch(url)
.then(response => response.json())
.then(data => cardDisplay(data))
.catch(error => console.log(`Error: ${error}`));
};
fetchData();  
