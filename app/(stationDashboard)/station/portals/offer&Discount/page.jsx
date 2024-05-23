

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { Download, Eye, FilePenLine, Plus, Search, SearchIcon, Trash, Upload } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const offerdiscount = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const statusOptions = ["Active", "Inactive", "Pending", "Completed"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearchFields, setTempSearchFields] = useState({
    "Start Date": '',
    "End Date": '',
    "Discount Type": '',
    "Status": ''
  });
  const [searchFields, setSearchFields] = useState({
    userId: '',
    id: '',
    title: '',
    completed: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page on search
  }, [searchQuery, pageSize]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleSearch = () => {
    setSearchFields({ ...searchFields, "Start Date": startDate, "End Date": endDate });
    setSearchQuery(JSON.stringify({ ...tempSearchFields, "Start Date": startDate, "End Date": endDate })); // Trigger useEffect
  };

  const handleInputChange = (columnName, value) => {
    if (columnName === "Start Date") {
      setStartDate(value);
    } else if (columnName === "End Date") {
      setEndDate(value);
    } else {
      setTempSearchFields({ ...tempSearchFields, [columnName]: value });
    }
  };

  const handleSort = (columnName) => {
    let direction = 'asc';
    if (sortConfig.key === columnName && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnName, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter(item => {
    for (let key in searchFields) {
      if (searchFields[key] !== '') {
        const itemValue = item[key]?.toString().toLowerCase() || '';
        const searchValue = searchFields[key].toLowerCase();
        if (!itemValue.includes(searchValue)) {
          return false;
        }
      }
    }
    return true;
  });

  // Calculate total pages based on filtered data length and pageSize
  const totalPages = Math.ceil(filteredData.length / pageSize);
  // Calculate starting index for pagination
  const startIndex = (page - 1) * pageSize;
  // Slice the filtered data based on startIndex and pageSize
  const slicedData = filteredData.slice(startIndex, startIndex + pageSize);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const paginationItems = [];
    const handlePageClick = (pageNumber) => () => handlePageChange(pageNumber);

    paginationItems.push(
      <button key="prev" className="bg-blue-500 text-white px-3 m-1 py-2 rounded mr-2" onClick={handlePageClick(page - 1)} disabled={page === 1}>
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === page || (i <= 2) || (i >= totalPages - 1) || (i >= page - 1 && i <= page + 1)) {
        paginationItems.push(
          <button key={i} className={`px-3 py-1 m-1 rounded ${i === page ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`} onClick={handlePageClick(i)}>
            {i}
          </button>
        );
      } else if (paginationItems[paginationItems.length - 1].key !== '...') {
        paginationItems.push(<span key="..." className="px-4 py-2">...</span>);
      }
    }

    paginationItems.push(
      <button key="next" className="bg-blue-500 text-white m-1 px-3 py-1 rounded" onClick={handlePageClick(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    );

    return paginationItems;
  };

  return (
    <div className="container mx-auto">
    <div className='flex'>
      <SearchIcon className='text-gray-500' size={19} />
      <h1 className="text-[20px] font-semibold mb-4 pl-2">SEARCH</h1>
    </div>
    {/* Search inputs */}
    <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
      {/* Search input for each field */}
      {Object.keys(tempSearchFields).map(field => (
  <div key={field} className="flex items-center mb-2">
    <label className="w-1/4 font-medium mr-2">{field}</label>
    {field === "Start Date" || field === "End Date" ? (
      <input
        type="date"
        className="border border-gray-300 px-4 py-2 rounded w-3/4"
        value={field === "Start Date" ? startDate : endDate}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    ) : field === "Discount Type" || field === "Status" ? (
      <select
        className="border border-gray-300 px-4 py-2 rounded w-3/4"
        value={tempSearchFields[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
      >
        <option value=""></option>
        {field === "Discount Type" ?
          ["Type1", "Type2", "Type3"].map((option) => (
            <option key={option} value={option}>{option}</option>
          )) :
          statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))
        }
      </select>
    ) : (
      <input
        type="text"
        className="border border-gray-300 px-4 py-2 rounded w-3/4"
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    )}
  </div>
))}
    </div>
    <div className="flex justify-center lg:mb-1 mb-3 items-center">
      <Button color="warning" className="shadow-md w-28" onClick={handleSearch}>
        <Search size={20} className='pr-1' />Search
      </Button>
    </div>

      <div className=' justify-between flex gap-1 pb-3 '>
      <div className='text-2xl text-orange-400'>OFFER AND DISCOUNT LIST</div>
      <div >
      {/* <Dialog>
          <DialogTrigger asChild>
            <Button color="success" className="shadow-md pr-2"> <Download size={20} className='pr-1' />Import</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                Add Station Data
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button type="submit" variant="outline">
                  Disagree
                </Button>
              </DialogClose>
              <Button type="submit">Agree</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button color="destructive" className="shadow-md mx-1"><Upload size={20} className='pr-1' />Export</Button> */}
        <Button color="warning" className="shadow-md"><Plus size={20} className='pr-1' />Add</Button>

      </div>
        
      </div>

      

      {/* Table */}
      <table className="min-w-full text-left">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('userId')}>
             SR.NO {sortConfig.key === 'userId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('id')}>
            NAME{sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('title')}>
            DISCOUNTTYPE{sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
            DISCOUNT (IN){sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
            START DATE{sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
            ENRDATE{sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
            TIMESUSED{sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
            STATUS{sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
            ACTION{sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
           
           
           
           
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id}>
              <td className="px-2 py-2">{item.userId}</td>
              <td className="px-2 py-2">{item.id}</td>
              <td className="px-2 py-2">{item.title}</td>
              <td className="px-2 py-2">{item.completed.toString()}</td>
              <td className='px-2 py-2'>20-10-2023</td>
              <td className='px-2 py-2'>20-10-2023</td>
              <td className='px-2 py-2'>0</td>
              <td className='px-2 py-2'>Active</td>
              <td className="px-2 py-2">
                <div>
                  <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black">
                    <Eye size={20}></Eye>
                  </Button>
                  <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black">
                    <FilePenLine size={20}></FilePenLine>
                  </Button>
                  <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black">
                    <Trash size={20}></Trash>
                  </Button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default offerdiscount;

