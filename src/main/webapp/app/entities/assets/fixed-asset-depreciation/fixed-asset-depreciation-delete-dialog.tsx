import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './fixed-asset-depreciation.reducer';

export const FixedAssetDepreciationDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const fixedAssetDepreciationEntity = useAppSelector(state => state.fixedAssetDepreciation.entity);
  const updateSuccess = useAppSelector(state => state.fixedAssetDepreciation.updateSuccess);

  const handleClose = () => {
    navigate('/fixed-asset-depreciation' + location.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(fixedAssetDepreciationEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="fixedAssetDepreciationDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="erpSystemR22App.assetsFixedAssetDepreciation.delete.question">
        Are you sure you want to delete Fixed Asset Depreciation {fixedAssetDepreciationEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-fixedAssetDepreciation" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FixedAssetDepreciationDeleteDialog;
