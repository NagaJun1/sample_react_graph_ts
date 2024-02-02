import React, { ReactElement, useState } from 'react';
import './css/App.css';
import { Cell, Pie, PieChart } from 'recharts';

// TODO 積み上げ棒グラフ
// react-chartjs-2
// https://qiita.com/ledsun/items/05d6d2725864488029bb


const App = () => {

  const [width, setWidth] = useState(400); // 円グラフの描写幅
  const [height, setHeight] = useState(300); // 円グラフの描写高さ
  const [outerRadius, setOuterRadius] = useState(100); // 円半径

  /** 半径変更 */
  const updateRadius = (val: any) => {
    // 半径（数値）を変更
    setOuterRadius(checkNumber(val, 50, 300));

    // 描写高さ、幅 = 半径 x 2 + 200
    let width = outerRadius * 2;
    setHeight(width + 200)
    setWidth(width + 300)
  };

  /** 円のサイズダウン */
  let sizeDown = function (event: React.MouseEvent<HTMLButtonElement>) {
    updateRadius(outerRadius - 50)
  }

  /** 円のサイズアップ */
  let sizeUp = function (event: React.MouseEvent<HTMLButtonElement>) {
    updateRadius(outerRadius + 50)
  }

  return (<>
    <div className="App">
      <div className='property-name margin10px'>
        <h3> 「recharts」のサンプル </h3>
        <p>円グラフ、プロパティ</p>
        <p> {"半径: " + outerRadius + "（50～300）"}</p>
        <button onClick={sizeDown}>-50</button>
        <button onClick={sizeUp}>+50</button>
        <p>
          ※作りこみ甘いですが、以下項目に入力後、<br />
          上記ボタンでサイズを変更すると、 <br />
          グラフの値が反映できます
        </p>
        <ChangeInputs />
      </div>

      {/* ↓ 円グラフの項目、data の値次第で、要素の修正が可能 */}
      <PieChart width={width} height={height} className='margin10px'>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={outerRadius} fill="#82ca9d" label={label} > {
          data.map((entry, index) =>
            (<Cell key={`cell-${index}`} fill={COLORS[index]} />)
          )
        } </Pie>
      </PieChart>
    </div >
  </>);
}

/** 円グラフの各要素の色 */
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/** 円グラフ内の各項目の要素を修正 */
const ChangeInputs = () => {
  let inputs: ReactElement[] = [];
  data.forEach((data1) => {
    inputs.push(<div className='margin10px bg-gainsboro' key={data1.index}>
      <p>{"ラベル" + (1 + data1.index).toString()}</p>
      <input onChange={((event) => {
        data1.name = event.target.value; // ラベルの書き換え
      })} />

      <p> 値（0~500）</p>
      <input onChange={(event) => {
        // TODO 値書換で、<PieChart> を再描写する
        data1.value = checkNumber(event.target.value, 0, 500)
      }} />
    </div>)
  })
  return <>{inputs}</>;
}

/** 円グラフのラベル定義 */
const label = ({ name }: any) => {
  return name;
}

/** 円グラフに登録するデータ */
let data = [
  {
    index: 0,
    name: 'データ1',
    value: 300,
  }, {
    index: 1,
    name: 'データ2',
    value: 200,
  }, {
    index: 2,
    name: 'データ3',
    value: 380,
  }, {
    index: 3,
    name: 'データ4',
    value: 80,
  }, {
    index: 4,
    name: 'データ5',
    value: 40,
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
