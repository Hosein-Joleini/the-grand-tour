import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';

export default function Login() {
  return (
    <section className='bg-gray-100 min-h-screen w-full flex flex-col text-slate-800 items-center py-12 dark:bg-gray-900 dark:text-slate-100'>
      <Logo />
      <h1 className='text-3xl font-bold mb-8'>ورود به حساب کاربری</h1>
      <LoginForm />
    </section>
  );
}
