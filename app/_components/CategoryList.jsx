"use client"
import React,{useEffect} from 'react';
import GlobalApi from '../_utils/GlobalApi';

function CategoryList () {


  const [categoryList,setCategoryList]=useState([]);

  useEffect(()=>{getCategoryList();
  },[])


  const getCategoryList=()=>{
  GlobalApi.GetCategory().then(resp=>{
    console.log(resp.categories);
    setCategoryList(resp.categories)
  })
}
  return (
    <div>
      <div>
        {categoryList&&categoryList.map((category,index)=>(
          <div key={index}>
            <Image src={category.icon?.url} alt={category.name} width={40} height={40}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
