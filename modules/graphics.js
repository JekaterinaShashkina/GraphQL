export const showAuditGraphic = (data, body) => {
  const { auditRatio, attrs, totalUp, totalDown } = data;
  console.log(data);
  console.log(auditRatio, attrs, totalUp, totalDown);
  const chart = document.createElement('div');
  const audit = document.createElement('h2');
  audit.classList.add('audit__title');
  audit.textContent = `Audit rating is ${Math.round(auditRatio * 100) / 100}`;
  const auditWrapper = document.createElement('div');
  auditWrapper.classList.add('audit__wrapper');
  const auditRate = document.createElement('div');
  auditRate.classList.add('audit__rate');
  const auditDown = document.createElement('p');
  auditDown.textContent = `Done ${totalUp}`;
  const auditUp = document.createElement('p');
  auditUp.textContent = `Received ${totalDown}`;
  auditRate.append(auditDown, auditUp);
  const auditGraphic = document.createElement('div');
  auditGraphic.width = 500;
  auditGraphic.classList.add('audit__graphic');
  if (auditRatio >= 1) {
    auditGraphic.innerHTML = `
    <svg width="700" height="110">
                  <rect x="5" y="5" width="690" height="35"
                      fill="#502" stroke="rgb(244, 229, 244)" stroke-width="10"/>
                  
                      <rect x="5" y="65" width="${
                        (totalDown / totalUp) * 690
                      }" height="35"
                      fill="#D8A" stroke="rgb(244, 229, 244)" stroke-width="10"/>
              </svg>
    `;
  } else {
    auditGraphic.innerHTML = `
    <svg width="700" height="110">
                  <rect x="5" y="5" width="${
                    (totalUp / totalDown) * 690
                  }" height="35"
                      fill="#502" stroke="rgb(244, 229, 244)" stroke-width="10"/>
                  
                      <rect x="5" y="65" width="690" height="35"
                      fill="#D8A" stroke="rgb(244, 229, 244)" stroke-width="10"/>
              </svg>
    `;
  }
  auditWrapper.append(auditRate, auditGraphic);
  chart.append(audit, auditWrapper);
  body.append(chart);
};

export const showProgressGraphic = (data, result, total, body) => {
  const container = document.querySelector('.container');
  console.log(container.offsetWidth);
  const windowWidth = container.offsetWidth;

  const xpGraph = document.createElement('div');
  xpGraph.classList.add('xp__graph');

  const graphTitle = document.createElement('h2');
  graphTitle.classList.add('xp__title');
  graphTitle.textContent = 'Graph shows your earned XP for learning time';
  const graphSvg = document.createElement('svg');
  graphSvg.classList.add('chart');
  let yAxisHtml = [];

  for (let i = 0; i < 5; i++) {
    let yAxis = `
    <text 
    x="43" y="${
      288 - 85.32 * i
    }" fill="#2D3652" font-family="Montserrat" font-size="12px" text-anchor="end">
        <tspan alignment-baseline="middle">${(
          (total / 3) *
          i
        ).toFixed()}</tspan>
    </text>`;
    yAxisHtml.push(yAxis);
  }

  let xAxisHtml = [];
  data.forEach((element, i) => {
    // даты выполнения всех проектов
    const date = new Date(Date.parse(element.updatedAt)).toLocaleString(
      'us-US',
      {
        year: 'numeric',
        month: 'numeric',
      },
    );
    // const nameProject = element.object.name;
    let xAxis = `
    <text 
    x="${70 + i * ((windowWidth * 0.9) / data.length)}" 
    y="308" fill="#2D3652" font-family="Montserrat" font-size="12px" text-anchor="middle">
    ${date}</text>`;
    xAxisHtml.push(xAxis);
  });
  const minAmount = result[0];
  const maxAmount = total;
  let xpResult = 0;
  const circles = [];
  let path = `<path d="`;
  console.log(minAmount, maxAmount);
  for (let i = 0; i < data.length; i++) {
    xpResult += result[i];
    console.log(xpResult);
    const y =
      280 - ((xpResult - minAmount) / (maxAmount - minAmount)) * (290 - 32);
    const x = 70.75 + i * ((windowWidth * 0.9) / data.length);

    if (i === 0) {
      path += 'M' + x + ',' + y;
    } else {
      path += 'L' + x + ',' + y;
    }
    let c = `<circle 
      cx="${x}" 
      cy="${y}" 
      r="4" fill="#414" stroke="#828" stroke-width="2" tooltip="NY Knicks, 1 (100.0%)"></circle>`;
    circles.push(c);
  }
  path += `" fill="none" fill-opacity="1" stroke="#828" stroke-width="2" style="stroke-dasharray: 3000,3000"></path>`;
  circles.push(path);
  graphSvg.innerHTML = `
  <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" 
  width="${windowWidth}" height="340">
  <defs>
      <clippath id="zinoui-1">
          <rect x="53" y="32" width="700" height="400" fill="none"></rect>
      </clippath>
  </defs>
  <g class="chart-labels-y">${xAxisHtml}</g>
  <g class="chart-labels-x">${yAxisHtml} </g>
  <g class="zui-chart-axis">
      <polyline points="53,32 53,288 3000,288" fill="none" shape-rendering="crispEdges" stroke="#828" stroke-width="1"></polyline>
  </g>
  <g class="zui-chart-canvas">${circles}</g>
</svg>
`;
  xpGraph.append(graphTitle, graphSvg);
  body.append(xpGraph);
};
