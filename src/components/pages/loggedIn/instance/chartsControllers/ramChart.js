import * as echarts from "echarts";

export default function ramChart(socket) {
  const container = document.getElementById("cpu-chart");
  if (!container) return;

  const existing = echarts.getInstanceByDom(container);
  if (existing) existing.dispose();
  const chart = echarts.init(container);

  const cpu_data = [];
  const time_cpu = [];

  const update_chart = () => {
    if (chart.isDisposed()) return;
    chart.setOption({
      title: {
        text: "CPU Utilisation",
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
              return (
                `<span style="display:inline-block;margin-right:5px;border-radius:1px;width:16px;height:2px;background-color:RGBA(123, 104, 238, 1);"></span>` +
                `${item.seriesName}: ${item.value}%`
              );
            })
            .join("<br/>");
        },
      },
      legend: {
        data: [
          {
            name: "CPU",
            icon: "rect",
            itemStyle: { color: "RGBA(123, 104, 238, 1)" },
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
        data: time_cpu,
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        name: "Utilisation %",
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
          name: "CPU",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: cpu_data,
          lineStyle: { color: "rgba(123,104,238,1)", width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(123,104,238,0.6)" },
              { offset: 1, color: "rgba(123,104,238,0)" },
            ]),
          },
        },
      ],
    });
  };

  update_chart();

  socket.on("cpu_stats", ({ cpu_usage }) => {
    const now = new Date().toLocaleTimeString();
    time_cpu.push(now);
    cpu_data.push(cpu_usage);
    if (time_cpu.length > 60) time_cpu.shift();
    if (cpu_data.length > 60) cpu_data.shift();
    update_chart();
  });

  window.addEventListener("resize", chart.resize);

  return () => {
    socket.disconnect();
    chart.dispose();
    window.removeEventListener("resize", chart.resize);
  };
}
