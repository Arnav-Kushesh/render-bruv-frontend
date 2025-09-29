import * as echarts from "echarts";

export default function networkChart(socket) {
  const container = document.getElementById("network-chart");
  if (!container) return;

  const existing = echarts.getInstanceByDom(container);
  if (existing) existing.dispose();

  const chart = echarts.init(container);
  const download_data = [];
  const upload_data = [];
  const time_data = [];

  const update_chart = () => {
    if (chart.isDisposed()) return;
    chart.setOption({
      title: {
        text: "Network I/O",
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
              const color =
                item.seriesName === "Download" ? "#FF6FF5" : "#FFD700";
              return (
                `<span style="display:inline-block;margin-right:5px;border-radius:1px;width:16px;height:2px;background-color:${color};"></span>` +
                `${item.seriesName}: ${item.value} Mbit/s`
              );
            })
            .join("<br/>");
        },
      },
      legend: {
        data: [
          {
            name: "Download",
            icon: "rect",
            itemStyle: { color: "#FF6FF5" },
          },
          { name: "Upload", icon: "rect", itemStyle: { color: "#FFD700" } },
        ],
        itemWidth: 24,
        itemHeight: 3,
        bottom: 0,
        textStyle: { color: "#bbb", fontSize: 12 },
        selectedMode: false,
      },
      grid: {
        top: 60,
        bottom: 30,
        left: 40,
        right: 20,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
        data: time_data,
      },
      yAxis: {
        type: "value",
        name: "Mbit/s",
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
          name: "Download",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: download_data,
          lineStyle: { color: "#FF6FF5", width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255,111,245,0.6)" },
              { offset: 1, color: "rgba(255,111,245,0)" },
            ]),
          },
        },
        {
          name: "Upload",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: upload_data,
          lineStyle: { color: "#FFD700", width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255,215,0,0.6)" },
              { offset: 1, color: "rgba(255,215,0,0)" },
            ]),
          },
        },
      ],
    });
  };

  socket.on("network_stats", (data) => {
    const now = new Date().toLocaleTimeString();
    time_data.push(now);
    download_data.push(data.download_speed);
    upload_data.push(data.upload_speed);
    if (time_data.length > 60) time_data.shift();
    if (download_data.length > 60) download_data.shift();
    if (upload_data.length > 60) upload_data.shift();
    update_chart();
  });

  update_chart();
  window.addEventListener("resize", chart.resize);

  return () => {
    socket.disconnect();
    chart.dispose();
    window.removeEventListener("resize", chart.resize);
  };
}
