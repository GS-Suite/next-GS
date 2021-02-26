export default function UsernameValidator (username) {
    var nameRegex =/^[a-z0-9_\-]+$/ig;
    if (!username.match(nameRegex)){
        return false;
    }
    return true;
}