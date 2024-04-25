import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue,
          expenses,
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  const totalRevenueByMonth = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue,
        };
      })
    );
  }, [data]);

  // console.log('sad',totalRevenueByMonth);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line revenue, bottom line expenses"
          sidetext="+4%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[9000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dot={true}
              dataKey="revenue"
              stroke={palette.primary.main}
              fill="url(#colorRevenue)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dot={true}
              dataKey="expenses"
              stroke={palette.primary.main}
              fill="url(#colorExpenses)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line revenue, bottom line expenses"
          sidetext="+9.5%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={palette.grey[800]}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue by month"
          subtitle="total revenue by month"
          sidetext="+9.5%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            width={500}
            height={300}
            data={totalRevenueByMonth}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 25,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;