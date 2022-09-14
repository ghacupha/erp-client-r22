import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITaxRule } from 'app/shared/model/payments/tax-rule.model';
import { getEntities } from './tax-rule.reducer';

export const TaxRule = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const taxRuleList = useAppSelector(state => state.taxRule.entities);
  const loading = useAppSelector(state => state.taxRule.loading);
  const totalItems = useAppSelector(state => state.taxRule.totalItems);

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
      <h2 id="tax-rule-heading" data-cy="TaxRuleHeading">
        Tax Rules
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/tax-rule/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Tax Rule
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {taxRuleList && taxRuleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('telcoExciseDuty')}>
                  Telco Excise Duty <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('valueAddedTax')}>
                  Value Added Tax <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('withholdingVAT')}>
                  Withholding VAT <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('withholdingTaxConsultancy')}>
                  Withholding Tax Consultancy <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('withholdingTaxRent')}>
                  Withholding Tax Rent <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cateringLevy')}>
                  Catering Levy <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('serviceCharge')}>
                  Service Charge <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('withholdingTaxImportedService')}>
                  Withholding Tax Imported Service <FontAwesomeIcon icon="sort" />
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
              {taxRuleList.map((taxRule, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/tax-rule/${taxRule.id}`} color="link" size="sm">
                      {taxRule.id}
                    </Button>
                  </td>
                  <td>{taxRule.telcoExciseDuty}</td>
                  <td>{taxRule.valueAddedTax}</td>
                  <td>{taxRule.withholdingVAT}</td>
                  <td>{taxRule.withholdingTaxConsultancy}</td>
                  <td>{taxRule.withholdingTaxRent}</td>
                  <td>{taxRule.cateringLevy}</td>
                  <td>{taxRule.serviceCharge}</td>
                  <td>{taxRule.withholdingTaxImportedService}</td>
                  <td>{taxRule.fileUploadToken}</td>
                  <td>{taxRule.compilationToken}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/tax-rule/${taxRule.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/tax-rule/${taxRule.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/tax-rule/${taxRule.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Tax Rules found</div>
        )}
      </div>
      {totalItems ? (
        <div className={taxRuleList && taxRuleList.length > 0 ? '' : 'd-none'}>
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

export default TaxRule;
