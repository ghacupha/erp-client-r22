import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWorkProjectRegister } from 'app/shared/model/work-project-register.model';
import { getEntities } from './work-project-register.reducer';

export const WorkProjectRegister = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const workProjectRegisterList = useAppSelector(state => state.workProjectRegister.entities);
  const loading = useAppSelector(state => state.workProjectRegister.loading);
  const totalItems = useAppSelector(state => state.workProjectRegister.totalItems);

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
      <h2 id="work-project-register-heading" data-cy="WorkProjectRegisterHeading">
        Work Project Registers
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/work-project-register/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Work Project Register
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {workProjectRegisterList && workProjectRegisterList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('catalogueNumber')}>
                  Catalogue Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('details')}>
                  Details <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalProjectCost')}>
                  Total Project Cost <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('additionalNotes')}>
                  Additional Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Settlement Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workProjectRegisterList.map((workProjectRegister, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/work-project-register/${workProjectRegister.id}`} color="link" size="sm">
                      {workProjectRegister.id}
                    </Button>
                  </td>
                  <td>{workProjectRegister.catalogueNumber}</td>
                  <td>{workProjectRegister.description}</td>
                  <td>
                    {workProjectRegister.details ? (
                      <div>
                        {workProjectRegister.detailsContentType ? (
                          <a onClick={openFile(workProjectRegister.detailsContentType, workProjectRegister.details)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {workProjectRegister.detailsContentType}, {byteSize(workProjectRegister.details)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{workProjectRegister.totalProjectCost}</td>
                  <td>
                    {workProjectRegister.additionalNotes ? (
                      <div>
                        {workProjectRegister.additionalNotesContentType ? (
                          <a onClick={openFile(workProjectRegister.additionalNotesContentType, workProjectRegister.additionalNotes)}>
                            Open &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {workProjectRegister.additionalNotesContentType}, {byteSize(workProjectRegister.additionalNotes)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {workProjectRegister.settlementCurrency ? (
                      <Link to={`/settlement-currency/${workProjectRegister.settlementCurrency.id}`}>
                        {workProjectRegister.settlementCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/work-project-register/${workProjectRegister.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/work-project-register/${workProjectRegister.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/work-project-register/${workProjectRegister.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Work Project Registers found</div>
        )}
      </div>
      {totalItems ? (
        <div className={workProjectRegisterList && workProjectRegisterList.length > 0 ? '' : 'd-none'}>
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

export default WorkProjectRegister;
