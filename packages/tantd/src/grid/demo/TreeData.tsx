import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById('filter-text-box').value);
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <input type="text" id="filter-text-box" placeholder="Filter..." onInput={() => onFilterTextBoxChanged()} />
        </div>
        <div
          id="myGrid"
          style={{
            height: 300,
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            modules={[ClientSideRowModelModule, RowGroupingModule]}
            rowData={[
              {
                orgHierarchy: ['Erica Rogers'],
                jobTitle: 'CEO',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett'],
                jobTitle: 'Exec. Vice President',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker'],
                jobTitle: 'Director of Operations',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson'],
                jobTitle: 'Fleet Coordinator',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson', 'Leah Flowers'],
                jobTitle: 'Parts Technician',
                employmentType: 'Contract',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson', 'Tammy Sutton'],
                jobTitle: 'Service Technician',
                employmentType: 'Contract',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Derek Paul'],
                jobTitle: 'Inventory Control',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland'],
                jobTitle: 'VP Sales',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Morris Hanson'],
                jobTitle: 'Sales Manager',
                employmentType: 'Permanent',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
                jobTitle: 'Sales Executive',
                employmentType: 'Contract',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
                jobTitle: 'Sales Executive',
                employmentType: 'Contract',
              },
              {
                orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
                jobTitle: 'Sales Executive',
                employmentType: 'Permanent',
              },
            ]}
            defaultColDef={{ flex: 1 }}
            autoGroupColumnDef={{
              headerName: 'Organisation Hierarchy',
              minWidth: 300,
              cellRendererParams: { suppressCount: true },
            }}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={-1}
            getDataPath={function (data) {
              return data.orgHierarchy;
            }}
            onGridReady={onGridReady}
          >
            <AgGridColumn field="jobTitle" />
            <AgGridColumn field="employmentType" />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default GridExample;
