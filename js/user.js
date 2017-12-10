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



    firebase.database().ref('users/' + user.uid).set(
        {
            level: user.level,
            experience: user.experience,
            levelExp: user.levelExp,
            name: user.name
        });

}

function unlockBadge(badgeIndex) {
    var badges = $('#badges').children();
    badges[badgeIndex].style = 'opacity: 1';
}
