import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAssetRegistration } from 'app/shared/model/asset-registration.model';
import { getEntities } from './asset-registration.reducer';

export const AssetRegistration = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const assetRegistrationList = useAppSelector(state => state.assetRegistration.entities);
  const loading = useAppSelector(state => state.assetRegistration.loading);
  const totalItems = useAppSelector(state => state.assetRegistration.totalItems);

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
      <h2 id="asset-registration-heading" data-cy="AssetRegistrationHeading">
        Asset Registrations
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/asset-registration/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Asset Registration
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assetRegistrationList && assetRegistrationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assetNumber')}>
                  Asset Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assetTag')}>
                  Asset Tag <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assetDetails')}>
                  Asset Details <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assetCost')}>
                  Asset Cost <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('comments')}>
                  Comments <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Asset Category <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Dealer <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Settlement Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assetRegistrationList.map((assetRegistration, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/asset-registration/${assetRegistration.id}`} color="link" size="sm">
                      {assetRegistration.id}
                    </Button>
                  </td>
                  <td>{assetRegistration.assetNumber}</td>
                  <td>{assetRegistration.assetTag}</td>
                  <td>{assetRegistration.assetDetails}</td>
                  <td>{assetRegistration.assetCost}</td>
                  <td>
                    {assetRegistration.comments ? (
                      <div>
                        {assetRegistration.commentsContentType ? (
                          <a onClick={openFile(assetRegistration.commentsContentType, assetRegistration.comments)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {assetRegistration.commentsContentType}, {byteSize(assetRegistration.comments)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {assetRegistration.assetCategory ? (
                      <Link to={`/asset-category/${assetRegistration.assetCategory.id}`}>
                        {assetRegistration.assetCategory.assetCategoryName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {assetRegistration.dealer ? (
                      <Link to={`/dealer/${assetRegistration.dealer.id}`}>{assetRegistration.dealer.dealerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {assetRegistration.settlementCurrency ? (
                      <Link to={`/settlement-currency/${assetRegistration.settlementCurrency.id}`}>
                        {assetRegistration.settlementCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/asset-registration/${assetRegistration.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/asset-registration/${assetRegistration.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/asset-registration/${assetRegistration.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Asset Registrations found</div>
        )}
      </div>
      {totalItems ? (
        <div className={assetRegistrationList && assetRegistrationList.length > 0 ? '' : 'd-none'}>
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

export default AssetRegistration;
