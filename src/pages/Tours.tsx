import ToursOperation from '../features/tours/ToursOperation';
import ToursTable from '../features/tours/ToursTable';
import Row from '../ui/Row';

export default function Tours() {
  return (
    <section>
      <Row type='horizontal'>
        <h1 className='text-3xl font-bold'>همه تور ها</h1>
        <ToursOperation />
      </Row>
      <Row type='vertical'>
        <ToursTable />
      </Row>
    </section>
  );
}
