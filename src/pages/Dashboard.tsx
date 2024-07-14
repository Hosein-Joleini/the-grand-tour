import DashboardLayout from '../features/dashboard/DashboardLayout';
import DashboardOperation from '../features/dashboard/DashboardOperation';
import Row from '../ui/Row';

export default function Dashboard() {
  return (
    <section>
      <Row type='horizontal'>
        <h1 className='text-3xl font-bold'>داشبورد</h1>
        <DashboardOperation />
      </Row>
      <Row type='vertical'>
        <DashboardLayout />
      </Row>
    </section>
  );
}
