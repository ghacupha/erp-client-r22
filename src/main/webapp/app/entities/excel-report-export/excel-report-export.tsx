import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExcelReportExport } from 'app/shared/model/excel-report-export.model';
import { getEntities } from './excel-report-export.reducer';

export const ExcelReportExport = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const excelReportExportList = useAppSelector(state => state.excelReportExport.entities);
  const loading = useAppSelector(state => state.excelReportExport.loading);
  const totalItems = useAppSelector(state => state.excelReportExport.totalItems);

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
      <h2 id="excel-report-export-heading" data-cy="ExcelReportExportHeading">
        Excel Report Exports
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/excel-report-export/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Excel Report Export
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {excelReportExportList && excelReportExportList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportName')}>
                  Report Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportPassword')}>
                  Report Password <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportNotes')}>
                  Report Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileCheckSum')}>
                  File Check Sum <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportFile')}>
                  Report File <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportTimeStamp')}>
                  Report Time Stamp <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportId')}>
                  Report Id <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Status <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Security Clearance <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Creator <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Organization <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Department <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  System Module <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Design <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  File Check Sum Algorithm <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {excelReportExportList.map((excelReportExport, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/excel-report-export/${excelReportExport.id}`} color="link" size="sm">
                      {excelReportExport.id}
                    </Button>
                  </td>
                  <td>{excelReportExport.reportName}</td>
                  <td>{excelReportExport.reportPassword}</td>
                  <td>
                    {excelReportExport.reportNotes ? (
                      <div>
                        {excelReportExport.reportNotesContentType ? (
                          <a onClick={openFile(excelReportExport.reportNotesContentType, excelReportExport.reportNotes)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {excelReportExport.reportNotesContentType}, {byteSize(excelReportExport.reportNotes)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{excelReportExport.fileCheckSum}</td>
                  <td>
                    {excelReportExport.reportFile ? (
                      <div>
                        {excelReportExport.reportFileContentType ? (
                          <a onClick={openFile(excelReportExport.reportFileContentType, excelReportExport.reportFile)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {excelReportExport.reportFileContentType}, {byteSize(excelReportExport.reportFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {excelReportExport.reportTimeStamp ? (
                      <TextFormat type="date" value={excelReportExport.reportTimeStamp} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{excelReportExport.reportId}</td>
                  <td>
                    {excelReportExport.reportStatus ? (
                      <Link to={`/report-status/${excelReportExport.reportStatus.id}`}>{excelReportExport.reportStatus.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.securityClearance ? (
                      <Link to={`/security-clearance/${excelReportExport.securityClearance.id}`}>
                        {excelReportExport.securityClearance.clearanceLevel}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.reportCreator ? (
                      <Link to={`/application-user/${excelReportExport.reportCreator.id}`}>
                        {excelReportExport.reportCreator.applicationIdentity}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.organization ? (
                      <Link to={`/dealer/${excelReportExport.organization.id}`}>{excelReportExport.organization.dealerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.department ? (
                      <Link to={`/dealer/${excelReportExport.department.id}`}>{excelReportExport.department.dealerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.systemModule ? (
                      <Link to={`/system-module/${excelReportExport.systemModule.id}`}>{excelReportExport.systemModule.moduleName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.reportDesign ? (
                      <Link to={`/report-design/${excelReportExport.reportDesign.id}`}>{excelReportExport.reportDesign.designation}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {excelReportExport.fileCheckSumAlgorithm ? (
                      <Link to={`/algorithm/${excelReportExport.fileCheckSumAlgorithm.id}`}>
                        {excelReportExport.fileCheckSumAlgorithm.name}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/excel-report-export/${excelReportExport.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/excel-report-export/${excelReportExport.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/excel-report-export/${excelReportExport.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Excel Report Exports found</div>
        )}
      </div>
      {totalItems ? (
        <div className={excelReportExportList && excelReportExportList.length > 0 ? '' : 'd-none'}>
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

export default ExcelReportExport;
