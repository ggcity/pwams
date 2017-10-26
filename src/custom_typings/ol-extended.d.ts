declare module ol {
  /*
  namespace Object {
    class Event extends ol.events.Event {
      constructor(
        type: string,
        key?: any,
        oldValue?: any
      );

      key: string;
      oldValue: any;
    }
  }
  */
  module interaction {
    namespace Select {
      class Event extends ol.events.Event {
        constructor(
          type: any, 
          selected: Array<ol.Feature>, 
          deselected: Array<ol.Feature>, 
          mapBrowserEvent: ol.MapBrowserEvent
        );

        selected: Array<ol.Feature>;
        deselected: Array<ol.Feature>;
        mapBrowserEvent: ol.MapBrowserEvent;
      }
    }

    namespace DragBox {
      class Event extends ol.events.Event {
        constructor(
          type: any,
          coordinate: ol.Coordinate,
          mapBrowserEvent: ol.MapBrowserEvent
        );

        coordinate: ol.Coordinate;
        mapBrowserEvent: ol.MapBrowserEvent;
      }
    }
  }
}