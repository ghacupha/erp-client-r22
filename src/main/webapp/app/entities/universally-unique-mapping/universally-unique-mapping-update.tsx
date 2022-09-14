import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';
import { getEntity, updateEntity, createEntity, reset } from './universally-unique-mapping.reducer';

export const UniversallyUniqueMappingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const universallyUniqueMappingEntity = useAppSelector(state => state.universallyUniqueMapping.entity);
  const loading = useAppSelector(state => state.universallyUniqueMapping.loading);
  const updating = useAppSelector(state => state.universallyUniqueMapping.updating);
  const updateSuccess = useAppSelector(state => state.universallyUniqueMapping.updateSuccess);

  const handleClose = () => {
    navigate('/universally-unique-mapping' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...universallyUniqueMappingEntity,
      ...values,
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
          ...universallyUniqueMappingEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="erpSystemR22App.universallyUniqueMapping.home.createOrEditLabel" data-cy="UniversallyUniqueMappingCreateUpdateHeading">
            Create or edit a Universally Unique Mapping
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
                <ValidatedField name="id" required readOnly id="universally-unique-mapping-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Universal Key"
                id="universally-unique-mapping-universalKey"
                name="universalKey"
                data-cy="universalKey"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Mapped Value"
                id="universally-unique-mapping-mappedValue"
                name="mappedValue"
                data-cy="mappedValue"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/universally-unique-mapping" replace color="info">
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

export default UniversallyUniqueMappingUpdate;
