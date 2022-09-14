import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISettlement } from 'app/shared/model/settlement.model';
import { getEntities } from './settlement.reducer';

export const Settlement = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const settlementList = useAppSelector(state => state.settlement.entities);
  const loading = useAppSelector(state => state.settlement.loading);
  const totalItems = useAppSelector(state => state.settlement.totalItems);

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
      <h2 id="settlement-heading" data-cy="SettlementHeading">
        Settlements
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/settlement/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Settlement
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {settlementList && settlementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentNumber')}>
                  Payment Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentDate')}>
                  Payment Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentAmount')}>
                  Payment Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('calculationFile')}>
                  Calculation File <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileUploadToken')}>
                  File Upload Token <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('compilationToken')}>
                  Compilation Token <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('remarks')}>
                  Remarks <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Settlement Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Payment Category <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Group Settlement <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Biller <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {settlementList.map((settlement, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/settlement/${settlement.id}`} color="link" size="sm">
                      {settlement.id}
                    </Button>
                  </td>
                  <td>{settlement.paymentNumber}</td>
                  <td>
                    {settlement.paymentDate ? (
                      <TextFormat type="date" value={settlement.paymentDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{settlement.paymentAmount}</td>
                  <td>{settlement.description}</td>
                  <td>{settlement.notes}</td>
                  <td>
                    {settlement.calculationFile ? (
                      <div>
                        {settlement.calculationFileContentType ? (
                          <a onClick={openFile(settlement.calculationFileContentType, settlement.calculationFile)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {settlement.calculationFileContentType}, {byteSize(settlement.calculationFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{settlement.fileUploadToken}</td>
                  <td>{settlement.compilationToken}</td>
                  <td>{settlement.remarks}</td>
                  <td>
                    {settlement.settlementCurrency ? (
                      <Link to={`/settlement-currency/${settlement.settlementCurrency.id}`}>
                        {settlement.settlementCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {settlement.paymentCategory ? (
                      <Link to={`/payment-category/${settlement.paymentCategory.id}`}>{settlement.paymentCategory.categoryName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {settlement.groupSettlement ? (
                      <Link to={`/settlement/${settlement.groupSettlement.id}`}>{settlement.groupSettlement.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{settlement.biller ? <Link to={`/dealer/${settlement.biller.id}`}>{settlement.biller.dealerName}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/settlement/${settlement.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/settlement/${settlement.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/settlement/${settlement.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Settlements found</div>
        )}
      </div>
      {totalItems ? (
        <div className={settlementList && settlementList.length > 0 ? '' : 'd-none'}>
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

export default Settlement;
