import UpdatePassword from '../features/authentication/UpdatePassword';
import UpdateUser from '../features/authentication/UpdateUser';
import Row from '../ui/Row';

export default function Account() {
  return (
    <section>
      <Row type='horizontal'>
        <h1 className='text-3xl font-bold'>بروز رسانی حسابتان</h1>
      </Row>
      <Row type='vertical'>
        <h2 className='text-xl font-semibold mb-4'>بروز رسانی اطلاعات کاربر</h2>
        <UpdateUser />
      </Row>
      <Row type='vertical'>
        <h2 className='text-xl font-semibold mb-4'>
          بروز رسانی کلمه عبور کاربر
        </h2>
        <UpdatePassword />
      </Row>
    </section>
  );
}
