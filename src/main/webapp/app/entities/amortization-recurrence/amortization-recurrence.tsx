import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAmortizationRecurrence } from 'app/shared/model/amortization-recurrence.model';
import { getEntities } from './amortization-recurrence.reducer';

export const AmortizationRecurrence = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const amortizationRecurrenceList = useAppSelector(state => state.amortizationRecurrence.entities);
  const loading = useAppSelector(state => state.amortizationRecurrence.loading);
  const totalItems = useAppSelector(state => state.amortizationRecurrence.totalItems);

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
      <h2 id="amortization-recurrence-heading" data-cy="AmortizationRecurrenceHeading">
        Amortization Recurrences
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/amortization-recurrence/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Amortization Recurrence
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {amortizationRecurrenceList && amortizationRecurrenceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstAmortizationDate')}>
                  First Amortization Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('amortizationFrequency')}>
                  Amortization Frequency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numberOfRecurrences')}>
                  Number Of Recurrences <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('particulars')}>
                  Particulars <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isActive')}>
                  Is Active <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isOverWritten')}>
                  Is Over Written <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('timeOfInstallation')}>
                  Time Of Installation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('recurrenceGuid')}>
                  Recurrence Guid <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepaymentAccountGuid')}>
                  Prepayment Account Guid <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Depreciation Method <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Prepayment Account <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {amortizationRecurrenceList.map((amortizationRecurrence, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/amortization-recurrence/${amortizationRecurrence.id}`} color="link" size="sm">
                      {amortizationRecurrence.id}
                    </Button>
                  </td>
                  <td>
                    {amortizationRecurrence.firstAmortizationDate ? (
                      <TextFormat type="date" value={amortizationRecurrence.firstAmortizationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{amortizationRecurrence.amortizationFrequency}</td>
                  <td>{amortizationRecurrence.numberOfRecurrences}</td>
                  <td>
                    {amortizationRecurrence.notes ? (
                      <div>
                        {amortizationRecurrence.notesContentType ? (
                          <a onClick={openFile(amortizationRecurrence.notesContentType, amortizationRecurrence.notes)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {amortizationRecurrence.notesContentType}, {byteSize(amortizationRecurrence.notes)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{amortizationRecurrence.particulars}</td>
                  <td>{amortizationRecurrence.isActive ? 'true' : 'false'}</td>
                  <td>{amortizationRecurrence.isOverWritten ? 'true' : 'false'}</td>
                  <td>
                    {amortizationRecurrence.timeOfInstallation ? (
                      <TextFormat type="date" value={amortizationRecurrence.timeOfInstallation} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{amortizationRecurrence.recurrenceGuid}</td>
                  <td>{amortizationRecurrence.prepaymentAccountGuid}</td>
                  <td>
                    {amortizationRecurrence.depreciationMethod ? (
                      <Link to={`/depreciation-method/${amortizationRecurrence.depreciationMethod.id}`}>
                        {amortizationRecurrence.depreciationMethod.depreciationMethodName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {amortizationRecurrence.prepaymentAccount ? (
                      <Link to={`/prepayment-account/${amortizationRecurrence.prepaymentAccount.id}`}>
                        {amortizationRecurrence.prepaymentAccount.catalogueNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/amortization-recurrence/${amortizationRecurrence.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/amortization-recurrence/${amortizationRecurrence.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/amortization-recurrence/${amortizationRecurrence.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Amortization Recurrences found</div>
        )}
      </div>
      {totalItems ? (
        <div className={amortizationRecurrenceList && amortizationRecurrenceList.length > 0 ? '' : 'd-none'}>
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

export default AmortizationRecurrence;
