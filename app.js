/************네비게이션 기능************/
const nav_a = document.querySelectorAll('header a');
for(let i = 0; i < nav_a.length; i++) {
  nav_a[i].onclick = function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      'behavior': 'smooth',
      'top': target.offsetTop
    })
  }
}

/************그래픽 차트 기능************/
am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
const root = am5.Root.new("main_profile_chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

var data = [{
  name: "1기",
  steps: 10557,
  pictureSettings: {
    src: "./assets/images/1기_photocard.PNG"
  }
}, {
  name: "2기",
  steps: 18600,
  pictureSettings: {
    src: "./assets/images/2기_photocard.PNG"
  }
}, {
  name: "3기",
  steps: 30500,
  pictureSettings: {
    src: "./assets/images/3기_photocard.PNG"
  }
}, {
  name: "4기",
  steps: 50301,
  pictureSettings: {
    src: "./assets/images/4기_photocard.PNG"
  }
}, {
  name: "5기",
  steps: 45200,
  pictureSettings: {
    src: "./assets/images/5기_photocard.PNG"
  }
}];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    paddingBottom: 50,
    paddingTop: 40
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

var xRenderer = am5xy.AxisRendererX.new(root, {});
xRenderer.grid.template.set("visible", false);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    paddingTop:40,
    categoryField: "name",
    renderer: xRenderer
  })
);


var yRenderer = am5xy.AxisRendererY.new(root, {});
yRenderer.grid.template.set("strokeDasharray", [3]);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    renderer: yRenderer
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Income",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "steps",
    categoryXField: "name",
    sequencedInterpolation: true,
    calculateAggregates: true,
    maskBullets: false,
    tooltip: am5.Tooltip.new(root, {
      dy: -30,
      pointerOrientation: "vertical",
      labelText: "{valueY}"
    })
  })
);

series.columns.template.setAll({
  strokeOpacity: 0,
  cornerRadiusBR: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusTL: 10,
  maxWidth: 50,
  fillOpacity: 0.8
});

var currentlyHovered;

series.columns.template.events.on("pointerover", function (e) {
  handleHover(e.target.dataItem);
});

series.columns.template.events.on("pointerout", function (e) {
  handleOut();
});

function handleHover(dataItem) {
  if (dataItem && currentlyHovered != dataItem) {
    handleOut();
    currentlyHovered = dataItem;
    var bullet = dataItem.bullets[0];
    bullet.animate({
      key: "locationY",
      to: 1,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

function handleOut() {
  if (currentlyHovered) {
    var bullet = currentlyHovered.bullets[0];
    bullet.animate({
      key: "locationY",
      to: 0,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

var circleTemplate = am5.Template.new({});

series.bullets.push(function (root, series, dataItem) {
  var bulletContainer = am5.Container.new(root, {});
  var circle = bulletContainer.children.push(
    am5.Circle.new(
      root,
      {
        radius: 34
      },
      circleTemplate
    )
  );

  var maskCircle = bulletContainer.children.push(
    am5.Circle.new(root, { radius: 27 })
  );

  // only containers can be masked, so we add image to another container
  var imageContainer = bulletContainer.children.push(
    am5.Container.new(root, {
      mask: maskCircle
    })
  );

  var image = imageContainer.children.push(
    am5.Picture.new(root, {
      templateField: "pictureSettings",
      centerX: am5.p50,
      centerY: am5.p50,
      width: 60,
      height: 60
    })
  );

  return am5.Bullet.new(root, {
    locationY: 0,
    sprite: bulletContainer
  });
});

// heatrule
series.set("heatRules", [
  {
    dataField: "valueY",
    min: am5.color(0xe5dc36),
    max: am5.color(0x5faa46),
    target: series.columns.template,
    key: "fill"
  },
  {
    dataField: "valueY",
    min: am5.color(0xe5dc36),
    max: am5.color(0x5faa46),
    target: circleTemplate,
    key: "fill"
  }
]);

series.data.setAll(data);
xAxis.data.setAll(data);

var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("visible", false);
cursor.lineY.set("visible", false);

cursor.events.on("cursormoved", function () {
  var dataItem = series.get("tooltip").dataItem;
  if (dataItem) {
    handleHover(dataItem);
  } else {
    handleOut();
  }
});

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);

}); // end am5.ready()


/************클릭 이미지 슬라이더 기능************/
document.querySelector('.right_arrow').onclick = function () {
  let current_slide = document.querySelector('.main_drama .drama_poster.active');
  let next_slide = current_slide.nextElementSibling;
  if( next_slide === null ) {
    next_slide = current_slide.parentElement.firstElementChild;
  }
  current_slide.animate({
    opacity: [1,0]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill:'both'
  });

  current_slide.classList.remove('active');
  next_slide.animate({
    opacity:[0,1]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill: 'both'
  })

  next_slide.classList.add('active');
}

document.querySelector('.left_arrow').onclick = function () {
  let current_slide = document.querySelector('.main_drama .drama_poster.active');
  let previous_slide = current_slide.previousElementSibling;
  if( previous_slide === null ) {
    previous_slide = current_slide.parentElement.lastElementChild;
  }
  current_slide.animate({
    opacity: [1,0]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill:'both'
  });

  current_slide.classList.remove('active');
  previous_slide.animate({
    opacity:[0,1]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill: 'both'
  })

  previous_slide.classList.add('active');
}