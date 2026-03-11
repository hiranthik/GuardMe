'use client';

import { useState } from 'react';
import { DateRangePicker, DateRangePickerValue, LineChart } from '@tremor/react';

const data = [
  {
    date: '2023-08-01',
    'ETF Shares Vital': 2100.2,
    'Vitainvest Core': 4434.1,
    'iShares Tech Growth': 7943.2,
  },
  {
    date: '2023-08-02',
    'ETF Shares Vital': 2943.0,
    'Vitainvest Core': 4954.1,
    'iShares Tech Growth': 8954.1,
  },
  {
    date: '2023-08-03',
    'ETF Shares Vital': 4889.5,
    'Vitainvest Core': 6100.2,
    'iShares Tech Growth': 9123.7,
  },
  {
    date: '2023-08-04',
    'ETF Shares Vital': 3909.8,
    'Vitainvest Core': 4909.7,
    'iShares Tech Growth': 7478.4,
  },
  {
    date: '2023-08-05',
    'ETF Shares Vital': 5778.7,
    'Vitainvest Core': 7103.1,
    'iShares Tech Growth': 9504.3,
  },
  {
    date: '2023-08-06',
    'ETF Shares Vital': 5900.9,
    'Vitainvest Core': 7534.3,
    'iShares Tech Growth': 9943.4,
  },
  {
    date: '2023-08-07',
    'ETF Shares Vital': 4129.4,
    'Vitainvest Core': 7412.1,
    'iShares Tech Growth': 10112.2,
  },
  {
    date: '2023-08-08',
    'ETF Shares Vital': 6021.2,
    'Vitainvest Core': 7834.4,
    'iShares Tech Growth': 10290.2,
  },
  {
    date: '2023-08-09',
    'ETF Shares Vital': 6279.8,
    'Vitainvest Core': 8159.1,
    'iShares Tech Growth': 10349.6,
  },
  {
    date: '2023-08-10',
    'ETF Shares Vital': 6224.5,
    'Vitainvest Core': 8260.6,
    'iShares Tech Growth': 10415.4,
  },
  {
    date: '2023-08-11',
    'ETF Shares Vital': 6380.6,
    'Vitainvest Core': 8965.3,
    'iShares Tech Growth': 10636.3,
  },
  {
    date: '2023-08-12',
    'ETF Shares Vital': 6414.4,
    'Vitainvest Core': 7989.3,
    'iShares Tech Growth': 10900.5,
  },
  {
    date: '2023-08-13',
    'ETF Shares Vital': 6540.1,
    'Vitainvest Core': 7839.6,
    'iShares Tech Growth': 11040.4,
  },
  {
    date: '2023-08-14',
    'ETF Shares Vital': 6634.4,
    'Vitainvest Core': 7343.8,
    'iShares Tech Growth': 11390.5,
  },
  {
    date: '2023-08-15',
    'ETF Shares Vital': 7124.6,
    'Vitainvest Core': 6903.7,
    'iShares Tech Growth': 11423.1,
  },
  {
    date: '2023-08-16',
    'ETF Shares Vital': 7934.5,
    'Vitainvest Core': 6273.6,
    'iShares Tech Growth': 12134.4,
  },
  {
    date: '2023-08-17',
    'ETF Shares Vital': 10287.8,
    'Vitainvest Core': 5900.3,
    'iShares Tech Growth': 12034.4,
  },
  {
    date: '2023-08-18',
    'ETF Shares Vital': 10323.2,
    'Vitainvest Core': 5732.1,
    'iShares Tech Growth': 11011.7,
  },
  {
    date: '2023-08-19',
    'ETF Shares Vital': 10511.4,
    'Vitainvest Core': 5523.1,
    'iShares Tech Growth': 11834.8,
  },
  {
    date: '2023-08-20',
    'ETF Shares Vital': 11043.9,
    'Vitainvest Core': 5422.3,
    'iShares Tech Growth': 12387.1,
  },
  {
    date: '2023-08-21',
    'ETF Shares Vital': 6700.7,
    'Vitainvest Core': 5334.2,
    'iShares Tech Growth': 11032.2,
  },
  {
    date: '2023-08-22',
    'ETF Shares Vital': 6900.8,
    'Vitainvest Core': 4943.4,
    'iShares Tech Growth': 10134.2,
  },
  {
    date: '2023-08-23',
    'ETF Shares Vital': 7934.5,
    'Vitainvest Core': 4812.1,
    'iShares Tech Growth': 9921.2,
  },
  {
    date: '2023-08-24',
    'ETF Shares Vital': 9021.0,
    'Vitainvest Core': 2729.1,
    'iShares Tech Growth': 10549.8,
  },
  {
    date: '2023-08-25',
    'ETF Shares Vital': 9198.2,
    'Vitainvest Core': 2178.0,
    'iShares Tech Growth': 10968.4,
  },
  {
    date: '2023-08-26',
    'ETF Shares Vital': 9557.1,
    'Vitainvest Core': 2158.3,
    'iShares Tech Growth': 11059.1,
  },
  {
    date: '2023-08-27',
    'ETF Shares Vital': 9959.8,
    'Vitainvest Core': 2100.8,
    'iShares Tech Growth': 11903.6,
  },
  {
    date: '2023-08-28',
    'ETF Shares Vital': 10034.6,
    'Vitainvest Core': 2934.4,
    'iShares Tech Growth': 12143.3,
  },
  {
    date: '2023-08-29',
    'ETF Shares Vital': 10243.8,
    'Vitainvest Core': 3223.4,
    'iShares Tech Growth': 12930.1,
  },
  {
    date: '2023-08-30',
    'ETF Shares Vital': 10078.5,
    'Vitainvest Core': 3779.1,
    'iShares Tech Growth': 13420.5,
  },
  {
    date: '2023-08-31',
    'ETF Shares Vital': 11134.6,
    'Vitainvest Core': 4190.3,
    'iShares Tech Growth': 14443.2,
  },
  {
    date: '2023-09-01',
    'ETF Shares Vital': 12347.2,
    'Vitainvest Core': 4839.1,
    'iShares Tech Growth': 14532.1,
  },
  {
    date: '2023-09-02',
    'ETF Shares Vital': 12593.8,
    'Vitainvest Core': 5153.3,
    'iShares Tech Growth': 14283.5,
  },
  {
    date: '2023-09-03',
    'ETF Shares Vital': 12043.4,
    'Vitainvest Core': 5234.8,
    'iShares Tech Growth': 14078.9,
  },
  {
    date: '2023-09-04',
    'ETF Shares Vital': 12144.9,
    'Vitainvest Core': 5478.4,
    'iShares Tech Growth': 13859.7,
  },
  {
    date: '2023-09-05',
    'ETF Shares Vital': 12489.5,
    'Vitainvest Core': 5741.1,
    'iShares Tech Growth': 13539.2,
  },
  {
    date: '2023-09-06',
    'ETF Shares Vital': 12748.7,
    'Vitainvest Core': 6743.9,
    'iShares Tech Growth': 13643.2,
  },
  {
    date: '2023-09-07',
    'ETF Shares Vital': 12933.2,
    'Vitainvest Core': 7832.8,
    'iShares Tech Growth': 14629.2,
  },
  {
    date: '2023-09-08',
    'ETF Shares Vital': 13028.8,
    'Vitainvest Core': 8943.2,
    'iShares Tech Growth': 13611.2,
  },
  {
    date: '2023-09-09',
    'ETF Shares Vital': 13412.4,
    'Vitainvest Core': 9932.2,
    'iShares Tech Growth': 12515.2,
  },
  {
    date: '2023-09-10',
    'ETF Shares Vital': 13649.0,
    'Vitainvest Core': 10139.2,
    'iShares Tech Growth': 11143.8,
  },
  {
    date: '2023-09-11',
    'ETF Shares Vital': 13748.5,
    'Vitainvest Core': 10441.2,
    'iShares Tech Growth': 8929.2,
  },
  {
    date: '2023-09-12',
    'ETF Shares Vital': 13148.1,
    'Vitainvest Core': 10933.8,
    'iShares Tech Growth': 8943.2,
  },
  {
    date: '2023-09-13',
    'ETF Shares Vital': 12839.6,
    'Vitainvest Core': 11073.4,
    'iShares Tech Growth': 7938.3,
  },
  {
    date: '2023-09-14',
    'ETF Shares Vital': 12428.2,
    'Vitainvest Core': 11128.3,
    'iShares Tech Growth': 7533.4,
  },
  {
    date: '2023-09-15',
    'ETF Shares Vital': 12012.8,
    'Vitainvest Core': 11412.3,
    'iShares Tech Growth': 7100.4,
  },
  {
    date: '2023-09-16',
    'ETF Shares Vital': 11801.3,
    'Vitainvest Core': 10501.1,
    'iShares Tech Growth': 6532.1,
  },
  {
    date: '2023-09-17',
    'ETF Shares Vital': 10102.9,
    'Vitainvest Core': 8923.3,
    'iShares Tech Growth': 4332.8,
  },
  {
    date: '2023-09-18',
    'ETF Shares Vital': 12132.5,
    'Vitainvest Core': 10212.1,
    'iShares Tech Growth': 7847.4,
  },
  {
    date: '2023-09-19',
    'ETF Shares Vital': 12901.1,
    'Vitainvest Core': 10101.7,
    'iShares Tech Growth': 7223.3,
  },
  {
    date: '2023-09-20',
    'ETF Shares Vital': 13132.6,
    'Vitainvest Core': 12132.3,
    'iShares Tech Growth': 6900.2,
  },
  {
    date: '2023-09-21',
    'ETF Shares Vital': 14132.2,
    'Vitainvest Core': 13212.5,
    'iShares Tech Growth': 5932.2,
  },
  {
    date: '2023-09-22',
    'ETF Shares Vital': 14245.8,
    'Vitainvest Core': 12163.4,
    'iShares Tech Growth': 5577.1,
  },
  {
    date: '2023-09-23',
    'ETF Shares Vital': 14328.3,
    'Vitainvest Core': 10036.1,
    'iShares Tech Growth': 5439.2,
  },
  {
    date: '2023-09-24',
    'ETF Shares Vital': 14949.9,
    'Vitainvest Core': 8985.1,
    'iShares Tech Growth': 4463.1,
  },
  {
    date: '2023-09-25',
    'ETF Shares Vital': 15967.5,
    'Vitainvest Core': 9700.1,
    'iShares Tech Growth': 4123.2,
  },
  {
    date: '2023-09-26',
    'ETF Shares Vital': 17349.3,
    'Vitainvest Core': 10943.4,
    'iShares Tech Growth': 3935.1,
  },
];



