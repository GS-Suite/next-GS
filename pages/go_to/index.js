import { useRouter } from 'next/router'

export default function Go_To() {
    const router = useRouter();
    if (localStorage.getItem("token") != null) {
        router.push("/go_to/signup")
    } else {
        router.push("/go_to/login")
    }
}