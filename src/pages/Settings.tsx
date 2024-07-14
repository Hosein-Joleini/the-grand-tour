import UpdateSettingForm from '../features/settings/UpdateSettingForm';
import Row from '../ui/Row';

export default function Settings() {
  return (
    <section>
      <Row type='horizontal'>
        <h1 className='text-3xl font-bold'>بروز رسانی تنظیمات تور ها</h1>
      </Row>
      <Row type='vertical'>
        <UpdateSettingForm />
      </Row>
    </section>
  );
}
