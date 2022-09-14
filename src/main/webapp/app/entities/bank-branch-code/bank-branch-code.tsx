import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBankBranchCode } from 'app/shared/model/bank-branch-code.model';
import { getEntities, reset } from './bank-branch-code.reducer';

export const BankBranchCode = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(false);

  const bankBranchCodeList = useAppSelector(state => state.bankBranchCode.entities);
  const loading = useAppSelector(state => state.bankBranchCode.loading);
  const totalItems = useAppSelector(state => state.bankBranchCode.totalItems);
  const links = useAppSelector(state => state.bankBranchCode.links);
  const entity = useAppSelector(state => state.bankBranchCode.entity);
  const updateSuccess = useAppSelector(state => state.bankBranchCode.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  return (
    <div>
      <h2 id="bank-branch-code-heading" data-cy="BankBranchCodeHeading">
        Bank Branch Codes
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/bank-branch-code/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Bank Branch Code
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={bankBranchCodeList ? bankBranchCodeList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {bankBranchCodeList && bankBranchCodeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('bankCode')}>
                    Bank Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('bankName')}>
                    Bank Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('branchCode')}>
                    Branch Code <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('branchName')}>
                    Branch Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('notes')}>
                    Notes <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bankBranchCodeList.map((bankBranchCode, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/bank-branch-code/${bankBranchCode.id}`} color="link" size="sm">
                        {bankBranchCode.id}
                      </Button>
                    </td>
                    <td>{bankBranchCode.bankCode}</td>
                    <td>{bankBranchCode.bankName}</td>
                    <td>{bankBranchCode.branchCode}</td>
                    <td>{bankBranchCode.branchName}</td>
                    <td>{bankBranchCode.notes}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          tag={Link}
                          to={`/bank-branch-code/${bankBranchCode.id}`}
                          color="info"
                          size="sm"
                          data-cy="entityDetailsButton"
                        >
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/bank-branch-code/${bankBranchCode.id}/edit`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/bank-branch-code/${bankBranchCode.id}/delete`}
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
            !loading && <div className="alert alert-warning">No Bank Branch Codes found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default BankBranchCode;
