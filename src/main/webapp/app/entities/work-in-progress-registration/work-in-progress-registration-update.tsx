import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/erpService/placeholder/placeholder.reducer';
import { IPaymentInvoice } from 'app/shared/model/payment-invoice.model';
import { getEntities as getPaymentInvoices } from 'app/entities/payment-invoice/payment-invoice.reducer';
import { IServiceOutlet } from 'app/shared/model/service-outlet.model';
import { getEntities as getServiceOutlets } from 'app/entities/service-outlet/service-outlet.reducer';
import { ISettlement } from 'app/shared/model/settlement.model';
import { getEntities as getSettlements } from 'app/entities/settlement/settlement.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { getEntities as getPurchaseOrders } from 'app/entities/purchase-order/purchase-order.reducer';
import { IDeliveryNote } from 'app/shared/model/delivery-note.model';
import { getEntities as getDeliveryNotes } from 'app/entities/delivery-note/delivery-note.reducer';
import { IJobSheet } from 'app/shared/model/job-sheet.model';
import { getEntities as getJobSheets } from 'app/entities/job-sheet/job-sheet.reducer';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { getEntities as getDealers } from 'app/entities/dealers/dealer/dealer.reducer';
import { getEntities as getWorkInProgressRegistrations } from 'app/entities/work-in-progress-registration/work-in-progress-registration.reducer';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/settlement-currency/settlement-currency.reducer';
import { IWorkProjectRegister } from 'app/shared/model/work-project-register.model';
import { getEntities as getWorkProjectRegisters } from 'app/entities/work-project-register/work-project-register.reducer';
import { IWorkInProgressRegistration } from 'app/shared/model/work-in-progress-registration.model';
import { getEntity, updateEntity, createEntity, reset } from './work-in-progress-registration.reducer';

