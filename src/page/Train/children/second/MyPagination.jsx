import React from 'react'
import { Pagination } from 'antd';
const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };
export default function MyPagination() {
  return (
    <Pagination defaultCurrent={1} total={50} />
  )
}
