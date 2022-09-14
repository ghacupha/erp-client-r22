import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/erpService/placeholder/placeholder.reducer';
import { IMfbBranchCode } from 'app/shared/model/mfb-branch-code.model';
import { getEntity, updateEntity, createEntity, reset } from './mfb-branch-code.reducer';

export const MfbBranchCodeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const mfbBranchCodeEntity = useAppSelector(state => state.mfbBranchCode.entity);
  const loading = useAppSelector(state => state.mfbBranchCode.loading);
  const updating = useAppSelector(state => state.mfbBranchCode.updating);
  const updateSuccess = useAppSelector(state => state.mfbBranchCode.updateSuccess);

  const handleClose = () => {
    navigate('/mfb-branch-code' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...mfbBranchCodeEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...mfbBranchCodeEntity,
          placeholders: mfbBranchCodeEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="erpSystemR22App.mfbBranchCode.home.createOrEditLabel" data-cy="MfbBranchCodeCreateUpdateHeading">
            Create or edit a Mfb Branch Code
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="mfb-branch-code-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Bank Code" id="mfb-branch-code-bankCode" name="bankCode" data-cy="bankCode" type="text" />
              <ValidatedField label="Bank Name" id="mfb-branch-code-bankName" name="bankName" data-cy="bankName" type="text" />
              <ValidatedField label="Branch Code" id="mfb-branch-code-branchCode" name="branchCode" data-cy="branchCode" type="text" />
              <ValidatedField label="Branch Name" id="mfb-branch-code-branchName" name="branchName" data-cy="branchName" type="text" />
              <ValidatedField
                label="Placeholder"
                id="mfb-branch-code-placeholder"
                data-cy="placeholder"
                type="select"
                multiple
                name="placeholders"
              >
                <option value="" key="0" />
                {placeholders
                  ? placeholders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/mfb-branch-code" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MfbBranchCodeUpdate;
