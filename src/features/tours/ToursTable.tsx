import { type TourRowType } from '../../../types/global';
import useTours from './useTours';

import Loader from '../../ui/Loader';
import Table from '../../ui/Table';
import TourRow from './TourRow';
import AddTour from './AddTour';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

export default function ToursTable() {
  const [searchParams] = useSearchParams();
  const { tours, isLoading, error: toursError } = useTours();

  // FILTER
  const filterField = searchParams.get('discount') || 'all';

  let filteredTours = tours;

  if (filterField === 'no-discount')
    filteredTours = filteredTours?.filter((tour) => tour.discount! === 0);

  if (filterField === 'with-discount')
    filteredTours = filteredTours?.filter((tour) => tour.discount! > 0);

  // SORT
  const collator = new Intl.Collator('fa');

  const sortField = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortField.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let sortedTours = filteredTours?.sort((a, b) =>
    collator.compare(a.tourName!, b.tourName!)
  );

  if (sortField === 'name-desc') {
    sortedTours = filteredTours?.sort((a, b) =>
      collator.compare(b.tourName!, a.tourName!)
    );
  }

  if (field === 'regularPrice') {
    sortedTours =
      filteredTours &&
      filteredTours.sort((a, b) => (a[field]! - b[field]!) * modifier);
  }

  if (field === 'startDate') {
    sortedTours =
      filteredTours &&
      filteredTours?.sort(
        (a, b) =>
          (new Date(a[field]!).getTime() - new Date(b[field]!).getTime()) *
          modifier
      );
  }

  if (isLoading) return <Loader />;

  return (
    <Menus>
      <Table columns='grid-cols-[0.9fr_1.2fr_2.2fr_1.4fr_1.2fr_0.8fr_0.5fr]'>
        <Table.Header>
          <div></div>
          <div>نام تور</div>
          <div>تاریخ شروع و پایان تور</div>
          <div>قیمت تور</div>
          <div>تخفیف</div>
          <div>ظرفیت</div>
          <div></div>
        </Table.Header>
        <Table.Body
          error={toursError}
          data={sortedTours as TourRowType[]}
          render={(item: TourRowType) => <TourRow {...item} key={item.id} />}
        />
      </Table>
      <AddTour />
    </Menus>
  );
}
