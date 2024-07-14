import {
  formatCurrency,
  formatDateToFarsi,
  formatNumberToFarsi,
} from '../../utils/helpers';

import Table from '../../ui/Table';
import { TourRowType } from '../../../types/global';
import Menus from '../../ui/Menus';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import CreateTourForm from './CreateTourForm';
import ConfirmingDelete from '../../ui/ConfirmingDelete';
import useDeleteTour from './useDeleteTour';
import useDuplicateTour from './useDuplicateTour';

export default function TourRow({
  tourName,
  startDate,
  endDate,
  imageUrl,
  regularPrice,
  discount,
  maxCapacity,
  id,
  description,
  location,
  accomodation,
}: TourRowType) {
  const {
    mutate: deleteTour,
    isSuccess,
    isPending: isDeleting,
  } = useDeleteTour();

  const { mutate: duplicateTour, isPending: isDuplicating } =
    useDuplicateTour();

  function handleDuplicate() {
    duplicateTour({
      tourName: `کپی از ${tourName}`,
      startDate,
      endDate,
      imageUrl,
      regularPrice,
      discount,
      maxCapacity,
      description,
      location,
      accomodation,
    });
  }

  return (
    <Table.Row>
      <div>
        <img
          src={imageUrl!}
          alt={tourName!}
          className='w-full h-16 object-cover object-center'
        />
      </div>
      <div className='font-semibold'>{tourName}</div>
      <div className='flex flex-col'>
        از {formatDateToFarsi(startDate!)} تا {formatDateToFarsi(endDate!)}
      </div>
      <div className='font-semibold'>{formatCurrency(regularPrice!)}</div>
      <div className='text-sky-600'>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </div>
      <div>
        <strong>{formatNumberToFarsi(maxCapacity!)}</strong> نفر
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle openId={id} />
          <Menus.List nameId={id}>
            <Menus.ListItemButton
              icon={<HiSquare2Stack />}
              onClick={handleDuplicate}
              disabled={isDuplicating}
            >
              کپی
            </Menus.ListItemButton>
            <Modal.Open opens='edit-tour-form'>
              <Menus.ListItemButton
                icon={<HiPencil />}
                disabled={isDuplicating}
              >
                ویرایش
              </Menus.ListItemButton>
            </Modal.Open>

            <Modal.Open opens='delete-tour'>
              <Menus.ListItemButton icon={<HiTrash />} disabled={isDuplicating}>
                حذف
              </Menus.ListItemButton>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window openWindow='edit-tour-form'>
          <Modal.Header>فرم اصلاح تور</Modal.Header>
          <Modal.Body>
            <Modal.Close>
              <CreateTourForm tourId={id} isEditing={true} />
            </Modal.Close>
          </Modal.Body>
        </Modal.Window>

        <Modal.Window openWindow='delete-tour'>
          <Modal.Header>حذف تور</Modal.Header>
          <Modal.Body>
            <Modal.Close>
              <ConfirmingDelete
                onDelete={() => deleteTour(id)}
                isSuccess={isSuccess}
                isDeleting={isDeleting}
              >
                آیا از حذف تور مورد نظر مطمئن هستید؟ این عملیات قابل بازگشت
                نیست.
              </ConfirmingDelete>
            </Modal.Close>
          </Modal.Body>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
