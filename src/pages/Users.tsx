import SignUpForm from '../features/authentication/SignUpForm';
import Row from '../ui/Row';

export default function Users() {
  return (
    <section>
      <Row type='horizontal'>
        <h1 className='text-3xl font-bold'>ساخت کاربر جدید</h1>
      </Row>

      <Row type='vertical'>
        <SignUpForm />
      </Row>
    </section>
  );
}
