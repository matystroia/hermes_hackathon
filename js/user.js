var user = {
    level: 1,
    experience: 0,
    levelExp: 300
};

function addExp(amount) {
    user.experience += amount;
    if (user.experience >= user.levelExp) {
        ++user.level;
        user.experience = user.experience % user.levelExp;
        user.levelExp *= 1.5;
    }

    $('#lvl').text('Level ' + user.level);
    $('#pbar').css('width' , (user.experience / user.levelExp * 100) + '%');

    firebase.auth().onAuthStateChanged(function(fuser) {
        if (fuser) {
            var uid = fuser.uid;
            fuser.getIdToken().then(function(accessToken) {
                document.getElementById('user-photo').src = fuser.photoURL;
                //document.getElementById('user-photo').style.display = 'block';
                document.getElementById('user-name').textContent = displayName;
                //document.getElementById('user-email').textContent = email;
                firebase.database().ref('users/' + uid).set({s:'test'});
            });
        } else {
            document.getElementById('user-photo').style.display = 'none';
            document.getElementById('user-name').textContent = 'No user signed in.';
            //document.getElementById('user-email').textContent = 'no email provided';
        }
    }, function(error) {
        console.log(error);
    });
}

function unlockBadge(badgeIndex) {
    var badges = $('#badges').children();
    badges[badgeIndex].style = 'opacity: 1';
}
