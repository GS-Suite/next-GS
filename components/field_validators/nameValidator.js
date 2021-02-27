export default function NameValidator (name) {
    var nameRegex =/^[a-z0-9 ]+$/ig;
    if (!name.match(nameRegex)){
        return false;
    }
    return true;
}