interface SignupForm {
  name: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}
interface UserContextType  {
  userId: string | null
}

export {}

declare global {
  interface Window {
    __USER_ID__?: string
  }
}