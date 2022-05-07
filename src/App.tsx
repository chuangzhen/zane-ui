import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios'
import './mock'
// import './App.css';
// import "./styles/index.scss";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
// import { arrayToTree } from "./components/Button/index";

import { Menu, MenuItem } from "./components/Menu";
import ScrollView from 'components/ScrollView'




function App() {
  // const arr = [
  //   { id: 1, name: '部门1', pid: 0 },
  //   { id: 2, name: '部门2', pid: 1 },
  //   { id: 3, name: '部门3', pid: 1 },
  //   { id: 4, name: '部门4', pid: 3 },
  //   { id: 5, name: '部门5', pid: 4 },
  // ]
  // console.log(arrayToTree(arr));
  const [list, setList] = useState<any[]>([])
    const [pagination, setPagination] = useState<{current_page:number,total_page:number}>({current_page:0,total_page:0})
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        document.body.setAttribute('style', 'overflow:hidden')
        getList(1)
    }, [])

    const getList = async (page = 1) => {
        setLoading(true)
        let result = await axios({
            url: '/books',
            method: 'get',
            params: {
                page: page,
            }
        })
        console.log("🚀 ~ file: index.tsx ~ line 23 ~ getList ~ result", result)
        if (result.data.code === 0) {
            setList([...list, ...result.data.data.list])
            setPagination(result.data.data.pagination)
        }
        setLoading(false)

    }

  const onScrollToBottom = () => {
    console.log('onScrollToBottom');
    if (pagination.current_page < pagination.total_page) {
        getList(pagination.current_page + 1)
    }else{
        console.log('到底了');
        
    }

}
const onScrollToTop = () => {
    console.log('onScrollToTop---要刷新还是加载上一页看需要');


}

  return (
    <div className="App">
      <h1>App.tsx</h1>
      <h1>xxx</h1>
      <h2>2222aaa</h2>
      <h3>3333aaa</h3>

      <header className="App-header">

        <Menu defaultIndex={0} mode="vertical" onSelect={(index) => console.log(index)}>
          <MenuItem index={0}>
            这是菜单1号
          </MenuItem>
          <MenuItem  index={1} disabled>
            这是菜单2号
          </MenuItem>
          <MenuItem  index={2}>
            这是菜单3号
          </MenuItem>
          <MenuItem  index={3}>
            这是菜单4号
          </MenuItem>
        </Menu>


        <div>
          <Button
            btnType={ButtonType.Link}
            size={ButtonSize.Small}
            rel="noopener noreferrer"
            target="_blank"
            href="https://reactjs.org"
          //有oClick属性的提示

          >
            React Link
          </Button>
          <Button
            btnType={ButtonType.Link}
            size={ButtonSize.Small}
            rel="noopener noreferrer"
            target="_blank"
            disabled={true}
            href="https://reactjs.org">
            Disabled Link
          </Button>
          <Button
            btnType={ButtonType.Primary}
            size={ButtonSize.Large}
            onClick={(e) => {
              console.log(e, 6666);
            }}
          >
            Large Button
          </Button>
          <Button
            btnType={ButtonType.Default}
            size={ButtonSize.Large}>
            Large Default
          </Button>
          <Button
            btnType={ButtonType.Primary}
            size={ButtonSize.Large}
            disabled={true}
          >
            Large Disabled
          </Button>
          <Button
            btnType={ButtonType.Danger}
            size={ButtonSize.Small}>
            Small Danger
          </Button>

        </div>

      </header>


      <ScrollView Component={Row}
                dataList={list}
                // hasMore={pagination.current_page ==}
                distance={100}
                loading={loading}
                // scrollContinerId={'scroll_div'}
                onScrollToTop={onScrollToTop}
                onScrollToBottom={onScrollToBottom} />
    </div>
  );
}

export default App;


const Row = ({ data }:{data:any}) => {
  return <div className={'row_container'} key={data.id}>
      <div>id:{data.id}</div>
      <img src={data.url} alt="" className={'book_img'} />
      <div className={'book_info'}>
          <div>{data.title}</div>
          <div>{data.cost}</div>
          <div>{data.desc}</div>
      </div>
  </div>
}