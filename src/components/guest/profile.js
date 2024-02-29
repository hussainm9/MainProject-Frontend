import React from 'react'
import  { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';

export default function Profile() {
  return (
    <div>
      <Radio.Group  style={{ marginBottom: 8 }}>
        <Radio.Button value="top">
          <h2>top</h2>
        </Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        
        style={{ height: 220 }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />

    </div>
  )
}
