import React from 'react'
import { Pagination } from 'antd';
export default function Mypogn() {
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
          return <a>Previous</a>;
        }
        if (type === 'next') {
          return <a>Next</a>;
        }
        return originalElement;
      };
  return (
    <Pagination total={100} itemRender={itemRender} />
  )
}
