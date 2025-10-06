import * as echarts from "echarts";

export default function ramChart(socket) {
  // get container
  const container = document.getElementById("ram-chart");
  if (!container) return;

  // dispose existing chart if any
  const existing = echarts.getInstanceByDom(container);
  if (existing) existing.dispose();
  const chart = echarts.init(container);

  // data arrays
  const ram_total_data = [];
  const ram_used_data = [];
  const time_ram = [];

  // define series colors for tooltip & legend
  const series_colors = [
    "RGBA(29, 233, 182, 1)", // total RAM
    "RGBA(255, 60, 0, 1)", // used RAM
  ];

  const update_chart = () => {
    if (chart.isDisposed()) return;
    chart.setOption({
      title: {
        text: "RAM Usage",
        left: "center",
        top: 10,
        textStyle: { color: "#e0e0e0", fontSize: 16 },
      },
      backgroundColor: "#212121",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(50,50,50,0.25)",
        textStyle: { color: "#fff" },
        formatter: (params) => {
          return params
            .map((item) => {
              const color = series_colors[item.seriesIndex];
              return (
                `<span style="
                    display:inline-block;
                    margin-right:5px;
                    border-radius:1px;
                    width:16px;
                    height:2px;
                    background-color:${color};
                  "></span>` + `${item.seriesName}: ${item.value} GB`
              );
            })
            .join("<br/>");
        },
      },
      legend: {
        data: [
          {
            name: "Total",
            icon: "rect",
            itemStyle: { color: series_colors[0] },
          },
          {
            name: "Used",
            icon: "rect",
            itemStyle: { color: series_colors[1] },
          },
        ],
        icon: "rect",
        itemWidth: 24,
        itemHeight: 3,
        bottom: 0,
        textStyle: { color: "#bbb", fontSize: 12 },
        selectedMode: false,
      },
      grid: { top: 60, bottom: 30, left: 40, right: 20, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
        data: time_ram,
      },
      yAxis: {
        type: "value",
        min: 0,
        name: "GB",
        nameGap: 30,
        nameLocation: "middle",
        nameTextStyle: { color: "#888" },
        axisLine: { lineStyle: { color: "#888" } },
        splitLine: { lineStyle: { color: "#333" } },
      },
      animation: true,
      animationEasing: "cubicOut",
      series: [
        {
          name: "Total",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: ram_total_data,
          lineStyle: { color: series_colors[0], width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: series_colors[0].replace(/1\)$/, "0.6)") },
              { offset: 1, color: series_colors[0].replace(/1\)$/, "0)") },
            ]),
          },
        },
        {
          name: "Used",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: ram_used_data,
          lineStyle: { color: series_colors[1], width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: series_colors[1].replace(/1\)$/, "0.6)") },
              { offset: 1, color: series_colors[1].replace(/1\)$/, "0)") },
            ]),
          },
        },
      ],
    });
  };

  // initial render
  update_chart();

  // listen for RAM stats events
  socket.on("ram_stats", ({ total_gb, used_gb }) => {
    const now = new Date().toLocaleTimeString();
    time_ram.push(now);
    ram_total_data.push(total_gb);
    ram_used_data.push(used_gb);

    // keep only last 60 points
    if (time_ram.length > 60) {
      time_ram.shift();
      ram_total_data.shift();
      ram_used_data.shift();
    }

    update_chart();
  });

  // handle resize
  window.addEventListener("resize", chart.resize);

  // cleanup
  return () => {
    socket.disconnect();
    chart.dispose();
    window.removeEventListener("resize", chart.resize);
  };
}
