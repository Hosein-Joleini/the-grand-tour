import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateTourForm from './CreateTourForm';

export default function AddTour() {
  return (
    <div className='mt-8'>
      <Modal>
        <Modal.Open opens='create-tour-form'>
          <Button btnType='primary'>ایجاد تور جدید</Button>
        </Modal.Open>

        <Modal.Window openWindow='create-tour-form'>
          <Modal.Header>فرم ایجاد تور جدید</Modal.Header>
          <Modal.Body>
            <Modal.Close>
              <CreateTourForm />
            </Modal.Close>
          </Modal.Body>
        </Modal.Window>
      </Modal>
    </div>
  );
}
