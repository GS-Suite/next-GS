

export default function EmailValidator (email) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ((!email.match(emailRegex)) | (email.length < 5)){
        return false;
    }
    return true;
}