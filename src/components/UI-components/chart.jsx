import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { Progress } from "@chakra-ui/react";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Product count per category",
    },
  },
};
Chart.register(CategoryScale);

export const ChartCompo = () => {
  const { productCategoryMap, loading } = useSelector((state) => state.product);
  const [labels, setLabels] = useState([]);
  const [countData, setData] = useState([]);
  const initLabel = () => {
    setLabels(Object.keys(productCategoryMap));
    setData(Object.values(productCategoryMap));
  };
  useEffect(() => {
    initLabel();
  }, []);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Count",
        data: countData,

        backgroundColor: [
          "rgb(247, 150, 150)",
          "rgb(243, 172, 131)",
          "rgb(136, 161, 245)",
          "rgb(245, 161, 217)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      {loading && <Progress size="xs" isIndeterminate mt={"30px"} />}
      {!loading && <Bar options={options} data={data} />}
    </>
  );
};
