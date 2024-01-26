document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.nosubmit');
    const searchButton = document.querySelector('.butonatikla');
    const usernameText = document.querySelector('.text2');
    const nameText = document.querySelector('.text1');
    const bioText = document.querySelector('.text3');
    const joinedDateText = document.querySelector('.text4');
    const reposCount = document.querySelector('.sayilar p:nth-child(1)');
    const followersCount = document.querySelector('.sayilar p:nth-child(2)');
    const followingCount = document.querySelector('.sayilar p:nth-child(3)');
    const locationText = document.querySelector('.lokasyon');
    const twitterLink = document.querySelector('.twitter a');
    const urlLink = document.querySelector('.link a');
    const userImage = document.querySelector('.foto'); // Added this line

    searchButton.addEventListener('click', function () {
        const username = searchInput.value.trim();
        if (username !== '') {
            // Make a request to the GitHub API to get user data
            fetch(`https://api.github.com/users/${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Not Found') {
                        // Handle case when user is not found
                        alert('User not found!');
                    } else {
                        // Update HTML elements with user data
                        userImage.src = data.avatar_url; // Display the user's profile picture
                        nameText.textContent = data.name || 'Name';
                        usernameText.textContent = `@${data.login}`;
                        bioText.textContent = data.bio || 'This profile has no bio';
                        joinedDateText.textContent = `Joined date: ${new Date(data.created_at).toDateString()}`;
                        reposCount.textContent = data.public_repos;
                        followersCount.textContent = data.followers;
                        followingCount.textContent = data.following;
                        locationText.textContent = data.location || 'Location';
                        twitterLink.textContent = data.twitter_username || 'N/A';
                        twitterLink.href = `https://twitter.com/${data.twitter_username}`;
                        urlLink.textContent = data.blog || 'N/A';
                        urlLink.href = data.blog;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });
});


