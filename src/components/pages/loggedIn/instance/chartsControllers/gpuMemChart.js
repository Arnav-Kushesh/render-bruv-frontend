import * as echarts from "echarts";

export default function gpuMemChart(socket) {
  // get container
  const container = document.getElementById("gpu-mem-chart");
  if (!container) return;

  // dispose existing chart if any
  const existing = echarts.getInstanceByDom(container);
  if (existing) existing.dispose();
  const chart = echarts.init(container);

  // timeline and per-GPU data storage
  const time_gpu_mem = [];
  const gpu_series_map = {}; // track unique series for same-named GPUs
  const gpu_index_map = {}; // track original keys to display names

  // same 50-entry GPU color palette
  const gpu_color = [
    "rgba(126, 211, 33, 1)",
    "rgba(245, 217, 20, 1)",
    "rgba(255, 149, 0, 1)",
    "rgba(255, 59, 48, 1)",
    "rgba(0, 122, 255, 1)",
    "rgba(175, 82, 222, 1)",
    "rgba(76, 217, 100, 1)",
    "rgba(255, 204, 2, 1)",
    "rgba(255, 107, 53, 1)",
    "rgba(88, 86, 214, 1)",
    "rgba(255, 45, 146, 1)",
    "rgba(0, 212, 255, 1)",
    "rgba(50, 215, 75, 1)",
    "rgba(255, 159, 10, 1)",
    "rgba(142, 142, 147, 1)",
    "rgba(255, 99, 71, 1)",
    "rgba(34, 139, 34, 1)",
    "rgba(30, 144, 255, 1)",
    "rgba(220, 20, 60, 1)",
    "rgba(153, 50, 204, 1)",
    "rgba(82, 196, 26, 1)",
    "rgba(250, 219, 20, 1)",
    "rgba(19, 194, 194, 1)",
    "rgba(250, 140, 22, 1)",
    "rgba(245, 34, 45, 1)",
    "rgba(47, 84, 235, 1)",
    "rgba(235, 47, 150, 1)",
    "rgba(114, 46, 209, 1)",
    "rgba(56, 158, 13, 1)",
    "rgba(212, 136, 6, 1)",
    "rgba(9, 109, 217, 1)",
    "rgba(173, 78, 0, 1)",
    "rgba(168, 7, 26, 1)",
    "rgba(9, 88, 217, 1)",
    "rgba(159, 18, 57, 1)",
    "rgba(83, 29, 171, 1)",
    "rgba(115, 209, 61, 1)",
    "rgba(255, 197, 61, 1)",
    "rgba(64, 169, 255, 1)",
    "rgba(179, 127, 235, 1)",
    "rgba(255, 120, 117, 1)",
    "rgba(54, 207, 201, 1)",
    "rgba(149, 222, 100, 1)",
    "rgba(255, 214, 102, 1)",
    "rgba(211, 173, 247, 1)",
    "rgba(135, 232, 222, 1)",
    "rgba(255, 163, 158, 1)",
    "rgba(186, 230, 55, 1)",
    "rgba(145, 213, 255, 1)",
    "rgba(255, 187, 150, 1)",
  ];

  // helper to create display name from GPU key
  const create_display_name = (gpu_key) => {
    // Simply extract base name (remove _n suffix)
    return gpu_key.replace(/_\d+$/, "");
  };

  // helper to build series config
  const build_series = () => {
    const series_keys = Object.keys(gpu_series_map);
    const too_many = series_keys.length > gpu_color.length;

    return series_keys.map((series_key, idx) => {
      const base_color = too_many ? "rgba(255,255,255,1)" : gpu_color[idx];
      const display_name = gpu_series_map[series_key].display_name;

      // Create unique series name for legend
      let unique_series_name;
      if (series_key.includes("_")) {
        // Multiple GPUs case: RTX A4000_0 -> RTX A4000_0
        unique_series_name = `${display_name}_${series_key.split("_").pop()}`;
      } else {
        // Single GPU case: MX130 -> MX130 (no suffix needed)
        unique_series_name = display_name;
      }

      // gradient for area
      const gradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: base_color.replace(/1\)$/, "0.6)") },
        { offset: 1, color: base_color.replace(/1\)$/, "0)") },
      ]);

      return {
        name: unique_series_name,
        type: "line",
        smooth: true,
        showSymbol: false,
        data: gpu_series_map[series_key].data,
        lineStyle: { color: base_color, width: 2 },
        areaStyle: { color: gradient },
        // Store the clean display name for tooltip usage
        displayName: display_name,
      };
    });
  };

  const update_chart = () => {
    if (chart.isDisposed()) return;
    chart.setOption({
      title: {
        text: "GPU Memory (GB)",
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
              const idx = item.seriesIndex;
              const too_many = params.length > gpu_color.length;
              const color = too_many ? "rgba(255,255,255,1)" : gpu_color[idx];
              // Use clean display name - only remove suffix if it exists
              const cleanName = item.seriesName.includes("_")
                ? item.seriesName.replace(/_\d+$/, "")
                : item.seriesName;
              return (
                `<span style="
                    display:inline-block;
                    margin-right:5px;
                    border-radius:1px;
                    width:16px;
                    height:2px;
                    background-color:${color};
                  "></span>` + `${cleanName}: ${item.value} GB`
              );
            })
            .join("<br/>");
        },
      },
      legend: {
        data: Object.keys(gpu_series_map).map((series_key, idx) => {
          const display_name = gpu_series_map[series_key].display_name;
          let unique_series_name;
          if (series_key.includes("_")) {
            // Multiple GPUs case
            unique_series_name = `${display_name}_${series_key
              .split("_")
              .pop()}`;
          } else {
            // Single GPU case
            unique_series_name = display_name;
          }
          return {
            name: unique_series_name,
            icon: "rect",
            itemStyle: {
              color:
                idx < gpu_color.length ? gpu_color[idx] : "rgba(255,255,255,1)",
            },
          };
        }),
        icon: "rect",
        itemWidth: 24,
        itemHeight: 3,
        bottom: 0,
        textStyle: { color: "#bbb", fontSize: 12 },
        selectedMode: false,
        // Custom formatter to show clean names in legend
        formatter: function (name) {
          // Only remove suffix if it exists (for multiple GPU case)
          return name.includes("_") ? name.replace(/_\d+$/, "") : name;
        },
      },
      grid: { top: 60, bottom: 30, left: 40, right: 20, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
        data: time_gpu_mem,
      },
      yAxis: {
        type: "value",
        name: "GB",
        nameGap: 30,
        nameLocation: "middle",
        nameTextStyle: { color: "#888" },
        axisLine: { lineStyle: { color: "#888" } },
        splitLine: { lineStyle: { color: "#333" } },
      },
      animation: true,
      animationEasing: "cubicOut",
      series: build_series(),
    });
  };

  // initial empty render
  update_chart();

  socket.on("gpu_mem_stats", (payload) => {
    const now = new Date().toLocaleTimeString();
    // console.log("Original payload:", payload);

    time_gpu_mem.push(now);
    if (time_gpu_mem.length > 60) time_gpu_mem.shift();

    // Get all GPU keys to determine display names
    const gpu_keys = Object.keys(payload);

    // Process each GPU and create appropriate display names
    Object.entries(payload).forEach(([original_key, value]) => {
      const display_name = create_display_name(original_key);

      // Create unique series key (original key) but use display name for showing
      if (!gpu_series_map[original_key]) {
        gpu_series_map[original_key] = {
          display_name: display_name,
          data: [],
        };
      }

      // Update mapping
      gpu_index_map[original_key] = display_name;

      // Add new data point
      gpu_series_map[original_key].data.push(value);

      // Keep only last 60 data points
      if (gpu_series_map[original_key].data.length > 60) {
        gpu_series_map[original_key].data.shift();
      }
    });

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
