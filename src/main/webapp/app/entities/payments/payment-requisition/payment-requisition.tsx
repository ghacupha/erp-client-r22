import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaymentRequisition } from 'app/shared/model/payments/payment-requisition.model';
import { getEntities } from './payment-requisition.reducer';

export const PaymentRequisition = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const paymentRequisitionList = useAppSelector(state => state.paymentRequisition.entities);
  const loading = useAppSelector(state => state.paymentRequisition.loading);
  const totalItems = useAppSelector(state => state.paymentRequisition.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="payment-requisition-heading" data-cy="PaymentRequisitionHeading">
        Payment Requisitions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/payment-requisition/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Payment Requisition
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {paymentRequisitionList && paymentRequisitionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('receptionDate')}>
                  Reception Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dealerName')}>
                  Dealer Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('briefDescription')}>
                  Brief Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('requisitionNumber')}>
                  Requisition Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoicedAmount')}>
                  Invoiced Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('disbursementCost')}>
                  Disbursement Cost <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('taxableAmount')}>
                  Taxable Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('requisitionProcessed')}>
                  Requisition Processed <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileUploadToken')}>
                  File Upload Token <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('compilationToken')}>
                  Compilation Token <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentRequisitionList.map((paymentRequisition, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/payment-requisition/${paymentRequisition.id}`} color="link" size="sm">
                      {paymentRequisition.id}
                    </Button>
                  </td>
                  <td>
                    {paymentRequisition.receptionDate ? (
                      <TextFormat type="date" value={paymentRequisition.receptionDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{paymentRequisition.dealerName}</td>
                  <td>{paymentRequisition.briefDescription}</td>
                  <td>{paymentRequisition.requisitionNumber}</td>
                  <td>{paymentRequisition.invoicedAmount}</td>
                  <td>{paymentRequisition.disbursementCost}</td>
                  <td>{paymentRequisition.taxableAmount}</td>
                  <td>{paymentRequisition.requisitionProcessed ? 'true' : 'false'}</td>
                  <td>{paymentRequisition.fileUploadToken}</td>
                  <td>{paymentRequisition.compilationToken}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/payment-requisition/${paymentRequisition.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/payment-requisition/${paymentRequisition.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/payment-requisition/${paymentRequisition.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Payment Requisitions found</div>
        )}
      </div>
      {totalItems ? (
        <div className={paymentRequisitionList && paymentRequisitionList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PaymentRequisition;
