import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IXlsxReportRequisition } from 'app/shared/model/xlsx-report-requisition.model';
import { getEntities } from './xlsx-report-requisition.reducer';

export const XlsxReportRequisition = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const xlsxReportRequisitionList = useAppSelector(state => state.xlsxReportRequisition.entities);
  const loading = useAppSelector(state => state.xlsxReportRequisition.loading);
  const totalItems = useAppSelector(state => state.xlsxReportRequisition.totalItems);

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
      <h2 id="xlsx-report-requisition-heading" data-cy="XlsxReportRequisitionHeading">
        Xlsx Report Requisitions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/xlsx-report-requisition/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Xlsx Report Requisition
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {xlsxReportRequisitionList && xlsxReportRequisitionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportName')}>
                  Report Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportDate')}>
                  Report Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userPassword')}>
                  User Password <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportFileChecksum')}>
                  Report File Checksum <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportStatus')}>
                  Report Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportId')}>
                  Report Id <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Template <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {xlsxReportRequisitionList.map((xlsxReportRequisition, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/xlsx-report-requisition/${xlsxReportRequisition.id}`} color="link" size="sm">
                      {xlsxReportRequisition.id}
                    </Button>
                  </td>
                  <td>{xlsxReportRequisition.reportName}</td>
                  <td>
                    {xlsxReportRequisition.reportDate ? (
                      <TextFormat type="date" value={xlsxReportRequisition.reportDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{xlsxReportRequisition.userPassword}</td>
                  <td>{xlsxReportRequisition.reportFileChecksum}</td>
                  <td>{xlsxReportRequisition.reportStatus}</td>
                  <td>{xlsxReportRequisition.reportId}</td>
                  <td>
                    {xlsxReportRequisition.reportTemplate ? (
                      <Link to={`/report-template/${xlsxReportRequisition.reportTemplate.id}`}>
                        {xlsxReportRequisition.reportTemplate.catalogueNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/xlsx-report-requisition/${xlsxReportRequisition.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/xlsx-report-requisition/${xlsxReportRequisition.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/xlsx-report-requisition/${xlsxReportRequisition.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Xlsx Report Requisitions found</div>
        )}
      </div>
      {totalItems ? (
        <div className={xlsxReportRequisitionList && xlsxReportRequisitionList.length > 0 ? '' : 'd-none'}>
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

export default XlsxReportRequisition;
