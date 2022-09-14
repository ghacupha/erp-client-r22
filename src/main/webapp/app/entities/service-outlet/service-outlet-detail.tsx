import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './service-outlet.reducer';

export const ServiceOutletDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const serviceOutletEntity = useAppSelector(state => state.serviceOutlet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="serviceOutletDetailsHeading">Service Outlet</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{serviceOutletEntity.id}</dd>
          <dt>
            <span id="outletCode">Outlet Code</span>
          </dt>
          <dd>{serviceOutletEntity.outletCode}</dd>
          <dt>
            <span id="outletName">Outlet Name</span>
          </dt>
          <dd>{serviceOutletEntity.outletName}</dd>
          <dt>
            <span id="town">Town</span>
          </dt>
          <dd>{serviceOutletEntity.town}</dd>
          <dt>
            <span id="parliamentaryConstituency">Parliamentary Constituency</span>
          </dt>
          <dd>{serviceOutletEntity.parliamentaryConstituency}</dd>
          <dt>
            <span id="gpsCoordinates">Gps Coordinates</span>
          </dt>
          <dd>{serviceOutletEntity.gpsCoordinates}</dd>
          <dt>
            <span id="outletOpeningDate">Outlet Opening Date</span>
          </dt>
          <dd>
            {serviceOutletEntity.outletOpeningDate ? (
              <TextFormat value={serviceOutletEntity.outletOpeningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="regulatorApprovalDate">Regulator Approval Date</span>
          </dt>
          <dd>
            {serviceOutletEntity.regulatorApprovalDate ? (
              <TextFormat value={serviceOutletEntity.regulatorApprovalDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="outletClosureDate">Outlet Closure Date</span>
          </dt>
          <dd>
            {serviceOutletEntity.outletClosureDate ? (
              <TextFormat value={serviceOutletEntity.outletClosureDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateLastModified">Date Last Modified</span>
          </dt>
          <dd>
            {serviceOutletEntity.dateLastModified ? (
              <TextFormat value={serviceOutletEntity.dateLastModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="licenseFeePayable">License Fee Payable</span>
          </dt>
          <dd>{serviceOutletEntity.licenseFeePayable}</dd>
          <dt>Placeholder</dt>
          <dd>
            {serviceOutletEntity.placeholders
              ? serviceOutletEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {serviceOutletEntity.placeholders && i === serviceOutletEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Bank Code</dt>
          <dd>{serviceOutletEntity.bankCode ? serviceOutletEntity.bankCode.branchCode : ''}</dd>
          <dt>Outlet Type</dt>
          <dd>{serviceOutletEntity.outletType ? serviceOutletEntity.outletType.outletType : ''}</dd>
          <dt>Outlet Status</dt>
          <dd>{serviceOutletEntity.outletStatus ? serviceOutletEntity.outletStatus.branchStatusType : ''}</dd>
          <dt>County Name</dt>
          <dd>{serviceOutletEntity.countyName ? serviceOutletEntity.countyName.countyName : ''}</dd>
          <dt>Sub County Name</dt>
          <dd>{serviceOutletEntity.subCountyName ? serviceOutletEntity.subCountyName.subCountyName : ''}</dd>
        </dl>
        <Button tag={Link} to="/service-outlet" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/service-outlet/${serviceOutletEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ServiceOutletDetail;