export const WorkInProgressRegistrationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentInvoices = useAppSelector(state => state.paymentInvoice.entities);
  const serviceOutlets = useAppSelector(state => state.serviceOutlet.entities);
  const settlements = useAppSelector(state => state.settlement.entities);
  const purchaseOrders = useAppSelector(state => state.purchaseOrder.entities);
  const deliveryNotes = useAppSelector(state => state.deliveryNote.entities);
  const jobSheets = useAppSelector(state => state.jobSheet.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const workInProgressRegistrations = useAppSelector(state => state.workInProgressRegistration.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const workProjectRegisters = useAppSelector(state => state.workProjectRegister.entities);
  const workInProgressRegistrationEntity = useAppSelector(state => state.workInProgressRegistration.entity);
  const loading = useAppSelector(state => state.workInProgressRegistration.loading);
  const updating = useAppSelector(state => state.workInProgressRegistration.updating);
  const updateSuccess = useAppSelector(state => state.workInProgressRegistration.updateSuccess);

  const handleClose = () => {
    navigate('/work-in-progress-registration' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getPaymentInvoices({}));
    dispatch(getServiceOutlets({}));
    dispatch(getSettlements({}));
    dispatch(getPurchaseOrders({}));
    dispatch(getDeliveryNotes({}));
    dispatch(getJobSheets({}));
    dispatch(getDealers({}));
    dispatch(getWorkInProgressRegistrations({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getWorkProjectRegisters({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...workInProgressRegistrationEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      paymentInvoices: mapIdList(values.paymentInvoices),
      serviceOutlets: mapIdList(values.serviceOutlets),
      settlements: mapIdList(values.settlements),
      purchaseOrders: mapIdList(values.purchaseOrders),
      deliveryNotes: mapIdList(values.deliveryNotes),
      jobSheets: mapIdList(values.jobSheets),
      dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
      workInProgressGroup: workInProgressRegistrations.find(it => it.id.toString() === values.workInProgressGroup.toString()),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
      workProjectRegister: workProjectRegisters.find(it => it.id.toString() === values.workProjectRegister.toString()),
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
          ...workInProgressRegistrationEntity,
          placeholders: workInProgressRegistrationEntity?.placeholders?.map(e => e.id.toString()),
          paymentInvoices: workInProgressRegistrationEntity?.paymentInvoices?.map(e => e.id.toString()),
          serviceOutlets: workInProgressRegistrationEntity?.serviceOutlets?.map(e => e.id.toString()),
          settlements: workInProgressRegistrationEntity?.settlements?.map(e => e.id.toString()),
          purchaseOrders: workInProgressRegistrationEntity?.purchaseOrders?.map(e => e.id.toString()),
          deliveryNotes: workInProgressRegistrationEntity?.deliveryNotes?.map(e => e.id.toString()),
          jobSheets: workInProgressRegistrationEntity?.jobSheets?.map(e => e.id.toString()),
          dealer: workInProgressRegistrationEntity?.dealer?.id,
          workInProgressGroup: workInProgressRegistrationEntity?.workInProgressGroup?.id,
          settlementCurrency: workInProgressRegistrationEntity?.settlementCurrency?.id,
          workProjectRegister: workInProgressRegistrationEntity?.workProjectRegister?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="erpSystemR22App.workInProgressRegistration.home.createOrEditLabel"
            data-cy="WorkInProgressRegistrationCreateUpdateHeading"
          >
            Create or edit a Work In Progress Registration
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
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="work-in-progress-registration-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Sequence Number"
                id="work-in-progress-registration-sequenceNumber"
                name="sequenceNumber"
                data-cy="sequenceNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Particulars"
                id="work-in-progress-registration-particulars"
                name="particulars"
                data-cy="particulars"
                type="text"
              />
              <ValidatedField
                label="Instalment Amount"
                id="work-in-progress-registration-instalmentAmount"
                name="instalmentAmount"
                data-cy="instalmentAmount"
                type="text"
              />
              <ValidatedBlobField
                label="Comments"
                id="work-in-progress-registration-comments"
                name="comments"
                data-cy="comments"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Placeholder"
                id="work-in-progress-registration-placeholder"
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
              <ValidatedField
                label="Payment Invoices"
                id="work-in-progress-registration-paymentInvoices"
                data-cy="paymentInvoices"
                type="select"
                multiple
                name="paymentInvoices"
              >
                <option value="" key="0" />
                {paymentInvoices
                  ? paymentInvoices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.invoiceNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Service Outlet"
                id="work-in-progress-registration-serviceOutlet"
                data-cy="serviceOutlet"
                type="select"
                multiple
                name="serviceOutlets"
              >
                <option value="" key="0" />
                {serviceOutlets
                  ? serviceOutlets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.outletCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Settlement"
                id="work-in-progress-registration-settlement"
                data-cy="settlement"
                type="select"
                multiple
                name="settlements"
              >
                <option value="" key="0" />
                {settlements
                  ? settlements.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.paymentNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Purchase Order"
                id="work-in-progress-registration-purchaseOrder"
                data-cy="purchaseOrder"
                type="select"
                multiple
                name="purchaseOrders"
              >
                <option value="" key="0" />
                {purchaseOrders
                  ? purchaseOrders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.purchaseOrderNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Delivery Note"
                id="work-in-progress-registration-deliveryNote"
                data-cy="deliveryNote"
                type="select"
                multiple
                name="deliveryNotes"
              >
                <option value="" key="0" />
                {deliveryNotes
                  ? deliveryNotes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.deliveryNoteNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Job Sheet"
                id="work-in-progress-registration-jobSheet"
                data-cy="jobSheet"
                type="select"
                multiple
                name="jobSheets"
              >
                <option value="" key="0" />
                {jobSheets
                  ? jobSheets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.serialNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="work-in-progress-registration-dealer"
                name="dealer"
                data-cy="dealer"
                label="Dealer"
                type="select"
                required
              >
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="work-in-progress-registration-workInProgressGroup"
                name="workInProgressGroup"
                data-cy="workInProgressGroup"
                label="Work In Progress Group"
                type="select"
              >
                <option value="" key="0" />
                {workInProgressRegistrations
                  ? workInProgressRegistrations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.sequenceNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="work-in-progress-registration-settlementCurrency"
                name="settlementCurrency"
                data-cy="settlementCurrency"
                label="Settlement Currency"
                type="select"
              >
                <option value="" key="0" />
                {settlementCurrencies
                  ? settlementCurrencies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.iso4217CurrencyCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="work-in-progress-registration-workProjectRegister"
                name="workProjectRegister"
                data-cy="workProjectRegister"
                label="Work Project Register"
                type="select"
              >
                <option value="" key="0" />
                {workProjectRegisters
                  ? workProjectRegisters.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.catalogueNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/work-in-progress-registration"
                replace
                color="info"
              >
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

export default WorkInProgressRegistrationUpdate;
