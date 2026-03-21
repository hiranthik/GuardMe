'use client';

import { useState } from 'react';
import { DateRangePicker, DateRangePickerValue, LineChart } from '@tremor/react';

const data = [
  {
    date: '2023-08-01',
    'Overall': 2100.2,
    'First-Year': 4434.1,
    'International': 7943.2,
  },
  {
    date: '2023-08-02',
    'Overall': 2943.0,
    'First-Year': 4954.1,
    'International': 8954.1,
  },
  {
    date: '2023-08-03',
    'Overall': 4889.5,
    'First-Year': 6100.2,
    'International': 9123.7,
  },
  {
    date: '2023-08-04',
    'Overall': 3909.8,
    'First-Year': 4909.7,
    'International': 7478.4,
  },
  {
    date: '2023-08-05',
    'Overall': 5778.7,
    'First-Year': 7103.1,
    'International': 9504.3,
  },
  {
    date: '2023-08-06',
    'Overall': 5900.9,
    'First-Year': 7534.3,
    'International': 9943.4,
  },
  {
    date: '2023-08-07',
    'Overall': 4129.4,
    'First-Year': 7412.1,
    'International': 10112.2,
  },
  {
    date: '2023-08-08',
    'Overall': 6021.2,
    'First-Year': 7834.4,
    'International': 10290.2,
  },
  {
    date: '2023-08-09',
    'Overall': 6279.8,
    'First-Year': 8159.1,
    'International': 10349.6,
  },
  {
    date: '2023-08-10',
    'Overall': 6224.5,
    'First-Year': 8260.6,
    'International': 10415.4,
  },
  {
    date: '2023-08-11',
    'Overall': 6380.6,
    'First-Year': 8965.3,
    'International': 10636.3,
  },
  {
    date: '2023-08-12',
    'Overall': 6414.4,
    'First-Year': 7989.3,
    'International': 10900.5,
  },
  {
    date: '2023-08-13',
    'Overall': 6540.1,
    'First-Year': 7839.6,
    'International': 11040.4,
  },
  {
    date: '2023-08-14',
    'Overall': 6634.4,
    'First-Year': 7343.8,
    'International': 11390.5,
  },
  {
    date: '2023-08-15',
    'Overall': 7124.6,
    'First-Year': 6903.7,
    'International': 11423.1,
  },
  {
    date: '2023-08-16',
    'Overall': 7934.5,
    'First-Year': 6273.6,
    'International': 12134.4,
  },
  {
    date: '2023-08-17',
    'Overall': 10287.8,
    'First-Year': 5900.3,
    'International': 12034.4,
  },
  {
    date: '2023-08-18',
    'Overall': 10323.2,
    'First-Year': 5732.1,
    'International': 11011.7,
  },
  {
    date: '2023-08-19',
    'Overall': 10511.4,
    'First-Year': 5523.1,
    'International': 11834.8,
  },
  {
    date: '2023-08-20',
    'Overall': 11043.9,
    'First-Year': 5422.3,
    'International': 12387.1,
  },
  {
    date: '2023-08-21',
    'Overall': 6700.7,
    'First-Year': 5334.2,
    'International': 11032.2,
  },
  {
    date: '2023-08-22',
    'Overall': 6900.8,
    'First-Year': 4943.4,
    'International': 10134.2,
  },
  {
    date: '2023-08-23',
    'Overall': 7934.5,
    'First-Year': 4812.1,
    'International': 9921.2,
  },
  {
    date: '2023-08-24',
    'Overall': 9021.0,
    'First-Year': 2729.1,
    'International': 10549.8,
  },
  {
    date: '2023-08-25',
    'Overall': 9198.2,
    'First-Year': 2178.0,
    'International': 10968.4,
  },
  {
    date: '2023-08-26',
    'Overall': 9557.1,
    'First-Year': 2158.3,
    'International': 11059.1,
  },
  {
    date: '2023-08-27',
    'Overall': 9959.8,
    'First-Year': 2100.8,
    'International': 11903.6,
  },
  {
    date: '2023-08-28',
    'Overall': 10034.6,
    'First-Year': 2934.4,
    'International': 12143.3,
  },
  {
    date: '2023-08-29',
    'Overall': 10243.8,
    'First-Year': 3223.4,
    'International': 12930.1,
  },
  {
    date: '2023-08-30',
    'Overall': 10078.5,
    'First-Year': 3779.1,
    'International': 13420.5,
  },
  {
    date: '2023-08-31',
    'Overall': 11134.6,
    'First-Year': 4190.3,
    'International': 14443.2,
  },
  {
    date: '2023-09-01',
    'Overall': 12347.2,
    'First-Year': 4839.1,
    'International': 14532.1,
  },
  {
    date: '2023-09-02',
    'Overall': 12593.8,
    'First-Year': 5153.3,
    'International': 14283.5,
  },
  {
    date: '2023-09-03',
    'Overall': 12043.4,
    'First-Year': 5234.8,
    'International': 14078.9,
  },
  {
    date: '2023-09-04',
    'Overall': 12144.9,
    'First-Year': 5478.4,
    'International': 13859.7,
  },
  {
    date: '2023-09-05',
    'Overall': 12489.5,
    'First-Year': 5741.1,
    'International': 13539.2,
  },
  {
    date: '2023-09-06',
    'Overall': 12748.7,
    'First-Year': 6743.9,
    'International': 13643.2,
  },
  {
    date: '2023-09-07',
    'Overall': 12933.2,
    'First-Year': 7832.8,
    'International': 14629.2,
  },
  {
    date: '2023-09-08',
    'Overall': 13028.8,
    'First-Year': 8943.2,
    'International': 13611.2,
  },
  {
    date: '2023-09-09',
    'Overall': 13412.4,
    'First-Year': 9932.2,
    'International': 12515.2,
  },
  {
    date: '2023-09-10',
    'Overall': 13649.0,
    'First-Year': 10139.2,
    'International': 11143.8,
  },
  {
    date: '2023-09-11',
    'Overall': 13748.5,
    'First-Year': 10441.2,
    'International': 8929.2,
  },
  {
    date: '2023-09-12',
    'Overall': 13148.1,
    'First-Year': 10933.8,
    'International': 8943.2,
  },
  {
    date: '2023-09-13',
    'Overall': 12839.6,
    'First-Year': 11073.4,
    'International': 7938.3,
  },
  {
    date: '2023-09-14',
    'Overall': 12428.2,
    'First-Year': 11128.3,
    'International': 7533.4,
  },
  {
    date: '2023-09-15',
    'Overall': 12012.8,
    'First-Year': 11412.3,
    'International': 7100.4,
  },
  {
    date: '2023-09-16',
    'Overall': 11801.3,
    'First-Year': 10501.1,
    'International': 6532.1,
  },
  {
    date: '2023-09-17',
    'Overall': 10102.9,
    'First-Year': 8923.3,
    'International': 4332.8,
  },
  {
    date: '2023-09-18',
    'Overall': 12132.5,
    'First-Year': 10212.1,
    'International': 7847.4,
  },
  {
    date: '2023-09-19',
    'Overall': 12901.1,
    'First-Year': 10101.7,
    'International': 7223.3,
  },
  {
    date: '2023-09-20',
    'Overall': 13132.6,
    'First-Year': 12132.3,
    'International': 6900.2,
  },
  {
    date: '2023-09-21',
    'Overall': 14132.2,
    'First-Year': 13212.5,
    'International': 5932.2,
  },
  {
    date: '2023-09-22',
    'Overall': 14245.8,
    'First-Year': 12163.4,
    'International': 5577.1,
  },
  {
    date: '2023-09-23',
    'Overall': 14328.3,
    'First-Year': 10036.1,
    'International': 5439.2,
  },
  {
    date: '2023-09-24',
    'Overall': 14949.9,
    'First-Year': 8985.1,
    'International': 4463.1,
  },
  {
    date: '2023-09-25',
    'Overall': 15967.5,
    'First-Year': 9700.1,
    'International': 4123.2,
  },
  {
    date: '2023-09-26',
    'Overall': 17349.3,
    'First-Year': 10943.4,
    'International': 3935.1,
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