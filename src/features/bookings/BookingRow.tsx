import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { type BookingRowType } from '../../../types/global';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Tag from '../../ui/Tag';
import {
  formatCurrency,
  formatDateToFarsi,
  formatNumberToFarsi,
} from '../../utils/helpers';
import Modal from '../../ui/Modal';
import ConfirmingDelete from '../../ui/ConfirmingDelete';
import useDeleteBooking from './useDeleteBooking';
import { useNavigate } from 'react-router-dom';
import useCashOut from '../cash-out/useCashOut';

export default function BookingRow({ bookings }: { bookings: BookingRowType }) {
  const navigate = useNavigate();

  const {
    id: bookingId,
    tours: { tourName, startDate },
    guests: { fullName, phoneNumber },
    status,
    totalPrice,
  } = bookings;

  const {
    mutate: deleteBooking,
    isSuccess,
    isPending: isDeleting,
  } = useDeleteBooking();

  const { mutate: cashOutBooking } = useCashOut();

  return (
    <Table.Row>
      <div></div>
      <div className='font-semibold text-slate-800 dark:text-slate-50'>
        {tourName}
      </div>
      <div className='flex flex-col items-start gap-3 font-medium py-1.5'>
        <span>{fullName}</span>
        <span className='text-slate-400 text-xs'>
          <span className='font-normal'>
            شماره تماس: {formatNumberToFarsi(Number(phoneNumber))}
          </span>
        </span>
      </div>
      <div className='font-medium'>{formatDateToFarsi(startDate)}</div>
      <div>
        <Tag status={status} />
      </div>
      <div className='font-medium'>{formatCurrency(totalPrice)}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle openId={bookingId} />
          <Menus.List nameId={bookingId}>
            <Menus.ListItemButton
              icon={<HiEye />}
              onClick={() => navigate(`${bookingId}`)}
            >
              دیدن جزییات
            </Menus.ListItemButton>

            {status === 'unconfirmed' ? (
              <Menus.ListItemButton
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/confirm/${bookingId}`)}
              >
                تایید رزرو
              </Menus.ListItemButton>
            ) : null}

            {status === 'confirmed' ? (
              <Menus.ListItemButton
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  cashOutBooking({ id: bookingId, status: 'cash-out' });
                }}
              >
                تسویه رزرو
              </Menus.ListItemButton>
            ) : null}

            <Modal.Open opens='delete-booking'>
              <Menus.ListItemButton icon={<HiTrash />}>
                حذف رزرو
              </Menus.ListItemButton>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window openWindow='delete-booking'>
          <Modal.Header>حذف رزرو</Modal.Header>
          <Modal.Body>
            <Modal.Close>
              <ConfirmingDelete
                isDeleting={isDeleting}
                isSuccess={isSuccess}
                onDelete={() => deleteBooking(bookingId)}
              >
                آیا از حذف رزرو مورد نظر مطمئن هستید؟ این عملیات برگشت پذیر
                نیست.
              </ConfirmingDelete>
            </Modal.Close>
          </Modal.Body>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
