import React from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Typography } from '@mui/material';

const Example = () => {
  const columns = [
    {
      accessorKey: 'number',
      header: '#',
      size: 5,
      disableSorting: true,
    },
    {
      accessorKey: 'product',
      header: 'Product',
      size: 35,
      Cell: ({ cell }) => (
        <div className="pl-2 pt-2">
          <img
            className="ng-scope h-5 w-[30px] cursor-default inline"
            src="https://printerval.com/system/images/flags/png100px/de.png"
            alt="flag"
          />
          <a className="text-[#3c8dbc]">
            <h5 className="ng-binding inline text-[#3c8dbc] ml-1">
              5 Seconds Of Summer Music 5SOS5 Album Lyric Art Tshirt
            </h5>
          </a>
          <div className="form-check pt-2">
            {/* Checkbox component */}
          </div>
          <div className="form-check">
            {/* Checkbox component */}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'design',
      header: 'Design',
      size: 35,
      Cell: ({ cell }) => (
        <div className="max-w-[500px] max-h-[250px] py-0 px-[10px] flex flex-wrap items-start mt-2 my-[5px] overflow-y-scroll mb-[200px]">
          {/* Avatar components */}
          {/* Avatar components */}
        </div>
      ),
    },
    {
      accessorKey: 'designer',
      header: 'Designer',
      size: 20,
      Cell: ({ cell }) => (
        <div>
          <div className="form-group mx-2">
            {/* Input component */}
          </div>
          <div className="form-group mx-2">
            {/* Input component */}
          </div>
          <div className="mx-2">
            <Typography variant="small" color="blue-gray" className="mb-4 font-medium ml-2">
              Note outsource:
            </Typography>
            {/* Pre-note component */}
            {/* Textarea component */}
            {/* Button component */}
          </div>
          <Typography variant="small" color="blue-gray" className="font-medium mx-4 mt-2">
            Lương:
          </Typography>
          <div className="relative flex mx-2 mt-2">
            {/* Input component */}
            {/* Button component */}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 15,
      Cell: ({ cell }) => (
        <div className="mx-2">
          {/* Input component */}
          {/* Button component */}
        </div>
      ),
    },
  ];

  const data = [
    {
      number: '1',
      product: {
        flag: 'https://printerval.com/system/images/flags/png100px/de.png',
        name: '5 Seconds Of Summer Music 5SOS5 Album Lyric Art Tshirt',
        isMultipleDesign: false,
        isDoubleSided: true,
      },
      design: [
        'https://cdn.prtvstatic.com/unsafe/600x0/assets.printerval.com/2023/05/17/646474149ef240.11658332.jpg',
        'https://cdn.prtvstatic.com/unsafe/600x0/assets.printerval.com/2023/05/17/646474149ef240.11658332.jpg',
      ],
      designer: {
        assignedTo: '',
        assignedBy: 'Nguyễn Văn A',
        note: '',
        salary: 200,
      },
      status: 'Waiting',
    },
    // Add more data objects as needed
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{ showColumnFilters: true }}
      tableClassName="table border border-solid border-[#f4f4f4] w-full h-full mb-5 text-sm font-light dark:border-neutral-500"
      headerClassName="border-b font-medium dark:border-neutral-500"
      rowClassName="outline-0"
    />
  );
};

export default Example;
