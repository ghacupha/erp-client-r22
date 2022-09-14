import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { getEntities } from './dealer.reducer';

export const Dealer = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const dealerList = useAppSelector(state => state.dealer.entities);
  const loading = useAppSelector(state => state.dealer.loading);
  const totalItems = useAppSelector(state => state.dealer.totalItems);

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
      <h2 id="dealer-heading" data-cy="DealerHeading">
        Dealers
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/dealer/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Dealer
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {dealerList && dealerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dealerName')}>
                  Dealer Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('taxNumber')}>
                  Tax Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('identificationDocumentNumber')}>
                  Identification Document Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('organizationName')}>
                  Organization Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('department')}>
                  Department <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('position')}>
                  Position <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('postalAddress')}>
                  Postal Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('physicalAddress')}>
                  Physical Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountName')}>
                  Account Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountNumber')}>
                  Account Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bankersName')}>
                  Bankers Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bankersBranch')}>
                  Bankers Branch <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bankersSwiftCode')}>
                  Bankers Swift Code <FontAwesomeIcon icon="sort" />
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
                <th className="hand" onClick={sort('otherNames')}>
                  Other Names <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Dealer Group <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dealerList.map((dealer, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/dealer/${dealer.id}`} color="link" size="sm">
                      {dealer.id}
                    </Button>
                  </td>
                  <td>{dealer.dealerName}</td>
                  <td>{dealer.taxNumber}</td>
                  <td>{dealer.identificationDocumentNumber}</td>
                  <td>{dealer.organizationName}</td>
                  <td>{dealer.department}</td>
                  <td>{dealer.position}</td>
                  <td>{dealer.postalAddress}</td>
                  <td>{dealer.physicalAddress}</td>
                  <td>{dealer.accountName}</td>
                  <td>{dealer.accountNumber}</td>
                  <td>{dealer.bankersName}</td>
                  <td>{dealer.bankersBranch}</td>
                  <td>{dealer.bankersSwiftCode}</td>
                  <td>{dealer.fileUploadToken}</td>
                  <td>{dealer.compilationToken}</td>
                  <td>{dealer.remarks}</td>
                  <td>{dealer.otherNames}</td>
                  <td>{dealer.dealerGroup ? <Link to={`/dealer/${dealer.dealerGroup.id}`}>{dealer.dealerGroup.dealerName}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/dealer/${dealer.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/dealer/${dealer.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/dealer/${dealer.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Dealers found</div>
        )}
      </div>
      {totalItems ? (
        <div className={dealerList && dealerList.length > 0 ? '' : 'd-none'}>
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

export default Dealer;
