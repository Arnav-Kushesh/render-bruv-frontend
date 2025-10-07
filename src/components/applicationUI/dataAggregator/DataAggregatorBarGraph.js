import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatXAxisLabel = (dateString, durationType) => {
  const date = new Date(dateString);

  if (durationType === "MONTH") {
    return date.toLocaleString("default", { month: "short", year: "numeric" }); // Jul 2024
  } else if (durationType === "YEAR") {
    return date.getFullYear().toString(); // 2024
  } else {
    return date.toLocaleDateString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

const DataAggregatorBarGraph = ({ data }) => {
  // sort by date (optional)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const item = sortedData.find((d) => d.date === value);
            if (!item) return "";
            return formatXAxisLabel(item.date, item.durationType);
          }}
        />

        <YAxis />

        <Tooltip
          formatter={(value) => [value, "Amount"]}
          labelFormatter={(label) => {
            const item = sortedData.find((d) => d.date === label);
            if (!item) return label;
            return formatXAxisLabel(item.date, item.durationType);
          }}
        />

        <Bar dataKey="amount" fill="#4F46E5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DataAggregatorBarGraph;
