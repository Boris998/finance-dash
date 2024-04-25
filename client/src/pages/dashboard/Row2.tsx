import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  Scatter,
  LineChart,
  Pie,
  PieChart,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

type Props = {};

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

function Row2({}: Props) {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: productData } = useGetProductsQuery();
  const { data: operationalData } = useGetKpisQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sidetext="+9.5%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={operationalExpenses}
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
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[2500, 11000]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[2500, 11000]}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox borderRadius="5px" gridArea="e">
        <BoxHeader title="Campaign Shampaigne" sidetext="+9.5%" />
        <FlexBetween mb="0.25" gap="1.5rem" pr="1rem">
          <PieChart
            width={160}
            height={160}
            margin={{
              top: 0,
              right: -10,
              left: 40,
              bottom: 20,
            }}
          >
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.75rem" flexBasis="40%" textAlign="center" pb='1rem'>
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">Finance Goals of The Camoaign</Typography>
          </Box>
          <Box flexBasis="40%" pb='1rem'>
            <Typography variant="h5">Loses In Revenue</Typography>
            <Typography variant="h6">Loses Are Down 25%</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox borderRadius="5px" gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sidetext="+4%" />
        <ResponsiveContainer width="100%" height='85%'>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 10,
              left: -15,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Row2;