const valueFormatter = (number:number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const firstAvailableDate = new Date(2023, 7, 1);
const lastAvailableDate = new Date(2023, 8, 26);

export default function LiteracyTrendChart() {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: firstAvailableDate,
    to: lastAvailableDate,
  });
  const selectedStartDate = dateRange.from;
  const selectedEndDate = dateRange.to;

  interface DataPoint {
  date: string;
  [key: string]: string | number; // This allows for dynamic category names like 'Overall' or 'ETF Shares'
}
 const filterData = (startDate: Date | undefined, endDate: Date | undefined, dataset: DataPoint[]) => {
    if (!startDate || !endDate) return dataset;

const start = new Date(startDate.setHours(0, 0, 0, 0));
  const end = new Date(endDate.setHours(23, 59, 59, 999));

  return dataset.filter((item) => {
    const currentDate = new Date(item.date + 'T00:00:00'); // Forces local time interpretation
    return currentDate >= start && currentDate <= end;
    });
  };
  return (
  <div className="p-10 bg-white rounded-xl border border-gray-200 shadow-sm w-full">
    <h3 className="text-lg font-semibold text-tremor-content-strong">
      Literacy Trend - Last 8 Weeks 
    </h3>
    <p className="text-tremor-default text-tremor-content">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
    </p>

   

    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      
    
      <div className="md:col-span-3">
        <LineChart
          data={filterData(selectedStartDate, selectedEndDate, data)}
          index="date"
          categories={['Overall', 'First-Year', 'International']}
         colors={['blue', 'violet', 'fuchsia']}
  // Add this to force visibility
  className="h-80 stroke-2"
          valueFormatter={valueFormatter}
          showYAxis={true}
          yAxisWidth={65}
          showLegend={false} 
        
          
        />
      </div>

      <div className="space-y-6 border-l border-gray-100 pl-6">
        <div>

          <div className="flex items-center gap-2">
            <span className="w-1 h-8 bg-blue-500 rounded-full" />
            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Overall</p>
          </div>
        </div>
        <div>

          <div className="flex items-center gap-2">
            <span className="w-1 h-8 bg-violet-500 rounded-full" />
            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">First-Year</p>
          </div>
        </div>
        <div>
        
          <div className="flex items-center gap-2">
            <span className="w-1 h-8 bg-fuchsia-500 rounded-full" />
            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">International</p>
          </div>
        </div>
        
        
        
      </div>
    </div>
  </div>
)}