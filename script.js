// Default example to generate map for deck gl

//  the initial location of the map and how zoom i want the map to be
const INITIAL_VIEW_STATE = {
  latitude: 37.8,
  longitude: -122.45,
  zoom: 6,
};

// insert a poligon to the deck gl object

// Data to be used by the POLYLayer
// get the coordinates from the following site
// http://apps.headwallphotonics.com/
// Need to remember to change the order of the numbers in Deck.gl
const polygonData = [
  {
    contours: [
      [-51.511415262978474, 40.16244014503429],
      [-53.928407450478474, 40.996836355376885],
      [-30.13202073172847, 47.724858584491145],
      [-29.83538987235347, 33.183927430481845],
    ],
    name: "firstPolygon",
  },
  {
    contours: [
      [-124.38687094010577, 37.221796783267976],
      [-123.7013660864577, 37.05099196230184],
      [-123.34545107655964, 37.73614841419381],
      [-123.85028766686199, 38.26901242072349],
      [-124.2427816456069, 38.54902793237366],
      [-124.87697484310182, 38.60508336514303],
      [-125.37273289974245, 38.24574722268823],
      [-125.14339330013307, 37.84125843131095],
      [-125.33092801855692, 37.44499703004891],
    ],
    name: "Second Polygon in San Fransisco",
  },
];

const LAYER_POLY = new deck.PolygonLayer({
  id: "poly-layers",
  data: polygonData,
  stroked: true,
  filled: true,
  extruded: false,
  lineWidthMinPixels: 1,
  getPolygon: (d) => d.contours,
  getLineColor: [80, 80, 80],
  getFillColor: [110, 210, 170],
  getLineWidth: 250,
});

// path layer

const pathLayerData = [
  {
    path: [
      [-122.4, 37.7],
      [-122.5, 37.8],
      [-122.6, 37.85],
    ],
    name: "Path layer with angle",
    color: [255, 0, 0],
  },
  {
    path: [
      [-123.4, 37.7],
      [-123.5, 37.8],
    ],
    name: "Path layer straight line",
    color: [255, 202, 0],
  },
];

const LAYER_PATH = new deck.PathLayer({
  id: "path-layer",
  data: pathLayerData,
  widthScale: 20,
  widthMinPixels: 2,
  getPath: (d) => d.path,
  getColor: (d) => d.color,
  getWidth: (d) => 5,
});

// Icon layers to have arrows on top of the lines
// need to find the middle of the lines i have on the path layer in order to plot the iconLayers
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const iconLayerData = [
  {
    coordinates: [-122.45, 37.75],
    name: "First Ship",
    color: [255, 222, 100],
  },
  {
    coordinates: [-123.45, 37.75],
    name: "Second Ship",
    color: [255, 222, 100],
  },
];

const LAYER_ICON = new deck.IconLayer({
  id: "icon-layer",
  data: iconLayerData,
  iconMapping: ICON_MAPPING,
  getIcon: (d) => ({
    url: "pointer.png",
    width: 128,
    height: 128,
  }),

  sizeScale: 15,
  getPosition: (d) => d.coordinates,
  getSize: (d) => 2,
  // increase size if i want to increase the size dont need the color since i have png
  getColor: (d) => d.color,
  getAngle: (d) => 120,
  // change the direction of the arrow
});

new deck.DeckGL({
  mapStyle:
    "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  layers: [
    new deck.ScatterplotLayer({
      data: [{ position: [-122.45, 37.8], color: [255, 0, 0], radius: 100 }],
      getColor: (d) => d.color,
      getRadius: (d) => d.radius,
    }),
    LAYER_POLY,
    LAYER_PATH,
    LAYER_ICON,
  ],
});
