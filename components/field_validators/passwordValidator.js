

export default function PasswordValidator (password) {
    if (password.length < 9) {
        return false;
    }
    return true;
}