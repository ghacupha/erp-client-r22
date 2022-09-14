import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPrepaymentAccount } from 'app/shared/model/prepayment-account.model';
import { getEntities } from './prepayment-account.reducer';

export const PrepaymentAccount = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const prepaymentAccountList = useAppSelector(state => state.prepaymentAccount.entities);
  const loading = useAppSelector(state => state.prepaymentAccount.loading);
  const totalItems = useAppSelector(state => state.prepaymentAccount.totalItems);

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
      <h2 id="prepayment-account-heading" data-cy="PrepaymentAccountHeading">
        Prepayment Accounts
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/prepayment-account/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Prepayment Account
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {prepaymentAccountList && prepaymentAccountList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('catalogueNumber')}>
                  Catalogue Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('particulars')}>
                  Particulars <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepaymentAmount')}>
                  Prepayment Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepaymentGuid')}>
                  Prepayment Guid <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Settlement Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Prepayment Transaction <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Service Outlet <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Dealer <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Debit Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Transfer Account <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prepaymentAccountList.map((prepaymentAccount, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/prepayment-account/${prepaymentAccount.id}`} color="link" size="sm">
                      {prepaymentAccount.id}
                    </Button>
                  </td>
                  <td>{prepaymentAccount.catalogueNumber}</td>
                  <td>{prepaymentAccount.particulars}</td>
                  <td>{prepaymentAccount.notes}</td>
                  <td>{prepaymentAccount.prepaymentAmount}</td>
                  <td>{prepaymentAccount.prepaymentGuid}</td>
                  <td>
                    {prepaymentAccount.settlementCurrency ? (
                      <Link to={`/settlement-currency/${prepaymentAccount.settlementCurrency.id}`}>
                        {prepaymentAccount.settlementCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAccount.prepaymentTransaction ? (
                      <Link to={`/settlement/${prepaymentAccount.prepaymentTransaction.id}`}>
                        {prepaymentAccount.prepaymentTransaction.paymentNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAccount.serviceOutlet ? (
                      <Link to={`/service-outlet/${prepaymentAccount.serviceOutlet.id}`}>{prepaymentAccount.serviceOutlet.outletCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAccount.dealer ? (
                      <Link to={`/dealer/${prepaymentAccount.dealer.id}`}>{prepaymentAccount.dealer.dealerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAccount.debitAccount ? (
                      <Link to={`/transaction-account/${prepaymentAccount.debitAccount.id}`}>
                        {prepaymentAccount.debitAccount.accountName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAccount.transferAccount ? (
                      <Link to={`/transaction-account/${prepaymentAccount.transferAccount.id}`}>
                        {prepaymentAccount.transferAccount.accountName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/prepayment-account/${prepaymentAccount.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/prepayment-account/${prepaymentAccount.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/prepayment-account/${prepaymentAccount.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Prepayment Accounts found</div>
        )}
      </div>
      {totalItems ? (
        <div className={prepaymentAccountList && prepaymentAccountList.length > 0 ? '' : 'd-none'}>
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

export default PrepaymentAccount;
