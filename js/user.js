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
    $('#pbar').css('width', (user.experience / user.levelExp * 100) + '%');

    var badgeInt = 0;
    for (var i = 0; i < 6; ++i) {
        badgeInt += ($($('#badges').children()[i]).css('opacity') === '1') ? Math.pow(2, i) : 0;
        console.log($($('#badges').children()[i]).css('opacity'));
    }

    firebase.database().ref('users/' + user.uid).set(
        {
            level: user.level,
            experience: user.experience,
            levelExp: user.levelExp,
            name: user.name,
            badges: badgeInt
        });

}

function unlockBadge(badgeIndex) {
    var badges = $('#badges').children();
    badges[badgeIndex].style = 'opacity: 1';
}
