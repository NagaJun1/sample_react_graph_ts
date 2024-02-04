import React, { ReactElement, useState } from 'react';
import './css/App.css';
import { Cell, Pie, PieChart } from 'recharts';
import StackedBarChart from './ts/StackedBarChart';

// 凡例（recharts）
// https://recharts.org/en-US/examples

// TODO 積み上げ棒グラフ
// react-chartjs-2
// https://qiita.com/ledsun/items/05d6d2725864488029bb

const App = () => {

  /** チャートのシード値 */
  const [chartSeed, setChartSeed] = useState(1);
  // ↑ 更新することで、再描写（本当は、再描写しなくても、値更新可能なのでは？)

  /** チャートを更新する */
  function reLoadChart() {
    setChartSeed(Math.random());
  }

  /** data の数値を増やす */
  function addDataValue(index: number, addValue: number) {
    data[index].value += addValue;
    if (data[index].value < 0) {
      data[index].value = 0; // 0を下回らない様にする
    }
    reLoadChart();
  }

  /** 円グラフ内の各項目の要素を修正 */
  const ChangeInputs = () => {
    let inputs: ReactElement[] = [];
    data.forEach((data1) => {
      inputs.push(
        <div className='margin10px bg-gainsboro flex' key={data1.index}>
          <p className='margin10px'>{data1.name}</p>
          <button className='min_width_50px margin5px' onClick={() => {
            addDataValue(data1.index, 1)
          }}> +1 </button>
          <button className='min_width_50px margin5px' onClick={() => {
            addDataValue(data1.index, -1)
          }}> -1 </button>
        </div>)
    })
    return <>{inputs}</>;
  }

  return (<>
    <div className='margin20px'>
      <Header />
      <StackedBarChart />
      <div className="flex">
        <div className='property-name margin10px'>
          <h3>円グラフの値を更新</h3>
          <ChangeInputs />
        </div>
        <PieChart key={chartSeed} width={750} height={500} className='margin10px'>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={200} fill="#82ca9d" label={label} > {
            data.map((entry, index) =>
              (<Cell key={`cell-${index}`} fill={COLORS[index]} />)
            )
          } </Pie>
        </PieChart>
      </div >
    </div>
  </>);
}

const Header = () => (
  <div className='flex'>
    <h3 className='margin10px'>「recharts」のサンプル</h3>
    <div className='margin10px'>
      <p className='margin10px'>ソースコード</p>
      <a href='https://github.com/NagaJun1/sample_react_graph_ts'>
        https://github.com/NagaJun1/sample_react_graph_ts
      </a>
    </div>
  </div>
);

/** 円グラフの各要素の色 */
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", '#afeeee'];

/** 円グラフのラベル定義 */
const label = ({ name }: any) => {
  return name;
}

/** 円グラフに登録するデータ */
let data = [
  {
    index: 0,
    name: 'データ1',
    value: 10,
  }, {
    index: 1,
    name: 'データ2',
    value: 2,
  }, {
    index: 2,
    name: 'データ3',
    value: 3,
  }, {
    index: 3,
    name: 'データ4',
    value: 4,
  }, {
    index: 4,
    name: 'データ5',
    value: 5,
  }
];

/**
 * 引数「val」が数値に変換可能で、許容範囲内となるかをチェック
 * @param val チェック対象値
 * @param min 最小値
 * @param max 最大値
 * @returns 変換後の数値（許容値を超える場合は、許容内に収まる様に丸める）
 */
function checkNumber(val: any, min: number, max: number) {
  let number = convertNumber(val);
  if (number < min) {
    return min;
  }
  if (max < number) {
    return max;
  }
  return number;
}

/**
 * 引数「val」が「number」であるかをチェック
 * @param val チェック対象の値
 * @param defaultVal 「val」が「number」出ない場合の戻り値
 * @returns 
 */
function convertNumber(val: any): number {

  console.log("checkNumber()");

  let result = parseFloat(val);
  if (0 < result) {
    return result;
  }
  return 0;
}

export default App;
