import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import diaryController from "../api/diary.controller";

//그래프 데이터 가져오기
const getGraphData = async(diaryid)=> {
  try{
    const response = diaryController.getGraphData(diaryid);
    console.log(response.data)
  }catch(error){
    console.error("그래프 데이터 가져오기 중 오류", error);
  }
};

const Graph = ({
  // 그래프 데이터
  data,
  // 가로 세로 크기 기본값은 반응형
  width = "100%",
  height = "100%",

  // 노드의 폰트 사이즈
  fondSize = { user: 20, diary: 20, keyword: 20 },

  // 노드의 크기 keywordConstants는 weight에 곱해지는 상수 (키워드 노드의 가중치에 따라 크기가 달라짐)
  nodeSize = { user: 20, diary: 20, keyword: 20, keywordConstants: 1 },

  // 노드의 색상 (user, diary, keyword)
  nodeColor = { user: "red", diary: "green", keyword: "blue" },

  // 노드 간격(노드가 서로 밀려나느힘) 음수일 경우 응집력으로 바뀜
  spreadForce = 500,
}) => {
  const svgRef = useRef(null);

  let sampleData = {
    nodes: [
      {
        id: 0,
        user_id: 1,
        label: "User",
        text: "나",
      },
      {
        id: 1,
        diary_id: 1,
        label: "Diary",
        text: "일기",
      },
      {
        id: 5,
        label: "Keyword",
        text: "참고",
        weight: 0.9999999999999998,
      },
      {
        id: 4,
        label: "Keyword",
        text: "눈물",
        weight: 0.9999999999999998,
      },
      {
        id: 3,
        label: "Keyword",
        text: "사람",
        weight: 0.9999999999999998,
      },
      {
        id: 2,
        label: "Keyword",
        text: "나라",
        weight: 0.9999999999999998,
      },
    ],
    relationships: [
      {
        properties: {},
        type: "WROTE",
        startNode: 0,
        endNode: 1,
      },
      {
        properties: {},
        type: "INCLUDE",
        startNode: 1,
        endNode: 5,
      },
      {
        properties: {},
        type: "INCLUDE",
        startNode: 1,
        endNode: 4,
      },
      {
        properties: {},
        type: "INCLUDE",
        startNode: 1,
        endNode: 3,
      },
      {
        properties: {},
        type: "INCLUDE",
        startNode: 1,
        endNode: 2,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 5,
        endNode: 4,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 5,
        endNode: 4,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 4,
        endNode: 5,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 4,
        endNode: 5,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 3,
        endNode: 2,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 3,
        endNode: 2,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 2,
        endNode: 3,
      },
      {
        properties: {
          tfidf: -0.85,
        },
        type: "CONNECTED",
        startNode: 2,
        endNode: 3,
      },
    ],
    errors: [],
  };
  data = sampleData;

  useEffect(() => {
    if (!svgRef.current) return;

    // Extract nodes and relationships
    const nodes = data.nodes.map((d) => ({
      id: d.id,
      group: d.label,
      text: d.text,
      weight: d.weight,
    }));

    const links = data.relationships.map((d) => ({
      ...d.properties,
      source: d.startNode,
      target: d.endNode,
      type: d.type,
    }));

    // Clear the SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up the simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-spreadForce))
      // center
      .force(
        "center",
        d3.forceCenter(
          svgRef.current.clientWidth / 2,
          svgRef.current.clientHeight / 2
        )
      );

    const svg = d3.select(svgRef.current);

    // Draw links
    const linkGroup = svg
      .append("g")
      .attr("stroke", "#999")
      .selectAll(".line")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "line");

    let link = linkGroup
      .append("line")
      .attr("stroke", "#000")
      .attr("opacity", 1);

    // link text
    let linkText = linkGroup
      .append("text")
      .text((d) => {
        return d.tfidf;
      })
      .style("color", "#000")
      .style("fontWeight", "900")
      .style("font-size", 20)
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2)
      .attr("text-anchor", "middle")
      .attr("dy", -5); // Offset the text a bit above the link

    // Draw nodes
    let node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .selectAll(".node")
      .data(nodes);

    node = node
      .enter()
      .append("g")
      .attr("class", "node")
      .call(drag(simulation));

    let circle = node
      .append("circle")
      .attr("r", (d) => {
        if (d.group === "User") {
          return nodeSize.user;
        } else if (d.group === "Diary") {
          return nodeSize.diary;
        }
        return nodeSize.keyword * (d.weight * nodeSize.keywordConstants);
      })
      // anchor the circle to the center of the node
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", (d) => {
        if (d.group === "User") {
          return nodeColor.user;
        } else if (d.group === "Diary") {
          return nodeColor.diary;
        } else if (d.group === "Keyword") {
          return nodeColor.keyword;
        }
      });

    let nodeText = node
      .append("text")
      .text((d) => {
        if (d.group === "Keyword") {
          return d.text + "(" + Math.floor(d.weight * 100) / 100 + ")";
        }
        return d.text;
      }) // Assuming you want to display these properties
      .attr("text-anchor", "middle") // Center the text
      .style("color", "#000")
      .style("fontWeight", "bold")
      .style("font-size", (d) => {
        if (d.group === "User") {
          return fondSize.user;
        } else if (d.group === "Diary") {
          return fondSize.diary;
        }
        return fondSize.keyword;
      })
      .attr("dy", 0) // Vertically center the text
      .attr("x", 0) // Position the text relative to the group's center
      .attr("y", 0); // Position the text relative to the group's center

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      linkText
        .attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2);

      circle.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      nodeText.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    // touchmove, touchend, touchstart
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [data]);

  return <svg ref={svgRef} style={{ width: width, height: height }} />;
};

export default Graph;
